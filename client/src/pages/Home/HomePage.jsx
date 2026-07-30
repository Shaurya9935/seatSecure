import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/footer/footer';

// Mock Featured Movies Data
const MOCK_MOVIES = [
  {
    id: 'dune-2',
    title: 'Dune: Part Two',
    rating: '8.8',
    votes: '124K',
    certificate: 'UA 16+',
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['IMAX 3D', '2D', '4DX'],
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    duration: '2h 46m',
    bannerBg: 'from-[#1e1b24] via-[#161316] to-[#121014]',
    posterBg: 'from-slate-800 to-zinc-950',
    icon: '🏜️',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    theatres: [
      {
        name: 'PVR Director’s Cut, Vasant Kunj',
        showtimes: [
          { time: '10:30 AM', status: 'available', price: '$12' },
          { time: '02:15 PM', status: 'filling', price: '$14' },
          { time: '05:45 PM', status: 'full', price: '$16' },
          { time: '09:30 PM', status: 'filling', price: '$16' },
        ],
      },
      {
        name: 'INOX Megaplex, Laser IMAX',
        showtimes: [
          { time: '11:15 AM', status: 'available', price: '$13' },
          { time: '03:30 PM', status: 'available', price: '$15' },
          { time: '07:00 PM', status: 'full', price: '$18' },
          { time: '10:45 PM', status: 'available', price: '$15' },
        ],
      },
    ],
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    rating: '8.9',
    votes: '210K',
    certificate: 'A',
    languages: ['English', 'Hindi'],
    formats: ['IMAX 70mm', '2D'],
    genres: ['Biography', 'Drama', 'History'],
    duration: '3h 00m',
    bannerBg: 'from-[#221c20] via-[#161316] to-[#121014]',
    posterBg: 'from-stone-800 to-zinc-950',
    icon: '💥',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    theatres: [
      {
        name: 'Cinepolis Dolby Atmos, Select Citywalk',
        showtimes: [
          { time: '11:00 AM', status: 'available', price: '$11' },
          { time: '03:00 PM', status: 'filling', price: '$14' },
          { time: '07:15 PM', status: 'full', price: '$16' },
          { time: '10:45 PM', status: 'available', price: '$14' },
        ],
      },
    ],
  },
  {
    id: 'kalki-2898',
    title: 'Kalki 2898 AD',
    rating: '8.5',
    votes: '95K',
    certificate: 'UA',
    languages: ['Hindi', 'Telugu', 'Tamil', 'Malayalam'],
    formats: ['3D', '2D', 'IMAX 3D'],
    genres: ['Action', 'Sci-Fi', 'Mythology'],
    duration: '3h 01m',
    bannerBg: 'from-[#1a1f2c] via-[#161316] to-[#121014]',
    posterBg: 'from-slate-800 to-slate-950',
    icon: '⚔️',
    description: 'A modern avatar of Vishnu descends to Earth to protect humanity against dark dystopian forces.',
    theatres: [
      {
        name: 'PVR Gold Class, Pacific Mall',
        showtimes: [
          { time: '09:45 AM', status: 'available', price: '$10' },
          { time: '01:30 PM', status: 'filling', price: '$13' },
          { time: '05:15 PM', status: 'full', price: '$15' },
          { time: '08:45 PM', status: 'filling', price: '$15' },
        ],
      },
    ],
  },
  {
    id: 'spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    rating: '8.9',
    votes: '180K',
    certificate: 'U',
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['3D', '2D', '4DX'],
    genres: ['Animation', 'Action', 'Adventure'],
    duration: '2h 20m',
    bannerBg: 'from-[#201828] via-[#161316] to-[#121014]',
    posterBg: 'from-indigo-900 to-purple-950',
    icon: '🕷️',
    description: 'Miles Morales catapults across the Multiverse, joining forces with Gwen Stacy and a new team of Spider-People.',
    theatres: [
      {
        name: 'INOX Laser Plex, DLF Avenue',
        showtimes: [
          { time: '12:15 PM', status: 'available', price: '$10' },
          { time: '03:45 PM', status: 'available', price: '$12' },
          { time: '06:45 PM', status: 'filling', price: '$14' },
          { time: '10:00 PM', status: 'available', price: '$12' },
        ],
      },
    ],
  },
];

const DATE_OPTIONS = [
  { label: 'TODAY', date: '30 Jul', day: 'Wed' },
  { label: 'TOMORROW', date: '31 Jul', day: 'Thu' },
  { label: 'FRI', date: '01 Aug', day: 'Fri' },
  { label: 'SAT', date: '02 Aug', day: 'Sat' },
  { label: 'SUN', date: '03 Aug', day: 'Sun' },
];

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState('30 Jul');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalMovie, setActiveModalMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const genres = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Animation'];

  const filteredMovies = MOCK_MOVIES.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const featuredMovie = MOCK_MOVIES[0];

  const handleOpenShowtimeModal = (movie) => {
    setActiveModalMovie(movie);
    setSelectedShowtime(null);
  };

  const handleConfirmShowtime = () => {
    if (!selectedShowtime || !activeModalMovie) return;
    alert(`Proceeding to Seat Selection for "${activeModalMovie.title}" at ${selectedShowtime.time} (${selectedShowtime.theatre})`);
  };

  return (
    <div className="min-h-screen bg-[#161316] text-[#FFFFFF] font-['Inter'] flex flex-col antialiased">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* ELEGANT MINIMAL HERO BANNER (Clean Breathing Space) */}
        <section className="relative w-full py-16 sm:py-24 overflow-hidden border-b border-white/[0.06]">
          {/* Soft background ambient gradient */}
          <div className={`absolute inset-0 bg-gradient-to-b ${featuredMovie.bannerBg} opacity-80 pointer-events-none`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Details Column */}
              <div className="lg:col-span-8 space-y-6 z-10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-[#FF6D29]/15 text-[#FF6D29] text-xs font-semibold rounded-md border border-[#FF6D29]/30">
                    FEATURED
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 text-white/90 text-xs font-medium rounded-md border border-white/10">
                    {featuredMovie.certificate}
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 text-[#BABABA] text-xs font-medium rounded-md border border-white/10">
                    {featuredMovie.duration}
                  </span>
                </div>

                <h1 className="font-['Outfit'] text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                  {featuredMovie.title}
                </h1>

                <p className="text-[#BABABA] text-sm sm:text-base max-w-2xl leading-relaxed">
                  {featuredMovie.description}
                </p>

                {/* Rating & Genre Badges */}
                <div className="flex items-center gap-6 pt-1 text-sm flex-wrap">
                  <div className="flex items-center gap-2 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10">
                    <span className="text-amber-400">★</span>
                    <span className="font-bold text-white">{featuredMovie.rating}</span>
                    <span className="text-[#BABABA] text-xs">({featuredMovie.votes})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {featuredMovie.genres.map((g) => (
                      <span key={g} className="text-xs text-[#BABABA] bg-white/[0.04] px-3 py-1 rounded-lg border border-white/5">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleOpenShowtimeModal(featuredMovie)}
                    className="px-8 py-4 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-sm rounded-xl 
                               shadow-[0_4px_20px_rgba(255,109,41,0.25)] hover:shadow-[0_6px_24px_rgba(255,109,41,0.35)] 
                               hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2.5"
                  >
                    <span>🎟️</span>
                    <span>Book Tickets</span>
                  </button>
                </div>
              </div>

              {/* Right Poster Artwork */}
              <div className="hidden lg:col-span-4 lg:flex justify-end z-10">
                <div className={`w-[270px] h-[380px] rounded-2xl bg-gradient-to-b ${featuredMovie.posterBg} 
                                border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.7)] 
                                flex flex-col items-center justify-between p-6 relative group transition-transform duration-300 hover:scale-[1.02]`}>
                  <div className="text-7xl pt-10 group-hover:scale-110 transition-transform duration-300">
                    {featuredMovie.icon}
                  </div>
                  <div className="w-full text-center space-y-1 bg-black/50 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                    <h3 className="font-['Outfit'] font-bold text-white text-base leading-tight">{featuredMovie.title}</h3>
                    <p className="text-xs text-[#BABABA] font-medium">{featuredMovie.formats.join(' • ')}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SEARCH & FILTERS BAR (Clean Air Padding) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-6 shadow-lg">
            
            {/* Search Bar & Genre Selector */}
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
              
              {/* Search Bar Input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161316] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white 
                             outline-none focus:border-[#FF6D29]/70 transition-all placeholder:text-[#BABABA]/50"
                />
                <span className="absolute left-3.5 top-3.5 text-[#BABABA] text-sm">🔍</span>
              </div>

              {/* Genre Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedGenre === genre
                        ? 'bg-white text-[#161316] font-bold shadow-md'
                        : 'bg-white/5 text-[#BABABA] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

            </div>

            {/* DATE STRIP SELECTOR */}
            <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase text-[#BABABA] tracking-wider">
                Select Booking Date:
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {DATE_OPTIONS.map((opt) => (
                  <button
                    key={opt.date}
                    onClick={() => setSelectedDate(opt.date)}
                    className={`px-4 py-2.5 rounded-xl flex flex-col items-center min-w-[80px] transition-all duration-200 cursor-pointer border ${
                      selectedDate === opt.date
                        ? 'bg-[#FF6D29] border-[#FF6D29] text-white shadow-md'
                        : 'bg-[#161316] border-white/10 text-[#BABABA] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{opt.label}</span>
                    <span className="text-sm font-extrabold">{opt.date}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* MOVIES GRID SECTION (Spacious Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Now Showing
            </h2>
            <span className="text-xs text-[#BABABA] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              {filteredMovies.length} Movies
            </span>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="text-center py-20 bg-[#1c191c] border border-white/5 rounded-2xl space-y-3">
              <span className="text-4xl">🎬</span>
              <h3 className="text-lg font-bold text-white">No Movies Match</h3>
              <p className="text-sm text-[#BABABA]">Try searching another keyword or resetting genre filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#1c191c] border border-white/5 rounded-2xl overflow-hidden 
                             hover:border-white/20 hover:shadow-2xl hover:-translate-y-1
                             transition-all duration-300 flex flex-col group"
                >
                  {/* Poster Graphic */}
                  <div className={`h-64 w-full bg-gradient-to-b ${movie.posterBg} flex flex-col items-center justify-center p-4 relative`}>
                    <span className="text-6xl group-hover:scale-105 transition-transform duration-300">
                      {movie.icon}
                    </span>
                    <span className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-amber-400 flex items-center gap-1 border border-white/10">
                      ★ {movie.rating}
                    </span>
                    <span className="absolute bottom-3.5 left-3.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-white/90 uppercase border border-white/10">
                      {movie.formats.join(' • ')}
                    </span>
                  </div>

                  {/* Details & Action */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#BABABA]">
                        <span className="font-semibold text-white/90">{movie.certificate}</span>
                        <span>{movie.duration}</span>
                      </div>
                      <h3 className="font-['Outfit'] font-bold text-lg text-white group-hover:text-[#FF6D29] transition-colors leading-snug">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-[#BABABA] line-clamp-1">
                        {movie.languages.join(', ')}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenShowtimeModal(movie)}
                      className="w-full py-3 text-xs font-bold text-white rounded-xl bg-white/5 border border-white/10 
                                 group-hover:bg-[#FF6D29] group-hover:border-[#FF6D29] 
                                 transition-all duration-200 cursor-pointer text-center"
                    >
                      Select Showtimes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* SHOWTIME PICKER MODAL (Clean Dark Dialog) */}
      {activeModalMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1c191c] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeModalMovie.icon}</span>
                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl text-white">
                    {activeModalMovie.title}
                  </h3>
                  <p className="text-xs text-[#BABABA]">
                    Date: <span className="text-white font-semibold">{selectedDate}</span> • {activeModalMovie.languages.join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalMovie(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#BABABA] hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#BABABA]">Select Theatre & Showtime</h4>
              </div>

              <div className="space-y-6">
                {activeModalMovie.theatres.map((theatre, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-4">
                    <h5 className="font-semibold text-sm text-white flex items-center gap-2">
                      <span>📍</span>
                      <span>{theatre.name}</span>
                    </h5>

                    {/* Showtime Slots */}
                    <div className="flex flex-wrap gap-3">
                      {theatre.showtimes.map((st, slotIdx) => {
                        const isSelected =
                          selectedShowtime?.theatre === theatre.name && selectedShowtime?.time === st.time;

                        return (
                          <button
                            key={slotIdx}
                            onClick={() =>
                              setSelectedShowtime({
                                theatre: theatre.name,
                                time: st.time,
                                price: st.price,
                              })
                            }
                            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 flex flex-col items-center gap-0.5 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF6D29] border-[#FF6D29] text-white shadow-lg scale-105'
                                : 'bg-[#161316] border-white/10 text-white/90 hover:border-white/30'
                            }`}
                          >
                            <span>{st.time}</span>
                            <span className="text-[9px] opacity-75">{st.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
              <div className="text-xs text-[#BABABA]">
                {selectedShowtime ? (
                  <span>
                    Selected: <strong className="text-white">{selectedShowtime.time}</strong> ({selectedShowtime.price})
                  </span>
                ) : (
                  <span>Please select a showtime slot</span>
                )}
              </div>

              <button
                disabled={!selectedShowtime}
                onClick={handleConfirmShowtime}
                className="px-6 py-3 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-xs rounded-xl 
                           disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
              >
                Select Seats →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default HomePage;