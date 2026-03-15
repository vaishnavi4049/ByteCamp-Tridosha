import { Link } from 'react-router-dom';
import {
  ArrowRight, ActivitySquare, Clock, HeartPulse,
  Activity, Shield, PlayCircle, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ccImage from '../assets/cc.png';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="bg-grid"></div>

      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '20%',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
        borderRadius: '50%', zIndex: -1, pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%', right: '-10%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
        borderRadius: '50%', zIndex: -1, pointerEvents: 'none'
      }}></div>

      {/* Navigation Bar */}
      <nav style={{
        padding: '1.25rem 5%',
        background: 'rgba(3, 7, 18, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="pulse-glow" style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '8px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <ActivitySquare color="var(--accent-color)" size={24} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'white' }}>
            Chrono<span style={{ color: 'var(--accent-color)' }}>Med</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="hidden md:flex" style={{ gap: '2rem' }}>
            <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>The Science</a>
            <a href="#how" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>How it Works</a>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '1.5rem' }}>
            {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to={user?.role === 'doctor' ? "/doctor-dashboard" : "/patient-landing"} className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 16px', fontSize: '0.95rem' }}>
                  Open App <ArrowRight size={16} />
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await logout();
                      window.location.href = "/";
                    } catch (err) {
                      console.error("Logout failed", err);
                    }
                  }}
                  style={{
                    color: 'white',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" style={{
                  color: 'white', textDecoration: 'none', fontWeight: '500',
                  padding: '8px 16px', fontSize: '0.95rem', transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap'
                }}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', whiteSpace: 'nowrap', width: 'auto' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <section style={{
          padding: '4rem 5% 1rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          minHeight: 'auto', justifyContent: 'center'
        }}>
          <div className="animate-fade-in" style={{ maxWidth: '900px', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px',
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-primary)',
              borderRadius: '30px',
              fontSize: '0.85rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }}></span>
              Pioneering Chronobiology-Aware Medicine
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <span className="text-gradient-light">Right medicine.</span><br />
              <span className="text-gradient">Right biological time.</span>
            </h1>

            <p className="delay-100" style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Human physiology isn't static. It follows intrinsic circadian rhythms.
              ChronoMed AI replaces outdated, static dosing schedules by analyzing your biological
              cycles to predict the exact moment medication will be most effective and least toxic.
            </p>

            <div className="delay-200" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {user ? (
                <Link to={user?.role === 'doctor' ? "/doctor-dashboard" : "/patient-landing"} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', width: 'auto' }}>
                  <Activity size={18} /> Go To Dashboard
                </Link>
              ) : (
                <Link to="/register" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', width: 'auto' }}>
                  <Activity size={18} /> Generate My Optimal Schedule
                </Link>
              )}
            </div>
          </div>

          {/* Concept Image Decoration */}
          <div className="animate-float delay-300" style={{
            marginTop: '3rem', width: '100%', maxWidth: '800px',
            position: 'relative',
            borderRadius: '24px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.15)',
            backdropFilter: 'blur(20px)'
          }}>
            <img
              src={ccImage}
              alt="Chronobiology and Medication Timing"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                display: 'block',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            />
            {/* Decorative Glow */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%', height: '90%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
              zIndex: -1,
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}></div>
          </div>
        </section>

        {/* The Science / Features Section */}
        <section id="features" style={{ padding: '3rem 5% 3rem', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Why standard dosing fails.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                Your body's absorption rates, enzyme cycles, and toxic thresholds fluctuate wildly over a 24-hour period.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <FeatureCard
                icon={<Clock size={28} color="#10b981" />}
                title="Circadian Biomapping"
                description="We process thousands of data points to calculate precisely when your enzyme activity and hormone levels peak, mapping out personalized medication administration windows."
              />
              <FeatureCard
                icon={<HeartPulse size={28} color="#f43f5e" />}
                title="Minimize Adverse Effects"
                description="Research shows taking blood pressure medication at night aligns with cardiovascular absorption patterns to prevent dangerous early morning spikes while reducing daytime fatigue."
              />
              <FeatureCard
                icon={<Shield size={28} color="#3b82f6" />}
                title="Maximize Therapeutic Value"
                description="Move past the archaic once/twice daily prescribing standard. Maximize drug efficacy by synchronizing dosing perfectly with your organ clearance cycles."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '3rem 5% 4rem', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-panel" style={{
            maxWidth: '1000px', width: '100%', padding: '3.5rem 2rem', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Ready to optimize your treatment?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>Join the thousand of patients already experiencing the clinical benefits of chronobiology-aware prescription intelligence.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {user ? (
                <Link to={user?.role === 'doctor' ? "/doctor-dashboard" : "/patient-landing"} className="btn-primary" style={{ display: 'inline-flex', padding: '16px 40px', fontSize: '1.1rem', width: 'auto', textDecoration: 'none', alignItems: 'center', gap: '0.5rem' }}>
                  Go To Dashboard <ChevronRight size={20} />
                </Link>
              ) : (
                <Link to="/register" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 40px', fontSize: '1.1rem', width: 'auto', textDecoration: 'none', alignItems: 'center', gap: '0.5rem' }}>
                  Build My Profile <ChevronRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '3rem 5%',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
        color: 'var(--text-secondary)', fontSize: '0.9rem',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: '600' }}>
          <ActivitySquare size={20} color="var(--accent-color)" /> ChronoMed
        </div>
        <p>© 2026 Team Tridosha. Chronobiology-Aware Pharmacological Systems.</p>
      </footer>
    </div>
  );
};

// Premium Sub-component for feature cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="glass-panel" style={{
    padding: '2.5rem',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    background: 'rgba(17, 24, 39, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.03)'
  }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(17, 24, 39, 0.4)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)';
    }}
  >
    <div style={{
      width: '60px', height: '60px', borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'white', letterSpacing: '-0.01em' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>{description}</p>
  </div>
);

export default Home;