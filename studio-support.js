/* Supporting content stays subordinate to the work. No scroll interception. */
'use strict';
(() => {
  const expertise = document.querySelector('#expertise');
  const calculator = document.querySelector('#calculator');
  if (!expertise || !calculator) return;
  const copy = {
    nl: {
      expertise: 'De expertise achter het werk.',
      expertiseIntro: 'Strategie, ontwerp, content en techniek. We brengen de expertise samen die jouw project nodig heeft, van je eerste indruk tot het werk achter de schermen.',
      engagement: 'Samenwerken op jouw schaal.',
      trust: 'Goed om vooraf te weten.',
      calculator: 'Waar zit tijdwinst in jouw proces?',
      calculatorIntro: 'Verken terugkerend werk met je eigen cijfers.',
      calculatorLabel: 'Reken het door',
      calculatorTitle: 'Wat kan minder handwerk opleveren?',
      calculatorLink: 'Verken de tijd in jouw proces',
      work: 'Projecten'
    },
    en: {
      expertise: 'The expertise behind the work.',
      expertiseIntro: 'Strategy, design, content and technology. We bring together the expertise your project needs, from first impressions to the work behind the scenes.',
      engagement: 'A way of working that fits.',
      trust: 'Good to know before we begin.',
      calculator: 'Where could your process save time?',
      calculatorIntro: 'Explore recurring work using your own figures.',
      calculatorLabel: 'Explore the numbers',
      calculatorTitle: 'What could less manual work make possible?',
      calculatorLink: 'Explore the time in your process',
      work: 'Projects'
    }
  };
  document.body.classList.add('studio-support');
  document.querySelectorAll('.connection-section,.story-current,.story-seam').forEach(el => { el.hidden = true; });
  const disclosure = document.createElement('details');
  disclosure.className = 'process-disclosure';
  disclosure.id = 'process-check';
  disclosure.innerHTML = '<summary><span class="process-disclosure-icon" aria-hidden="true"><svg><use href="#icon-system"/></svg></span><span class="process-disclosure-copy"><strong data-support="calculator"></strong><span data-support="calculatorIntro"></span></span><span class="process-disclosure-action"><span data-support="calculatorLabel"></span><svg aria-hidden="true"><use href="#plus"/></svg></span></summary>';
  expertise.after(disclosure);
  disclosure.append(calculator);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.removeAttribute('data-copy');
    el.removeAttribute('data-i18n');
    if (el.textContent !== value) el.textContent = value;
  };
  function localize() {
    const c = copy[document.documentElement.lang === 'en' ? 'en' : 'nl'];
    setText('#services-title', c.expertise);
    setText('.services-intro > p', c.expertiseIntro);
    setText('#engagement-title', c.engagement);
    setText('#trust-title', c.trust);
    setText('#calculator-title', c.calculatorTitle);
    // calculator.js owns its heading when the language changes; this small
    // label override runs afterwards and does not touch its numerical state.
    document.querySelector('#calculator-title')?.removeAttribute('data-calc-copy');
    disclosure.querySelectorAll('[data-support]').forEach(el => { el.textContent = c[el.dataset.support]; });
    const panel = document.querySelector('#service-systems');
    if (panel && !panel.querySelector('.support-calculator-link')) {
      const link = document.createElement('a');
      link.className = 'text-cta support-calculator-link';
      link.href = '#calculator';
      link.innerHTML = '<span></span><svg aria-hidden="true"><use href="#arrow"/></svg>';
      panel.append(link);
    }
    document.querySelectorAll('.support-calculator-link > span').forEach(el => { el.textContent = c.calculatorLink; });
    document.querySelectorAll('.launch-footer a[href="#werk"]').forEach(el => { el.textContent = c.work; });
  }
  function openCalculator({ focus = false, scroll = false } = {}) {
    disclosure.open = true;
    if (scroll) calculator.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
    if (focus) {
      calculator.tabIndex = -1;
      calculator.focus({ preventScroll: true });
    }
  }
  // Open before app.js follows an in-page link, including the retained case
  // detail link. history.replaceState does not emit hashchange.
  document.addEventListener('click', event => {
    if (event.target.closest('a[href="#calculator"]')) openCalculator();
  }, true);
  window.addEventListener('hashchange', () => {
    if (location.hash === '#calculator') openCalculator({ scroll: true });
  });
  new MutationObserver(localize).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  new MutationObserver(localize).observe(document.querySelector('#service-list'), { childList: true });
  localize();
  if (location.hash === '#calculator') requestAnimationFrame(() => openCalculator({ scroll: true }));
  window.SlimSupport = { openCalculator };
})();
