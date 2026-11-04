/* One physical studio: the camera reaches the actual work, then the work stays live. */
(() => {
'use strict';
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const mix=(a,b,t)=>a+(b-a)*t;
const rect=(x,y,w,h)=>[{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}];
function create({story,stage,world,scenes}){
 const plane=document.createElement('div');plane.className='aperture-plane';plane.setAttribute('aria-label','Werk in het licht');stage.append(plane);
 const records=[['brand','.light-identity',1],['work','.light-website',3],['content','.light-content-surfaces',2]].map(([name,selector,index])=>{const element=story.querySelector(selector),marker=document.createComment('original '+name),layer=document.createElement('div');element.before(marker);layer.className='aperture-layer';layer.dataset.apertureLayer=name;layer.setAttribute('role','group');layer.setAttribute('aria-labelledby','light-title-'+index);layer.append(element);plane.append(layer);return{name,index,element,marker,layer};});
 const work=records[1],photo=work.element.querySelector('.light-website-image'),track=document.createElement('div');track.className='continuous-case-track';photo.before(track);track.append(photo);
 const second=new Image();second.src='assets/bakfietsmaat/website.jpg';second.alt='De Bakfietsmaat, ontworpen website';second.width=1440;second.height=900;second.className='continuous-second-case';track.append(second);
 const source=new Image();source.src='assets/bateman-website.png';
 let staticView=false,inView=true,lastProgress=0,lastProjection=null,lastGeometry=null,sourceReady=false,caseAmount=0;
 source.addEventListener('load',()=>{sourceReady=true;window.dispatchEvent(new Event('resize'));});
 document.documentElement.classList.add('aperture-mode','continuous-studio');
 function setStatic(value){value=!!value;if(value===staticView)return;staticView=value;plane.hidden=value;for(const r of records){if(value)r.marker.after(r.element);else r.layer.append(r.element);r.layer.inert=value;}if(value){photo.style.display='';photo.removeAttribute('aria-hidden');second.hidden=true;track.style.transform='none';stage.removeAttribute('data-ap-phase');}else second.hidden=false;}
 function getFrame(p,{flow=false}={}){
  const active=p<1.04?0:p<1.91?1:p<2.91?2:3;
  const opacity=Array(5).fill(0);opacity[active]=active===0?1-smooth(.12,.30,p):active===1?smooth(1.04,1.18,p):1;
  return{active,opacity,enter:Array(5).fill(1),leave:Array(5).fill(0)};
 }
 function getPose(p,{small=false,material='aluminium',light=75}={}){
  const back=0,travel=smooth(.30,1.14,p);
  return{material,layout:small?'compact':'wide',rotation:mix(-.28,.28,back),cameraZoom:small?mix(.98,.92,back):mix(.84,.46,back),cameraOrbit:mix(-.06,.12,back),cameraLift:mix(0,.02,back),cameraShiftX:small?0:mix(.03,-.40,back),cameraShiftY:small?mix(-.17,0,back):mix(-.02,-.20,back),assembly:0,lightAim:0,light:p>4?light:mix(75,100,smooth(.2,.7,p)),storyTravel:travel,boardVisibility:smooth(.30,.55,p)*(1-smooth(1.145,1.22,p)),boardExposure:smooth(.70,1.12,p)*(1-back)};
 }
 function projectQuad(points){
  const [p0,p1,p2,p3]=points;const dx1=p1.x-p2.x,dx2=p3.x-p2.x,dx3=p0.x-p1.x+p2.x-p3.x,dy1=p1.y-p2.y,dy2=p3.y-p2.y,dy3=p0.y-p1.y+p2.y-p3.y;
  const den=dx1*dy2-dx2*dy1;const g=Math.abs(den)<1e-8?0:(dx3*dy2-dx2*dy3)/den,h=Math.abs(den)<1e-8?0:(dx1*dy3-dx3*dy1)/den;
  const a=p1.x-p0.x+g*p1.x,b=p3.x-p0.x+h*p3.x,d=p1.y-p0.y+g*p1.y,e=p3.y-p0.y+h*p3.y;
  plane.style.transform=`matrix3d(${a/1000},${d/1000},0,${g/1000},${b/625},${e/625},0,${h/625},0,0,1,0,${p0.x},${p0.y},0,1)`;
 }
 function paint(p,{small=false,inline=false,renderer,selectedCase='bateman',caseManual=false}={}){
  lastProgress=p;if(staticView){plane.hidden=true;return;}
  if(source.complete&&source.naturalWidth&&!sourceReady)sourceReady=true;
  if(renderer&&sourceReady&&renderer.getStats().projectSource!==source.src){renderer.setProjectImage(source);renderer.render();}
  const owner=getFrame(p,{flow:small&&p<4}).active;stage.dataset.apPhase=['intro','brand','content','work','systems'][owner];
  document.documentElement.classList.remove('aperture-paper');story.classList.remove('aperture-paper');stage.style.setProperty('--ap-paper','0');
  if(inline&&p>=4){plane.hidden=true;return;}
  const projection=renderer?.getProjection?.();if(projection)lastProjection=projection;
  let corners=projection?.board;
  const w=stage.clientWidth,h=stage.clientHeight;
  const contentScale=smooth(1.64,2.06,p),bikeScale=smooth(2.68,3.12,p);
  const top=small?h*.47:mix(h*.28,h*(h<=800?.34:.29),bikeScale);
  const availableHeight=mix(mix(h*.47,h*.56,contentScale),Math.min(h*.52,w*.49/1.6),bikeScale);
  const width=small?w*.88:Math.min(w*.88,Math.max(190,availableHeight)*1.6),height=width/1.6;
  const settled=rect(mix((w-width)/2,w*.05,bikeScale),top,width,height);
  if(!corners)corners=settled;
  const arrival=smooth(1.17,1.38,p);
  const current=corners.map((q,i)=>({x:mix(q.x,settled[i].x,arrival),y:mix(q.y,settled[i].y,arrival)}));
  projectQuad(current);plane.hidden=p<1.145||inline;plane.style.opacity='1';plane.style.filter='none';
  const toContent=smooth(1.64,2.06,p),toBike=smooth(2.68,3.12,p);
  stage.style.setProperty('--cargo-in',String(smooth(3.08,3.18,p)));
  stage.style.setProperty('--proof-visible',String(smooth(1.25,1.38,p)*(1-smooth(1.60,1.86,p))));
  // The first case completes before the next one enters. Change the underlying
  // website only while its surface is off-screen behind the Bateman brand/film.
  caseAmount=p<2.36?0:1;
  if(photo.getAttribute('src')!=='assets/bateman-website.png')photo.src='assets/bateman-website.png';track.style.transform=`translateX(${-caseAmount*50}%)`;second.hidden=false;photo.alt=document.documentElement.lang==='en'?'Bateman Construction, website design':'Bateman Construction, ontworpen website';photo.setAttribute('aria-hidden',String(caseAmount>.5));second.setAttribute('aria-hidden',String(caseAmount<=.5));
  for(const r of records){r.layer.style.visibility='hidden';r.layer.inert=true;r.layer.setAttribute('aria-hidden','true');r.layer.dataset.apActive='false';}
  // Hold each face readable, then cross its edge within a short scroll interval.
  // The outgoing and incoming faces still meet at the chapter boundary without overlap.
  const webAmount=p<2.36?1-smooth(1.84,1.91,p):smooth(2.91,2.98,p);
  work.layer.style.visibility=p<1.91||p>=2.91?'visible':'hidden';work.layer.style.opacity='1';work.layer.style.transform=`perspective(1800px) rotateX(${(1-webAmount)*(p<2.36?-87:87)}deg)`;work.layer.inert=owner!==1&&owner!==3;work.layer.setAttribute('aria-hidden',String(work.layer.inert));work.layer.dataset.apActive=String(!work.layer.inert);work.layer.setAttribute('aria-labelledby','light-title-'+(owner===1?1:3));
  const content=records[2],contentAmount=smooth(1.91,1.98,p)*(1-smooth(2.84,2.91,p));content.layer.style.visibility=p>=1.91&&p<2.91?'visible':'hidden';content.layer.style.opacity='1';content.layer.style.transform=`perspective(1800px) rotateX(${(1-contentAmount)*(p<2.36?87:-87)}deg)`;content.layer.inert=owner!==2;content.layer.setAttribute('aria-hidden',String(content.layer.inert));content.layer.dataset.apActive=String(!content.layer.inert);
  plane.classList.toggle('continuous-arrived',p>1.25);plane.style.setProperty('--continuous-split','1');plane.inert=p<1.17;
  lastGeometry={corners:current,owner,caseAmount,travel:renderer?.getStats().state.storyTravel,sourceReady};
 }
 function setInView(value){inView=!!value;}
 function getState(){return{progress:lastProgress,static:staticView,inView,geometry:lastGeometry,projection:lastProjection?.board||null,planeVisible:!plane.hidden};}
 return Object.freeze({setStatic,getFrame,getPose,paint,setInView,getState});
}
window.SlimApertureScene=Object.freeze({create});
})();
