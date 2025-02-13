const API_KEY = "b89b1e1077ca792380cfdc3b05ff9966";
const BASE_URL = "https://api.themoviedb.org/3";

// POPULARES
fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results
      .map(
        (movie) => `
      <div class="movie-card">
        <div class="card bg-dark text-white">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">⭐ ${movie.vote_average} | 📅 ${movie.release_date}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    document.getElementById("popular-content").innerHTML = `
      <h2 class="text-start text-danger mb-4">Películas Populares</h2>
      <div class="movie-slider1">${movies}</div>
    `;

    $(".movie-slider1").slick({
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
  })
  .catch((error) => console.error("Error al obtener las películas:", error));

// TRENDING
fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES&page=1`)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results
      .map(
        (movie) => `
      <div class="movie-card">
        <div class="card bg-dark text-white">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">⭐ ${movie.vote_average} | 📅 ${movie.release_date}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    document.getElementById("trending").innerHTML = `
      <h2 class="text-start text-danger mb-4">Películas del Día</h2>
      <div class="movie-slider2">${movies}</div>
    `;

    $(".movie-slider2").slick({
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
  })
  .catch((error) => console.error("Error al obtener las películas:", error));

// TOP
fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results
      .map(
        (movie) => `
      <div class="movie-card">
        <div class="card bg-dark text-white">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">⭐ ${movie.vote_average} | 📅 ${movie.release_date}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    document.getElementById("top-rated-content").innerHTML = `
      <h2 class="text-start text-danger mb-4">Películas Top</h2>
      <div class="movie-slider3">${movies}</div>
    `;

    $(".movie-slider3").slick({
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
  })
  .catch((error) => console.error("Error al obtener las películas:", error));
