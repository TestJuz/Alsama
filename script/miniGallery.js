// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

// abrir
document.querySelectorAll(".mini-gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // evita scroll
  });
});

// cerrar botón
lightboxClose.addEventListener("click", closeLightbox);

// cerrar clic fuera
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function closeLightbox(){
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

// abrir lightbox para gallery + hero
document.querySelectorAll(".mini-gallery img, .hero__img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});
