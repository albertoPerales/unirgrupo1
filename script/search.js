document.addEventListener("DOMContentLoaded", () => {
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
      movieCard.innerHTML = renderMovie(movie, "second");
      moviesContainer.appendChild(movieCard);
      updateFavoriteButton(movie.id);
    });
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchMovies();
  });
});
