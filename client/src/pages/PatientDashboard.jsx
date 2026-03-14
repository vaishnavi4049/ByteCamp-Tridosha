import { useState, useEffect } from 'react';
import { Activity, Clock, Heart, TrendingUp, AlertTriangle, CheckCircle, Search, Send, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { modelService } from '../services/api';
import MedicalReport from '../components/MedicalReport';

const PatientDashboard = () => {
  const { user } = useAuth();
  const currentUserId = user?.email || 'Anonymous';

  const [formData, setFormData] = useState({
    age: '', sleep_duration: '', heart_rate: '', stress: '',
    glucose: '', cholesterol: '', gender: '0', condition: '0',
    condition_name: 'Hypertension', drug: '0', dosage: '', duration: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [requestStatus, setRequestStatus] = useState("none");
  const [latestRequest, setLatestRequest] = useState(null);

  useEffect(() => {
    checkPatientStatus();
    // Poll for status updates
    const intervalId = setInterval(checkPatientStatus, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const checkPatientStatus = async () => {
    try {
      const data = await modelService.getPatientStatus(currentUserId);
      if (data && data.status !== "none") {
        setLatestRequest(data);
        setRequestStatus(data.status);
      }
    } catch (err) {
      console.error("Failed to check patient status");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (e) => {
    const conditionValue = e.target.value;
    const conditionNames = {
      '0': 'Hypertension', '1': 'Diabetes', '2': 'Heart Disease',
      '3': 'Insomnia', '4': 'Anxiety'
    };
    setFormData(prev => ({
      ...prev,
      condition: conditionValue,
      condition_name: conditionNames[conditionValue] || 'Generic'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);
    
    // Clear old requests on new prediction
    setRequestStatus("none");
    setLatestRequest(null);

    try {
      const payload = {
        age: Number(formData.age), sleep_duration: Number(formData.sleep_duration),
        heart_rate: Number(formData.heart_rate), stress: Number(formData.stress),
        glucose: Number(formData.glucose), cholesterol: Number(formData.cholesterol),
        gender: Number(formData.gender), condition: Number(formData.condition),
        condition_name: formData.condition_name, drug: Number(formData.drug),
        dosage: Number(formData.dosage), duration: Number(formData.duration)
      };
      
      const result = await modelService.predict(payload);
      setPrediction(result);
      
      // Save history background task
      try {
         await modelService.saveHistory({
            userEmail: currentUserId,
            disease_condition: formData.condition_name,
            ai_recommended_time: result.ai_recommended_time,
            doctor_recommended_time: result.doctor_recommended_time,
            time_difference_hours: result.time_difference_hours,
            predicted_improvement_score: result.predicted_improvement_score,
            doctor_verification_required: result.doctor_verification_required,
            status: result.status,
            parameters: payload
         });
      } catch (historyErr) {
         console.error("Failed to save prediction history", historyErr);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorRequest = async () => {
    if (!prediction) return;
    try {
      await modelService.doctorRequest({
        patient_id: currentUserId,
        condition: formData.condition_name,
        ai_time: prediction.ai_recommended_time,
        doctor_time: prediction.doctor_recommended_time,
        improvement_score: prediction.predicted_improvement_score,
        patient_parameters: formData
      });
      setRequestStatus("pending");
      checkPatientStatus();
    } catch (err) {
      console.error("Failed to send doctor request", err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Dashboard</h1>
          <p className="page-subtitle">Enter medical parameters to generate an AI chronotherapy schedule.</p>
        </div>
      </div>
      
      {/* Patient Notifications for Doctor Review */}
      {latestRequest && requestStatus !== "none" && requestStatus !== "pending" && (
        <div className="glass-panel" style={{ marginBottom: '2rem', backgroundColor: 'var(--bg-panel)', borderColor: requestStatus === 'approved' ? 'var(--color-success-border)' : 'var(--color-error-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
             {requestStatus === 'approved' ? <CheckCircle size={32} color="var(--color-success)"/> : <FileText size={32} color="var(--color-error)"/>}
             <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: requestStatus === 'approved' ? 'var(--color-success)' : 'var(--color-error)', marginBottom: '0.25rem' }}>
                   {requestStatus === 'approved' ? 'Doctor Approved AI Recommendation' : 'Doctor Updated Medication Time'}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Your doctor has reviewed the safety warning for <strong>{latestRequest.condition}</strong>. 
                  The final official dosage time is set to <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{latestRequest.final_time}:00</span>.
                </p>
             </div>
          </div>
        </div>
      )}

      <div className="grid-2">
        {/* Input Form Column */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-dark)', paddingBottom: '1rem' }}>
            <Search color="var(--color-healthcare-main)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Medical Parameters</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="input-field" placeholder="45" />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select required name="gender" value={formData.gender} onChange={handleInputChange} className="input-field">
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sleep (hrs)</label>
              <input required type="number" step="0.1" name="sleep_duration" value={formData.sleep_duration} onChange={handleInputChange} className="input-field" placeholder="7.5" />
            </div>
            <div className="form-group">
              <label className="form-label">Heart Rate</label>
              <input required type="number" name="heart_rate" value={formData.heart_rate} onChange={handleInputChange} className="input-field" placeholder="72" />
            </div>
            <div className="form-group">
              <label className="form-label">Stress (1-10)</label>
              <input required type="number" min="1" max="10" name="stress" value={formData.stress} onChange={handleInputChange} className="input-field" placeholder="3" />
            </div>
            <div className="form-group">
              <label className="form-label">Glucose (mg/dL)</label>
              <input required type="number" name="glucose" value={formData.glucose} onChange={handleInputChange} className="input-field" placeholder="120" />
            </div>
            <div className="form-group">
              <label className="form-label">Cholesterol</label>
              <input required type="number" name="cholesterol" value={formData.cholesterol} onChange={handleInputChange} className="input-field" placeholder="210" />
            </div>
            <div className="form-group">
              <label className="form-label">Condition</label>
              <select required name="condition" value={formData.condition} onChange={handleConditionChange} className="input-field">
                <option value="0">Hypertension</option>
                <option value="1">Diabetes</option>
                <option value="2">Heart Disease</option>
                <option value="3">Insomnia</option>
                <option value="4">Anxiety</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Drug Code</label>
              <input required type="number" name="drug" value={formData.drug} onChange={handleInputChange} className="input-field" placeholder="4" />
            </div>
            <div className="form-group">
              <label className="form-label">Dosage (mg)</label>
              <input required type="number" name="dosage" value={formData.dosage} onChange={handleInputChange} className="input-field" placeholder="500" />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Duration (Days)</label>
              <input required type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="input-field" placeholder="30" />
            </div>
          </div>
          
          <button type="submit" disabled={isLoading} className="btn-primary" style={{ marginTop: '1rem' }}>
            {isLoading ? <span className="animate-pulse">Analyzing...</span> : <>Generate AI Medication Schedule <Activity size={18}/></>}
          </button>
        </form>

        {/* Prediction Result Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {prediction && (
            <>
              {/* Status Badge */}
              <div className={`status-badge ${prediction.doctor_verification_required ? 'warning' : 'safe'}`}>
                {prediction.doctor_verification_required ? (
                  <AlertTriangle size={28} />
                ) : (
                  <CheckCircle size={28} />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                    {prediction.doctor_verification_required ? 'AI recommendation differs from doctor guideline' : 'SAFE RECOMMENDATION'}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {prediction.doctor_verification_required 
                      ? 'Doctor consultation required before beginning this schedule.' 
                      : 'The predicted schedule aligns perfectly with general medical safety thresholds.'}
                  </p>
                  
                  {prediction.doctor_verification_required && (
                    <button 
                      onClick={handleDoctorRequest}
                      disabled={requestStatus === "pending" || requestStatus === "approved" || requestStatus === "rejected"}
                      className={(requestStatus === "pending" || requestStatus === "approved" || requestStatus === "rejected") ? "btn-success" : "btn-outline-danger"}
                      style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }}
                    >
                      <Send size={16} /> 
                      {requestStatus === "pending" ? 'Sent for Doctor Review' : 'Consult Doctor'}
                    </button>
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="glass-panel metric-card">
                  <div className="metric-icon blue"><TrendingUp size={24} /></div>
                  <div className="metric-value">{(prediction.predicted_improvement_score).toFixed(2)}</div>
                  <div className="metric-label">AI Improvement Score</div>
                </div>
                
                <div className="glass-panel metric-card">
                  <div className="metric-icon teal"><Clock size={24} /></div>
                  <div className="metric-value teal">{prediction.ai_recommended_time}:00</div>
                  <div className="metric-label">AI Recommended Time</div>
                </div>

                <div className="glass-panel metric-card">
                  <div className="metric-icon amber"><Heart size={24} /></div>
                  <div className="metric-value">{prediction.doctor_recommended_time}:00</div>
                  <div className="metric-label">Doctor Guideline Time</div>
                </div>

                <div className="glass-panel metric-card">
                  <div className="metric-icon slate"><Activity size={24} /></div>
                  <div className="metric-value">{prediction.time_difference_hours} hrs</div>
                  <div className="metric-label">Time Difference</div>
                </div>
              </div>
              
              {/* Medical Report Generation section when differing */}
              {prediction.doctor_verification_required && (
                 <MedicalReport 
                    prediction={prediction} 
                    formData={formData} 
                    patientId={currentUserId}
                 />
              )}
            </>
          )}

          {!prediction && !isLoading && (
            <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Activity size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <p>Fill out the parameters and click predict to generate your personalized schedule.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
