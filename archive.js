(() => {
  "use strict";
  const search=document.getElementById("archiveSearch"),category=document.getElementById("categoryFilter"),language=document.getElementById("languageFilter"),empty=document.getElementById("archiveEmpty");
  const cards=Array.from(document.querySelectorAll(".archive-card"));
  if(!search||!category||!language||!empty)return;
  const requested=new URLSearchParams(window.location.search).get("category");
  if(requested&&Array.from(category.options).some(o=>o.value===requested))category.value=requested;
  function filter(){
    const q=search.value.trim().toLocaleLowerCase();let count=0;
    cards.forEach(card=>{const text=(card.dataset.search||"").toLocaleLowerCase();const show=(!category.value||card.dataset.category===category.value)&&(!language.value||card.dataset.language===language.value)&&(!q||text.includes(q));card.hidden=!show;if(show)count++;});
    empty.hidden=count!==0;
  }
  [search,category,language].forEach(el=>{el.addEventListener("input",filter);el.addEventListener("change",filter);});filter();
})();
