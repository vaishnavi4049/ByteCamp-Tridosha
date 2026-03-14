import { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, XCircle, FileText, Activity } from 'lucide-react';
import { modelService } from '../services/api';

const DoctorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    fetchRequests();
    // Poll for new requests
    const intervalId = setInterval(fetchRequests, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await modelService.getDoctorRequests();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const payload = {
        request_id: id,
        decision: action
      };
      
      if (action === "rejected") {
        if (!overrides[id]) {
          alert("Please enter a new medication time before rejecting.");
          return;
        }
        payload.new_time = Number(overrides[id]);
      }

      await modelService.respondToRequest(payload);
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Failed to update request");
    }
  };

  const setOverrideTime = (id, time) => {
    setOverrides(prev => ({ ...prev, [id]: time }));
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Activity className="animate-pulse" size={48} color="var(--color-healthcare-main)" /></div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <ShieldAlert color="var(--color-error)" />
            Doctor Authorization Panel
          </h1>
          <p className="page-subtitle">Review patient requests and authorize or override AI chronotherapy schedule deviations.</p>
        </div>
        <div style={{
          backgroundColor: 'var(--bg-panel)',
          border: '1px solid var(--border-dark)',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div className="animate-pulse" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-error)' }}></div>
          <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{requests.filter(r => r.status === 'pending').length} Actions Required</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.map((request) => (
          <div key={request.id} className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '300px' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem' }}>
                <FileText color="var(--text-muted)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   {request.patient_id} 
                   <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{new Date(request.timestamp).toLocaleString()}</span>
                </h3>
                
                <div className="pill-badge" style={{ marginBottom: '0.75rem' }}>
                  {request.condition}
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>AI Recommendation</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-healthcare-main)', fontSize: '1.125rem' }}>{request.ai_time}:00</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Standard Guideline</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-warning)', fontSize: '1.125rem' }}>{request.doctor_time}:00</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Forecasted Score</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.125rem' }}>{request.improvement_score.toFixed(1)} / 10</span>
                  </div>
                </div>

                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                   <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}><strong>Patient Parameters:</strong></p>
                   <p>Age: {request.patient_parameters.age} • Gender: {request.patient_parameters.gender === 1 ? 'M' : 'F'} • HR: {request.patient_parameters.heart_rate} bpm • Gluc: {request.patient_parameters.glucose} mg/dL • Chol: {request.patient_parameters.cholesterol} • Stress: {request.patient_parameters.stress}/10</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '250px' }}>
              {request.status === 'pending' ? (
                <>
                  <button 
                    onClick={() => handleAction(request.id, 'approved')}
                    className="btn-success"
                  >
                    <CheckCircle size={18} /> Approve AI Schedule ({request.ai_time}:00)
                  </button>
                  
                  <div style={{ borderTop: '1px dashed var(--border-dark)', margin: '0.5rem 0' }}></div>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Override Final Medication Time (0-23)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <input 
                         type="number" 
                         className="input-field" 
                         min="0" max="23"
                         placeholder={request.doctor_time}
                         value={overrides[request.id] || ''}
                         onChange={(e) => setOverrideTime(request.id, e.target.value)}
                         style={{ padding: '0.5rem' }}
                       />
                       <button 
                         onClick={() => handleAction(request.id, 'rejected')}
                         className="btn-outline-danger"
                         style={{ padding: '0.5rem', flex: 1 }}
                       >
                         <XCircle size={18} /> Reject
                       </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className={`status-badge ${request.status === 'approved' ? 'safe' : 'warning'}`} style={{ padding: '1rem', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  {request.status === 'approved' ? (
                    <><CheckCircle size={24} /> <span style={{ fontWeight: '700' }}>APPROVED ({request.final_time}:00)</span></>
                  ) : (
                    <><XCircle size={24} /> <span style={{ fontWeight: '700' }}>OVERRIDDEN ({request.final_time}:00)</span></>
                  )}
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>No further action needed</span>
                </div>
              )}
            </div>
            
          </div>
        ))}

        {requests.length === 0 && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <CheckCircle style={{ margin: '0 auto 1rem', opacity: 0.5, width: '48px', height: '48px' }} />
            <p style={{ fontSize: '1.125rem' }}>No pending authorization requests.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DoctorDashboard;
