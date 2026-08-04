import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { searchMovies } from "../../api/movie.api";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router";



const DATE_OPTIONS = [
  { label: "TODAY", date: "30 Jul", day: "Wed" },
  { label: "TOMORROW", date: "31 Jul", day: "Thu" },
  { label: "FRI", date: "01 Aug", day: "Fri" },
  { label: "SAT", date: "02 Aug", day: "Sat" },
  { label: "SUN", date: "03 Aug", day: "Sun" },
];

const POSTER_FALLBACK =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400";

const HomePage = () => {

  const navigate = useNavigate();

  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("30 Jul");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalMovie, setActiveModalMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const genres = ["All", "Action", "Sci-Fi", "Adventure", "Drama", "Animation"];

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await searchMovies("batman");
        setMovies(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#161316] text-[#FFFFFF] font-['Inter'] flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader />
        </main>
        <Footer />
      </div>
    );
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSearch;
  });

  const featuredMovie = movies[0];

  const handleOpenShowtimeModal = (movie) => {
    setActiveModalMovie(movie);
    setSelectedShowtime(null);
  };

  const handleConfirmShowtime = () => {
    if (!selectedShowtime || !activeModalMovie) return;
    alert(
      `Proceeding to Seat Selection for "${activeModalMovie.title}" at ${selectedShowtime.time} (${selectedShowtime.theatre})`
    );
  };

  return (
    <div className="min-h-screen bg-[#161316] text-[#FFFFFF] font-['Inter'] flex flex-col antialiased">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1 pb-24">
        {/* HERO BANNER */}
        {featuredMovie && (
          <section className="relative w-full py-16 sm:py-24 overflow-hidden border-b border-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-b opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Details Column */}
                <div className="lg:col-span-8 space-y-6 z-10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-[#FF6D29]/15 text-[#FF6D29] text-xs font-semibold rounded-md border border-[#FF6D29]/30">
                      FEATURED
                    </span>
                    <span className="px-2.5 py-1 bg-white/5 text-white/90 text-xs font-medium rounded-md border border-white/10 capitalize">
                      {featuredMovie.type || "Movie"}
                    </span>
                    <span className="px-2.5 py-1 bg-white/5 text-[#BABABA] text-xs font-medium rounded-md border border-white/10">
                      {featuredMovie.year}
                    </span>
                  </div>

                  <h1 className="font-['Outfit'] text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                    {featuredMovie.title}
                  </h1>

                  <p className="text-[#BABABA] text-sm sm:text-base max-w-2xl leading-relaxed">
                    Now playing in theaters. Select your showtime and reserve your favorite seats.
                  </p>

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
                  <div
                    className="w-[270px] h-[380px] rounded-2xl overflow-hidden
                                border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.7)] 
                                relative group transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <img
                      src={
                        featuredMovie.poster && featuredMovie.poster !== "N/A"
                          ? featuredMovie.poster
                          : POSTER_FALLBACK
                      }
                      alt={featuredMovie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-3.5 border-t border-white/10 text-center">
                      <h3 className="font-['Outfit'] font-bold text-white text-base leading-tight truncate">
                        {featuredMovie.title}
                      </h3>
                      <p className="text-xs text-[#BABABA] font-medium">
                        {featuredMovie.year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEARCH & FILTERS BAR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#1c191c] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161316] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white 
                             outline-none focus:border-[#FF6D29]/70 transition-all placeholder:text-[#BABABA]/50"
                />
                <span className="absolute left-3.5 top-3.5 text-[#BABABA] text-sm">
                  🔍
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedGenre === genre
                        ? "bg-white text-[#161316] font-bold shadow-md"
                        : "bg-white/5 text-[#BABABA] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

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
                        ? "bg-[#FF6D29] border-[#FF6D29] text-white shadow-md"
                        : "bg-[#161316] border-white/10 text-[#BABABA] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      {opt.label}
                    </span>
                    <span className="text-sm font-extrabold">{opt.date}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MOVIES GRID SECTION */}
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
              <p className="text-sm text-[#BABABA]">
                Try searching another keyword or resetting filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.imdbId}
                  className="bg-[#1c191c] border border-white/5 rounded-2xl overflow-hidden 
                             hover:border-white/20 hover:shadow-2xl hover:-translate-y-1
                             transition-all duration-300 flex flex-col group"
                >
                  <div className="h-72 w-full relative overflow-hidden bg-[#111]">
                    <img
                      src={
                        movie.poster && movie.poster !== "N/A"
                          ? movie.poster
                          : POSTER_FALLBACK
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-amber-400 border border-white/10">
                      {movie.year}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#BABABA]">
                        <span className="font-semibold text-white/90 capitalize">
                          {movie.type || "Movie"}
                        </span>
                        <span>{movie.year}</span>
                      </div>
                      <h3 className="font-['Outfit'] font-bold text-lg text-white group-hover:text-[#FF6D29] transition-colors leading-snug line-clamp-1">
                        {movie.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => navigate(`/movies/${movie.imdbId}`)}
                      className="w-full py-3 text-xs font-bold text-white rounded-xl bg-white/5 border border-white/10 
                                 group-hover:bg-[#FF6D29] group-hover:border-[#FF6D29] 
                                 transition-all duration-200 cursor-pointer text-center"
                    >
                      Movie Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* SHOWTIME PICKER MODAL */}
      {activeModalMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1c191c] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <img
                  src={
                    activeModalMovie.poster && activeModalMovie.poster !== "N/A"
                      ? activeModalMovie.poster
                      : POSTER_FALLBACK
                  }
                  alt={activeModalMovie.title}
                  className="w-10 h-14 object-cover rounded-lg border border-white/10"
                />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl text-white">
                    {activeModalMovie.title}
                  </h3>
                  <p className="text-xs text-[#BABABA]">
                    Date:{" "}
                    <span className="text-white font-semibold">
                      {selectedDate}
                    </span>{" "}
                    • {activeModalMovie.year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalMovie(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#BABABA] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#BABABA]">
                  Select Theatre & Showtime
                </h4>
              </div>

              <div className="text-center py-10 text-[#BABABA] text-sm space-y-2">
                <span className="text-3xl block">🎟️</span>
                <p>
                  Showtimes for{" "}
                  <strong className="text-white">{activeModalMovie.title}</strong>{" "}
                  are coming soon.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
              <div className="text-xs text-[#BABABA]">
                {selectedShowtime ? (
                  <span>
                    Selected: <strong className="text-white">{selectedShowtime.time}</strong>
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

      <Footer />
    </div>
  );
};

export default HomePage;
