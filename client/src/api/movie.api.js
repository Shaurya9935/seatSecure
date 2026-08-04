const API_URL = "http://localhost:4000/api";

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