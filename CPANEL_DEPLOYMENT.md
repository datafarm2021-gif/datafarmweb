# Data Farm - cPanel Deployment Guide

## Frontend Deployment (React)

### Step 1: Build the React App
```bash
cd frontend
npm install  # or yarn install
npm run build  # or yarn build
```

### Step 2: Upload to cPanel
1. Login to your cPanel
2. Go to File Manager
3. Navigate to `public_html` (or your subdomain folder)
4. Upload all contents from the `build` folder
5. The `.htaccess` file is included for React Router support

### Step 3: Configure Environment
Create a `.env` file in your React app before building:
```
REACT_APP_BACKEND_URL=https://api.datafarm.co.tz
```

---

## Backend Deployment (FastAPI)

### Option A: Python App on cPanel (if available)

1. Go to cPanel → Setup Python App
2. Create a new Python application:
   - Python version: 3.9+
   - Application root: `backend`
   - Application URL: `api.datafarm.co.tz` (or subdomain)
   - Application startup file: `server.py`
   - Application Entry point: `app`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables in cPanel or create `.env` file

### Option B: Deploy Backend on VPS/Cloud

If cPanel doesn't support Python apps, deploy the backend on:
- DigitalOcean
- AWS EC2
- Linode
- Railway
- Render

---

## Email Configuration for cPanel

The email settings are already configured for `mail.datafarm.co.tz`:

```env
SMTP_SERVER=mail.datafarm.co.tz
SMTP_PORT=587
SMTP_EMAIL=form@datafarm.co.tz
SMTP_PASSWORD=your_password_here
RECIPIENT_EMAIL=harvest@datafarm.co.tz
USE_RESEND=false
```

### cPanel Email Setup:
1. Go to cPanel → Email Accounts
2. Ensure `form@datafarm.co.tz` exists
3. The SMTP settings should work once deployed on a server that can reach `mail.datafarm.co.tz`

### Alternative Ports to Try:
- Port 587 (STARTTLS) - recommended
- Port 465 (SSL)
- Port 25 (unencrypted - not recommended)

---

## Database Configuration

### MongoDB Atlas (Recommended for cPanel):
1. Create a free cluster at https://cloud.mongodb.com
2. Get your connection string
3. Update `.env`:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/datafarm
DB_NAME=datafarm
```

---

## File Structure After Deployment

```
public_html/
├── index.html
├── .htaccess
├── favicon.ico
├── static/
│   ├── css/
│   └── js/
└── manifest.json

backend/ (separate location or subdomain)
├── server.py
├── requirements.txt
└── .env
```

---

## CORS Configuration

Update the backend `.env` to allow your domain:
```env
CORS_ORIGINS=https://datafarm.co.tz,https://www.datafarm.co.tz
```

---

## SSL Certificate

1. Go to cPanel → SSL/TLS
2. Use AutoSSL or install Let's Encrypt certificate
3. Ensure HTTPS is enforced

---

## Troubleshooting

### Contact Form Not Sending Emails:
1. Check if SMTP port 587 is open on the server
2. Try port 465 with SSL instead of STARTTLS
3. Verify email credentials in cPanel → Email Accounts

### React Router 404 Errors:
- Ensure `.htaccess` is uploaded to the root folder
- Check if `mod_rewrite` is enabled in Apache

### API Connection Issues:
- Verify CORS_ORIGINS includes your frontend domain
- Check if backend URL is correctly set in frontend `.env`
