# Data Farm - cPanel Deployment Guide
## Deploying from GitHub

This guide covers deploying the Data Farm website on a cPanel server by pulling the codebase from GitHub.

---

## Architecture Overview

```
datafarm.co.tz (public_html/)     → React frontend (static build)
api.datafarm.co.tz (subdomain)    → FastAPI backend (Python app via Passenger)
MongoDB Atlas (cloud)             → Database
mail.datafarm.co.tz               → SMTP email
```

---

## Prerequisites

- cPanel access with SSH/Terminal access
- Node.js 18+ (check via cPanel → Setup Node.js App, or install via nvm)
- Python 3.9+ (check via cPanel → Setup Python App)
- Git access to the repository
- MongoDB Atlas account (free tier works): https://cloud.mongodb.com

---

## Step 1: Clone the Repository

SSH into your cPanel server or use cPanel Terminal:

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/datafarm-website.git
cd datafarm-website
```

---

## Step 2: Set Up MongoDB Atlas

1. Go to https://cloud.mongodb.com and create a free cluster
2. Create a database user with read/write access
3. Whitelist your cPanel server's IP (or allow access from anywhere: `0.0.0.0/0`)
4. Get your connection string — it will look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/datafarm
   ```

---

## Step 3: Deploy the Backend (API)

### 3a. Create API Subdomain

1. Go to **cPanel → Domains** (or Subdomains)
2. Create subdomain: `api.datafarm.co.tz`
3. Set document root to: `/home/YOUR_USERNAME/api.datafarm.co.tz`

### 3b. Set Up Python App

1. Go to **cPanel → Setup Python App**
2. Click **Create Application**:
   - **Python version**: 3.9 or higher
   - **Application root**: `api.datafarm.co.tz` (or wherever the subdomain points)
   - **Application URL**: `api.datafarm.co.tz`
   - **Application startup file**: `passenger_wsgi.py`
   - **Application Entry point**: `application`
3. Click **Create**

### 3c. Copy Backend Files

```bash
# Copy backend files to the subdomain directory
cp ~/datafarm-website/backend/server.py ~/api.datafarm.co.tz/
cp ~/datafarm-website/backend/passenger_wsgi.py ~/api.datafarm.co.tz/
cp ~/datafarm-website/backend/requirements.txt ~/api.datafarm.co.tz/
```

### 3d. Create Backend Environment File

```bash
cat > ~/api.datafarm.co.tz/.env << 'EOF'
MONGO_URL="mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/datafarm"
DB_NAME="datafarm"
CORS_ORIGINS="https://datafarm.co.tz,https://www.datafarm.co.tz"
SMTP_SERVER="mail.datafarm.co.tz"
SMTP_PORT=587
SMTP_EMAIL="harvest@datafarm.co.tz"
SMTP_PASSWORD="J{MX41Y7%!6^K;~p"
RECIPIENT_EMAIL="info@datafarm.co.tz"
SENDER_NAME="Website- Datafarm"
USE_RESEND=false
EOF
```

> **IMPORTANT**: Replace the `MONGO_URL` with your actual MongoDB Atlas connection string.

### 3e. Install Python Dependencies

In cPanel's Python App interface, click **Run pip install** or use the virtual environment terminal:

```bash
# Enter the virtual environment (cPanel provides the command, e.g.):
source /home/YOUR_USERNAME/virtualenv/api.datafarm.co.tz/3.9/bin/activate

cd ~/api.datafarm.co.tz
pip install -r requirements.txt
```

### 3f. Restart the Python App

In **cPanel → Setup Python App**, click **Restart** on your application.

### 3g. Test the Backend

Open in browser: `https://api.datafarm.co.tz/api/`

You should see: `{"message": "Hello World"}`

---

## Step 4: Deploy the Frontend

### 4a. Create Frontend Environment File

```bash
cat > ~/datafarm-website/frontend/.env << 'EOF'
REACT_APP_BACKEND_URL=https://api.datafarm.co.tz
EOF
```

### 4b. Build the React App

```bash
cd ~/datafarm-website/frontend

# If using nvm for Node.js:
# nvm use 18

# Install dependencies
yarn install   # or: npm install

# Build for production
yarn build     # or: npm run build
```

### 4c. Deploy Build to public_html

```bash
# Clear existing files (CAREFUL: backup first if needed)
rm -rf ~/public_html/*

# Copy the build output
cp -r ~/datafarm-website/frontend/build/* ~/public_html/

# Copy .htaccess (should already be in the build from public/ folder)
# If not present:
cp ~/datafarm-website/frontend/public/.htaccess ~/public_html/.htaccess
```

### 4d. Add OG Image for Social Previews

The `og-image.png` file should already be in the build output. Verify:

```bash
ls ~/public_html/og-image.png
ls ~/public_html/logo.png
```

---

## Step 5: Enable SSL

1. Go to **cPanel → SSL/TLS** or **AutoSSL**
2. Ensure SSL certificates are active for:
   - `datafarm.co.tz`
   - `www.datafarm.co.tz`
   - `api.datafarm.co.tz`
3. Enable **Force HTTPS Redirect** in cPanel → Domains

---

## Step 6: Verify Deployment

1. **Frontend**: Visit `https://datafarm.co.tz` — full website should load
2. **Backend API**: Visit `https://api.datafarm.co.tz/api/` — should return JSON
3. **Contact Form**: Submit a test message — should send email to `info@datafarm.co.tz`
4. **Social Preview**: Paste `https://datafarm.co.tz` in WhatsApp — should show Data Farm preview

---

## Updating the Site

When you push updates to GitHub:

```bash
cd ~/datafarm-website
git pull origin main

# If backend changed:
cp backend/server.py ~/api.datafarm.co.tz/
# Restart Python app in cPanel

# If frontend changed:
cd frontend
yarn install
yarn build
rm -rf ~/public_html/*
cp -r build/* ~/public_html/
cp public/.htaccess ~/public_html/.htaccess
```

---

## File Structure on cPanel

```
/home/YOUR_USERNAME/
├── datafarm-website/         ← Git repository (source code)
│   ├── backend/
│   │   ├── server.py
│   │   ├── passenger_wsgi.py
│   │   ├── requirements.txt
│   │   └── .env.example
│   └── frontend/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── .env.example
│
├── api.datafarm.co.tz/       ← Backend (Python app)
│   ├── server.py
│   ├── passenger_wsgi.py
│   ├── requirements.txt
│   └── .env                  ← Production secrets (not in git)
│
└── public_html/              ← Frontend (static build)
    ├── index.html
    ├── .htaccess
    ├── favicon.ico
    ├── logo.png
    ├── og-image.png
    └── static/
        ├── css/
        └── js/
```

---

## Troubleshooting

### Contact Form Not Sending Emails
1. Verify SMTP credentials in `~/api.datafarm.co.tz/.env`
2. Ensure `harvest@datafarm.co.tz` email account exists in **cPanel → Email Accounts**
3. Check backend logs: **cPanel → Errors** or check `stderr.log` in the app directory

### React Router Shows 404 on Page Refresh
- Ensure `.htaccess` is present in `public_html/`
- Verify `mod_rewrite` is enabled (usually is on cPanel)

### API Returns CORS Error
- Verify `CORS_ORIGINS` in backend `.env` includes your exact frontend domain
- Include both `https://datafarm.co.tz` and `https://www.datafarm.co.tz`

### Python App Not Starting
1. Check **cPanel → Setup Python App** for error messages
2. Verify `passenger_wsgi.py` is in the app root
3. Ensure all dependencies are installed in the virtual environment
4. Check `stderr.log` in the application directory

### OG Image Not Showing on WhatsApp
- Ensure `og-image.png` exists in `public_html/`
- Clear WhatsApp cache or wait a few hours for it to refresh
- Test with Facebook Debugger: https://developers.facebook.com/tools/debug/

### MongoDB Connection Fails
- Verify your cPanel server's IP is whitelisted in MongoDB Atlas
- Check the connection string format (use `mongodb+srv://` for Atlas)
- Test connection: `python3 -c "from pymongo import MongoClient; MongoClient('YOUR_URL').admin.command('ping')"`
