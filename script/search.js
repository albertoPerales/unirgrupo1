document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "e1b30c5a1159eac9aba1451ae43c7368";
  const BASE_URL = "https://api.themoviedb.org/3";

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const voteAverageFilter = document.getElementById("voteAverageFilter");
  const voteValue = document.getElementById("voteValue");
  const yearFilter = document.getElementById("yearFilter");
  const moviesContainer = document.getElementById("moviesContainer");
  const resultsCount = document.getElementById("resultsCount");

  voteAverageFilter.addEventListener("input", () => {
    voteValue.textContent = voteAverageFilter.value;
  });

  async function searchMovies() {
    const query = searchInput.value.trim();
    const minVote = parseFloat(voteAverageFilter.value);

    if (!query) {
      resultsCount.textContent = "Por favor, introduce un título.";
      return;
    }

    let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es&query=${query}`;
    if (yearFilter.value) {
      url += `&primary_release_year=${yearFilter.value}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error en la API");

      const data = await response.json();
      let movies = data.results || [];

      if (movies.length === 0) {
        resultsCount.textContent =
          "No se encontraron películas con los filtros seleccionados.";
        moviesContainer.innerHTML = "";
        return;
      }

      if (minVote) {
        movies = movies.filter((movie) => movie?.vote_average >= minVote);
      }
      resultsCount.textContent = `Mostrando ${movies.length} películas`;

      displayMovies(movies);
    } catch (error) {
      resultsCount.textContent = "Error al obtener películas.";
    }
  }

  function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("col-md-3", "mb-4");
      movieCard.innerHTML = `
        <div class="card bg-dark text-white">
          <a href="./detail.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          </a>
          <div class="card-body">
            <h2 class="card-title fs-5">${movie.title}</h2>
            <p class="card-text">⭐ ${movie.vote_average} | 📅 ${movie.release_date}</p>
          </div>
        </div>`;
      moviesContainer.appendChild(movieCard);
    });
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchMovies();
  });
});
