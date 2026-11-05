/* Local Three.js loader. No CDN, background loop or remote assets. */
(() => {
  'use strict';
  const source = document.currentScript?.src || new URL('lab-renderer.js', location.href).href;
  let pending;
  // Loading the entry script is cheap. The PBR module and its local Three.js
  // imports start only when an on-screen scene actually requests the renderer.
  Object.defineProperty(window,'SlimLabReady',{
    configurable:true,
    get(){
      if(!pending){
        pending=import(new URL('lab-pbr.js',source).href).then(module=>{
          window.SlimLabRenderer=Object.freeze({create:module.create});
          delete window.SlimLabLoadError;
          return window.SlimLabRenderer;
        },error=>{
          // A failed download must not permanently memoize the failure. The
          // visible retry button can request a new import without resetting
          // the page, its form fields or the visitor's material choices.
          pending=undefined;
          window.SlimLabLoadError=error;
          throw error;
        });
      }
      return pending;
    }
  });
})();
