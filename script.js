const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
let currentLanguage = "bn";

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.body.classList.toggle("bn", language === "bn");
  document.querySelectorAll("[data-bn][data-en]").forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  langToggle.innerHTML = language === "bn" ? 'EN <span>↗</span>' : 'বাংলা <span>↗</span>';
  langToggle.setAttribute("aria-label", language === "bn" ? "Switch to English" : "বাংলায় দেখুন");
}
langToggle.addEventListener("click", () => setLanguage(currentLanguage === "bn" ? "en" : "bn"));

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
setLanguage("bn");
