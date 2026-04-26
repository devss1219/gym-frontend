import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const statusConfig = {
    pending: {
        label: "Pending",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/30",
        icon: "⏳",
        pulse: true,
    },
    confirmed: {
        label: "Confirmed",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/30",
        icon: "✅",
        pulse: false,
    },
    rejected: {
        label: "Rejected",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/30",
        icon: "❌",
        pulse: false,
    },
};

const MyBookings = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
            return;
        }
        fetchBookings();
    }, [user, token]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/bookings/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Fetch bookings error:", err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = activeFilter === "all"
        ? bookings
        : bookings.filter(b => b.status === activeFilter);

    const counts = {
        all: bookings.length,
        pending: bookings.filter(b => b.status === "pending").length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        rejected: bookings.filter(b => b.status === "rejected").length,
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* HEADER */}
            <div className="relative pt-24 pb-16 px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 container mx-auto max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs block mb-3">Dashboard</span>
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic text-white leading-none">
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Bookings</span>
                        </h1>
                        <p className="text-gray-500 mt-4 text-sm">Track your session requests and workout plans</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="grid grid-cols-4 gap-4 mt-10"
                    >
                        {[
                            { key: "all", label: "Total", count: counts.all, color: "text-white" },
                            { key: "pending", label: "Pending", count: counts.pending, color: "text-yellow-400" },
                            { key: "confirmed", label: "Confirmed", count: counts.confirmed, color: "text-green-400" },
                            { key: "rejected", label: "Rejected", count: counts.rejected, color: "text-red-400" },
                        ].map(stat => (
                            <button
                                key={stat.key}
                                onClick={() => setActiveFilter(stat.key)}
                                className={`bg-gray-900/60 border rounded-2xl p-4 text-center transition-all duration-300 ${
                                    activeFilter === stat.key ? "border-orange-500/50 shadow-lg shadow-orange-900/20" : "border-white/5 hover:border-white/20"
                                }`}
                            >
                                <p className={`text-3xl font-black ${stat.color}`}>{stat.count}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
                            </button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* BOOKINGS LIST */}
            <div className="container mx-auto max-w-4xl px-8 pb-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="flex gap-2">
                            {[0,1,2].map(i => (
                                <motion.div key={i} className="w-3 h-3 rounded-full bg-orange-500"
                                    animate={{ y: [-8, 0, -8] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                            ))}
                        </div>
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <div className="text-6xl mb-4">🏋️</div>
                        <h3 className="text-xl font-black text-gray-500 uppercase tracking-tight">No {activeFilter === 'all' ? '' : activeFilter} bookings yet</h3>
                        <p className="text-gray-600 text-sm mt-2">Book a session with one of our elite trainers</p>
                        <button
                            onClick={() => navigate("/select-workout")}
                            className="mt-6 px-8 py-3 bg-orange-600 text-white font-black rounded-xl uppercase text-xs tracking-widest hover:bg-orange-500 transition-colors"
                        >
                            Find a Trainer →
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {filtered.map((booking, i) => {
                                const cfg = statusConfig[booking.status] || statusConfig.pending;
                                const isExpanded = expandedId === booking._id;
                                const trainerName = booking.trainerId?.name || "Trainer";
                                const trainerSpec = booking.trainerId?.specialization || "Coach";

                                return (
                                    <motion.div
                                        key={booking._id}
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }} transition={{ delay: i * 0.07 }}
                                        className={`bg-gray-900/60 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 ${cfg.border} hover:shadow-lg`}
                                    >
                                        {/* Card Header */}
                                        <div
                                            className="p-6 cursor-pointer flex items-center gap-5"
                                            onClick={() => setExpandedId(isExpanded ? null : booking._id)}
                                        >
                                            {/* Trainer Avatar */}
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 border border-white/10">
                                                <img
                                                    src={booking.trainerId?.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200"}
                                                    alt={trainerName} className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200"; }}
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h3 className="font-black text-white uppercase tracking-tight">{trainerName}</h3>
                                                    <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">{trainerSpec}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                                                    <span>📅 {booking.preferredDate}</span>
                                                    <span>🕐 {booking.preferredTime}</span>
                                                    <span>🏷️ {booking.category}</span>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                                {cfg.pulse && (
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                                                    </span>
                                                )}
                                                {cfg.icon} {cfg.label}
                                            </div>

                                            <svg
                                                className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>

                                        {/* Expanded Details */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-white/5 px-6 pb-6 pt-5 space-y-4">
                                                        {booking.message && (
                                                            <div className="bg-gray-800/50 rounded-xl p-4">
                                                                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Your Message</p>
                                                                <p className="text-gray-300 text-sm italic">"{booking.message}"</p>
                                                            </div>
                                                        )}

                                                        {booking.status === "confirmed" && booking.workoutPlan && (
                                                            <motion.div
                                                                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                                                className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-500/20 rounded-xl p-5"
                                                            >
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <span className="text-xl">📋</span>
                                                                    <h4 className="font-black text-green-400 text-xs uppercase tracking-widest">Your Workout Plan</h4>
                                                                </div>
                                                                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{booking.workoutPlan}</p>
                                                            </motion.div>
                                                        )}

                                                        {booking.status === "rejected" && (
                                                            <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                                                                <p className="text-red-400 text-sm font-bold">Session was not approved by the trainer. Please try booking another time slot.</p>
                                                            </div>
                                                        )}

                                                        {booking.status === "pending" && (
                                                            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-4">
                                                                <p className="text-yellow-400 text-sm font-bold">⏳ Waiting for trainer to confirm your session. You'll see updates here!</p>
                                                            </div>
                                                        )}

                                                        <p className="text-gray-700 text-xs">
                                                            Booked on {new Date(booking.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
