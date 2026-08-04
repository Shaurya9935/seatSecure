import React, { useState } from 'react';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import { useAdminData } from '../../hooks/useAdminData';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ScheduleShowForm } from '../../components/admin/ScheduleShowForm';
import { ShowsTable } from '../../components/admin/ShowsTable';
import { TheatresList } from '../../components/admin/TheatresList';

/**
 * AdminPage Component
 * Full-featured admin dashboard for managing cinema showtimes and viewing screens/theatres.
 * Connected to backend endpoints at /api/admin/shows, /api/admin/screens, /api/admin/theatres.
 */
const AdminPage = () => {
  const {
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
  } = useAdminData();

  const [activeTab, setActiveTab] = useState('shows'); // 'shows' | 'schedule' | 'theatres'

  return (
    <div className="min-h-screen bg-[#161316] text-white font-['Inter'] flex flex-col antialiased">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Admin Header with Statistics */}
        <AdminHeader
          showsCount={shows.length}
          screensCount={screens.length}
          theatresCount={theatres.length}
          onRefresh={fetchAllData}
          loading={loading}
        />

        {/* Tab Bar Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-1">
          {[
            { id: 'shows', label: '📅 Scheduled Shows', count: shows.length },
            { id: 'schedule', label: '➕ Schedule New Show' },
            { id: 'theatres', label: '🏛️ Theatres & Screens', count: theatres.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'bg-white/5 text-[#FF6D29] border-[#FF6D29]'
                  : 'text-[#BABABA] hover:text-white border-transparent hover:bg-white/[0.02]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-white font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Views */}
        <div className="space-y-8">
          {activeTab === 'shows' && (
            <ShowsTable shows={shows} loading={loading} />
          )}

          {activeTab === 'schedule' && (
            <ScheduleShowForm
              screens={screens}
              searchOmdbMovies={searchOmdbMovies}
              onSchedule={scheduleShow}
              submitting={submitting}
              error={error}
              successMessage={successMessage}
            />
          )}

          {activeTab === 'theatres' && (
            <TheatresList theatres={theatres} screens={screens} loading={loading} />
          )}
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AdminPage;
