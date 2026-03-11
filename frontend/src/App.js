import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    X,
    Instagram,
    Facebook,
    Send,
    User,
    MessageSquare,
    ArrowRight
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
    Tooltip,
    PieChart as RechartsPie,
    Pie,
    RadialBarChart,
    RadialBar
} from "recharts";
import InsightsPage from "./pages/InsightsPage";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_43ba9d9b-b9fd-49ce-9b96-7d5d269e20ba/artifacts/9eelofd6_HL%20Colored%20Logo.png";

// Sample chart data - Economic Growth
const areaChartData = [
    { name: 'Jan', value: 4.2 },
    { name: 'Feb', value: 4.5 },
    { name: 'Mar', value: 4.1 },
    { name: 'Apr', value: 4.8 },
    { name: 'May', value: 5.2 },
    { name: 'Jun', value: 5.6 },
    { name: 'Jul', value: 5.4 },
];

const barChartData = [
    { name: 'Q1', value: 65 },
    { name: 'Q2', value: 80 },
    { name: 'Q3', value: 72 },
    { name: 'Q4', value: 90 },
];

// Pie chart data - Budget Allocation
const pieChartData = [
    { name: 'Infrastructure', value: 32, fill: '#8ee4af' },
    { name: 'Education', value: 24, fill: '#1a2b5f' },
    { name: 'Healthcare', value: 22, fill: '#3d5a9f' },
    { name: 'Agriculture', value: 22, fill: '#5a7dbf' },
];

// Donut chart data - Market Share
const donutChartData = [
    { name: 'Mobile Money', value: 62, fill: '#8ee4af' },
    { name: 'Traditional Banking', value: 38, fill: '#1a2b5f' },
];

// Radial data
const radialData = [
    { name: 'Progress', value: 75, fill: '#8ee4af' },
];

// Map locations data - East Africa Research Coverage
const mapLocations = [
    { id: 1, name: 'Dar es Salaam', x: 75, y: 55, size: 'large' },
    { id: 2, name: 'Nairobi', x: 68, y: 22, size: 'large' },
    { id: 3, name: 'Kampala', x: 45, y: 18, size: 'medium' },
    { id: 4, name: 'Kigali', x: 48, y: 35, size: 'medium' },
    { id: 5, name: 'Mombasa', x: 78, y: 32, size: 'small' },
    { id: 6, name: 'Dodoma', x: 55, y: 48, size: 'small' },
    { id: 7, name: 'Arusha', x: 62, y: 28, size: 'small' },
];

// Rotating Data Visualization Component
const RotatingVisualization = () => {
    const [activeViz, setActiveViz] = useState(0);
    const [counterValues, setCounterValues] = useState({
        population: 65497231,
        gdpGrowth: 5.2,
        tradeVolume: 18.7
    });

    const visualizations = [
        { type: 'area', title: 'GDP Growth Rate (%)', subtitle: 'East Africa 2024', icon: <TrendingUp size={20} /> },
        { type: 'counter', title: 'Live Economic Indicators', subtitle: 'Tanzania Real-Time', icon: <Database size={20} /> },
        { type: 'donut', title: 'Financial Inclusion', subtitle: 'Payment Methods Share', icon: <PieChart size={20} /> },
        { type: 'pie', title: 'National Budget 2024', subtitle: 'Sector Allocation', icon: <BarChart3 size={20} /> },
        { type: 'map', title: 'Research Coverage', subtitle: 'East Africa Network', icon: <Globe size={20} /> },
    ];

    // Auto-rotate visualizations
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveViz((prev) => (prev + 1) % visualizations.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [visualizations.length]);

    // Update counter values periodically
    useEffect(() => {
        const counterInterval = setInterval(() => {
            setCounterValues(prev => ({
                population: prev.population + Math.floor(Math.random() * 15),
                gdpGrowth: 5.0 + (Math.random() * 0.8),
                tradeVolume: 18.0 + (Math.random() * 2)
            }));
        }, 2000);
        return () => clearInterval(counterInterval);
    }, []);

    const renderVisualization = () => {
        switch (visualizations[activeViz].type) {
            case 'area':
                return (
                    <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={areaChartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8ee4af" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#8ee4af" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                                <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={[3, 6]} unit="%" />
                                <Tooltip 
                                    contentStyle={{ 
                                        background: '#1a2b5f', 
                                        border: '1px solid rgba(142, 228, 175, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}
                                    formatter={(value) => [`${value}%`, 'Growth']}
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
                        <p className="text-xs text-slate-500 text-center mt-2">Source: World Bank Economic Outlook</p>
                    </div>
                );

            case 'counter':
                return (
                    <div className="grid grid-cols-1 gap-3 py-2">
                        <div className="bg-[#1a2b5f]/30 rounded-lg p-4 border border-[#8ee4af]/20">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-sm">Population Estimate</span>
                                <div className="w-2 h-2 rounded-full bg-[#8ee4af] animate-pulse"></div>
                            </div>
                            <div className="text-2xl font-bold text-[#8ee4af] mt-1">
                                {counterValues.population.toLocaleString()}
                            </div>
                            <span className="text-xs text-slate-500">+2.9% annual growth</span>
                        </div>
                        <div className="bg-[#1a2b5f]/30 rounded-lg p-4 border border-[#8ee4af]/20">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-sm">GDP Growth Rate</span>
                                <div className="w-2 h-2 rounded-full bg-[#8ee4af] animate-pulse"></div>
                            </div>
                            <div className="text-2xl font-bold text-white mt-1">
                                {counterValues.gdpGrowth.toFixed(1)}%
                            </div>
                            <span className="text-xs text-slate-500">Year-over-year</span>
                        </div>
                        <div className="bg-[#1a2b5f]/30 rounded-lg p-4 border border-[#8ee4af]/20">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-sm">Trade Volume (USD Bn)</span>
                                <div className="w-2 h-2 rounded-full bg-[#8ee4af] animate-pulse"></div>
                            </div>
                            <div className="text-2xl font-bold text-white mt-1">
                                ${counterValues.tradeVolume.toFixed(1)}B
                            </div>
                            <span className="text-xs text-slate-500">Exports + Imports</span>
                        </div>
                    </div>
                );

            case 'donut':
                return (
                    <div className="flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={165}>
                            <RechartsPie>
                                <Pie
                                    data={donutChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {donutChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        background: '#1a2b5f', 
                                        border: '1px solid rgba(142, 228, 175, 0.2)',
                                        borderRadius: '8px'
                                    }}
                                    formatter={(value) => [`${value}%`, 'Market Share']}
                                />
                            </RechartsPie>
                        </ResponsiveContainer>
                        <div className="flex gap-6 mt-1">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#8ee4af]"></div>
                                <span className="text-xs text-slate-400">Mobile Money (62%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#1a2b5f]"></div>
                                <span className="text-xs text-slate-400">Banks (38%)</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Financial Services Adoption 2024</p>
                    </div>
                );

            case 'pie':
                return (
                    <div className="flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={165}>
                            <RechartsPie>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={65}
                                    dataKey="value"
                                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        background: '#1a2b5f', 
                                        border: '1px solid rgba(142, 228, 175, 0.2)',
                                        borderRadius: '8px'
                                    }}
                                    formatter={(value) => [`${value}%`, 'Allocation']}
                                />
                            </RechartsPie>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                            {pieChartData.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ background: item.fill }}></div>
                                    <span className="text-xs text-slate-400">{item.name}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Government Expenditure Distribution</p>
                    </div>
                );

            case 'map':
                return (
                    <div className="relative w-full h-[210px] bg-[#1a2b5f]/20 rounded-lg overflow-hidden border border-[#8ee4af]/10">
                        {/* East Africa simplified outline */}
                        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                            <path 
                                d="M35 10 L75 8 L85 25 L90 55 L80 75 L55 85 L30 78 L25 55 L28 30 Z" 
                                fill="none" 
                                stroke="#8ee4af" 
                                strokeWidth="0.5"
                            />
                        </svg>
                        {/* Map markers */}
                        {mapLocations.map((loc) => (
                            <div
                                key={loc.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                            >
                                <div className={`relative ${loc.size === 'large' ? 'w-4 h-4' : loc.size === 'medium' ? 'w-3 h-3' : 'w-2 h-2'}`}>
                                    <div className={`absolute inset-0 rounded-full bg-[#8ee4af] animate-ping opacity-75`} 
                                         style={{ animationDuration: `${1.5 + Math.random()}s` }}></div>
                                    <div className={`relative rounded-full bg-[#8ee4af] w-full h-full`}></div>
                                </div>
                                {loc.size === 'large' && (
                                    <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] text-[#8ee4af] whitespace-nowrap font-medium">
                                        {loc.name}
                                    </span>
                                )}
                            </div>
                        ))}
                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="75%" y1="55%" x2="68%" y2="22%" stroke="#8ee4af" strokeWidth="0.5" opacity="0.3" />
                            <line x1="68%" y1="22%" x2="45%" y2="18%" stroke="#8ee4af" strokeWidth="0.5" opacity="0.3" />
                            <line x1="45%" y1="18%" x2="48%" y2="35%" stroke="#8ee4af" strokeWidth="0.5" opacity="0.3" />
                            <line x1="48%" y1="35%" x2="75%" y2="55%" stroke="#8ee4af" strokeWidth="0.5" opacity="0.3" />
                        </svg>
                        {/* Legend */}
                        <div className="absolute bottom-2 left-2 text-[10px] text-slate-400">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-2 h-2 rounded-full bg-[#8ee4af]"></div>
                                <span>7 Research Hubs</span>
                            </div>
                            <span className="text-slate-500">Active data collection points</span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="chart-container glow-mint">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#8ee4af]">{visualizations[activeViz].icon}</span>
                        <span className="text-sm font-medium text-white">{visualizations[activeViz].title}</span>
                    </div>
                    <span className="text-xs text-slate-500 ml-7">{visualizations[activeViz].subtitle}</span>
                </div>
                {/* Indicator dots */}
                <div className="flex gap-1.5">
                    {visualizations.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveViz(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === activeViz ? 'bg-[#8ee4af] w-4' : 'bg-slate-600 hover:bg-slate-500'
                            }`}
                        />
                    ))}
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeViz}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderVisualization()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

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
        { name: 'Home', href: '#home', isRoute: false },
        { name: 'About', href: '#about', isRoute: false },
        { name: 'Services', href: '#services', isRoute: false },
        { name: 'Insights', href: '/insights', isRoute: true },
        { name: 'Contact', href: '#contact', isRoute: false },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'shadow-lg' : ''}`} data-testid="navbar">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#home" className="flex items-center" data-testid="logo-link">
                        <img src={LOGO_URL} alt="Data Farm" className="h-16 w-auto" />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            link.isRoute ? (
                                <Link 
                                    key={link.name}
                                    to={link.href}
                                    className="nav-link transition-colors duration-200"
                                    data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a 
                                    key={link.name}
                                    href={link.href}
                                    className="nav-link transition-colors duration-200"
                                    data-testid={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
                                >
                                    {link.name}
                                </a>
                            )
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
                            link.isRoute ? (
                                <Link 
                                    key={link.name}
                                    to={link.href}
                                    className="block py-3 px-4 text-[#1a2b5f] hover:text-[#8ee4af] transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a 
                                    key={link.name}
                                    href={link.href}
                                    className="block py-3 px-4 text-[#1a2b5f] hover:text-[#8ee4af] transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            )
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
                                <div className="text-2xl font-bold text-[#8ee4af]">5+</div>
                                <div className="text-sm text-slate-500">Years</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Rotating Visualizations */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <RotatingVisualization />
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

                {/* Insights CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <Link 
                        to="/insights" 
                        className="inline-flex items-center gap-2 text-[#8ee4af] hover:text-white transition-colors font-medium"
                        data-testid="services-insights-link"
                    >
                        Explore our Data Flashcards & Counters
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
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
        { value: 5, suffix: '+', label: 'Years Experience' }
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

// Contact Form Modal
const ContactFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset after showing success
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            onClose();
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                data-testid="contact-modal"
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />
                
                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-[#0a1628] border border-[#8ee4af]/20 rounded-2xl p-8 w-full max-w-lg shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        data-testid="close-modal"
                    >
                        <X size={24} />
                    </button>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-16 h-16 bg-[#8ee4af]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send size={32} className="text-[#8ee4af]" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                            <p className="text-slate-400">We'll get back to you within 24 hours.</p>
                        </motion.div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-semibold text-white mb-2">Start a Conversation</h3>
                            <p className="text-slate-400 mb-6">Fill out the form below and we'll respond promptly.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Your Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#8ee4af]/50 transition-colors"
                                            placeholder="John Doe"
                                            data-testid="input-name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#8ee4af]/50 transition-colors"
                                            placeholder="john@example.com"
                                            data-testid="input-email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#8ee4af]/50 transition-colors"
                                        placeholder="How can we help?"
                                        data-testid="input-subject"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Message</label>
                                    <div className="relative">
                                        <MessageSquare size={18} className="absolute left-3 top-3 text-slate-500" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#8ee4af]/50 transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                            data-testid="input-message"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    data-testid="submit-form"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Send Message
                                            <Send size={18} />
                                        </span>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Contact Section
const ContactSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
            value: '+255 754 510 366',
            link: 'tel:+255754510366'
        },
        {
            icon: <MapPin size={22} />,
            title: 'Address',
            value: 'P.O. Box 10436, Dar es Salaam, Tanzania',
            link: null
        }
    ];

    return (
        <>
        <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary w-full justify-center mt-6 transition-all duration-200"
                                data-testid="contact-cta"
                            >
                                Start a Conversation
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
        </>
    );
};

// Footer Component
const Footer = () => {
    const socialLinks = [
        { name: 'Twitter', href: 'https://twitter.com/Datafarm_tz', icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        )},
        { name: 'Instagram', href: 'https://www.instagram.com/datafarm_tz/', icon: <Instagram size={18} /> },
        { name: 'Facebook', href: 'https://facebook.com/datafarmtz', icon: <Facebook size={18} /> }
    ];

    return (
        <footer className="footer" data-testid="footer">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-10 mb-10">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <img src={LOGO_URL} alt="Data Farm" className="h-16 w-auto mb-4" />
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
                            <li>+255 754 510 366</li>
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
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Home Page Component
const HomePage = () => {
    return (
        <div className="bg-[#020817] min-h-screen">
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
};

// Main App Component with Routing
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/insights" element={<InsightsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
