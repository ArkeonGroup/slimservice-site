/* The same cargo symbol continues into the enquiry, within normal document flow. */
(() => {
  'use strict';
  const context=document.querySelector('.pc-case-context');
  if(!context)return;
  const destination=document.createElement('span');
  destination.className='case-handoff-target';destination.setAttribute('aria-hidden','true');
  destination.innerHTML='<img width="64" height="64" alt="">';context.prepend(destination);
  context.classList.add('has-cargo-symbol');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)');
  const motionOff=()=>reduce.matches||document.documentElement.dataset.slimMotion==='reduced';
  let source=null,revealed=false,revealing=false;
  function finish(){revealing=false;context.classList.remove('is-cargo-arriving');}
  function reveal(){
    if(revealed||context.hidden||!context.offsetHeight||document.hidden)return;
    revealed=true;
    observer?.unobserve(context);
    if(motionOff())return;
    revealing=true;context.classList.add('is-cargo-arriving');
  }
  function check(){
    if(context.hidden){finish();return;}
    if(motionOff())finish();
    const rect=context.getBoundingClientRect();
    if(rect.height&&rect.bottom>0&&rect.top<innerHeight*.9)reveal();
  }
  function sync(){
    source=document.querySelector('[data-case-cargo][aria-pressed="true"]');
    const image=source?.querySelector('img');
    if(image)destination.querySelector('img').src=image.getAttribute('src');
    check();
  }
  // Content stays visible if observers, motion or animation are unavailable.
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting))reveal();
  },{rootMargin:'0px 0px -10% 0px',threshold:.2}):null;
  observer?.observe(context);
  context.addEventListener('animationend',event=>{if(event.target===context)finish();});
  window.addEventListener('slim:cargo',sync);
  window.addEventListener('slim:motion',check);
  reduce.addEventListener('change',check);
  document.addEventListener('visibilitychange',check);
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new MutationObserver(check).observe(context,{attributes:true,attributeFilter:['hidden']});
  sync();
  window.SlimCaseHandoff=Object.freeze({getState:()=>({progress:revealed?1:0,flying:false,revealed,revealing,cargo:source?.dataset.caseCargo||null})});
})();
