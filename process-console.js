/* A finite, local demonstration: fixed examples, no external service or code execution. */
(() => {
  'use strict';
  const copy = {
    nl: {
      title:'Van losse vraag naar briefing.', demo:'Fictief procesvoorbeeld', input:'Bericht', rules:'Werkwijze', result:'Briefing',
      examples:'Kies een voorbeeld', choices:['Website','Transport','Content'], inputName:'binnenkomend-bericht.txt', rulesName:'aanvraag.flow', resultName:'projectbriefing.txt',
      inputTitle:'Zo komt een vraag binnen.', inputNote:'Fictief bericht. Geen klantgegevens of echte boeking.', rulesTitle:'Vaste stappen. Jij houdt de regie.',
      commandLabel:'Voorbeeldcommando', commandHint:'Commando: start website, transport of content',
      start:'Maak briefing', review:'Bevestig controle', restart:'Opnieuw', ready:'Kies en probeer', busy:'Gegevens ordenen', waiting:'Controle nodig', complete:'Briefing beschikbaar',
      rule0:'lees de gekozen voorbeeldaanvraag', rule1:'orden doel, inhoud en planning', rule2:'markeer ontbrekende informatie', rule3:'wacht op jouw controle', rule4:'maak een bruikbare tekstbriefing',
      local:'Lokaal voorbeeld. Niets wordt verstuurd.', unknown:'Gebruik start website, start transport of start content.',
      resultEmpty:'Eén bericht wordt een overzicht waarmee je verder kunt.', outline:'Dit halen we uit het bericht', inputLabel:'De vraag', resultLabel:'Het overzicht',
      resultTitle:'Conceptbriefing', reviewedTitle:'Gecontroleerde voorbeeldbriefing', missing:'Nog afstemmen', reviewNote:'Controleer de gegevens. Open punten blijven in de briefing staan.', doneNote:'Klaar om te gebruiken als gespreksstart. Open punten zijn nog niet ingevuld.',
      copy:'Kopieer briefing', download:'Download .txt', copied:'Briefing gekopieerd.', downloaded:'Download gestart.', copyFailed:'Kopiëren niet beschikbaar. Selecteer de tekst of download het bestand.',
      statusIdle:'Eén bericht. Vier bruikbare velden.', statusReview:'Jouw controle is nodig vóór export.', statusDone:'Gecontroleerd. De open punten blijven zichtbaar.',
      exportTitle:'SLIMSERVICE | VOORBEELDBRIEFING', exportNotice:'Fictieve gegevens. Lokaal gestructureerd uit het gekozen voorbeeld; geen echte klantaanvraag.', source:'Oorspronkelijk bericht', next:'Vervolgstap', checked:'Status: door de bezoeker gecontroleerd als voorbeeld. Open punten zijn niet beantwoord.',
      nextStep:'Vraag de ontbrekende informatie op voordat je een offerte, planning of publicatie bevestigt.',
      context:'De keuze uit het werk', contextNote:'Dezelfde lading. Dezelfde voorbeeldroute.', apply:'Zoiets voor mijn bedrijf', applyNote:'Neem het proces mee naar je aanvraag, zonder de voorbeeldgegevens.', applied:'Proces gekozen. Vertel ons nu wat jouw bedrijf nodig heeft.',
      selection:'Gekozen proces', processNames:{website:'Website-aanvragen ordenen',transport:'Vervoersaanvragen ordenen',content:'Contentbriefings voorbereiden'},
      processBriefs:{website:'Website-aanvragen structureren op doel, inhoud en planning. Ontbrekende informatie zichtbaar maken en laten controleren.',transport:'Vervoersaanvragen structureren op lading en route. Ontbrekende adressen en planning zichtbaar maken en laten controleren.',content:'Werkbeelden en merkbestanden ordenen tot een contentbriefing, met een menselijke controle vóór publicatie.'}
    },
    en: {
      title:'From loose enquiry to clear brief.', demo:'Fictional process example', input:'Message', rules:'Workflow', result:'Brief',
      examples:'Choose an example', choices:['Website','Transport','Content'], inputName:'incoming-message.txt', rulesName:'enquiry.flow', resultName:'project-brief.txt',
      inputTitle:'This is how an enquiry arrives.', inputNote:'Fictional message. No customer data or actual booking.', rulesTitle:'Defined steps. You stay in control.',
      commandLabel:'Example command', commandHint:'Command: start website, transport or content',
      start:'Create brief', review:'Confirm review', restart:'Run again', ready:'Choose and try', busy:'Organising details', waiting:'Review needed', complete:'Brief available',
      rule0:'read the selected example enquiry', rule1:'organise purpose, scope and timing', rule2:'flag missing information', rule3:'wait for your review', rule4:'prepare a usable text brief',
      local:'Local example. Nothing is sent.', unknown:'Use start website, start transport or start content.',
      resultEmpty:'One message becomes a clear starting point for the next step.', outline:'What we extract from the message', inputLabel:'The enquiry', resultLabel:'The overview',
      resultTitle:'Draft brief', reviewedTitle:'Reviewed example brief', missing:'Still to confirm', reviewNote:'Check the details. Open questions stay in the brief.', doneNote:'Ready to use as a conversation starter. Open questions remain unanswered.',
      copy:'Copy brief', download:'Download .txt', copied:'Brief copied.', downloaded:'Download started.', copyFailed:'Copy is unavailable. Select the text or download the file.',
      statusIdle:'One message. Four useful fields.', statusReview:'Your review is required before export.', statusDone:'Reviewed. Open questions remain visible.',
      exportTitle:'SLIMSERVICE | EXAMPLE BRIEF', exportNotice:'Fictional data. Structured locally from the selected example; not an actual customer enquiry.', source:'Original message', next:'Next step', checked:'Status: reviewed by the visitor as an example. Open questions have not been answered.',
      nextStep:'Request the missing information before confirming a quote, schedule or publication.',
      context:'The choice from the case', contextNote:'Same load. Same example route.', apply:'Build this for my business', applyNote:'Carry the process into your enquiry, without the sample details.', applied:'Process selected. Tell us what your own business needs.',
      selection:'Selected process', processNames:{website:'Structure website enquiries',transport:'Structure transport enquiries',content:'Prepare content briefs'},
      processBriefs:{website:'Structure website enquiries by purpose, scope and timing. Flag missing information for a person to review.',transport:'Structure transport enquiries by load and route. Flag missing addresses and timing for a person to review.',content:'Organise project imagery and brand assets into a content brief, with a person reviewing before publication.'}
    }
  };
  const examples = {
    website: {
      nl:{message:'Hoi! Onze interieurbouwsite is verouderd. We willen liever aanvragen voor maatwerk dan losse prijsvragen. Drie projecten, onze diensten en een contactpagina moeten erop. Liefst voor het nieuwe seizoen. Wat hebben jullie van ons nodig?',fields:[['Project','Website voor interieurbouw'],['Doel','Passende maatwerkaanvragen'],['Inhoud','3 projecten, diensten, contact'],['Planning','Voor het nieuwe seizoen']],missing:['Concrete opleverdatum','Budget en beschikbaar beeldmateriaal']},
      en:{message:'Hi! Our joinery website is outdated. We want enquiries for bespoke work rather than general price requests. We need three projects, our services and a contact page. Ideally before the new season. What do you need from us?',fields:[['Project','Website for a joinery business'],['Purpose','Relevant bespoke enquiries'],['Content','3 projects, services, contact'],['Timing','Before the new season']],missing:['Specific launch date','Budget and available imagery']}
    },
    content: {
      nl:{message:'Hoi, we zijn bezig met een keukenrenovatie. Ik heb zes werkfoto’s en ons logo. Kunnen we daar één Reel en drie posts voor Instagram en Facebook van maken? Wel eerst even aan mij laten zien voordat er iets online gaat.',fields:[['Onderwerp','Keukenrenovatie in uitvoering'],['Bron','6 foto’s en logo, nog aan te leveren'],['Output','1 Reel + 3 posts, Instagram/Facebook'],['Controle','Eigenaar beoordeelt vóór publicatie']],missing:['Gebruiksrechten en huisstijlbestanden','Gewenste publicatiedatum']},
      en:{message:'Hi, we are working on a kitchen renovation. I have six work photos and our logo. Could we turn them into one Reel and three posts for Instagram and Facebook? Please show me first before anything goes online.',fields:[['Subject','Kitchen renovation in progress'],['Source','6 photos and logo, still to supply'],['Output','1 Reel + 3 posts, Instagram/Facebook'],['Review','Owner reviews before publication']],missing:['Usage rights and brand files','Preferred publication date']}
    }
  };
  const cargoExamples={
    furniture:{nl:{label:'Meubels',load:'Een bank',message:'Ik wil graag een bank van Schiebroek naar Hillegersberg laten vervoeren. Welke informatie hebben jullie nodig?'},en:{label:'Furniture',load:'A sofa',message:'I would like a sofa transported from Schiebroek to Hillegersberg. What information do you need?'}},
    parcels:{nl:{label:'Pakketten',load:'Pakketten, aantal nog onbekend',message:'Ik wil graag pakketten van Schiebroek naar Hillegersberg laten vervoeren. Welke informatie hebben jullie nodig?'},en:{label:'Parcels',load:'Parcels, quantity not yet known',message:'I would like parcels transported from Schiebroek to Hillegersberg. What information do you need?'}},
    shop:{nl:{label:'Winkellevering',load:'Winkelvoorraad, omvang nog onbekend',message:'Ik wil graag voorraad uit Schiebroek naar mijn winkel in Hillegersberg laten brengen. Welke informatie hebben jullie nodig?'},en:{label:'Shop delivery',load:'Shop stock, size not yet known',message:'I would like stock delivered from Schiebroek to my shop in Hillegersberg. What information do you need?'}}
  };
  const names=['website','transport','content'];
  let root,locale=document.documentElement.lang==='en'?'en':'nl',tab='input',phase=0,example='website',timer=0,active=false,draft=null,userChanged=false;
  let cargo=window.SlimCaseCargo?.getState().cargo||'furniture',selectedProcess=null;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const compact=matchMedia('(max-width:760px)');
  const isStill=()=>reduced.matches||document.documentElement.dataset.slimMotion==='reduced';
  const c=()=>copy[locale];
  function data(){
    if(example!=='transport')return examples[example][locale];
    const load=cargoExamples[cargo][locale];
    return locale==='nl'?{message:load.message,fields:[['Traject','Schiebroek → Hillegersberg'],['Lading',load.load],['Wens','Ophalen en bezorgen'],['Planning','Datum nog af te spreken']],missing:['Exacte ophaal- en bezorgadressen','Datum, afmetingen en beschikbaarheid']}:{message:load.message,fields:[['Route','Schiebroek → Hillegersberg'],['Load',load.load],['Request','Collection and delivery'],['Timing','Date still to agree']],missing:['Exact collection and delivery addresses','Date, dimensions and availability']};
  }
  const escape=value=>String(value).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${name==='copy'?'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>':name==='download'?'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>':`<use href="#${name}"/>`}</svg>`;
  const isBusy=()=>phase===1||phase===2;
  const command=()=>`start ${example}`;
  const text=(selector,value)=>{const element=root?.querySelector(selector);if(element)element.textContent=value;};
  function stop(){clearTimeout(timer);timer=0;}
  function announce(message){text('.pc-announcement',message);}
  function compose(){
    if(!root)return;
    const form=root.querySelector('.pc-command-row'),hint=root.querySelector('.pc-command-hint');
    if(compact.matches){root.querySelector('.pc-workspace').after(form);root.querySelector('.pc-bottom').after(hint);}
    else{root.querySelector('#pc-panel-input').append(form,hint);}
  }
  function render(){
    if(!root)return;
    root.dataset.phase=String(phase);root.dataset.view=tab;root.dataset.example=example;
    text('.pc-title',c().title);text('.pc-demo',c().demo);text('.pc-local',c().local);text('.pc-command-hint',c().commandHint);
    root.querySelector('.pc-case-context').hidden=example!=='transport';
    text('.pc-context-label',c().context);text('.pc-context-value',`De Bakfietsmaat · ${cargoExamples[cargo][locale].label}`);text('.pc-context-route','Schiebroek → Hillegersberg');
    root.querySelector('.pc-apply').hidden=phase!==4;text('.pc-apply-label',c().apply);text('.pc-apply-note',selectedProcess===example?c().applied:c().applyNote);
    text('.pc-state',isBusy()?c().busy:phase===3?c().waiting:phase===4?c().complete:c().ready);
    root.querySelector('.pc-examples').setAttribute('aria-label',c().examples);
    root.querySelectorAll('[data-pc-example]').forEach((button,index)=>{button.setAttribute('aria-pressed',String(button.dataset.pcExample===example));button.querySelector('span').textContent=c().choices[index];});
    root.querySelector('.pc-tabs').setAttribute('aria-label',locale==='nl'?'Stappen in het voorbeeld':'Example stages');
    root.querySelectorAll('[data-pc-tab]').forEach(button=>{const selected=button.dataset.pcTab===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;button.querySelector('span').textContent=c()[button.dataset.pcTab];});
    root.querySelector('.pc-tabs').hidden=!compact.matches;
    root.querySelectorAll('[data-pc-panel]').forEach(panel=>{
      panel.hidden=compact.matches&&panel.dataset.pcPanel!==tab;
      panel.setAttribute('role',compact.matches?'tabpanel':'region');
      panel.tabIndex=compact.matches?0:-1;
      panel.setAttribute('aria-label',c()[panel.dataset.pcPanel]);
      if(compact.matches)panel.setAttribute('aria-labelledby','pc-tab-'+panel.dataset.pcPanel);
      else panel.removeAttribute('aria-labelledby');
    });
    text('.pc-input-label',c().inputLabel);text('.pc-result-label',c().resultLabel);
    for(const name of ['input','rules','result'])text(`[data-pc-name="${name}"]`,c()[name+'Name']);
    text('.pc-input-title',c().inputTitle);text('.pc-message',data().message);text('.pc-input-note',c().inputNote);text('.pc-rules-title',c().rulesTitle);
    root.querySelector('.pc-code').innerHTML=Array.from({length:5},(_,index)=>`<div class="pc-code-line ${phase===4||(phase>0&&index<phase)?'is-done':''} ${phase>0&&phase<4&&index===phase?'is-current':''}"><span class="pc-code-number">0${index+1}</span><span class="pc-rule-verb">${['read','shape','check','review','export'][index]}</span><span class="pc-rule-body">${escape(c()['rule'+index])}</span><i>${phase===4||(phase>0&&index<phase)?'✓':phase>0&&phase<4&&index===phase?'●':''}</i></div>`).join('');
    text('.pc-result-title',phase===4?c().reviewedTitle:c().resultTitle);
    text('.pc-result-empty',isBusy()?c().busy:c().resultEmpty);root.querySelector('.pc-result-empty').hidden=phase>=3;
    root.querySelector('.pc-outline').hidden=phase>=3;
    root.querySelector('.pc-outline').setAttribute('aria-label',c().outline);
    root.querySelector('.pc-outline').innerHTML=data().fields.map(([label],index)=>`<li><span>0${index+1}</span><strong>${escape(label)}</strong>${icon('arrow')}</li>`).join('');
    root.querySelector('.pc-result-details').hidden=phase<3;
    root.querySelector('.pc-brief-fields').innerHTML=data().fields.map(([label,value])=>`<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('');
    text('.pc-missing-label',c().missing);text('.pc-missing-value',data().missing.join(' · '));
    text('.pc-review-note',phase===4?c().doneNote:c().reviewNote);
    for(const action of ['copy','download']){const button=root.querySelector(`[data-pc-action="${action}"]`);button.disabled=phase!==4;button.querySelector('span').textContent=c()[action];}
    const input=root.querySelector('.pc-command');input.disabled=isBusy();input.setAttribute('aria-label',c().commandLabel);input.placeholder=command();
    if(draft===null)draft=command();if(document.activeElement!==input)input.value=draft;
    const run=root.querySelector('.pc-run');run.disabled=isBusy();run.querySelector('span').textContent=phase===3?c().review:phase===4?c().restart:c().start;
    text('.pc-status-line',isBusy()?c().busy:phase===3?c().statusReview:phase===4?c().statusDone:c().statusIdle);
  }
  function chooseTab(next,focus=false){tab=next;render();if(focus)root.querySelector(`[data-pc-tab="${tab}"]`).focus({preventScroll:true});}
  function chooseExample(next,explicit=true){
    if(!names.includes(next))return;
    stop();if(explicit)userChanged=true;example=next;draft=command();phase=0;tab='input';hideFallback();render();
  }
  function parse(value){
    const match=value.toLowerCase().trim().match(/^(?:start\s+)?(website|transport|content|aanvraag|enquiry|request|offerte|quote)$/);
    if(!match)return null;return names.includes(match[1])?match[1]:'website';
  }
  function advance(){
    stop();if(!active||document.hidden)return;
    if(phase===1){phase=2;render();timer=setTimeout(advance,isStill()?0:650);}
    else if(phase===2){phase=3;tab='result';render();announce(c().statusReview);}
  }
  function run(){
    if(isBusy())return;userChanged=true;
    if(phase===3){phase=4;tab='result';render();announce(c().statusDone);return;}
    const chosen=parse(root.querySelector('.pc-command').value);
    if(!chosen){announce(c().unknown);text('.pc-status-line',c().unknown);root.querySelector('.pc-command').focus({preventScroll:true});return;}
    stop();example=chosen;draft=command();hideFallback();phase=isStill()?3:1;tab=phase===3?'result':'rules';render();announce(phase===3?c().statusReview:c().busy);
    if(phase!==3&&active&&!document.hidden)timer=setTimeout(advance,650);
  }
  function briefText(){
    return [c().exportTitle,c().exportNotice,'',c().source+':',data().message,'',...data().fields.map(([label,value])=>`${label}: ${value}`),'',c().missing+':',...data().missing.map(value=>`- ${value}`),'',c().next+':',c().nextStep,'',c().checked].join('\n');
  }
  function hideFallback(){if(root)root.querySelector('.pc-copy-fallback').hidden=true;}
  async function copyBrief(){
    if(phase!==4)return;
    const value=briefText();
    try{await navigator.clipboard.writeText(value);announce(c().copied);text('.pc-status-line',c().copied);}
    catch{const fallback=root.querySelector('.pc-copy-fallback');fallback.hidden=false;fallback.value=value;fallback.setAttribute('aria-label',c().copy);fallback.focus({preventScroll:true});fallback.select();announce(c().copyFailed);text('.pc-status-line',c().copyFailed);}
  }
  function downloadBrief(){
    if(phase!==4)return;
    const url=URL.createObjectURL(new Blob(['\uFEFF'+briefText()],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download=`slimservice-${example}-${locale}-${locale==='nl'?'voorbeeld':'example'}.txt`;link.hidden=true;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);announce(c().downloaded);text('.pc-status-line',c().downloaded);
  }
  function mount(){
    if(root)return true;const slot=document.querySelector('.architecture-console-slot');if(!slot)return false;
    root=document.createElement('div');root.className='process-console';
    root.innerHTML=`<div class="pc-top"><span class="pc-mark">${icon('icon-system')}<span>SlimService<span class="pc-mark-dot">.</span></span></span><span class="pc-demo"></span></div>
      <div class="pc-title-row"><h3 class="pc-title"></h3><span class="pc-state"></span></div>
      <div class="pc-examples" role="group">${names.map((name,index)=>`<button type="button" data-pc-example="${name}"><small>0${index+1}</small><span></span></button>`).join('')}</div>
      <div class="pc-case-context"><span class="pc-context-label"></span><strong class="pc-context-value"></strong><span class="pc-context-route"></span></div>
      <div class="pc-tabs" role="tablist">${['input','rules','result'].map((name,index)=>`<button id="pc-tab-${name}" type="button" role="tab" data-pc-tab="${name}" aria-controls="pc-panel-${name}"><small>0${index+1}</small><span></span></button>`).join('')}</div>
      <div class="pc-workspace">
        <div id="pc-panel-input" role="tabpanel" tabindex="0" aria-labelledby="pc-tab-input" data-pc-panel="input"><div class="pc-document-label"><span>01</span><strong class="pc-input-label"></strong></div><span class="pc-filename" data-pc-name="input"></span><p class="pc-input-title"></p><blockquote class="pc-message"></blockquote><p class="pc-input-note"></p></div>
        <div id="pc-panel-rules" role="tabpanel" tabindex="0" aria-labelledby="pc-tab-rules" data-pc-panel="rules"><span class="pc-filename" data-pc-name="rules"></span><p class="pc-rules-title"></p><div class="pc-code"></div></div>
        <div id="pc-panel-result" role="tabpanel" tabindex="0" aria-labelledby="pc-tab-result" data-pc-panel="result"><div class="pc-document-label"><span>02</span><strong class="pc-result-label"></strong>${icon('icon-system')}</div><div class="pc-result-heading"><strong class="pc-result-title"></strong><span class="pc-filename" data-pc-name="result"></span></div><p class="pc-result-empty"></p><ol class="pc-outline"></ol><div class="pc-result-details"><dl class="pc-brief-fields"></dl><div class="pc-missing"><strong class="pc-missing-label"></strong><span class="pc-missing-value"></span></div><p class="pc-review-note"></p><div class="pc-export"><button type="button" data-pc-action="copy">${icon('copy')}<span></span></button><button type="button" data-pc-action="download">${icon('download')}<span></span></button></div><div class="pc-apply"><a href="#project" data-service-select="systems" data-pc-apply><span class="pc-apply-label"></span>${icon('diagonal')}</a><p class="pc-apply-note"></p></div></div><textarea class="pc-copy-fallback" readonly hidden rows="5"></textarea></div>
      </div>
      <form class="pc-command-row"><span aria-hidden="true" class="pc-prompt">›</span><input class="pc-command" type="text" maxlength="40" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="pc-command-hint"><button class="pc-run" type="submit"><span></span>${icon('arrow')}</button></form>
      <div class="pc-bottom"><span class="pc-status-line"></span><span class="pc-local"></span></div><span class="pc-command-hint" id="pc-command-hint"></span><span class="pc-announcement sr-only" role="status" aria-live="polite"></span>`;
    slot.append(root);
    root.querySelector('.pc-command-row').addEventListener('submit',event=>{event.preventDefault();run();});
    root.querySelectorAll('[data-pc-example]').forEach(button=>button.addEventListener('click',()=>chooseExample(button.dataset.pcExample)));
    root.querySelectorAll('[data-pc-tab]').forEach(button=>button.addEventListener('click',()=>chooseTab(button.dataset.pcTab)));
    root.querySelector('.pc-tabs').addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();const tabs=['input','rules','result'],index=tabs.indexOf(tab);
      chooseTab(tabs[event.key==='Home'?0:event.key==='End'?2:(index+(event.key==='ArrowRight'?1:2))%3],true);
    });
    root.querySelector('.pc-command').addEventListener('input',event=>{userChanged=true;draft=event.target.value;if(phase>=3){phase=0;tab='input';hideFallback();render();}});
    root.querySelector('[data-pc-action="copy"]').addEventListener('click',copyBrief);
    root.querySelector('[data-pc-action="download"]').addEventListener('click',downloadBrief);
    root.querySelector('[data-pc-apply]').addEventListener('click',()=>{if(phase!==4)return;selectedProcess=example;render();window.dispatchEvent(new CustomEvent('studio:process',{detail:{selected:true,process:selectedProcess,service:'systems'}}));});
    new IntersectionObserver(entries=>{active=entries.some(entry=>entry.isIntersecting);if(!active)stop();else if(isBusy()&&!timer&&!document.hidden)timer=setTimeout(advance,250);},{threshold:0}).observe(root);
    compose();render();return true;
  }
  if(!mount()){const watch=new MutationObserver(()=>{if(mount())watch.disconnect();});watch.observe(document.querySelector('main')||document.body,{childList:true,subtree:true});}
  new MutationObserver(()=>{locale=document.documentElement.lang==='en'?'en':'nl';hideFallback();render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(active&&isBusy()&&!timer)timer=setTimeout(advance,250);});
  function motionChanged(){if(isStill()&&isBusy()){stop();phase=3;tab='result';render();announce(c().statusReview);}}
  reduced.addEventListener('change',motionChanged);window.addEventListener('slim:motion',motionChanged);
  compact.addEventListener('change',()=>{compose();render();});
  window.addEventListener('slim:case',event=>{if(userChanged)return;const next={bateman:'content',bakfietsmaat:'transport'}[event.detail?.case];if(next&&next!==example)chooseExample(next,false);});
  window.addEventListener('slim:cargo',event=>{
    const next=event.detail?.cargo;if(!Object.hasOwn(cargoExamples,next))return;
    const changed=next!==cargo;cargo=next;
    if(example==='transport'&&changed)chooseExample('transport',false);
    else if(event.detail.explicit&&!userChanged)chooseExample('transport',false);
    else render();
  });
  // Run before the existing capture handler moves focus to the expertise section.
  window.addEventListener('click',event=>{if(event.target.closest('[data-case-brief]'))chooseExample('transport',true);},true);
  const selectedCopy=language=>copy[language==='en'?'en':'nl'];
  window.SlimProcessConsole=Object.freeze({
    getState:()=>({locale,tab,phase,example,cargo,selectedProcess,active,running:!!timer,mounted:!!root,userChanged}),
    getSelectionLabel:language=>selectedProcess?selectedCopy(language).processNames[selectedProcess]:'',
    getBrief:language=>selectedProcess?`${selectedCopy(language).selection}: ${selectedCopy(language).processBriefs[selectedProcess]}`:''
  });
})();
