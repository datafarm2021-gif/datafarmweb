from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'mail.datafarm.co.tz')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 465))
SMTP_EMAIL = os.environ.get('SMTP_EMAIL', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'harvest@datafarm.co.tz')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    country_code: str
    phone: str
    subject: str
    message: str

class ContactFormResponse(BaseModel):
    status: str
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactFormResponse)
async def send_contact_form(request: ContactFormRequest):
    """Send contact form email to harvest@datafarm.co.tz"""
    
    # Create email content
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #1a2b5f; color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; background: #f9f9f9; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #1a2b5f; }}
            .value {{ margin-top: 5px; }}
            .footer {{ text-align: center; padding: 15px; font-size: 12px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">{request.name}</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">{request.email}</div>
                </div>
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">{request.country_code} {request.phone}</div>
                </div>
                <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">{request.subject}</div>
                </div>
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">{request.message}</div>
                </div>
            </div>
            <div class="footer">
                <p>This email was sent from the Data Farm website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Create plain text version
    text_content = f"""
    New Contact Form Submission
    
    Name: {request.name}
    Email: {request.email}
    Phone: {request.country_code} {request.phone}
    Subject: {request.subject}
    
    Message:
    {request.message}
    
    ---
    This email was sent from the Data Farm website contact form.
    """
    
    # Create email message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Contact Form: {request.subject}"
    msg["From"] = SMTP_EMAIL
    msg["To"] = RECIPIENT_EMAIL
    msg["Reply-To"] = request.email
    
    # Attach both plain text and HTML versions
    msg.attach(MIMEText(text_content, "plain"))
    msg.attach(MIMEText(html_content, "html"))
    
    try:
        # Send email using STARTTLS (port 587)
        await aiosmtplib.send(
            msg,
            hostname=SMTP_SERVER,
            port=SMTP_PORT,
            username=SMTP_EMAIL,
            password=SMTP_PASSWORD,
            start_tls=True  # Use STARTTLS for port 587
        )
        
        logger.info(f"Contact form email sent successfully from {request.email}")
        
        # Optionally save to database
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": request.name,
            "email": request.email,
            "phone": f"{request.country_code} {request.phone}",
            "subject": request.subject,
            "message": request.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "email_sent": True
        }
        await db.contact_submissions.insert_one(contact_doc)
        
        return ContactFormResponse(
            status="success",
            message="Your message has been sent successfully. We'll get back to you within 24 hours."
        )
        
    except Exception as e:
        logger.error(f"Failed to send contact form email: {str(e)}")
        
        # Still save to database even if email fails
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": request.name,
            "email": request.email,
            "phone": f"{request.country_code} {request.phone}",
            "subject": request.subject,
            "message": request.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "email_sent": False,
            "error": str(e)
        }
        await db.contact_submissions.insert_one(contact_doc)
        
        raise HTTPException(
            status_code=500,
            detail="Failed to send email. Please try again or contact us directly at harvest@datafarm.co.tz"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()