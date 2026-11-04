/* Mobile is an editorial reading sequence. Desktop keeps its existing stage. */
(() => {
  'use strict';
  const story = document.querySelector('.light-story');
  if (!story) return;
  const narrow = matchMedia('(max-width:760px)');
  const intro = story.querySelector('.light-intro .light-copy');
  const introArt = document.createElement('figure');
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
  const filmMarker = document.createComment('desktop film position');
  film?.before(filmMarker);
  let mobile = false;

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
          film.after(record.notes);
        } else if (record.media) {
          record.media.after(record.notes);
        } else {
          record.chapter.append(record.notes);
        }
      }
    } else {
      introArt.remove();
      for (const record of records) {
        record.moved.forEach(({ node, marker }) => marker.after(node));
        record.notes.remove();
      }
      if (film && filmMarker.parentNode) filmMarker.after(film);
    }
  }

  narrow.addEventListener('change', compose);
  compose();
  window.SlimResponsiveComposition = Object.freeze({
    getState: () => ({ mobile, cases: records.length, filmConnected: !!film?.isConnected })
  });
})();
