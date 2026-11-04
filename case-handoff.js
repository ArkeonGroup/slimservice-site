/* The selected cargo card becomes the context for the example briefing. */
(() => {
  'use strict';
  const story=document.querySelector('.light-story'),source=document.querySelector('.case-cargo'),context=document.querySelector('.pc-case-context');
  if(!story||!source||!context)return;
  const compact=matchMedia('(max-width:1000px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
  const symbol=document.createElement('span');symbol.className='case-handoff-target';symbol.setAttribute('aria-hidden','true');
  symbol.innerHTML='<img width="64" height="64" alt="">';context.prepend(symbol);context.classList.add('has-cargo-symbol');
  const flight=document.createElement('div');flight.className='case-handoff-flight';flight.setAttribute('aria-hidden','true');flight.inert=true;flight.hidden=true;document.body.append(flight);
  const clamp=v=>Math.max(0,Math.min(1,v)),smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);},mix=(a,b,t)=>a+(b-a)*t;
  let frame=0,geometry=null,progress=0,flying=false,copyDirty=true,cargo=null;
  const disabled=()=>compact.matches||reduce.matches||document.documentElement.dataset.slimMotion==='reduced'||story.classList.contains('light-static')||context.hidden||document.hidden;
  function restore(){flight.hidden=true;source.classList.remove('handoff-departed');context.classList.remove('handoff-receiving');flying=false;}
  function cloneContent(){
    const a=source.cloneNode(true),b=context.cloneNode(true);
    a.classList.add('handoff-source-copy');a.classList.remove('handoff-departed');a.style.padding=getComputedStyle(source).padding;b.classList.add('handoff-destination-copy');b.classList.remove('handoff-receiving');b.hidden=false;
    for(const node of [a,b]){node.removeAttribute('id');node.removeAttribute('aria-live');node.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));}
    flight.replaceChildren(a,b);copyDirty=false;
  }
  function measure(){
    const s=story.getBoundingClientRect(),a=source.getBoundingClientRect(),b=context.getBoundingClientRect(),release=s.bottom+scrollY-innerHeight;
    geometry={start:release,end:b.top+scrollY-innerHeight*.34,from:{x:a.x,y:a.y+Math.max(0,scrollY-release),w:a.width,h:a.height},to:{x:b.x,y:innerHeight*.34,w:b.width,h:b.height}};
  }
  function paint(){
    frame=0;if(disabled()||(source.contains(document.activeElement)&&document.activeElement.matches(':focus-visible'))){restore();return;}
    if(!geometry||(!flying&&scrollY>geometry.start&&scrollY<geometry.end))measure();const g=geometry;
    if(!g.from.w||!g.to.h||g.end<=g.start){restore();return;}
    progress=clamp((scrollY-g.start)/(g.end-g.start));
    if(progress<=0||progress>=1){restore();return;}
    if(copyDirty)cloneContent();flying=true;flight.hidden=false;source.classList.add('handoff-departed');context.classList.add('handoff-receiving');
    const t=smooth(0,1,progress),fold=smooth(0,.48,progress),a=g.from,b=g.to;
    Object.assign(flight.style,{left:mix(a.x,b.x,t)+'px',top:mix(a.y,b.y,t)+'px',width:mix(a.w,b.w,t)+'px',height:mix(a.h,b.h,fold)+'px'});
    flight.style.setProperty('--handoff-fold',smooth(.04,.24,progress));flight.style.setProperty('--handoff-source',1-smooth(.02,.16,progress));flight.style.setProperty('--handoff-destination',smooth(.17,.30,progress));
  }
  function queue(){if(!frame)frame=requestAnimationFrame(paint);}
  function refresh(){geometry=null;queue();}
  function sync(){const selected=document.querySelector('[data-case-cargo][aria-pressed="true"]'),img=selected?.querySelector('img');cargo=selected?.dataset.caseCargo||null;if(img)symbol.querySelector('img').src=img.getAttribute('src');copyDirty=true;refresh();}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',refresh,{passive:true});addEventListener('slim:cargo',sync);addEventListener('slim:motion',refresh);
  compact.addEventListener('change',refresh);reduce.addEventListener('change',refresh);document.addEventListener('visibilitychange',refresh);document.addEventListener('focusin',queue);
  new ResizeObserver(refresh).observe(context);new ResizeObserver(refresh).observe(story);
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-slim-motion']});
  new MutationObserver(()=>{copyDirty=true;refresh();}).observe(context,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true,characterData:true});
  sync();window.SlimCaseHandoff=Object.freeze({getState:()=>({progress,flying,cargo,revealed:progress>=1,geometry})});
})();
