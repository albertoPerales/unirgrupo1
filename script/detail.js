const API_KEY = "b89b1e1077ca792380cfdc3b05ff9966";
const BASE_URL = "https://api.themoviedb.org/3";
const title = document.querySelector(".title-content");
const info = document.querySelector(".synopsis");
const poster = document.querySelector(".poster-content");
const masinfo = document.querySelector(".card-body");
const url = new URL(window.location.href);
// const ident=url.searchParams.get('id');
let ident = 539972;

const peli = (infopeli) => {
  //se busca el índice de la película en cuestión
  let index = -1;
  do {
    index++;
  } while (ident !== infopeli.results[index].id);
  const result = infopeli.results[index];
  //se crea el título
  const movietitle = document.createElement("h1");
  movietitle.classList.add("movie-title");
  movietitle.textContent = result.title;
  title.append(movietitle);
  //se crea la imagen
  const movieimg = document.createElement("img");
  movieimg.classList.add("movie-img");
  movieimg.src = "https://image.tmdb.org/t/p/w500" + result.poster_path;
  movieimg.alt = result.title;
  poster.append(movieimg);
  //se crea la sinopsis y valoración
  const movieinfo = document.createElement("p");
  movieinfo.textContent = result.overview;
  movieinfo.classList.add("movieinfo");
  const valoracion = document.createElement("p");
  valoracion.innerHTML = `Valoración: ⭐<b>${result.vote_average}</b> (votos: ${result.vote_count})`;
  info.append(movieinfo);
  info.append(valoracion);
  //se crea la información extra
  masinfo.innerHTML = `Idioma original: ${result.original_language}<br>Fecha de estreno: ${result.release_date}`;
};

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`)
    .then((res) => res.json())
    .then((infopeli) => {
      peli(infopeli);
    });
});
