const title = document.querySelector(".title-content");
const info = document.querySelector(".synopsis");
const poster = document.querySelector(".poster-content");
const masinfo = document.querySelector(".card-body");
const content = document.querySelector("#main-content");
const urlParams = new URLSearchParams(window.location.search);
const ident = urlParams.get("id");

//indice del vídeo a mostrar
let indice = 0;

//info de la peli
const peli = (infopeli) => {
  //se crea el título
  const movietitle = document.createElement("h1");
  movietitle.classList.add("movie-title");
  movietitle.textContent = infopeli.title;
  title.append(movietitle);
  //se crea la imagen
  const movieimg = document.createElement("img");
  movieimg.classList.add("movie-img");
  movieimg.src = "https://image.tmdb.org/t/p/w500" + infopeli.poster_path;
  movieimg.alt = infopeli.name;
  poster.append(movieimg);
  //se crea la sinopsis y valoración
  const movieinfo = document.createElement("p");
  movieinfo.textContent = infopeli.overview;
  movieinfo.classList.add("movieinfo");
  const valoracion = document.createElement("p");
  valoracion.innerHTML = `Valoración: ⭐<b>${
    infopeli.vote_average
  }</b> (votos: ${infopeli.vote_count})<br>
  Géneros: ${mostrartodo(infopeli.genres, "name")}<br>Fecha de estreno: ${
    infopeli.release_date
  }<br>Estado: ${infopeli.status}<br>
  Idiomas hablados: ${mostrartodo(infopeli.spoken_languages, "english_name")}`;
  info.append(movieinfo);
  info.append(valoracion);
  //se crea la información extra
  masinfo.innerHTML = `Idioma original: ${
    infopeli.original_language
  } <br>Presupuesto: $${infopeli.budget}
  <br>Ingresos: $${infopeli.revenue} <br>Productoras: ${mostrartodo(
    infopeli.production_companies,
    "name"
  )}<br>Paises: ${mostrartodo(infopeli.production_countries, "name")}`;
  //se crea la galería multimedia
  fetch(
    `${BASE_URL}/movie/${ident}/videos?api_key=${API_KEY}&language=es-ES&page=1`
  )
    .then((res) => res.json())
    .then((infovideo) => {
      videos(infovideo);
    });
};

const mostrartodo = (datapeli, category) => {
  return datapeli.map((elemento) => elemento[category]).join(", ");
};

//galería de videos de la peli
const videos = (infovideo) => {
  mostrarvideo(infovideo);
  infovideo.results.forEach((element, index) => {
    const opcion = document.createElement("li");
    const menu = document.querySelector(".dropdown-menu");
    opcion.innerHTML = `<a class="dropdown-item">${element.name}</a>`;
    menu.append(opcion);
    opcion.addEventListener("click", (evento) => {
      indice = index;
      mostrarvideo(infovideo);
    });
  });
};

const mostrarvideo = (infovideo) => {
  const videos = document.querySelector(".video");
  videos.innerHTML = `<h2>Vídeos</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/${infovideo.results[indice].key}" 
title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
};

document.addEventListener("DOMContentLoaded", async () => {
  const infopeli = await fetchMovieById(ident);
  peli(infopeli);
});
