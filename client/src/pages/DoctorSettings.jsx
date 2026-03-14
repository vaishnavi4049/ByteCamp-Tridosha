import { useState, useEffect } from 'react';
import { Settings, Save, Clock, Activity, AlertCircle } from 'lucide-react';
import { modelService } from '../services/api';

const DoctorSettings = () => {
  const [schedules, setSchedules] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);

  // We are using condition IDs 0-4 as per the ML model mapping
  const conditionList = [
    { id: "0", name: "Hypertension" },
    { id: "1", name: "Diabetes" },
    { id: "2", name: "Heart Disease" },
    { id: "3", name: "Insomnia" },
    { id: "4", name: "Anxiety" }
  ];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await modelService.getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Failed to fetch schedules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setSchedules(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === 'recommended_hour' ? Number(value) : value
      }
    }));
  };

  const handleSave = async (id) => {
    try {
      setSaveStatus({ id, status: 'saving' });
      const conditionData = schedules[id];
      await modelService.updateSchedule({
        condition_id: id,
        name: conditionData.name || conditionList.find(c => c.id === id).name,
        recommended_hour: conditionData.recommended_hour || 8,
        drug: conditionData.drug || '',
        dosage_range: conditionData.dosage_range || ''
      });
      setSaveStatus({ id, status: 'success' });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus({ id, status: 'error' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Activity className="animate-pulse" size={48} color="var(--color-healthcare-main)" /></div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Settings color="var(--color-healthcare-main)" />
            Doctor Guidelines Setup
          </h1>
          <p className="page-subtitle">Define standard medication schedules algorithms and rules for AI comparison.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
        {conditionList.map((condition) => {
          const data = schedules[condition.id] || {};
          const isSaving = saveStatus?.id === condition.id && saveStatus?.status === 'saving';
          const isSuccess = saveStatus?.id === condition.id && saveStatus?.status === 'success';
          const isError = saveStatus?.id === condition.id && saveStatus?.status === 'error';

          return (
            <div key={condition.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-dark)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{condition.name} (ID: {condition.id})</h3>
                <div className="pill-badge">Base Condition</div>
              </div>

              <div className="grid-3" style={{ gap: '1rem', marginTop: '0.5rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="var(--color-healthcare-main)" /> Recommended Hour (0-23)
                  </label>
                  <input
                    type="number"
                    min="0" max="23"
                    className="input-field"
                    value={data.recommended_hour ?? ''}
                    onChange={(e) => handleChange(condition.id, 'recommended_hour', e.target.value)}
                    placeholder="e.g. 21"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Standard Drug Class</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.drug || ''}
                    onChange={(e) => handleChange(condition.id, 'drug', e.target.value)}
                    placeholder="e.g. ACE Inhibitor"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Typical Dosage Range</label>
                  <input
                    type="text"
                    className="input-field"
                    value={data.dosage_range || ''}
                    onChange={(e) => handleChange(condition.id, 'dosage_range', e.target.value)}
                    placeholder="e.g. 10-40mg"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {isSuccess && <span style={{ color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: '500' }}>Saved effectively!</span>}
                  {isError && <span style={{ color: 'var(--color-error)', fontSize: '0.875rem', fontWeight: '500' }}>Error connecting to server.</span>}

                  <button
                    onClick={() => handleSave(condition.id)}
                    disabled={isSaving}
                    style={{
                      padding: '0.5rem 1.5rem',
                      backgroundColor: 'var(--color-healthcare-main)',
                      color: 'white',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: isSaving ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '500'
                    }}>
                    <Save size={18} />
                    {isSaving ? 'Saving...' : 'Update Guideline'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorSettings;
