'use strict';
(() => {
  const root = document.querySelector('.showcase');
  if (!root) return;
  const $ = selector => root.querySelector(selector);
  const $$ = selector => [...root.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width:760px)');
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  const state = {mode:'web',locale:document.documentElement.lang === 'en' ? 'en' : 'nl',exploded:false,phase:'ready'};
  const copy = {
    nl:{kicker:'De mogelijkheden, verbonden',title:'Zie wat er <br><em>mogelijk is.</em>',intro:'Eén herkenbaar merk. Van eerste indruk tot de volgende stap.',web:'Website',content:'Content',systems:'Werkproces',tabs:'Verken de mogelijkheden',stage:'Ruimtelijke presentatie van website, content en werkproces',explode:'Haal uit elkaar',assemble:'Breng samen',webLayer:'Verhaal. Structuur. Ontwerp.',openWebsite:'Bekijk het ontwerp',webBadge:'Webdesign',sourceLabel:'Aangeleverde projectbeelden',openContent:'Verken het contentvoorbeeld',openWorkflow:'Verken het werkproces',demo:'Interactieve demo',flowTitle:'Van aanvraag <br>naar <em>actie.</em>',flowRequest:'Een aanvraag',flowRequestDetail:'De juiste informatie',flowReview:'Jouw controle',flowReviewDetail:'Bekijken en beslissen',flowNext:'De volgende stap',flowNextDetail:'Met jouw akkoord',flowStart:'Probeer een aanvraag',flowApprove:'Geef akkoord',flowRevise:'Stuur bij',flowReset:'Opnieuw',flowDisclosure:'Een demonstratie. Er wordt niets verzonden of gekoppeld.',stageCaption:'Eén verhaal. Verschillende vormen.',depthHint:'Beweeg om de diepte te verkennen',evidenceLabel:'Bateman: website & branded content. SlimService: werkprocesdemo.',evidenceTitle:'Over de voorbeelden',evidenceBody:'De Bateman-website is een lokale opname van 21 oktober 2026. De film is de bestaande, stille hero-film van het Bateman-websiteproject. De kanaalweergaven laten een mogelijke presentatie zien en zijn geen bewijs van gepubliceerde posts. Het werkproces is een interactieve SlimService-demonstratie zonder live koppelingen.',phase:{ready:'Wat gebeurt er na die eerste klik? Probeer het zelf.',review:'De voorbeeldaanvraag is compleet. Jij bepaalt de volgende stap.',approved:'Akkoord. De volgende stap is voorbereid. Jij houdt de regie.',revise:'Terug naar de tekentafel. Er gaat niets verder zonder jouw akkoord.'},modes:{web:{detailLabel:'01 / WEBSITE',detailTitle:'Een sterke eerste indruk.',detailBody:'Een website die je verhaal helder maakt, je werk laat spreken en bezoekers een logische volgende stap geeft.',detailCta:'Bespreek mijn website'},content:{detailLabel:'02 / CONTENT',detailTitle:'Laat je werk verder spreken.',detailBody:'Een samenhangende beeldtaal voor website en social media. Hier zie je de bestaande Bateman-hero-film in drie mogelijke kanaalpresentaties.',detailCta:'Bespreek mijn content'},systems:{detailLabel:'03 / WERKPROCES',detailTitle:'Houd grip op de volgende stap.',detailBody:'Een aanvraag verdient een logisch vervolg. Verbind informatie, acties en controlepunten in een werkproces dat bij je bedrijf past.',detailCta:'Bespreek mijn werkproces'}}},
    en:{kicker:'The possibilities, connected',title:'See what’s <br><em>possible.</em>',intro:'One recognisable identity. From first impression to the next step.',web:'Website',content:'Content',systems:'Workflow',tabs:'Explore the possibilities',stage:'Spatial presentation of a website, content and workflow',explode:'Explore the layers',assemble:'Bring together',webLayer:'Story. Structure. Design.',openWebsite:'Explore the design',webBadge:'Web design',sourceLabel:'Supplied project photographs',openContent:'Explore the content sample',openWorkflow:'Explore the workflow',demo:'Interactive demo',flowTitle:'From enquiry <br>to <em>action.</em>',flowRequest:'An enquiry',flowRequestDetail:'The right information',flowReview:'Your review',flowReviewDetail:'Check and decide',flowNext:'The next step',flowNextDetail:'With your approval',flowStart:'Try an enquiry',flowApprove:'Give approval',flowRevise:'Make a change',flowReset:'Start again',flowDisclosure:'A demonstration. Nothing is sent or connected.',stageCaption:'One story. Different expressions.',depthHint:'Move to explore the depth',evidenceLabel:'Bateman: website & branded content. SlimService: workflow demo.',evidenceTitle:'About the examples',evidenceBody:'The Bateman website is a local capture from 21 October 2026. The film is the existing silent hero film from the Bateman website project. The channel treatments illustrate a possible presentation, not published posts. The workflow is an interactive SlimService demonstration with no live connections.',phase:{ready:'What happens after that first click? Try it yourself.',review:'The example enquiry is complete. You decide what happens next.',approved:'Approved. The next step is ready. You stay in control.',revise:'Back for another look. Nothing moves forward without your approval.'},modes:{web:{detailLabel:'01 / WEBSITE',detailTitle:'A strong first impression.',detailBody:'A website that tells your story clearly, lets your work speak and gives visitors a natural next step.',detailCta:'Let’s discuss my website'},content:{detailLabel:'02 / CONTENT',detailTitle:'Let your work speak further.',detailBody:'A coherent visual identity for your website and social media. Explore the existing Bateman hero film in three possible channel presentations.',detailCta:'Let’s discuss my content'},systems:{detailLabel:'03 / WORKFLOW',detailTitle:'Stay in control of the next step.',detailBody:'An enquiry deserves a clear follow-up. Connect information, actions and review points in a workflow that fits your business.',detailCta:'Let’s discuss my workflow'}}}
  };
  function renderCopy(){
    const c=copy[state.locale],mode=c.modes[state.mode];
    $$('[data-showcase-copy]').forEach(element=>{const key=element.dataset.showcaseCopy;const value=mode[key]??c[key];if(typeof value==='string'){if(['title','flowTitle'].includes(key))element.innerHTML=value;else element.textContent=value;}});
    $$('[data-showcase-label]').forEach(element=>element.setAttribute('aria-label',c[element.dataset.showcaseLabel]));
    $('.showcase-explode span').textContent=c[state.exploded?'assemble':'explode'];
    $('.sc-flow-message').textContent=c.phase[state.phase];
  }
  function syncAccess(){
    const reelCompact=state.mode!=='content';
    $('.reel-column').inert=reelCompact;
    if(reelCompact)$('#case-video').pause();
    $('.sc-web').inert=state.mode!=='web';
    $('.sc-workflow-inner').inert=state.mode!=='systems';
    $('.sc-sources').inert=true;
    $('.sc-open-reel').tabIndex=state.mode==='web'?0:-1;
    $('.sc-open-workflow').tabIndex=state.mode==='web'?0:-1;
  }
  function setMode(mode){
    if(!copy.nl.modes[mode])return;
    state.mode=mode;root.dataset.mode=mode;
    $$('.showcase-tabs button').forEach(button=>{const active=button.dataset.showcaseMode===mode;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
    $('#showcase-description').setAttribute('aria-labelledby',`showcase-${mode}-tab`);
    $('.showcase-cta').dataset.serviceSelect=mode;
    if(mode==='systems')$('#case-video').pause();
    syncAccess();renderCopy();
  }
  function setPhase(phase){
    state.phase=phase;$('.sc-workflow').dataset.phase=phase;
    $$('[data-flow-action]').forEach(button=>{const action=button.dataset.flowAction;button.hidden=action==='start'?phase!=='ready':['approve','revise'].includes(action)?phase!=='review':!['approved','revise'].includes(phase);});
    $('.sc-flow-message').textContent=copy[state.locale].phase[phase];
    const next=$('.sc-flow-actions button:not([hidden])');
    if(next)next.focus({preventScroll:true});
  }
  root.addEventListener('click',event=>{
    const modeButton=event.target.closest('[data-showcase-mode]');
    if(modeButton){setMode(modeButton.dataset.showcaseMode);if(!modeButton.closest('.showcase-tabs'))$(`#showcase-${state.mode}-tab`).focus({preventScroll:true});}
    const explodeButton=event.target.closest('.showcase-explode');
    if(explodeButton){state.exploded=!state.exploded;root.dataset.exploded=String(state.exploded);explodeButton.setAttribute('aria-pressed',String(state.exploded));renderCopy();}
    const flowButton=event.target.closest('[data-flow-action]');
    if(flowButton){const next={start:'review',approve:'approved',revise:'revise',reset:'ready'};setPhase(next[flowButton.dataset.flowAction]);}
  });
  $('.showcase-tabs').addEventListener('keydown',event=>{
    const tabs=$$('.showcase-tabs button'),index=tabs.indexOf(event.target);if(index<0)return;
    let next;if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%tabs.length;if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next===undefined)return;
    event.preventDefault();setMode(tabs[next].dataset.showcaseMode);tabs[next].focus({preventScroll:true});
  });
  const camera=$('.showcase-camera'),stage=$('.showcase-stage');let frame=0,pointer={x:0,y:0};
  function applyPointer(){frame=0;camera.style.setProperty('--sc-pointer-x',`${pointer.x.toFixed(2)}deg`);camera.style.setProperty('--sc-pointer-y',`${pointer.y.toFixed(2)}deg`);}
  function resetPointer(){pointer={x:0,y:0};if(!frame)frame=requestAnimationFrame(applyPointer);}
  stage.addEventListener('pointermove',event=>{if(reduced.matches||mobile.matches||!finePointer.matches||event.pointerType==='touch')return;const rect=stage.getBoundingClientRect();pointer={x:((event.clientX-rect.left)/rect.width-.5)*4,y:-((event.clientY-rect.top)/rect.height-.5)*2};if(!frame)frame=requestAnimationFrame(applyPointer);},{passive:true});
  stage.addEventListener('pointerleave',resetPointer,{passive:true});
  stage.addEventListener('focusin',resetPointer);
  reduced.addEventListener('change',()=>{resetPointer();if(reduced.matches){state.exploded=false;root.dataset.exploded='false';$('.showcase-explode').setAttribute('aria-pressed','false');renderCopy();}});
  mobile.addEventListener('change',()=>{resetPointer();syncAccess();});
  window.SlimShowcase={setLocale(locale){state.locale=locale==='en'?'en':'nl';renderCopy();},get state(){return{...state};},setMode};
  setMode('web');
})();
