import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { 
    ArrowLeft,
    TrendingUp,
    Users,
    Globe,
    BarChart3,
    PieChart,
    Activity,
    Database,
    Zap,
    Calendar,
    RefreshCw,
    Droplets,
    Leaf,
    MapPin,
    ChevronDown,
    Search
} from "lucide-react";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_43ba9d9b-b9fd-49ce-9b96-7d5d269e20ba/artifacts/9eelofd6_HL%20Colored%20Logo.png";

// Countries data
const countries = [
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
];

// Sectors data
const sectors = [
    { id: 'all', name: 'All Sectors', icon: <Globe size={16} /> },
    { id: 'economy', name: 'Economy', icon: <TrendingUp size={16} /> },
    { id: 'water', name: 'Water', icon: <Droplets size={16} /> },
    { id: 'energy', name: 'Energy', icon: <Zap size={16} /> },
    { id: 'agriculture', name: 'Agriculture', icon: <Leaf size={16} /> },
    { id: 'tourism', name: 'Tourism', icon: <MapPin size={16} /> },
    { id: 'demographics', name: 'Demographics', icon: <Users size={16} /> },
    { id: 'health', name: 'Health', icon: <Activity size={16} /> },
    { id: 'education', name: 'Education', icon: <BarChart3 size={16} /> },
    { id: 'infrastructure', name: 'Infrastructure', icon: <Database size={16} /> },
    { id: 'technology', name: 'Technology', icon: <Globe size={16} /> },
    { id: 'trade', name: 'Trade', icon: <TrendingUp size={16} /> },
];

// Flashcard data organized by country and sector
const flashcardsDatabase = {
    TZ: {
        economy: [
            {
                id: 'tz-eco-1',
                category: 'Economy',
                title: 'GDP Growth Rate',
                value: '5.2%',
                description: 'Annual GDP growth rate for 2024',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-eco-2',
                category: 'Economy',
                title: 'GDP Per Capita',
                value: '$1,192',
                description: 'GDP per capita in USD (2024)',
                trend: 'up',
                icon: <BarChart3 size={24} />
            },
            {
                id: 'tz-eco-3',
                category: 'Economy',
                title: 'Inflation Rate',
                value: '3.8%',
                description: 'Annual inflation rate',
                trend: 'stable',
                icon: <Activity size={24} />
            },
            {
                id: 'tz-eco-4',
                category: 'Economy',
                title: 'Export Growth',
                value: '12.4%',
                description: 'Year-over-year export increase',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
        ],
        water: [
            {
                id: 'tz-wat-1',
                category: 'Water',
                title: 'Clean Water Access',
                value: '61%',
                description: 'Population with access to clean water',
                trend: 'up',
                icon: <Droplets size={24} />
            },
            {
                id: 'tz-wat-2',
                category: 'Water',
                title: 'Rural Water Coverage',
                value: '47%',
                description: 'Rural areas with water infrastructure',
                trend: 'up',
                icon: <Droplets size={24} />
            },
            {
                id: 'tz-wat-3',
                category: 'Water',
                title: 'Urban Water Supply',
                value: '84%',
                description: 'Urban population with piped water',
                trend: 'stable',
                icon: <Droplets size={24} />
            },
            {
                id: 'tz-wat-4',
                category: 'Water',
                title: 'Water Projects',
                value: '2,340',
                description: 'Active water infrastructure projects',
                trend: 'up',
                icon: <Activity size={24} />
            },
        ],
        energy: [
            {
                id: 'tz-eng-1',
                category: 'Energy',
                title: 'Electricity Access',
                value: '42%',
                description: 'Population with electricity access',
                trend: 'up',
                icon: <Zap size={24} />
            },
            {
                id: 'tz-eng-2',
                category: 'Energy',
                title: 'Renewable Energy',
                value: '38%',
                description: 'Share of renewable in energy mix',
                trend: 'up',
                icon: <Zap size={24} />
            },
            {
                id: 'tz-eng-3',
                category: 'Energy',
                title: 'Power Generation',
                value: '1,602 MW',
                description: 'Total installed capacity',
                trend: 'up',
                icon: <Activity size={24} />
            },
            {
                id: 'tz-eng-4',
                category: 'Energy',
                title: 'Solar Projects',
                value: '156',
                description: 'Active solar energy projects',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
        ],
        agriculture: [
            {
                id: 'tz-agr-1',
                category: 'Agriculture',
                title: 'GDP Contribution',
                value: '28%',
                description: 'Agriculture share of GDP',
                trend: 'stable',
                icon: <Leaf size={24} />
            },
            {
                id: 'tz-agr-2',
                category: 'Agriculture',
                title: 'Employment Share',
                value: '65%',
                description: 'Workforce in agriculture',
                trend: 'down',
                icon: <Users size={24} />
            },
            {
                id: 'tz-agr-3',
                category: 'Agriculture',
                title: 'Crop Production',
                value: '+8.2%',
                description: 'Year-over-year growth',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-agr-4',
                category: 'Agriculture',
                title: 'Export Crops Value',
                value: '$1.8B',
                description: 'Annual agricultural exports',
                trend: 'up',
                icon: <BarChart3 size={24} />
            },
        ],
        tourism: [
            {
                id: 'tz-tour-1',
                category: 'Tourism',
                title: 'Tourist Arrivals',
                value: '1.8M',
                description: 'Annual international visitors',
                trend: 'up',
                icon: <MapPin size={24} />
            },
            {
                id: 'tz-tour-2',
                category: 'Tourism',
                title: 'Tourism Revenue',
                value: '$2.9B',
                description: 'Annual tourism earnings',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-tour-3',
                category: 'Tourism',
                title: 'National Parks',
                value: '22',
                description: 'Protected national parks',
                trend: 'stable',
                icon: <Globe size={24} />
            },
            {
                id: 'tz-tour-4',
                category: 'Tourism',
                title: 'Hotel Occupancy',
                value: '68%',
                description: 'Average hotel occupancy rate',
                trend: 'up',
                icon: <Activity size={24} />
            },
        ],
        demographics: [
            {
                id: 'tz-dem-1',
                category: 'Demographics',
                title: 'Total Population',
                value: '65.5M',
                description: 'Estimated population in 2024',
                trend: 'up',
                icon: <Users size={24} />
            },
            {
                id: 'tz-dem-2',
                category: 'Demographics',
                title: 'Growth Rate',
                value: '2.9%',
                description: 'Annual population growth',
                trend: 'stable',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-dem-3',
                category: 'Demographics',
                title: 'Urban Population',
                value: '37%',
                description: 'Population living in urban areas',
                trend: 'up',
                icon: <Globe size={24} />
            },
            {
                id: 'tz-dem-4',
                category: 'Demographics',
                title: 'Median Age',
                value: '17.7',
                description: 'Median age in years',
                trend: 'stable',
                icon: <Users size={24} />
            },
        ],
        health: [
            {
                id: 'tz-hlt-1',
                category: 'Health',
                title: 'Life Expectancy',
                value: '66.2',
                description: 'Average life expectancy in years',
                trend: 'up',
                icon: <Activity size={24} />
            },
            {
                id: 'tz-hlt-2',
                category: 'Health',
                title: 'Health Expenditure',
                value: '3.8%',
                description: 'Health spending as % of GDP',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-hlt-3',
                category: 'Health',
                title: 'Hospital Beds',
                value: '0.7',
                description: 'Hospital beds per 1,000 people',
                trend: 'stable',
                icon: <Database size={24} />
            },
            {
                id: 'tz-hlt-4',
                category: 'Health',
                title: 'Vaccination Rate',
                value: '84%',
                description: 'Child immunization coverage',
                trend: 'up',
                icon: <Users size={24} />
            },
        ],
        education: [
            {
                id: 'tz-edu-1',
                category: 'Education',
                title: 'Literacy Rate',
                value: '78%',
                description: 'Adult literacy rate',
                trend: 'up',
                icon: <BarChart3 size={24} />
            },
            {
                id: 'tz-edu-2',
                category: 'Education',
                title: 'Primary Enrollment',
                value: '91%',
                description: 'Primary school enrollment rate',
                trend: 'up',
                icon: <Users size={24} />
            },
            {
                id: 'tz-edu-3',
                category: 'Education',
                title: 'Secondary Enrollment',
                value: '32%',
                description: 'Secondary school enrollment rate',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-edu-4',
                category: 'Education',
                title: 'Education Budget',
                value: '22%',
                description: 'Government spending on education',
                trend: 'stable',
                icon: <BarChart3 size={24} />
            },
        ],
        infrastructure: [
            {
                id: 'tz-inf-1',
                category: 'Infrastructure',
                title: 'Paved Roads',
                value: '12,786 km',
                description: 'Total paved road network',
                trend: 'up',
                icon: <Database size={24} />
            },
            {
                id: 'tz-inf-2',
                category: 'Infrastructure',
                title: 'Rail Network',
                value: '3,689 km',
                description: 'Total railway length',
                trend: 'up',
                icon: <Activity size={24} />
            },
            {
                id: 'tz-inf-3',
                category: 'Infrastructure',
                title: 'Port Capacity',
                value: '18.2M',
                description: 'Annual port tonnage capacity',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-inf-4',
                category: 'Infrastructure',
                title: 'Airports',
                value: '58',
                description: 'Total number of airports',
                trend: 'stable',
                icon: <Globe size={24} />
            },
        ],
        technology: [
            {
                id: 'tz-tech-1',
                category: 'Technology',
                title: 'Internet Penetration',
                value: '32%',
                description: 'Population with internet access',
                trend: 'up',
                icon: <Globe size={24} />
            },
            {
                id: 'tz-tech-2',
                category: 'Technology',
                title: 'Mobile Subscriptions',
                value: '87%',
                description: 'Mobile phone penetration rate',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-tech-3',
                category: 'Technology',
                title: 'Mobile Money Users',
                value: '23M',
                description: 'Active mobile money accounts',
                trend: 'up',
                icon: <Users size={24} />
            },
            {
                id: 'tz-tech-4',
                category: 'Technology',
                title: 'Tech Startups',
                value: '450+',
                description: 'Registered tech companies',
                trend: 'up',
                icon: <Activity size={24} />
            },
        ],
        trade: [
            {
                id: 'tz-trd-1',
                category: 'Trade',
                title: 'Total Exports',
                value: '$7.8B',
                description: 'Annual export value',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
            {
                id: 'tz-trd-2',
                category: 'Trade',
                title: 'Total Imports',
                value: '$10.9B',
                description: 'Annual import value',
                trend: 'up',
                icon: <BarChart3 size={24} />
            },
            {
                id: 'tz-trd-3',
                category: 'Trade',
                title: 'Trade Balance',
                value: '-$3.1B',
                description: 'Trade deficit',
                trend: 'stable',
                icon: <Activity size={24} />
            },
            {
                id: 'tz-trd-4',
                category: 'Trade',
                title: 'FDI Inflows',
                value: '$1.1B',
                description: 'Foreign direct investment',
                trend: 'up',
                icon: <TrendingUp size={24} />
            },
        ],
    }
};

// Live counter data
const countersData = [
    { id: 1, label: "Data Points Collected", value: 2847593, suffix: "", rate: 12 },
    { id: 2, label: "Reports Generated", value: 15847, suffix: "", rate: 2 },
    { id: 3, label: "Active Research Projects", value: 47, suffix: "", rate: 0 },
    { id: 4, label: "Surveys Completed", value: 3291, suffix: "", rate: 1 }
];

// Flashcard Component
const FlashCard = ({ card }) => {
    const trendColors = {
        up: "text-green-400",
        down: "text-red-400",
        stable: "text-yellow-400"
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-[#8ee4af]/40 hover:shadow-lg hover:shadow-[#8ee4af]/10"
            data-testid={`flashcard-${card.id}`}
        >
            <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-[#8ee4af] uppercase tracking-wider bg-[#8ee4af]/10 px-3 py-1 rounded-full">
                    {card.category}
                </span>
                <div className={`${trendColors[card.trend]}`}>
                    {card.icon}
                </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
            <div className="text-4xl font-bold text-[#8ee4af] mb-2">{card.value}</div>
            <p className="text-sm text-slate-400">{card.description}</p>
        </motion.div>
    );
};

// Live Counter Component
const LiveCounter = ({ counter }) => {
    const [value, setValue] = useState(counter.value);

    useEffect(() => {
        if (counter.rate > 0) {
            const interval = setInterval(() => {
                setValue(prev => prev + counter.rate);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [counter.rate]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[#1a2b5f] to-[#0a1628] border border-[#8ee4af]/20 rounded-xl p-8 text-center"
            data-testid={`counter-${counter.id}`}
        >
            <div className="flex items-center justify-center mb-4">
                <Database size={28} className="text-[#8ee4af]" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp 
                    end={value} 
                    duration={1} 
                    separator="," 
                    preserveValue={true}
                />
                {counter.suffix}
            </div>
            <p className="text-slate-400">{counter.label}</p>
            {counter.rate > 0 && (
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#8ee4af]">
                    <RefreshCw size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
                    <span>Live updating</span>
                </div>
            )}
        </motion.div>
    );
};

// Country Selector Component
const CountrySelector = ({ selectedCountry, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const selected = countries.find(c => c.code === selectedCountry);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-lg px-4 py-3 text-white hover:border-[#8ee4af]/40 transition-colors min-w-[200px]"
                data-testid="country-selector"
            >
                <span className="text-xl">{selected?.flag}</span>
                <span className="flex-1 text-left">{selected?.name}</span>
                <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0a1628] border border-[#8ee4af]/20 rounded-lg shadow-xl z-20 overflow-hidden"
                >
                    <div className="p-2 border-b border-[#8ee4af]/10">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search country..."
                                className="w-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#8ee4af]/50"
                            />
                        </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {filteredCountries.map((country) => (
                            <button
                                key={country.code}
                                onClick={() => {
                                    onSelect(country.code);
                                    setIsOpen(false);
                                    setSearch('');
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#1a2b5f]/50 transition-colors ${
                                    selectedCountry === country.code ? 'bg-[#1a2b5f]/30' : ''
                                }`}
                            >
                                <span className="text-xl">{country.flag}</span>
                                <span className="text-white">{country.name}</span>
                            </button>
                        ))}
                        {filteredCountries.length === 0 && (
                            <div className="px-4 py-3 text-slate-500 text-sm">No countries found</div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// Insights Page Component
const InsightsPage = () => {
    const [activeTab, setActiveTab] = useState('flashcards');
    const [selectedCountry, setSelectedCountry] = useState('TZ');
    const [selectedSector, setSelectedSector] = useState('all');

    // Get flashcards based on selected country and sector
    const getFlashcards = () => {
        const countryData = flashcardsDatabase[selectedCountry] || {};
        
        if (selectedSector === 'all') {
            // Combine all sectors
            return Object.values(countryData).flat();
        }
        
        return countryData[selectedSector] || [];
    };

    const flashcards = getFlashcards();

    return (
        <div className="min-h-screen bg-[#020817]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#1a2b5f]/10 shadow-sm">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center" data-testid="insights-logo">
                            <img src={LOGO_URL} alt="Data Farm" className="h-16 w-auto" />
                        </Link>
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 text-[#1a2b5f] hover:text-[#1a2b5f]/70 transition-colors font-medium"
                            data-testid="back-to-home"
                        >
                            <ArrowLeft size={20} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="text-[#8ee4af] text-sm font-medium uppercase tracking-wider">Data Insights</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                            Explore Our Data
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Access real-time statistics, data flashcards, and live counters across diverse topics and sectors.
                        </p>
                    </motion.div>

                    {/* Main Tabs */}
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveTab('flashcards')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === 'flashcards'
                                    ? 'bg-[#8ee4af] text-[#020817]'
                                    : 'bg-[#1a2b5f]/30 text-white hover:bg-[#1a2b5f]/50'
                            }`}
                            data-testid="tab-flashcards"
                        >
                            <span className="flex items-center gap-2">
                                <PieChart size={18} />
                                Data Flashcards
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('counters')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === 'counters'
                                    ? 'bg-[#8ee4af] text-[#020817]'
                                    : 'bg-[#1a2b5f]/30 text-white hover:bg-[#1a2b5f]/50'
                            }`}
                            data-testid="tab-counters"
                        >
                            <span className="flex items-center gap-2">
                                <Activity size={18} />
                                Live Counters
                            </span>
                        </button>
                    </div>

                    {/* Flashcards Section */}
                    {activeTab === 'flashcards' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Filters Row */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    {/* Country Selector */}
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">Country</label>
                                        <CountrySelector 
                                            selectedCountry={selectedCountry}
                                            onSelect={setSelectedCountry}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Calendar size={16} />
                                    <span>Updated: {new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Sector Tabs */}
                            <div className="mb-8">
                                <label className="block text-xs text-slate-500 mb-3 uppercase tracking-wider">Select Sector</label>
                                <div className="relative flex items-center gap-2">
                                    {/* Left Arrow */}
                                    <button
                                        onClick={() => {
                                            const container = document.getElementById('sector-scroll');
                                            container.scrollBy({ left: -200, behavior: 'smooth' });
                                        }}
                                        className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 flex items-center justify-center text-[#8ee4af] hover:bg-[#1a2b5f]/50 transition-colors"
                                        data-testid="sector-scroll-left"
                                    >
                                        <ChevronDown size={20} className="rotate-90" />
                                    </button>
                                    
                                    {/* Scrollable Sector Container */}
                                    <div 
                                        id="sector-scroll"
                                        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {sectors.map((sector) => (
                                            <button
                                                key={sector.id}
                                                onClick={() => setSelectedSector(sector.id)}
                                                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                                    selectedSector === sector.id
                                                        ? 'bg-[#8ee4af] text-[#020817]'
                                                        : 'bg-[#1a2b5f]/20 text-slate-300 hover:bg-[#1a2b5f]/40 border border-[#8ee4af]/10'
                                                }`}
                                                data-testid={`sector-${sector.id}`}
                                            >
                                                {sector.icon}
                                                {sector.name}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Right Arrow */}
                                    <button
                                        onClick={() => {
                                            const container = document.getElementById('sector-scroll');
                                            container.scrollBy({ left: 200, behavior: 'smooth' });
                                        }}
                                        className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a2b5f]/30 border border-[#8ee4af]/20 flex items-center justify-center text-[#8ee4af] hover:bg-[#1a2b5f]/50 transition-colors"
                                        data-testid="sector-scroll-right"
                                    >
                                        <ChevronDown size={20} className="-rotate-90" />
                                    </button>
                                </div>
                            </div>

                            {/* Flashcards Grid */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${selectedCountry}-${selectedSector}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                >
                                    {flashcards.length > 0 ? (
                                        flashcards.map((card) => (
                                            <FlashCard key={card.id} card={card} />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12">
                                            <Globe size={48} className="mx-auto text-slate-600 mb-4" />
                                            <p className="text-slate-400">No data available for this selection</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Stats Summary */}
                            {flashcards.length > 0 && (
                                <div className="mt-8 text-center text-sm text-slate-500">
                                    Showing {flashcards.length} data points for {countries.find(c => c.code === selectedCountry)?.name}
                                    {selectedSector !== 'all' && ` in ${sectors.find(s => s.id === selectedSector)?.name}`}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Counters Section */}
                    {activeTab === 'counters' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-semibold text-white">Real-Time Statistics</h2>
                                <div className="flex items-center gap-2 text-[#8ee4af] text-sm">
                                    <Activity size={16} className="animate-pulse" />
                                    <span>Live Data</span>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {countersData.map((counter) => (
                                    <LiveCounter key={counter.id} counter={counter} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 text-center bg-[#1a2b5f]/20 border border-[#8ee4af]/10 rounded-2xl p-10"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-4">Need Custom Data Insights?</h3>
                        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                            We can help you with tailored research, custom dashboards, and specialized data analysis for your organization.
                        </p>
                        <Link 
                            to="/#contact" 
                            className="btn-primary inline-flex items-center gap-2"
                            data-testid="insights-contact-cta"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[#1a2b5f]/10 py-6">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Data Farm. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default InsightsPage;
