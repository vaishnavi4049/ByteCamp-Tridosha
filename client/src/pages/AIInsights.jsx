import { useState } from 'react';
import CircadianChart from '../charts/CircadianChart';
import HealthMetricsChart from '../charts/HealthMetricsChart';
import ImprovementGauge from '../charts/ImprovementGauge';
import { Brain, Clock } from 'lucide-react';

const AIInsights = () => {
  const [mockPredictionData] = useState({
    ai_time: 22,
    doctor_time: 21,
    score: 8.5,
    patientData: {
      heart_rate: 75,
      stress: 4,
      glucose: 110,
      cholesterol: 190,
      sleep_duration: 7
    }
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Brain color="var(--color-healthcare-main)" />
            AI Analytics Panel
          </h1>
          <p className="page-subtitle">Deep dive visualization of chronobiological efficacy and patient vitals.</p>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        
        {/* Full Width Circadian Curve */}
        <div style={{ gridColumn: 'span 1' }} className="circadian-container">
           {/* In standard grid-3, span 3 for full width on large screens */}
           <div className="glass-panel" style={{ height: '380px' }}>
              <CircadianChart 
                aiTime={mockPredictionData.ai_time} 
                doctorTime={mockPredictionData.doctor_time} 
              />
           </div>
        </div>

        {/* Radar Vitals */}
        <div style={{ gridColumn: 'span 1' }}>
          <HealthMetricsChart patientData={mockPredictionData.patientData} />
        </div>

        {/* Prediction Metrics Cards */}
        <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel metric-card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Improvement Forecast</h3>
            <ImprovementGauge score={mockPredictionData.score} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Random Forest AI Model Confidence</p>
          </div>

          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock color="var(--color-warning)" /> Consult Timings
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-healthcare-main)', fontWeight: '500' }}>AI Optimum</span>
                  <span style={{ fontWeight: '700' }}>{mockPredictionData.ai_time}:00</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '8px' }}>
                  <div style={{ backgroundColor: 'var(--color-healthcare-main)', height: '8px', borderRadius: '999px', width: `${(mockPredictionData.ai_time / 24) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-warning)', fontWeight: '500' }}>Doctor Guideline</span>
                  <span style={{ fontWeight: '700' }}>{mockPredictionData.doctor_time}:00</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '8px' }}>
                  <div style={{ backgroundColor: 'var(--color-warning)', height: '8px', borderRadius: '999px', width: `${(mockPredictionData.doctor_time / 24) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>Analysis:</span> The AI suggests shifting medication earlier than general doctor guidelines for optimal circadian absorption.
            </div>
          </div>

        </div>
      </div>
      
      {/* Quick responsive fix for the grid-3 layout on AI insights */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .circadian-container { grid-column: span 3 !important; }
        }
      `}} />
    </div>
  );
};

export default AIInsights;
