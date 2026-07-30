import ApiError from "../../common/utils/api-error.js";

const search = async (query) => {
  const url = new URL(process.env.OMDB_BASE_URL);

  url.searchParams.set("apikey", process.env.OMDB_API_KEY);
  url.searchParams.set("s", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw ApiError.internal("Failed to contact OMDb");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw ApiError.notFound(data.Error);
  }

  return data.Search.map((movie) => ({
    title: movie.Title,
    year: movie.Year,
    imdbId: movie.imdbID,
    poster: movie.Poster,
    type: movie.Type,
  }));
};

const detail = async (imdbId) => {
  const url = new URL(process.env.OMDB_BASE_URL);

  url.searchParams.set("apikey", process.env.OMDB_API_KEY);
  url.searchParams.set("i", imdbId);

  const response = await fetch(url);

  if(!response.ok) {
    throw ApiError.internal("Failed to connect OMDb server")
  }
  const data = await response.json();
  if(data.Response === "False"){
    throw ApiError.notFound(data.Error)
  }

  return {
    imdbId: data.imdbID || imdbId,
    title: data.Title,
    plot: data.Plot,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    actors: data.Actors,
    poster: data.Poster,
    imdbRating: data.imdbRating,
    year: data.Year,
    language: data.Language,
    released: data.Released,
    rated: data.Rated,

  };
};

const shows = async (imdbId) => {
    const url = new URL(process.env.OMDB_BASE_URL);

    url.searchParams.set("apikey", OMDB_API_KEY);
    url.searchParams.set("i",imdbId);

    
}
export { search, detail, shows };
