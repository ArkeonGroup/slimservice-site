/* The selected cargo card becomes the context for the example briefing. */
(() => {
  'use strict';
  const story=document.querySelector('.light-story'),source=document.querySelector('.case-cargo'),context=document.querySelector('.pc-case-context');
  if(!story||!source||!context)return;
  const compact=matchMedia('(max-width:760px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
  const symbol=document.createElement('span');symbol.className='case-handoff-target';symbol.setAttribute('aria-hidden','true');
  symbol.innerHTML='<img width="64" height="64" alt="">';context.prepend(symbol);context.classList.add('has-cargo-symbol');
  const flight=document.createElement('div');flight.className='case-handoff-flight';flight.setAttribute('aria-hidden','true');flight.inert=true;flight.hidden=true;document.body.append(flight);
  const clamp=v=>Math.max(0,Math.min(1,v)),smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);},mix=(a,b,t)=>a+(b-a)*t;
  let frame=0,geometry=null,progress=0,flying=false,copyDirty=true,cargo=null;
  const snapshotProperties=['display','position','top','right','bottom','left','box-sizing','width','height','min-width','max-width','min-height','max-height','padding-top','padding-right','padding-bottom','padding-left','margin-top','margin-right','margin-bottom','margin-left','border-top','border-right','border-bottom','border-left','border-radius','background','box-shadow','color','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-align','text-transform','white-space','grid-template-columns','grid-template-rows','grid-column','grid-row','column-gap','row-gap','align-items','justify-content','align-content','justify-items','align-self','justify-self','flex-direction','flex-wrap','flex-basis','flex-grow','flex-shrink','object-fit','object-position','overflow','opacity','visibility'];
  function freezeFace(original,clone){
    // The flight lives outside #top. Freeze the rendered face before moving it,
    // including mobile-specific grid and type rules that no longer match there.
    const originals=[original,...original.querySelectorAll('*')],clones=[clone,...clone.querySelectorAll('*')];
    originals.forEach((node,index)=>{const computed=getComputedStyle(node),target=clones[index];for(const property of snapshotProperties)target.style.setProperty(property,computed.getPropertyValue(property));target.style.animation='none';target.style.transition='none';});
  }
  const disabled=()=>reduce.matches||document.documentElement.dataset.slimMotion==='reduced'||story.classList.contains('light-static')||context.hidden||document.hidden;
  function restore(){flight.hidden=true;source.classList.remove('handoff-departed');context.classList.remove('handoff-receiving');flying=false;}
  function cloneContent(){
    const a=source.cloneNode(true),b=context.cloneNode(true);
    freezeFace(source,a);freezeFace(context,b);
    a.classList.add('handoff-source-copy');a.classList.remove('handoff-departed');b.classList.add('handoff-destination-copy');b.classList.remove('handoff-receiving','is-cargo-arriving');b.hidden=false;
    for(const node of [a,b]){node.removeAttribute('id');node.removeAttribute('aria-live');node.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));}
    const selected=source.querySelector('[data-case-cargo][aria-pressed="true"]'),selectedImage=selected?.querySelector('img');
    a.querySelector('[data-case-cargo][aria-pressed="true"] img')?.style.setProperty('visibility','hidden');b.querySelector('.case-handoff-target')?.style.setProperty('visibility','hidden');
    const glyph=document.createElement('span');glyph.className='handoff-cargo-glyph';
    if(selectedImage)glyph.append(selectedImage.cloneNode(true));
    const label=document.createElement('span');label.className='handoff-cargo-label';label.textContent=selected?.querySelector('[data-case-option]')?.textContent||'';
    flight.replaceChildren(a,b,glyph,label);copyDirty=false;
  }
  function measure(){
    const s=story.getBoundingClientRect(),a=source.getBoundingClientRect(),b=context.getBoundingClientRect();
    const stageHeight=story.querySelector('.light-stage')?.clientHeight||innerHeight;
    const release=s.bottom+scrollY-stageHeight,targetY=innerHeight*(compact.matches?.29:.34);
    const selectedImage=source.querySelector('[data-case-cargo][aria-pressed="true"] img'),destinationGlyph=symbol.getBoundingClientRect(),destinationImage=symbol.querySelector('img').getBoundingClientRect(),selectedRect=selectedImage?.getBoundingClientRect();
    geometry={start:release,end:b.top+scrollY-targetY,from:{x:a.x,y:a.y+Math.max(0,scrollY-release),w:a.width,h:a.height},to:{x:b.x,y:targetY,w:b.width,h:b.height},glyphFrom:selectedRect?{x:selectedRect.x-a.x-10,y:selectedRect.y-a.y-10,w:selectedRect.width+20,h:selectedRect.height+20,imageW:selectedRect.width,imageH:selectedRect.height}:null,glyphTo:{x:destinationGlyph.x-b.x,y:destinationGlyph.y-b.y,w:destinationGlyph.width,h:destinationGlyph.height,imageW:destinationImage.width,imageH:destinationImage.height}};
  }
  function paint(){
    frame=0;if(disabled()||(source.contains(document.activeElement)&&document.activeElement.matches(':focus-visible'))){restore();return;}
    if(!geometry||(!flying&&scrollY>geometry.start&&scrollY<geometry.end))measure();const g=geometry;
    if(!g.from.w||!g.to.h||g.end<=g.start){restore();return;}
    progress=clamp((scrollY-g.start)/(g.end-g.start));
    if(progress<=0||progress>=1){restore();return;}
    if(copyDirty)cloneContent();flying=true;flight.hidden=false;source.classList.add('handoff-departed');context.classList.add('handoff-receiving');
    const t=smooth(0,1,progress),fold=smooth(.08,.31,progress),a=g.from,b=g.to,width=mix(a.w,b.w,t),destinationInset=Math.max(0,(width-b.w)/2);
    Object.assign(flight.style,{left:mix(a.x,b.x,t)+'px',top:mix(a.y,b.y,t)+'px',width:width+'px',height:mix(a.h,b.h,fold)+'px'});
    const destination=flight.querySelector('.handoff-destination-copy');destination.style.setProperty('left',destinationInset+'px','important');
    // Typography leaves before the next typography arrives. The actual selected
    // cargo icon stays visible between them, so the card never becomes a blank
    // slab and its two different text layouts never dissolve through each other.
    flight.style.setProperty('--handoff-fold',smooth(.055,.25,progress));flight.style.setProperty('--handoff-source',1-smooth(.015,.09,progress));flight.style.setProperty('--handoff-destination',smooth(.25,.36,progress));
    flight.style.setProperty('--handoff-label',smooth(.09,.12,progress)*(1-smooth(.22,.25,progress)));
    const glyph=flight.querySelector('.handoff-cargo-glyph'),label=flight.querySelector('.handoff-cargo-label');
    if(g.glyphFrom){const gt=smooth(.05,.32,progress),ga=g.glyphFrom,gb=g.glyphTo,gx=mix(ga.x,gb.x+destinationInset,gt),gy=mix(ga.y,gb.y,gt),gw=mix(ga.w,gb.w,gt),gh=mix(ga.h,gb.h,gt);Object.assign(glyph.style,{left:gx+'px',top:(gy-2)+'px',width:gw+'px',height:gh+'px'});Object.assign(glyph.querySelector('img').style,{width:mix(ga.imageW,gb.imageW,gt)+'px',height:mix(ga.imageH,gb.imageH,gt)+'px'});Object.assign(label.style,{left:(gx+gw/2)+'px',top:(gy+gh+6)+'px'});}
    flight.classList.toggle('is-compact',compact.matches);
  }
  function queue(){if(!frame)frame=requestAnimationFrame(paint);}
  function refresh(){geometry=null;copyDirty=true;queue();}
  function sync(){const selected=document.querySelector('[data-case-cargo][aria-pressed="true"]'),img=selected?.querySelector('img');cargo=selected?.dataset.caseCargo||null;if(img)symbol.querySelector('img').src=img.getAttribute('src');copyDirty=true;refresh();}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',refresh,{passive:true});addEventListener('slim:cargo',sync);addEventListener('slim:motion',refresh);
  compact.addEventListener('change',refresh);reduce.addEventListener('change',refresh);document.addEventListener('visibilitychange',refresh);document.addEventListener('focusin',queue);
  new ResizeObserver(refresh).observe(context);new ResizeObserver(refresh).observe(story);
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-slim-motion']});
  new MutationObserver(()=>{copyDirty=true;refresh();}).observe(context,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true,characterData:true});
  sync();window.SlimCaseHandoff=Object.freeze({getState:()=>({progress,flying,cargo,revealed:progress>=1,geometry})});
})();
