import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Loader from "../../components/ui/Loader";
import { getShowSeats, createBooking } from "../../api/movie.api";
import { socket } from "../../socket/socket";

// Rows A–E are standard; F onwards are premium
const PREMIUM_FROM = "F";



function isPremiumRow(row) {
  return row >= PREMIUM_FROM;
}

function formatTime(startTimeStr) {
  try {
    const d = new Date(startTimeStr);
    if (isNaN(d.getTime())) return startTimeStr;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return startTimeStr;
  }
}

function formatDate(startTimeStr) {
  try {
    const d = new Date(startTimeStr);
    if (isNaN(d.getTime())) return "Today";
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return "Today";
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  } catch {
    return "Today";
  }
}

const SeatPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const showContext = location.state || {};

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("join-show", showId);
    });

    return () => {
      socket.disconnect();
    };
  }, [showId]);

  // Listen for real-time seat updates from other users
  useEffect(() => {
    socket.on("seat-booked", ({ seatIds }) => {
      setSeats((prev) =>
        prev.map((seat) =>
          seatIds.includes(seat.id) ? { ...seat, isBooked: true } : seat
        )
      );
      // Also deselect any of those seats if the current user had them selected
      setSelectedIds((prev) => {
        const next = new Set(prev);
        seatIds.forEach((id) => next.delete(id));
        return next;
      });
    });

    return () => {
      socket.off("seat-booked");
    };
  }, []);


  const [seats, setSeats] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getShowSeats(showId);
        setSeats(res.data || []);
      } catch (err) {
        setError(err.message || "Failed to load seats");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [showId]);

  // Group seats by row, sorted
  const rows = useMemo(() => {
    const map = {};
    for (const seat of seats) {
      if (!map[seat.row]) map[seat.row] = [];
      map[seat.row].push(seat);
    }
    // Sort seats within each row by number
    Object.values(map).forEach((arr) => arr.sort((a, b) => a.number - b.number));
    return map;
  }, [seats]);

  const sortedRowKeys = Object.keys(rows).sort();

  // Insert a divider before first premium row
  const premiumStart = sortedRowKeys.find(isPremiumRow);

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else next.add(seat.id);
      return next;
    });
  };

  const selectedSeats = seats.filter((s) => selectedIds.has(s.id));
  const pricePerSeat = showContext.price || 0;
  const totalAmount = selectedSeats.length * pricePerSeat;

  const handleConfirm = async () => {
    if (selectedIds.size === 0) return;
    setBooking(true);
    try {
      await createBooking(showId, [...selectedIds]);
      navigate("/", { replace: true });
      // A real app would go to a confirmation page
      alert("🎉 Booking confirmed! Check your email for details.");
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    } finally {
      setBooking(false);
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#161316] text-white font-['Inter'] flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 bg-[#1c191c] border border-white/10 p-8 rounded-3xl max-w-sm">
            <span className="text-4xl">⚠️</span>
            <h2 className="text-xl font-bold text-white">Failed to load seats</h2>
            <p className="text-sm text-[#BABABA]">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-[#FF6D29] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161316] text-white font-['Inter'] flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 pb-32">
        {/* ── HEADER ── */}
        <section className="border-b border-white/[0.06] bg-[#1c191c]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex items-start gap-4">
            <button
              onClick={() => navigate(-1)}
              className="mt-0.5 flex items-center gap-1.5 text-[#BABABA] hover:text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
            >
              <span>←</span>
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="space-y-1">
              <h1 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-white leading-tight">
                {showContext.movieTitle || "Movie"}
              </h1>
              <p className="text-xs text-[#BABABA] flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <span>📍</span>
                  <span>
                    {showContext.theatre || "Theatre"} • {showContext.screen || "Screen"}
                  </span>
                </span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1">
                  <span>🕒</span>
                  <span>
                    {formatDate(showContext.startTime)} •{" "}
                    {formatTime(showContext.startTime)}
                  </span>
                </span>
                {pricePerSeat > 0 && (
                  <>
                    <span className="text-white/20">|</span>
                    <span className="text-emerald-400 font-bold">₹{pricePerSeat} / seat</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ── SEAT MAP ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
          {/* Screen indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-full max-w-md h-[3px] bg-gradient-to-r from-transparent via-[#FF6D29]/70 to-transparent rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6D29]/70">
              Screen
            </span>
          </div>

          {/* Rows */}
          <div className="flex flex-col items-center space-y-2">
            {sortedRowKeys.map((rowKey) => {
              const isPremium = isPremiumRow(rowKey);
              const isFirstPremium = rowKey === premiumStart;
              return (
                <React.Fragment key={rowKey}>
                  {isFirstPremium && (
                    <div className="flex items-center gap-3 py-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6D29]/80 px-2">
                        Premium
                      </span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    {/* Row label */}
                    <span
                      className={`w-5 text-center text-xs font-bold shrink-0 ${
                        isPremium ? "text-[#FF6D29]" : "text-[#BABABA]"
                      }`}
                    >
                      {rowKey}
                    </span>

                    {/* Seats */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {rows[rowKey].map((seat) => {
                        const isBooked = seat.isBooked;
                        const isSelected = selectedIds.has(seat.id);

                        let seatClass =
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-md border text-[10px] font-bold transition-all duration-150 flex items-center justify-center cursor-pointer select-none ";

                        if (isBooked) {
                          seatClass +=
                            "bg-red-500/20 border-red-500/40 text-red-400 cursor-not-allowed";
                        } else if (isSelected) {
                          seatClass +=
                            "bg-[#FF6D29] border-[#FF6D29] text-white scale-110 shadow-[0_0_10px_rgba(255,109,41,0.5)]";
                        } else if (isPremium) {
                          seatClass +=
                            "bg-amber-400/10 border-amber-400/30 text-amber-300 hover:bg-amber-400/25 hover:border-amber-400/50";
                        } else {
                          seatClass +=
                            "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-500/50";
                        }

                        return (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeat(seat)}
                            disabled={isBooked}
                            title={`${rowKey}${seat.number}`}
                            className={seatClass}
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-[#BABABA]">
              <span className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />
              Available
            </div>
            <div className="flex items-center gap-2 text-xs text-[#BABABA]">
              <span className="w-4 h-4 rounded bg-red-500/20 border border-red-500/40 inline-block" />
              Booked
            </div>
            <div className="flex items-center gap-2 text-xs text-[#BABABA]">
              <span className="w-4 h-4 rounded bg-[#FF6D29] border border-[#FF6D29] inline-block" />
              Selected
            </div>
            <div className="flex items-center gap-2 text-xs text-[#BABABA]">
              <span className="w-4 h-4 rounded bg-amber-400/10 border border-amber-400/30 inline-block" />
              Premium
            </div>
          </div>
        </section>
      </main>

      {/* ── STICKY BOOKING FOOTER ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1c191c]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          {/* Selected info */}
          <div className="flex-1 space-y-1.5">
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-[#BABABA]">Select seats to continue</p>
            ) : (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[#BABABA] font-medium">Selected:</span>
                  {selectedSeats.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 bg-[#FF6D29]/15 text-[#FF6D29] text-xs font-bold rounded-md border border-[#FF6D29]/30"
                    >
                      {s.row}{s.number}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#BABABA]">
                    {selectedSeats.length} {selectedSeats.length === 1 ? "Ticket" : "Tickets"}
                  </span>
                  {pricePerSeat > 0 && (
                    <span className="text-white font-bold text-base">
                      ₹{totalAmount}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={selectedIds.size === 0 || booking}
            className="px-8 py-3.5 bg-[#FF6D29] hover:bg-[#e85c18] text-white font-bold text-sm rounded-xl
                       disabled:opacity-40 disabled:cursor-not-allowed
                       shadow-[0_4px_16px_rgba(255,109,41,0.3)] hover:shadow-[0_6px_20px_rgba(255,109,41,0.4)]
                       transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0"
          >
            {booking ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Confirming…
              </>
            ) : (
              <>
                <span>🎟️</span>
                Confirm Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatPage;