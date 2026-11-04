/* Native-scroll handoffs through the complete SlimService page.
 * Presentation only: the calculator owns every value and enquiry operation. */
(() => {
  'use strict';
  const main = document.querySelector('main');
  if (!main || !document.querySelector('.light-story')) return;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 760px)');
  const manualMotionOff = () => root.dataset.slimMotion === 'reduced';
  const clamp = (value, a = 0, b = 1) => Math.max(a, Math.min(b, value));
  const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  const mix = (a, b, t) => a + (b - a) * t;
  const sections = [
    ['bridge', '.light-next'], ['expertise', '#expertise'],
    ['process', '#process-check'], ['collaboration', '#samenwerken'],
    ['trust', '#vertrouwen'], ['project', '#project'], ['footer', '.launch-footer']
  ];
  let frame = 0, records = [], refreshNeeded = true;
  const thread = document.createElement('div');
  thread.className = 'continuity-thread'; thread.setAttribute('aria-hidden', 'true');
  thread.innerHTML = '<span></span><i></i>'; document.body.append(thread);
  root.classList.add('site-continuous', 'continuity-architecture');

  const bridge = document.querySelector('.light-next');
  if (bridge && !bridge.querySelector('.continuity-bridge-stage')) {
    const heading = bridge.querySelector(':scope > h2');
    const body = bridge.querySelector(':scope > div');
    const stage = document.createElement('div'); stage.className = 'continuity-bridge-stage';
    const portal = document.createElement('div'); portal.className = 'continuity-portal'; portal.setAttribute('aria-hidden', 'true');
    portal.innerHTML = '<div class="continuity-portal-grid"></div><div class="continuity-portal-frame"><i></i><i></i><i></i><i></i></div>';
    const copy = document.createElement('div'); copy.className = 'continuity-bridge-copy';
    if (heading) copy.append(heading); if (body) { body.classList.add('continuity-bridge-body'); copy.append(body); }
    stage.append(portal, copy); bridge.replaceChildren(stage);
  }
  const disclosure = document.querySelector('#process-check');
  if (disclosure) disclosure.open = true;
  const gate = document.createElement('div');
  gate.className = 'continuity-grid-gate'; gate.setAttribute('aria-hidden', 'true');
  gate.innerHTML = Array.from({ length: 24 }, (_, i) => '<i style="--cell:' + i + '"></i>').join('');
  if (disclosure) disclosure.before(gate);
  const transfer = document.createElement('div');
  transfer.className = 'continuity-transfer'; transfer.setAttribute('aria-hidden', 'true');
  transfer.innerHTML = '<div class="continuity-transfer-matrix">' + Array.from({ length: 20 }, (_, i) => '<i data-transfer-cell="' + i + '"></i>').join('') + '</div>';
  document.querySelector('#samenwerken')?.before(transfer);
  const matrix = transfer.querySelector('.continuity-transfer-matrix');

  const observer = new ResizeObserver(queue);
  function refresh() {
    refreshNeeded = false;
    const previous = new Set(records.map(record => record.element));
    records = sections.flatMap(([name, selector], index) => {
      const element = document.querySelector(selector); if (!element) return [];
      element.classList.add('continuity-section'); element.dataset.continuity = name;
      if (!previous.has(element)) observer.observe(element);
      return [{ name, element, index }];
    });
  }
  function boundaryProgress(element, height) {
    const rect = element.getBoundingClientRect();
    return smooth((height * .92 - rect.top) / Math.max(1, height * .48 + rect.height));
  }
  function paintBoundaries(height, still) {
    const gateProgress = still ? 1 : boundaryProgress(gate, height);
    gate.style.setProperty('--gate-progress', gateProgress.toFixed(4));
    gate.querySelectorAll('i').forEach((cell, index) => {
      // One direction, one advancing construction edge. No random timing.
      const column = index % 12, row = Math.floor(index / 12);
      cell.style.setProperty('--cell-open', (still ? 1 : smooth((gateProgress - column * .018 - row * .08) / .65)).toFixed(4));
    });
    const progress = still ? 1 : boundaryProgress(transfer, height);
    transfer.style.setProperty('--transfer-progress', progress.toFixed(4));
    const width = matrix.clientWidth;
    const gap = compact.matches ? 3 : 7, startWidth = Math.max(2, (width - gap * 19) / 20);
    const colGap = compact.matches ? 18 : 50, endWidth = (width - colGap * 2) / 3;
    const source = [...document.querySelectorAll('#calculator [data-time-block]')];
    matrix.querySelectorAll('[data-transfer-cell]').forEach((cell, index) => {
      const free = clamp(Number(source[index]?.style.getPropertyValue('--free')) || 0);
      const group = Math.min(2, Math.floor(index / 7));
      const x = mix(index * (startWidth + gap), group * (endWidth + colGap), progress);
      const y = mix(48 - free * 24, 24 + (index % 7) * 13, progress);
      cell.style.width = mix(startWidth, endWidth, progress).toFixed(2) + 'px';
      cell.style.height = mix(50 + free * 20, 1, progress).toFixed(2) + 'px';
      cell.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
      cell.style.setProperty('--transfer-free', free.toFixed(3));
    });
  }
  function paint() {
    frame = 0; if (document.hidden) return;
    if (refreshNeeded) refresh();
    const height = innerHeight, still = reduced.matches || manualMotionOff();
    root.classList.toggle('continuity-still', still);
    const first = records[0]?.element.getBoundingClientRect();
    const last = records.at(-1)?.element.getBoundingClientRect();
    const lowerInView = !!first && first.top < height * .75 && !!last && last.bottom > 0;
    thread.classList.toggle('is-visible', lowerInView && !still);
    if (first && last) thread.style.setProperty('--thread-progress', clamp((height * .35 - first.top) / Math.max(height, last.bottom - first.top - height * .4)).toFixed(4));
    let active = '', tone = '';
    for (const { element, name, index } of records) {
      const rect = element.getBoundingClientRect();
      const visible = rect.bottom > -80 && rect.top < height + 80;
      const progress = clamp((height * .88 - rect.top) / Math.max(1, rect.height + height * .42));
      const arrival = still ? 1 : smooth((height * .92 - rect.top) / Math.max(1, height * .68));
      element.style.setProperty('--cont-progress', (still ? 1 : progress).toFixed(4));
      element.style.setProperty('--cont-enter', arrival.toFixed(4));
      element.style.setProperty('--cont-beam', ((index % 2 ? 1 - progress : progress) * 100).toFixed(2) + '%');
      element.dataset.continuityVisible = String(visible);
      if (rect.top <= height * .48 && rect.bottom > height * .48) active = name;
      if (name === 'bridge') {
        const phase = still ? 1 : compact.matches
          ? smooth((height * .68 - rect.top) / Math.max(1, rect.height * .9))
          : smooth(-rect.top / Math.max(1, rect.height - height));
        element.style.setProperty('--portal-open', phase.toFixed(4));
        if (rect.top < 120 && rect.bottom > 100) tone = phase > .72 ? 'paper' : 'dark';
      } else if (rect.top <= 100 && rect.bottom > 100) {
        const declared = element.dataset.headerTone;
        tone = declared ? (declared === 'light' ? 'paper' : declared) : ['process', 'footer'].includes(name) ? 'dark' : name === 'project' ? 'coral' : 'paper';
      }
      if (name === 'expertise' && visible && !element.hasAttribute('data-architecture-ready')) {
        element.querySelectorAll('.service-row').forEach(row => { row.dataset.continuityActive = String(!!row.querySelector('[aria-expanded="true"]')); });
      }
      if (name === 'collaboration' && visible) {
        element.querySelectorAll('.engagement-item').forEach((item, itemIndex) => {
          const itemRect = item.getBoundingClientRect();
          const step = still ? 1 : compact.matches ? smooth((height * .84 - itemRect.top) / (height * .52)) : smooth((progress * 2.3 - .1 - itemIndex * .24) / .48);
          item.style.setProperty('--cont-step', step.toFixed(4));
        });
      }
      if (name === 'process' && visible) {
        const calculator = element.querySelector('#calculator');
        const resultRect = calculator?.querySelector('.calc-results')?.getBoundingClientRect();
        if (calculator) {
          const illumination = still ? 1 : resultRect ? smooth((height - resultRect.top) / (height * .82)) : arrival;
          calculator.style.setProperty('--cont-result', illumination.toFixed(4));
          // Reuse the calculator's validated, already-computed unit distribution.
          calculator.querySelectorAll('[data-time-block]').forEach((block, i) => {
            block.style.setProperty('--capacity-entry', (still ? 1 : smooth((illumination - i * .012) / .76)).toFixed(4));
          });
        }
      }
    }
    const gateRect = gate.getBoundingClientRect(), transferRect = transfer.getBoundingClientRect();
    if (gateRect.top <= 100 && gateRect.bottom > 100) tone = 'paper';
    if (transferRect.top <= 100 && transferRect.bottom > 100) tone = 'paper';
    root.dataset.continuityTone = tone;
    root.classList.toggle('continuity-header-paper', tone === 'paper');
    root.dataset.continuityChapter = active;
    paintBoundaries(height, still);
  }
  function queue() { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); }
  function rescan() { refreshNeeded = true; queue(); }
  const mutations = new MutationObserver(rescan);
  mutations.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-expanded', 'open', 'hidden', 'data-architecture-ready', 'data-header-tone'] });
  const footer = document.querySelector('.launch-footer');
  if (footer) mutations.observe(footer, { childList: true, subtree: true });
  new MutationObserver(queue).observe(root, { attributes: true, attributeFilter: ['lang', 'data-slim-motion'] });
  addEventListener('scroll', queue, { passive: true }); addEventListener('resize', queue, { passive: true });
  reduced.addEventListener('change', queue); compact.addEventListener('change', queue);
  addEventListener('slim:motion', queue);
  document.addEventListener('visibilitychange', () => { if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; } else queue(); });
  main.addEventListener('toggle', queue, true); main.addEventListener('focusin', queue); main.addEventListener('input', queue); main.addEventListener('change', queue);
  main.addEventListener('click', event => { if (event.target.closest('.calc-reset')) queue(); });
  refresh(); queue();
  window.SlimSiteContinuity = Object.freeze({
    getState: () => ({ reduced: reduced.matches, manual: manualMotionOff(), still: reduced.matches || manualMotionOff(), scheduled: !!frame, active: root.dataset.continuityChapter, tone: root.dataset.continuityTone, sections: records.map(({ name, element }) => ({ name, visible: element.dataset.continuityVisible === 'true', progress: Number(element.style.getPropertyValue('--cont-progress')) })) })
  });
})();
