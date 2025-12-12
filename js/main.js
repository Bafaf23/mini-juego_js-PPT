/**
 * Crear un juego de piedra, papel o tijeras con interfaz gráfica usando
 * HTML, CSS (TailwindCSS, SASS, etc.) y JavaScript.
 *
 * La partida debe permitir al usuario seleccionar una de las tres opciones
 * (piedra, papel o tijeras) mediante botones o imágenes.
 *
 * La computadora debe seleccionar aleatoriamente una de las tres opciones.
 *
 * La interfaz debe mostrar el resultado de cada ronda (ganador, perdedor o empate)
 * y llevar un registro de las siguientes estadísticas:
 * - Número total de rondas jugadas.
 * - Número de victorias del usuario.
 * - Número de victorias de la computadora.
 * - Número de empates.
 * - Registro de las últimas 5 rondas jugadas (opciones seleccionadas por el usuario y la computadora).
 *
 * Las estadísticas deben actualizarse dinámicamente en la interfaz después de cada ronda y ser
 * accesibles para el usuario en todo momento, incluso cuaando este recarga la página
 * (o cierra y vuelve a abrir el navegador).
 *
 * Incluir un botón para reiniciar las estadísticas y comenzar una nueva partida.
 *
 * El código debe estar documentado utilizando JSDoc.
 *
 * Opcional: Agregar modo claro/oscuro para la interfaz del juego con persistencia de la preferencia
 * del usuario utilizando almacenamiento local (localStorage).
 *
 * 2025/12/12
 */

/* displayMensaje */
const resultMessage = document.getElementById("result-message");

const userScoreSpam = document.getElementById("user-score");
const compScoreSpam = document.getElementById("comp-score");
const romScoreSpam = document.getElementById("rom-score");
const empScoreSpam = document.getElementById("emp-score");

/**
 * Define las claves de almacenamiento local para evitar errores de escritura.
 * ESTO FALTABA EN TU CÓDIGO ANTERIOR Y HACÍA QUE FALLARA.
 */
const STORAGE_KEYS = {
  STATS: "juegoEstadisticas",
  HISTORY: "historialJuego",
  THEME: "themePreference",
};

/**
 * Objeto que mantiene el estado actual del juego.
 * Se inicializa con valores por defecto que se sobrescribirán desde localStorage.
 */

let gameState = {
  userScore: 0,
  compScore: 0,
  romScore: 0,
  empScore: 0,
  history: [],
};

/**
 * Jugada de de la computadora
 *
 *@returns {number}
 */
function getComputerChoice() {
  const choices = [`rock`, `paper`, `scissors`];
  const randomNumber = Math.floor(Math.random() * 3);

  return choices[randomNumber];
}

/**
 * Coonvierte el movimineto es un emoji
 *
 * @param {string} choice
 * @returns {string}
 */
function covertEmoji(choice) {
  if (choice === `rock`) return `🪨 Piedra`;
  if (choice === `paper`) return `📄 Papel`;
  return `✂️ Tijera`;
}

/**
 *determina al ganador
 *
 * @param {*} userChoice
 * @param {*} computerChoice
 */

function win(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    resultMessage.innerHTML = `${covertEmoji(
      userChoice
    )} es igual a ${covertEmoji(computerChoice)}. ¡Empate! 🤝`;

    return `Empate`;
  }

  if (
    (userChoice === `rock` && computerChoice === `scissors`) ||
    (userChoice === `paper` && computerChoice === `rock`) ||
    (userChoice === `scissors` && computerChoice === `paper`)
  ) {
    resultMessage.innerHTML = `${covertEmoji(
      userChoice
    )} le gana a ${covertEmoji(computerChoice)}. Gansates. 🎉`;
    return `Ganaste`;
  } else {
    resultMessage.innerHTML = `${covertEmoji(
      computerChoice
    )} le gana a ${covertEmoji(userChoice)}. Perdiste. 😭`;
    return `Perdiste`;
  }
}
/**
 * Función encargada de actualizar visualmente el marcador en el DOM.
 */
function updateMarcadores() {
  userScoreSpam.innerHTML = gameState.userScore;
  compScoreSpam.innerHTML = gameState.compScore;
  romScoreSpam.innerHTML = gameState.romScore;
  empScoreSpam.innerHTML = gameState.empScore;
}
/**
 * Añade una nueva fila de datos a la tabla de estadísticas del juego.
 *
 * @param {string} userChoice La opción seleccionada por el usuario.
 * @param {string} computerChoice La opción seleccionada por la computadora.
 */
function updateTabla() {
  const table = document.getElementById("table");

  const lastFive = gameState.history.slice(-5);

  table.innerHTML = "";

  lastFive.reverse().forEach((partida) => {
    let newRow = document.createElement("tr");

    newRow.innerHTML = `<td id="${partida.id}" class="rond">${partida.ronda}</td>
                     <td>${partida.movimiento1}</td>
                     <td>${partida.movimiento2}</td>
                     <td class="${partida.resultado}">${partida.resultado}</td>`;
    table.appendChild(newRow);
  });

  let ganadores = document.querySelectorAll(".Ganaste");
  let perdedores = document.querySelectorAll(".Perdiste");
  let empates = document.querySelectorAll(".Empate");
  let rondas = document.querySelectorAll(".rond");

  rondas.forEach((ronda) => {
    ronda.classList.add("text-orange-500", "font-bold");
  });

  empates.forEach((empate) => {
    empate.classList.add("text-purple-600", "font-bold");
  });

  ganadores.forEach((ganador) => {
    ganador.classList.add("text-green-500", "font-bold");
  });

  perdedores.forEach((perdedor) => {
    perdedor.classList.add("text-red-500", "font-bold");
  });
}
/**
 * funcion encargada de traducir al espanol el movimiento
 *
 * @param {string} computerChoice
 * @param {string} userChoice
 * @returns {string}
 */
function traductor(userChoice, computerChoice) {
  if (userChoice == `scissors`) return `Tijeras`;
  if (userChoice == `paper`) return `Papel`;
  if (userChoice == `rock`) return `Piedra`;

  if (computerChoice == `scissors`) return `Tijeras`;
  if (computerChoice == `paper`) return `Papel`;
  if (computerChoice == `rock`) return `Piedra`;
}
/**
 * funcion para guardar el historial de juego
 */
function salveData() {
  localStorage.setItem(
    STORAGE_KEYS.STATS,
    JSON.stringify({
      userScore: gameState.userScore,
      compScore: gameState.compScore,
      romScore: gameState.romScore,
      empScore: gameState.empScore,
    })
  );
  // Guardar historial (array)
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(gameState.history));
  console.log(`Estado del juego guardado en localStorage ✅`);
}

/**
 * Carga el estado completo del juego desde localStorage al iniciar la página.
 */
function loadGameState() {
  const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
  const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);

  if (savedStats) {
    const stats = JSON.parse(savedStats);
    Object.assign(gameState, stats); // Sobrescribe las propiedades por defecto
  }

  if (savedHistory) {
    gameState.history = JSON.parse(savedHistory);
  }

  // Actualizar la interfaz con los datos cargados
  updateTabla();
  updateMarcadores();
}

/**
 *funcion encargada de inicar el juego
 *
 * @param {*} userChoice //juada dada por el usurio al interactuar con el btn en el HTML
 */
function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = win(userChoice, computerChoice);

  gameState.romScore++;
  if (result === `Ganaste`) {
    gameState.userScore++;
  } else if (result === `Perdiste`) {
    gameState.compScore++;
  } else {
    gameState.empScore++;
  }

  const newRoundData = {
    resultado: result,
    movimiento1: covertEmoji(userChoice),
    movimiento2: covertEmoji(computerChoice),
    ronda: gameState.romScore,
    id: Date.now(), // ID único para la entrada
  };

  gameState.history.push(newRoundData);
  salveData();

  updateMarcadores();
  updateTabla();
}

// Carga el estado guardado cuando el script se ejecuta inicialmente
document.addEventListener("DOMContentLoaded", (event) => {
  loadGameState();
});

let btnR = document.getElementById("reiniciar");

btnR.addEventListener(`click`, () => {
  // Restablecer el estado en memoria a valores por defecto
  gameState = {
    userScore: 0,
    compScore: 0,
    romScore: 0,
    empScore: 0,
    history: [],
  };
  // Limpiar TODAS las claves relevantes de localStorage (corregido para usar STORAGE_KEYS)
  localStorage.removeItem(STORAGE_KEYS.STATS);
  localStorage.removeItem(STORAGE_KEYS.HISTORY);

  // Actualizar UI
  updateMarcadores();
  updateTabla();
  resultMessage.innerHTML = "Estadísticas reiniciadas. ¡Empieza de nuevo!";
});
