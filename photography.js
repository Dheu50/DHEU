(() => {
  const lightbox = document.getElementById("photoLightbox");
  const image = document.getElementById("photoLightboxImage");
  const caption = document.getElementById("photoLightboxText");
  const credit = document.getElementById("photoLightboxCredit");
  const counter = document.getElementById("photoLightboxCounter");

  const closeButton = document.getElementById("photoLightboxClose");
  const prevButton = document.getElementById("photoLightboxPrev");
  const nextButton = document.getElementById("photoLightboxNext");

  if (
    !lightbox || !image || !caption || !credit ||
    !counter || !closeButton || !prevButton || !nextButton
  ) return;

  let currentPhotos = [];
  let currentIndex = 0;
  let currentPhotographer = "";
  let currentCollection = "";

  function showPhoto() {
    const photo = currentPhotos[currentIndex];

    if (!photo || !photo.image) return;

    image.src = photo.image;
    image.alt = photo.caption || currentCollection || "Photography";

    caption.textContent = photo.caption || "";
    credit.textContent = currentPhotographer;
    counter.textContent =
      `${currentIndex + 1} / ${currentPhotos.length}`;

    const multiple = currentPhotos.length > 1;

    prevButton.hidden = !multiple;
    nextButton.hidden = !multiple;
    counter.hidden = !multiple;
  }

  function openCollection(button) {
    try {
      currentPhotos = JSON.parse(button.dataset.photos || "[]");

      if (!Array.isArray(currentPhotos) || currentPhotos.length === 0) {
        return;
      }

      currentPhotographer = button.dataset.credit || "";
      currentCollection = button.dataset.collection || "";
      currentIndex = 0;

      showPhoto();

      lightbox.hidden = false;
      document.body.classList.add("photo-lightbox-active");

      closeButton.focus();

    } catch (error) {
      console.error("Could not open photograph collection:", error);
    }
  }

  function closeLightbox() {
    lightbox.hidden = true;
    image.src = "";
    image.alt = "";

    caption.textContent = "";
    credit.textContent = "";
    counter.textContent = "";

    currentPhotos = [];
    currentIndex = 0;

    document.body.classList.remove("photo-lightbox-active");
  }

  function nextPhoto() {
    if (currentPhotos.length <= 1) return;

    currentIndex = (currentIndex + 1) % currentPhotos.length;
    showPhoto();
  }

  function previousPhoto() {
    if (currentPhotos.length <= 1) return;

    currentIndex =
      (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;

    showPhoto();
  }

  document.querySelectorAll(".photo-open").forEach(button => {
    button.addEventListener("click", () => openCollection(button));
  });

  closeButton.addEventListener("click", closeLightbox);
  nextButton.addEventListener("click", nextPhoto);
  prevButton.addEventListener("click", previousPhoto);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      nextPhoto();
    }

    if (event.key === "ArrowLeft") {
      previousPhoto();
    }
  });

})();
