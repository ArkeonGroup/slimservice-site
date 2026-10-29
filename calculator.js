'use strict';
(() => {
  const anchor = document.querySelector('.connection-section');
  if (!anchor || !window.SlimCalculatorMath) return;
  const defaults = { process: 'enquiries', hours: 8, rate: 40, reduction: 50, weeks: 48 };
  const currencies = { EUR: '€', GBP: '£' };
  const words = {
    nl: {
      title: 'Minder handwerk.<br><em>Meer ruimte.</em>', intro: 'Wat zou minder handwerk je opleveren? Reken met jouw tijd en ontdek wat een verbetering kan vrijmaken.',
      example: 'Rekenvoorbeeld. Pas het aan naar jouw situatie.', own: 'Jouw scenario. De verbetering is een aanname.', process: 'Welk werk komt steeds terug?',
      processes: {enquiries:'Aanvragen opvolgen', quotes:'Offertes voorbereiden', content:'Content verwerken', admin:'Administratie', other:'Een ander proces'},
      hours: 'Teamuren per week', hoursHint: 'Het totaal voor dit proces, voor iedereen samen.', rate: 'Interne kosten per uur', rateHint: 'Een eigen inschatting van de kosten, geen verkooptarief.', reduction: 'Stel dat dit minder tijd kost', reductionHint: 'Kies een scenario. Wat haalbaar is onderzoeken we samen.',
      currency: 'Rekenvaluta', currencyHint: 'Vul je uurkosten in deze valuta in. Bedragen worden niet omgerekend.', unitHours: 'uur', perHour: '/ uur', weekly: 'uur per week vrij', remaining: 'Terugkerend werk', freed: 'Ruimte voor ander werk', visual: 'Verdeling van je ingevoerde tijd',
      annual: 'Uur per jaar vrij', value: 'Kostenwaarde van die tijd / jaar', caution: 'Vrijgekomen capaciteit is geen gegarandeerde besparing of extra winst. Kosten voor inrichting, software en onderhoud zijn niet meegerekend.',
      assumptions: 'Bekijk de berekening', weeks: 'Werkweken per jaar', baseline: 'Huidige tijdsbesteding per jaar', formula: 'Uren per week × gekozen vermindering × werkweken. Kostenwaarde = vrijgekomen uren × interne uurkosten.',
      use: 'Onderzoek mijn proces', local: 'Neem dit scenario mee in je projectbrief. Er wordt niets automatisch verstuurd.', reset: 'Herstel het voorbeeld', error: 'Vul geldige waarden in: 0–1.000 uur, {symbol}0–1.000, 0–100% en 1–52 werkweken.',
      included: 'Je rekenscenario gaat mee in de projectbrief.', remove: 'Verwijderen', briefProcess: 'Proces', briefTitle: 'Mijn rekenscenario (indicatie)', chosen: 'Gekozen vermindering', weeksBrief: 'Werkweken', currentCost: 'Kostenwaarde huidige tijd', briefNote: 'Dit is een aanname, geen gemeten besparing of winst. Inrichting, software en onderhoud zijn niet meegerekend.', link: 'Wat zou minder handwerk opleveren?'
    },
    en: {
      title: 'Less manual work.<br><em>More room.</em>', intro: 'What could less manual work make possible? Use your own numbers to explore the capacity an improvement could release.',
      example: 'An example. Adjust it to your situation.', own: 'Your scenario. The improvement is an assumption.', process: 'Which work keeps coming back?',
      processes: {enquiries:'Following up enquiries', quotes:'Preparing quotes', content:'Processing content', admin:'Administration', other:'Another process'},
      hours: 'Team hours per week', hoursHint: 'The total for this process, across everyone involved.', rate: 'Internal cost per hour', rateHint: 'Your estimated cost, not your selling rate.', reduction: 'What if this took less time?', reductionHint: 'Choose a scenario. We explore what is feasible together.',
      currency: 'Calculation currency', currencyHint: 'Enter your hourly cost in this currency. No exchange rate is applied.', unitHours: 'hours', perHour: '/ hour', weekly: 'hours freed per week', remaining: 'Recurring work', freed: 'Room for other work', visual: 'How your entered time is divided',
      annual: 'Hours freed per year', value: 'Cost value of that time / year', caution: 'Freed capacity is not guaranteed cash savings or extra profit. Setup, software and maintenance costs are not included.',
      assumptions: 'See the calculation', weeks: 'Working weeks per year', baseline: 'Current time spent per year', formula: 'Hours per week × chosen reduction × working weeks. Capacity value = freed hours × internal hourly cost.',
      use: 'Explore my process', local: 'Include this scenario in your project brief. Nothing is sent automatically.', reset: 'Reset the example', error: 'Enter valid values: 0–1,000 hours, {symbol}0–1,000, 0–100% and 1–52 working weeks.',
      included: 'Your calculation is included in the project brief.', remove: 'Remove', briefProcess: 'Process', briefTitle: 'My calculation scenario (estimate)', chosen: 'Chosen reduction', weeksBrief: 'Working weeks', currentCost: 'Cost value of current time', briefNote: 'An assumption, not measured savings or profit. Setup, software and maintenance are not included.', link: 'What could less manual work make possible?'
    }
  };
  let locale = document.documentElement.lang === 'en' ? 'en' : 'nl';
  let custom = false, selected = null, announceTimer;
  const root = document.createElement('section');
  root.className = 'calculator section-pad'; root.id = 'calculator'; root.setAttribute('aria-labelledby','calculator-title');
  root.innerHTML = `<div class="calc-heading"><h2 id="calculator-title"></h2><p data-calc-copy="intro"></p></div>
    <div class="calc-layout"><div class="calc-inputs"><p class="calc-scenario" id="calc-scenario"></p>
      <label class="calc-field"><span data-calc-copy="process"></span><select id="calc-process"></select></label>
      <div class="calc-currency-row"><label for="calc-currency" data-calc-copy="currency"></label><select id="calc-currency" aria-describedby="calc-currency-hint"><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option></select><small id="calc-currency-hint" data-calc-copy="currencyHint"></small></div>
      <div class="calc-number-row"><label class="calc-field"><span data-calc-copy="hours"></span><div class="calc-input-wrap"><input id="calc-hours" type="number" min="0" max="1000" step="0.5" value="8" required aria-describedby="calc-hours-hint"><span data-calc-copy="unitHours"></span></div><small id="calc-hours-hint" data-calc-copy="hoursHint"></small></label>
      <label class="calc-field"><span data-calc-copy="rate"></span><div class="calc-input-wrap"><input id="calc-rate" type="number" min="0" max="1000" step="0.5" value="40" required aria-describedby="calc-rate-hint calc-currency-hint"><span data-calc-symbol>€</span></div><small id="calc-rate-hint" data-calc-copy="rateHint"></small></label></div>
      <label class="calc-field calc-reduction" for="calc-reduction"><span data-calc-copy="reduction"></span><div class="calc-percent"><input id="calc-reduction" type="number" min="0" max="100" step="1" value="50" required aria-describedby="calc-reduction-hint"><span>%</span></div></label>
      <input id="calc-slider" type="range" min="0" max="100" step="1" value="50" aria-label="Stel dat dit minder tijd kost" aria-describedby="calc-reduction-hint"><small id="calc-reduction-hint" data-calc-copy="reductionHint"></small>
      <details class="calc-assumptions"><summary><span data-calc-copy="assumptions"></span><svg aria-hidden="true"><use href="#plus"/></svg></summary><div><label class="calc-field calc-weeks"><span data-calc-copy="weeks"></span><input id="calc-weeks" type="number" min="1" max="52" step="1" value="48" required></label><p data-calc-copy="formula"></p><p><span data-calc-copy="baseline"></span>: <strong id="calc-baseline"></strong></p></div></details>
      <button class="calc-reset" type="button" data-calc-copy="reset"></button><p class="calc-error" role="status" hidden></p>
    </div><div class="calc-results"><div class="calc-stage"><div class="calc-weekly"><output id="calc-weekly">4</output><span data-calc-copy="weekly"></span></div><div class="calc-time-plane" aria-hidden="true">${Array.from({length:20},(_,i)=>`<i data-time-block="${i}"></i>`).join('')}</div><div class="calc-legend"><span><i></i><span data-calc-copy="remaining"></span></span><span><i></i><span data-calc-copy="freed"></span></span></div></div>
      <div class="calc-totals"><div><span data-calc-copy="annual"></span><output id="calc-annual">192</output></div><div><span data-calc-copy="value"></span><output id="calc-value">€ 7.680</output></div></div>
      <p class="calc-caution" data-calc-copy="caution"></p><button type="button" class="calc-use"><span data-calc-copy="use"></span><svg aria-hidden="true"><use href="#diagonal"/></svg></button><p class="calc-local" data-calc-copy="local"></p>
    </div></div><p class="sr-only calc-announcement" role="status" aria-live="polite"></p>`;
  anchor.after(root);
  root.querySelector('#calc-hours').step = 'any';
  root.querySelector('#calc-rate').step = '0.01';
  [['calc-weekly','weekly'],['calc-annual','annual'],['calc-value','value']].forEach(([id,key])=>{
    const label=root.querySelector(`[data-calc-copy="${key}"]`);label.id=id+'-label';
    const output=root.querySelector('#'+id);output.setAttribute('aria-labelledby',label.id);output.setAttribute('aria-live','off');
  });
  const $ = selector => root.querySelector(selector);
  const fields = ['hours','rate','reduction','weeks'];
  const notice = document.createElement('div'); notice.className = 'calculator-selection'; notice.hidden = true;
  notice.innerHTML = '<p></p><button type="button"></button>';
  document.querySelector('#brief-form').prepend(notice);
  const calcLink = document.createElement('a'); calcLink.href = '#calculator'; calcLink.className = 'text-cta calc-demo-link';
  calcLink.innerHTML = '<span></span><svg aria-hidden="true"><use href="#down"/></svg>';
  document.querySelector('.showcase-evidence').after(calcLink);
  const number = (value, lang=locale) => new Intl.NumberFormat(lang==='nl'?'nl-NL':'en-GB',{maximumFractionDigits:2}).format(value);
  const money = (value, currency, lang=locale, precision=0) => new Intl.NumberFormat(lang==='nl'?'nl-NL':'en-GB',{style:'currency',currency,minimumFractionDigits:0,maximumFractionDigits:precision}).format(value);
  function read() {
    const data = {process:$('#calc-process').value, currency:$('#calc-currency').value};
    let valid = Object.hasOwn(currencies,data.currency);
    fields.forEach(key => {const field=$('#calc-'+key), ok=field.value.trim()!==''&&field.validity.valid;field.setAttribute('aria-invalid',String(!ok));valid=valid&&ok;data[key]=Number(field.value);});
    return valid && window.SlimCalculatorMath.calculate(data) ? data : null;
  }
  function eventSelection() { window.dispatchEvent(new CustomEvent('studio:calculator',{detail:{selected:!!selected}})); }
  function clearSelection() {if(selected){selected=null;renderNotice();eventSelection();}}
  function renderNotice() {
    const c=words[locale];notice.hidden=!selected;
    notice.querySelector('p').textContent=selected?`${c.included} ${c.processes[selected.process]} · ${number(selected.hours)} ${c.unitHours}/week · ${money(selected.rate,selected.currency,locale,2)} ${c.perHour} · ${selected.reduction}%.`:'';
    notice.querySelector('button').textContent=c.remove;
  }
  function update(announce=false) {
    const data=read(), result=data&&window.SlimCalculatorMath.calculate(data), c=words[locale], currency=$('#calc-currency').value;
    const error=c.error.replace('{symbol}',currencies[currency]);
    $('[data-calc-symbol]').textContent=currencies[currency];
    root.dataset.valid=String(!!result);$('.calc-use').disabled=!result;
    $('.calc-error').hidden=!!result;$('.calc-error').textContent=result?'':error;
    $('#calc-scenario').textContent=custom?c.own:c.example;
    $('#calc-weekly').textContent=result?number(result.weeklyFreedHours):'…';
    $('#calc-annual').textContent=result?number(result.annualFreedHours):'…';
    $('#calc-value').textContent=result?money(result.annualCapacityValue,currency):'…';
    $('#calc-baseline').textContent=result?`${number(result.annualCurrentHours)} ${c.unitHours} · ${money(result.annualCurrentCost,currency)}`:'…';
    const pct=result?data.reduction:0;
    $('#calc-slider').style.setProperty('--value',`${pct}%`);
    root.querySelectorAll('[data-time-block]').forEach((block,i)=>{const free=result&&data.hours>0?Math.max(0,Math.min(1,pct/5-(19-i))):0;block.style.setProperty('--free',free);block.style.setProperty('--fill',`${free*100}%`);});
    clearTimeout(announceTimer);
    if(announce){announceTimer=setTimeout(()=>{$('.calc-announcement').textContent=result?`${number(result.weeklyFreedHours)} ${c.weekly}. ${number(result.annualFreedHours)} ${c.annual.toLowerCase()}. ${money(result.annualCapacityValue,currency)}. ${c.value}.`:error;},300);}
  }
  function translate() {
    const process=$('#calc-process').value||defaults.process, c=words[locale];
    $('#calculator-title').innerHTML=c.title;
    root.querySelectorAll('[data-calc-copy]').forEach(el=>el.textContent=c[el.dataset.calcCopy]);
    $('#calc-process').innerHTML=Object.entries(c.processes).map(([value,label])=>`<option value="${value}">${label}</option>`).join('');$('#calc-process').value=process;
    $('#calc-slider').setAttribute('aria-label',c.reduction);calcLink.querySelector('span').textContent=c.link;
    $('.calc-announcement').textContent='';
    renderNotice();update();
  }
  root.addEventListener('input',e=>{
    if(!e.target.matches('input,select'))return;
    custom=true;clearSelection();
    if(e.target.id==='calc-slider')$('#calc-reduction').value=e.target.value;
    if(e.target.id==='calc-reduction'&&e.target.validity.valid&&e.target.value!=='')$('#calc-slider').value=e.target.value;
    update(true);
  });
  $('#calc-process').addEventListener('change',()=>{custom=true;clearSelection();update();});
  $('#calc-currency').addEventListener('change',()=>{custom=true;clearSelection();update(true);});
  $('.calc-reset').addEventListener('click',()=>{clearSelection();fields.forEach(key=>$('#calc-'+key).value=defaults[key]);$('#calc-process').value=defaults.process;$('#calc-slider').value=defaults.reduction;custom=false;update(true);});
  notice.querySelector('button').addEventListener('click',()=>{clearSelection();$('#calc-hours').focus();root.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});});
  notice.querySelector('button').type='button';
  $('.calc-use').addEventListener('click',()=>{
    const data=read();if(!data)return;selected={...data};renderNotice();eventSelection();
    const form=document.querySelector('#brief-form');if(form.hidden)document.querySelector('.edit-brief').click();
    const project=document.querySelector('#project');project.tabIndex=-1;project.focus({preventScroll:true});project.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
    history.replaceState(null,'',location.pathname+location.search+'#project');
  });
  window.SlimCalculator = {getBrief(lang) {
    if(!selected)return '';const c=words[lang==='en'?'en':'nl'], s=selected, r=window.SlimCalculatorMath.calculate(s);
    return [c.briefTitle,`${c.briefProcess}: ${c.processes[s.process]}`,`${c.currency}: ${s.currency}`,`${c.hours}: ${number(s.hours,lang)}`,`${c.rate}: ${money(s.rate,s.currency,lang,2)}`,`${c.chosen}: ${s.reduction}%`,`${c.weeksBrief}: ${s.weeks}`,`${c.annual}: ${number(r.annualFreedHours,lang)}`,`${c.value}: ${money(r.annualCapacityValue,s.currency,lang)}`,c.briefNote].join('\n');
  }};
  new MutationObserver(()=>{locale=document.documentElement.lang==='en'?'en':'nl';translate();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  translate();
  window.addEventListener('load',()=>{if(location.hash==='#calculator')root.scrollIntoView({behavior:'instant',block:'start'});},{once:true});
})();
