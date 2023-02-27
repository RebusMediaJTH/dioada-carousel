!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):((e="undefined"!=typeof globalThis?globalThis:e||self).dioada=e.dioada||{},e.dioada.carousel=t())}(this,(function(){"use strict";var e=[{name:"idx",type:"int"},{name:"duration",type:"float"},{name:"timing-function",type:"string"},{name:"keyboard",type:"bool"},{name:"swipe",type:"bool"},{name:"aria-hide-inactive",type:"bool"}],t=function(t){var n={};return e.forEach((function(e){var i=t.getAttribute(e.name);i&&(n[function(e){return e.replace(/-([a-z])/g,(function(e){return e[1].toUpperCase()}))}(e.name)]=function(e,t){return"int"===t?parseInt(e,10):"float"===t?parseFloat(e):"bool"===t?"true"===e:e}(i,e.type))})),n},n={ArrowLeft:"prev",ArrowRight:"next",Home:0,End:"end"},i=function(e){return e.touches&&e.touches[0]?e.touches[0]:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0]||{}:e},o=function(e,t){var n,o,a,r,d,u,c=Object.assign({},t),s=function(n,i,o){var a="drag".concat(n),r=Object.assign({node:e,pageX:i.pageX,pageY:i.pageY,clientX:i.clientX,clientY:i.clientY},o);e.dispatchEvent(new CustomEvent(a,{detail:r})),t[a]&&t[a](r)},l=function(t){f.reset(),window.removeEventListener("mousemove",m),window.removeEventListener("touchmove",m),window.removeEventListener("mouseup",h),window.removeEventListener("touchend",h),t&&(e.removeEventListener("mousedown",v),e.removeEventListener("touchstart",v))},f=(r=16,{execute:function(e){d||(d=!0,u=window.setTimeout((function(){e(),d=!1}),r||0))},reset:function(){window.clearTimeout(u),d=!1}}),v=function(e){e.button||(e=i(e),o=n=[e.clientX,e.clientY],window.addEventListener("mousemove",m),window.addEventListener("touchmove",m),window.addEventListener("mouseup",h),window.addEventListener("touchend",h))},m=function(e){e=i(e),a||(s("start",e),a=!0),f.execute((function(){var t=[e.clientX,e.clientY];s("move",e,{totalChange:{x:t[0]-n[0],y:t[1]-n[1]},change:{x:t[0]-o[0],y:t[1]-o[1]}}),o=t}))},h=function(t){a?(t=i(t),s("stop",t),a=!1):e.dispatchEvent(new CustomEvent("clicked")),l()};c.disabled||(e.addEventListener("mousedown",v),e.addEventListener("touchstart",v))},a={idx:0,duration:.6,timingFunction:"ease-out",keyboard:!0,swipe:!0,ariaHideInactive:!0};return function(e){e=e||{};var i,r=document.querySelector(e.selector||"dioada-carousel"),d=(e=Object.assign({},a,e,t(r))).idx,u=d,c=0,s=r.querySelector("dioada-carousel-items"),l=[].slice.call(s.children),f=l.length,v=f?100/f:0;e.keyboard&&r.setAttribute("tabindex","0"),s.style.width="".concat(100*f,"%"),.6!==e.duration&&(s.style.transitionDuration="".concat(e.duration,"s")),"ease-out"!==e.timingFunction&&(s.style.transitionTimingFunction=e.timingFunction),e.ariaHideInactive||s.setAttribute("role","list"),l.forEach((function(t,n){e.ariaHideInactive?t.setAttribute("aria-hidden",n!==d):t.setAttribute("role","listitem")}));var m=function(){var e=-v*Math.min(f-1,d+1),t=-v*Math.max(0,d-1);s.style.transform="translate3d(".concat(Math.min(t,Math.max(e,-v*d+c)),"%, 0, 0)")},h=function(t){m(),e.ariaHideInactive&&(t||l[u].setAttribute("aria-hidden","true"),l[d].setAttribute("aria-hidden","false")),t||r.dispatchEvent(new CustomEvent("dioada.carousel.nav",{bubbles:!0,detail:{item:l[d],from:u,to:d,first:0===d,last:d===f-1}})),u=d},p=function(e){var t="prev"===e&&0!==d?d-1:"next"===e&&d!==f-1?d+1:"end"===e?f-1:"number"==typeof e?e:void 0;void 0!==t&&d!==t&&(d=t,h())};return e.keyboard&&function(e,t){e.addEventListener("keydown",(function(i){if(i.target===e){var o=n[i.key];void 0!==o&&(i.preventDefault(),t(o))}}))}(r,p),e.swipe&&(r.classList.add("swipe-enabled"),s.addEventListener("dragstart",(function(e){return e.preventDefault()})),o(r,{dragstart:function(e){return i=e.node.getBoundingClientRect().width},dragmove:function(e){c=e.totalChange.x/i*100,m()},dragstop:function(){c&&(Math.abs(c)>v/2?(d=Math.max(0,Math.min(f-1,d+(c<0?1:-1))),c=0,h()):(c=0,m()))}})),h(!0),window.setTimeout((function(){r.classList.add("dioada-carousel-ready")}),0),{node:r,itemCount:f,idx:function(){if(!arguments.length)return d;p(arguments[0])},next:function(){return p("next")},prev:function(){return p("prev")}}}}));
