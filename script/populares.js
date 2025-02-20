const fetchMoviesData = async (endpoint) => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    return [];
  }
};

const renderMoviesBySection = (movies, containerId, title, sliderClass) => {
  const sectionHeader = `<h2 class="text-start text-danger mb-4">${title}</h2>`;
  const sectionMovies = movies.map((movie) => renderMovie(movie)).join("");

  document.getElementById(containerId).innerHTML = `
   ${sectionHeader}
    <div class="${sliderClass}">${sectionMovies}</div>
  `;

  $(`.${sliderClass}`).slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  });
};

const loadMovies = async () => {
  const popularMovies = await fetchMoviesData("/movie/popular");
  renderMoviesBySection(
    popularMovies,
    "popular-content",
    "Películas Populares",
    "movie-slider1"
  );

  const trendingMovies = await fetchMoviesData("/trending/movie/day");
  renderMoviesBySection(
    trendingMovies,
    "trending",
    "Películas del Día",
    "movie-slider2"
  );

  const topRatedMovies = await fetchMoviesData("/movie/top_rated");
  renderMoviesBySection(
    topRatedMovies,
    "top-rated-content",
    "Películas Top",
    "movie-slider3"
  );

  const allMovies = [...popularMovies, ...trendingMovies, ...topRatedMovies];
  allMovies.forEach((movie) => updateFavoriteButton(movie.id));
};

loadMovies();