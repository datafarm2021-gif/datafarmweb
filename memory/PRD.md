# Data Farm Website - PRD

## Original Problem Statement
Create a website for a company called Data Farm using the attached website content, logo and inspirational look and feel using brand colors from the logo. Give a feeling of a data visualization and analysis company and make it look like a high tech company; with a corporate feeling. Summarize long text to give a more simple and understandable message.

## User Personas
1. **Business Decision Makers** - Executives seeking data-driven insights for strategy
2. **Researchers** - Organizations needing market/social research support
3. **Development Organizations** - NGOs and government agencies in emerging markets

## Core Requirements (Static)
- High-tech corporate aesthetic with data visualization elements
- Brand colors: Deep Navy Blue (#1a2b5f), Mint Green (#8ee4af)
- Single-page layout with smooth scroll navigation
- Animated statistics counters
- Interactive chart visualizations
- Contact form with email delivery
- Insights page with sector-filtered data flashcards and live counters
- Mobile responsive design
- cPanel deployment ready

## Tech Stack
- Frontend: React.js with Tailwind CSS
- Backend: FastAPI (contact form + email)
- Database: MongoDB (contact submissions)
- Charts: Recharts
- Animations: Framer Motion, react-countup
- Icons: Lucide React
- Email: aiosmtplib (SMTP)

## What's Been Implemented
- [x] Fixed navigation bar with smooth scroll links
- [x] Hero section with rotating chart visualizations
- [x] About section with bar chart visualization
- [x] Services section (Data Analysis, Research, Consulting)
- [x] Why Choose Us section with 4 feature cards
- [x] Stats section with animated CountUp counters
- [x] Contact section with email, phone, address
- [x] Footer with social media links (X, Instagram, Facebook)
- [x] Mobile responsive with hamburger menu
- [x] Glassmorphism UI effects
- [x] Framer Motion animations
- [x] Data Farm logo integration
- [x] Insights page with sector tabs and data flashcards
- [x] Live counters on Insights page (East Africa & World data)
- [x] Contact form modal with country code selector
- [x] SMTP email delivery (harvest@datafarm.co.tz -> info@datafarm.co.tz)
- [x] Contact submissions saved to MongoDB
- [x] Open Graph meta tags for social media previews
- [x] Custom favicon and page title
- [x] cPanel deployment guide (.htaccess, CPANEL_DEPLOYMENT.md)
- [x] Footer email: info@datafarm.co.tz

## Email Configuration
- SMTP Server: mail.datafarm.co.tz:587 (STARTTLS)
- From: harvest@datafarm.co.tz (Sender name: "Website- Datafarm")
- To: info@datafarm.co.tz
- Status: WORKING (tested and confirmed)

## Prioritized Backlog
### P1 (Recommended Refactoring)
- Split App.js (1300+ lines) into smaller components
- Split InsightsPage.js (1000+ lines) into smaller components

### P2 (Nice to Have)
- Dark/Light theme toggle
- Newsletter subscription
- Multi-language support (Swahili)
- Analytics tracking
