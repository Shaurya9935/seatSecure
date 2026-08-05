import { useState } from 'react';
import { getPasswordStrength } from '../utils/passwordStrength';

const API_BASE = `${import.meta.env.VITE_API_URL}/auth`;

/**
 * Custom hook to encapsulate registration form state, password evaluation, and API submission.
 */
export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { text: string, type: 'success' | 'error' }

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Registration failed');
      }

      setMessage({
        text: '✓ Account created! Redirecting to login...',
        type: 'success',
      });

      setTimeout(() => {
        window.location.href = '/login';
      }, 900);
    } catch (err) {
      setMessage({
        text: err.message || 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    message,
    passwordStrength,
    handleChange,
    handleSubmit,
  };
};
