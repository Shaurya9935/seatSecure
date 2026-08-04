const API_URL = "http://localhost:4000/api";

export async function getShowSeats(showId) {
  const response = await fetch(`${API_URL}/booking/${showId}/seats`);
  if (!response.ok) {
    throw new Error("Failed to fetch seats");
  }
  return response.json();
}

export async function createBooking(showId, seatIds) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ showId, seatIds }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create booking");
  }
  return response.json();
}

export async function searchMovies(query = 'batman') {
  const response = await fetch(
    `${API_URL}/movies/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  
  return response.json();
}

export async function getMovieDetails(imdbId) {
  const response = await fetch(`${API_URL}/movies/${imdbId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}

export async function getMovieShows(imdbId) {
  const response = await fetch(`${API_URL}/movies/${imdbId}/shows`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie shows");
  }
  return response.json();
}