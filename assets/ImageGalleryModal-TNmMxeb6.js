import{j as a}from"./index-BRyLJYo6.js";import{c as i,X as g}from"./SiteLayout-CSNKPn-f.js";/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],h=i("chevron-left",d);/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],_=i("chevron-right",u);function x({gallery:e,title:o,index:l,onChangeIndex:t,onClose:n}){if(!(e!=null&&e.length))return null;const c=e[l]||e[0],s=e.length>1;function r(){t((l-1+e.length)%e.length)}function m(){t((l+1)%e.length)}return a.jsxs("div",{className:"image-galleryModal",role:"dialog","aria-modal":"true","aria-label":`${o} gallery`,children:[a.jsx("button",{className:"image-galleryModal__backdrop",type:"button","aria-label":"Close gallery",onClick:n}),a.jsxs("div",{className:"image-galleryModal__content",children:[a.jsx("button",{className:"image-galleryModal__close",type:"button","aria-label":"Close gallery",onClick:n,children:a.jsx(g,{size:20})}),s?a.jsx("button",{className:"image-galleryModal__nav image-galleryModal__nav--prev",type:"button","aria-label":"Previous image",onClick:r,children:a.jsx(h,{size:24})}):null,a.jsx("img",{src:c,alt:o}),s?a.jsx("button",{className:"image-galleryModal__nav image-galleryModal__nav--next",type:"button","aria-label":"Next image",onClick:m,children:a.jsx(_,{size:24})}):null,a.jsxs("div",{className:"image-galleryModal__caption",children:[a.jsx("strong",{children:o}),a.jsxs("span",{children:[l+1," / ",e.length]})]})]})]})}export{x as I};
