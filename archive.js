(() => {
  "use strict";
  const search = document.getElementById("archiveSearch");
  const category = document.getElementById("categoryFilter");
  const language = document.getElementById("languageFilter");
  const empty = document.getElementById("archiveEmpty");
  const count = document.getElementById("archiveResultCount");
  const reset = document.getElementById("archiveReset");
  const cards = Array.from(document.querySelectorAll(".archive-card"));
  const sectionLinks = Array.from(document.querySelectorAll("[data-archive-link]"));
  if (!search || !category || !language || !empty) return;

  const requested = new URLSearchParams(window.location.search).get("category");
  if (requested && Array.from(category.options).some(option => option.value === requested)) {
    category.value = requested;
  }

  function filterArchive() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matchesCategory = !category.value || card.dataset.category === category.value;
      const matchesLanguage = !language.value ||
        (card.dataset.category !== "photography" && card.dataset.language === language.value);
      const matchesSearch = !query || (card.dataset.search || "").toLocaleLowerCase().includes(query);
      const show = matchesCategory && matchesLanguage && matchesSearch;
      card.hidden = !show;
      if (show) visible++;
    });
    empty.hidden = visible !== 0;
    if (count) count.textContent = String(visible).padStart(2, "0") + (visible === 1 ? " CONTRIBUTION" : " CONTRIBUTIONS");
    sectionLinks.forEach(link => {
      const active = link.dataset.archiveLink === category.value;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  [search, category, language].forEach(control => {
    control.addEventListener("input", filterArchive);
    control.addEventListener("change", filterArchive);
  });
  if (reset) reset.addEventListener("click", () => {
    search.value = "";
    category.value = "";
    language.value = "";
    filterArchive();
  });
  filterArchive();
})();