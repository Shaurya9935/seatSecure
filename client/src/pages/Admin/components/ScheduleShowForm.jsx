import React, { useState } from 'react';

/**
 * ScheduleShowForm renders an interactive form for scheduling a new showtime.
 * Integrates live OMDb API movie search and screen selection.
 */
export const ScheduleShowForm = ({
  screens,
  searchOmdbMovies,
  onSchedule,
  submitting,
  error,
  successMessage,
}) => {
  const [movieQuery, setMovieQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // { title, imdbId, poster, year }

  const [screenId, setScreenId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [price, setPrice] = useState('250');

  // Handle searching movies via backend OMDb endpoint
  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setMovieQuery(val);
    if (!val || val.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    const results = await searchOmdbMovies(val);
    setSearchResults(results);
    setSearching(false);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setMovieQuery(movie.title);
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imdbId = selectedMovie ? selectedMovie.imdbId : movieQuery.trim();

    if (!imdbId) return;
    if (!screenId) return;

    const ok = await onSchedule({
      imdbId,
      screenId,
      startTime,
      price,
    });

    if (ok) {
      // Reset form on success
      setSelectedMovie(null);
      setMovieQuery('');
      setStartTime('');
    }
  };

  return (
    <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-['Outfit'] font-bold text-xl text-white flex items-center gap-2">
          <span>➕</span>
          <span>Schedule New Movie Show</span>
        </h2>
        <p className="text-xs text-[#BABABA] mt-1">
          Search OMDb for movie info by title or IMDb ID, pick a theatre screen, and set ticket pricing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Movie Search & Auto-complete */}
        <div className="space-y-2 relative">
          <label className="block text-xs font-semibold uppercase text-[#BABABA] tracking-wider">
            1. Search & Select Movie (or enter IMDb ID)
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="e.g. Dune, Oppenheimer, tt15239678..."
              value={movieQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#161316] border border-white/10 rounded-xl px-4 py-3 text-sm text-white 
                         outline-none focus:border-[#FF6D29] focus:ring-1 focus:ring-[#FF6D29] transition-all placeholder:text-[#BABABA]/40"
            />
            {searching && (
              <div className="absolute right-3.5 top-3.5 text-xs text-[#BABABA] animate-spin">
                ⏳
              </div>
            )}
          </div>

          {/* Selected Movie Preview Card */}
          {selectedMovie && (
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-[#FF6D29]/40 rounded-xl mt-2">
              {selectedMovie.poster && selectedMovie.poster !== 'N/A' ? (
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-10 h-14 object-cover rounded-lg"
                />
              ) : (
                <div className="w-10 h-14 bg-white/10 rounded-lg flex items-center justify-center text-lg">🎬</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">{selectedMovie.title}</div>
                <div className="text-xs text-[#FF6D29]">IMDb ID: {selectedMovie.imdbId} ({selectedMovie.year})</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedMovie(null);
                  setMovieQuery('');
                }}
                className="text-xs text-[#BABABA] hover:text-white px-2 py-1 bg-white/5 rounded-md"
              >
                Change
              </button>
            </div>
          )}

          {/* OMDb Live Search Results Dropdown */}
          {searchResults.length > 0 && !selectedMovie && (
            <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-[#161316] border border-white/20 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
              {searchResults.map((m) => (
                <div
                  key={m.imdbId}
                  onClick={() => handleSelectMovie(m)}
                  className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-none"
                >
                  {m.poster && m.poster !== 'N/A' ? (
                    <img src={m.poster} alt={m.title} className="w-8 h-10 object-cover rounded" />
                  ) : (
                    <div className="w-8 h-10 bg-white/10 rounded flex items-center justify-center text-xs">🎬</div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-white">{m.title}</div>
                    <div className="text-xs text-[#BABABA]">{m.year} • IMDb: {m.imdbId}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 2: Screen Selection & Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Screen Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-[#BABABA] tracking-wider">
              2. Select Screen & Theatre
            </label>
            <select
              required
              value={screenId}
              onChange={(e) => setScreenId(e.target.value)}
              className="w-full bg-[#161316] border border-white/10 rounded-xl px-4 py-3 text-sm text-white 
                         outline-none focus:border-[#FF6D29] focus:ring-1 focus:ring-[#FF6D29] transition-all"
            >
              <option value="">-- Choose Screen --</option>
              {screens.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.name} ({sc.theatre?.name || 'Theatre'}) - {sc.totalSeats} seats
                </option>
              ))}
            </select>
          </div>

          {/* Start Date & Time */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-[#BABABA] tracking-wider">
              3. Show Start Time
            </label>
            <input
              type="datetime-local"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-[#161316] border border-white/10 rounded-xl px-4 py-3 text-sm text-white 
                         outline-none focus:border-[#FF6D29] focus:ring-1 focus:ring-[#FF6D29] transition-all"
            />
          </div>

          {/* Ticket Price */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-[#BABABA] tracking-wider">
              4. Ticket Price (₹ / $)
            </label>
            <input
              type="number"
              required
              min="0"
              placeholder="250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#161316] border border-white/10 rounded-xl px-4 py-3 text-sm text-white 
                         outline-none focus:border-[#FF6D29] focus:ring-1 focus:ring-[#FF6D29] transition-all"
            />
          </div>

        </div>

        {/* Status Alerts */}
        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
            ⚠️ {error}
          </div>
        )}
        {successMessage && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
            {successMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-sm rounded-xl 
                     shadow-[0_4px_20px_rgba(255,109,41,0.3)] hover:shadow-[0_6px_24px_rgba(255,109,41,0.45)] 
                     transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Scheduling Show...</span>
            </>
          ) : (
            <span>Confirm & Schedule Show</span>
          )}
        </button>

      </form>
    </div>
  );
};
