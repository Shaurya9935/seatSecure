import { useState } from "react";

const API_BASE = `${import.meta.env.VITE_API_URL}/auth`;

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Sign in failed');
      }

      setMessage({
        text: 'Logged in Successfully! Redirecting...',
        type: 'success',
      });

      // Store the access token so authenticated API calls can use it
      if (result.data?.accessToken) {
        localStorage.setItem('accessToken', result.data.accessToken);
      }

      setTimeout(() => {
        window.location.href = '/';
      }, 900);
    } catch (error) {
      setMessage({
        text: error.message || 'Something went wrong, please try again.',
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
    handleChange,
    handleSubmit,
  };
};