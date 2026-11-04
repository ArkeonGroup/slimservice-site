/* A single scroll-controlled project surface. Native scroll, no timers or wheel interception. */
'use strict';
(() => {
  const mount = document.querySelector('#studio-opening');
  if (!mount) return;
  const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
  const text = key => `<span data-direction="${key}"></span>`;
  const words = {
    nl: {
      title: 'Sterk zichtbaar.<br><em>Slim verbonden.</em>', intro: 'We ontwerpen merken en websites die overtuigen. En bouwen de systemen die het werk erachter makkelijker maken.', work: 'Bekijk ons werk', contact: 'Bespreek je project', scroll: 'Van eerste indruk naar echt werk', motion: 'Overgang zonder beweging', motionOn: 'Scrollbeweging inschakelen', preview: 'Een eerste blik op ons werk', selected: 'Geselecteerd werk', batemanSector: 'Bouw & renovatie · Verenigd Koninkrijk', batemanBody: 'Een website die Batemans projecten de ruimte geeft. Met herkenbare merkdetails en bewegend beeld die het verhaal ook buiten de website voortzetten.', batemanScope: 'Webdesign / Merkuitwerking / Content', visit: 'Bezoek de website', external: 'opent in een nieuw tabblad', detail: 'Bekijk merk & content', bakfietsSector: 'Lokaal transport · Rotterdam Noord', bakfietsBody: 'Een eigen merk en website voor lokaal transport. Met een ladingkeuze die bezoekers helpt hun rit via WhatsApp aan te vragen.', bakfietsScope: 'Merkidentiteit / Webdesign / Interactie', film: 'Bekijk de merkfilm', close: 'Sluiten', menu: 'Menu', closeMenu: 'Sluit menu', expertise: 'Expertise', projects: 'Werk', next: 'Van goed werk naar jouw vraag', nextBody: 'De juiste combinatie van strategie, ontwerp en techniek. Afgestemd op wat jouw bedrijf nodig heeft.', nextCta: 'Onze expertise', filmNote: 'Bestaande merkfilm voor De Bakfietsmaat.', batemanAlt: 'Bateman Construction websiteontwerp met de kop A home. Made yours.', bakfietsAlt: 'De Bakfietsmaat website met eigen merkstijl en route naar een ritaanvraag', detailTitle: 'Bateman / merk & content', filmError: 'De film kan niet worden afgespeeld. De website is wel beschikbaar via de link hieronder.'
    },
    en: {
      title: 'Built to stand out.<br><em>Made to connect.</em>', intro: 'We design brands and websites that make an impression. And build the systems that make the work behind them easier.', work: 'Explore our work', contact: 'Discuss your project', scroll: 'From first impressions to real work', motion: 'View without scroll motion', motionOn: 'Enable scroll motion', preview: 'A first look at our work', selected: 'Selected work', batemanSector: 'Construction & renovation · United Kingdom', batemanBody: 'A website that puts Bateman’s projects first. A distinctive identity and moving imagery carry the same character across its digital presence.', batemanScope: 'Web design / Brand expression / Content', visit: 'Visit the website', external: 'opens in a new tab', detail: 'Explore identity & content', bakfietsSector: 'Local transport · Rotterdam Noord', bakfietsBody: 'A distinctive identity and website for local transport. A cargo selector helps visitors prepare a trip enquiry through WhatsApp.', bakfietsScope: 'Brand identity / Web design / Interaction', film: 'Watch the brand film', close: 'Close', menu: 'Menu', closeMenu: 'Close menu', expertise: 'Expertise', projects: 'Work', next: 'From our work to your next step', nextBody: 'The right combination of strategy, design and technology. Shaped around what your business needs.', nextCta: 'Our expertise', filmNote: 'Existing brand film for De Bakfietsmaat.', batemanAlt: 'Bateman Construction website design with the headline A home. Made yours.', bakfietsAlt: 'De Bakfietsmaat website showing its identity and route to a trip enquiry', detailTitle: 'Bateman / identity & content', filmError: 'The film could not play. You can still visit the website using the link below.'
    }
  };
  mount.outerHTML = `<section class="direction-opening" id="legacy-direction-top" aria-labelledby="direction-title">
    <span id="legacy-direction-work" class="direction-work-anchor"></span>
    <div class="direction-stage">
      <div class="direction-intro"><h1 id="direction-title" data-direction="title"></h1><p data-direction="intro"></p><a class="direction-cta" href="#werk">${text('work')}${icon('down')}</a></div>
      <div class="direction-signature" aria-hidden="true"><i></i><span></span></div>
      <div class="direction-case-heading"><span class="direction-index">01 / ${text('selected')}</span><h2>Bateman Construction</h2><span class="direction-sector" data-direction="batemanSector"></span></div>
      <figure class="direction-surface"><div class="direction-surface-edge"></div><div class="direction-screen"><img src="assets/bateman-website.png" width="1440" height="900" fetchpriority="high" decoding="async" data-direction-alt="batemanAlt" alt="Bateman Construction website"></div><figcaption><span>BATEMAN CONSTRUCTION</span>${text('preview')}${icon('diagonal')}</figcaption></figure>
      <div class="direction-scroll"><span>${icon('down')}${text('scroll')}</span><button type="button" class="direction-motion" aria-pressed="false">${icon('pause')}<span data-motion-label></span></button></div>
      <div class="direction-progress" aria-hidden="true"><span></span></div>
    </div>
  </section>
  <section class="direction-project direction-bateman" id="work-bateman" aria-label="Bateman Construction">
    <div class="direction-project-meta"><p data-direction="batemanBody"></p><div><span class="direction-scope" data-direction="batemanScope"></span><div class="direction-actions"><a class="direction-link" href="https://batemanconstruction.co.uk/" target="_blank" rel="noopener noreferrer">${text('visit')}<span class="sr-only" data-direction="external"></span>${icon('diagonal')}</a><button class="direction-link direction-secondary" type="button" data-direction-detail>${text('detail')}${icon('plus')}</button></div></div></div>
  </section>
  <section class="direction-project direction-bakfiets" id="work-bakfietsmaat" aria-labelledby="bakfiets-title">
    <div class="direction-project-heading"><span class="direction-index">02 / ${text('selected')}</span><div><h2 id="bakfiets-title">De Bakfietsmaat</h2><span class="direction-sector" data-direction="bakfietsSector"></span></div></div>
    <figure class="direction-bakfiets-image"><img src="assets/bakfietsmaat/website.jpg" width="1265" height="712" loading="lazy" decoding="async" data-direction-alt="bakfietsAlt" alt="De Bakfietsmaat website"></figure>
    <div class="direction-project-meta"><p data-direction="bakfietsBody"></p><div><span class="direction-scope" data-direction="bakfietsScope"></span><div class="direction-actions"><a class="direction-link" href="https://debakfietsmaat.nl/" target="_blank" rel="noopener noreferrer">${text('visit')}<span class="sr-only" data-direction="external"></span>${icon('diagonal')}</a><button class="direction-link direction-secondary" type="button" data-direction-film>${text('film')}${icon('play')}</button></div></div></div>
  </section>
  <div class="direction-to-expertise"><span class="direction-connector" aria-hidden="true"></span><h2 data-direction="next"></h2><div><p data-direction="nextBody"></p><a class="direction-link" href="#expertise">${text('nextCta')}${icon('down')}</a></div></div>`;
  const section = document.querySelector('.direction-opening');
  const stage = section.querySelector('.direction-stage');
  const intro = section.querySelector('.direction-intro');
  const surface = section.querySelector('.direction-surface');
  const heading = section.querySelector('.direction-case-heading');
  const caseTitle = heading.querySelector('h2');
  caseTitle.tabIndex = -1;
  section.querySelector('#legacy-direction-work').addEventListener('focus',()=>caseTitle.focus({preventScroll:true}));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 760px)');
  const shortViewport = matchMedia('(max-height: 560px)');
  const caseSection = document.querySelector('.direction-bateman');
  const caseDetails = caseSection.querySelector('.direction-project-meta');
  let still = reduced.matches, pending = false, geometry;
  const clamp = v => Math.min(1, Math.max(0,v));
  const smooth = v => { const x = clamp(v); return x*x*(3-2*x); };
  function measure() {
    if(document.documentElement.classList.contains('light-story-mode'))return;
    const staticView = still || shortViewport.matches;
    const compactMotion = narrow.matches && !staticView;
    section.classList.toggle('direction-static', staticView);
    section.classList.toggle('direction-compact', compactMotion);
    if(compactMotion && caseDetails.parentElement!==stage)stage.append(caseDetails);
    if(!compactMotion && caseDetails.parentElement!==caseSection)caseSection.append(caseDetails);
    caseDetails.classList.toggle('direction-compact-detail',compactMotion);
    caseSection.hidden=compactMotion;
    if(!compactMotion){caseDetails.inert=false;caseDetails.removeAttribute('aria-hidden');caseDetails.removeAttribute('style');}
    const w = stage.clientWidth, h = stage.clientHeight;
    const gutter = parseFloat(getComputedStyle(section).getPropertyValue('--gutter')) || 60;
    const endWidth = Math.min(w-gutter*2, 1320, (h-235)*1.6);
    geometry = {w,h,gutter,endWidth,startWidth:w*.435,startLeft:w*.54,startTop:h*.29,endLeft:(w-endWidth)/2,endTop:195,endHeight:endWidth/1.6};
    if(compactMotion){
      const endTop=heading.offsetTop+heading.offsetHeight+18;
      const finalWidth=Math.min(w-gutter*2,Math.max(150,h-endTop-caseDetails.offsetHeight-42)*1.6);
      const startTop=intro.offsetTop+intro.offsetHeight+24;
      const startWidth=Math.min(w*.72,Math.max(105,h-startTop-72)*1.6);
      geometry={w,h,gutter,endWidth:finalWidth,startWidth,startLeft:(w-startWidth)/2+8,startTop,endLeft:(w-finalWidth)/2,endTop,endHeight:finalWidth/1.6};
      stage.style.setProperty('--compact-detail-top',`${endTop+finalWidth/1.6+14}px`);
    }
    queue();
  }
  function render() {
    pending = false;
    if(document.documentElement.classList.contains('light-story-mode'))return;
    const staticView = still || shortViewport.matches;
    section.classList.toggle('direction-static', staticView);
    if (staticView) {
      surface.removeAttribute('style');
      intro.removeAttribute('style'); heading.removeAttribute('style');
      section.style.setProperty('--direction-progress','0');
      intro.inert = false; intro.removeAttribute('aria-hidden');
      section.querySelector('.direction-scroll').inert = false;
      section.querySelector('#werk').style.top = `${heading.offsetTop}px`;
      return;
    }
    const r = section.getBoundingClientRect();
    section.querySelector('#werk').style.removeProperty('top');
    const p = clamp(-r.top/Math.max(1, section.offsetHeight-innerHeight));
    const t = smooth((p-.05)/.8), fade = smooth(p/.3), appear = smooth((p-.25)/.2);
    const g = geometry, mix = (a,b)=>a+(b-a)*t;
    surface.style.width = `${mix(g.startWidth,g.endWidth)}px`;
    surface.style.height = `${mix(g.startWidth/1.6,g.endHeight)}px`;
    surface.style.left = `${mix(g.startLeft,g.endLeft)}px`;
    surface.style.top = `${mix(g.startTop,g.endTop)}px`;
    surface.style.transform = `perspective(1600px) rotateY(${(1-t)*-19}deg) rotateX(${(1-t)*7}deg) rotateZ(${(1-t)*3}deg)`;
    intro.style.opacity = 1-fade;
    intro.style.transform = `translateY(${-fade*50}px)`;
    intro.inert = fade>.99;
    intro.setAttribute('aria-hidden',String(fade>.99));
    heading.style.opacity = 1;
    heading.style.clipPath = `inset(${(1-appear)*100}% 0 0 0)`;
    heading.style.transform = `translateY(${(1-appear)*28}px)`;
    section.style.setProperty('--direction-progress',t.toFixed(4));
    section.querySelector('.direction-scroll').inert = t>.95;
    if(section.classList.contains('direction-compact')){
      const visible=p>.72;
      caseDetails.style.opacity=smooth((p-.65)/.18);
      caseDetails.inert=!visible;
      caseDetails.setAttribute('aria-hidden',String(!visible));
    }
  }
  function queue(){ if(document.documentElement.classList.contains('light-story-mode'))return; if (!pending){pending=true;requestAnimationFrame(render);} }
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  reduced.addEventListener('change',()=>{still=reduced.matches;syncMotion();measure();});
  narrow.addEventListener('change',measure);
  shortViewport.addEventListener('change',measure);
  const motion = section.querySelector('.direction-motion');
  function syncMotion(){motion.setAttribute('aria-pressed',String(still));motion.querySelector('[data-motion-label]').textContent=words[locale][still?'motionOn':'motion'];}
  motion.addEventListener('click',()=>{still=!still;syncMotion();measure();});

  // Case details are optional dialogs; closing returns to the project in place.
  const detail = document.querySelector('.work-section.showcase');
  detail.id = 'uitwerking';
  const detailDialog = document.createElement('dialog');
  detailDialog.className = 'direction-dialog direction-detail-dialog';
  detailDialog.setAttribute('aria-labelledby','direction-detail-title');
  detailDialog.innerHTML = `<div class="direction-dialog-bar"><h2 id="direction-detail-title" data-direction="detailTitle"></h2><button type="button" data-direction-close>${text('close')}${icon('close')}</button></div>`;
  detail.before(detailDialog);detailDialog.append(detail);
  detail.querySelector('.showcase-heading')?.setAttribute('hidden','');
  const brandInfo=document.createElement('div');
  brandInfo.className='direction-brand-info';
  brandInfo.innerHTML=`<img class="direction-brand-logo" src="assets/bateman-logo.webp" width="960" height="320" alt="Bateman Construction"><p data-direction="batemanBody"></p><div class="direction-brand-marks"><img src="assets/trevor-badge.webp" width="320" height="320" alt="Trevor, Bateman Construction"><img src="assets/bateman-duck-hardhat.webp" width="480" height="480" alt="Bateman brand character"></div><span class="direction-scope" data-direction="batemanScope"></span>`;
  detail.querySelector('.showcase-stage').prepend(brandInfo);
  const filmDialog = document.createElement('dialog');
  filmDialog.className = 'direction-dialog direction-film-dialog';
  filmDialog.setAttribute('aria-labelledby','direction-film-title');
  filmDialog.innerHTML=`<div class="direction-dialog-bar"><h2 id="direction-film-title">De Bakfietsmaat</h2><button type="button" data-direction-close>${text('close')}${icon('close')}</button></div><video controls playsinline preload="none" poster="assets/bakfietsmaat/hero-poster.webp" aria-label="De Bakfietsmaat"></video><p data-direction="filmNote"></p><p data-film-error hidden role="status" data-direction="filmError"></p><a class="direction-link" href="https://debakfietsmaat.nl/" target="_blank" rel="noopener noreferrer">${text('visit')}<span class="sr-only" data-direction="external"></span>${icon('diagonal')}</a>`;
  document.body.append(filmDialog);
  let opener;
  function openDetail(mode='content',options={}) {
    opener=options.opener || document.activeElement;
    window.SlimShowcase?.setMode('content');
    if(!detailDialog.open)detailDialog.showModal();
    window.dispatchEvent(new Event('resize'));
    detailDialog.querySelector('[data-direction-close]').focus({preventScroll:true});
  }
  function closeDialog(dialog) {dialog.close();}
  for(const dialog of [detailDialog,filmDialog]){
    dialog.querySelector('[data-direction-close]').addEventListener('click',()=>closeDialog(dialog));
    dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());opener?.focus({preventScroll:true});});
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  }
  detailDialog.addEventListener('click',e=>{if(e.target.closest('a[href^="#"]')){opener=null;detailDialog.close();}},true);
  document.querySelector('[data-direction-detail]').addEventListener('click',e=>openDetail('content',{opener:e.currentTarget}));
  function openFilm(options={}){
    opener=options.opener||document.activeElement;filmDialog.showModal();
    const video=filmDialog.querySelector('video');
    if(!video.src)video.src='assets/bakfietsmaat/hero-scene-mobile.mp4';
    video.play().catch(()=>{});
  }
  document.querySelector('[data-direction-film]').addEventListener('click',e=>openFilm({opener:e.currentTarget}));
  filmDialog.querySelector('video').addEventListener('error',()=>{filmDialog.querySelector('[data-film-error]').hidden=false;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)filmDialog.querySelector('video').pause();});
  window.addEventListener('studio:showcase',e=>openDetail(e.detail?.mode||'content',{opener:e.detail?.opener}));
  window.SlimStudioWork={openDetail,openFilm,closeDetail:()=>detailDialog.close()};

  // The same navigation is available to touch, pointer and keyboard users.
  const header=document.querySelector('.site-header'), nav=header.querySelector('nav');
  nav.id='studio-main-nav';
  const menu=document.createElement('button');
  menu.type='button';menu.className='direction-menu';menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-controls',nav.id);
  header.append(menu);
  function closeMenu(){header.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.textContent=words[locale].menu;}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';header.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=words[locale][open?'closeMenu':'menu'];});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('menu-open')){closeMenu();menu.focus();}});
  document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
  let locale=document.documentElement.lang==='en'?'en':'nl';
  function localize(){
    locale=document.documentElement.lang==='en'?'en':'nl';
    document.querySelectorAll('[data-direction]').forEach(el=>{const k=el.dataset.direction;if(k==='title')el.innerHTML=words[locale][k];else el.textContent=words[locale][k]||'';});
    document.querySelectorAll('[data-direction-alt]').forEach(el=>el.alt=words[locale][el.dataset.directionAlt]);
    nav.querySelector('.nav-full').textContent=words[locale].projects;
    nav.querySelector('.nav-short').textContent=words[locale].projects;
    nav.querySelector('.nav-work').setAttribute('aria-label',words[locale].projects);
    nav.querySelector('.nav-contact span').textContent=words[locale].contact;
    document.querySelectorAll('.footer-column a[href="#werk"]').forEach(el=>el.textContent=words[locale].projects);
    menu.textContent=words[locale][header.classList.contains('menu-open')?'closeMenu':'menu'];
    syncMotion();
    requestAnimationFrame(measure);
  }
  new MutationObserver(localize).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  localize();measure();
  const revealHash=()=>{if(location.hash==='#uitwerking')openDetail('content');};
  window.addEventListener('hashchange',revealHash);
  requestAnimationFrame(()=>{measure(); if(!document.documentElement.classList.contains('light-story-mode')&&location.hash==='#werk')document.querySelector('#werk').scrollIntoView();revealHash();});
})();
