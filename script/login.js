const envioformulario = () => {
  const formulario = document.getElementById("userinfo");

  if (formulario.checkValidity()) {
    const usuarioSesion = sessionStorage.getItem("usuario");
    let usuario = JSON.parse(usuarioSesion);

    const storagedUserInfo = {
      nombreusuario: usuario.nombreuser,
      password: usuario.password,
    };
    const datosUsuario = {
      nombreusuario: document.getElementById("nombreusuario").value,
      password: document.getElementById("password").value,
    };

    if (JSON.stringify(storagedUserInfo) === JSON.stringify(datosUsuario)) {
      usuario.logged_in = true;
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      alert("Inicio de sesión correcto");
      location.href = "../index.html";
    } else {
      alert("Usuario no encontrado")
    }
  } else {
    alert("Error en el formulario");
  }
};

document.getElementById("send").addEventListener("click", envioformulario);
