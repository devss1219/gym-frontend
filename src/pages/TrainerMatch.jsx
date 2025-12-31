import React, { useState } from 'react';
import axios from 'axios';

const TrainerMatch = () => {
    const [formData, setFormData] = useState({
        userGoal: 'Weight Loss',
        userTime: 'Morning',
        userLevel: 'Beginner'
    });
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMatch = async () => {
        setLoading(true);
        setRecommendation(''); // Purana result clear karein
        
        console.log("🚀 Step 1: Frontend se request bhej rahe hain...", formData);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/match-trainer', formData);
            
            console.log("✅ Step 3: Backend se response mil gaya!", res.data);
            setRecommendation(res.data.recommendation);
        } catch (err) {
            console.error("❌ FRONTEND ERROR DETECTED:");
            
            if (err.response) {
                // Backend tak request gayi par Gemini ya Server ne error diya (Status 500, 404, etc.)
                console.error("Status:", err.response.status);
                console.error("Backend Message:", err.response.data);
                alert(`Backend Error: ${err.response.data.message || "Gemini AI fail ho gaya"}`);
            } else if (err.request) {
                // Request hi nahi gayi (Server band hai ya CORS issue hai)
                console.error("No response received from Server. Is Backend running?");
                alert("AI Server connect nahi ho pa raha! Backend Terminal check karein.");
            } else {
                console.error("Error setting up request:", err.message);
                alert("Kuch galat ho gaya: " + err.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-orange-500">AI Trainer Matchmaker</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
                <div>
                    <label className="block mb-2">Aapka Goal Kya Hai?</label>
                    <select 
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        value={formData.userGoal}
                        onChange={(e) => setFormData({...formData, userGoal: e.target.value})}
                    >
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Yoga & Flexibility">Yoga & Flexibility</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Kaunsa Time Sahi Rahega?</label>
                    <select 
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        value={formData.userTime}
                        onChange={(e) => setFormData({...formData, userTime: e.target.value})}
                    >
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                    </select>
                </div>

                <button 
                    onClick={handleMatch}
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 p-3 rounded font-bold transition disabled:bg-gray-600"
                >
                    {loading ? "AI Soch raha hai..." : "Find My Best Trainer"}
                </button>
            </div>

            {recommendation && (
                <div className="mt-8 p-6 bg-white text-gray-900 rounded-lg max-w-2xl border-l-8 border-orange-500 shadow-2xl">
                    <h2 className="font-bold text-xl mb-2 text-orange-600">✨ AI Suggestion:</h2>
                    <p className="text-lg italic font-medium">{recommendation}</p>
                </div>
            )}
        </div>
    );
};

export default TrainerMatch;