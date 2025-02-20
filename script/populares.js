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

const renderPopularMovies = (movies, containerId, title, sliderClass) => {
  const moviesHTML = movies
    .map(
      (movie) => `
    <div class="movie-card">
      <div class="card bg-dark text-white">
        <button id="fav-btn-${movie.id}" class="fav-btn btn btn-warning position-absolute top-10 end-0 mt-2 me-2 fs-5" onclick="toggleFavorite(${movie.id})">☆</button>
        <a href="./views/detail.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt=${movie.title}>
        </a>
        <div class="card-body">
          <h3 class="card-title fs-5">
            <a href="./views/detail.html?id=${movie.id}" class="text-white text-decoration-none">
              ${movie.title}
            </a>
          </h3>
          <p class="card-text"><span aria-label="Puntuación" role="img">⭐</span> ${movie.vote_average} | <span aria-label="Fecha de salida" role="img">📅</span> ${movie.release_date}</p>
        </div>
      </div>
    </div>`
    )
    .join("");

  document.getElementById(containerId).innerHTML = `
    <h2 class="text-start text-danger mb-4">${title}</h2>
    <div class="${sliderClass}">${moviesHTML}</div>
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
  renderPopularMovies(
    popularMovies,
    "popular-content",
    "Películas Populares",
    "movie-slider1"
  );

  const trendingMovies = await fetchMoviesData("/trending/movie/day");
  renderPopularMovies(
    trendingMovies,
    "trending",
    "Películas del Día",
    "movie-slider2"
  );

  const topRatedMovies = await fetchMoviesData("/movie/top_rated");
  renderPopularMovies(
    topRatedMovies,
    "top-rated-content",
    "Películas Top",
    "movie-slider3"
  );

  const allMovies = [...popularMovies, ...trendingMovies, ...topRatedMovies];
  allMovies.forEach((movie) => updateFavoriteButton(movie.id));
};

loadMovies();

const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

const setFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

window.toggleFavorite = (movieId) => {
  let favorites = getFavorites();
  let index = favorites.indexOf(movieId);

  if (index === -1) {
    favorites.push(movieId);
  } else {
    favorites.splice(index, 1);
  }

  setFavorites(favorites);
  updateFavoriteButton(movieId);
};

const updateFavoriteButton = (movieId) => {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(movieId);
  const button = document.getElementById(`fav-btn-${movieId}`);

  if (!button) return;

  button.innerHTML = isFavorite
    ? "<span role='img' aria-label='Quitar de favoritos'>★</span>"
    : "<span role='img' aria-label='Añadir a favoritos'>☆</span>";
};
