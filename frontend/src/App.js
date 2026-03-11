import { useState, useEffect } from "react";
import "@/App.css";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { 
    BarChart3, 
    Search, 
    Users, 
    ChevronRight, 
    Mail, 
    Phone, 
    MapPin,
    Database,
    LineChart,
    PieChart,
    TrendingUp,
    Shield,
    Zap,
    Globe,
    Menu,
    X
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Tooltip
} from "recharts";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_43ba9d9b-b9fd-49ce-9b96-7d5d269e20ba/artifacts/9eelofd6_HL%20Colored%20Logo.png";

// Sample chart data
const areaChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 850 },
];

const barChartData = [
    { name: 'Q1', value: 65 },
    { name: 'Q2', value: 80 },
    { name: 'Q3', value: 72 },
    { name: 'Q4', value: 90 },
];

// Navbar Component
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'shadow-lg' : ''}`} data-testid="navbar">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#home" className="flex items-center" data-testid="logo-link">
                        <img src={LOGO_URL} alt="Data Farm" className="h-14 w-auto" />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name}
                                href={link.href}
                                className="nav-link transition-colors duration-200"
                                data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a href="#contact" className="btn-primary text-sm transition-all duration-200" data-testid="nav-cta">
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-[#1a2b5f] p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        data-testid="mobile-menu-btn"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden py-4 border-t border-[#1a2b5f]/10"
                    >
                        {navLinks.map((link) => (
                            <a 
                                key={link.name}
                                href={link.href}
                                className="block py-3 px-4 text-[#1a2b5f] hover:text-[#8ee4af] transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a href="#contact" className="btn-primary mt-4 mx-4 text-center block" onClick={() => setMobileMenuOpen(false)}>
                            Get Started
                        </a>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

// Hero Section
const HeroSection = () => {
    return (
        <section id="home" className="hero-gradient grid-pattern min-h-screen flex items-center pt-16 relative overflow-hidden" data-testid="hero-section">
            {/* Floating data nodes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div 
                        key={i}
                        className="data-node"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="hero-title">
                            <span className="text-gradient">Turning Data</span>
                            <br />
                            <span className="text-white">into Decisions</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed" data-testid="hero-subtitle">
                            Data Farm empowers businesses in emerging economies with research, analytics, and expert consulting to drive smarter, faster decisions.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#services" className="btn-primary transition-all duration-200" data-testid="hero-cta-services">
                                Our Services
                                <ChevronRight size={18} />
                            </a>
                            <a href="#contact" className="btn-secondary transition-all duration-200" data-testid="hero-cta-contact">
                                Contact Us
                            </a>
                        </div>

                        {/* Quick stats */}
                        <div className="flex gap-8 mt-12">
                            <div>
                                <div className="text-2xl font-bold text-[#8ee4af]">500+</div>
                                <div className="text-sm text-slate-500">Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#8ee4af]">50+</div>
                                <div className="text-sm text-slate-500">Clients</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#8ee4af]">10+</div>
                                <div className="text-sm text-slate-500">Years</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Decorative Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="chart-container glow-mint animate-float">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp size={20} className="text-[#8ee4af]" />
                                <span className="text-sm text-slate-400">Data Growth Analytics</span>
                            </div>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={areaChartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8ee4af" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#8ee4af" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#475569" fontSize={12} />
                                    <YAxis stroke="#475569" fontSize={12} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: '#1a2b5f', 
                                            border: '1px solid rgba(142, 228, 175, 0.2)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#8ee4af" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorValue)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// About Section
const AboutSection = () => {
    return (
        <section id="about" className="section bg-[#020817]" data-testid="about-section">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="glass-card p-8 rounded-xl">
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={barChartData}>
                                    <XAxis dataKey="name" stroke="#475569" fontSize={12} />
                                    <YAxis stroke="#475569" fontSize={12} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: '#1a2b5f', 
                                            border: '1px solid rgba(142, 228, 175, 0.2)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {barChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 3 ? '#8ee4af' : '#1a2b5f'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-[#8ee4af]"></div>
                                    <span className="text-sm text-slate-400">Current Quarter</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-[#1a2b5f]"></div>
                                    <span className="text-sm text-slate-400">Previous Quarters</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-[#8ee4af] text-sm font-medium uppercase tracking-wider">About Us</span>
                        <h2 className="section-title mt-3" data-testid="about-title">
                            Your Partner in Data-Driven Growth
                        </h2>
                        <p className="section-subtitle mt-4" data-testid="about-description">
                            Data Farm transforms complex information into actionable intelligence. We combine data analysis, research expertise, and industry consulting to help organizations navigate dynamic markets.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {[
                                'Specialized in emerging market insights',
                                'Network of industry experts and consultants',
                                'Rigorous methodologies for reliable results',
                                'Tools for navigating complex datasets'
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-[#8ee4af]"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Services Section
const ServicesSection = () => {
    const services = [
        {
            icon: <BarChart3 size={28} />,
            title: 'Data Analysis',
            description: 'Transform complex datasets into clear visualizations, dashboards, and actionable insights that drive decision-making.',
            features: ['Data Visualization', 'Daily Insights (DoD)', 'Data APIs', 'Real-time Counters']
        },
        {
            icon: <Search size={28} />,
            title: 'Research',
            description: 'Conduct market and social research with qualitative and quantitative methods for policy, strategy, and operations.',
            features: ['Market Research', 'Social Studies', 'Survey Support', 'Data Collection']
        },
        {
            icon: <Users size={28} />,
            title: 'Consulting',
            description: 'Connect with industry specialists across R&D, finance, technology, mining, and more for tailored expertise.',
            features: ['Expert Matching', 'Multi-industry Network', 'Project Oversight', 'Quality Assurance']
        }
    ];

    return (
        <section id="services" className="section bg-[#0a0f1a] grid-pattern" data-testid="services-section">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#8ee4af] text-sm font-medium uppercase tracking-wider">Our Services</span>
                    <h2 className="section-title mt-3" data-testid="services-title">
                        Comprehensive Data Solutions
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        From raw data to strategic decisions, we provide end-to-end support.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="service-card transition-all duration-300"
                            data-testid={`service-card-${index}`}
                        >
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc mb-6">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                        <ChevronRight size={14} className="text-[#8ee4af]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Why Choose Us Section
const WhyUsSection = () => {
    const features = [
        {
            icon: <Database size={24} />,
            title: 'Integrated Expertise',
            description: 'End-to-end support from data generation to analysis and advisory services.'
        },
        {
            icon: <Zap size={24} />,
            title: 'Technology-Driven',
            description: 'Modern digital tools, visualization tech, and advanced research methods.'
        },
        {
            icon: <Globe size={24} />,
            title: 'Specialized Network',
            description: 'Access curated experts across multiple industries and sectors.'
        },
        {
            icon: <Shield size={24} />,
            title: 'Data Quality',
            description: 'Rigorous methodologies and professional oversight for reliable results.'
        }
    ];

    return (
        <section id="why-us" className="section bg-[#020817]" data-testid="why-us-section">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#8ee4af] text-sm font-medium uppercase tracking-wider">Why Choose Us</span>
                    <h2 className="section-title mt-3" data-testid="why-us-title">
                        Data, Research & Expertise Combined
                    </h2>
                    <p className="section-subtitle mx-auto mt-4">
                        One integrated platform for all your data and research needs.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="feature-card transition-all duration-300"
                            data-testid={`feature-card-${index}`}
                        >
                            <div className="w-12 h-12 rounded-lg bg-[#1a2b5f] flex items-center justify-center text-[#8ee4af] mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Stats Section
const StatsSection = () => {
    const stats = [
        { value: 500, suffix: '+', label: 'Projects Completed' },
        { value: 50, suffix: '+', label: 'Happy Clients' },
        { value: 1, suffix: 'M+', label: 'Data Points Processed' },
        { value: 10, suffix: '+', label: 'Years Experience' }
    ];

    const [inView, setInView] = useState(false);

    return (
        <section className="section bg-[#0a0f1a]" data-testid="stats-section">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    onViewportEnter={() => setInView(true)}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card" data-testid={`stat-${index}`}>
                            <div className="stat-value">
                                {inView && (
                                    <CountUp 
                                        end={stat.value} 
                                        duration={2.5} 
                                        separator=","
                                    />
                                )}
                                {stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Contact Section
const ContactSection = () => {
    const contactInfo = [
        {
            icon: <Mail size={22} />,
            title: 'Email',
            value: 'harvest@datafarm.co.tz',
            link: 'mailto:harvest@datafarm.co.tz'
        },
        {
            icon: <Phone size={22} />,
            title: 'Phone',
            value: '+255 759 751 564',
            link: 'tel:+255759751564'
        },
        {
            icon: <MapPin size={22} />,
            title: 'Address',
            value: 'P.O. Box 10436, Dar es Salaam, Tanzania',
            link: null
        }
    ];

    return (
        <section id="contact" className="section bg-[#020817] grid-pattern" data-testid="contact-section">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#8ee4af] text-sm font-medium uppercase tracking-wider">Contact Us</span>
                        <h2 className="section-title mt-3" data-testid="contact-title">
                            Let's Work Together
                        </h2>
                        <p className="section-subtitle mt-4 mb-8">
                            Ready to transform your data into decisions? Reach out and our team will respond within 24 hours.
                        </p>

                        <div className="contact-card">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="contact-item" data-testid={`contact-item-${index}`}>
                                    <div className="contact-icon">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">{item.title}</div>
                                        {item.link ? (
                                            <a 
                                                href={item.link}
                                                className="text-white hover:text-[#8ee4af] transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-white">{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Decorative */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center"
                    >
                        <div className="glass-card p-8 rounded-xl w-full max-w-md">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-[#8ee4af]/10 flex items-center justify-center">
                                    <LineChart size={24} className="text-[#8ee4af]" />
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-white">Data Farm</div>
                                    <div className="text-sm text-slate-500">Your data partner</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                    <span className="text-slate-400">Data Analysis</span>
                                    <span className="text-[#8ee4af]">Available</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                    <span className="text-slate-400">Research Services</span>
                                    <span className="text-[#8ee4af]">Available</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                    <span className="text-slate-400">Expert Consulting</span>
                                    <span className="text-[#8ee4af]">Available</span>
                                </div>
                            </div>
                            <a 
                                href="mailto:harvest@datafarm.co.tz"
                                className="btn-primary w-full justify-center mt-6 transition-all duration-200"
                                data-testid="contact-cta"
                            >
                                Start a Conversation
                                <ChevronRight size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    const socialLinks = [
        { name: 'Twitter', href: 'https://twitter.com/Datafarm_tz', icon: 'X' },
        { name: 'Instagram', href: 'https://www.instagram.com/datafarm_tz/', icon: 'IG' },
        { name: 'Facebook', href: 'https://facebook.com/datafarmtz', icon: 'FB' }
    ];

    return (
        <footer className="footer" data-testid="footer">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-10 mb-10">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <img src={LOGO_URL} alt="Data Farm" className="h-14 w-auto mb-4" />
                        <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                            Empowering organizations with data, research, and expertise. Your partner for smarter, data-driven decisions in emerging markets.
                        </p>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-[#1a2b5f] font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#services" className="text-slate-600 hover:text-[#8ee4af] text-sm transition-colors">Data Analysis</a></li>
                            <li><a href="#services" className="text-slate-600 hover:text-[#8ee4af] text-sm transition-colors">Research</a></li>
                            <li><a href="#services" className="text-slate-600 hover:text-[#8ee4af] text-sm transition-colors">Consulting</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-[#1a2b5f] font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>harvest@datafarm.co.tz</li>
                            <li>+255 759 751 564</li>
                            <li>Dar es Salaam, Tanzania</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#1a2b5f]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Data Farm. All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        {socialLinks.map((social, index) => (
                            <a 
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-light transition-all duration-200"
                                data-testid={`social-${social.name.toLowerCase()}`}
                            >
                                <span className="text-xs font-bold">{social.icon}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
function App() {
    return (
        <div className="App bg-[#020817] min-h-screen">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <WhyUsSection />
            <StatsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default App;
