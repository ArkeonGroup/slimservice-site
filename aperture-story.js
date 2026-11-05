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
 let staticView=false,compactView=false,inView=true,lastProgress=0,lastProjection=null,lastGeometry=null,sourceReady=false,caseAmount=0;
 source.addEventListener('load',()=>{sourceReady=true;window.dispatchEvent(new Event('resize'));});
 document.documentElement.classList.add('aperture-mode','continuous-studio');
 function setStatic(value){value=!!value;if(value===staticView)return;staticView=value;plane.hidden=value;for(const r of records){if(value||(compactView&&r.name==='content'))r.marker.after(r.element);else r.layer.append(r.element);r.layer.inert=value;}if(value){photo.style.display='';photo.removeAttribute('aria-hidden');second.hidden=true;track.style.transform='none';stage.removeAttribute('data-ap-phase');}else second.hidden=false;}
 function setCompact(value){value=!!value;if(value===compactView)return;compactView=value;const r=records[2];if(value||staticView)r.marker.after(r.element);else r.layer.append(r.element);r.element.style.removeProperty('transform');r.element.style.removeProperty('visibility');r.element.inert=false;}
 function getFrame(p,{flow=false}={}){
  const active=p<.86?0:p<1.91?1:p<2.91?2:3;
  const opacity=Array(5).fill(0);opacity[active]=active===0?1-smooth(.18,.38,p):active===1?smooth(1.38,1.45,p):1;
  return{active,opacity,enter:Array(5).fill(1),leave:Array(5).fill(0)};
 }
 function getPose(p,{small=false,material='aluminium',light=75}={}){
  const travel=smooth(.24,.98,p),breath=Math.sin(Math.PI*travel);
  // Pull back during the orbit, then meet the exact original board projection.
  // This keeps the lamp's edge legible instead of filling the screen with metal.
  return{material,layout:small?'compact':'wide',rotation:-.28+(small?breath*.22:0),cameraZoom:(small?1.02:.84)-breath*(small?.10:.14),cameraOrbit:small?-.12+breath*.10:-.06,cameraLift:breath*(small?.04:.07),cameraShiftX:small?0:.03,cameraShiftY:small?-.035:-.02,assembly:0,lightAim:0,light:p>4?light:mix(75,100,smooth(.2,.7,p)),storyTravel:travel,boardVisibility:smooth(.24,.43,p)*(1-smooth(1.145,1.22,p)),boardExposure:smooth(.60,.98,p)};
 }
 function projectQuad(points){
  const [p0,p1,p2,p3]=points;const dx1=p1.x-p2.x,dx2=p3.x-p2.x,dx3=p0.x-p1.x+p2.x-p3.x,dy1=p1.y-p2.y,dy2=p3.y-p2.y,dy3=p0.y-p1.y+p2.y-p3.y;
  const den=dx1*dy2-dx2*dy1;const g=Math.abs(den)<1e-8?0:(dx3*dy2-dx2*dy3)/den,h=Math.abs(den)<1e-8?0:(dx1*dy3-dx3*dy1)/den;
  const a=p1.x-p0.x+g*p1.x,b=p3.x-p0.x+h*p3.x,d=p1.y-p0.y+g*p1.y,e=p3.y-p0.y+h*p3.y;
  // Once the board is flat, leave the projective compositor. Keeping nested
  // coplanar 3D layers can drop an image during a stationary reading hold.
  plane.style.transform=Math.abs(g)<1e-8&&Math.abs(h)<1e-8
   ?`matrix(${a/1000},${d/1000},${b/625},${e/625},${p0.x},${p0.y})`
   :`matrix3d(${a/1000},${d/1000},0,${g/1000},${b/625},${e/625},0,${h/625},0,0,1,0,${p0.x},${p0.y},0,1)`;
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
  // Work is the subject, not a small slide in the room. The first website shares
  // its reading hold with a narrow evidence column; identity then owns the stage.
  // Keep the bottom controls and the short-laptop CTA outside the image bounds.
  const mediaTop=h<=800?Math.max(226,h*.315):Math.max(235,h*.245);
  const mediaHeight=Math.max(190,h-mediaTop-106);
  const websiteWidth=Math.min(w*.65,mediaHeight*1.6);
  const identityWidth=Math.min(w*.82,mediaHeight*1.6);
  const cargoWidth=Math.min(w*.49,h*.52*1.6);
  const width=small?mix(w-32,w*.43,bikeScale):mix(mix(websiteWidth,identityWidth,contentScale),cargoWidth,bikeScale),height=width/1.6;
  const top=small?mix(Math.max(210,h*.27),104,bikeScale):mix(mediaTop,h*(h<=800?.34:.29),bikeScale);
  const websiteLeft=w*.05,identityLeft=(w-identityWidth)/2;
  const left=small?mix(16,w-width-16,bikeScale):mix(mix(websiteLeft,identityLeft,contentScale),w*.05,bikeScale);
  const settled=rect(left,top,width,height);
  stage.style.setProperty('--case-evidence-left',`${websiteLeft+websiteWidth+Math.max(32,w*.035)}px`);
  stage.style.setProperty('--case-evidence-top',`${mediaTop+12}px`);
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
  if(photo.getAttribute('src')!=='assets/bateman-website.png')photo.src='assets/bateman-website.png';track.style.transform=caseAmount===0?'none':'translateX(-50%)';second.hidden=false;photo.alt=document.documentElement.lang==='en'?'Bateman Construction, website design':'Bateman Construction, ontworpen website';photo.setAttribute('aria-hidden',String(caseAmount>.5));second.setAttribute('aria-hidden',String(caseAmount<=.5));
  for(const r of records){r.layer.style.visibility='hidden';r.layer.inert=true;r.layer.setAttribute('aria-hidden','true');r.layer.dataset.apActive='false';}
  // Hold each face readable, then cross its edge within a short scroll interval.
  // The outgoing and incoming faces still meet at the chapter boundary without overlap.
  const webAmount=p<2.36?1-smooth(1.84,1.91,p):smooth(2.91,2.98,p);
  work.layer.style.visibility=p<1.91||p>=2.91?'visible':'hidden';work.layer.style.opacity='1';work.layer.style.transform=webAmount===1?'none':`perspective(1800px) rotateX(${(1-webAmount)*(p<2.36?-87:87)}deg)`;work.layer.inert=owner!==1&&owner!==3;work.layer.setAttribute('aria-hidden',String(work.layer.inert));work.layer.dataset.apActive=String(!work.layer.inert);work.layer.setAttribute('aria-labelledby','light-title-'+(owner===1?1:3));
  const content=records[2],contentAmount=smooth(1.91,1.98,p)*(1-smooth(2.84,2.91,p));content.layer.style.visibility=p>=1.91&&p<2.91?'visible':'hidden';content.layer.style.opacity='1';content.layer.style.transform=contentAmount===1?'none':`perspective(1800px) rotateX(${(1-contentAmount)*(p<2.36?87:-87)}deg)`;content.layer.inert=owner!==2;content.layer.setAttribute('aria-hidden',String(content.layer.inert));content.layer.dataset.apActive=String(!content.layer.inert);
  if(compactView){
    // A portrait brand surface keeps real text and controls at native size. It
    // receives the same fold as the physical board, instead of shrinking a desktop collage.
    content.element.style.transform=contentAmount===1?'none':`perspective(900px) rotateX(${(1-contentAmount)*(p<2.36?80:-80)}deg) translateZ(${(1-contentAmount)*-90}px)`;
    content.element.style.visibility=p>=1.91&&p<2.91?'visible':'hidden';content.element.inert=owner!==2;
  }
  plane.classList.toggle('continuous-arrived',p>1.25);plane.style.setProperty('--continuous-split','1');plane.inert=p<1.17;
  lastGeometry={corners:current,owner,caseAmount,travel:renderer?.getStats().state.storyTravel,sourceReady};
 }
 function setInView(value){inView=!!value;}
 function getState(){return{progress:lastProgress,static:staticView,compact:compactView,inView,geometry:lastGeometry,projection:lastProjection?.board||null,planeVisible:!plane.hidden};}
 return Object.freeze({setStatic,setCompact,getFrame,getPose,paint,setInView,getState});
}
window.SlimApertureScene=Object.freeze({create});
})();
