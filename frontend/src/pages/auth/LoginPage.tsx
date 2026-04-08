import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import { loginUser, clearError } from '../../features/authSlice';
import { Mail, Lock, Loader2, LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Bersihkan error saat user mulai mengetik ulang
    if (email || password) {
      if (error) dispatch(clearError());
    }
  }, [email, password, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-blue-900/20 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <LogIn size={32} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-400">
            Login to access your favorite sports teams
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-400 flex items-center gap-3 animate-in shake duration-300">
              <div className="flex-shrink-0">
                <AlertCircle className="h-4 w-4" />
              </div>
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="group relative flex w-full justify-center rounded-xl bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Sign in'
            )}
          </button>

          <div className="text-center text-sm">
            <span className="text-slate-400">Don't have an account? </span>
            <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
