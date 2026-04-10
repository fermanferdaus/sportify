import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import type { AppDispatch } from '../../store';
import { loginUser, clearError } from '../../features/authSlice';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthAlert from '../../components/auth/AuthAlert';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useLanguage } from '../../i18n';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    serverError,
    isAuthenticated,
  } = useAuthForm({
    initialValues: { email: '', password: '' },
    onSubmit: async (formValues) => {
      await dispatch(loginUser(formValues)).unwrap();
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <AuthLayout>
      <AuthCard
        title={t("auth.welcomeBack")}
        subtitle={t("auth.loginSubtitle")}
        icon={LogIn}
      >
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {serverError && (
            <AuthAlert type="error" message={serverError} />
          )}

          <div className="space-y-4">
            <AuthInput
              name="email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              icon={Mail}
              required
              value={values.email}
              onChange={handleChange}
            />

            <AuthInput
              name="password"
              type="password"
              placeholder={t("auth.passwordPlaceholder")}
              icon={Lock}
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <AuthButton isLoading={isSubmitting}>
            {t("auth.signIn")}
          </AuthButton>

          <div className="text-center text-sm">
            <span className="text-slate-400">{t("auth.noAccount")} </span>
            <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
              {t("auth.registerNow")}
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
