import React from 'react';

/**
 * AdminHeader renders dashboard stats summary cards and header title.
 */
export const AdminHeader = ({ showsCount, screensCount, theatresCount, onRefresh, loading }) => {
  return (
    <div className="space-y-6">
      {/* Title & Refresh Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#FF6D29]/20 text-[#FF6D29] border border-[#FF6D29]/30">
              ADMIN CONTROL PANEL
            </span>
          </div>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Show Manager Dashboard
          </h1>
          <p className="text-xs text-[#BABABA] mt-1">
            Manage cinema theatres, screens, and schedule live movie showtimes.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl 
                     text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <span className={loading ? 'animate-spin' : ''}>🔄</span>
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Shows Card */}
        <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-[#BABABA] tracking-wider">Scheduled Shows</span>
            <div className="font-['Outfit'] text-3xl font-extrabold text-white">{showsCount}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/15 border border-[#FF6D29]/30 text-[#FF6D29] flex items-center justify-center text-xl">
            📅
          </div>
        </div>

        {/* Total Screens Card */}
        <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-[#BABABA] tracking-wider">Active Screens</span>
            <div className="font-['Outfit'] text-3xl font-extrabold text-white">{screensCount}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center text-xl">
            📺
          </div>
        </div>

        {/* Active Theatres Card */}
        <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-[#BABABA] tracking-wider">Registered Theatres</span>
            <div className="font-['Outfit'] text-3xl font-extrabold text-white">{theatresCount}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl">
            🏛️
          </div>
        </div>

      </div>
    </div>
  );
};
