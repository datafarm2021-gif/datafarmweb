# Data Farm Website - PRD

## Original Problem Statement
Create a website for a company called Data Farm using the attached website content, logo and inspirational look and feel using brand colors from the logo. Give a feeling of a data visualization and analysis company and make it look like a high tech company; with a corporate feeling.

## User Personas
1. **Business Decision Makers** - Executives seeking data-driven insights for strategy
2. **Researchers** - Organizations needing market/social research support
3. **Development Organizations** - NGOs and government agencies in emerging markets

## Core Requirements
- High-tech corporate aesthetic with data visualization elements
- Brand colors: Deep Navy Blue (#1a2b5f), Mint Green (#8ee4af)
- Single-page layout with smooth scroll navigation
- Animated statistics counters & interactive chart visualizations
- Contact form with SMTP email delivery
- Insights page with sector-filtered data flashcards and live counters
- Mobile responsive design
- cPanel deployment ready (GitHub pull workflow)

## Tech Stack
- Frontend: React.js, Tailwind CSS, Framer Motion, Recharts, react-countup
- Backend: FastAPI, aiosmtplib, Motor (MongoDB async)
- Database: MongoDB (Atlas for production)
- Deployment: cPanel with Phusion Passenger (a2wsgi bridge)

## What's Been Implemented
- [x] Full single-page website (Hero, About, Services, Stats, Contact, Footer)
- [x] Insights page with 11 sector tabs and live API counters
- [x] Contact form modal with country code selector
- [x] SMTP email: harvest@datafarm.co.tz -> info@datafarm.co.tz (sender: "Website- Datafarm")
- [x] Contact submissions saved to MongoDB
- [x] Open Graph meta tags with local og-image.png
- [x] Custom favicon and page title
- [x] Mobile responsive (hamburger menu, stacked layouts)
- [x] Social media icons (X, Instagram, Facebook)

### cPanel Deployment Optimization (March 2026)
- [x] Local logo/assets (removed Emergent CDN dependency)
- [x] passenger_wsgi.py for cPanel's Phusion Passenger (ASGI->WSGI bridge)
- [x] Cleaned requirements.txt (production-only dependencies)
- [x] .env.example templates for frontend and backend
- [x] deploy.sh helper script (git pull + build + deploy)
- [x] Comprehensive CPANEL_DEPLOYMENT.md guide
- [x] Removed Emergent-specific scripts (posthog, emergent-main.js)
- [x] .htaccess with SPA routing, caching, gzip, security headers
- [x] .gitignore updated (allows .env.example files)

## Email Configuration
- SMTP Server: mail.datafarm.co.tz:587 (STARTTLS)
- From: harvest@datafarm.co.tz (Sender: "Website- Datafarm")
- To: info@datafarm.co.tz
- Status: WORKING

## Key Files
- `/app/frontend/src/App.js` - Main SPA (all sections)
- `/app/frontend/src/pages/InsightsPage.js` - Insights page
- `/app/backend/server.py` - FastAPI backend
- `/app/backend/passenger_wsgi.py` - cPanel Passenger bridge
- `/app/deploy.sh` - Deployment helper script
- `/app/CPANEL_DEPLOYMENT.md` - Full deployment guide

## Prioritized Backlog
### P1 - Refactoring
- Split App.js into smaller components
- Split InsightsPage.js into smaller components

### P2 - Nice to Have
- Dark/Light theme toggle
- Newsletter subscription
- Multi-language support (Swahili)
- Analytics tracking (Google Analytics or similar)
