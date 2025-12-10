// js/dark.js version final y robusta

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Script dark.js cargado y DOM listo.");

  // 1. Obtener referencias a los elementos del DOM
  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  var themeToggleBtn = document.getElementById("theme-toggle");

  if (!themeToggleBtn || !themeToggleDarkIcon || !themeToggleLightIcon) {
    console.error(
      "Error: Faltan IDs necesarios para el botón de tema en el HTML."
    );
    return;
  }

  // Función para aplicar el tema y guardar la preferencia
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      themeToggleLightIcon.classList.remove("hidden");
      themeToggleDarkIcon.classList.add("hidden");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleDarkIcon.classList.remove("hidden");
      themeToggleLightIcon.classList.add("hidden");
      localStorage.setItem("color-theme", "light");
    }
  }

  // Función para inicializar el tema al cargar la página (LA CLAVE ESTÁ AQUÍ)
  function initializeTheme() {
    document.documentElement.classList.remove("dark"); // Limpiamos la clase inicial por si acaso

    const savedTheme = localStorage.getItem("color-theme");

    if (savedTheme) {
      // PRIMERO: Si hay un tema guardado manualmente, usar ESE.
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // SEGUNDO: Si no hay guardado, usar la preferencia del sistema operativo.
      applyTheme("dark");
    } else {
      // TERCERO: Por defecto, claro.
      applyTheme("light");
    }
  }

  // 2. Inicializar el tema al cargar la página
  initializeTheme();

  // 3. Manejar el evento de clic en el botón (Guarda la preferencia del usuario)
  themeToggleBtn.addEventListener("click", function () {
    if (document.documentElement.classList.contains("dark")) {
      applyTheme("light"); // Esto guarda "light" en localStorage
    } else {
      applyTheme("dark"); // Esto guarda "dark" en localStorage
    }
  });
});
