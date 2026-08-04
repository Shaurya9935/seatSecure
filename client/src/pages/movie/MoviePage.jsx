import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Loader from "../../components/ui/Loader";
import { getMovieDetails, getMovieShows } from "../../api/movie.api";

const POSTER_FALLBACK =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400";

function MoviePage() {
  const { imdbId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch movie details
        const movieRes = await getMovieDetails(imdbId);
        setMovie(movieRes.data);

        // Fetch movie shows (catch error if no shows found or movie not in DB yet)
        try {
          const showsRes = await getMovieShows(imdbId);
          setShows(showsRes.data || []);
        } catch (showsErr) {
          console.warn("Could not load shows for movie:", showsErr.message);
          setShows([]);
        }
      } catch (err) {
        console.error("Failed to load movie details:", err);
        setError(err.message || "Failed to load movie details");
      } finally {
        setLoading(false);
      }
    }

    if (imdbId) {
      fetchData();
    }
  }, [imdbId]);

  const formatShowTime = (startTimeStr) => {
    try {
      const d = new Date(startTimeStr);
      if (isNaN(d.getTime())) return startTimeStr;
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return startTimeStr;
    }
  };

  const scrollToShows = () => {
    const section = document.getElementById("available-shows");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#161316] text-white font-['Inter'] flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#161316] text-white font-['Inter'] flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md bg-[#1c191c] border border-white/10 p-8 rounded-3xl">
            <span className="text-4xl block">🎬</span>
            <h2 className="text-xl font-bold text-white">Movie Not Found</h2>
            <p className="text-sm text-[#BABABA]">
              {error || "Unable to fetch movie details. Please try again later."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const actorsList = movie.actors
    ? movie.actors.split(",").map((actor) => actor.trim())
    : [];

  return (
    <div className="min-h-screen bg-[#161316] text-white font-['Inter'] flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* HERO / HEADER SECTION */}
        <section className="relative w-full py-12 sm:py-16 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Poster Column */}
              <div className="md:col-span-4 flex justify-center md:justify-start">
                <div className="w-[260px] sm:w-[280px] h-[380px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group">
                  <img
                    src={
                      movie.poster && movie.poster !== "N/A"
                        ? movie.poster
                        : POSTER_FALLBACK
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Movie Info Column */}
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h1 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {movie.title}
                  </h1>

                  {/* Badges: Rating, Genre, Runtime, Released */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                    {movie.imdbRating && movie.imdbRating !== "N/A" && (
                      <div className="flex items-center gap-1.5 bg-amber-400/10 text-amber-400 px-3 py-1 rounded-xl border border-amber-400/20 font-bold text-xs">
                        <span>⭐</span>
                        <span>{movie.imdbRating}</span>
                      </div>
                    )}

                    {movie.genre && movie.genre !== "N/A" && (
                      <span className="px-3 py-1 bg-white/5 text-white/90 text-xs font-medium rounded-xl border border-white/10">
                        {movie.genre.split(", ").join(" • ")}
                      </span>
                    )}

                    {movie.runtime && movie.runtime !== "N/A" && (
                      <span className="px-3 py-1 bg-white/5 text-[#BABABA] text-xs font-medium rounded-xl border border-white/10">
                        ⏱️ {movie.runtime}
                      </span>
                    )}

                    {(movie.released || movie.year) && (
                      <span className="px-3 py-1 bg-white/5 text-[#BABABA] text-xs font-medium rounded-xl border border-white/10">
                        📅 Released: {movie.released || movie.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Tickets CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={scrollToShows}
                    className="px-8 py-4 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-sm rounded-xl 
                               shadow-[0_4px_20px_rgba(255,109,41,0.25)] hover:shadow-[0_6px_24px_rgba(255,109,41,0.35)] 
                               hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2.5"
                  >
                    <span>🎟️</span>
                    <span>Book Tickets</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS CONTENT SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
          {/* Overview */}
          {movie.plot && movie.plot !== "N/A" && (
            <div className="space-y-3 bg-[#1c191c] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Outfit'] text-xl font-bold text-white tracking-wide">
                Overview
              </h2>
              <p className="text-[#BABABA] text-sm sm:text-base leading-relaxed">
                {movie.plot}
              </p>
            </div>
          )}

          {/* Director & Actors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Director */}
            {movie.director && movie.director !== "N/A" && (
              <div className="bg-[#1c191c] border border-white/10 p-6 rounded-2xl space-y-3">
                <h3 className="font-['Outfit'] text-xs uppercase font-bold tracking-wider text-[#FF6D29]">
                  Director
                </h3>
                <p className="text-white text-base font-semibold">
                  {movie.director}
                </p>
              </div>
            )}

            {/* Actors */}
            {actorsList.length > 0 && (
              <div className="bg-[#1c191c] border border-white/10 p-6 rounded-2xl space-y-3">
                <h3 className="font-['Outfit'] text-xs uppercase font-bold tracking-wider text-[#FF6D29]">
                  Actors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {actorsList.map((actor, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/5 text-white/90 text-xs font-medium rounded-xl border border-white/10"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AVAILABLE SHOWS SECTION */}
          <div id="available-shows" className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Available Shows
              </h2>
              <span className="text-xs text-[#BABABA] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                {shows.length} {shows.length === 1 ? "Show" : "Shows"} Available
              </span>
            </div>

            {shows.length === 0 ? (
              <div className="text-center py-16 bg-[#1c191c] border border-white/5 rounded-2xl space-y-3">
                <span className="text-4xl block">🍿</span>
                <h3 className="text-lg font-bold text-white">No Shows Scheduled</h3>
                <p className="text-sm text-[#BABABA]">
                  There are currently no active showtimes for this movie. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shows.map((show) => (
                  <div
                    key={show.showId}
                    className="bg-[#1c191c] border border-white/10 hover:border-[#FF6D29]/50 rounded-2xl p-6 space-y-4 transition-all duration-200 shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-['Outfit'] font-bold text-white text-lg flex items-center gap-2">
                          <span>📍</span>
                          <span>{show.theatre}</span>
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#BABABA]">
                        <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10 font-medium">
                          {show.screen}
                        </span>
                        <span className="text-emerald-400 font-bold text-sm">
                          ₹{show.price}
                        </span>
                      </div>

                      <div className="pt-2 flex items-center gap-2 text-white font-bold text-xl">
                        <span>🕒</span>
                        <span>{formatShowTime(show.startTime)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/booking/${show.showId}/seats`, {
                          state: {
                            movieTitle: movie.title,
                            theatre: show.theatre,
                            screen: show.screen,
                            startTime: show.startTime,
                            price: show.price,
                          },
                        })
                      }
                      className="w-full py-3 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
                    >
                      Select Seats
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MoviePage;