'use strict';
(() => {
  const section = document.querySelector('#expertise');
  if (!section) return;
  const list = section.querySelector('#service-list');
  const intro = section.querySelector('.services-intro');
  const small = matchMedia('(max-width:760px)');
  const copy = {
    nl: {
      label: 'Van expertise naar iets tastbaars',
      strategy: {name: 'Een merk met richting.', output: 'Een helder verhaal en een herkenbare visuele basis.', note: 'SlimService / merkstudie', word: 'Maak het\nherkenbaar.', a: 'Verhaal', b: 'Vorm', c: 'Richting'},
      web: {name: 'Een website die verder helpt.', output: 'Van de eerste indruk naar een duidelijke volgende stap.', note: 'Bateman / websiteontwerp', a: 'Ontdek', b: 'Vertrouw', c: 'Neem contact op'},
      content: {name: 'Een merk is een samenspel.', output: 'Logo, badge, karakter, typografie, kleur en iconen. Samen herkenbaar, van website tot content.', note: 'Bateman / bestaande merkassets', a: 'Logo', b: 'Badge', c: 'Karakter', d: 'In toepassing', type: 'Typografie', icons: 'Iconen', colours: 'Kleuren', headings: 'Koppen · 500 / 600', accent: 'Accent · regular / italic', body: 'Lopende tekst: Arial / Helvetica', carpentry: 'Timmerwerk', fitting: 'Montage', garden: 'Tuinruimtes'},
      systems: {name: 'Ruimte om verder te werken.', output: 'Informatie, opvolging en controle in één logisch proces.', note: 'SlimService / procesvoorbeeld', a: 'Aanvraag', b: 'Controle', c: 'Volgende stap'}
    },
    en: {
      label: 'From expertise to something tangible',
      strategy: {name: 'An identity with direction.', output: 'A clear story and a recognisable visual foundation.', note: 'SlimService / identity study', word: 'Make it\nrecognisable.', a: 'Story', b: 'Form', c: 'Direction'},
      web: {name: 'A website that moves you forward.', output: 'From a first impression to a clear next step.', note: 'Bateman / website design', a: 'Discover', b: 'Trust', c: 'Get in touch'},
      content: {name: 'One identity. Many expressions.', output: 'Logo, badge, character, typography, colour and icons. Recognisable together, from website to content.', note: 'Bateman / existing brand assets', a: 'Logo', b: 'Badge', c: 'Character', d: 'In context', type: 'Typography', icons: 'Icons', colours: 'Colours', headings: 'Headings · 500 / 600', accent: 'Accent · regular / italic', body: 'Body text: Arial / Helvetica', carpentry: 'Carpentry', fitting: 'Fitting', garden: 'Garden rooms'},
      systems: {name: 'Room to keep moving.', output: 'Information, follow-up and review in one clear process.', note: 'SlimService / process example', a: 'Enquiry', b: 'Review', c: 'Next step'}
    }
  };
  let selected = list.querySelector('[aria-expanded="true"]')?.dataset.serviceToggle || 'web';
  const figure = document.createElement('figure');
  figure.className = 'expertise-visual';
  figure.innerHTML = `
    <div class="ev-stage" aria-hidden="true">
      <div class="ev-orbit"></div><div class="ev-guide ev-guide-one"></div><div class="ev-guide ev-guide-two"></div>
      <span class="ev-index"></span>
      <div class="ev-art ev-strategy"><div class="ev-brand-back"></div><div class="ev-brand-sheet"><span class="ev-sheet-label">SLIM / SERVICE</span><strong class="ev-brand-word"></strong><div class="ev-swatches"><i></i><i></i><i></i></div><div class="ev-identity-lines"><span></span><span></span><span></span></div></div></div>
      <div class="ev-art ev-web"><div class="ev-web-browser"><div class="ev-browser-bar"><span><i></i><i></i><i></i></span><span>batemanconstruction.co.uk</span></div><img src="assets/bateman-website.png" loading="lazy" decoding="async" width="1440" height="900" alt=""></div><div class="ev-web-action"><span data-ev="c"></span><svg><use href="#diagonal"/></svg></div></div>
      <div class="ev-art ev-content">
        <div class="ev-brand-cell ev-logo-piece"><span class="ev-cell-label" data-ev="a"></span><img src="assets/bateman-logo.webp" loading="lazy" decoding="async" width="960" height="320" alt="Bateman Construction"></div>
        <div class="ev-brand-cell ev-badge-piece"><span class="ev-cell-label" data-ev="b"></span><img src="assets/trevor-badge.webp" loading="lazy" decoding="async" width="320" height="320" alt="Trevor Approved"></div>
        <div class="ev-brand-cell ev-character-piece"><span class="ev-cell-label" data-ev="c"></span><img src="assets/bateman-duck-hardhat.webp" loading="lazy" decoding="async" width="480" height="480" alt=""></div>
        <div class="ev-brand-cell ev-type-piece"><span class="ev-cell-label" data-ev="type"></span><div class="ev-type-samples"><div><strong class="ev-barlow-sample">Aa</strong><span class="ev-type-name">Barlow Condensed</span><small data-ev="headings"></small></div><div><strong class="ev-instrument-sample">A<em>a</em></strong><span class="ev-type-name">Instrument Serif</span><small data-ev="accent"></small></div></div><p class="ev-body-sample" data-ev="body"></p></div>
        <div class="ev-brand-cell ev-icon-piece"><span class="ev-cell-label" data-ev="icons"></span><div class="ev-icon-grid"><span><i class="ev-icon-carpentry" aria-hidden="true"></i><small data-ev="carpentry"></small></span><span><i class="ev-icon-fitting" aria-hidden="true"></i><small data-ev="fitting"></small></span><span><i class="ev-icon-garden" aria-hidden="true"></i><small data-ev="garden"></small></span></div></div>
        <div class="ev-brand-cell ev-colour-piece"><span class="ev-cell-label" data-ev="colours"></span><div class="ev-palette"><span><i></i><small>#09A801</small></span><span><i></i><small>#E8E6DD</small></span><span><i></i><small>#191D1A</small></span></div></div>
      </div>
      <div class="ev-art ev-systems"><div class="ev-flow-line"></div><div class="ev-flow-node"><svg><use href="#icon-web"/></svg><span data-ev="a"></span><small>01</small></div><div class="ev-flow-node"><svg><use href="#check"/></svg><span data-ev="b"></span><small>02</small></div><div class="ev-flow-node"><svg><use href="#diagonal"/></svg><span data-ev="c"></span><small>03</small></div></div>
      <span class="ev-note"></span>
    </div>
    <figcaption><span class="ev-label"></span><strong class="ev-title"></strong><span class="ev-output"></span></figcaption>`;

  function sync() {
    const locale = document.documentElement.lang === 'en' ? 'en' : 'nl';
    const c = copy[locale][selected];
    const buttons = [...list.querySelectorAll('[data-service-toggle]')];
    buttons.forEach(button => {
      const active = button.dataset.serviceToggle === selected;
      button.setAttribute('aria-expanded', String(active));
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    figure.dataset.expertise = selected;
    figure.querySelector('.ev-stage').setAttribute('aria-hidden', String(selected !== 'content'));
    figure.querySelectorAll('.ev-art').forEach(art => art.setAttribute('aria-hidden',String(!art.classList.contains('ev-'+selected))));
    figure.querySelector('.ev-index').textContent = `0${['strategy','web','content','systems'].indexOf(selected)+1} / 04`;
    figure.querySelector('.ev-label').textContent = copy[locale].label;
    figure.querySelector('.ev-title').textContent = c.name;
    figure.querySelector('.ev-output').textContent = c.output;
    figure.querySelector('.ev-note').textContent = c.note;
    figure.querySelector('.ev-brand-word').textContent = copy[locale].strategy.word;
    figure.querySelectorAll('[data-ev]').forEach(element => element.textContent = c[element.dataset.ev] || '');
    const destination = small.matches ? document.getElementById(`service-${selected}`) : intro;
    if (destination && figure.parentElement !== destination) {
      if (small.matches) destination.prepend(figure);
      else destination.append(figure);
    }
  }

  // Own only these accordion clicks. All enquiry links retain the main app's handler.
  section.addEventListener('click', event => {
    const button = event.target.closest('[data-service-toggle]');
    if (!button || !section.contains(button)) return;
    event.stopImmediatePropagation();
    selected = button.dataset.serviceToggle;
    sync();
  }, true);
  // Locale and engagement changes rebuild the list in app.js. Keep the active service.
  new MutationObserver(sync).observe(list, {childList:true});
  new MutationObserver(sync).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  small.addEventListener('change', sync);
  sync();
})();
