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

/* marcadores de rondas */
let userScore = 0;
let compScore = 0;
let romScore = 0;
let empScore = 0;

const userScoreSpam = document.getElementById("user-score");
const compScoreSpam = document.getElementById("comp-score");
const romScoreSpam = document.getElementById("rom-score");
const empScoreSpam = document.getElementById("emp-score");

/* btn opciones de jugabilidad */
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

/* function localStorage() {} */

function getComputerChoice() {
  const choices = [`rock`, `paper`, `scissors`];
  const randomNumber = Math.floor(Math.random() * 3);

  return choices[randomNumber];
}

function covertEmoji(choice) {
  if (choice === `rock`) return `🪨 Piedra`;
  if (choice === `paper`) return `📄 Papel`;
  return `✂️ Tijera`;
}

function win(userChoice, computerChoice) {
  userScore++;
  romScore++;
  romScoreSpam.innerHTML = romScore;
  userScoreSpam.innerHTML = userScore;
  resultMessage.innerHTML = `${covertEmoji(userChoice)} le gana a ${covertEmoji(
    computerChoice
  )}. ¡Ganaste! 🎉`;
  document.getElementById(userChoice).classList.add("green-glow");
  setTimeout(
    () => document.getElementById(userChoice).classList.remove("green-glow"),
    500
  );
}

function lose(userChoice, computerChoice) {
  compScore++;
  romScore++;
  romScoreSpam.innerHTML = romScore;
  compScoreSpam.innerHTML = compScore;
  resultMessage.innerHTML = `${covertEmoji(
    computerChoice
  )} le gana a ${covertEmoji(userChoice)}. Perdiste. 😭`;
  document.getElementById(userChoice).classList.add("red-glow");
  setTimeout(
    () => document.getElementById(userChoice).classList.remove("red-glow"),
    500
  );
}

function draw(userChoice, computerChoice) {
  romScore++;
  empScore++;
  romScoreSpam.innerHTML = romScore;
  empScoreSpam.innerHTML = empScore;
  resultMessage.innerHTML = `${covertEmoji(
    userChoice
  )} es igual a ${covertEmoji(computerChoice)}. ¡Empate! 🤝`;
  document.getElementById(userChoice).classList.add("gray-glow");
  setTimeout(
    () => document.getElementById(userChoice).classList.remove("gray-glow"),
    500
  );
}

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win(userChoice, computerChoice);
      break;
    case "scissorsrock":
    case "rockpaper":
    case "paperscissors":
      lose(userChoice, computerChoice);
      break;
    default:
      draw(userChoice, computerChoice);
      break;
  }
}
