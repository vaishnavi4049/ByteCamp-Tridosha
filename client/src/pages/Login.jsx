import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const success = await login({ email, password });
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-color)', marginBottom: '1rem' }}>
            <LogIn size={24} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue to your dashboard.</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--error-color)', borderRadius: '4px', marginBottom: '1.5rem' }}>
            <p className="text-error" style={{ marginTop: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: 'var(--accent-color)' }} /> Remember me
            </label>
            <a href="#" style={{ fontSize: '0.875rem', color: 'var(--accent-color)', textDecoration: 'none' }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            {isLoading ? 'Signing In...' : 'Sign In'} {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
