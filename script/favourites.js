const API_KEY = "b89b1e1077ca792380cfdc3b05ff9966";
const BASE_URL = `https://api.themoviedb.org/3`;

const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

const setFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
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

const fetchFavoriteMovies = async () => {
  const favoriteIds = getFavorites();

  if (favoriteIds.length === 0) {
    console.warn("No hay películas favoritas guardadas.");
    return [];
  }

  const moviePromises = favoriteIds.map(fetchMovieById);
  const movies = await Promise.all(moviePromises);

  return movies.filter((movie) => movie !== null);
};

const renderMovies = (movies, containerId, title) => {
  const container = document.getElementById(containerId);

  if (!container) return;

  if (movies.length === 0) {
    container.innerHTML = `<h2 class="text-start text-danger mb-4">${title}</h2>
     <p>No tienes películas favoritas aún.</p>`;
    return;
  }

  const moviesHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <div class="card bg-dark text-white">
          <button aria-label=Borrar ${movie.title} de favoritos" id="fav-btn-${movie.id}" class="fav-btn btn btn-danger position-absolute top-10 end-0 mt-2 me-2 fs-5" onclick="removeMovieFromFavs(${movie.id})">X</button>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h3 class="card-title fs-5">
              <a href="#" class="text-white text-decoration-none">
                ${movie.title}
              </a>
            </h3>
            <p class="card-text"><span aria-label="Puntuación" role="img">⭐</span> ${movie.vote_average} | 
               <span aria-label="Fecha de salida" role="img">📅</span> ${movie.release_date}</p>
          </div>
        </div>
      </div>`
    )
    .join("");

  container.innerHTML = `
    <h2 class="text-start text-danger mb-4">${title}</h2>
    <div class="favorites-slider">${moviesHTML}</div>
  `;
};

const removeMovieFromFavs = (movieId) => {
  let favoriteIds = getFavorites();
  favoriteIds = favoriteIds.filter((id) => id !== movieId);
  setFavorites(favoriteIds);

  renderFavorites();
};

const renderFavorites = async () => {
  const favoriteMovies = await fetchFavoriteMovies();
  renderMovies(favoriteMovies, "favorites-container", "Tus películas favoritas");
};

document.addEventListener("DOMContentLoaded", renderFavorites);
