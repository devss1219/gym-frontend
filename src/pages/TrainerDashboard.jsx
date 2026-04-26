import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const statusColors = {
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    confirmed: "text-green-400 bg-green-400/10 border-green-400/30",
    rejected: "text-red-400 bg-red-400/10 border-red-400/30",
};

const TrainerDashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [actionState, setActionState] = useState({}); // { [bookingId]: { workoutPlan, submitting } }

    useEffect(() => {
        if (!user || !token) { navigate("/login"); return; }
        if (user.role !== "trainer") { navigate("/"); return; }
        fetchBookings();
    }, [user, token]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/bookings/trainer`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (bookingId, status) => {
        const workoutPlan = actionState[bookingId]?.workoutPlan || "";
        setActionState(prev => ({ ...prev, [bookingId]: { ...prev[bookingId], submitting: true } }));
        try {
            await axios.patch(
                `${API_BASE}/api/bookings/${bookingId}`,
                { status, workoutPlan },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Update local state instantly
            setBookings(prev => prev.map(b =>
                b._id === bookingId ? { ...b, status, workoutPlan } : b
            ));
        } catch (err) {
            alert(err.response?.data?.message || "Action failed.");
        } finally {
            setActionState(prev => ({ ...prev, [bookingId]: { ...prev[bookingId], submitting: false } }));
        }
    };

    const filtered = activeFilter === "all" ? bookings : bookings.filter(b => b.status === activeFilter);
    const counts = {
        all: bookings.length,
        pending: bookings.filter(b => b.status === "pending").length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        rejected: bookings.filter(b => b.status === "rejected").length,
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* HEADER */}
            <div className="relative pt-24 pb-12 px-8 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 container mx-auto max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs block mb-3">Trainer Portal</span>
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic text-white leading-none">
                            Session <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Requests</span>
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm">Manage your incoming booking requests and add workout plans</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
                    >
                        {[
                            { key: "all", label: "Total Requests", count: counts.all, color: "text-white", glow: "" },
                            { key: "pending", label: "Awaiting Action", count: counts.pending, color: "text-yellow-400", glow: "shadow-yellow-900/20" },
                            { key: "confirmed", label: "Confirmed", count: counts.confirmed, color: "text-green-400", glow: "shadow-green-900/20" },
                            { key: "rejected", label: "Rejected", count: counts.rejected, color: "text-red-400", glow: "shadow-red-900/20" },
                        ].map(stat => (
                            <motion.button
                                key={stat.key} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveFilter(stat.key)}
                                className={`bg-gray-900/60 backdrop-blur-md border rounded-2xl p-5 text-center transition-all duration-300 shadow-lg ${stat.glow} ${
                                    activeFilter === stat.key ? "border-orange-500/50" : "border-white/5 hover:border-white/20"
                                }`}
                            >
                                <p className={`text-4xl font-black ${stat.color}`}>{stat.count}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* BOOKINGS */}
            <div className="container mx-auto max-w-5xl px-8 pb-24">
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-black text-gray-500 uppercase tracking-tight">No {activeFilter === 'all' ? '' : activeFilter} requests</h3>
                        <p className="text-gray-600 text-sm mt-2">New booking requests will appear here</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {filtered.map((booking, i) => {
                                const memberName = booking.memberId?.name || "Member";
                                const memberEmail = booking.memberId?.email || "";
                                const stateForBooking = actionState[booking._id] || {};
                                const isPending = booking.status === "pending";

                                return (
                                    <motion.div
                                        key={booking._id}
                                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.08 }}
                                        className="bg-gray-900/70 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:border-orange-500/20 transition-all duration-300"
                                    >
                                        {/* Card Top */}
                                        <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                                            {/* Member info */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center flex-shrink-0 text-white font-black text-lg uppercase shadow-lg">
                                                {memberName.charAt(0)}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center flex-wrap gap-3">
                                                    <h3 className="font-black text-white uppercase tracking-tight text-lg">{memberName}</h3>
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${statusColors[booking.status]}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-xs mt-1">{memberEmail}</p>
                                            </div>

                                            <div className="text-right text-xs text-gray-600">
                                                {new Date(booking.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>

                                        {/* Booking Details Strip */}
                                        <div className="px-6 pb-5 flex flex-wrap gap-6">
                                            {[
                                                { label: "Category", value: booking.category, icon: "🏷️" },
                                                { label: "Date", value: booking.preferredDate, icon: "📅" },
                                                { label: "Time", value: booking.preferredTime, icon: "🕐" },
                                            ].map(d => (
                                                <div key={d.label}>
                                                    <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">{d.label}</p>
                                                    <p className="text-white text-sm font-bold mt-0.5">{d.icon} {d.value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Member Message */}
                                        {booking.message && (
                                            <div className="mx-6 mb-5 bg-gray-800/60 border border-white/5 rounded-xl p-4">
                                                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Member's Message</p>
                                                <p className="text-gray-300 text-sm italic">"{booking.message}"</p>
                                            </div>
                                        )}

                                        {/* Action Panel — only for pending */}
                                        {isPending && (
                                            <div className="border-t border-white/5 bg-black/20 px-6 py-5 space-y-4">
                                                <div>
                                                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                                                        📋 Workout Plan <span className="text-gray-600 normal-case">(fill before confirming)</span>
                                                    </label>
                                                    <textarea
                                                        rows={4}
                                                        placeholder="e.g.&#10;Day 1: Squats 4x12, Lunges 3x15&#10;Day 2: Upper body - Bench Press 4x10&#10;Day 3: Rest + 30 min walk..."
                                                        value={stateForBooking.workoutPlan || ""}
                                                        onChange={e => setActionState(prev => ({
                                                            ...prev,
                                                            [booking._id]: { ...prev[booking._id], workoutPlan: e.target.value }
                                                        }))}
                                                        className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none placeholder-gray-600"
                                                    />
                                                </div>

                                                <div className="flex gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                        disabled={stateForBooking.submitting}
                                                        onClick={() => handleAction(booking._id, "confirmed")}
                                                        className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-green-900/30 hover:shadow-green-600/30 transition-shadow disabled:opacity-40"
                                                    >
                                                        {stateForBooking.submitting ? "Processing..." : "✅ Confirm Session"}
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                        disabled={stateForBooking.submitting}
                                                        onClick={() => handleAction(booking._id, "rejected")}
                                                        className="px-6 py-3 bg-red-900/40 hover:bg-red-600/80 text-red-400 hover:text-white font-black rounded-xl text-xs uppercase tracking-widest border border-red-500/20 hover:border-red-500 transition-all disabled:opacity-40"
                                                    >
                                                        ❌ Reject
                                                    </motion.button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Already Confirmed — show workout plan */}
                                        {booking.status === "confirmed" && booking.workoutPlan && (
                                            <div className="border-t border-green-500/10 bg-green-900/10 px-6 py-5">
                                                <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">📋 Workout Plan Sent</p>
                                                <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{booking.workoutPlan}</p>
                                            </div>
                                        )}
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

export default TrainerDashboard;
