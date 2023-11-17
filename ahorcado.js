// Inicialización de variables
let vidasRestantes = 6;
const imagenAhorcado = document
  .getElementById("imagenAhorcado")
  .getElementsByTagName("img")[0]; // Obtener la etiqueta de imagen
const intentosRestantes = document.getElementById("intentos");
const letrasDePalabraContainer = document.getElementById("letrasDePalabra");
const letrasContainer = document.getElementById("letras");
const botonReiniciar = document.getElementById("reiniciar");

// Inicialización del juego

var palabraElegida = "";
var imagenes = [
  "src/img/inicio.png",
  "src/img/cabeza.png",
  "src/img/cuerpo.png",
  "src/img/brazo-derecho.png",
  "src/img/brazo-izquierdo.png",
  "src/img/pierna-derecha.png",
  "src/img/pierna-izquierda.png",
];
// Función para inicializar las letras de la palabra
function letrasDePalabra() {
  for (let i = 0; i < palabraElegida.length; i++) {
    const letraPalabra = document.createElement("div");
    letraPalabra.setAttribute("class", "letraPalabra");
    letrasDePalabraContainer.appendChild(letraPalabra);
  }
}

function actualizarImagenAhorcado() {
  // Calcular el índice de la imagen según los intentos restantes
  const indiceImagen = imagenes.length - vidasRestantes;

  // Verificar si hay una imagen disponible para mostrar
  if (indiceImagen >= 0 && indiceImagen < imagenes.length) {
    // Actualizar la ruta de la imagen
    imagenAhorcado.src = imagenes[indiceImagen - 1];
  }
}

// Función para mostrar las letras en pantalla
function mostrarLetrasEnPantalla(letra, botonLetra) {
  const letrasPalabra = document.getElementsByClassName("letraPalabra");
  for (let i = 0; i < palabraElegida.length; i++) {
    if (palabraElegida[i] === letra) {
      letrasPalabra[i].textContent = letra;
    }
  }
  // Verificar si se ganó el juego
  if (esGanador()) {
    setTimeout(function () {
      alert("¡Felicidades! ¡Has ganado!");
    }, 200);
    deshabilitarBotones();
    botonLetra.style.backgroundColor = "gray";
  }
}

function deshabilitarBotones() {
  const botones = document.getElementsByClassName("letraBoton");
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    botones[i].style.backgroundColor = "gray";
  }
}

// Función para actualizar las vidas restantes
function actualizarVidasRestantes() {
  vidasRestantes--;
  actualizarImagenAhorcado();
  intentosRestantes.textContent = vidasRestantes;
  // Verificar si se perdió el juego
  if (vidasRestantes === 0) {
    imagenAhorcado.src = imagenes[6];
    setTimeout(function () {
      alert("¡Oh no! ¡Has perdido! La palabra era: " + palabraElegida);
    }, 200); // Agrega un pequeño retraso de 100 milisegundos (ajusta según sea necesario)
  }
}

// Función para manejar la lógica cuando se presiona una letra
function letraPresionada(letra) {
  if (vidasRestantes > 0) {
    if (palabraElegida.includes(letra)) {
      mostrarLetrasEnPantalla(letra);
    } else {
      actualizarVidasRestantes();
    }
  }
}

// Función para verificar si se ha ganado el juego
function esGanador() {
  const letrasPalabra = document.getElementsByClassName("letraPalabra");
  for (let i = 0; i < letrasPalabra.length; i++) {
    if (letrasPalabra[i].textContent !== palabraElegida[i]) {
      return false;
    }
  }
  return true;
}

// Función para reiniciar el juego
function reiniciarJuego() {
  location.reload(); // Recargar la página
}

// Evento de clic para el botón de reiniciar
botonReiniciar.addEventListener("click", reiniciarJuego);

function mostrarLetrasSeleccionables() {
  const letrasAbecedario = "AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚVWXYZ";
  for (let letra of letrasAbecedario) {
    const botonLetra = document.createElement("button");
    botonLetra.setAttribute("class", "letraBoton");
    botonLetra.textContent = letra;
    // Agregar el evento clic al elemento
    botonLetra.addEventListener("click", function () {
      // Deshabilitar el botón al hacer clic
      botonLetra.disabled = true;
      botonLetra.style.backgroundColor = "gray";
      letraPresionada(letra, botonLetra);
    });
    letrasContainer.appendChild(botonLetra);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Palabra a adivinar
  do {
    palabraElegida = prompt(
      "Ingrese la palabra a adivinar (No se aceptan espacios)"
    );
  } while (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/.test(palabraElegida) || palabraElegida.trim() === "");

  palabraElegida = palabraElegida.toUpperCase();
  letrasDePalabra();
  mostrarLetrasSeleccionables();
});
