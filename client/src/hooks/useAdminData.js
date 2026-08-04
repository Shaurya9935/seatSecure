import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:4000/api';

/**
 * Custom hook to manage admin dashboard state and API communication.
 */
export const useAdminData = () => {
  const [shows, setShows] = useState([]);
  const [screens, setScreens] = useState([]);
  const [theatres, setTheatres] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch all initial admin data (shows, screens, theatres)
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [showsRes, screensRes, theatresRes] = await Promise.all([
        fetch(`${API_BASE}/admin/shows`).then((res) => res.json()),
        fetch(`${API_BASE}/admin/screens`).then((res) => res.json()),
        fetch(`${API_BASE}/admin/theatres`).then((res) => res.json()),
      ]);

      if (showsRes.success !== false && showsRes.data) {
        setShows(showsRes.data);
      }
      if (screensRes.success !== false && screensRes.data) {
        setScreens(screensRes.data);
      }
      if (theatresRes.success !== false && theatresRes.data) {
        setTheatres(theatresRes.data);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setError('Could not connect to backend server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Search OMDb movies for auto-complete
  const searchOmdbMovies = async (query) => {
    if (!query || query.trim().length < 2) return [];
    try {
      const res = await fetch(`${API_BASE}/movies/search?q=${encodeURIComponent(query)}`);
      const result = await res.json();
      if (result.success !== false && Array.isArray(result.data)) {
        return result.data;
      }
      return [];
    } catch (err) {
      console.error('OMDb movie search error:', err);
      return [];
    }
  };

  // Schedule a new show
  const scheduleShow = async ({ imdbId, screenId, startTime, price }) => {
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_BASE}/admin/shows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imdbId,
          screenId,
          startTime,
          price: Number(price),
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Failed to schedule show');
      }

      setSuccessMessage('✓ Show scheduled successfully!');
      await fetchAllData(); // Refresh table
      return true;
    } catch (err) {
      setError(err.message || 'Failed to create show');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    shows,
    screens,
    theatres,
    loading,
    submitting,
    error,
    successMessage,
    fetchAllData,
    searchOmdbMovies,
    scheduleShow,
  };
};
