(() => {
  const search = document.getElementById('archiveSearch');
  const category = document.getElementById('categoryFilter');
  const language = document.getElementById('languageFilter');
  const cards = [...document.querySelectorAll('.archive-card')];
  const empty = document.getElementById('archiveEmpty');
  const params = new URLSearchParams(location.search);
  if (params.get('category')) category.value = params.get('category');
  function filter() {
    const q = search.value.trim().toLowerCase(); let visible = 0;
    cards.forEach(card => {
      const show = (!category.value || card.dataset.category === category.value) && (!language.value || card.dataset.language === language.value) && (!q || card.dataset.search.includes(q));
      card.hidden = !show; if (show) visible++;
    });
    empty.hidden = visible !== 0;
  }
  [search, category, language].forEach(el => el.addEventListener('input', filter));
  filter();
})();
