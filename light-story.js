/* Light directs the story. Native document scroll, one WebGL scene, real HTML. */
'use strict';
(() => {
  const main = document.querySelector('main');
  if (!main) return;
  const $ = s => document.querySelector(s);
  const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
  const copy = {
    nl: {
      title: 'Sterk zichtbaar.<br><em>Slim verbonden.</em>',
      intro: 'We ontwerpen merken en websites die overtuigen. En bouwen de systemen die het werk erachter makkelijker maken.',
      explore: 'Volg het licht', skip: 'Direct naar onze expertise', scroll: 'Scroll om te ontdekken',
      chapters: ['Het begint hier', 'Bateman: website', 'Bateman: merk & content', 'De Bakfietsmaat', 'Van ontwerp naar toepassing'],
      stageLabel: 'Verken SlimService in vier hoofdstukken', own: 'Light Study 01 · Een eigen ontwerpstudie', labDrawer:'Achter het licht: verken onze ontwerpstudie',
      brandTitle: 'Een merk dat<br><em>je werk laat spreken.</em>',
      brandBody: 'Laat eerst het vakwerk zien. Echte projectbeelden, herkenbare merkdetails en een directe contactroute geven bezoekers vertrouwen om de volgende stap te zetten.',
      brandNote: 'Bateman Construction · Originele merkassets', brandCaption: 'Eén identiteit. In ieder detail.',
      brandType: 'Typografie', brandCharacter: 'Karakter', brandPalette: 'Kleur',
      workTitle: 'Van een volle lading.<br><em>Naar een heldere aanvraag.</em>',
      batemanBody: 'Batemans werk krijgt de ruimte. Een eigen merk, een duidelijke website en bewegend beeld vertellen hetzelfde verhaal.',
      bakfietsBody: 'Van interesse naar een concrete vraag. Kies een lading en zie hoe die keuze meegaat naar de aanvraag. Minder uitleg vooraf, meer houvast voor het gesprek.',
      batemanScope: 'Webdesign · Merkuitwerking · Content', bakfietsScope: 'Merkidentiteit · Webdesign · Interactie',
      visit: 'Bezoek de website', detail: 'Bekijk merk & content', websiteNote: 'Werkelijk ontworpen websites',
      contentTitle: 'Eén eigen karakter.<br><em>Overal herkenbaar.</em>',
      contentBody: 'Herkenning stopt niet bij de website. Logo, letters, kleur, badge en film vormen één beeldtaal. Zo blijft hetzelfde vakmanschap zichtbaar, op ieder kanaal.',
      contentNote: 'Bateman Construction · Bestaande hero-film', contentStill: 'Van een eigen beeldtaal naar bewegend beeld.',
      play: 'Speel de film', pause: 'Pauzeer de film', channels: 'Verken de kanaalvoorbeelden',
      videoError: 'De film is niet beschikbaar. Het oorspronkelijke beeld blijft zichtbaar.',
      systemsTitle: 'Ontwerp wordt een<br><em>werkend hulpmiddel.</em>',
      systemsBody: 'Een materiaal kiezen, een lading samenstellen of een aanvraag voorbereiden. Interactie maakt je aanbod begrijpelijk en helpt iemand een volgende stap te zetten.',
      material: 'Materiaal', light: 'Lichtsterkte', rotation: 'Draai het object', aluminium: 'Aluminium', bronze: 'Brons', graphite: 'Grafiet',
      configTitle: 'Kies jouw toepassing.', configSubtitle: 'Waar kan interactie jouw bedrijf helpen?', labControls:'Verken materiaal & licht', usecases:{web:'Je merk laten ervaren',content:'Meer uit je content halen',systems:'Van keuze naar aanvraag'}, usecaseBodies:{web:'Een website of productpresentatie waarin bezoekers ontdekken wat jouw aanbod bijzonder maakt.',content:'Een herkenbare visuele basis die doorwerkt naar je website, campagnes en social media.',systems:'Een configurator die keuzes bundelt tot een duidelijke aanvraag, met minder handmatig overtypen.'},
      flow: ['Jouw keuze', 'Een helder overzicht', 'Klaar voor contact'],
      configure: 'Bespreek deze mogelijkheid', configNote: 'De lamp is onze eigen ontwerpstudie. We ontwerpen de toepassing rond jouw bedrijf.',
      configured: 'Je keuzes staan in je aanvraagoverzicht. Er is niets verstuurd.',
      configBrief: 'Ik wil deze toepassing voor mijn bedrijf bespreken:',
      nextTitle: 'En nu:<br><em>jouw bedrijf.</em>', nextBody: 'Van één gerichte verbetering tot een complete digitale ervaring. We brengen samen wat jouw bedrijf nodig heeft.',
      next: 'Ontdek onze expertise', motionOff: 'Zonder scrollbeweging', motionOn: 'Scrollbeweging aan',
      loading: 'De lichtstudie wordt geladen.', fallback: '3D is hier niet beschikbaar. Je kunt het volledige verhaal en alle voorbeelden blijven verkennen.',
      retry: 'Probeer 3D opnieuw', current: 'Huidig hoofdstuk', previous: 'Vorig hoofdstuk', following: 'Volgend hoofdstuk',
      videoLabel: 'Bestaande Bateman-hero-film', screenAlt: 'Bateman Construction, ontworpen website', bikeAlt: 'De Bakfietsmaat, ontworpen website'
    },
    en: {
      title: 'Built to stand out.<br><em>Made to connect.</em>',
      intro: 'We design brands and websites that make an impression. And build the systems that make the work behind them easier.',
      explore: 'Follow the light', skip: 'Go straight to our expertise', scroll: 'Scroll to discover',
      chapters: ['It starts here', 'Bateman: website', 'Bateman: brand & content', 'De Bakfietsmaat', 'From design to application'],
      stageLabel: 'Explore SlimService in four chapters', own: 'Light Study 01 · An independent design study', labDrawer:'Behind the light: explore our design study',
      brandTitle: 'A brand that lets<br><em>your work speak.</em>',
      brandBody: 'Show the craft first. Real project imagery, distinctive brand details and a direct contact route give visitors the confidence to take the next step.',
      brandNote: 'Bateman Construction · Original brand assets', brandCaption: 'One identity. In every detail.',
      brandType: 'Typography', brandCharacter: 'Character', brandPalette: 'Colour',
      workTitle: 'From a full load.<br><em>To a clear enquiry.</em>',
      batemanBody: 'A distinctive identity and website that put Bateman’s work first. Moving imagery carries the same character across its digital presence.',
      bakfietsBody: 'Turn interest into a specific question. Choose a load and see that choice travel into the enquiry. Less explaining upfront, a clearer starting point for the conversation.',
      batemanScope: 'Web design · Brand expression · Content', bakfietsScope: 'Brand identity · Web design · Interaction',
      visit: 'Visit the website', detail: 'Explore identity & content', websiteNote: 'Real websites we designed',
      contentTitle: 'One distinct character.<br><em>Recognisable everywhere.</em>',
      contentBody: 'Recognition goes beyond the website. Logo, type, colour, badge and film form one visual language. The same craftsmanship comes through on every channel.',
      contentNote: 'Bateman Construction · Existing hero film', contentStill: 'A distinctive visual identity, brought into motion.',
      play: 'Play the film', pause: 'Pause the film', channels: 'Explore the channel previews',
      videoError: 'The film is unavailable. You can still view the original imagery.',
      systemsTitle: 'Design becomes<br><em>a working tool.</em>',
      systemsBody: 'Choose a material, put together a load or prepare an enquiry. Interaction makes your offer easier to understand and helps someone take the next step.',
      material: 'Material', light: 'Light intensity', rotation: 'Rotate the object', aluminium: 'Aluminium', bronze: 'Bronze', graphite: 'Graphite',
      configTitle: 'Choose your application.', configSubtitle: 'Where could interaction help your business?', labControls:'Explore material & light', usecases:{web:'Bring your brand to life',content:'Make more of your content',systems:'Turn choices into enquiries'}, usecaseBodies:{web:'A website or product experience that helps visitors discover what makes your offer distinctive.',content:'A recognisable visual foundation for your website, campaigns and social content.',systems:'A configurator that brings choices into a clear enquiry, with less information to enter twice.'},
      flow: ['Your choice', 'A clear overview', 'Ready to enquire'],
      configure: 'Discuss this possibility', configNote: 'The lamp is our own design study. We design the application around your business.',
      configured: 'Your choices are included in your brief. Nothing has been sent.',
      configBrief: 'I would like to discuss this application for my business:',
      nextTitle: 'Next:<br><em>your business.</em>', nextBody: 'From one focused improvement to a complete digital experience. We bring together what your business needs.',
      next: 'Explore our expertise', motionOff: 'View without scroll motion', motionOn: 'Enable scroll motion',
      loading: 'Loading the light study.', fallback: '3D is unavailable here. You can still explore the full story and every example.',
      retry: 'Try 3D again', current: 'Current chapter', previous: 'Previous chapter', following: 'Next chapter',
      videoLabel: 'Existing Bateman hero film', screenAlt: 'Bateman Construction, website design', bikeAlt: 'De Bakfietsmaat, website design'
    }
  };
  const text = key => `<span data-light-copy="${key}"></span>`;
  const chapter = (n,title,body,extra='') => `<div class="light-copy"><p class="light-chapter-number">0${n+1}<span data-light-chapter="${n}"></span></p><${n===0?'h1':'h2'} data-light-copy="${title}" id="light-title-${n}"></${n===0?'h1':'h2'}>${n===0?'<figure class="responsive-intro-art" aria-hidden="true"><img src="assets/lab/light-study-01-mobile.webp" width="768" height="432" alt="" decoding="async"></figure>':''}<p class="light-body" data-light-copy="${body}"></p>${extra}</div>`;
  // The final opening is already in the HTML. Hydrate it without replacing the
  // first viewport, so deferred builders never expose an older presentation.
  const story = document.querySelector('[data-light-shell]') || document.createElement('section');
  story.id='top';story.classList.add('light-story');story.setAttribute('aria-label','SlimService');
  if(!story.hasChildNodes())story.innerHTML=`<span class="light-anchor light-anchor-work" id="werk"></span>
  <div class="light-stage" id="light-stage" data-light-phase="0">
    <div class="light-world" aria-hidden="true"><picture><source media="(max-width:760px)" srcset="assets/lab/lamp-first-frame-mobile.webp"><img class="light-world-poster" src="assets/lab/lamp-first-frame.webp" width="2400" height="1000" alt="" fetchpriority="high"></picture><canvas id="light-canvas"></canvas><div class="light-atmosphere"></div><div class="light-beam"></div><div class="light-floor-line"></div></div>
    <div class="light-scenes">
      <article class="light-chapter light-intro" data-light-scene="0" aria-labelledby="light-title-0">
        ${chapter(0,'title','intro',`<button type="button" class="light-action" data-light-jump="1">${text('explore')}${icon('down')}</button><a class="light-skip" href="#expertise">${text('skip')}</a>`)}
        <p class="light-own" data-light-copy="own"></p>
      </article>
      <article class="light-chapter light-brand" data-light-scene="1" aria-labelledby="light-title-1">
        ${chapter(1,'brandTitle','brandBody',`<a class="light-action continuous-first-link" href="https://batemanconstruction.co.uk/" target="_blank" rel="noopener noreferrer">${text('visit')}${icon('diagonal')}</a>`)}
        <figure class="light-surface light-static-bateman" hidden><img src="assets/bateman-website.png" width="1440" height="900" alt="Bateman Construction, ontworpen website" data-light-static-case><figcaption>Bateman Construction</figcaption></figure>
        <figure class="light-surface light-identity" hidden>
          <div class="light-identity-main"><span class="light-panel-kicker">BATEMAN CONSTRUCTION</span><img class="light-identity-logo" src="assets/bateman-logo.webp" alt="Bateman Construction" width="960" height="320"><div class="light-identity-rule"></div><p data-light-copy="brandCaption"></p></div>
          <div class="light-identity-details"><div class="light-identity-type"><span data-light-copy="brandType"></span><strong class="light-barlow">Aa</strong><small>Barlow Condensed</small><strong class="light-instrument">Aa</strong><small>Instrument Serif</small></div><div class="light-identity-character"><span data-light-copy="brandCharacter"></span><img src="assets/trevor-badge.webp" alt="Trevor, Bateman Construction" width="320" height="320"><img src="assets/bateman-duck-hardhat.webp" alt="Bateman brand character" width="480" height="480"></div></div>
          <div class="light-identity-colours" aria-label="Bateman colours"><i></i><i></i><i></i><span data-light-copy="brandNote"></span></div>
        </figure>
      </article>
      <article class="light-chapter light-content" data-light-scene="2" aria-labelledby="light-title-2">
        ${chapter(2,'contentTitle','contentBody',`<button type="button" class="light-action" data-light-dialog>${text('channels')}${icon('diagonal')}</button>`)}
        <div class="light-content-surfaces">
          <figure class="light-content-print"><img class="light-print-logo" src="assets/bateman-logo.webp" alt="Bateman Construction" width="960" height="320"><img src="assets/bateman-hero-poster.webp" alt="Bateman original film image" width="720" height="1280"><figcaption data-light-copy="contentStill"></figcaption></figure>
          <figure class="light-content-film"><div class="light-film-frame"><video playsinline preload="none" muted poster="assets/bateman-hero-poster.webp" data-light-video-label="videoLabel"></video><button class="light-film-play" type="button" data-light-play>${icon('play')}<span data-light-play-label></span></button></div><figcaption><output class="light-film-time" aria-live="off">0:00 / 0:15</output></figcaption><p class="light-video-error" data-light-copy="videoError" hidden></p></figure>
        </div>
      </article>
      <article class="light-chapter light-work" data-light-scene="3" aria-labelledby="light-title-3">
        ${chapter(3,'workTitle','bakfietsBody',`<div class="light-case-choices" role="group" aria-label="Project" hidden><button type="button" data-light-case="bakfiets" aria-pressed="true">De Bakfietsmaat</button></div><p class="light-case-scope"></p><a class="light-action light-case-link" href="https://debakfietsmaat.nl/#laden" target="_blank" rel="noopener noreferrer">${text('visit')}${icon('diagonal')}</a>`)}
        <figure class="light-surface light-website"><div class="light-browser-bar"><span class="light-browser-dots"><i></i><i></i><i></i></span><span class="light-case-domain">debakfietsmaat.nl</span>${icon('diagonal')}</div><img class="light-website-image" src="assets/bakfietsmaat/website.jpg" width="1440" height="900" alt="De Bakfietsmaat, ontworpen website"><figcaption><strong class="light-case-name">De Bakfietsmaat</strong><span data-light-copy="websiteNote"></span></figcaption></figure>
      </article>
      <article class="light-chapter light-systems" data-light-scene="4" aria-labelledby="light-title-4">
        ${chapter(4,'systemsTitle','systemsBody')}
        <div class="light-static-preview" aria-hidden="true"></div>
        <p class="light-preview-status" role="status" hidden><span data-light-copy="fallback"></span><button type="button" data-light-retry data-light-copy="retry"></button></p>
        <div class="light-configuration">
          <div class="light-config-heading"><span>LIGHT STUDY 01</span><h3 data-light-copy="configTitle"></h3><p data-light-copy="configSubtitle"></p></div>
          <div class="light-usecases" role="group">${['web','content','systems'].map((key,i)=>`<button type="button" data-light-usecase="${key}" aria-pressed="${key==='web'}"><span>0${i+1}</span><strong data-light-usecase-label="${key}"></strong>${icon('diagonal')}</button>`).join('')}</div><p class="light-usecase-result"></p><details class="light-lab-controls"><summary data-light-copy="labControls"></summary><fieldset class="light-materials"><legend data-light-copy="material"></legend><div>${['aluminium','bronze','graphite'].map((name,i)=>`<label><input type="radio" name="light-material" value="${name}" ${i===0?'checked':''}><i class="light-swatch light-swatch-${name}"></i>${text(name)}</label>`).join('')}</div></fieldset>
          <label class="light-intensity"><span>${text('light')}<output aria-hidden="true" data-light-output>75%</output></span><input type="range" id="light-intensity" min="0" max="100" value="75" step="1"></label>
          <label class="light-intensity"><span>${text('rotation')}<output aria-hidden="true" data-light-rotation-output>6°</output></span><input type="range" id="light-rotation" min="-180" max="180" value="6" step="1"></label>
          <ol class="light-config-flow">${[0,1,2].map(i=>`<li><i>${i<2?'0'+(i+1):icon('check')}</i><span data-light-flow="${i}"></span></li>`).join('')}</ol>
          <div class="light-config-summary"><span data-light-material-name></span><span data-light-config-intensity>75%</span></div>
          </details><a class="light-action light-config-cta" href="#project" data-service-select="systems">${text('configure')}${icon('diagonal')}</a><p class="light-config-note" data-light-copy="configNote"></p>
        </div>
      </article>
    </div>
    <div class="light-bottom"><div class="light-scroll-cue">${icon('down')}<span data-light-copy="scroll"></span></div><nav class="light-chapters" data-light-nav-label="stageLabel">${[0,1,2,3].map(i=>`<button type="button" data-light-jump="${i}" aria-label="Chapter ${i+1}" aria-current="${i===0?'step':'false'}"><span>0${i+1}</span><i></i></button>`).join('')}</nav><button class="light-motion" type="button" aria-pressed="false">${icon('pause')}<span data-light-motion-label></span></button></div>
    <p class="light-fallback" role="status" hidden><span data-light-copy="fallback"></span><button type="button" data-light-retry data-light-copy="retry"></button></p>
    <div class="light-progress" aria-hidden="true"><span></span></div>
  </div>`;
  main.prepend(story);
  const mobileSystems=document.createElement('details');mobileSystems.id='lab';mobileSystems.className='light-lab-drawer light-static';mobileSystems.innerHTML='<summary><span>SLIMSERVICE LAB / 01</span><strong data-light-copy="labDrawer"></strong><span aria-hidden="true">+</span></summary>';story.after(mobileSystems);
  const stage=$('#light-stage'), canvas=$('#light-canvas'), scenes=[...story.querySelectorAll('[data-light-scene]')],world=story.querySelector('.light-world'),staticPreview=story.querySelector('.light-static-preview'),systems=story.querySelector('.light-systems'),sceneHolder=story.querySelector('.light-scenes'),previewStatus=story.querySelector('.light-preview-status');
  const materialInputs=[...story.querySelectorAll('[name=light-material]')],intensity=$('#light-intensity');
  const rotationInput=$('#light-rotation');let objectRotation=6;
  mobileSystems.append(systems);systems.querySelector('.light-lab-controls').open=true;
  const video=story.querySelector('video'),videoButton=story.querySelector('[data-light-play]');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)'), narrow=matchMedia('(max-width:760px)'), short=matchMedia('(max-height:520px) and (orientation:landscape)');
  let locale=document.documentElement.lang==='en'?'en':'nl';
  let usecase='web',material='aluminium',light=75,selectedCase='bateman',caseManual=false,caseManualOwner=-1,active=0,progress=0,renderer=null,raf=0,nearby=true,manualStill=false,unavailable=false,disposed=false,lastPose='',included=false,includedConfiguration=null,pendingFocus=null,lastStatic=null,lastFlow=null;
  const isStatic=()=>manualStill||reduced.matches||short.matches||unavailable;
  const mobileFlow=()=>narrow.matches&&!isStatic();
  const scrollSpan=()=>3.65;
  const scrollDistance=()=>Math.max(1,story.offsetHeight-stage.clientHeight);
  const inlinePreview=()=>world.parentElement===staticPreview;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
  const mix=(a,b,t)=>a+(b-a)*t;
  const t=k=>copy[locale][k];
  const poses=[
    {rotation:-.10,zoom:.88,orbit:0,lift:0,x:.04,y:-.02,assembly:0,aim:-.1},
    {rotation:-.68,zoom:.50,orbit:.15,lift:0,x:.05,y:.06,assembly:.25,aim:.65},
    {rotation:-1.1,zoom:.48,orbit:.25,lift:0,x:.08,y:.03,assembly:0,aim:.35},
    {rotation:.40,zoom:.48,orbit:-.1,lift:0,x:.12,y:.03,assembly:.12,aim:-.35},
    {rotation:.28,zoom:.46,orbit:.12,lift:.02,x:-.40,y:-.20,assembly:.12,aim:.75}
  ];
  const aperture=window.SlimApertureScene?.create({story,stage,world,scenes});
  function localize(){
    locale=document.documentElement.lang==='en'?'en':'nl';
    story.querySelector('.aperture-plane')?.setAttribute('aria-label',locale==='en'?'Work revealed by light':'Werk in het licht');
    for(const el of document.querySelectorAll('[data-light-copy]')){const value=t(el.dataset.lightCopy);if(value!==undefined)el.innerHTML=value;}
    if(mobileFlow()){
      const titles=locale==='en'?['Craft.<br><em>Made visible.</em>','One identity.<br><em>Everywhere.</em>','Every load.<br><em>A clear enquiry.</em>']:['Vakwerk.<br><em>In beeld.</em>','Eén merk.<br><em>Overal eigen.</em>','Elke lading.<br><em>Een heldere vraag.</em>'];
      titles.forEach((title,i)=>scenes[i+1].querySelector('h2').innerHTML=title);
      scenes[2].querySelector('.light-body').textContent=locale==='en'?'Logo, type, colour and film. One recognisable identity.':'Logo, letters, kleur en film. Eén herkenbaar merk.';
    }
    document.querySelectorAll('[data-light-chapter]').forEach(el=>el.textContent=t('chapters')[+el.dataset.lightChapter]);
    systems.querySelectorAll('[data-light-flow]').forEach(el=>el.textContent=t('flow')[+el.dataset.lightFlow]);
    story.querySelector('[data-light-nav-label]').setAttribute('aria-label',t('stageLabel'));
    story.querySelectorAll('.light-chapters button').forEach((el,i)=>el.setAttribute('aria-label',t('chapters')[i]));
    story.querySelector('.light-case-choices').setAttribute('aria-label',locale==='nl'?'Kies een project':'Choose a project');
    video.setAttribute('aria-label',t('videoLabel'));
    story.querySelector('[data-light-static-case]').alt=t('screenAlt');
    videoButton.querySelector('[data-light-play-label]').textContent=t(video.paused?'play':'pause');
    story.querySelector('[data-light-motion-label]').textContent=t(isStatic()?'motionOn':'motionOff');
    story.querySelector('.light-motion').setAttribute('aria-pressed',String(isStatic()));
    story.querySelector('.light-motion').hidden=reduced.matches||short.matches||unavailable;
    systems.querySelector('.light-usecases').setAttribute('aria-label',t('configSubtitle'));
    systems.querySelectorAll('[data-light-usecase-label]').forEach(el=>el.textContent=t('usecases')[el.dataset.lightUsecaseLabel]);
    syncConfig();syncCase();queue();
  }
  function syncCase(){
    const bike=selectedCase==='bakfiets',name=bike?'De Bakfietsmaat':'Bateman Construction',url=bike?'https://debakfietsmaat.nl/#laden':'https://batemanconstruction.co.uk/';
    story.querySelector('.light-work .light-body').textContent=mobileFlow()?(locale==='en'?'Choose a load. See how that choice becomes a useful enquiry.':'Kies een lading. Zie hoe die keuze een bruikbare aanvraag wordt.'):t('bakfietsBody');
    story.querySelector('.light-case-scope').textContent=t('bakfietsScope');
    story.querySelector('.light-case-link').href='https://debakfietsmaat.nl/#laden';
    story.querySelector('.light-case-domain').textContent=new URL(url).hostname;
    story.querySelector('.light-case-name').textContent=name;
    const image=story.querySelector('.light-website-image');image.src=bike?'assets/bakfietsmaat/website.jpg':'assets/bateman-website.png';image.alt=t(bike?'bikeAlt':'screenAlt');
    story.querySelectorAll('[data-light-case]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lightCase===selectedCase)));
    stage.dataset.case=selectedCase;
  }
  function syncConfig(){
    systems.querySelector('.light-usecase-result').textContent=t('usecaseBodies')[usecase];
    systems.querySelectorAll('[data-light-usecase]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lightUsecase===usecase)));
    systems.querySelector('.light-config-cta').dataset.serviceSelect=usecase;
    systems.querySelector('[data-light-output]').textContent=light+'%';
    systems.querySelector('[data-light-config-intensity]').textContent=light+'% '+(locale==='nl'?'licht':'light');
    systems.querySelector('[data-light-material-name]').textContent=t(material);
    intensity.setAttribute('aria-label',t('light'));intensity.setAttribute('aria-valuetext',light+'%');
    rotationInput.setAttribute('aria-label',t('rotation'));rotationInput.setAttribute('aria-valuetext',objectRotation+'°');systems.querySelector('[data-light-rotation-output]').textContent=objectRotation+'°';
    rotationInput.style.setProperty('--fill',((objectRotation+180)/3.6)+'%');
    intensity.style.setProperty('--fill',light+'%');
    queue();
  }
  function setActive(index){
    const changed=active!==index;
    if(changed&&active===2&&!isStatic())video.pause();active=index;stage.dataset.lightPhase=String(index);
    story.querySelectorAll('.light-chapters button').forEach((el,i)=>el.setAttribute('aria-current',i===index?'step':'false'));
    if(changed&&index>0)window.dispatchEvent(new CustomEvent('slim:case',{detail:{case:index===3?'bakfietsmaat':index===4?'systems':'bateman',index,locale}}));
  }
  function applyMode(){
    const staticView=isStatic(),flow=mobileFlow();if(lastStatic===staticView&&lastFlow===flow)return;
    const restoreChapter=lastStatic!==null&&nearby?active:null;
    story.classList.toggle('light-static',staticView);story.classList.toggle('mobile-spatial',flow);aperture?.setStatic(staticView);aperture?.setCompact(flow);
    story.querySelector('.light-static-bateman').hidden=!staticView;
    if(staticView){selectedCase='bakfiets';syncCase();}
    story.classList.toggle('light-mobile-flow',flow);
    if(staticView)staticPreview.append(world);else stage.prepend(world);
    lastStatic=staticView;lastFlow=flow;lastPose='';
    window.dispatchEvent(new CustomEvent('slim:scene-mode',{detail:{static:staticView,mobile:flow}}));
    if(renderer)renderer.resize(inlinePreview()?staticPreview.clientWidth:stage.clientWidth,staticCanvasHeight(),devicePixelRatio);
    if(restoreChapter!==null)requestAnimationFrame(()=>jump(restoreChapter,false,true));
  }
  function paint(){
    raf=0;if(disposed)return;
    const staticView=isStatic();applyMode();
    const rect=story.getBoundingClientRect(),flow=mobileFlow(),flowRect=mobileSystems.getBoundingClientRect();
    const flowVisible=mobileSystems.open&&flowRect.bottom>0&&flowRect.top<innerHeight;
    nearby=(rect.bottom>0&&rect.top<innerHeight)||flowVisible;
    document.documentElement.classList.toggle('light-on-stage',(rect.top<innerHeight*.5&&rect.bottom>90)||(flowVisible&&flowRect.top<innerHeight*.5));
    if(!staticView){const parent=flowVisible?staticPreview:stage;if(world.parentElement!==parent){if(parent===stage)stage.prepend(world);else parent.append(world);mobileSystems.dataset.renderer=unavailable?'unavailable':renderer?'ready':'';lastPose='';if(renderer)renderer.resize(inlinePreview()?staticPreview.clientWidth:stage.clientWidth,staticCanvasHeight(),devicePixelRatio);}}
    if(staticView){
      scenes.forEach(scene=>{scene.removeAttribute('style');scene.inert=false;scene.removeAttribute('aria-hidden');});
      canvas.style.opacity='';
      const visible=scenes.slice(0,4).map((e,i)=>({i,dist:Math.abs(e.getBoundingClientRect().top-innerHeight*.25)})).sort((a,b)=>a.dist-b.dist)[0];setActive(visible.i);
      if(selectedCase!=='bakfiets'){selectedCase='bakfiets';syncCase();}
      progress=active;stage.style.setProperty('--light-progress',String(active/4));
    }else{
      progress=clamp(-rect.top/scrollDistance())*scrollSpan();
      // Keyboard-operated controls stay readable until their owner leaves them.
      // Explicit chapter navigation releases this hold and focuses its heading.
      const focus=document.activeElement;
      const focusedIndex=pendingFocus===null&&focus?.matches('a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible,[role=tabpanel]:focus-visible')?scenes.slice(0,4).findIndex(scene=>scene.contains(focus)):-1;
      const surfaceFocus=focus?.closest('.aperture-layer');const surfaceIndex=surfaceFocus&&focus.matches(':focus-visible')?({brand:1,work:active===1?1:3,content:2}[surfaceFocus.dataset.apertureLayer]):-1;
      if(focusedIndex>=0)progress=focusedIndex===1?1.47:focusedIndex+.18;else if(surfaceIndex>=0)progress=surfaceIndex===1?1.47:surfaceIndex+.18;
      const frame=aperture?.getFrame(progress,{small:narrow.matches,flow});
      const visibility=scenes.map((scene,i)=>{if(frame)return {enter:1,leave:0,opacity:i===frame.active?(Array.isArray(frame.opacity)?frame.opacity[i]:frame.opacity):0};const enter=i===0?1:ease((progress-i+.20)/.28),leave=i===(flow?3:4)?0:ease((progress-i-.76)/.24);return {enter,leave,opacity:flow&&i===4?0:enter*(1-leave)};});
      const next=frame?frame.active:visibility.reduce((best,item,i)=>item.opacity>visibility[best].opacity?i:best,0);setActive(next);
      if(caseManual&&next!==caseManualOwner)caseManual=false;
      if(!caseManual&&next>=1&&next<=3){const desired=next===3?'bakfiets':'bateman';if(selectedCase!==desired){selectedCase=desired;syncCase();}}
      scenes.forEach((scene,i)=>{
        if(i===4){scene.removeAttribute('style');scene.inert=false;scene.removeAttribute('aria-hidden');return;}
        const {enter,leave,opacity}=visibility[i];
        scene.style.setProperty('--chapter-in',enter.toFixed(4));scene.style.setProperty('--chapter-out',leave.toFixed(4));scene.style.opacity=opacity.toFixed(4);
        scene.inert=i!==active||opacity<.5;scene.setAttribute('aria-hidden',String(i!==active||opacity<.5));
        scene.style.visibility=opacity>.001?'visible':'hidden';
      });
      stage.style.setProperty('--light-progress',String(clamp(progress/scrollSpan())));
      stage.style.setProperty('--light-travel',String(progress));
    }
    if(flowVisible&&flowRect.top<innerHeight*.6){setActive(4);progress=4;}
    if(pendingFocus!==null&&active===pendingFocus&&(staticView||(flow&&pendingFocus===4)||pendingFocus===0||progress>=(pendingFocus===1?1.45:pendingFocus+.08))){
      const heading=scenes[pendingFocus].querySelector('h1,h2');pendingFocus=null;heading.tabIndex=-1;heading.focus({preventScroll:true});
    }
    if(!staticView&&progress>2.92&&!video.paused)video.pause();
    if(staticView&&!video.paused){const videoRect=video.getBoundingClientRect();if(videoRect.bottom<=0||videoRect.top>=innerHeight)video.pause();}
    aperture?.setInView(document.documentElement.classList.contains('light-on-stage'));
    if(!nearby||document.hidden){if(!video.paused)video.pause();return;}
    if(inlinePreview()){const previewRect=staticPreview.getBoundingClientRect();if(previewRect.bottom<=0||previewRect.top>=innerHeight)return;}
    if(!renderer&&!unavailable)initRenderer();
    const p=clamp(progress,0,4),i=Math.floor(p),j=Math.min(4,i+1),transition=ease((p-i-.68)/.32),a=poses[i],b=poses[j];
    const small=narrow.matches,baseLight=active===4?light:mix(72,100,ease(progress*2));
    const pose={storyTravel:0,boardVisibility:0,boardExposure:0,rotation:mix(a.rotation,b.rotation,transition),light:baseLight,material,layout:small?'compact':'wide',cameraZoom:small?.98:mix(a.zoom,b.zoom,transition),cameraOrbit:mix(a.orbit,b.orbit,transition),cameraLift:mix(a.lift,b.lift,transition),cameraShiftX:small?0:mix(a.x,b.x,transition),cameraShiftY:small?-.17:mix(a.y,b.y,transition),assembly:mix(a.assembly,b.assembly,transition),lightAim:mix(a.aim,b.aim,transition)};
    if(aperture&&!staticView)Object.assign(pose,aperture.getPose(progress,{small,material,light}));
    if(inlinePreview()){Object.assign(pose,{storyTravel:0,boardVisibility:0,boardExposure:0,rotation:objectRotation*Math.PI/180,light,layout:'compact',cameraZoom:.92,cameraOrbit:.1,cameraLift:0,cameraShiftX:0,cameraShiftY:0,assembly:0});}
    const signature=JSON.stringify(pose);
    if(renderer&&signature!==lastPose){
      renderer.setState(pose);
      // Readiness means a successful render, not merely an allocated context.
      if(renderer.render()){
        lastPose=signature;
        story.dataset.renderer='ready';mobileSystems.dataset.renderer='ready';
      }
    }
    aperture?.paint(progress,{small,inline:inlinePreview(),renderer,selectedCase,caseManual});
  }
  function queue(){if(!raf&&!disposed)raf=requestAnimationFrame(paint);}
  function resize(){
    applyMode();
    const size=stage.getBoundingClientRect();
    if(renderer){renderer.resize(inlinePreview()?staticPreview.clientWidth:size.width,staticCanvasHeight(),devicePixelRatio);lastPose='';}
    story.querySelector('#werk').style.top=isStatic()?Math.max(0,scenes[1].offsetTop)+'px':(scrollDistance()*(1.18/scrollSpan()))+'px';
    // Resizing clears the WebGL buffer. Repaint in the same task so it cannot
    // expose a blank frame between a resize callback and the next animation.
    if(renderer){if(raf)cancelAnimationFrame(raf);paint();}else queue();
  }
  function staticCanvasHeight(){return inlinePreview()?staticPreview.clientHeight:stage.clientHeight;}
  function failRenderer(){unavailable=true;story.dataset.renderer='unavailable';mobileSystems.dataset.renderer='unavailable';story.querySelector('.light-fallback').hidden=false;previewStatus.hidden=false;renderer?.dispose();renderer=null;lastPose='';applyMode();localize();resize();}
  let rendererLoading=false;
  async function initRenderer(){
    if(rendererLoading)return;
    rendererLoading=true;
    try{
      const engine=await(window.SlimLabReady||Promise.resolve(window.SlimLabRenderer));
      if(!engine?.create)throw new Error('Renderer unavailable');
      if(disposed)return;
      renderer?.dispose();
      renderer=engine.create(canvas);
      renderer.resize(inlinePreview()?staticPreview.clientWidth:stage.clientWidth,staticCanvasHeight(),devicePixelRatio);
      story.dataset.renderer='loading';mobileSystems.dataset.renderer='loading';
      story.querySelector('.light-fallback').hidden=true;previewStatus.hidden=true;
      unavailable=false;lastPose='';queue();
    }catch{failRenderer();}
    finally{rendererLoading=false;}
  }
  function jump(index,focus=false,instant=false){
    index=clamp(index,0,3);const top=scrollY+story.getBoundingClientRect().top;
    const destination=isStatic()||(mobileFlow()&&index===4)?scrollY+scenes[index].getBoundingClientRect().top-88:top+scrollDistance()*((index===0?0:index===1?1.47:index+.18)/scrollSpan());
    pendingFocus=focus?index:null;
    window.scrollTo({top:destination,behavior:reduced.matches||instant?'instant':'smooth'});queue();
    history.replaceState(null,'',location.pathname+location.search+(index===0?'#top':index>=1&&index<=3?'#werk':'#lab'));
  }
  function handleClick(event){
    const jumpButton=event.target.closest('[data-light-jump]');if(jumpButton){event.preventDefault();event.stopPropagation();jump(+jumpButton.dataset.lightJump,true);return;}
    const usecaseButton=event.target.closest('[data-light-usecase]');if(usecaseButton){usecase=usecaseButton.dataset.lightUsecase;syncConfig();return;}
    const caseButton=event.target.closest('[data-light-case]');if(caseButton){selectedCase='bakfiets';caseManual=true;caseManualOwner=3;syncCase();if(!isStatic())jump(3,false,true);return;}
    if(event.target.closest('[data-light-dialog]')){if(!isStatic())jump(2,false,true);video.pause();window.SlimStudioWork?.openDetail('content',{opener:event.target.closest('button')});return;}
    if(event.target.closest('[data-light-play]')){if(!isStatic())jump(2,false,true);if(video.paused){document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();});video.src||='assets/bateman-hero-mobile.mp4';video.play().catch(()=>{story.querySelector('.light-video-error').hidden=false;});}else video.pause();return;}
    if(event.target.closest('.light-motion')){manualStill=!isStatic();document.documentElement.dataset.slimMotion=manualStill?'reduced':'full';window.dispatchEvent(new CustomEvent('slim:motion',{detail:{reduced:manualStill}}));story.classList.toggle('light-static',isStatic());localize();resize();jump(active,false);return;}
    if(event.target.closest('[data-light-retry]')){unavailable=false;initRenderer();queue();}
    if(event.target.closest('.light-config-cta')){
      included=true;includedConfiguration={usecase,material,light};
      const announcement=$('#announcement');if(announcement)announcement.textContent=t('configured');
    }
  }
  story.addEventListener('click',handleClick);mobileSystems.addEventListener('click',handleClick);
  function openLab(){mobileSystems.open=true;mobileSystems.querySelector('summary').focus({preventScroll:true});mobileSystems.scrollIntoView({block:'start',behavior:isStatic()?'instant':'smooth'});history.replaceState(null,'',location.pathname+location.search+'#lab');queue();}
  // Handle chapter navigation before the inherited generic hash-link listener.
  document.addEventListener('click',event=>{const link=event.target.closest('a');if(!link||link.closest('dialog'))return;const hash=link.getAttribute('href');if(hash==='#werk'||hash==='#lab'||hash==='#top'){event.preventDefault();event.stopPropagation();$('.site-header')?.classList.remove('menu-open');const menu=$('.direction-menu');if(menu){menu.setAttribute('aria-expanded','false');menu.textContent='Menu';}if(hash==='#lab')openLab();else jump(hash==='#werk'?1:0,true);}},true);
  materialInputs.forEach(input=>input.addEventListener('change',()=>{material=input.value;syncConfig();}));
  intensity.addEventListener('input',()=>{light=+intensity.value;syncConfig();});
  rotationInput.addEventListener('input',()=>{objectRotation=+rotationInput.value;syncConfig();});
  systems.querySelector('.light-lab-controls').addEventListener('toggle',queue);
  mobileSystems.addEventListener('toggle',()=>{lastPose='';resize();});
  function syncPlayback(){const playing=!video.paused;videoButton.querySelector('[data-light-play-label]').textContent=t(playing?'pause':'play');videoButton.querySelector('use').setAttribute('href',playing?'#pause':'#play');videoButton.setAttribute('aria-label',t(playing?'pause':'play'));}
  video.addEventListener('play',syncPlayback);video.addEventListener('pause',syncPlayback);video.addEventListener('ended',syncPlayback);
  video.addEventListener('timeupdate',()=>{const seconds=Math.floor(video.currentTime);story.querySelector('.light-film-time').textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} / 0:15`;});
  video.addEventListener('error',()=>{story.querySelector('.light-video-error').hidden=false;});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();failRenderer();});
  canvas.addEventListener('webglcontextrestored',()=>{unavailable=false;initRenderer();queue();});
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);resizeObserver.observe(staticPreview);
  window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',resize,{passive:true});
  story.addEventListener('focusout',queue);
  [reduced,narrow,short].forEach(media=>media.addEventListener('change',()=>{applyMode();localize();resize();}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();if(raf)cancelAnimationFrame(raf);raf=0;}else queue();});
  new MutationObserver(localize).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(()=>{if(dialog.open)video.pause();}).observe(dialog,{attributes:true,attributeFilter:['open']}));
  window.addEventListener('hashchange',()=>{if(location.hash==='#werk')jump(1);else if(location.hash==='#lab')openLab();else if(location.hash==='#top')jump(0);});
  story.classList.toggle('light-static',isStatic());localize();resize();
  requestAnimationFrame(()=>{resize();if(location.hash==='#werk')jump(1);else if(location.hash==='#lab')openLab();else if(location.hash==='#top'||!location.hash)jump(0);});
  window.SlimLightStory=Object.freeze({getState:()=>({active,progress,static:isStatic(),locale,usecase,material,light,selectedCase,caseManual,included,includedConfiguration:includedConfiguration?{...includedConfiguration}:null,nearby,scheduled:!!raf,unavailable,renderer:renderer?.getStats()||null,aperture:aperture?.getState()||null}),getBrief:language=>{if(!includedConfiguration)return '';const c=copy[language==='en'?'en':'nl'];return `${c.configBrief} ${c.usecases[includedConfiguration.usecase]}. ${c.usecaseBodies[includedConfiguration.usecase]}`;}});
})();


