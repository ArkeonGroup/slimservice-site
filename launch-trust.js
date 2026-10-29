'use strict';
(() => {
  const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
  const copy = {
    nl: {
      eyebrow: 'Achter SlimService', title: 'Goed werk begint<br>met <em>goed contact.</em>',
      intro: 'Een sterke digitale ervaring begint met begrijpen wat jouw bedrijf nodig heeft. We maken de vraag concreet, kiezen een passende aanpak en spreken af wat je ontvangt.',
      founder: 'Je aanspreekpunt', location: 'Rotterdam, Nederland', identity: 'SlimService is een handelsnaam van Z. Fernandes. Strategie, creatie en technologie komen hier samen rond jouw vraag.',
      contact: 'Laten we kennismaken', business: 'Geregistreerd bij de KvK', practical: 'Voor we beginnen',
      faqs: [
        ['Kan ik met één onderdeel beginnen?', 'Ja. Een website, een merkuitwerking, content of een afgebakend systeem kan een zelfstandig project zijn. We kijken ook naar wat er al is, zodat nieuw werk daarop aansluit.'],
        ['Hoe bepalen we de aanpak en het budget?', 'Eerst bespreken we je vraag, de gewenste oplevering en de beschikbare middelen. De omvang, planning en kosten werken we vervolgens uit in een voorstel. Zo weet je waar je ja tegen zegt.'],
        ['Wat moet ik zelf aanleveren?', 'Dat hangt af van de opdracht. Denk aan informatie over je bedrijf, bestaand merk- en beeldmateriaal of toegang tot een website. We bepalen vooraf wat nodig is en waar jouw feedback het verschil maakt.'],
        ['Hoe zit het met overdracht en onderhoud?', 'Wat je ontvangt, welke toegang je krijgt en welke licenties nodig zijn, hoort bij de projectafspraken. Eventueel onderhoud of verdere ontwikkeling bespreken we apart, passend bij jouw situatie.']
      ],
      footerLine: 'Van eerste idee tot iets dat werkt.', explore: 'Verkennen', contactLabel: 'Contact', details: 'Bedrijfsgegevens',
      links: [['Mogelijkheden', '#werk'], ['Expertise', '#expertise'], ['Samenwerken', '#samenwerken'], ['Project bespreken', '#project']],
      legalName: 'Handelsnaam van Z. Fernandes', country: 'Rotterdam, Nederland', privacy: 'Privacy', terms: 'Voorwaarden', up: 'Naar boven', group: 'Onderdeel van Arkeon Group',
      next: 'Na je bericht bespreken we je vraag en een passende eerste stap. Heb je al een concreet project? De projectbrief hieronder helpt je op weg.'
    },
    en: {
      eyebrow: 'Behind SlimService', title: 'Good work starts<br>with <em>a conversation.</em>',
      intro: 'A strong digital experience starts with understanding your business. We make the brief clear, choose a suitable approach and agree what you will receive.',
      founder: 'Your point of contact', location: 'Rotterdam, the Netherlands', identity: 'SlimService is a trading name of Z. Fernandes. Strategy, creativity and technology come together around your business needs.',
      contact: 'Let’s talk', business: 'Registered with the Dutch Chamber of Commerce', practical: 'Before we begin',
      faqs: [
        ['Can I start with one part?', 'Yes. A website, brand identity, content or a defined system can be a standalone project. We also look at what you already have, so the new work fits.'],
        ['How do we agree the approach and budget?', 'We first discuss your brief, the intended deliverables and available resources. We then set out the scope, timing and costs in a proposal, so you know what you are agreeing to.'],
        ['What do I need to provide?', 'That depends on the project. It might include information about your business, existing brand assets and images, or access to a website. We agree what is needed and where your feedback will help.'],
        ['What about handover and maintenance?', 'Deliverables, access and any required licences form part of the project agreement. We discuss maintenance or further development separately, to suit your situation.']
      ],
      footerLine: 'From the first idea to something that works.', explore: 'Explore', contactLabel: 'Contact', details: 'Business details',
      links: [['Possibilities', '#werk'], ['Expertise', '#expertise'], ['Working together', '#samenwerken'], ['Discuss a project', '#project']],
      legalName: 'Trading name of Z. Fernandes', country: 'Rotterdam, the Netherlands', privacy: 'Privacy', terms: 'Terms (Dutch)', up: 'Back to top', group: 'Part of Arkeon Group',
      next: 'After your message, we discuss your brief and a suitable first step. Already have a project in mind? The project brief below helps you get started.'
    }
  };
  const project = document.querySelector('#project');
  const footer = document.querySelector('.site-footer');
  if (!project || !footer) return;
  const section = document.createElement('section');
  section.className = 'trust-section section-pad';
  section.id = 'vertrouwen';
  section.setAttribute('aria-labelledby', 'trust-title');
  project.before(section);
  const next = document.createElement('p');
  next.className = 'contact-next';
  document.querySelector('.direct-contact')?.after(next);
  let locale;
  function render() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'nl';
    if (locale === lang) return;
    locale = lang;
    const c = copy[lang];
    const open = section.querySelector('details[open]')?.dataset.faq;
    section.innerHTML = `<div class="trust-heading"><span class="eyebrow">${c.eyebrow}</span><h2 id="trust-title">${c.title}</h2><p>${c.intro}</p></div>
      <div class="trust-layout"><div class="trust-person"><div class="trust-signature" aria-hidden="true"><span>S</span><svg viewBox="0 0 100 100"><path d="M18 78 78 18M18 18h60v60"/></svg></div><div class="trust-person-label"><span>${c.founder}</span><span>${c.location}</span></div><h3>Z. Fernandes</h3><p>${c.identity}</p><a class="text-cta" href="mailto:hello@slimservice.nl"><span>${c.contact}</span>${icon('diagonal')}</a><div class="trust-registration">${icon('check')}<span>${c.business}<strong>KvK 93320132</strong></span></div></div>
      <div class="trust-practical"><span class="eyebrow">${c.practical}</span><div class="trust-faq">${c.faqs.map(([q,a],i)=>`<details name="slimservice-practical" data-faq="${i}" ${open===String(i)?'open':''}><summary><span class="trust-question-number">0${i+1}</span><span>${q}</span>${icon('plus')}</summary><p>${a}</p></details>`).join('')}</div></div></div>`;
    next.textContent = c.next;
    footer.classList.add('launch-footer');
    footer.innerHTML = `<div class="footer-brand"><a class="wordmark" href="#top">Slim<span>Service</span><i></i></a><p>${c.footerLine}</p><a class="footer-group" href="https://arkeongroup.nl" target="_blank" rel="noopener">${c.group}${icon('diagonal')}</a></div>
      <nav class="footer-column" aria-label="${c.explore}"><span class="eyebrow">${c.explore}</span>${c.links.map(([label,url])=>`<a href="${url}">${label}</a>`).join('')}</nav>
      <div class="footer-column"><span class="eyebrow">${c.contactLabel}</span><a href="mailto:hello@slimservice.nl">hello@slimservice.nl</a><a href="https://wa.me/31687699731" target="_blank" rel="noopener">+31 (0)6 8769 9731 ${icon('diagonal')}</a><span>${c.country}</span></div>
      <div class="footer-business"><span>${c.legalName}</span><span>KvK 93320132</span><span>BTW / VAT NL005015462B59</span></div>
      <div class="footer-bottom"><span>© <span id="year">${new Date().getFullYear()}</span> SlimService</span><a href="privacy.html?lang=${lang}">${c.privacy}</a><a href="voorwaarden.html">${c.terms}</a><a href="#top" class="footer-up"><span>${c.up}</span>${icon('diagonal')}</a></div>`;
  }
  section.addEventListener('toggle', event => {
    if (!event.target.matches('details[open]')) return;
    section.querySelectorAll('details[open]').forEach(item => { if (item !== event.target) item.open = false; });
  }, true);
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.SlimTrust = { setLocale: render };
  render();
})();
