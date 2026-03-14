import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Activity, Clock, CheckCircle2,
    CalendarClock, TrendingUp
} from 'lucide-react';
import { modelService } from '../services/api';

const Dashboard = () => {
    // Form State
    const [formData, setFormData] = useState({
        age: '', sleep_duration: '', heart_rate: '', stress: '', glucose: '', cholesterol: '',
        gender: '0', condition: '0', condition_name: 'Hypertension', drug: '0', dosage: '', duration: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    // Sample recent activities placeholder
    const [activities] = useState([
        { id: 1, user: 'John Doe', action: 'Checked Blood Pressure', time: '2h ago' },
        { id: 2, user: 'Jane Smith', action: 'Updated Medication', time: '5h ago' }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConditionChange = (e) => {
        const conditionValue = e.target.value;
        const conditionNames = {
            '0': 'Hypertension', '1': 'Diabetes', '2': 'Heart Disease', '3': 'Insomnia', '4': 'Anxiety'
        };
        setFormData(prev => ({
            ...prev,
            condition: conditionValue,
            condition_name: conditionNames[conditionValue] || 'Generic'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); setError(null); setPrediction(null);

        try {
            const payload = {
                age: Number(formData.age),
                sleep_duration: Number(formData.sleep_duration),
                heart_rate: Number(formData.heart_rate),
                stress: Number(formData.stress),
                glucose: Number(formData.glucose),
                cholesterol: Number(formData.cholesterol),
                gender: Number(formData.gender),
                condition: Number(formData.condition),
                condition_name: formData.condition_name,
                drug: Number(formData.drug),
                dosage: Number(formData.dosage),
                duration: Number(formData.duration)
            };

            const result = await modelService.predict(payload);
            setPrediction(result);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch prediction. Please ensure the backend is running.');
        } finally { setIsLoading(false); }
    };

    return (
        <div className="animate-fade-in w-full">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Patient ML Predictor</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                Enter patient parameters to calculate predicted chronotherapeutic improvement and recommended medication time.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {/* Input Form Column */}
                <form onSubmit={handleSubmit} className="glass-panel" style={{ flex: '1 1 600px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Age</label>
                            <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="input-field" placeholder="e.g. 45" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Gender</label>
                            <select required name="gender" value={formData.gender} onChange={handleInputChange} className="input-field">
                                <option value="0">Female</option>
                                <option value="1">Male</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Sleep Duration (hrs)</label>
                            <input required type="number" step="0.1" name="sleep_duration" value={formData.sleep_duration} onChange={handleInputChange} className="input-field" placeholder="e.g. 7.5" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Heart Rate (bpm)</label>
                            <input required type="number" name="heart_rate" value={formData.heart_rate} onChange={handleInputChange} className="input-field" placeholder="e.g. 72" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Stress Level (1-10)</label>
                            <input required type="number" min="1" max="10" name="stress" value={formData.stress} onChange={handleInputChange} className="input-field" placeholder="e.g. 3" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Blood Glucose (mg/dL)</label>
                            <input required type="number" name="glucose" value={formData.glucose} onChange={handleInputChange} className="input-field" placeholder="e.g. 120" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Cholesterol (mg/dL)</label>
                            <input required type="number" name="cholesterol" value={formData.cholesterol} onChange={handleInputChange} className="input-field" placeholder="e.g. 210" />
                        </div>

                        {/* Treatment Data */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Condition</label>
                            <select required name="condition" value={formData.condition} onChange={handleConditionChange} className="input-field">
                                <option value="0">Hypertension</option>
                                <option value="1">Diabetes</option>
                                <option value="2">Heart Disease</option>
                                <option value="3">Insomnia</option>
                                <option value="4">Anxiety</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Drug Code</label>
                            <input required type="number" name="drug" value={formData.drug} onChange={handleInputChange} className="input-field" placeholder="e.g. 4 (Drug ID)" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Dosage (mg)</label>
                            <input required type="number" name="dosage" value={formData.dosage} onChange={handleInputChange} className="input-field" placeholder="e.g. 500" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Duration (Days)</label>
                            <input required type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="input-field" placeholder="e.g. 30" />
                        </div>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <button type="submit" disabled={isLoading} className="btn-primary" style={{ padding: '0.875rem', fontSize: '1.1rem' }}>
                            {isLoading ? 'Processing AI Models...' : 'Calculate Prediction'}
                        </button>
                    </div>
                </form>

                {/* Prediction Column */}
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {error && <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px' }}>
                        <p className="text-error">{error}</p>
                    </div>}

                    <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                            <TrendingUp size={150} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(59,130,246,0.2)', borderRadius: '8px', color: 'var(--accent-color)' }}>
                                <Activity size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Improvement Score</h2>
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: '700', color: prediction ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                            {prediction ? prediction.predicted_improvement_score.toFixed(1) : '--'}
                            <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>/ 10</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem' }}>
                            Score indicating expected patient treatment outcome based on Random Forest regression.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(139,92,246,0.1) 100%)' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                            <Clock size={150} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(139,92,246,0.2)', borderRadius: '8px', color: '#a78bfa' }}>
                                <CalendarClock size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Chronotherapy Optimal Hour</h2>
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: '700', color: prediction ? '#a78bfa' : 'var(--text-secondary)' }}>
                            {prediction ? `${prediction.recommended_medication_hour}:00` : '--:--'}
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem' }}>
                            Suggested daily medication administration time ({formData.condition_name}) for maximized efficacy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-dark border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-lg overflow-hidden" style={{ marginTop: '2rem' }}>
                <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
                    <h2 className="text-xl font-bold font-outfit text-white">Recent Clinical Activity</h2>
                </div>
                <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                    {activities.map((item) => (
                        <div key={item.id} className="p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                            <div className="mt-1 flex-shrink-0">
                                <CheckCircle2 size={20} className="text-brand-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">{item.user}</p>
                                <p className="text-text-secondary text-sm mt-0.5">{item.action}</p>
                            </div>
                            <span className="text-xs text-text-secondary whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;