import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const success = await register({ name, email, password });
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-color)', marginBottom: '1rem' }}>
            <UserPlus size={24} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign up to access your dashboard.</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--error-color)', borderRadius: '4px', marginBottom: '1.5rem' }}>
            <p className="text-error" style={{ marginTop: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }}>
                <User size={18} />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                style={{ paddingLeft: '2.5rem' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                style={{ paddingLeft: '2.5rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                style={{ paddingLeft: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                style={{ paddingLeft: '2.5rem' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            {isLoading ? 'Creating Account...' : 'Sign Up'} {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
