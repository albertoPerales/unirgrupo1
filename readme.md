# 🚀 Grupo 1: Creando una web app funcional.

Este proyecto ha sido desarrollado como parte de la asignatura **Desarrollo Web Responsive** del **Máster en Diseño y Desarrollo de Interfaces Web**.
**URL al repositorio:** https://github.com/albertoPerales/unirgrupo1

## ❗ A considerar

En cuanto a la gestión de la sesión de inicio de sesión, se ha decidido que el botón de cerrar sesión no elimine la sesión por completo, sino que simplemente modifique su parámetro logged_in, el cual indica si el usuario está autenticado o no. Esta decisión se tomó porque, al eliminar la sesión, el registro perdía sentido, ya que siempre se eliminaba.

Con este cambio, se ha habilitado la funcionalidad de registro, que permite dar de alta a un usuario y loguearlo automáticamente. Los datos del usuario se almacenan en la sesión, simulando una base de datos. El control del inicio de sesión se gestiona mediante el parámetro logged_in.

No obstante, para mantener la funcionalidad requerida de eliminación total de la sesión, se ha añadido una opción de "Borrar cuenta", que elimina definitivamente al usuario de la sesión.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Slick.js

## 👥 Integrantes del grupo

- Alberto Perales Lafuente
- Nazek Koshaji Loubani
- Annie Molina Alarcón
- Irene Rando Mateo
- Beatriz Sordo Veci

## 📌 Metodología de Trabajo

Para optimizar el desarrollo del proyecto, la división de tareas entre los integrantes del grupo se realizó siguiendo estos criterios:

- Disponibilidad de tiempo de cada miembro.
- Intereses personales, priorizando aquellas partes que cada integrante quería reforzar.

### Convención de Commits

Para simular un entorno de trabajo real, a libertad individual se ha tratado de implementar la metodología **Conventional Commits**. Esta práctica nos permite identificar de forma más sencilla los cambios realizados por cada miembro del equipo, así como entender rápidamente el propósito de cada commit.

El formato seguido es el siguiente:

```plaintext
🔹 type(scope): description
```
