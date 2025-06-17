let puerta_desbloqueada = false;
let puerta_abierta = false;

let mensajeActual = [];
let parteIndex = 0;
let escribiendo = false;

function showMessagePorPartes(mensajes, speed = 30) {
  const box = document.getElementById("dialoge_box");
  mensajeActual = mensajes;
  parteIndex = 0;
  box.onclick = avanzarDialogo;
  escribirParte(mensajeActual[parteIndex], speed);
}

function escribirParte(texto, speed = 30) {
  const box = document.getElementById("dialoge_box");
  let index = 0;
  box.textContent = "";
  escribiendo = true;

  clearInterval(showMessage.interval);
  showMessage.interval = setInterval(() => {
    if (index < texto.length) {
      box.textContent += texto.charAt(index);
      index++;
    } else {
      clearInterval(showMessage.interval);
      escribiendo = false;
      box.textContent += " ▶"; // Indicador para avanzar
    }
  }, speed);
}
function avanzarDialogo() {
  const box = document.getElementById("dialoge_box");

  if (escribiendo) {
    clearInterval(showMessage.interval);
    box.textContent = mensajeActual[parteIndex] + " ▶";
    escribiendo = false;
  } else {
    parteIndex++;
    if (parteIndex < mensajeActual.length) {
      escribirParte(mensajeActual[parteIndex]);
    } else {
      box.textContent = "Haz clic para interactuar con los objetos.";
      box.onclick = null;
    }
  }
}

function showMessage(texto) {
  showMessagePorPartes([texto]);
}

function readNote1() {
  showMessage("mesaje generico que deberia contener datos de inclucion >IN< primera pista");
}

function readNote2() {
  showMessage("mensaje genetico que deberia contener una lay de inclusion >AC< segunda pista");
}

function readNote3() {
  showMessage("mensaje generico que deberia tener un benefico para elumnos >AP< tercera pista")
}

function openTerminal() {
  document.getElementById("terminal").style.display = "block";
}

function closeTerminal() {
  document.getElementById("terminal").style.display = "none";
}

function switchRoom(roomId) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  document.getElementById(roomId).style.display = "block"

  if (roomId === "Puerta") {
    const btn = document.getElementById("bdoor");
    const puerta = document.getElementById("pollo");
    if (puerta_abierta){
      puerta.src = "media/puerta_abierta.png"
      bdoor.style.display = "none"
      showMessage("la puerta esta abierta")
    } else if (puerta_desbloqueada) {
      bdoor.style.display = "inline-block"
      showMessage("la puerta esta desbloqueada, el boton la abrira")
    } else {
      bdoor.style.display = "none";
      showMessage("la puerta esta cerrada, busca la clave")
    }
  }
}

function abrirPuerta() {
  if (puerta_desbloqueada) {
    const puerta = document.getElementById("pollo");
    puerta.src = "media/puerta_abierta.png";
    puerta.dataset.abierta = true;
    puerta_abierta = true;
    document.getElementById("bdoor").style.display = "none";
    showMessagePorPartes(["la puerta esta abierta",
      "pudiste salir de este lugar",
      "has finalizado el juego",
      "¡Felicidades!"
    ])
  }
}


function checkPassword() {
  const input = document.getElementById("passwordID").value.trim().toLowerCase();
  if (input === "inacap") {
    puerta_desbloqueada = true;
    showMessage("puerta desbloqueada, puedes salir");
    closeTerminal();
  } else {
    showMessage("contraseña incorrecta")
  }
}