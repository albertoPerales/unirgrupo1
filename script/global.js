const API_KEY = "b89b1e1077ca792380cfdc3b05ff9966";
const BASE_URL = `https://api.themoviedb.org/3`;

// Session storage
const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

const setFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Renders
const renderMovie = (movie, level) => {
  const levels = {
    first: `./views/detail.html?id=${movie.id}`,
    second: `../views/detail.html?id=${movie.id}`,
  };

  return `
  <div class="movie-card">
    <div class="card bg-dark text-white">
      <button id="fav-btn-${
        movie.id
      }" class="fav-btn btn btn-warning position-absolute top-10 end-0 mt-2 me-2 fs-5" onclick="toggleFavorite(${
    movie.id
  })">
        ${getFavoriteIcon(movie.id)}
      </button>
      <a href="${levels[level]}">
        <img src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" class="card-img-top" alt="${movie.title}">
      </a>
      <div class="card-body">
        <h3 class="card-title fs-5">
          <a href="href="${
            levels[level]
          }" class="text-white text-decoration-none">
            ${movie.title}
          </a>
        </h3>
        <p class="card-text">
          <span aria-label="Puntuación" role="img">⭐</span> ${
            movie.vote_average
          } |
          <span aria-label="Fecha de salida" role="img">📅</span> ${
            movie.release_date
          }
        </p>
      </div>
    </div>
  </div>`;
};

// Favs
const toggleFavorite = (movieId) => {
  let favorites = getFavorites();
  const index = favorites.indexOf(movieId);

  index === -1 ? favorites.push(movieId) : favorites.splice(index, 1);

  setFavorites(favorites);
  updateFavoriteButton(movieId);
};

const updateFavoriteButton = (movieId) => {
  const button = document.getElementById(`fav-btn-${movieId}`);
  if (button) button.innerHTML = getFavoriteIcon(movieId);
};

const getFavoriteIcon = (movieId) => {
  return getFavorites().includes(movieId)
    ? "<span role='img' aria-label='Quitar de favoritos'>★</span>"
    : "<span role='img' aria-label='Añadir a favoritos'>☆</span>";
};

// Services
const fetchMoviesByEndpoint = async (endpoint) => {
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

const fetchMovieById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la película:", error);
    return [];
  }
};
