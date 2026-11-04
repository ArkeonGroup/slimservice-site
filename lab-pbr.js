/* Light Study 01: authored mesh, physical materials and studio lighting.
 * Three.js 0.187.0 is locally vendored under MIT. Geometry, surface data and
 * reflection studio are authored here. No CDN, downloaded textures or loop.
 */
import * as THREE from './vendor/three/three.module.js';
import {RectAreaLightUniformsLib} from './vendor/three/lights/RectAreaLightUniformsLib.js';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const ease=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const subtract=(a,b)=>a.map((v,i)=>v-b[i]);
const multiply=(a,s)=>a.map(v=>v*s);
const normalize=a=>multiply(a,1/Math.max(Math.hypot(...a),1e-12));
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function randomField(size,seed=17){let v=seed;const values=new Float32Array(size*size);for(let i=0;i<values.length;i++){v^=v<<13;v^=v>>>17;v^=v<<5;values[i]=(v>>>0)/4294967295;}return values;}
function scalarTexture(size,fn){
  const data=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const v=Math.round(clamp(fn(x,y))*255),i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=v;data[i+3]=255;}
  const t=new THREE.DataTexture(data,size,size,THREE.RGBAFormat);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.LinearFilter;t.minFilter=THREE.LinearMipmapLinearFilter;t.generateMipmaps=true;t.needsUpdate=true;return t;
}
function roundedShape(w,h,r){
  const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
function ribbonGeometry(){
  const path=[];
  for(let i=0;i<=24;i++)path.push(new THREE.Vector2(.055,mix(.19,1.4,i/24)));
  for(let i=1;i<=100;i++){const a=i/100*Math.PI/2;path.push(new THREE.Vector2(-1.1+1.155*Math.cos(a),1.4+1.45*Math.sin(a)));}
  for(let i=1;i<=44;i++)path.push(new THREE.Vector2(mix(-1.1,-3.06,i/44),2.85));
  const positions=[],uvs=[],indices=[],perimeter=[];
  for(let corner=0;corner<4;corner++)for(let j=0;j<=6;j++)perimeter.push([corner,(corner*Math.PI/2)+(j/6)*Math.PI/2]);
  const rings=path.length,n=perimeter.length,distances=[0];
  for(let i=1;i<rings;i++)distances.push(distances[i-1]+path[i].distanceTo(path[i-1]));
  for(let i=0;i<rings;i++){
    const p=path[i],t=path[Math.min(i+1,rings-1)].clone().sub(path[Math.max(i-1,0)]).normalize(),nx=-t.y,ny=t.x;
    const halfWidth=(mix(.405,.505,ease(.55,2.60,p.y))-.040*ease(2.65,3.06,-p.x))*(i===rings-1?.96:1),halfThickness=.045,r=.0135;
    perimeter.forEach(([corner,a],j)=>{const cx=(corner===0||corner===3?1:-1)*(halfThickness-r),cz=(corner===0||corner===1?1:-1)*(halfWidth-r),en=cx+Math.cos(a)*r,ez=cz+Math.sin(a)*r;positions.push(p.x+nx*en,p.y+ny*en,ez);uvs.push(distances[i]/distances[rings-1],j/(n-1));});
  }
  for(let i=0;i<rings-1;i++)for(let j=0;j<n;j++){const a=i*n+j,b=i*n+(j+1)%n,c=(i+1)*n+j,d=(i+1)*n+(j+1)%n;indices.push(a,b,c,b,d,c);}
  for(let end=0;end<2;end++){const ring=end?rings-1:0,p=path[ring],center=positions.length/3;positions.push(p.x,p.y,0);uvs.push(end,.5);for(let j=0;j<n;j++){const a=ring*n+j,b=ring*n+(j+1)%n;indices.push(...(end?[center,a,b]:[center,b,a]));}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();g.computeTangents();return g;
}
function ceramicGeometry(){
  const pts=[],r=.69,b=.035;pts.push(new THREE.Vector2(0,.015),new THREE.Vector2(r-b,.015));
  for(let i=0;i<=12;i++){const a=-Math.PI/2+i/12*Math.PI/2;pts.push(new THREE.Vector2(r-b+Math.cos(a)*b,.05+Math.sin(a)*b));}
  pts.push(new THREE.Vector2(r,.275));for(let i=0;i<=12;i++){const a=i/12*Math.PI/2;pts.push(new THREE.Vector2(r-b+Math.cos(a)*b,.275+Math.sin(a)*b));}pts.push(new THREE.Vector2(0,.31));return new THREE.LatheGeometry(pts,192);
}
function reflectionStudio(renderer){
  const studio=new THREE.Scene();studio.background=new THREE.Color(.012,.017,.015);
  // Feather the photographic softboxes in radiance, rather than reflecting
  // hard white rectangles as pale bands across the curved aluminium face.
  const softbox=scalarTexture(128,(x,y)=>Math.pow(Math.sin(Math.PI*(x+.5)/128)*Math.sin(Math.PI*(y+.5)/128),.7));
  softbox.wrapS=softbox.wrapT=THREE.ClampToEdgeWrapping;
  const panel=(position,w,h,color,intensity,target)=>{const m=new THREE.MeshBasicMaterial({map:softbox,color:new THREE.Color(color).multiplyScalar(intensity),side:THREE.DoubleSide}),p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);p.position.fromArray(position);p.lookAt(...target);studio.add(p);};
  panel([-3.5,5.2,4.8],3.8,6.5,0xfff4df,2.7,[-1,1.6,0]);panel([4.8,3.3,-3.2],1.2,5.5,0xe0e9e8,1.7,[-1,1.6,0]);panel([-5.5,2.7,-1.5],2.2,3,0xffdbac,1.35,[-1,1.6,0]);panel([1,6.2,0],3,2,0xffffff,1.5,[-1,1,0]);
  // A controlled narrow flank retains the metal's edge definition. The former
  // adjacent black card and intensity-eight strip made a sharp chalky band.
  panel([4.8,1.2,-5.8],.7,6,0xfff2df,3.9,[0,1.2,0]);
  panel([5.7,1.6,-5.2],1.4,6,0xe0dfd3,1.2,[0,1.2,0]);
  const pmrem=new THREE.PMREMGenerator(renderer);pmrem.compileCubemapShader();const target=pmrem.fromScene(studio,.04,.1,40,{size:256});pmrem.dispose();studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});softbox.dispose();return target;
}
export function create(canvas){
  if(!canvas||typeof canvas.getContext!=='function')throw new Error('A canvas is required.');
  RectAreaLightUniformsLib.init();
  const renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,depth:true,stencil:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  const scene=new THREE.Scene();scene.background=new THREE.Color('#0c1712');scene.fog=new THREE.FogExp2('#0c1712',.021);
  const environment=reflectionStudio(renderer);scene.environment=environment.texture;scene.environmentIntensity=.8;
  const camera=new THREE.PerspectiveCamera(28,1,.03,70),root=new THREE.Group(),metalGroup=new THREE.Group(),diffuserGroup=new THREE.Group();root.add(metalGroup,diffuserGroup);scene.add(root);
  const textures=[],materials=[],geometries=[],ownT=t=>(textures.push(t),t),ownM=m=>(materials.push(m),m),ownG=g=>(geometries.push(g),g);
  const size=512,field=randomField(size);
  const valueNoise=(x,y)=>{const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy),at=(a,b)=>field[((b%size+size)%size)*size+(a%size+size)%size];return mix(mix(at(ix,iy),at(ix+1,iy),sx),mix(at(ix,iy+1),at(ix+1,iy+1),sx),sy);};
  const grain=ownT(scalarTexture(size,(x,y)=>.30+field[y*size+x]*.18+valueNoise(x*.18,y*.18)*.30));grain.repeat.set(1,2);
  const ceramicColor=ownT(scalarTexture(size,(x,y)=>.82+field[y*size+x]*.08+valueNoise(x*.2,y*.2)*.10));ceramicColor.repeat.set(1,2);
  // Direct tangent-space micro-normal avoids height derivatives turning fine
  // brushing into a ribbed sheet. No regular sine bands and no large bump scale.
  const brushData=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=(y*size+x)*4,line=field[y*size+((x/96)|0)],micro=field[y*size+x];brushData[i]=Math.round(128+(micro-.5)*2);brushData[i+1]=Math.round(128+(line-.5)*4);brushData[i+2]=255;brushData[i+3]=255;}
  const brush=ownT(new THREE.DataTexture(brushData,size,size));brush.wrapS=brush.wrapT=THREE.RepeatWrapping;brush.generateMipmaps=true;brush.minFilter=THREE.LinearMipmapLinearFilter;brush.magFilter=THREE.LinearFilter;brush.repeat.set(3,5.5);brush.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());brush.needsUpdate=true;
  // Roughness carries only microcontrast. Large correlated changes read as
  // milled grooves at hero scale, rather than a finely brushed sheet.
  const brushRough=ownT(scalarTexture(size,(x,y)=>.94+.060*(field[y*size+((x/96)|0)]-.5)+.010*(field[y*size+x]-.5)));brushRough.repeat.copy(brush.repeat);
  const metal=ownM(new THREE.MeshPhysicalMaterial({color:'#c9c6bb',metalness:1,roughness:.27,roughnessMap:brushRough,normalMap:brush,normalScale:new THREE.Vector2(.14,.14),anisotropy:.42,anisotropyRotation:0,envMapIntensity:1.05}));
  const ribbon=new THREE.Mesh(ownG(ribbonGeometry()),metal);ribbon.castShadow=ribbon.receiveShadow=true;metalGroup.add(ribbon);
  const ceramic=ownM(new THREE.MeshPhysicalMaterial({color:'#ac6443',map:ceramicColor,metalness:0,roughness:.80,bumpMap:grain,bumpScale:.008,envMapIntensity:.30}));
  // Object-space grain keeps the fine clay surface present where the lathe's
  // side-wall UVs compress. It affects pigmentation and microsurface roughness.
  ceramic.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec3 vClayPosition;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvClayPosition=position;');
    shader.fragmentShader='varying vec3 vClayPosition;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float clayGrain=fract(sin(dot(floor(vClayPosition*230.),vec3(12.9898,78.233,37.719)))*43758.5453);
      diffuseColor.rgb*=.95+clayGrain*.10;`);
  };
  const base=new THREE.Mesh(ownG(ceramicGeometry()),ceramic);base.castShadow=base.receiveShadow=true;root.add(base);
  const insetGeometry=ownG(new THREE.ExtrudeGeometry(roundedShape(1.8,.78,.065),{depth:.016,bevelEnabled:true,bevelSize:.008,bevelThickness:.006,bevelSegments:4,curveSegments:20,steps:1}));insetGeometry.rotateX(Math.PI/2);insetGeometry.translate(-2.08,2.807,0);
  const diffuserMat=ownM(new THREE.MeshPhysicalMaterial({color:'#fff1cf',metalness:0,roughness:.43,emissive:'#ffcb7e',emissiveIntensity:1.6,envMapIntensity:.2}));diffuserGroup.add(new THREE.Mesh(insetGeometry,diffuserMat));
  const floorNoise=ownT(scalarTexture(size,(x,y)=>.28+field[y*size+x]*.14+valueNoise(x*.19,y*.19)*.32+valueNoise(x*.047,y*.047)*.12));floorNoise.repeat.set(36,36);
  const floorColor=ownT(scalarTexture(size,(x,y)=>.65+valueNoise(x*.19,y*.19)*.24+field[y*size+x]*.11));floorColor.repeat.set(36,36);
  const floorMat=ownM(new THREE.MeshStandardMaterial({color:'#26291f',map:floorColor,roughness:.86,bumpMap:floorNoise,bumpScale:.018,envMapIntensity:.12}));
  const floor=new THREE.Mesh(ownG(new THREE.PlaneGeometry(180,180)),floorMat);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
  scene.add(new THREE.HemisphereLight('#bbd0c6','#19170f',.06));
  const key=new THREE.RectAreaLight('#fff6e5',1.65,4.8,5.6);key.position.set(-3.5,5.2,4.8);key.lookAt(-1.1,1.7,0);scene.add(key);
  const edge=new THREE.RectAreaLight('#dce6e4',.85,1.2,4.5);edge.position.set(3.8,3.4,-3);edge.lookAt(-1,1.8,0);scene.add(edge);
  const lampArea=new THREE.RectAreaLight('#ffe0b0',24,1.77,.77);scene.add(lampArea);
  const lampSpot=new THREE.SpotLight('#ffdcaa',42,18,.68,.78,2);lampSpot.castShadow=true;lampSpot.shadow.mapSize.set(1024,1024);lampSpot.shadow.bias=-.00015;lampSpot.shadow.normalBias=.015;lampSpot.shadow.radius=3;scene.add(lampSpot,lampSpot.target);
  const bounce=new THREE.RectAreaLight('#efb978',2.1,2.6,1.2);bounce.position.set(-1.7,.6,1);bounce.lookAt(-.3,2,0);root.add(bounce);
  const contactData=new Uint8Array(128*128*4);for(let y=0;y<128;y++)for(let x=0;x<128;x++){const d=Math.hypot((x-63.5)/63.5,(y-63.5)/63.5),i=(y*128+x)*4;contactData[i+3]=Math.round((1-ease(.57,1,d))*.62*255);}
  const contactTexture=ownT(new THREE.DataTexture(contactData,128,128));contactTexture.needsUpdate=true;
  const contact=new THREE.Mesh(ownG(new THREE.PlaneGeometry(1.86,1.86)),ownM(new THREE.MeshBasicMaterial({map:contactTexture,transparent:true,depthWrite:false,toneMapped:false})));contact.rotation.x=-Math.PI/2;contact.position.y=.002;scene.add(contact);
  const boardGeometry=ownG(new THREE.PlaneGeometry(4.2,2.625));boardGeometry.rotateX(-Math.PI/2);
  // Standard Three texture upload flips source Y; z-negative therefore keeps v=1.
  const boardUniforms={map:{value:null},exposure:{value:0},visibility:{value:0},sourceLight:{value:new THREE.Vector3()},sourceDir:{value:new THREE.Vector3(0,-1,0)},power:{value:.75}};
  const boardMat=ownM(new THREE.ShaderMaterial({transparent:true,depthWrite:true,uniforms:boardUniforms,vertexShader:`varying vec2 vUv;varying vec3 vWorld;void main(){vUv=uv;vec4 world=modelMatrix*vec4(position,1.);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,fragmentShader:`uniform sampler2D map;uniform float exposure;uniform float visibility;uniform vec3 sourceLight;uniform vec3 sourceDir;uniform float power;varying vec2 vUv;varying vec3 vWorld;void main(){vec3 src=texture2D(map,vUv).rgb;vec3 d=sourceLight-vWorld;float dist=length(d);float pool=pow(max(dot(-normalize(d),sourceDir),0.),2.8)/(1.+dist*dist*.045);vec3 lit=src*(vec3(.11,.13,.11)+vec3(1.,.77,.45)*power*pool*2.1);gl_FragColor=vec4(mix(lit,src,exposure),visibility);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,toneMapped:false}));
  const board=new THREE.Mesh(boardGeometry,boardMat);board.position.set(-5.2,.026,0);board.visible=false;scene.add(board);
  let viewWidth=Math.max(1,canvas.clientWidth||canvas.width||1),viewHeight=Math.max(1,canvas.clientHeight||canvas.height||1),disposed=false,frames=0,lastDrawMs=0,projectReady=false,projectSource='',projectTexture=null;
  const state={rotation:0,light:75,material:'aluminium',layout:'wide',cameraZoom:1,cameraOrbit:0,cameraLift:0,cameraShiftX:0,cameraShiftY:0,assembly:0,lightAim:0,storyTravel:0,boardVisibility:0,boardExposure:0};
  function setState(next={}){if(Number.isFinite(next.rotation))state.rotation=next.rotation;if(Number.isFinite(next.light))state.light=clamp(next.light,0,100);if(['aluminium','bronze','graphite'].includes(next.material))state.material=next.material;if(next.layout==='wide'||next.layout==='compact')state.layout=next.layout;const limits={cameraZoom:[.35,2.6],cameraOrbit:[-1.2,1.2],cameraLift:[-.8,1.5],cameraShiftX:[-.6,.6],cameraShiftY:[-.4,.4],assembly:[0,1],lightAim:[-1,1],storyTravel:[0,1],boardVisibility:[0,1],boardExposure:[0,1]};for(const [key,[a,b]]of Object.entries(limits))if(Number.isFinite(next[key]))state[key]=clamp(next[key],a,b);}
  function setProjectImage(image){if(disposed||!image||!(image.naturalWidth||image.width)||!image.complete)return false;const source=image.currentSrc||image.src||'';if(projectReady&&projectSource===source)return true;projectTexture?.dispose();projectTexture=new THREE.Texture(image);projectTexture.colorSpace=THREE.SRGBColorSpace;projectTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());projectTexture.needsUpdate=true;boardUniforms.map.value=projectTexture;projectReady=true;projectSource=source;return true;}
  function resize(width,height,dpr=1){if(disposed)return;viewWidth=Math.max(1,Number(width)||1);viewHeight=Math.max(1,Number(height)||1);const cap=viewWidth<700?1100000:2600000,ratio=Math.min(2,Math.max(1,Number(dpr)||1),Math.sqrt(cap/(viewWidth*viewHeight)));renderer.setPixelRatio(ratio);renderer.setSize(viewWidth,viewHeight,false);}
  function cameraState(){
    const travel=state.storyTravel,aspect=viewWidth/viewHeight,compact=state.layout==='compact',rotation=state.rotation+ease(.48,.98,travel)*1.45,ic=Math.cos(state.rotation),is=Math.sin(state.rotation);
    const originalTarget=[-1.05*ic,1.45+state.assembly*.275,1.05*is],target=originalTarget.map((v,i)=>mix(v,[-5.2,.026,0][i],travel));
    const co=Math.cos(state.cameraOrbit),si=Math.sin(state.cameraOrbit),startOffset=[4.5*co+6.3*si,.53+state.cameraLift,6.3*co-4.5*si],startRadius=Math.hypot(...startOffset),azimuth=mix(Math.atan2(startOffset[0],startOffset[2]),0,travel),elevation=mix(Math.asin(startOffset[1]/startRadius),Math.PI/2-.00001,travel),radius=mix(startRadius,7.4,travel);
    const offset=[Math.sin(azimuth)*Math.cos(elevation)*radius,Math.sin(elevation)*radius,Math.cos(azimuth)*Math.cos(elevation)*radius],eye=add(target,offset),forward=normalize(multiply(offset,-1)),right=normalize(cross(forward,[0,1,0])),up=cross(right,forward);
    const originalLens=(compact?Math.min(1.85,aspect*1.60):1.95)*state.cameraZoom/(1+state.assembly*.12),endHeight=compact?.88*aspect/1.6:.56,lens=mix(originalLens,endHeight*7.4/2.625,travel),shiftX=mix((compact?0:aspect*.19)+state.cameraShiftX*aspect,0,travel),shiftY=mix(.035+state.cameraShiftY,compact?-.07:-.06,travel);
    const cr=Math.cos(rotation),sr=Math.sin(rotation),rotate=p=>[cr*p[0]+sr*p[2],p[1],-sr*p[0]+cr*p[2]],emitter=rotate([-2.04,2.77+state.assembly*.30,0]),originalBeam=rotate(normalize([state.lightAim*.6,-1,0])),towardBoard=normalize(subtract([-5.2,.026,0],emitter)),steer=ease(.04,.66,travel),beamDirection=normalize(originalBeam.map((v,i)=>mix(v,towardBoard[i],steer)));
    return{eye,target,forward,right,up,lens,aspect,shiftX,shiftY,rotation,beamDirection,emitter};
  }
  function render(){
    if(disposed||renderer.getContext().isContextLost())return false;const start=performance.now(),c=cameraState();camera.position.fromArray(c.eye);camera.up.set(0,1,0);camera.lookAt(...c.target);camera.aspect=c.aspect;camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(.5/c.lens));camera.updateProjectionMatrix();camera.projectionMatrix.elements[8]=-2*c.shiftX/c.aspect;camera.projectionMatrix.elements[9]=-2*c.shiftY;camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    root.rotation.y=c.rotation;metalGroup.position.y=state.assembly*.55;diffuserGroup.position.y=state.assembly*.30;const power=state.light/100;lampArea.position.fromArray(c.emitter);lampArea.lookAt(...add(c.emitter,c.beamDirection));lampArea.intensity=power*24;lampSpot.position.fromArray(add(c.emitter,multiply(c.beamDirection,.04)));lampSpot.target.position.fromArray(add(c.emitter,multiply(c.beamDirection,7)));lampSpot.intensity=power*42;bounce.intensity=power*2.1;diffuserMat.emissiveIntensity=.25+power*1.9;
    if(state.material==='bronze'){metal.color.set('#a37a48');metal.roughness=.31;}else if(state.material==='graphite'){metal.color.set('#434c47');metal.roughness=.39;}else{metal.color.set('#c9c6bb');metal.roughness=.27;}
    board.visible=projectReady&&state.boardVisibility>.001;boardUniforms.visibility.value=state.boardVisibility;boardUniforms.exposure.value=state.boardExposure;boardUniforms.sourceLight.value.fromArray(c.emitter);boardUniforms.sourceDir.value.fromArray(c.beamDirection);boardUniforms.power.value=power;renderer.render(scene,camera);frames++;lastDrawMs=performance.now()-start;return true;
  }
  function getProjection(){
    const c=cameraState(),{eye,forward,right,up,lens,aspect,shiftX,shiftY,rotation}=c,co=Math.cos(rotation),si=Math.sin(rotation),world=p=>[co*p[0]+si*p[2],p[1],-si*p[0]+co*p[2]];
    function project(point){const relative=subtract(point,eye),depth=dot(relative,forward),d=Math.abs(depth)<1e-9?(depth<0?-1e-9:1e-9):depth,x=((lens*dot(relative,right)/d+shiftX)/aspect+.5)*viewWidth,y=(.5-lens*dot(relative,up)/d-shiftY)*viewHeight;return{x,y,depth,visible:depth>0&&x>=0&&x<=viewWidth&&y>=0&&y<=viewHeight};}
    const underside=2.774+state.assembly*.30,diffuser=[[-2.99,underside,-.405],[-1.17,underside,-.405],[-1.17,underside,.405],[-2.99,underside,.405]].map(p=>project(world(p))),board=[[-7.3,.026,-1.3125],[-3.1,.026,-1.3125],[-3.1,.026,1.3125],[-7.3,.026,1.3125]].map(project);
    const bounds=pts=>{const x=Math.min(...pts.map(p=>p.x)),y=Math.min(...pts.map(p=>p.y)),r=Math.max(...pts.map(p=>p.x)),b=Math.max(...pts.map(p=>p.y));return{x,y,width:r-x,height:b-y,visible:pts.some(p=>p.visible)};},floor=add(c.emitter,multiply(c.beamDirection,c.emitter[1]/Math.max(-c.beamDirection[1],.1)));
    return{width:viewWidth,height:viewHeight,board,boardBounds:bounds(board),emitter:project(c.emitter),diffuser,diffuserBounds:bounds(diffuser),floorTarget:project(floor),camera:{...c}};
  }
  function getStats(){return{renderer:'three-webgl-pbr',version:THREE.REVISION,frames,lastDrawMs,state:{...state},projectReady,projectSource,width:canvas.width,height:canvas.height,cssWidth:viewWidth,cssHeight:viewHeight,contextLost:renderer.getContext().isContextLost(),disposed,triangles:renderer.info.render.triangles,drawCalls:renderer.info.render.calls};}
  function dispose(){if(disposed)return;disposed=true;projectTexture?.dispose();textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());environment.dispose();renderer.dispose();}
  return Object.freeze({setState,setProjectImage,resize,render,dispose,getStats,getProjection});
}
