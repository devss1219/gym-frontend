import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const timeSlots = ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];
const categories = ["Strength", "Cardio", "Yoga", "CrossFit", "General Fitness"];

const TrainerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [booking, setBooking] = useState({
        category: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/trainers/${id}`);
                setTrainer(res.data);
                setBooking(prev => ({ ...prev, category: res.data.specialization || "General Fitness" }));
            } catch (err) {
                console.error("Trainer fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainer();
    }, [id]);

    const handleBook = () => {
        if (!user || !token) {
            navigate("/login");
            return;
        }
        setShowModal(true);
    };

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        if (!booking.preferredDate || !booking.preferredTime) return;
        setSubmitting(true);
        try {
            await axios.post(
                `${API_BASE}/api/bookings`,
                { ...booking, trainerId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMsg("🎉 Session booked! Check your bookings for updates.");
            setTimeout(() => {
                setShowModal(false);
                setSuccessMsg("");
            }, 2500);
        } catch (err) {
            alert(err.response?.data?.message || "Booking failed. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="flex gap-2">
                    {[0,1,2].map(i => (
                        <motion.div key={i} className="w-3 h-3 rounded-full bg-orange-500"
                            animate={{ y: [-8, 0, -8] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                    ))}
                </div>
            </div>
        );
    }

    if (!trainer) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
                <p className="text-2xl font-black text-gray-400">Trainer not found.</p>
                <button onClick={() => navigate("/select-workout")} className="px-6 py-2 bg-orange-600 rounded-xl font-bold text-sm">← Back to Trainers</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* HERO SECTION */}
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <img
                    src={trainer.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000"}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-transparent" />

                {/* Back Button */}
                <button
                    onClick={() => navigate("/select-workout")}
                    className="absolute top-28 left-8 flex items-center gap-2 text-sm font-bold text-white/70 hover:text-orange-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Trainers
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <span className="inline-block bg-orange-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                            {trainer.specialization || "Expert Coach"}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none mb-2">
                            {trainer.name}
                        </h1>
                        <p className="text-gray-400 text-lg font-medium">{trainer.experience || "Professional Fitness Trainer"}</p>
                    </motion.div>
                </div>
            </div>

            {/* STATS STRIP */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-gray-900/60 backdrop-blur-xl border-y border-white/5"
            >
                <div className="container mx-auto px-8 py-6 flex flex-wrap gap-8 justify-center md:justify-start">
                    {[
                        { label: "Specialization", value: trainer.specialization || "General Fitness" },
                        { label: "Rating", value: `⭐ ${trainer.rating || 4.5} / 5.0` },
                        { label: "Experience", value: trainer.experience || "2+ Years" },
                        { label: "Status", value: "✅ Available" },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-orange-500 font-black text-xs uppercase tracking-widest">{stat.label}</p>
                            <p className="text-white font-bold text-sm mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Bio */}
                <div className="lg:col-span-2 space-y-10">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-1 bg-orange-600 rounded-full inline-block" />
                            About {trainer.name.split(' ')[0]}
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-base">
                            {trainer.bio ||
                                `${trainer.name} is a dedicated ${trainer.specialization || "fitness"} expert at No Limit Gym. 
                                With a passion for transforming lives through disciplined training and expert guidance, 
                                they craft personalized programs that push members beyond their limits to achieve extraordinary results. 
                                Every session is designed to challenge, motivate, and inspire lasting change.`
                            }
                        </p>
                    </motion.div>

                    {/* What to Expect */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-orange-600 rounded-full inline-block" />
                            What to Expect
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: "🎯", title: "Personalized Plan", desc: "Custom workout program tailored to your goals" },
                                { icon: "📊", title: "Progress Tracking", desc: "Regular assessments to monitor your transformation" },
                                { icon: "🔥", title: "Intense Sessions", desc: "High-energy training that delivers real results" },
                                { icon: "🧠", title: "Expert Guidance", desc: "Science-backed techniques for optimal performance" },
                            ].map(item => (
                                <div key={item.title} className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 hover:border-orange-500/30 transition-all duration-300">
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <h3 className="font-black text-white text-sm uppercase tracking-wide mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Booking CTA */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                    className="lg:col-span-1"
                >
                    <div className="sticky top-28 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-orange-600">
                                <img
                                    src={trainer.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200"}
                                    alt={trainer.name} className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200"; }}
                                />
                            </div>
                            <h3 className="font-black text-white text-lg uppercase tracking-tight">{trainer.name}</h3>
                            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mt-1">{trainer.specialization}</p>
                        </div>

                        <div className="space-y-3 mb-6 text-sm">
                            <div className="flex justify-between text-gray-400">
                                <span>Session Type</span>
                                <span className="text-white font-bold">1-on-1 Training</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Duration</span>
                                <span className="text-white font-bold">60 Minutes</span>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex justify-between text-gray-400">
                                <span>Booking Status</span>
                                <span className="text-green-400 font-bold">Open</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={handleBook}
                            className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-2xl shadow-lg shadow-orange-900/40 uppercase tracking-widest text-xs hover:shadow-orange-600/40 transition-shadow"
                        >
                            Book a Session
                        </motion.button>

                        {!user && (
                            <p className="text-center text-gray-600 text-xs mt-3">* Login required to book</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* BOOKING MODAL */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
                        onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0 }} transition={{ type: "spring", damping: 25 }}
                            className="bg-gray-900 border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl"
                        >
                            {successMsg ? (
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                                    <div className="text-6xl mb-4">🎉</div>
                                    <p className="text-white font-black text-xl">{successMsg}</p>
                                    <button onClick={() => navigate('/my-bookings')} className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-xl font-bold text-sm">
                                        View My Bookings →
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Book Session</h2>
                                            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mt-1">with {trainer.name}</p>
                                        </div>
                                        <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-white transition-colors text-2xl leading-none">×</button>
                                    </div>

                                    <form onSubmit={handleSubmitBooking} className="space-y-5">
                                        {/* Category */}
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Workout Category</label>
                                            <select
                                                value={booking.category}
                                                onChange={e => setBooking({ ...booking, category: e.target.value })}
                                                className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                                required
                                            >
                                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Preferred Date</label>
                                            <input
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                value={booking.preferredDate}
                                                onChange={e => setBooking({ ...booking, preferredDate: e.target.value })}
                                                className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                                required
                                            />
                                        </div>

                                        {/* Time */}
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Preferred Time</label>
                                            <div className="grid grid-cols-5 gap-2">
                                                {timeSlots.map(slot => (
                                                    <button
                                                        type="button" key={slot}
                                                        onClick={() => setBooking({ ...booking, preferredTime: slot })}
                                                        className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                                                            booking.preferredTime === slot
                                                                ? "bg-orange-600 text-white"
                                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                                        }`}
                                                    >{slot}</button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Message (Optional)</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Tell the trainer about your goals, fitness level, or any concerns..."
                                                value={booking.message}
                                                onChange={e => setBooking({ ...booking, message: e.target.value })}
                                                className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none placeholder-gray-600"
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={submitting || !booking.preferredDate || !booking.preferredTime}
                                            className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? "Booking..." : "Confirm Booking →"}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TrainerProfile;
