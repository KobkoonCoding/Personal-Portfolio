import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { signIn } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { isAdmin, setIsAdmin } = useAdmin();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting login with:', { email, password: '***' });
            console.log('Email type:', typeof email, 'Length:', email.length);
            console.log('Password type:', typeof password, 'Length:', password.length);
            await signIn(email, password);
            setIsAdmin(true);
            navigate('/admin');
        } catch (error) {
            console.error('Login error:', error);

            // Handle different Firebase error codes
            let errorMessage = 'Login failed. Please try again.';
            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">{t('admin.login')}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sand transition-colors"
                            placeholder="admin@example.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">{t('admin.passwordLabel')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sand transition-colors"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sand text-black font-bold py-3 rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : t('nav.admin')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
