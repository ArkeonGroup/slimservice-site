/* Case evidence: original brand assets and a local, illustrative enquiry handoff. */
(() => {
  'use strict';
  const story = document.querySelector('.light-story');
  const brand = story?.querySelector('.light-brand');
  const work = story?.querySelector('.light-work');
  const print = story?.querySelector('.light-content-print');
  if (!brand || !work || !print || story.dataset.caseProof) return;
  story.dataset.caseProof = 'ready';
  const copy = {
    nl: {
      proof: 'De ontwerpkeuzes achter Bateman',
      labels: ['Vraag', 'Keuze', 'Resultaat'],
      evidence: ['Hoe maak je vakmanschap online voelbaar?', 'Projectbeeld, merkdetails en contact in één lijn.', 'Een portfolio met een duidelijke route naar een aanvraag.'],
      brandSystem: 'Eén merk. Elk detail.', type: 'Typografie', character: 'Karakter', icons: 'Diensten', palette: 'Merkpalet', brandCaption: 'Van website naar bewegend beeld.',
      badgeAlt: 'Originele Trevor Approved-badge van Bateman', duckAlt: 'Origineel Bateman-eendje met bouwhelm',
      carpentry: 'Timmerwerk', fitting: 'Montage', garden: 'Tuinruimtes',
      cargoLabel: 'Van keuze naar aanvraag', cargoTitle: 'Wat gaat er mee?', demo: 'Demo · er wordt niets verstuurd',
      choose: 'Kies een voorbeeldlading', service: 'Dienst', description: 'Je keuze gaat mee', route: 'Voorbeeldroute', routeValue: 'Schiebroek → Hillegersberg',
      contact: 'Lading gekozen. Exacte adressen en datum ontbreken nog.', routeLink: 'Bekijk de aanvraagroute', briefLink: 'Bekijk de briefing', briefNote: 'Je keuze gaat mee naar het procesvoorbeeld.',
      options: {
        furniture: { label: 'Meubels', service: 'Meubels en Marktplaats-aankopen', description: 'Ik wil graag een bank laten vervoeren.' },
        parcels: { label: 'Pakketten', service: 'Boodschappen en pakketten', description: 'Ik wil graag pakketten laten vervoeren.' },
        shop: { label: 'Winkellevering', service: 'Winkelbevoorrading', description: 'Ik wil graag voorraad naar mijn winkel laten brengen.' }
      }
    },
    en: {
      proof: 'The design decisions behind Bateman',
      labels: ['Question', 'Decision', 'Outcome'],
      evidence: ['How can craftsmanship feel tangible online?', 'Project imagery, identity and contact work together.', 'A portfolio with a clear route to an enquiry.'],
      brandSystem: 'One identity. Every detail.', type: 'Typography', character: 'Character', icons: 'Services', palette: 'Brand palette', brandCaption: 'From website to moving image.',
      badgeAlt: 'Original Bateman Trevor Approved badge', duckAlt: 'Original Bateman duck character with a hard hat',
      carpentry: 'Carpentry', fitting: 'Fitting', garden: 'Garden rooms',
      cargoLabel: 'From choice to enquiry', cargoTitle: 'What needs moving?', demo: 'Demo · nothing is sent',
      choose: 'Choose a sample load', service: 'Service', description: 'Your choice carries through', route: 'Example route', routeValue: 'Schiebroek → Hillegersberg',
      contact: 'Load selected. Exact addresses and a date are still needed.', routeLink: 'Explore the enquiry journey', briefLink: 'View the brief', briefNote: 'Your choice carries into the process example.',
      options: {
        furniture: { label: 'Furniture', service: 'Furniture and marketplace purchases', description: 'I would like to transport a sofa.' },
        parcels: { label: 'Parcels', service: 'Groceries and parcels', description: 'I would like to transport some parcels.' },
        shop: { label: 'Shop delivery', service: 'Shop supplies', description: 'I would like stock delivered to my shop.' }
      }
    }
  };
  let selected = 'furniture';
  const text = key => `<span data-case-copy="${key}"></span>`;
  const evidence = document.createElement('dl');
  evidence.className = 'case-evidence';
  evidence.innerHTML = [0, 1, 2].map(i => `<div><dt><span class="case-evidence-number">0${i + 1}</span><span data-case-evidence-label="${i}"></span></dt><dd data-case-evidence="${i}"></dd></div>`).join('');
  brand.append(evidence);

  // Preserve the existing film and its playback controls; change only the adjacent print.
  print.classList.add('case-brandplate');
  print.innerHTML = `
    <div class="case-brandplate-header"><img src="assets/bateman-logo.webp" width="960" height="320" alt="Bateman Construction" decoding="async"><span data-case-copy="brandSystem"></span></div>
    <div class="case-brandplate-body">
      <div class="case-brandplate-type"><span class="case-brandplate-label" data-case-copy="type"></span><div class="case-brandplate-sample"><strong>Aa</strong><span>Barlow<br>Condensed</span></div><div class="case-brandplate-sample case-brandplate-serif"><strong>Aa</strong><span>Instrument<br>Serif</span></div></div>
      <div class="case-brandplate-character"><span class="case-brandplate-label" data-case-copy="character"></span><div><img src="assets/trevor-badge.webp" width="320" height="320" data-case-alt="badgeAlt" alt="Trevor Approved" decoding="async"><img src="assets/bateman-duck-hardhat.webp" width="480" height="480" data-case-alt="duckAlt" alt="Bateman brand character" decoding="async"></div></div>
    </div>
    <div class="case-brandplate-details"><div class="case-brandplate-icons"><span class="case-brandplate-label" data-case-copy="icons"></span><div>${[['carpentry','carpentry'],['fitting','fitting'],['garden-room','garden']].map(([asset,key])=>`<span><i class="case-brandplate-icon case-brandplate-icon-${asset}" aria-hidden="true"></i><span data-case-copy="${key}"></span></span>`).join('')}</div></div><div class="case-brandplate-palette"><span class="case-brandplate-label" data-case-copy="palette"></span><div aria-label="#09A801, #E8E6DD, #191D1A"><i></i><i></i><i></i></div></div></div>
    <figcaption data-case-copy="brandCaption"></figcaption>`;

  const cargo = document.createElement('section');
  cargo.className = 'case-cargo';
  cargo.setAttribute('aria-labelledby', 'case-cargo-title');
  cargo.innerHTML = `
    <div class="case-cargo-choice"><div class="case-cargo-heading"><span data-case-copy="cargoLabel"></span><h3 id="case-cargo-title" data-case-copy="cargoTitle"></h3></div><div class="case-cargo-options" role="group">${[['furniture','meubels'],['parcels','pakketten'],['shop','winkeltransport']].map(([key,asset])=>`<button type="button" data-case-cargo="${key}" aria-pressed="${key===selected}"><img src="assets/bakfietsmaat-case/icon-${asset}.svg" width="64" height="64" alt=""><span data-case-option="${key}"></span><i aria-hidden="true">✓</i></button>`).join('')}</div></div>
    <div class="case-cargo-output"><span class="case-cargo-demo" data-case-copy="demo"></span><div class="case-cargo-live" aria-live="polite" aria-atomic="true"><dl><div><dt data-case-copy="service"></dt><dd data-case-service></dd></div><div><dt data-case-copy="description"></dt><dd data-case-description></dd></div></dl></div><p class="case-cargo-route"><span data-case-copy="route"></span><strong data-case-copy="routeValue"></strong></p><p class="case-cargo-explainer" data-case-copy="contact"></p><a class="case-cargo-brief" href="#expertise" data-case-brief><span data-case-copy="briefLink"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></a><span class="case-cargo-note" data-case-copy="briefNote"></span></div>`;
  work.append(cargo);
  const routeLink = work.querySelector('.light-case-link');
  const routeText = routeLink?.querySelector('[data-light-copy="visit"]');
  if (routeText) {
    routeText.removeAttribute('data-light-copy');
    routeText.dataset.caseCopy = 'routeLink';
  }
  function localize() {
    const c = copy[document.documentElement.lang === 'en' ? 'en' : 'nl'];
    evidence.setAttribute('aria-label', c.proof);
    evidence.querySelectorAll('[data-case-evidence-label]').forEach(el => el.textContent = c.labels[Number(el.dataset.caseEvidenceLabel)]);
    evidence.querySelectorAll('[data-case-evidence]').forEach(el => el.textContent = c.evidence[Number(el.dataset.caseEvidence)]);
    story.querySelectorAll('[data-case-copy]').forEach(el => el.textContent = c[el.dataset.caseCopy] || '');
    print.querySelectorAll('[data-case-alt]').forEach(el => el.alt = c[el.dataset.caseAlt]);
    cargo.querySelector('.case-cargo-options').setAttribute('aria-label', c.choose);
    cargo.querySelectorAll('[data-case-option]').forEach(el => el.textContent = c.options[el.dataset.caseOption].label);
    cargo.querySelectorAll('[data-case-cargo]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.caseCargo === selected)));
    cargo.querySelector('[data-case-service]').textContent = c.options[selected].service;
    cargo.querySelector('[data-case-description]').textContent = c.options[selected].description;
    if (routeLink) routeLink.href = 'https://debakfietsmaat.nl/#laden';
  }
  cargo.addEventListener('click', event => {
    const button = event.target.closest('[data-case-cargo]');
    if (!button || !cargo.contains(button)) return;
    selected = button.dataset.caseCargo;
    localize();
    publish(true);
  });
  function publish(explicit) {
    window.dispatchEvent(new CustomEvent('slim:cargo', { detail: { cargo: selected, source: 'case', explicit } }));
  }
  window.SlimCaseCargo = Object.freeze({ getState: () => ({ cargo: selected, source: 'case' }) });
  new MutationObserver(localize).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  localize();
  publish(false);
})();
