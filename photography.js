
(() => {
  const lightbox = document.getElementById("photoLightbox");
  const image = document.getElementById("photoLightboxImage");
  const caption = document.getElementById("photoLightboxText");
  const credit = document.getElementById("photoLightboxCredit");
  const closeButton = document.getElementById("photoLightboxClose");

  if (!lightbox || !image || !closeButton) return;

  document.querySelectorAll(".photo-open").forEach(button => {
    button.addEventListener("click", () => {
      image.src = button.dataset.photoSrc;
      image.alt = button.dataset.photoAlt || "";
      caption.textContent = button.dataset.photoCaption || "";
      credit.textContent = button.dataset.photoCredit || "";

      lightbox.hidden = false;
      document.body.classList.add("photo-lightbox-active");
      closeButton.focus();
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    image.src = "";
    document.body.classList.remove("photo-lightbox-active");
  }

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
