import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { clearError } from '../features/authSlice';

interface UseAuthFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => Promise<void> | void;
}

export const useAuthForm = <T extends Record<string, any>>({ 
  initialValues, 
  validate, 
  onSubmit 
}: UseAuthFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error: serverError, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear server error via Redux
    if (serverError) {
      dispatch(clearError());
    }
  }, [errors, serverError, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      // Success handling is usually managed by the page (redirects, etc.)
    } catch (err) {
      // Errors are usually handled by Redux state
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSuccess(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting: isSubmitting || status === 'loading',
    isSuccess,
    setIsSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    serverError,
    isAuthenticated,
  };
};
