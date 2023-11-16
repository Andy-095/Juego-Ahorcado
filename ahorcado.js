document.addEventListener("DOMContentLoaded", function () {
  // Palabra a adivinar
  const palabraElegida = prompt(
    "Ingrese la palabra a adivinar *NO SE ACEPTAN NUMEROS*"
  ); // Puedes cambiar la palabra a adivinar

  // Inicialización de variables
  let vidasRestantes = 6;
  const intentosRestantes = document.getElementById("intentos");
  const letrasDePalabraContainer = document.getElementById("letrasDePalabra");
  const letrasContainer = document.getElementById("letras");
  const botonReiniciar = document.getElementById("reiniciar");

  // Inicialización del juego
  letrasDePalabra();
  mostrarLetrasSeleccionables();

  // Función para inicializar las letras de la palabra
  function letrasDePalabra() {
    for (let i = 0; i < palabraElegida.length; i++) {
      const letraPalabra = document.createElement("div");
      letraPalabra.setAttribute("class", "letraPalabra");
      letrasDePalabraContainer.appendChild(letraPalabra);
    }
  }

  // Función para mostrar las letras en pantalla
  function mostrarLetrasEnPantalla(letra) {
    const letrasPalabra = document.getElementsByClassName("letraPalabra");
    for (let i = 0; i < palabraElegida.length; i++) {
      if (palabraElegida[i] === letra) {
        letrasPalabra[i].textContent = letra;
      }
    }
  }

  // Función para actualizar las vidas restantes
  function actualizarVidasRestantes() {
    vidasRestantes--;
    intentosRestantes.textContent = vidasRestantes;
  }

  // Función para manejar la lógica cuando se presiona una letra
  function letraPresionada(letra) {
    if (vidasRestantes > 0) {
      if (palabraElegida.includes(letra)) {
        mostrarLetrasEnPantalla(letra);
      } else {
        actualizarVidasRestantes();
      }
      // Verificar si se ganó el juego
      if (esGanador()) {
        alert("¡Felicidades! ¡Has ganado!");
        reiniciarJuego();
      }
      // Verificar si se perdió el juego
      if (vidasRestantes === 0) {
        alert("¡Oh no! ¡Has perdido! La palabra era: " + palabraElegida);
        reiniciarJuego();
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
    vidasRestantes = 6;
    intentosRestantes.textContent = vidasRestantes;
    letrasDePalabraContainer.innerHTML = "";
    letrasDePalabra();
  }

  // Evento de clic para el botón de reiniciar
  botonReiniciar.addEventListener("click", function () {
    reiniciarJuego();
  });

  // Evento de clic para las letras
  letrasContainer.addEventListener("click", function () {
    if (event.target.tagName === "BUTTON") {
      const letraElegida = event.target.textContent;
      letraPresionada(letraElegida);
    }
  });
});

function mostrarLetrasSeleccionables() {
  const letrasAbecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let letra of letrasAbecedario) {
    const botonLetra = document.createElement("button");
    botonLetra.textContent = letra;
    letrasContainer.appendChild(botonLetra);
  }
}
