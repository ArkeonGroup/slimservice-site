/* Mobile is an editorial reading sequence. Desktop keeps its existing stage. */
(() => {
  'use strict';
  const story = document.querySelector('.light-story');
  if (!story) return;
  const narrow = matchMedia('(max-width:760px)');
  const intro = story.querySelector('.light-intro .light-copy');
  const introArt = intro?.querySelector('.responsive-intro-art') || document.createElement('figure');
  introArt.className = 'responsive-intro-art';
  introArt.setAttribute('aria-hidden', 'true');
  introArt.innerHTML = '<img src="assets/lab/light-study-01-mobile.webp" width="768" height="432" alt="" decoding="async">';

  const records = [];
  for (const selector of ['.light-brand', '.light-content', '.light-work']) {
    const chapter = story.querySelector(selector);
    const copy = chapter?.querySelector('.light-copy');
    if (!copy) continue;
    const notes = document.createElement('div');
    notes.className = 'responsive-case-notes';
    const moved = [...copy.children]
      .filter(node => node.matches('.light-body, .light-action, .light-case-scope'))
      .map(node => {
        const marker = document.createComment('desktop copy position');
        node.before(marker);
        return { node, marker };
      });
    const media = selector === '.light-brand'
      ? chapter.querySelector('.light-static-bateman')
      : selector === '.light-content'
        ? story.querySelector('.light-content-surfaces')
        : story.querySelector('.light-website');
    records.push({ chapter, notes, moved, media });
  }

  const content = records.find(record => record.chapter.classList.contains('light-content'));
  const film = story.querySelector('.light-content-film');
  const identity = story.querySelector('.case-brandplate');
  const filmMarker = document.createComment('desktop film position');
  film?.before(filmMarker);
  const proofTabs = document.createElement('div');
  proofTabs.className = 'responsive-proof-tabs';
  proofTabs.setAttribute('role', 'tablist');
  proofTabs.innerHTML = '<button type="button" role="tab" id="responsive-proof-identity" aria-controls="responsive-identity-panel" data-proof="identity"></button><button type="button" role="tab" id="responsive-proof-film" aria-controls="responsive-film-panel" data-proof="film"></button>';
  const proofButtons = [...proofTabs.querySelectorAll('button')];
  const proofPanels = { identity, film };
  const panelAttributes = new Map([identity, film].filter(Boolean).map(panel => [panel, new Map(['id', 'role', 'aria-labelledby', 'tabindex'].map(name => [name, panel.getAttribute(name)]))]));
  let proof = 'identity';
  let mobile = false;

  function syncProof() {
    const english = document.documentElement.lang === 'en';
    proofTabs.setAttribute('aria-label', english ? 'Explore the Bateman identity' : 'Verken het Bateman-merk');
    proofButtons.forEach(button => {
      const selected = button.dataset.proof === proof;
      button.textContent = button.dataset.proof === 'identity' ? (english ? 'Brand identity' : 'Merkidentiteit') : (english ? 'Brand film' : 'Merkfilm');
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (!mobile) return;
    Object.entries(proofPanels).forEach(([key, panel]) => {
      if (!panel) return;
      panel.id = `responsive-${key}-panel`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `responsive-proof-${key}`);
      panel.tabIndex = 0;
      panel.hidden = key !== proof;
    });
    if (proof !== 'film') film?.querySelector('video')?.pause();
  }

  proofTabs.addEventListener('click', event => {
    const button = event.target.closest('[data-proof]');
    if (!button) return;
    proof = button.dataset.proof;
    syncProof();
  });
  proofTabs.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    proof = event.key === 'Home' ? 'identity' : event.key === 'End' ? 'film' : proof === 'identity' ? 'film' : 'identity';
    syncProof();
    proofButtons.find(button => button.dataset.proof === proof)?.focus();
  });
  new MutationObserver(syncProof).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  function compose() {
    const next = narrow.matches;
    if (next === mobile) return;
    mobile = next;
    story.classList.toggle('mobile-composed', mobile);
    if (mobile) {
      intro?.querySelector('h1')?.after(introArt);
      for (const record of records) {
        record.moved.forEach(({ node }) => record.notes.append(node));
        if (record === content && film) {
          // Keep the same video node: current playback, controls and listeners survive.
          record.media.prepend(film);
          record.media.prepend(proofTabs);
          record.media.after(record.notes);
        } else if (record.media) {
          record.media.after(record.notes);
        } else {
          record.chapter.append(record.notes);
        }
      }
      syncProof();
    } else {
      introArt.remove();
      proofTabs.remove();
      for (const [panel, attributes] of panelAttributes) {
        panel.hidden = false;
        for (const [name, value] of attributes) {
          if (value === null) panel.removeAttribute(name);
          else panel.setAttribute(name, value);
        }
      }
      for (const record of records) {
        record.moved.forEach(({ node, marker }) => marker.after(node));
        record.notes.remove();
      }
      if (film && filmMarker.parentNode) filmMarker.after(film);
    }
  }

  narrow.addEventListener('change', compose);
  syncProof();
  compose();
  window.SlimResponsiveComposition = Object.freeze({
    getState: () => ({ mobile, cases: records.length, proof, filmConnected: !!film?.isConnected })
  });
})();
