# Data Farm Website - PRD

## Original Problem Statement
Create a website for a company called Data Farm using the attached website content, logo and inspirational look and feel using brand colors from the logo. Give a feeling of a data visualization and analysis company and make it look like a high tech company; with a corporate feeling. Summarize long text to give a more simple and understandable message.

## User Personas
1. **Business Decision Makers** - Executives seeking data-driven insights for strategy
2. **Researchers** - Organizations needing market/social research support
3. **Development Organizations** - NGOs and government agencies in emerging markets

## Core Requirements
- High-tech corporate aesthetic with data visualization elements
- Brand colors: Deep Navy Blue (#1a2b5f), Mint Green (#8ee4af)
- Single-page layout with smooth scroll navigation
- Animated statistics counters
- Interactive chart visualizations
- Contact form with email sending
- Mobile responsive design
- Separate /insights page with filterable data flashcards and live counters
- Custom favicon and Open Graph meta tags
- cPanel deployment readiness

## Tech Stack
- Frontend: React.js + TailwindCSS + Recharts + Framer Motion + react-countup + lucide-react
- Backend: FastAPI + MongoDB (motor) + aiosmtplib + resend
- Deployment target: cPanel/Apache

## Architecture
```
/app/
  backend/
    server.py          - FastAPI with /api/contact endpoint
    .env               - SMTP, MongoDB, Resend config
    requirements.txt
  frontend/
    public/
      index.html       - Meta tags, favicon, OG tags
      .htaccess        - Apache routing for SPA
    src/
      App.js           - Main SPA (Navbar, Hero, About, Services, Stats, Contact, Footer)
      App.css          - Custom styles + responsive breakpoints
      pages/
        InsightsPage.js - Data flashcards, live counters, sector filtering
    package.json
  CPANEL_DEPLOYMENT.md - Deployment guide
```

## API Endpoints
- POST /api/contact - Submit contact form (saves to MongoDB, attempts SMTP email)

## DB Schema
- **contact_submissions**: { id, name, email, phone, subject, message, timestamp, email_sent, send_method, error }

## What's Been Implemented (Completed)
- [x] Fixed navigation bar with smooth scroll links
- [x] Hero section with rotating data visualizations (area chart, counters, donut, pie)
- [x] About section with bar chart visualization
- [x] Services section (Data Analysis, Research, Consulting)
- [x] Why Choose Us section with 4 feature cards
- [x] Stats section with animated CountUp counters
- [x] Contact section with info + form modal (country code selector)
- [x] Footer with social media links (Twitter, Instagram, Facebook)
- [x] Mobile responsive with hamburger menu
- [x] Glassmorphism UI effects + Framer Motion animations
- [x] Data Farm logo integration
- [x] /insights page with filterable data flashcards (11 sectors, Tanzania)
- [x] Live counters with REST Countries API (World, Africa, East Africa populations)
- [x] East Africa economic indicators
- [x] Custom favicon + Open Graph meta tags
- [x] cPanel deployment guide + .htaccess
- [x] SMTP email with fallback logic (ports 587, 465, 25)
- [x] Resend as backup email provider
- [x] Mobile responsiveness verified at 375px, 425px viewports
- [x] All tests passed (backend 100%, frontend 100%) - Feb 2026

## Known Limitations
- SMTP email sending blocked in sandbox environment (works on cPanel)
- Resend disabled by default (USE_RESEND=false), requires API key

## Prioritized Backlog
### P1 (High Priority)
- Deploy to cPanel and verify SMTP email functionality
- Add more countries to Insights flashcards (Kenya, Uganda, Rwanda)

### P2 (Nice to Have)
- Dark/Light theme toggle
- Newsletter subscription
- Multi-language support (Swahili)
- Blog/case studies section
- Analytics tracking
- Extract large components from App.js into separate files

## 3rd Party Integrations
- REST Countries API (v3.1) - Live population data (no key required)
- Resend - Backup email provider (requires API key)
- SMTP - Primary email via mail.datafarm.co.tz
