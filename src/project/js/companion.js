// Companion Cat Speech Bubble
document.addEventListener("DOMContentLoaded", () => {
  const companion = document.querySelector(".little-friend");
  const wrapper = document.querySelector(".companion-wrapper");
  let speechBubble = null;
  let isTyping = false;

  const messages = [
    "¡Nyan~! (づ｡◕‿‿◕｡)づ Bienvenido a MATHLAB, mi pequeño taller matemágico, donde los humanos creen que aprender matemáticas puede ser divertido....",
    "¡Hola! ＼(●~▽~●) Soy tu compañero pixelado, aunque no esperes demasiada compañía… estoy demasiado ocupado observando cómo sufres con JavaScript. Aquí podrás explorar geometría, porcentajes, estadística y análisis salarial, si eso te hace feliz. Diviértete aprendiendo… o al menos fíngelo.",
    "¿Sabías que las matemágicas están en todas partes? ¡No te preocupes! Este proyecto te ayudará a entenderlas mejor, mientras juegas un poquito con la programación. ≖‿≖",
  ];

  let currentMessageIndex = 0;

  companion.addEventListener("click", (e) => {
    e.stopPropagation();

    if (
      speechBubble &&
      speechBubble.classList.contains("speech-bubble--visible")
    ) {
      closeSpeechBubble();
    } else {
      showSpeechBubble();
    }
  });

  function showSpeechBubble() {
    if (isTyping) return;

    if (!speechBubble) {
      createSpeechBubble();
    }

    const message = messages[currentMessageIndex];
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;

    speechBubble.querySelector(".speech-bubble__text").textContent = "";
    speechBubble.classList.add("speech-bubble--visible");

    typeWriter(message, 0);
  }

  function createSpeechBubble() {
    speechBubble = document.createElement("div");
    speechBubble.className = "speech-bubble";
    speechBubble.innerHTML = `
      <div class="speech-bubble__content">
        <button class="speech-bubble__close" aria-label="Cerrar">×</button>
        <p class="speech-bubble__text"></p>
      </div>
      <div class="speech-bubble__arrow"></div>
    `;

    wrapper.appendChild(speechBubble);

    const closeBtn = speechBubble.querySelector(".speech-bubble__close");
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSpeechBubble();
    });

    document.addEventListener("click", (e) => {
      if (
        speechBubble &&
        !speechBubble.contains(e.target) &&
        !companion.contains(e.target)
      ) {
        closeSpeechBubble();
      }
    });
  }

  function typeWriter(text, index) {
    if (index === 0) {
      isTyping = true;
      companion.style.cursor = "wait";
    }

    if (index < text.length) {
      const textElement = speechBubble.querySelector(".speech-bubble__text");
      textElement.textContent += text.charAt(index);
      setTimeout(() => typeWriter(text, index + 1), 30);
    } else {
      isTyping = false;
      companion.style.cursor = "pointer";
    }
  }

  function closeSpeechBubble() {
    if (speechBubble) {
      speechBubble.classList.remove("speech-bubble--visible");
      isTyping = false;
      companion.style.cursor = "pointer";
    }
  }

  // Add pointer cursor to companion
  companion.style.cursor = "pointer";
  companion.setAttribute("role", "button");
  companion.setAttribute(
    "aria-label",
    "Haz click para ver información del proyecto",
  );
});
