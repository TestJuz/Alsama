import{a as d,j as a}from"./index-YmEqfCm2.js";import{g as h}from"./imageAlt-CBKz1rqm.js";import{c as i,X as _}from"./SiteLayout-CS3I8GIG.js";/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],j=i("chevron-left",p);/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],v=i("chevron-right",b);function f({gallery:e,title:o,index:l,onChangeIndex:t,onClose:n}){const{language:r,t:c}=d();if(!(e!=null&&e.length))return null;const g=e[l]||e[0],s=e.length>1;function m(){t((l-1+e.length)%e.length)}function u(){t((l+1)%e.length)}return a.jsxs("div",{className:"image-galleryModal",role:"dialog","aria-modal":"true","aria-label":`${o} gallery`,children:[a.jsx("button",{className:"image-galleryModal__backdrop",type:"button","aria-label":"Close gallery",onClick:n}),a.jsxs("div",{className:"image-galleryModal__content",children:[a.jsx("button",{className:"image-galleryModal__close",type:"button","aria-label":"Close gallery",onClick:n,children:a.jsx(_,{size:20})}),s?a.jsx("button",{className:"image-galleryModal__nav image-galleryModal__nav--prev",type:"button","aria-label":"Previous image",onClick:m,children:a.jsx(j,{size:24})}):null,a.jsx("img",{src:g,alt:h(c(o),l+1,r)}),s?a.jsx("button",{className:"image-galleryModal__nav image-galleryModal__nav--next",type:"button","aria-label":"Next image",onClick:u,children:a.jsx(v,{size:24})}):null,a.jsxs("div",{className:"image-galleryModal__caption",children:[a.jsx("strong",{children:o}),a.jsxs("span",{children:[l+1," / ",e.length]})]})]})]})}export{f as I};
