(() => {
  "use strict";
  const langToggle=document.getElementById("langToggle");
  const menuToggle=document.getElementById("menuToggle");
  const mobileNav=document.getElementById("mobileNav");
  const supported=["bn","en"];
  function setLanguage(language,persist=true){
    const lang=supported.includes(language)?language:"bn";
    document.documentElement.lang=lang;
    document.body.classList.toggle("bn",lang==="bn");
    document.querySelectorAll("[data-bn][data-en]").forEach(el=>{const value=el.dataset[lang];if(value!==undefined)el.innerHTML=value;});
    if(langToggle){langToggle.innerHTML=lang==="bn"?'EN <span>↗</span>':'বাংলা <span>↗</span>';langToggle.setAttribute("aria-label",lang==="bn"?"Switch to English":"বাংলায় দেখুন");}
    if(persist){try{localStorage.setItem("dheu-language",lang);}catch(_){}}
  }
  if(langToggle)langToggle.addEventListener("click",()=>setLanguage(document.documentElement.lang==="bn"?"en":"bn"));
  if(menuToggle&&mobileNav){
    const close=()=>{mobileNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open menu");};
    menuToggle.addEventListener("click",()=>{const open=mobileNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu");});
    mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
    document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  }
  const reveal=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}}),{threshold:.12});
    reveal.forEach(el=>observer.observe(el));
  }else reveal.forEach(el=>el.classList.add("visible"));
  let initial=document.body.dataset.contentLanguage||"bn";
  try{const saved=localStorage.getItem("dheu-language");if(supported.includes(saved))initial=saved;}catch(_){}
  setLanguage(initial,false);
})();
