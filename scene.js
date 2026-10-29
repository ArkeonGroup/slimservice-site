'use strict';
/* One native, folded project surface. Illustration only; no remote actions. */
(() => {
  const goals = ['visibility', 'enquiries', 'operations'];
  const state = {step:0, goal:'visibility', locale:'nl', progress:0, decision:null, prepared:false, note:''};
  const text = {
    nl: {
      label:'Interactieve SlimService-werkstroom', brand:'SLIMSERVICE',
      stages:['De richting','De identiteit','De campagne','De volgende stap','De werkstroom'],
      goals:{visibility:'Meer herkenning', enquiries:'Gerichtere aanvragen', operations:'Minder handwerk'},
      question:{visibility:'Hoe maken we jouw bedrijf herkenbaar?', enquiries:'Hoe maken we de volgende stap duidelijk?', operations:'Hoe laten we het werk beter doorlopen?'},
      intentLabel:'De vraag die alles verbindt', intentTitle:'Een helder\nvertrekpunt.', intentFooter:'Eerst de juiste vraag. Dan de juiste vorm.',
      identityTitle:'Eén eigen\ngezicht.', identityCopy:'Je verhaal krijgt een herkenbare vorm. In taal, beeld en website.', identityFooter:'Een identiteit om op verder te bouwen.', identityParts:['Taal','Vorm','Website'],
      campaignTitle:'Hetzelfde verhaal.\nMeer bereik.', campaignCopy:'Een herkenbare lijn, van je website tot de content die je deelt.', campaignFooter:'Content met een duidelijke afzender.', campaignType:'CONTENT / CAMPAGNE',
      actionTitle:'Maak de volgende\nstap eenvoudig.', actionCopy:'Een bezoeker moet weten waar hij terechtkan. Maak van interesse een concrete vraag.', actionButton:'Maak een projectvraag', preparedButton:'Conceptvraag aanpassen', preparedLabel:'Je conceptvraag',
      prepared:{visibility:'Ik wil dat mijn bedrijf herkenbaarder naar buiten komt.', enquiries:'Ik wil bezoekers helpen een gerichte aanvraag te doen.', operations:'Ik wil terugkerend werk eenvoudiger organiseren.'},
      actionFooter:'Lokale demonstratie · er wordt niets verzonden.', draftAnnouncement:'De conceptvraag staat klaar. Er is niets verzonden.',
      reviewTitle:'De regie blijft\nbij jou.', reviewCopy:'Bekijk de richting. Geef akkoord of stuur bij voordat we verdergaan.', reviewPending:'Klaar voor jouw beoordeling', approve:'Deze richting klopt', revise:'Ik wil bijsturen', approved:'Richting goedgekeurd in deze demo.', revision:'Wijziging gevraagd in deze demo.', noteLabel:'Wat wil je aanpassen?', notePlaceholder:'Bijvoorbeeld: meer nadruk op mijn dienstverlening.', noteSaved:'Je toelichting is lokaal meegenomen.',
      reviewFooter:'Demonstratie van controle · geen publicatie of echte goedkeuring.', backLabel:'EEN STERK GEHEEL', goalLabel:'Doel', scopeLabel:'Richting • ontwerp • uitvoering'
    },
    en: {
      label:'Interactive SlimService workflow', brand:'SLIMSERVICE',
      stages:['The direction','The identity','The campaign','The next step','The workflow'],
      goals:{visibility:'More recognition', enquiries:'More focused enquiries', operations:'Less manual work'},
      question:{visibility:'How do we make your business recognisable?', enquiries:'How do we make the next step clear?', operations:'How do we make the work flow better?'},
      intentLabel:'The question that connects everything', intentTitle:'A clear\nstarting point.', intentFooter:'First the right question. Then the right form.',
      identityTitle:'One distinct\nidentity.', identityCopy:'Your story takes a recognisable shape. In language, visuals and your website.', identityFooter:'An identity to build on.', identityParts:['Language','Design','Website'],
      campaignTitle:'The same story.\nA wider reach.', campaignCopy:'A recognisable thread, from your website to the content you share.', campaignFooter:'Content with a clear identity.', campaignType:'CONTENT / CAMPAIGN',
      actionTitle:'Make the next\nstep simple.', actionCopy:'A visitor needs to know where to go. Turn interest into a specific question.', actionButton:'Prepare a project question', preparedButton:'Revise the draft question', preparedLabel:'Your draft question',
      prepared:{visibility:'I want my business to become more recognisable.', enquiries:'I want to help visitors make a focused enquiry.', operations:'I want to organise recurring work more simply.'},
      actionFooter:'Local demonstration · nothing is sent.', draftAnnouncement:'Your draft question is ready. Nothing has been sent.',
      reviewTitle:'You remain\nin control.', reviewCopy:'Review the direction. Approve it or request changes before we move on.', reviewPending:'Ready for your review', approve:'This direction works', revise:'I want to refine it', approved:'Direction approved in this demo.', revision:'Change requested in this demo.', noteLabel:'What would you change?', notePlaceholder:'For example: more focus on the service I offer.', noteSaved:'Your note has been kept locally.',
      reviewFooter:'Control demonstration · no publishing or real approval.', backLabel:'ONE COHERENT WHOLE', goalLabel:'Goal', scopeLabel:'Direction • design • delivery'
    }
  };
  let host, scene, face, wing, abort, queuedFrame = 0, dragging = false, pointerStart = null;
  let pointer = {x:0, y:0};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const br = value => esc(value).replaceAll('\n','<br>');
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const t = () => text[state.locale];

  function content() {
    const c = t();
    if (state.step === 0) return `<div class="ss-intent"><span class="ss-intent-label">${esc(c.intentLabel)}</span><h3 class="ss-title">${br(c.intentTitle)}</h3><p class="ss-question">${esc(c.question[state.goal])}</p><span class="ss-giant-letter" aria-hidden="true">S</span><div class="ss-print-line"><span>${esc(c.goals[state.goal])}</span><span aria-hidden="true">↗</span></div></div>`;
    if (state.step === 1) return `<div class="ss-identity"><h3 class="ss-title">${br(c.identityTitle)}</h3><div class="ss-identity-signature" aria-hidden="true"><span>slim</span><i></i><span>service</span></div><p class="ss-copy">${esc(c.identityCopy)}</p><div class="ss-identity-parts">${c.identityParts.map(part=>`<span>${esc(part)}</span>`).join('')}</div></div>`;
    if (state.step === 2) return `<div class="ss-campaign"><span class="ss-campaign-type">${esc(c.campaignType)}</span><h3 class="ss-title">${br(c.campaignTitle)}</h3><span class="ss-campaign-stroke" aria-hidden="true"></span><p class="ss-copy">${esc(c.campaignCopy)}</p><span class="ss-campaign-signature">SlimService<span aria-hidden="true">.</span></span></div>`;
    if (state.step === 3) return `<div class="ss-action"><h3 class="ss-title">${br(c.actionTitle)}</h3><p class="ss-copy">${esc(c.actionCopy)}</p>${state.prepared ? `<div class="ss-draft"><span>${esc(c.preparedLabel)}</span><p>${esc(c.prepared[state.goal])}</p></div>` : `<div class="ss-action-line"><span>${esc(c.goalLabel)}</span><strong>${esc(c.goals[state.goal])}</strong></div>`}<button class="ss-action-button" type="button" data-ss-action="prepare"><span>${esc(state.prepared ? c.preparedButton : c.actionButton)}</span>${arrow}</button></div>`;
    return `<div class="ss-review"><h3 class="ss-title">${br(c.reviewTitle)}</h3><p class="ss-copy">${esc(c.reviewCopy)}</p><div class="ss-review-status" data-decision="${state.decision || 'pending'}"><span class="ss-status-dot" aria-hidden="true"></span><span>${esc(state.decision === 'approved' ? c.approved : state.decision === 'revise' ? c.revision : c.reviewPending)}</span></div><div class="ss-decisions"><button type="button" class="ss-approve" data-ss-action="approve" aria-pressed="${state.decision === 'approved'}">${esc(c.approve)}</button><button type="button" class="ss-revise" data-ss-action="revise" aria-pressed="${state.decision === 'revise'}">${esc(c.revise)}</button></div>${state.decision === 'revise' ? `<label class="ss-note">${esc(c.noteLabel)}<textarea rows="2" maxlength="500" placeholder="${esc(c.notePlaceholder)}">${esc(state.note)}</textarea></label>` : `<p class="ss-review-goal">${esc(c.goalLabel)}: ${esc(c.goals[state.goal])}</p>`}</div>`;
  }

  function updatePose() {
    if (!scene) return;
    const poses = [
      {x:7,y:-13,z:-5,fold:65},
      {x:3,y:-8,z:2,fold:85},
      {x:6,y:10,z:-3,fold:110},
      {x:2,y:-5,z:1,fold:142},
      {x:0,y:0,z:0,fold:174}
    ];
    const pose = poses[state.step];
    const small = scene.clientWidth < 520;
    const factor = small ? .45 : 1;
    scene.style.setProperty('--ss-rx', `${reduced.matches ? 0 : pose.x * factor + pointer.y}deg`);
    scene.style.setProperty('--ss-ry', `${reduced.matches ? 0 : pose.y * factor + pointer.x}deg`);
    scene.style.setProperty('--ss-rz', `${reduced.matches ? 0 : pose.z * factor}deg`);
    scene.style.setProperty('--ss-fold', `${reduced.matches ? 174 : pose.fold}deg`);
    scene.style.setProperty('--ss-lift', `${reduced.matches ? 0 : -state.progress * 9}px`);
  }

  function render() {
    if (!scene) return;
    const c = t();
    scene.dataset.step = String(state.step);
    scene.dataset.decision = state.decision || 'pending';
    scene.dataset.prepared = String(state.prepared);
    scene.setAttribute('aria-label', c.label);
    scene.querySelector('.ss-sheet-stage').textContent = c.stages[state.step];
    scene.querySelector('.ss-sheet-index').textContent = `${String(state.step + 1).padStart(2,'0')} / 05`;
    wing.querySelector('.ss-wing-word').textContent = c.backLabel;
    face.innerHTML = content();
    const footer = [c.intentFooter,c.identityFooter,c.campaignFooter,c.actionFooter,c.reviewFooter][state.step];
    scene.querySelector('.ss-sheet-foot').textContent = footer;
    updatePose();
  }

  function announce(message) {
    if (scene) scene.querySelector('.ss-scene-status').textContent = message;
  }

  function emitDecision() {
    window.dispatchEvent(new CustomEvent('studio:decision', {detail:{decision:state.decision,goal:state.goal,note:state.note}}));
  }

  function set(next = {}) {
    const previous = {...state};
    if (Number.isFinite(Number(next.step))) state.step = Math.max(0,Math.min(4,Math.round(Number(next.step))));
    if (goals.includes(next.goal)) state.goal = next.goal;
    if (typeof next.locale === 'string') state.locale = next.locale.startsWith('en') ? 'en' : 'nl';
    if (Number.isFinite(Number(next.progress))) state.progress = Math.max(0,Math.min(1,Number(next.progress)));
    if (state.goal !== previous.goal) { state.prepared = false; state.decision = null; state.note = ''; }
    if (state.goal !== previous.goal || state.locale !== previous.locale) announce('');
    if (state.step !== previous.step || state.locale !== previous.locale || state.goal !== previous.goal) render();
    else updatePose();
    return {...state};
  }

  function boot() {
    host = document.getElementById('process-scene');
    if (!host || scene) return;
    abort = new AbortController();
    host.innerHTML = `<div class="ss-scene" role="group"><div class="ss-floor-shadow" aria-hidden="true"></div><div class="ss-object"><div class="ss-wing" aria-hidden="true"><span class="ss-wing-word"></span><span class="ss-wing-rule"></span></div><div class="ss-paper"><header class="ss-sheet-top"><span class="ss-sheet-stage"></span><span class="ss-sheet-index"></span></header><div class="ss-face"></div><p class="ss-sheet-foot"></p></div><div class="ss-paper-edge" aria-hidden="true"></div></div><p class="ss-scene-status" role="status" aria-live="polite"></p></div>`;
    scene = host.querySelector('.ss-scene');
    face = scene.querySelector('.ss-face');
    wing = scene.querySelector('.ss-wing');
    scene.addEventListener('click', event => {
      const button = event.target.closest('[data-ss-action]');
      if (!button) return;
      const action = button.dataset.ssAction;
      if (action === 'prepare') {
        state.prepared = !state.prepared;
        render();
        face.querySelector('[data-ss-action="prepare"]').focus({preventScroll:true});
        if (state.prepared) {
          announce(t().draftAnnouncement);
          window.dispatchEvent(new CustomEvent('studio:inquiry',{detail:{goal:state.goal,status:'prepared',question:t().prepared[state.goal]}}));
        }
      }
      if (action === 'approve' || action === 'revise') {
        state.decision = action === 'approve' ? 'approved' : 'revise';
        render();
        face.querySelector(`[data-ss-action="${action}"]`).focus({preventScroll:true});
        announce(t()[state.decision === 'approved' ? 'approved' : 'revision']);
        emitDecision();
      }
    }, {signal:abort.signal});
    scene.addEventListener('input', event => {
      if (event.target.matches('.ss-note textarea')) {
        state.note = event.target.value;
        emitDecision();
      }
    }, {signal:abort.signal});
    scene.addEventListener('pointerdown', event => {
      if (reduced.matches || event.target.closest('button,a,input,textarea,label')) return;
      dragging = true;
      pointerStart = {x:event.clientX,y:event.clientY,px:pointer.x,py:pointer.y};
      scene.classList.add('ss-dragging');
      scene.setPointerCapture(event.pointerId);
    }, {signal:abort.signal});
    scene.addEventListener('pointermove', event => {
      if (reduced.matches || event.target.closest('button,a,input,textarea,label')) return;
      const rect = scene.getBoundingClientRect();
      if (dragging && pointerStart) {
        pointer.x = Math.max(-12,Math.min(12,pointerStart.px + (event.clientX-pointerStart.x)*.035));
        pointer.y = Math.max(-6,Math.min(6,pointerStart.py - (event.clientY-pointerStart.y)*.02));
      } else if (event.pointerType === 'mouse') {
        pointer.x = ((event.clientX-rect.left)/rect.width-.5)*5;
        pointer.y = -((event.clientY-rect.top)/rect.height-.5)*3;
      }
      if (!queuedFrame) queuedFrame = requestAnimationFrame(() => { queuedFrame=0;updatePose(); });
    }, {signal:abort.signal});
    const endDrag = () => { dragging=false;pointerStart=null;scene.classList.remove('ss-dragging'); };
    scene.addEventListener('pointerup',endDrag,{signal:abort.signal});
    scene.addEventListener('pointercancel',endDrag,{signal:abort.signal});
    scene.addEventListener('pointerleave',() => {if(!dragging){pointer={x:0,y:0};updatePose();}},{signal:abort.signal});
    reduced.addEventListener('change',() => {pointer={x:0,y:0};updatePose();},{signal:abort.signal});
    window.addEventListener('resize',updatePose,{signal:abort.signal});
    render();
  }

  window.SlimScene = {
    set,
    get state() { return {...state}; },
    destroy() { abort?.abort(); if(queuedFrame)cancelAnimationFrame(queuedFrame); host?.replaceChildren(); scene=null; }
  };
  if (document.getElementById('process-scene')) boot();
  else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();
