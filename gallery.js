const sliderTrack = document.getElementById("sliderTrack");
const images = document.querySelectorAll(".slider-track img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");

let currentIndex = 0;
let autoSlideInterval;

// Crear indicadores
images.forEach((_, index) => {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (index === 0) indicator.classList.add("active");
  indicatorsContainer.appendChild(indicator);
  indicator.addEventListener("click", () => {
    resetAutoSlide();
    showImage(index);
  });
});

const indicators = document.querySelectorAll(".indicator");

// Mostrar imagen en el índice actual
function showImage(index) {
  currentIndex = index;
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateIndicators();
}

// Actualizar indicadores
function updateIndicators() {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentIndex);
  });
}

// Navegar a la imagen anterior
prevBtn.addEventListener("click", () => {
  resetAutoSlide();
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  showImage(currentIndex);
});

// Navegar a la imagen siguiente
nextBtn.addEventListener("click", () => {
  resetAutoSlide();
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  showImage(currentIndex);
});

// Modal de pantalla completa
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

// Abrir imagen en el modal al hacer clic
images.forEach((image, index) => {
  image.addEventListener("click", () => {
    modal.style.display = "flex";
    currentIndex = index;
    updateModalImage();
    resetAutoSlide();
  });
});

// Actualizar imagen en el modal
function updateModalImage() {
  modalImage.src = images[currentIndex].src;
}

// Navegación en el modal
modalPrev.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  updateModalImage();
});

modalNext.addEventListener("click", () => {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  updateModalImage();
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera de la imagen
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Función para iniciar el auto-desplazamiento
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    showImage(currentIndex);
  }, 3000); // Cambiar cada 3 segundos
}

// Función para detener y reiniciar el auto-desplazamiento
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Iniciar el auto-desplazamiento
startAutoSlide();

// Inicializar el slider mostrando la primera imagen
showImage(currentIndex);
