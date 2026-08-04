import React, { useState } from 'react';

/**
 * ShowsTable lists all scheduled shows fetched from backend API.
 */
export const ShowsTable = ({ shows, loading }) => {
  const [search, setSearch] = useState('');

  const filteredShows = shows.filter((s) => {
    const titleMatch = s.movie?.title?.toLowerCase().includes(search.toLowerCase());
    const theatreMatch = s.theatre?.name?.toLowerCase().includes(search.toLowerCase());
    const screenMatch = s.screen?.name?.toLowerCase().includes(search.toLowerCase());
    return titleMatch || theatreMatch || screenMatch;
  });

  const formatShowTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (err) {
      return String(dateStr);
    }
  };

  return (
    <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Table Header & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-['Outfit'] font-bold text-xl text-white flex items-center gap-2">
            <span>🎬</span>
            <span>All Scheduled Shows ({shows.length})</span>
          </h2>
          <p className="text-xs text-[#BABABA] mt-1">Live listing of upcoming movie showtimes across all screens.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Filter by movie or theatre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161316] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white 
                       outline-none focus:border-[#FF6D29] transition-all placeholder:text-[#BABABA]/50"
          />
          <span className="absolute left-3 top-2 text-[#BABABA] text-xs">🔍</span>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#BABABA] space-y-2">
          <span className="w-6 h-6 border-2 border-white/30 border-t-[#FF6D29] rounded-full animate-spin inline-block" />
          <p className="text-xs">Loading scheduled shows...</p>
        </div>
      ) : filteredShows.length === 0 ? (
        <div className="py-16 text-center text-[#BABABA] space-y-2 border border-dashed border-white/10 rounded-xl">
          <span className="text-3xl">📭</span>
          <p className="text-sm font-semibold text-white">No shows scheduled yet</p>
          <p className="text-xs">Use the "Schedule New Movie Show" form above to create your first showtime slot.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold uppercase text-[#BABABA] tracking-wider">
                <th className="py-3 px-4">Movie</th>
                <th className="py-3 px-4">Theatre & Screen</th>
                <th className="py-3 px-4">Show Time</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredShows.map((show) => (
                <tr key={show.showId} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Movie Info */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {show.movie?.poster && show.movie?.poster !== 'N/A' ? (
                        <img
                          src={show.movie.poster}
                          alt={show.movie.title}
                          className="w-10 h-14 object-cover rounded-lg shadow-md border border-white/10"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-white/10 rounded-lg flex items-center justify-center text-lg">🎬</div>
                      )}
                      <div>
                        <div className="font-bold text-white font-['Outfit']">{show.movie?.title || 'Untitled'}</div>
                        <div className="text-xs text-[#BABABA]">IMDb: {show.movie?.imdbId}</div>
                      </div>
                    </div>
                  </td>

                  {/* Theatre & Screen */}
                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white/90">{show.theatre?.name || 'Main Theatre'}</div>
                      <div className="text-xs text-[#BABABA]">
                        {show.screen?.name || 'Screen 1'} • {show.screen?.totalSeats || '100'} Seats
                      </div>
                      <div className="text-[10px] text-[#BABABA]/60">{show.theatre?.city}</div>
                    </div>
                  </td>

                  {/* Show Time */}
                  <td className="py-4 px-4">
                    <div className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white">
                      📅 {formatShowTime(show.time)}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#FF6D29]">₹{show.price}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
