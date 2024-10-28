const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const icon = document.getElementById("icon");

// Función para reproducir o pausar el audio y cambiar el icono
playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.src = "icons/pause.png"; // Icono de pausa
    icon.alt = "Pause Icon";
  } else {
    audio.pause();
    icon.src = "icons/play.png"; // Icono de play
    icon.alt = "Play Icon";
  }
});

// countdown
// Fecha futura para la cuenta regresiva
const countdownDate = new Date("Dec 31, 2024 20:00:00").getTime();

// Actualizar la cuenta regresiva cada segundo
const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Calcular días, horas, minutos y segundos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Actualizar el contenido de cada elemento en el HTML
  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");

  // Si el tiempo se acaba, mostrar un mensaje
  if (distance < 0) {
    clearInterval(interval);
    document.querySelector(".countdown-container").innerHTML =
      "<p>¡Cuenta regresiva terminada!</p>";
  }
}, 1000);

// itinerario
// Detectar el scroll y actualizar la línea de la timeline
window.addEventListener("scroll", () => {
  const timeline = document.getElementById("timeline-fill");
  const container = document.querySelector(".timeline-container");
  const containerRect = container.getBoundingClientRect();
  const scrollPosition = window.scrollY + window.innerHeight;
  const containerTop = containerRect.top + window.scrollY;
  const containerBottom = containerTop + containerRect.height;

  // Calcular la altura de la línea rellena en función del scroll
  if (scrollPosition >= containerTop && scrollPosition <= containerBottom) {
    const fillHeight =
      ((scrollPosition - containerTop) / containerRect.height) * 100;
    timeline.style.height = `${fillHeight}%`;
  } else if (scrollPosition > containerBottom) {
    timeline.style.height = "100%";
  } else {
    timeline.style.height = "0";
  }
});

// Animación
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  elements.forEach((element) => observer.observe(element));
});

// Actualización automática del año
document.getElementById("year").textContent = new Date().getFullYear();
