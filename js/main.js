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

/* marcadores de rondas
 */
let userScore = 0;
let compScore = 0;
let romScore = 0;
let empScore = 0;

const userScoreSpam = document.getElementById("user-score");
const compScoreSpam = document.getElementById("comp-score");
const romScoreSpam = document.getElementById("rom-score");
const empScoreSpam = document.getElementById("emp-score");

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
  romScore++;

  if (userChoice === computerChoice) {
    empScore++;
    romScoreSpam.innerHTML = romScore;
    empScoreSpam.innerHTML = empScore;
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
    userScore++;
    romScoreSpam.innerHTML = romScore;
    userScoreSpam.innerHTML = userScore;
    resultMessage.innerHTML = `${covertEmoji(
      userChoice
    )} le gana a ${covertEmoji(computerChoice)}. Gansates. 🎉`;
    return `Ganaste`;
  } else {
    compScore++;
    romScoreSpam.innerHTML = romScore;
    compScoreSpam.innerHTML = compScore;
    resultMessage.innerHTML = `${covertEmoji(
      computerChoice
    )} le gana a ${covertEmoji(userChoice)}. Perdiste. 😭`;
    return `Perdiste`;
  }
}

/**
 * Añade una nueva fila de datos a la tabla de estadísticas del juego.
 *
 * @param {string} userChoice La opción seleccionada por el usuario.
 * @param {string} computerChoice La opción seleccionada por la computadora.
 */
function updateTabla(resul, userChoice, computerChoice) {
  const table = document.getElementById("table");

  if (!table) {
    console.error("Error: No se encontró el elemento con ID 'tabla'.");
    return;
  }

  setTimeout(() => {
    let marcador = document.getElementById(`${romScore}`);
    marcador.classList.add(`text-orange-500`);
  }, 100);

  let newRow = document.createElement("tr");

  newRow.innerHTML = `<td id="${romScore}">${romScore}</td>
                     <td>${userChoice}</td>
                     <td>${computerChoice}</td>
                     <td class="${resul}">${resul}</td>`;
  table.appendChild(newRow);

  let ganadores = document.querySelectorAll(".Ganaste");
  let perdedores = document.querySelectorAll(".Perdiste");
  let empates = document.querySelectorAll(".Empate");

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
 *funcion encargada de inicar el juego
 *
 * @param {*} userChoice //juada dada por el usurio al interactuar con el btn en el HTML
 */
function playGame(userChoice) {
  const computerChoice = getComputerChoice();

  let result = win(userChoice, computerChoice);

  updateTabla(result, traductor(userChoice), traductor(computerChoice));
}
