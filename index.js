import{a as S,i as n,S as q}from"./assets/vendor-DtRopbQG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const y=async(s,t,i)=>{try{const o=await S.get("https://pixabay.com/api/",{params:{key:"49409853-9b66959f7621caabc2c0e0f94",q:s.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i}});return{images:o.data.hits,totalHits:o.data.totalHits}}catch(o){throw console.log(o),n.error({title:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3}),o}},f=document.querySelector(".gallery"),H=new q(".gallery a"),h=s=>{const t=s.map(({largeImageURL:i,webformatURL:o,tags:e,likes:r,views:a,comments:L,downloads:w})=>`
  <li class="gallery-item">
    <a class="gallery-item" href="${i}">
      <div class="photo-card">
        <img src="${o}" alt="${e}" />
        <div class="info">
          <p><b>Likes:</b> ${r}</p>
          <p><b>Views:</b> ${a}</p>
          <p><b>Comments:</b> ${L}</p>
          <p><b>Downloads:</b> ${w}</p>
        </div>
      </div>
    </a>
  </li>`).join("");f.insertAdjacentHTML("beforeend",t),H.refresh()};function P(){f.innerHTML=""}const p=document.querySelector(".form"),v=document.querySelector(".loader"),m=document.querySelector(".input"),g=document.querySelector(".more-btn");document.querySelector(".gallery");let c=1;const R=15;let d=0;p.addEventListener("submit",async s=>{if(s.preventDefault(),m.value.trim()===""){n.warning({title:"Please type what you want to find",position:"topRight",timeout:5e3});return}P(),b(),u(),c=1;try{const{images:t,totalHits:i}=await y(m.value,c);if(d=i,l(),t.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u(),p.reset();return}h(t),$()}catch(t){console.log(t),l(),n.error({title:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3})}});function b(){v.classList.add("active")}function l(){v.classList.remove("active")}function $(){g.classList.add("active")}function u(){g.classList.remove("active")}g.addEventListener("click",async s=>{s.preventDefault(),c+=1,b();try{const{images:t,totalHits:i}=await y(m.value,c);d=i;const o=Math.ceil(d/R);l(),h(t),c>=o&&(u(),l(),n.error({title:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3})),setTimeout(()=>{const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy(0,r*2)}},100)}catch(t){l(),u(),console.log(t)}});
//# sourceMappingURL=index.js.map
