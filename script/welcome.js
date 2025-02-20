const usuarioSesion = sessionStorage.getItem("usuario");
let usuario = JSON.parse(usuarioSesion);

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginInfo");

  if (usuario?.logged_in) {
    loginButton.classList.add("d-none");

    const navList = document.getElementById("navList");
    navList.insertAdjacentHTML(
      `beforeend`,
      ` 
      <li class="nav-item">
            <div class="botones nav-link  d-flex mt-2" style="gap:10px">
          <button id="logout" class="btn btn-danger btn-sm">Cerrar sesión</button>
          <button id="deleteAccount" class="btn btn-outline-warning btn-sm">Borrar cuenta</button>
        </div>
        </li>
      
      <li class="nav-item">  <div id="sesion-iniciada" class="nav-link hidden bg-light badge rounded-3 shadow">
        <div class="d-flex flex-row align-items-center">
          <span id="username-display" class="fw-bold text-dark"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="text-white" class="icon bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
        </div>
  
      </div></li>`
    );

    document.getElementById(
      "username-display"
    ).textContent = `Bienvenid@, ${usuario.nombreuser}`;
    const logoutBtn = document.getElementById("logout");
    const deleteAccountBtn = document.getElementById("deleteAccount");
    logoutBtn.addEventListener("click", () => {
      usuario.logged_in = false;
      console.log("Final user", usuario);
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      location.reload();
    });
    deleteAccount.addEventListener("click", () => {
      sessionStorage.removeItem("usuario");
      location.reload();
    });
  } else {
    loginButton.classList.remove("d-none");
  }
});
