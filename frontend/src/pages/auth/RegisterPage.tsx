import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { registerUser, clearError } from "../../features/authSlice";
import { Mail, Lock, Loader2, UserPlus, User, Check, AlertCircle } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [frontendError, setFrontendError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    // Sinkronkan pembersihan error
    if (name || email || password || passwordConfirmation) {
      setFrontendError(null);
      if (error) dispatch(clearError());
    }
  }, [name, email, password, passwordConfirmation, dispatch]);

  useEffect(() => {
    // Hanya redirect otomatis jika SUDAH login sebelumnya (bukan baru saja register)
    if (isAuthenticated && !isSuccess) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, isSuccess, navigate, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Frontend
    if (password !== passwordConfirmation) {
      setFrontendError("Passwords do not match. Please try again.");
      return;
    }

    try {
      await dispatch(
        registerUser({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      ).unwrap();

      setIsSuccess(true);

      // Berikan waktu 2 detik agar user bisa membaca pesan sukses
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Error ditangani oleh Redux state
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-blue-900/20 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <UserPlus size={32} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Join Sportify
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Create an account to track your favorite teams
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {isSuccess && (
            <div className="rounded-xl border border-green-900/50 bg-green-950/20 p-4 text-sm text-green-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                <Check size={18} />
              </div>
              <div>
                <p className="font-bold">Registration Successful!</p>
                <p className="text-xs opacity-80">
                  Welcome to Sportify. Redirecting you...
                </p>
              </div>
            </div>
          )}

          {(error || frontendError) && !isSuccess && (
            <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-400 flex items-center gap-3 animate-in shake duration-300">
              <div className="flex-shrink-0">
                <AlertCircle className="h-4 w-4" />
              </div>
              <p>{frontendError || error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                disabled={isSuccess}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:opacity-50"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                disabled={isSuccess}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:opacity-50"
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
                disabled={isSuccess}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:opacity-50"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                disabled={isSuccess}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:opacity-50"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || isSuccess}
            className="group relative flex w-full justify-center rounded-xl bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isSuccess ? (
              "Redirecting..."
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center text-sm">
            <span className="text-slate-400">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
