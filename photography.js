(() => {
  const root = document.querySelector('.photo-experience');
  const lightbox = document.getElementById('photoLightbox');
  if (!root || !lightbox) return;

  const image = document.getElementById('photoLightboxImage');
  const caption = document.getElementById('photoLightboxText');
  const credit = document.getElementById('photoLightboxCredit');
  const counter = document.getElementById('photoLightboxCounter');
  const collectionLabel = document.getElementById('photoViewerCollection');
  const track = document.getElementById('photoViewerTrack');
  const closeButton = document.getElementById('photoLightboxClose');
  const prevButton = document.getElementById('photoLightboxPrev');
  const nextButton = document.getElementById('photoLightboxNext');
  const progress = document.getElementById('photoProgress');

  let photos = [];
  let index = 0;
  let photographer = '';
  let collectionName = '';
  let previousFocus = null;
  let touchStartX = 0;

  // Reveal content as it enters the viewport.
  const revealItems = root.querySelectorAll('.photo-reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Thin reading progress indicator.
  let ticking = false;
  const updateProgress = () => {
    const rect = root.getBoundingClientRect();
    const total = root.offsetHeight - window.innerHeight;
    const passed = Math.max(0, Math.min(total, -rect.top));
    progress.style.transform = `scaleX(${total > 0 ? passed / total : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();

  function renderPhoto() {
    const photo = photos[index];
    if (!photo || !photo.image) return;

    image.classList.remove('photo-image-in');
    image.src = photo.image;
    image.alt = photo.caption || collectionName || 'Photography';
    caption.textContent = photo.caption || '';
    credit.textContent = photographer ? `PHOTOGRAPHER / ${photographer}` : 'DHEU VISUAL ARCHIVE';
    collectionLabel.textContent = collectionName;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    track.style.width = `${((index + 1) / photos.length) * 100}%`;
    prevButton.hidden = photos.length < 2;
    nextButton.hidden = photos.length < 2;
    requestAnimationFrame(() => image.classList.add('photo-image-in'));
  }

  function openCollection(button) {
    try {
      const parsed = JSON.parse(button.dataset.photos || '[]');
      if (!Array.isArray(parsed) || !parsed.some(photo => photo && photo.image)) return;
      photos = parsed.filter(photo => photo && photo.image);
      index = 0;
      photographer = button.dataset.credit || '';
      collectionName = button.dataset.collection || 'Photography collection';
      previousFocus = button;
      renderPhoto();
      lightbox.hidden = false;
      document.body.classList.add('photo-viewer-open');
      closeButton.focus();
    } catch (error) {
      console.error('Unable to open this Dheu photograph collection:', error);
    }
  }

  function closeViewer() {
    lightbox.hidden = true;
    image.src = '';
    image.alt = '';
    caption.textContent = '';
    credit.textContent = '';
    photos = [];
    document.body.classList.remove('photo-viewer-open');
    if (previousFocus) previousFocus.focus();
  }

  function next() {
    if (photos.length < 2) return;
    index = (index + 1) % photos.length;
    renderPhoto();
  }
  function previous() {
    if (photos.length < 2) return;
    index = (index - 1 + photos.length) % photos.length;
    renderPhoto();
  }

  root.querySelectorAll('.photo-open').forEach(button => {
    button.addEventListener('click', () => openCollection(button));
  });
  closeButton.addEventListener('click', closeViewer);
  nextButton.addEventListener('click', next);
  prevButton.addEventListener('click', previous);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeViewer();
  });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') previous();
    if (event.key === 'Tab') {
      const controls = [closeButton, prevButton, nextButton].filter(el => !el.hidden);
      if (event.shiftKey && document.activeElement === controls[0]) {
        event.preventDefault(); controls[controls.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) {
        event.preventDefault(); controls[0].focus();
      }
    }
  });

  const stage = lightbox.querySelector('.photo-viewer-stage');
  stage.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 45) delta < 0 ? next() : previous();
  }, { passive: true });
})();
