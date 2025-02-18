document.addEventListener("DOMContentLoaded", () => {

    const API_KEY = "b89b1e1077ca792380cfdc3b05ff9966";
    const BASE_URL = "https://api.themoviedb.org/3";

    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const ratingValue = document.getElementById('ratingValue');
    const searchButton = document.getElementById('searchButton');
    const moviesContainer = document.getElementById('moviesContainer');

    // Cargar géneros desde API y añadir al dropdown
    async function loadGenres() {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es`);
        const data = await response.json();

        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreFilter.appendChild(option);
        });
    }

    // Buscar películas
    async function searchMovies() {
        const query = searchInput.value.trim();
        const genre = genreFilter.value;
        const rating = ratingFilter.value;

        localStorage.setItem('lastSearch', JSON.stringify({ query, genre, rating }));

        let url = "";

        if (query) {
            // Búsqueda por título
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es`;
            if (genre) url += `&with_genres=${genre}`;
        } else {
            // Si no hay titulo busqueda por genero y calificación minima
            url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es`;
            if (genre) url += `&with_genres=${genre}`;
            url += `&vote_average.gte=${rating}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            const filteredMovies = data.results.filter(movie => movie.vote_average >= rating);

            displayMovies(filteredMovies);
        } catch (error) {
            console.error("Error en la búsqueda de películas:", error);
        }
    }

    // Mostrar películas
    function displayMovies(movies) {
        moviesContainer.innerHTML = ''; // Limpiar resultados anteriores

        if (movies.length === 0) {
            moviesContainer.innerHTML = '<p class="text-center">No se encontraron películas.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('col-md-3', 'mb-4');

            movieCard.innerHTML = `
            <div class="movie-card">
      <div class="card bg-dark text-white">
        <button id="fav-btn-${movie.id}" class="fav-btn btn btn-warning position-absolute top-10 end-0 mt-2 me-2 fs-5" onclick="toggleFavorite(${movie.id})">☆</button>
        <a href="./views/detail.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="">
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
    </div>`;
            moviesContainer.appendChild(movieCard);
        });
    }

    // Actualizar slider en tiempo real
    ratingFilter.addEventListener('input', () => {
        ratingValue.textContent = ratingFilter.value;
    });

    // Búsqueda
    searchButton.addEventListener('click', searchMovies);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchMovies();
    });

    // Carga de géneros
    loadGenres();

    //Añade/Elimina favoritos
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
});
