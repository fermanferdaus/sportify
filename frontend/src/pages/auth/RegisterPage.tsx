import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import type { AppDispatch } from '../../store';
import { registerUser, clearError } from '../../features/authSlice';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthAlert from '../../components/auth/AuthAlert';
import { useAuthForm } from '../../hooks/useAuthForm';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    values,
    errors,
    isSubmitting,
    isSuccess,
    setIsSuccess,
    handleChange,
    handleSubmit,
    serverError,
    isAuthenticated,
  } = useAuthForm({
    initialValues: { 
      name: '', 
      email: '', 
      password: '', 
      password_confirmation: '' 
    },
    validate: (formValues) => {
      const fieldErrors: Record<string, string> = {};
      if (formValues.password !== formValues.password_confirmation) {
        fieldErrors.password_confirmation = "Passwords do not match";
      }
      return fieldErrors;
    },
    onSubmit: async (formValues) => {
      await dispatch(registerUser(formValues)).unwrap();
      setIsSuccess(true);
      
      // Delay redirect to show success message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
  });

  useEffect(() => {
    // Only redirect automatically if ALREADY authenticated (not just successfully registered)
    if (isAuthenticated && !isSuccess) {
      navigate('/');
    }
  }, [isAuthenticated, isSuccess, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <AuthLayout>
      <AuthCard
        title="Join Sportify"
        subtitle="Create an account to track your favorite teams"
        icon={UserPlus}
      >
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {isSuccess && (
            <AuthAlert 
              type="success" 
              title="Registration Successful!" 
              message="Welcome to Sportify. Redirecting you..." 
            />
          )}

          {(serverError || errors.password_confirmation) && !isSuccess && (
            <AuthAlert 
              type="error" 
              message={errors.password_confirmation || serverError || "An error occurred"} 
            />
          )}

          <div className="space-y-4">
            <AuthInput
              name="name"
              type="text"
              placeholder="Full Name"
              icon={User}
              required
              disabled={isSuccess}
              value={values.name}
              onChange={handleChange}
            />

            <AuthInput
              name="email"
              type="email"
              placeholder="Email address"
              icon={Mail}
              required
              disabled={isSuccess}
              value={values.email}
              onChange={handleChange}
            />

            <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              required
              disabled={isSuccess}
              value={values.password}
              onChange={handleChange}
            />

            <AuthInput
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              icon={Lock}
              required
              disabled={isSuccess}
              error={errors.password_confirmation}
              value={values.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <AuthButton isLoading={isSubmitting} disabled={isSuccess} loadingText={isSuccess ? "Redirecting..." : "Creating Account"}>
            {isSuccess ? "Redirecting..." : "Create Account"}
          </AuthButton>

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
      </AuthCard>
    </AuthLayout>
  );
};

export default RegisterPage;
