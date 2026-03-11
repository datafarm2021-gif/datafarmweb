import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    RefreshCw
} from "lucide-react";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_43ba9d9b-b9fd-49ce-9b96-7d5d269e20ba/artifacts/9eelofd6_HL%20Colored%20Logo.png";

// Sample flashcard data
const flashcardsData = [
    {
        id: 1,
        category: "Economy",
        title: "Tanzania GDP Growth",
        value: "5.2%",
        description: "Annual GDP growth rate for 2024",
        trend: "up",
        icon: <TrendingUp size={24} />
    },
    {
        id: 2,
        category: "Population",
        title: "Tanzania Population",
        value: "65.5M",
        description: "Estimated population in 2024",
        trend: "up",
        icon: <Users size={24} />
    },
    {
        id: 3,
        category: "Internet",
        title: "Internet Penetration",
        value: "32%",
        description: "Percentage of population with internet access",
        trend: "up",
        icon: <Globe size={24} />
    },
    {
        id: 4,
        category: "Agriculture",
        title: "Agricultural Output",
        value: "28%",
        description: "Agriculture contribution to GDP",
        trend: "stable",
        icon: <BarChart3 size={24} />
    },
    {
        id: 5,
        category: "Trade",
        title: "Export Growth",
        value: "12.4%",
        description: "Year-over-year export increase",
        trend: "up",
        icon: <Activity size={24} />
    },
    {
        id: 6,
        category: "Energy",
        title: "Electricity Access",
        value: "42%",
        description: "Population with electricity access",
        trend: "up",
        icon: <Zap size={24} />
    }
];

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

// Insights Page Component
const InsightsPage = () => {
    const [activeTab, setActiveTab] = useState('flashcards');

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
                            className="flex items-center gap-2 text-[#1a2b5f] hover:text-[#8ee4af] transition-colors font-medium"
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

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-12">
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
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-semibold text-white">Data of the Day</h2>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Calendar size={16} />
                                    <span>Updated: {new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {flashcardsData.map((card) => (
                                    <FlashCard key={card.id} card={card} />
                                ))}
                            </div>
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
