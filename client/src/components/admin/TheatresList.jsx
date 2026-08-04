import React from 'react';

/**
 * TheatresList displays all registered theatres and screens.
 */
export const TheatresList = ({ theatres, screens, loading }) => {
  return (
    <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-['Outfit'] font-bold text-xl text-white flex items-center gap-2">
          <span>🏛️</span>
          <span>Registered Theatres & Screens</span>
        </h2>
        <p className="text-xs text-[#BABABA] mt-1">Overview of all active cinema locations and available auditoriums.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#BABABA] text-xs">Loading theatres and screens...</div>
      ) : theatres.length === 0 ? (
        <div className="py-12 text-center text-[#BABABA] text-xs border border-dashed border-white/10 rounded-xl">
          No theatres registered in database yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {theatres.map((t) => {
            const theatreScreens = screens.filter(
              (sc) => sc.theatre?.id === t.id || sc.theatreId === t.id
            );

            return (
              <div key={t.id} className="bg-[#161316] border border-white/10 rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-['Outfit'] font-bold text-lg text-white">{t.name}</h3>
                    <p className="text-xs text-[#BABABA] flex items-center gap-1">
                      <span>📍</span>
                      <span>{t.city} • {t.address || 'Central Mall'}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {theatreScreens.length} Screens
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-[11px] font-semibold uppercase text-[#BABABA] tracking-wider">
                    Auditoriums / Screens:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {theatreScreens.length === 0 ? (
                      <span className="text-xs text-[#BABABA]/60 italic">No screens assigned</span>
                    ) : (
                      theatreScreens.map((sc) => (
                        <div
                          key={sc.id}
                          className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-xs flex items-center justify-between"
                        >
                          <span className="font-semibold text-white">{sc.name}</span>
                          <span className="text-[10px] text-[#BABABA]">{sc.totalSeats} seats</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
