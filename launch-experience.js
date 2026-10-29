'use strict';
(() => {
  const root=document.querySelector('.showcase');
  if(!root)return;
  const icon=id=>`<svg aria-hidden="true"><use href="#${id}"/></svg>`;
  const words={
    nl:{label:'Wat wil jij bereiken?',tabs:['Meer aanvragen','Sterker merk','Slimmer werken'],title:'Van ambitie<br>naar <em>ervaring.</em>',intro:'Kies wat je wilt veranderen. Ontdek hoe ontwerp, content en techniek samen het verschil kunnen maken.',
      paths:{web:['Aandacht','Vertrouwen','Een aanvraag'],content:['Een eigen verhaal','Herkenbaar beeld','Op ieder kanaal'],systems:['Een aanvraag','Een beslissing','Een volgende stap']},
      next:'En na die eerste klik?',nextButton:'Verken de opvolging',brandTop:'Eén merk. Elk detail.',brandTitle:'Herkenbaar.<br>Overal.',brandBottom:'Website. Beeld. Beweging.',
      modeNames:{web:'Webdesign & conversie',content:'Merk & content',systems:'Systemen & controle'},
      outcomes:{web:['Maak van kijken<br><em>interesse.</em>','Een helder verhaal, werk dat vertrouwen geeft en een eenvoudige route naar contact. Zo krijgt een mooie website een duidelijke taak.'],content:['Geef je merk<br><em>een eigen gezicht.</em>','Van de eerste indruk op je website tot het beeld op social media. De vorm verandert. Je bedrijf blijft herkenbaar.'],systems:['Laat het achter<br><em>de schermen kloppen.</em>','Test de route van een aanvraag. Kies een onderwerp, bekijk de informatie en bepaal zelf of de volgende stap door mag.']},
      topic:'De voorbeeldaanvraag gaat over',options:['Een nieuwe website','Merk & content','Een slimmer werkproces'],demoRequest:'Gekozen vraag',demoReady:'Kies een onderwerp en volg wat er met de aanvraag gebeurt.',demoReview:'De aanvraag ligt klaar. Bekijk het onderwerp en beslis of we een kennismaking voorbereiden.',demoApproved:'Een kennismaking voorbereiden: dit is de afgesproken volgende stap in deze demo.',demoRevise:'De aanvraag gaat terug voor verduidelijking. De volgende stap blijft geblokkeerd.',
      caseLabel:'In de praktijk / Bateman Construction',caseTitle:'Eén herkenbaar verhaal.',caseParts:[['De vraag','Een bouwbedrijf overtuigend presenteren aan nieuwe opdrachtgevers.'],['Onze bijdrage','Webdesign, de digitale presentatie en de samenhang tussen merk en beeld.'],['Het resultaat','Een website-uitwerking en bestaande hero-film die hetzelfde bedrijf herkenbaar laten zien.']],caseLink:'Bekijk de website-uitwerking',silent:'Zonder geluid',deliverable:'Wat je ontvangt'},
    en:{label:'What would you like to change?',tabs:['More enquiries','A stronger identity','Smarter operations'],title:'From ambition<br>to <em>experience.</em>',intro:'Choose your next move. Explore how design, content and technology can work together for your business.',
      paths:{web:['Attention','Confidence','An enquiry'],content:['Your own story','Recognisable imagery','Across channels'],systems:['An enquiry','A decision','The next step']},
      next:'And after that first click?',nextButton:'Explore the follow-up',brandTop:'One identity. Every detail.',brandTitle:'Recognisable.<br>Everywhere.',brandBottom:'Website. Imagery. Motion.',
      modeNames:{web:'Web design & conversion',content:'Identity & content',systems:'Systems & control'},
      outcomes:{web:['Turn attention<br><em>into interest.</em>','A clear story, work that builds confidence and an easy route to contact. Give a well-designed website a purpose.'],content:['Give your brand<br><em>its own presence.</em>','From the first impression on your website to your presence on social media. The format changes. Your business stays recognisable.'],systems:['Make it work<br><em>behind the scenes.</em>','Try the enquiry journey. Choose a topic, review the information and decide whether the next step can proceed.']},
      topic:'The sample enquiry is about',options:['A new website','Identity & content','A smarter workflow'],demoRequest:'Selected enquiry',demoReady:'Choose a topic and follow what happens to the enquiry.',demoReview:'The enquiry is ready for review. Check the topic and decide whether to prepare an introduction.',demoApproved:'Prepare an introduction: this is the agreed next step in this demonstration.',demoRevise:'The enquiry goes back for clarification. The next step stays on hold.',
      caseLabel:'In practice / Bateman Construction',caseTitle:'One recognisable story.',caseParts:[['The question','Present a construction business convincingly to prospective clients.'],['Our contribution','Web design, the digital presentation and a coherent approach to identity and imagery.'],['The result','A website design and existing hero film that present the same recognisable business.']],caseLink:'Explore the website design',silent:'No audio',deliverable:'What you receive'}
  };
  const source=root.querySelector('.sc-sources');
  source.innerHTML='<div class="identity-board"><span class="identity-board-label"></span><strong></strong><div class="identity-bars" aria-hidden="true"><i></i><i></i><i></i></div><span class="identity-board-foot"></span></div>';
  source.setAttribute('aria-hidden','true');
  const route=document.createElement('div');route.className='experience-route';route.setAttribute('aria-live','polite');root.querySelector('.showcase-toolbar').after(route);
  const intent=document.createElement('div');intent.className='experience-intent';root.querySelector('.showcase-stage').prepend(intent);
  const follow=document.createElement('button');follow.type='button';follow.className='experience-follow';follow.dataset.showcaseMode='systems';root.querySelector('.showcase-stage').append(follow);
  const topic=document.createElement('label');topic.className='demo-topic';topic.innerHTML='<span></span><select id="demo-topic"></select>';root.querySelector('.sc-flow-track').before(topic);
  const receipt=document.createElement('p');receipt.className='demo-receipt';root.querySelector('.sc-flow-interaction').before(receipt);
  const caseBlock=document.createElement('div');caseBlock.className='case-proof';root.querySelector('.showcase-evidence').before(caseBlock);
  let locale=document.documentElement.lang,topicIndex=0;
  function render(){
    const c=words[locale],s=window.SlimShowcase.state,mode=s.mode;
    root.querySelector('[data-showcase-copy="title"]').innerHTML=c.title;
    root.querySelector('[data-showcase-copy="intro"]').textContent=c.intro;
    root.querySelector('.showcase-tabs').setAttribute('aria-label',c.label);
    root.querySelectorAll('.showcase-tabs button').forEach((b,i)=>b.querySelector('span').textContent=c.tabs[i]);
    route.innerHTML=c.paths[mode].map((p,i)=>`<span><b>0${i+1}</b>${p}</span>${i<2?icon('arrow'):''}`).join('');
    intent.innerHTML=`<span>${icon({web:'icon-web',content:'icon-content',systems:'icon-system'}[mode])}${c.modeNames[mode]}</span><h3>${c.outcomes[mode][0].replaceAll('<br>','<br> ')}</h3><p>${c.outcomes[mode][1]}</p>`;
    source.querySelector('.identity-board-label').textContent=c.brandTop;source.querySelector('strong').innerHTML=c.brandTitle;source.querySelector('.identity-board-foot').textContent=c.brandBottom;
    follow.innerHTML=`<span>${c.next}<strong>${c.nextButton}</strong></span>${icon('arrow')}`;follow.hidden=mode!=='web';
    const select=topic.querySelector('select');topic.querySelector('span').textContent=c.topic;
    if(select.dataset.locale!==locale){select.innerHTML=c.options.map((o,i)=>`<option value="${i}">${o}</option>`).join('');select.value=String(topicIndex);select.dataset.locale=locale;}
    select.disabled=s.phase!=='ready';
    receipt.textContent=`${c.demoRequest}: ${c.options[topicIndex]}`;receipt.hidden=s.phase==='ready';
    root.querySelector('.sc-flow-message').textContent=c[{ready:'demoReady',review:'demoReview',approved:'demoApproved',revise:'demoRevise'}[s.phase]];
    const caseOpen=caseBlock.querySelector('details')?.open||false;
    caseBlock.innerHTML=`<details ${caseOpen?'open':''}><summary><span>${c.caseLabel}</span><strong>${c.caseTitle}</strong>${icon('plus')}</summary><div class="case-proof-body">${c.caseParts.map(([h,p])=>`<div><h4>${h}</h4><p>${p}</p></div>`).join('')}<button type="button" class="text-cta" data-case-open>${c.caseLink}${icon('diagonal')}</button></div></details>`;
    document.querySelectorAll('.engagement-item').forEach((el,i)=>{
      const data=window.STUDIO_COPY[locale].engagements[i];
      let p=el.querySelector('.engagement-output');if(!p){p=document.createElement('div');p.className='engagement-output';el.querySelector('button').before(p);}
      p.innerHTML=`${icon(['icon-strategy','icon-web','icon-link'][i])}<p><strong>${c.deliverable}</strong><span>${data.output}</span></p>`;
    });
    const silent=document.querySelector('.silent-label');if(silent)silent.textContent=c.silent;
  }
  topic.querySelector('select').addEventListener('change',e=>{topicIndex=Number(e.target.value);render();});
  root.addEventListener('click',e=>{const opener=e.target.closest('[data-case-open]');if(opener)window.dispatchEvent(new CustomEvent('studio:open-website',{detail:{opener}}));if(e.target.closest('.experience-follow'))root.querySelector('.showcase-stage').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});});
  const originalMode=window.SlimShowcase.setMode,originalLocale=window.SlimShowcase.setLocale;
  window.SlimShowcase.setMode=mode=>{originalMode(mode);render();};
  window.SlimShowcase.setLocale=lang=>{originalLocale(lang);locale=lang;render();};
  // These attributes are the shared state of the already accessible showcase.
  new MutationObserver(render).observe(root,{attributes:true,attributeFilter:['data-mode','data-exploded']});
  new MutationObserver(render).observe(root.querySelector('.sc-workflow'),{attributes:true,attributeFilter:['data-phase']});
  new MutationObserver(()=>{locale=document.documentElement.lang;render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new MutationObserver(render).observe(document.querySelector('.engagement-list'),{childList:true});
  document.addEventListener('click',e=>{
    const cta=e.target.closest('.showcase-cta');if(cta){const mode=window.SlimShowcase.state.mode;document.querySelector(`.brief-goals [data-goal="${{web:'enquiries',content:'visibility',systems:'operations'}[mode]}"]`)?.click();}
    const goal=e.target.closest('.goal-tabs [data-goal]');if(goal)window.SlimShowcase.setMode({enquiries:'web',visibility:'content',operations:'systems'}[goal.dataset.goal]);
  });
  render();
})();
