'use strict';
(() => {
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'), compact=matchMedia('(max-height: 600px), (max-width: 760px) and (max-height: 760px)');
  const state={locale:'nl',goal:'visibility',step:0,channel:'instagram',service:null,engagement:null,decision:null};
  const copy=window.STUDIO_COPY, hero=$('.experience'), sticky=$('.experience-sticky'), video=$('#case-video');
  const extra={
    nl:{sceneLabel:'Interactieve werkwijze · Geen live koppelingen',scrollLabel:'Scroll. Zie het samenkomen.',skipExperience:'Bekijk de mogelijkheden',ambitionLabel:'Jouw bedrijf, jouw vertrekpunt',ambitionTitle:'Waar wil jij<br><em>naartoe?</em>',goalAction:'Dit is mijn vertrekpunt',webCaseTab:'De website',contentCaseTab:'Het verhaal',contentCaseHeading:'Hetzelfde merk.<br><em>Een ander podium.</em>',caseRole:'Eén case. Webdesign en branded content, met echte Bateman-assets.',connectionTitle:'Ook achter<br><em>de schermen.</em>',connectionAction:'Ontdek onze expertise',servicesTitle:'Verschillende<br>disciplines.<br><em>Eén richting.</em>',projectEyebrow:'Een goed begin',projectTitle:'Wat wil jij<br>in beweging<br><em>zetten?</em>',whatsappBrief:'Open in WhatsApp',footerLine:'Strategie. Creatie. Technologie.',serviceAction:'Dit past bij mijn project',engagementAction:'Dit past bij mijn vraag',selected:'Geselecteerd',chosenService:'Gekozen expertise',chosenEngagement:'Samenwerking',goalGroup:'Kies je ambitie',stepGroup:'Verken de werkwijze',caseGroup:'Verken de Bateman-case',decisionNote:'Je hebt de controle in het voorbeeld verkend. Voor een echt project spreken we de controlepunten samen af.',briefSubject:'Een project voor SlimService',briefOpening:'Hoi SlimService, ik wil graag mijn project bespreken.',briefClosing:'Laten we bespreken wat een passende eerste stap is.'},
    en:{sceneLabel:'Interactive process · No live connections',scrollLabel:'Scroll. See it come together.',skipExperience:'Explore the possibilities',ambitionLabel:'Your business, your starting point',ambitionTitle:'Where do you<br><em>want to go?</em>',goalAction:'This is my starting point',webCaseTab:'The website',contentCaseTab:'The story',contentCaseHeading:'The same identity.<br><em>A different stage.</em>',caseRole:'One case. Web design and branded content, using real Bateman assets.',connectionTitle:'Behind the<br><em>scenes, too.</em>',connectionAction:'Explore our expertise',servicesTitle:'Different<br>disciplines.<br><em>One direction.</em>',projectEyebrow:'A good beginning',projectTitle:'What would you<br>like to set<br><em>in motion?</em>',whatsappBrief:'Open in WhatsApp',footerLine:'Strategy. Creativity. Technology.',serviceAction:'This fits my project',engagementAction:'This fits my brief',selected:'Selected',chosenService:'Selected expertise',chosenEngagement:'Working together',goalGroup:'Choose your ambition',stepGroup:'Explore the process',caseGroup:'Explore the Bateman case',decisionNote:'You have explored the review controls in the example. We agree the actual checkpoints together for a real project.',briefSubject:'A project for SlimService',briefOpening:'Hello SlimService, I would like to discuss my project.',briefClosing:'Let’s discuss a suitable first step.'}
  };
  const t=k=>copy[state.locale][k], e=k=>extra[state.locale][k];
  let scrollFrame=0,pendingFocusStep=null,modalOpener=null,lastStep=-1,pendingSeek=null;
  const staticMode=()=>reduced.matches||compact.matches;
  const icon=id=>`<svg aria-hidden="true"><use href="#${id}"/></svg>`;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const smooth=(a,b,x)=>{const p=clamp((x-a)/(b-a));return p*p*(3-2*p);};
  function announce(text){$('#announcement').textContent=text;}
  function setScene(){window.SlimScene?.set({step:state.step,goal:state.goal,locale:state.locale,progress:state.step/4});}
  function renderStep(){
    const s=t('processSteps')[state.step];
    $('#process-title').textContent=s.title;$('#process-description').textContent=s.description;$('#process-deliverable').textContent=s.deliverable;
    $('.step-count').textContent=String(state.step+1).padStart(2,'0');$('.scene-counter').textContent=`0${state.step+1} / 05`;
    $$('.step-rail button').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===state.step));b.tabIndex=i===state.step?0:-1;});
    $('.process-copy').setAttribute('aria-labelledby',`process-tab-${state.step}`);
    setScene();
  }
  function updateScroll(){
    scrollFrame=0;const rect=hero.getBoundingClientRect();
    const p=staticMode()?0:clamp(-rect.top/Math.max(1,hero.offsetHeight-innerHeight));
    const intro=staticMode()?(state.step===0?1:0):1-smooth(.05,.16,p);
    const story=staticMode()?(state.step===0?0:1):smooth(.11,.22,p);
    sticky.style.setProperty('--intro',intro.toFixed(3));sticky.style.setProperty('--story',story.toFixed(3));
    sticky.dataset.tone=story>.4?'dark':'light';sticky.dataset.static=String(staticMode());
    const cue=staticMode()?(state.locale==='nl'?'Kies een stap. Verken de werkwijze.':'Choose a step. Explore the process.'):e('scrollLabel');
    if($('.scroll-label').textContent!==cue)$('.scroll-label').textContent=cue;
    $('.hero-copy').inert=intro<.1;$('.hero-copy').setAttribute('aria-hidden',String(intro<.1));
    $('.process-copy').inert=story<.1;$('.process-copy').setAttribute('aria-hidden',String(story<.1));
    if(!staticMode())state.step=Math.min(4,Math.floor(p*5));
    if(lastStep!==state.step){lastStep=state.step;renderStep();}
    if(pendingFocusStep!==null && (staticMode()||(state.step===pendingFocusStep&&Math.abs(p-(pendingFocusStep+.45)/5)<.025))){const target=pendingFocusStep;pendingFocusStep=null;$(`#process-tab-${target}`).focus({preventScroll:true});}
  }
  function chooseStep(i,keyboard=false){
    state.step=clamp(i,0,4);lastStep=state.step;renderStep();
    if(staticMode()){updateScroll();if(keyboard)$(`#process-tab-${state.step}`).focus({preventScroll:true});return;}
    const top=scrollY+hero.getBoundingClientRect().top;
    window.scrollTo({top:top+(hero.offsetHeight-innerHeight)*(state.step+.45)/5,behavior:reduced.matches?'instant':'smooth'});
    if(keyboard)$(`#process-tab-${state.step}`).focus({preventScroll:true});
  }
  function renderCollections(){
    $('.step-rail').innerHTML=t('processSteps').map((s,i)=>`<button type="button" id="process-tab-${i}" role="tab" data-process="${i}" aria-controls="process-panel" aria-selected="${i===state.step}" tabindex="${i===state.step?0:-1}"><span>0${i+1}</span><span>${s.name}</span></button>`).join('');
    $('.step-rail').setAttribute('aria-label',e('stepGroup'));
    $('.goal-tabs').innerHTML=Object.entries(t('goals')).map(([id,g])=>`<button type="button" id="goal-${id}" role="tab" data-goal="${id}" aria-controls="goal-panel" aria-selected="${id===state.goal}" tabindex="${id===state.goal?0:-1}">${g.label}</button>`).join('');
    $('.goal-tabs').setAttribute('aria-label',e('goalGroup'));
    $('.brief-goals').innerHTML=Object.entries(t('goals')).map(([id,g])=>`<button type="button" data-goal="${id}" aria-pressed="${id===state.goal}">${g.label}</button>`).join('');
    $('#service-list').innerHTML=t('services').map(s=>`<article class="service-row"><button type="button" id="service-button-${s.id}" data-service-toggle="${s.id}" aria-expanded="${s.id==='web'}" aria-controls="service-${s.id}"><span class="service-icon">${icon({strategy:'icon-strategy',web:'icon-web',content:'icon-content',systems:'icon-system'}[s.id])}</span><span class="service-name">${s.name}</span>${icon('plus')}</button><div class="service-detail" id="service-${s.id}" ${s.id==='web'?'':'hidden'}><p>${s.description}</p><ul>${s.deliverables.map(x=>`<li>${x}</li>`).join('')}</ul><a class="text-cta" href="#project" data-service-select="${s.id}"><span>${e('serviceAction')}</span>${icon('diagonal')}</a></div></article>`).join('');
    $('.engagement-list').innerHTML=t('engagements').map((s,i)=>`<article class="engagement-item" data-engagement-item="${s.id}" data-selected="${state.engagement===s.id}"><div class="number">0${i+1}</div><h3>${s.name}</h3><p>${s.description}</p><button type="button" data-engagement="${s.id}" aria-pressed="${state.engagement===s.id}"><span>${state.engagement===s.id?e('selected'):e('engagementAction')}</span>${icon('diagonal')}</button></article>`).join('');
    const when=$('#when').value||'exploring';$('#when').innerHTML=t('brief').whenOptions.map(o=>`<option value="${o.value}">${o.label}</option>`).join('');$('#when').value=when;
    renderGoal();renderSelectionContext();renderStep();
  }
  function renderGoal(){
    const g=t('goals')[state.goal];$('#goal-title').textContent=g.title;$('#goal-description').textContent=g.description;
    $('.goal-panel').setAttribute('aria-labelledby',`goal-${state.goal}`);
    $$('[data-goal]').forEach(b=>{const on=b.dataset.goal===state.goal;if(b.getAttribute('role')==='tab'){b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;}else b.setAttribute('aria-pressed',String(on));});
    setScene();if(!$('.brief-result').hidden)renderBrief();
  }
  function chooseGoal(goal,announceChoice=false){
    if(!t('goals')[goal])return;
    if(state.goal!==goal){state.decision=null;announce('');}
    state.goal=goal;renderGoal();
    if(announceChoice)announce(t('goals')[goal].label);
  }
  function renderSelectionContext(){
    const details=[];const service=t('services').find(s=>s.id===state.service),eng=t('engagements').find(s=>s.id===state.engagement);
    if(service)details.push(`${e('chosenService')}: ${service.name}`);if(eng)details.push(`${e('chosenEngagement')}: ${eng.name}`);
    $('.selection-context').textContent=details.join(' · ');$('.selection-context').hidden=!details.length;
  }
  function setLocale(locale,remember=false){
    state.locale=['nl','en'].includes(locale)?locale:'nl';document.documentElement.lang=state.locale;
    $('.brief-status').textContent='';
    document.title=state.locale==='nl'?'SlimService | Sterk zichtbaar. Slim verbonden.':'SlimService | Built to stand out. Made to connect.';
    $('meta[name="description"]').content=t('heroIntro');
    $$('[data-i18n]').forEach(el=>{if(t(el.dataset.i18n)!==undefined)el.textContent=t(el.dataset.i18n);});
    $$('[data-copy]').forEach(el=>el.innerHTML=e(el.dataset.copy));
    $$('[data-i18n-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nLabel)));
    $$('[data-i18n-alt]').forEach(el=>el.alt=t(el.dataset.i18nAlt));
    $$('[data-brief]').forEach(el=>el.textContent=t('brief')[el.dataset.brief]||'');
    $$('[data-placeholder]').forEach(el=>el.placeholder=t('brief')[el.dataset.placeholder]);
    $$('[data-locale]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.locale===state.locale)));
    renderCollections();selectChannel(state.channel);renderPlayer();
    window.SlimShowcase?.setLocale(state.locale);
    if(!$('.brief-result').hidden)renderBrief();
    if(remember){try{localStorage.setItem('slimservice-studio-locale',state.locale);}catch{}const url=new URL(location.href);url.searchParams.set('lang',state.locale);history.replaceState(null,'',url);announce(t('localeAnnouncement'));}
    updateScroll();
  }
  function goTo(id,focus=true){const target=$(id);if(!target)return;video.pause();if(focus){if(!target.hasAttribute('tabindex'))target.tabIndex=-1;target.focus({preventScroll:true});}target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});history.replaceState(null,'',location.pathname+location.search+id);}
  function keyboardTabs(event,selector,choose){
    const items=$$(selector),index=items.indexOf(event.target);if(index<0)return;
    let next;if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%items.length;if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index+items.length-1)%items.length;if(event.key==='Home')next=0;if(event.key==='End')next=items.length-1;if(next===undefined)return;
    event.preventDefault();items[next].focus({preventScroll:true});choose(items[next]);
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('button,a');if(!b)return;
    if(b.dataset.locale)setLocale(b.dataset.locale,true);
    if(b.dataset.process!==undefined)chooseStep(Number(b.dataset.process));
    if(b.dataset.goal)chooseGoal(b.dataset.goal,true);
    if(b.dataset.serviceToggle){const panel=$(`#service-${b.dataset.serviceToggle}`),open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));panel.hidden=open;}
    if(b.dataset.serviceSelect){state.service=b.dataset.serviceSelect;renderSelectionContext();if(!$('.brief-result').hidden)renderBrief();}
    if(b.dataset.engagement){state.engagement=b.dataset.engagement;renderCollections();goTo('#project');}
    if(b.dataset.channel)selectChannel(b.dataset.channel);
    if(b.matches('a[href^="#"]')){event.preventDefault();goTo(b.getAttribute('href'));}
  });
  document.addEventListener('keydown',event=>{
    keyboardTabs(event,'.step-rail button',b=>chooseStep(Number(b.dataset.process),true));
    keyboardTabs(event,'.goal-tabs button',b=>chooseGoal(b.dataset.goal));
    keyboardTabs(event,'.channels button',b=>selectChannel(b.dataset.channel));
    if(event.key==='Escape'&&document.fullscreenElement===video)document.exitFullscreen().catch(()=>{});
  });
  $('.explore-process').addEventListener('click',()=>{pendingFocusStep=1;chooseStep(1);});
  window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});reduced.addEventListener('change',()=>{video.pause();updateScroll();});compact.addEventListener('change',updateScroll);
  window.addEventListener('studio:decision',event=>{if(event.detail.goal!==state.goal)return;const changed=state.decision!==event.detail.decision;state.decision=event.detail.decision;if(changed)announce(e('decisionNote'));});
  window.addEventListener('studio:inquiry',()=>announce(state.locale==='nl'?'Voorbeeldaanvraag voorbereid. Je kunt nu het controlepunt verkennen.':'Example enquiry prepared. You can now explore the review checkpoint.'));
  function selectChannel(channel){
    if(!['instagram','tiktok','facebook'].includes(channel))return;state.channel=channel;
    $$('.channels button').forEach(b=>{const active=b.dataset.channel===channel;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
    const frame=$('#social-preview');frame.dataset.channel=channel;frame.setAttribute('aria-labelledby',`channel-${channel}`);
    $('.profile-context').textContent=t('channelContext')[channel];$('.platform-name').textContent={instagram:'IG',tiktok:'TT',facebook:'FB'}[channel];
  }
  const time=v=>`${Math.floor(v/60)}:${String(Math.floor(v%60)).padStart(2,'0')}`;
  function renderPlayer(){
    const playing=!video.paused&&!video.ended;$('.video-window').classList.toggle('playing',playing);
    $$('[data-action="play"]').forEach(b=>{b.setAttribute('aria-label',t(playing?'pauseLabel':'playLabel'));b.querySelector('use').setAttribute('href',playing?'#pause':'#play');const label=b.querySelector('span');if(label)label.textContent=t(playing?'pause':'play');});
    const sound=$('[data-action="sound"]');sound.setAttribute('aria-pressed',String(!video.muted));sound.setAttribute('aria-label',t(video.muted?'unmuteLabel':'muteLabel'));sound.querySelector('use').setAttribute('href',video.muted?'#mute':'#sound');sound.querySelector('span').textContent=t(video.muted?'sound':'soundOn');
    $('[data-action="replay"]').setAttribute('aria-label',t('replayLabel'));$('[data-action="full"]').setAttribute('aria-label',t('fullLabel'));renderTime();
  }
  function renderTime(){const duration=Number.isFinite(video.duration)?video.duration:17.417;$('#video-progress').max=duration;$('#video-progress').value=video.currentTime;$('#video-progress').setAttribute('aria-valuetext',`${time(video.currentTime)} ${t('of')} ${time(duration)}`);$('#video-time').textContent=`${time(video.currentTime)} / ${time(duration)}`;}
  function loadVideo(){if(!video.getAttribute('src'))video.src='assets/bateman-reel.mp4';}
  function mediaError(key){const p=$('.media-error');p.replaceChildren(document.createTextNode(t(key)));const a=document.createElement('a');a.href='assets/bateman-reel.mp4';a.textContent=t('openOriginal');p.append(a);p.hidden=false;}
  async function play(replay=false){loadVideo();if(video.error)video.load();$('.media-error').hidden=true;if(replay||video.ended)video.currentTime=0;try{await video.play();}catch(err){if(err.name!=='AbortError')mediaError('playError');}renderPlayer();}
  $$('[data-action]').forEach(b=>b.addEventListener('click',async()=>{
    const a=b.dataset.action;if(a==='play'){if(video.paused)await play();else video.pause();}
    if(a==='sound')video.muted=!video.muted;if(a==='replay')await play(true);
    if(a==='full'){loadVideo();video.controls=true;try{if(video.requestFullscreen)await video.requestFullscreen();else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();else throw new Error('unsupported');}catch{video.controls=false;mediaError('fullError');}}
  }));
  ['play','pause','ended','seeked','volumechange','loadedmetadata'].forEach(n=>video.addEventListener(n,renderPlayer));video.addEventListener('timeupdate',renderTime);video.addEventListener('error',()=>mediaError('mediaError'));
  $('#video-progress').addEventListener('input',event=>{pendingSeek=Number(event.target.value);video.preload='metadata';loadVideo();if(video.readyState>0){video.currentTime=pendingSeek;pendingSeek=null;}});
  video.addEventListener('loadedmetadata',()=>{if(pendingSeek!==null){video.currentTime=pendingSeek;pendingSeek=null;}});
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement){video.controls=false;$('[data-action="full"]').focus({preventScroll:true});}});video.addEventListener('webkitendfullscreen',()=>video.controls=false);
  new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)video.pause();},{threshold:0}).observe(video);document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
  const dialog=$('.website-dialog');$('[data-open-website]').addEventListener('click',event=>{modalOpener=event.currentTarget;video.pause();dialog.showModal();$('.dialog-close').focus({preventScroll:true});});$('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>modalOpener?.focus({preventScroll:true}));dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  function briefText(){
    const b=t('brief'),service=t('services').find(s=>s.id===state.service),eng=t('engagements').find(s=>s.id===state.engagement),when=b.whenOptions.find(o=>o.value===$('#when').value)?.label;
    const lines=[e('briefOpening'),'',`${b.summaryGoal}: ${t('goals')[state.goal].label}`,`${b.summaryBusiness}: ${$('#business').value.trim()||b.summaryMissing}`,`${b.summaryNeed}: ${$('#need').value.trim()||b.summaryMissing}`,`${b.summaryWhen}: ${when||b.summaryMissing}`];
    if(service)lines.push(`${e('chosenService')}: ${service.name}`);if(eng)lines.push(`${e('chosenEngagement')}: ${eng.name}`);lines.push('',e('briefClosing'));return lines.join('\n');
  }
  function renderBrief(){const text=briefText();$('.brief-status').textContent='';$('#brief-text').textContent=text;$('#email-brief').href=`mailto:hello@slimservice.nl?subject=${encodeURIComponent(e('briefSubject'))}&body=${encodeURIComponent(text)}`;$('#whatsapp-brief').href=`https://wa.me/31687699731?text=${encodeURIComponent(text)}`;}
  $('#brief-form').addEventListener('submit',event=>{event.preventDefault();['business','need'].forEach(id=>{const field=$('#'+id);field.setCustomValidity(field.value.trim()?'':t('brief')[id==='business'?'validationBusiness':'validationNeed']);});if(!event.currentTarget.reportValidity())return;renderBrief();$('#brief-form').hidden=true;$('.brief-result').hidden=false;$('#brief-text').focus({preventScroll:true});$('.brief-result').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});});
  ['business','need'].forEach(id=>{$('#'+id).addEventListener('invalid',()=>$('#'+id).setCustomValidity(t('brief')[id==='business'?'validationBusiness':'validationNeed']));$('#'+id).addEventListener('input',()=>$('#'+id).setCustomValidity(''));});
  $('.edit-brief').addEventListener('click',()=>{$('.brief-status').textContent='';$('.brief-result').hidden=true;$('#brief-form').hidden=false;$('#business').focus({preventScroll:true});});
  $('.copy-brief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(briefText());$('.brief-status').textContent=t('brief').copied;}catch{$('.brief-status').textContent=t('brief').copyFailed;}});
  $('.download-brief').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([briefText()],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=t('brief').downloadFilename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('.brief-status').textContent=t('brief').downloaded;});
  let locale=new URLSearchParams(location.search).get('lang');if(!['nl','en'].includes(locale)){try{locale=localStorage.getItem('slimservice-studio-locale');}catch{}}setLocale(locale||'nl');
})();
