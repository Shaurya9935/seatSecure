const search = async (query) => {
  const url = new URL(process.env.OMDB_BASE_URL);

  url.searchParams.set("apikey", process.env.OMDB_API_KEY);
  url.searchParams.set("s", query);

  const response = await fetch(url)
  const data = await response.json()

  console.log(data);
//   console.log(data.Search[0].Title)
  return data;
};

export { search };
