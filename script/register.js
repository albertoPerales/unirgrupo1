document.addEventListener("DOMContentLoaded", () => {
  const usuarioSesion = sessionStorage.getItem("usuario");
  let usuario = JSON.parse(usuarioSesion);

  if (usuario?.logged_in) location.href = "../index.html";
});

const validacion = () => {
  const input_email = document.getElementById("email");
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex_email.test(input_email.value)) {
    input_email.setCustomValidity("Email inválido");
  } else {
    input_email.setCustomValidity("");
  }
};

const envioformulario = () => {
  const formulario = document.getElementById("userinfo");
  validacion();

  if (formulario.checkValidity()) {
    const datosUsuario = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      nombreuser: document.getElementById("nombreuser").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      logged_in: true,
    };

    sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));
    alert("Inicio de sesión correcto");
    location.href = "../index.html";
  } else {
    alert("Error en el formulario");
  }
};

document.getElementById("send").addEventListener("click", envioformulario);
