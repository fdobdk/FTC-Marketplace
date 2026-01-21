function Oy(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in e)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function _y(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var hp={exports:{}},go={},mp={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oi=Symbol.for("react.element"),zy=Symbol.for("react.portal"),Fy=Symbol.for("react.fragment"),Vy=Symbol.for("react.strict_mode"),Iy=Symbol.for("react.profiler"),By=Symbol.for("react.provider"),Uy=Symbol.for("react.context"),$y=Symbol.for("react.forward_ref"),Hy=Symbol.for("react.suspense"),Wy=Symbol.for("react.memo"),Ky=Symbol.for("react.lazy"),Tc=Symbol.iterator;function qy(e){return e===null||typeof e!="object"?null:(e=Tc&&e[Tc]||e["@@iterator"],typeof e=="function"?e:null)}var gp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yp=Object.assign,vp={};function Tr(e,t,n){this.props=e,this.context=t,this.refs=vp,this.updater=n||gp}Tr.prototype.isReactComponent={};Tr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Tr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function xp(){}xp.prototype=Tr.prototype;function Jl(e,t,n){this.props=e,this.context=t,this.refs=vp,this.updater=n||gp}var Zl=Jl.prototype=new xp;Zl.constructor=Jl;yp(Zl,Tr.prototype);Zl.isPureReactComponent=!0;var Ec=Array.isArray,wp=Object.prototype.hasOwnProperty,eu={current:null},Sp={key:!0,ref:!0,__self:!0,__source:!0};function bp(e,t,n){var r,i={},s=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)wp.call(t,r)&&!Sp.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];i.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Oi,type:e,key:s,ref:o,props:i,_owner:eu.current}}function Gy(e,t){return{$$typeof:Oi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function tu(e){return typeof e=="object"&&e!==null&&e.$$typeof===Oi}function Yy(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Rc=/\/+/g;function Yo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Yy(""+e.key):t.toString(36)}function vs(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Oi:case zy:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Yo(o,0):r,Ec(i)?(n="",e!=null&&(n=e.replace(Rc,"$&/")+"/"),vs(i,t,n,"",function(c){return c})):i!=null&&(tu(i)&&(i=Gy(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Rc,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",Ec(e))for(var a=0;a<e.length;a++){s=e[a];var l=r+Yo(s,a);o+=vs(s,t,n,l,i)}else if(l=qy(e),typeof l=="function")for(e=l.call(e),a=0;!(s=e.next()).done;)s=s.value,l=r+Yo(s,a++),o+=vs(s,t,n,l,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Yi(e,t,n){if(e==null)return e;var r=[],i=0;return vs(e,r,"","",function(s){return t.call(n,s,i++)}),r}function Qy(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ae={current:null},xs={transition:null},Xy={ReactCurrentDispatcher:Ae,ReactCurrentBatchConfig:xs,ReactCurrentOwner:eu};function jp(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:Yi,forEach:function(e,t,n){Yi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Yi(e,function(){t++}),t},toArray:function(e){return Yi(e,function(t){return t})||[]},only:function(e){if(!tu(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=Tr;I.Fragment=Fy;I.Profiler=Iy;I.PureComponent=Jl;I.StrictMode=Vy;I.Suspense=Hy;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xy;I.act=jp;I.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=yp({},e.props),i=e.key,s=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=eu.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)wp.call(t,l)&&!Sp.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Oi,type:e.type,key:i,ref:s,props:r,_owner:o}};I.createContext=function(e){return e={$$typeof:Uy,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:By,_context:e},e.Consumer=e};I.createElement=bp;I.createFactory=function(e){var t=bp.bind(null,e);return t.type=e,t};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:$y,render:e}};I.isValidElement=tu;I.lazy=function(e){return{$$typeof:Ky,_payload:{_status:-1,_result:e},_init:Qy}};I.memo=function(e,t){return{$$typeof:Wy,type:e,compare:t===void 0?null:t}};I.startTransition=function(e){var t=xs.transition;xs.transition={};try{e()}finally{xs.transition=t}};I.unstable_act=jp;I.useCallback=function(e,t){return Ae.current.useCallback(e,t)};I.useContext=function(e){return Ae.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return Ae.current.useDeferredValue(e)};I.useEffect=function(e,t){return Ae.current.useEffect(e,t)};I.useId=function(){return Ae.current.useId()};I.useImperativeHandle=function(e,t,n){return Ae.current.useImperativeHandle(e,t,n)};I.useInsertionEffect=function(e,t){return Ae.current.useInsertionEffect(e,t)};I.useLayoutEffect=function(e,t){return Ae.current.useLayoutEffect(e,t)};I.useMemo=function(e,t){return Ae.current.useMemo(e,t)};I.useReducer=function(e,t,n){return Ae.current.useReducer(e,t,n)};I.useRef=function(e){return Ae.current.useRef(e)};I.useState=function(e){return Ae.current.useState(e)};I.useSyncExternalStore=function(e,t,n){return Ae.current.useSyncExternalStore(e,t,n)};I.useTransition=function(){return Ae.current.useTransition()};I.version="18.3.1";mp.exports=I;var S=mp.exports;const yo=_y(S),Jy=Oy({__proto__:null,default:yo},[S]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zy=S,ev=Symbol.for("react.element"),tv=Symbol.for("react.fragment"),nv=Object.prototype.hasOwnProperty,rv=Zy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,iv={key:!0,ref:!0,__self:!0,__source:!0};function kp(e,t,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)nv.call(t,r)&&!iv.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:ev,type:e,key:s,ref:o,props:i,_owner:rv.current}}go.Fragment=tv;go.jsx=kp;go.jsxs=kp;hp.exports=go;var u=hp.exports,Fa={},Cp={exports:{}},Ye={},Pp={exports:{}},Np={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,O){var z=E.length;E.push(O);e:for(;0<z;){var D=z-1>>>1,$=E[D];if(0<i($,O))E[D]=O,E[z]=$,z=D;else break e}}function n(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var O=E[0],z=E.pop();if(z!==O){E[0]=z;e:for(var D=0,$=E.length,at=$>>>1;D<at;){var Te=2*(D+1)-1,Ct=E[Te],Ue=Te+1,vn=E[Ue];if(0>i(Ct,z))Ue<$&&0>i(vn,Ct)?(E[D]=vn,E[Ue]=z,D=Ue):(E[D]=Ct,E[Te]=z,D=Te);else if(Ue<$&&0>i(vn,z))E[D]=vn,E[Ue]=z,D=Ue;else break e}}return O}function i(E,O){var z=E.sortIndex-O.sortIndex;return z!==0?z:E.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var l=[],c=[],d=1,f=null,p=3,y=!1,m=!1,v=!1,w=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(E){for(var O=n(c);O!==null;){if(O.callback===null)r(c);else if(O.startTime<=E)r(c),O.sortIndex=O.expirationTime,t(l,O);else break;O=n(c)}}function b(E){if(v=!1,g(E),!m)if(n(l)!==null)m=!0,U(k);else{var O=n(c);O!==null&&Ne(b,O.startTime-E)}}function k(E,O){m=!1,v&&(v=!1,x(P),P=-1),y=!0;var z=p;try{for(g(O),f=n(l);f!==null&&(!(f.expirationTime>O)||E&&!ie());){var D=f.callback;if(typeof D=="function"){f.callback=null,p=f.priorityLevel;var $=D(f.expirationTime<=O);O=e.unstable_now(),typeof $=="function"?f.callback=$:f===n(l)&&r(l),g(O)}else r(l);f=n(l)}if(f!==null)var at=!0;else{var Te=n(c);Te!==null&&Ne(b,Te.startTime-O),at=!1}return at}finally{f=null,p=z,y=!1}}var T=!1,C=null,P=-1,A=5,M=-1;function ie(){return!(e.unstable_now()-M<A)}function ne(){if(C!==null){var E=e.unstable_now();M=E;var O=!0;try{O=C(!0,E)}finally{O?se():(T=!1,C=null)}}else T=!1}var se;if(typeof h=="function")se=function(){h(ne)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,ot=K.port2;K.port1.onmessage=ne,se=function(){ot.postMessage(null)}}else se=function(){w(ne,0)};function U(E){C=E,T||(T=!0,se())}function Ne(E,O){P=w(function(){E(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){m||y||(m=!0,U(k))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(E){switch(p){case 1:case 2:case 3:var O=3;break;default:O=p}var z=p;p=O;try{return E()}finally{p=z}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,O){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var z=p;p=E;try{return O()}finally{p=z}},e.unstable_scheduleCallback=function(E,O,z){var D=e.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?D+z:D):z=D,E){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=z+$,E={id:d++,callback:O,priorityLevel:E,startTime:z,expirationTime:$,sortIndex:-1},z>D?(E.sortIndex=z,t(c,E),n(l)===null&&E===n(c)&&(v?(x(P),P=-1):v=!0,Ne(b,z-D))):(E.sortIndex=$,t(l,E),m||y||(m=!0,U(k))),E},e.unstable_shouldYield=ie,e.unstable_wrapCallback=function(E){var O=p;return function(){var z=p;p=O;try{return E.apply(this,arguments)}finally{p=z}}}})(Np);Pp.exports=Np;var sv=Pp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ov=S,qe=sv;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Tp=new Set,di={};function $n(e,t){vr(e,t),vr(e+"Capture",t)}function vr(e,t){for(di[e]=t,e=0;e<t.length;e++)Tp.add(t[e])}var Mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Va=Object.prototype.hasOwnProperty,av=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Lc={},Ac={};function lv(e){return Va.call(Ac,e)?!0:Va.call(Lc,e)?!1:av.test(e)?Ac[e]=!0:(Lc[e]=!0,!1)}function uv(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function cv(e,t,n,r){if(t===null||typeof t>"u"||uv(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function De(e,t,n,r,i,s,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=o}var ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ve[e]=new De(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ve[t]=new De(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ve[e]=new De(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ve[e]=new De(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ve[e]=new De(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ve[e]=new De(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ve[e]=new De(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ve[e]=new De(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ve[e]=new De(e,5,!1,e.toLowerCase(),null,!1,!1)});var nu=/[\-:]([a-z])/g;function ru(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(nu,ru);ve[t]=new De(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(nu,ru);ve[t]=new De(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(nu,ru);ve[t]=new De(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ve[e]=new De(e,1,!1,e.toLowerCase(),null,!1,!1)});ve.xlinkHref=new De("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ve[e]=new De(e,1,!1,e.toLowerCase(),null,!0,!0)});function iu(e,t,n,r){var i=ve.hasOwnProperty(t)?ve[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(cv(t,n,i,r)&&(n=null),r||i===null?lv(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Vt=ov.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qi=Symbol.for("react.element"),Yn=Symbol.for("react.portal"),Qn=Symbol.for("react.fragment"),su=Symbol.for("react.strict_mode"),Ia=Symbol.for("react.profiler"),Ep=Symbol.for("react.provider"),Rp=Symbol.for("react.context"),ou=Symbol.for("react.forward_ref"),Ba=Symbol.for("react.suspense"),Ua=Symbol.for("react.suspense_list"),au=Symbol.for("react.memo"),$t=Symbol.for("react.lazy"),Lp=Symbol.for("react.offscreen"),Dc=Symbol.iterator;function _r(e){return e===null||typeof e!="object"?null:(e=Dc&&e[Dc]||e["@@iterator"],typeof e=="function"?e:null)}var te=Object.assign,Qo;function qr(e){if(Qo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Qo=t&&t[1]||""}return`
`+Qo+e}var Xo=!1;function Jo(e,t){if(!e||Xo)return"";Xo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var l=`
`+i[o].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=o&&0<=a);break}}}finally{Xo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?qr(e):""}function dv(e){switch(e.tag){case 5:return qr(e.type);case 16:return qr("Lazy");case 13:return qr("Suspense");case 19:return qr("SuspenseList");case 0:case 2:case 15:return e=Jo(e.type,!1),e;case 11:return e=Jo(e.type.render,!1),e;case 1:return e=Jo(e.type,!0),e;default:return""}}function $a(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qn:return"Fragment";case Yn:return"Portal";case Ia:return"Profiler";case su:return"StrictMode";case Ba:return"Suspense";case Ua:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Rp:return(e.displayName||"Context")+".Consumer";case Ep:return(e._context.displayName||"Context")+".Provider";case ou:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case au:return t=e.displayName||null,t!==null?t:$a(e.type)||"Memo";case $t:t=e._payload,e=e._init;try{return $a(e(t))}catch{}}return null}function fv(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $a(t);case 8:return t===su?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ln(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ap(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function pv(e){var t=Ap(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xi(e){e._valueTracker||(e._valueTracker=pv(e))}function Dp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ap(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Os(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ha(e,t){var n=t.checked;return te({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Mc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=ln(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Mp(e,t){t=t.checked,t!=null&&iu(e,"checked",t,!1)}function Wa(e,t){Mp(e,t);var n=ln(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ka(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ka(e,t.type,ln(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Oc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ka(e,t,n){(t!=="number"||Os(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Gr=Array.isArray;function dr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ln(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function qa(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return te({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function _c(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(Gr(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ln(n)}}function Op(e,t){var n=ln(t.value),r=ln(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function zc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function _p(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ga(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?_p(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ji,zp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ji=Ji||document.createElement("div"),Ji.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ji.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function fi(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hv=["Webkit","ms","Moz","O"];Object.keys(Jr).forEach(function(e){hv.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jr[t]=Jr[e]})});function Fp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Jr.hasOwnProperty(e)&&Jr[e]?(""+t).trim():t+"px"}function Vp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Fp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var mv=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ya(e,t){if(t){if(mv[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function Qa(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xa=null;function lu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ja=null,fr=null,pr=null;function Fc(e){if(e=Fi(e)){if(typeof Ja!="function")throw Error(N(280));var t=e.stateNode;t&&(t=bo(t),Ja(e.stateNode,e.type,t))}}function Ip(e){fr?pr?pr.push(e):pr=[e]:fr=e}function Bp(){if(fr){var e=fr,t=pr;if(pr=fr=null,Fc(e),t)for(e=0;e<t.length;e++)Fc(t[e])}}function Up(e,t){return e(t)}function $p(){}var Zo=!1;function Hp(e,t,n){if(Zo)return e(t,n);Zo=!0;try{return Up(e,t,n)}finally{Zo=!1,(fr!==null||pr!==null)&&($p(),Bp())}}function pi(e,t){var n=e.stateNode;if(n===null)return null;var r=bo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var Za=!1;if(Mt)try{var zr={};Object.defineProperty(zr,"passive",{get:function(){Za=!0}}),window.addEventListener("test",zr,zr),window.removeEventListener("test",zr,zr)}catch{Za=!1}function gv(e,t,n,r,i,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var Zr=!1,_s=null,zs=!1,el=null,yv={onError:function(e){Zr=!0,_s=e}};function vv(e,t,n,r,i,s,o,a,l){Zr=!1,_s=null,gv.apply(yv,arguments)}function xv(e,t,n,r,i,s,o,a,l){if(vv.apply(this,arguments),Zr){if(Zr){var c=_s;Zr=!1,_s=null}else throw Error(N(198));zs||(zs=!0,el=c)}}function Hn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Wp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Vc(e){if(Hn(e)!==e)throw Error(N(188))}function wv(e){var t=e.alternate;if(!t){if(t=Hn(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Vc(i),e;if(s===r)return Vc(i),t;s=s.sibling}throw Error(N(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function Kp(e){return e=wv(e),e!==null?qp(e):null}function qp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=qp(e);if(t!==null)return t;e=e.sibling}return null}var Gp=qe.unstable_scheduleCallback,Ic=qe.unstable_cancelCallback,Sv=qe.unstable_shouldYield,bv=qe.unstable_requestPaint,oe=qe.unstable_now,jv=qe.unstable_getCurrentPriorityLevel,uu=qe.unstable_ImmediatePriority,Yp=qe.unstable_UserBlockingPriority,Fs=qe.unstable_NormalPriority,kv=qe.unstable_LowPriority,Qp=qe.unstable_IdlePriority,vo=null,St=null;function Cv(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(vo,e,void 0,(e.current.flags&128)===128)}catch{}}var ft=Math.clz32?Math.clz32:Tv,Pv=Math.log,Nv=Math.LN2;function Tv(e){return e>>>=0,e===0?32:31-(Pv(e)/Nv|0)|0}var Zi=64,es=4194304;function Yr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Vs(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=Yr(a):(s&=o,s!==0&&(r=Yr(s)))}else o=n&~i,o!==0?r=Yr(o):s!==0&&(r=Yr(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ft(t),i=1<<n,r|=e[n],t&=~i;return r}function Ev(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rv(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var o=31-ft(s),a=1<<o,l=i[o];l===-1?(!(a&n)||a&r)&&(i[o]=Ev(a,t)):l<=t&&(e.expiredLanes|=a),s&=~a}}function tl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Xp(){var e=Zi;return Zi<<=1,!(Zi&4194240)&&(Zi=64),e}function ea(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function _i(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ft(t),e[t]=n}function Lv(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-ft(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function cu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ft(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var H=0;function Jp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Zp,du,eh,th,nh,nl=!1,ts=[],Xt=null,Jt=null,Zt=null,hi=new Map,mi=new Map,Kt=[],Av="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Bc(e,t){switch(e){case"focusin":case"focusout":Xt=null;break;case"dragenter":case"dragleave":Jt=null;break;case"mouseover":case"mouseout":Zt=null;break;case"pointerover":case"pointerout":hi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mi.delete(t.pointerId)}}function Fr(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Fi(t),t!==null&&du(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Dv(e,t,n,r,i){switch(t){case"focusin":return Xt=Fr(Xt,e,t,n,r,i),!0;case"dragenter":return Jt=Fr(Jt,e,t,n,r,i),!0;case"mouseover":return Zt=Fr(Zt,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return hi.set(s,Fr(hi.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,mi.set(s,Fr(mi.get(s)||null,e,t,n,r,i)),!0}return!1}function rh(e){var t=Pn(e.target);if(t!==null){var n=Hn(t);if(n!==null){if(t=n.tag,t===13){if(t=Wp(n),t!==null){e.blockedOn=t,nh(e.priority,function(){eh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ws(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=rl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Xa=r,n.target.dispatchEvent(r),Xa=null}else return t=Fi(n),t!==null&&du(t),e.blockedOn=n,!1;t.shift()}return!0}function Uc(e,t,n){ws(e)&&n.delete(t)}function Mv(){nl=!1,Xt!==null&&ws(Xt)&&(Xt=null),Jt!==null&&ws(Jt)&&(Jt=null),Zt!==null&&ws(Zt)&&(Zt=null),hi.forEach(Uc),mi.forEach(Uc)}function Vr(e,t){e.blockedOn===t&&(e.blockedOn=null,nl||(nl=!0,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,Mv)))}function gi(e){function t(i){return Vr(i,e)}if(0<ts.length){Vr(ts[0],e);for(var n=1;n<ts.length;n++){var r=ts[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Xt!==null&&Vr(Xt,e),Jt!==null&&Vr(Jt,e),Zt!==null&&Vr(Zt,e),hi.forEach(t),mi.forEach(t),n=0;n<Kt.length;n++)r=Kt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Kt.length&&(n=Kt[0],n.blockedOn===null);)rh(n),n.blockedOn===null&&Kt.shift()}var hr=Vt.ReactCurrentBatchConfig,Is=!0;function Ov(e,t,n,r){var i=H,s=hr.transition;hr.transition=null;try{H=1,fu(e,t,n,r)}finally{H=i,hr.transition=s}}function _v(e,t,n,r){var i=H,s=hr.transition;hr.transition=null;try{H=4,fu(e,t,n,r)}finally{H=i,hr.transition=s}}function fu(e,t,n,r){if(Is){var i=rl(e,t,n,r);if(i===null)ca(e,t,r,Bs,n),Bc(e,r);else if(Dv(i,e,t,n,r))r.stopPropagation();else if(Bc(e,r),t&4&&-1<Av.indexOf(e)){for(;i!==null;){var s=Fi(i);if(s!==null&&Zp(s),s=rl(e,t,n,r),s===null&&ca(e,t,r,Bs,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else ca(e,t,r,null,n)}}var Bs=null;function rl(e,t,n,r){if(Bs=null,e=lu(r),e=Pn(e),e!==null)if(t=Hn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Wp(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Bs=e,null}function ih(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(jv()){case uu:return 1;case Yp:return 4;case Fs:case kv:return 16;case Qp:return 536870912;default:return 16}default:return 16}}var Gt=null,pu=null,Ss=null;function sh(){if(Ss)return Ss;var e,t=pu,n=t.length,r,i="value"in Gt?Gt.value:Gt.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[s-r];r++);return Ss=i.slice(e,1<r?1-r:void 0)}function bs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ns(){return!0}function $c(){return!1}function Qe(e){function t(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ns:$c,this.isPropagationStopped=$c,this}return te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ns)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ns)},persist:function(){},isPersistent:ns}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hu=Qe(Er),zi=te({},Er,{view:0,detail:0}),zv=Qe(zi),ta,na,Ir,xo=te({},zi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ir&&(Ir&&e.type==="mousemove"?(ta=e.screenX-Ir.screenX,na=e.screenY-Ir.screenY):na=ta=0,Ir=e),ta)},movementY:function(e){return"movementY"in e?e.movementY:na}}),Hc=Qe(xo),Fv=te({},xo,{dataTransfer:0}),Vv=Qe(Fv),Iv=te({},zi,{relatedTarget:0}),ra=Qe(Iv),Bv=te({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),Uv=Qe(Bv),$v=te({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hv=Qe($v),Wv=te({},Er,{data:0}),Wc=Qe(Wv),Kv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yv(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Gv[e])?!!t[e]:!1}function mu(){return Yv}var Qv=te({},zi,{key:function(e){if(e.key){var t=Kv[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=bs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?qv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mu,charCode:function(e){return e.type==="keypress"?bs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?bs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Xv=Qe(Qv),Jv=te({},xo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Kc=Qe(Jv),Zv=te({},zi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mu}),ex=Qe(Zv),tx=te({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),nx=Qe(tx),rx=te({},xo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ix=Qe(rx),sx=[9,13,27,32],gu=Mt&&"CompositionEvent"in window,ei=null;Mt&&"documentMode"in document&&(ei=document.documentMode);var ox=Mt&&"TextEvent"in window&&!ei,oh=Mt&&(!gu||ei&&8<ei&&11>=ei),qc=" ",Gc=!1;function ah(e,t){switch(e){case"keyup":return sx.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xn=!1;function ax(e,t){switch(e){case"compositionend":return lh(t);case"keypress":return t.which!==32?null:(Gc=!0,qc);case"textInput":return e=t.data,e===qc&&Gc?null:e;default:return null}}function lx(e,t){if(Xn)return e==="compositionend"||!gu&&ah(e,t)?(e=sh(),Ss=pu=Gt=null,Xn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return oh&&t.locale!=="ko"?null:t.data;default:return null}}var ux={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ux[e.type]:t==="textarea"}function uh(e,t,n,r){Ip(r),t=Us(t,"onChange"),0<t.length&&(n=new hu("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ti=null,yi=null;function cx(e){wh(e,0)}function wo(e){var t=er(e);if(Dp(t))return e}function dx(e,t){if(e==="change")return t}var ch=!1;if(Mt){var ia;if(Mt){var sa="oninput"in document;if(!sa){var Qc=document.createElement("div");Qc.setAttribute("oninput","return;"),sa=typeof Qc.oninput=="function"}ia=sa}else ia=!1;ch=ia&&(!document.documentMode||9<document.documentMode)}function Xc(){ti&&(ti.detachEvent("onpropertychange",dh),yi=ti=null)}function dh(e){if(e.propertyName==="value"&&wo(yi)){var t=[];uh(t,yi,e,lu(e)),Hp(cx,t)}}function fx(e,t,n){e==="focusin"?(Xc(),ti=t,yi=n,ti.attachEvent("onpropertychange",dh)):e==="focusout"&&Xc()}function px(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return wo(yi)}function hx(e,t){if(e==="click")return wo(t)}function mx(e,t){if(e==="input"||e==="change")return wo(t)}function gx(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ht=typeof Object.is=="function"?Object.is:gx;function vi(e,t){if(ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Va.call(t,i)||!ht(e[i],t[i]))return!1}return!0}function Jc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zc(e,t){var n=Jc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Jc(n)}}function fh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?fh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ph(){for(var e=window,t=Os();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Os(e.document)}return t}function yu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function yx(e){var t=ph(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&fh(n.ownerDocument.documentElement,n)){if(r!==null&&yu(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=Zc(n,s);var o=Zc(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var vx=Mt&&"documentMode"in document&&11>=document.documentMode,Jn=null,il=null,ni=null,sl=!1;function ed(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sl||Jn==null||Jn!==Os(r)||(r=Jn,"selectionStart"in r&&yu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ni&&vi(ni,r)||(ni=r,r=Us(il,"onSelect"),0<r.length&&(t=new hu("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Jn)))}function rs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Zn={animationend:rs("Animation","AnimationEnd"),animationiteration:rs("Animation","AnimationIteration"),animationstart:rs("Animation","AnimationStart"),transitionend:rs("Transition","TransitionEnd")},oa={},hh={};Mt&&(hh=document.createElement("div").style,"AnimationEvent"in window||(delete Zn.animationend.animation,delete Zn.animationiteration.animation,delete Zn.animationstart.animation),"TransitionEvent"in window||delete Zn.transitionend.transition);function So(e){if(oa[e])return oa[e];if(!Zn[e])return e;var t=Zn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in hh)return oa[e]=t[n];return e}var mh=So("animationend"),gh=So("animationiteration"),yh=So("animationstart"),vh=So("transitionend"),xh=new Map,td="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fn(e,t){xh.set(e,t),$n(t,[e])}for(var aa=0;aa<td.length;aa++){var la=td[aa],xx=la.toLowerCase(),wx=la[0].toUpperCase()+la.slice(1);fn(xx,"on"+wx)}fn(mh,"onAnimationEnd");fn(gh,"onAnimationIteration");fn(yh,"onAnimationStart");fn("dblclick","onDoubleClick");fn("focusin","onFocus");fn("focusout","onBlur");fn(vh,"onTransitionEnd");vr("onMouseEnter",["mouseout","mouseover"]);vr("onMouseLeave",["mouseout","mouseover"]);vr("onPointerEnter",["pointerout","pointerover"]);vr("onPointerLeave",["pointerout","pointerover"]);$n("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));$n("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));$n("onBeforeInput",["compositionend","keypress","textInput","paste"]);$n("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));$n("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));$n("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Sx=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));function nd(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,xv(r,t,void 0,e),e.currentTarget=null}function wh(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&i.isPropagationStopped())break e;nd(i,a,c),s=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&i.isPropagationStopped())break e;nd(i,a,c),s=l}}}if(zs)throw e=el,zs=!1,el=null,e}function Y(e,t){var n=t[cl];n===void 0&&(n=t[cl]=new Set);var r=e+"__bubble";n.has(r)||(Sh(t,e,2,!1),n.add(r))}function ua(e,t,n){var r=0;t&&(r|=4),Sh(n,e,r,t)}var is="_reactListening"+Math.random().toString(36).slice(2);function xi(e){if(!e[is]){e[is]=!0,Tp.forEach(function(n){n!=="selectionchange"&&(Sx.has(n)||ua(n,!1,e),ua(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[is]||(t[is]=!0,ua("selectionchange",!1,t))}}function Sh(e,t,n,r){switch(ih(t)){case 1:var i=Ov;break;case 4:i=_v;break;default:i=fu}n=i.bind(null,t,n,e),i=void 0,!Za||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function ca(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;a!==null;){if(o=Pn(a),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}a=a.parentNode}}r=r.return}Hp(function(){var c=s,d=lu(n),f=[];e:{var p=xh.get(e);if(p!==void 0){var y=hu,m=e;switch(e){case"keypress":if(bs(n)===0)break e;case"keydown":case"keyup":y=Xv;break;case"focusin":m="focus",y=ra;break;case"focusout":m="blur",y=ra;break;case"beforeblur":case"afterblur":y=ra;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Hc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Vv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=ex;break;case mh:case gh:case yh:y=Uv;break;case vh:y=nx;break;case"scroll":y=zv;break;case"wheel":y=ix;break;case"copy":case"cut":case"paste":y=Hv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Kc}var v=(t&4)!==0,w=!v&&e==="scroll",x=v?p!==null?p+"Capture":null:p;v=[];for(var h=c,g;h!==null;){g=h;var b=g.stateNode;if(g.tag===5&&b!==null&&(g=b,x!==null&&(b=pi(h,x),b!=null&&v.push(wi(h,b,g)))),w)break;h=h.return}0<v.length&&(p=new y(p,m,null,n,d),f.push({event:p,listeners:v}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",p&&n!==Xa&&(m=n.relatedTarget||n.fromElement)&&(Pn(m)||m[Ot]))break e;if((y||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,y?(m=n.relatedTarget||n.toElement,y=c,m=m?Pn(m):null,m!==null&&(w=Hn(m),m!==w||m.tag!==5&&m.tag!==6)&&(m=null)):(y=null,m=c),y!==m)){if(v=Hc,b="onMouseLeave",x="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(v=Kc,b="onPointerLeave",x="onPointerEnter",h="pointer"),w=y==null?p:er(y),g=m==null?p:er(m),p=new v(b,h+"leave",y,n,d),p.target=w,p.relatedTarget=g,b=null,Pn(d)===c&&(v=new v(x,h+"enter",m,n,d),v.target=g,v.relatedTarget=w,b=v),w=b,y&&m)t:{for(v=y,x=m,h=0,g=v;g;g=Gn(g))h++;for(g=0,b=x;b;b=Gn(b))g++;for(;0<h-g;)v=Gn(v),h--;for(;0<g-h;)x=Gn(x),g--;for(;h--;){if(v===x||x!==null&&v===x.alternate)break t;v=Gn(v),x=Gn(x)}v=null}else v=null;y!==null&&rd(f,p,y,v,!1),m!==null&&w!==null&&rd(f,w,m,v,!0)}}e:{if(p=c?er(c):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var k=dx;else if(Yc(p))if(ch)k=mx;else{k=px;var T=fx}else(y=p.nodeName)&&y.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(k=hx);if(k&&(k=k(e,c))){uh(f,k,n,d);break e}T&&T(e,p,c),e==="focusout"&&(T=p._wrapperState)&&T.controlled&&p.type==="number"&&Ka(p,"number",p.value)}switch(T=c?er(c):window,e){case"focusin":(Yc(T)||T.contentEditable==="true")&&(Jn=T,il=c,ni=null);break;case"focusout":ni=il=Jn=null;break;case"mousedown":sl=!0;break;case"contextmenu":case"mouseup":case"dragend":sl=!1,ed(f,n,d);break;case"selectionchange":if(vx)break;case"keydown":case"keyup":ed(f,n,d)}var C;if(gu)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Xn?ah(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(oh&&n.locale!=="ko"&&(Xn||P!=="onCompositionStart"?P==="onCompositionEnd"&&Xn&&(C=sh()):(Gt=d,pu="value"in Gt?Gt.value:Gt.textContent,Xn=!0)),T=Us(c,P),0<T.length&&(P=new Wc(P,e,null,n,d),f.push({event:P,listeners:T}),C?P.data=C:(C=lh(n),C!==null&&(P.data=C)))),(C=ox?ax(e,n):lx(e,n))&&(c=Us(c,"onBeforeInput"),0<c.length&&(d=new Wc("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=C))}wh(f,t)})}function wi(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Us(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=pi(e,n),s!=null&&r.unshift(wi(e,s,i)),s=pi(e,t),s!=null&&r.push(wi(e,s,i))),e=e.return}return r}function Gn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function rd(e,t,n,r,i){for(var s=t._reactName,o=[];n!==null&&n!==r;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,i?(l=pi(n,s),l!=null&&o.unshift(wi(n,l,a))):i||(l=pi(n,s),l!=null&&o.push(wi(n,l,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var bx=/\r\n?/g,jx=/\u0000|\uFFFD/g;function id(e){return(typeof e=="string"?e:""+e).replace(bx,`
`).replace(jx,"")}function ss(e,t,n){if(t=id(t),id(e)!==t&&n)throw Error(N(425))}function $s(){}var ol=null,al=null;function ll(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ul=typeof setTimeout=="function"?setTimeout:void 0,kx=typeof clearTimeout=="function"?clearTimeout:void 0,sd=typeof Promise=="function"?Promise:void 0,Cx=typeof queueMicrotask=="function"?queueMicrotask:typeof sd<"u"?function(e){return sd.resolve(null).then(e).catch(Px)}:ul;function Px(e){setTimeout(function(){throw e})}function da(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),gi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);gi(t)}function en(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function od(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Rr=Math.random().toString(36).slice(2),wt="__reactFiber$"+Rr,Si="__reactProps$"+Rr,Ot="__reactContainer$"+Rr,cl="__reactEvents$"+Rr,Nx="__reactListeners$"+Rr,Tx="__reactHandles$"+Rr;function Pn(e){var t=e[wt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ot]||n[wt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=od(e);e!==null;){if(n=e[wt])return n;e=od(e)}return t}e=n,n=e.parentNode}return null}function Fi(e){return e=e[wt]||e[Ot],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function er(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function bo(e){return e[Si]||null}var dl=[],tr=-1;function pn(e){return{current:e}}function Q(e){0>tr||(e.current=dl[tr],dl[tr]=null,tr--)}function q(e,t){tr++,dl[tr]=e.current,e.current=t}var un={},Pe=pn(un),_e=pn(!1),_n=un;function xr(e,t){var n=e.type.contextTypes;if(!n)return un;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function ze(e){return e=e.childContextTypes,e!=null}function Hs(){Q(_e),Q(Pe)}function ad(e,t,n){if(Pe.current!==un)throw Error(N(168));q(Pe,t),q(_e,n)}function bh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(N(108,fv(e)||"Unknown",i));return te({},n,r)}function Ws(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||un,_n=Pe.current,q(Pe,e),q(_e,_e.current),!0}function ld(e,t,n){var r=e.stateNode;if(!r)throw Error(N(169));n?(e=bh(e,t,_n),r.__reactInternalMemoizedMergedChildContext=e,Q(_e),Q(Pe),q(Pe,e)):Q(_e),q(_e,n)}var Nt=null,jo=!1,fa=!1;function jh(e){Nt===null?Nt=[e]:Nt.push(e)}function Ex(e){jo=!0,jh(e)}function hn(){if(!fa&&Nt!==null){fa=!0;var e=0,t=H;try{var n=Nt;for(H=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Nt=null,jo=!1}catch(i){throw Nt!==null&&(Nt=Nt.slice(e+1)),Gp(uu,hn),i}finally{H=t,fa=!1}}return null}var nr=[],rr=0,Ks=null,qs=0,Ze=[],et=0,zn=null,Tt=1,Et="";function Sn(e,t){nr[rr++]=qs,nr[rr++]=Ks,Ks=e,qs=t}function kh(e,t,n){Ze[et++]=Tt,Ze[et++]=Et,Ze[et++]=zn,zn=e;var r=Tt;e=Et;var i=32-ft(r)-1;r&=~(1<<i),n+=1;var s=32-ft(t)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Tt=1<<32-ft(t)+i|n<<i|r,Et=s+e}else Tt=1<<s|n<<i|r,Et=e}function vu(e){e.return!==null&&(Sn(e,1),kh(e,1,0))}function xu(e){for(;e===Ks;)Ks=nr[--rr],nr[rr]=null,qs=nr[--rr],nr[rr]=null;for(;e===zn;)zn=Ze[--et],Ze[et]=null,Et=Ze[--et],Ze[et]=null,Tt=Ze[--et],Ze[et]=null}var Ke=null,We=null,X=!1,dt=null;function Ch(e,t){var n=tt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ud(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ke=e,We=en(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ke=e,We=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=zn!==null?{id:Tt,overflow:Et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=tt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ke=e,We=null,!0):!1;default:return!1}}function fl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function pl(e){if(X){var t=We;if(t){var n=t;if(!ud(e,t)){if(fl(e))throw Error(N(418));t=en(n.nextSibling);var r=Ke;t&&ud(e,t)?Ch(r,n):(e.flags=e.flags&-4097|2,X=!1,Ke=e)}}else{if(fl(e))throw Error(N(418));e.flags=e.flags&-4097|2,X=!1,Ke=e}}}function cd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ke=e}function os(e){if(e!==Ke)return!1;if(!X)return cd(e),X=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ll(e.type,e.memoizedProps)),t&&(t=We)){if(fl(e))throw Ph(),Error(N(418));for(;t;)Ch(e,t),t=en(t.nextSibling)}if(cd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){We=en(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}We=null}}else We=Ke?en(e.stateNode.nextSibling):null;return!0}function Ph(){for(var e=We;e;)e=en(e.nextSibling)}function wr(){We=Ke=null,X=!1}function wu(e){dt===null?dt=[e]:dt.push(e)}var Rx=Vt.ReactCurrentBatchConfig;function Br(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},t._stringRef=s,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function as(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function dd(e){var t=e._init;return t(e._payload)}function Nh(e){function t(x,h){if(e){var g=x.deletions;g===null?(x.deletions=[h],x.flags|=16):g.push(h)}}function n(x,h){if(!e)return null;for(;h!==null;)t(x,h),h=h.sibling;return null}function r(x,h){for(x=new Map;h!==null;)h.key!==null?x.set(h.key,h):x.set(h.index,h),h=h.sibling;return x}function i(x,h){return x=sn(x,h),x.index=0,x.sibling=null,x}function s(x,h,g){return x.index=g,e?(g=x.alternate,g!==null?(g=g.index,g<h?(x.flags|=2,h):g):(x.flags|=2,h)):(x.flags|=1048576,h)}function o(x){return e&&x.alternate===null&&(x.flags|=2),x}function a(x,h,g,b){return h===null||h.tag!==6?(h=xa(g,x.mode,b),h.return=x,h):(h=i(h,g),h.return=x,h)}function l(x,h,g,b){var k=g.type;return k===Qn?d(x,h,g.props.children,b,g.key):h!==null&&(h.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===$t&&dd(k)===h.type)?(b=i(h,g.props),b.ref=Br(x,h,g),b.return=x,b):(b=Es(g.type,g.key,g.props,null,x.mode,b),b.ref=Br(x,h,g),b.return=x,b)}function c(x,h,g,b){return h===null||h.tag!==4||h.stateNode.containerInfo!==g.containerInfo||h.stateNode.implementation!==g.implementation?(h=wa(g,x.mode,b),h.return=x,h):(h=i(h,g.children||[]),h.return=x,h)}function d(x,h,g,b,k){return h===null||h.tag!==7?(h=Dn(g,x.mode,b,k),h.return=x,h):(h=i(h,g),h.return=x,h)}function f(x,h,g){if(typeof h=="string"&&h!==""||typeof h=="number")return h=xa(""+h,x.mode,g),h.return=x,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Qi:return g=Es(h.type,h.key,h.props,null,x.mode,g),g.ref=Br(x,null,h),g.return=x,g;case Yn:return h=wa(h,x.mode,g),h.return=x,h;case $t:var b=h._init;return f(x,b(h._payload),g)}if(Gr(h)||_r(h))return h=Dn(h,x.mode,g,null),h.return=x,h;as(x,h)}return null}function p(x,h,g,b){var k=h!==null?h.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return k!==null?null:a(x,h,""+g,b);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Qi:return g.key===k?l(x,h,g,b):null;case Yn:return g.key===k?c(x,h,g,b):null;case $t:return k=g._init,p(x,h,k(g._payload),b)}if(Gr(g)||_r(g))return k!==null?null:d(x,h,g,b,null);as(x,g)}return null}function y(x,h,g,b,k){if(typeof b=="string"&&b!==""||typeof b=="number")return x=x.get(g)||null,a(h,x,""+b,k);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Qi:return x=x.get(b.key===null?g:b.key)||null,l(h,x,b,k);case Yn:return x=x.get(b.key===null?g:b.key)||null,c(h,x,b,k);case $t:var T=b._init;return y(x,h,g,T(b._payload),k)}if(Gr(b)||_r(b))return x=x.get(g)||null,d(h,x,b,k,null);as(h,b)}return null}function m(x,h,g,b){for(var k=null,T=null,C=h,P=h=0,A=null;C!==null&&P<g.length;P++){C.index>P?(A=C,C=null):A=C.sibling;var M=p(x,C,g[P],b);if(M===null){C===null&&(C=A);break}e&&C&&M.alternate===null&&t(x,C),h=s(M,h,P),T===null?k=M:T.sibling=M,T=M,C=A}if(P===g.length)return n(x,C),X&&Sn(x,P),k;if(C===null){for(;P<g.length;P++)C=f(x,g[P],b),C!==null&&(h=s(C,h,P),T===null?k=C:T.sibling=C,T=C);return X&&Sn(x,P),k}for(C=r(x,C);P<g.length;P++)A=y(C,x,P,g[P],b),A!==null&&(e&&A.alternate!==null&&C.delete(A.key===null?P:A.key),h=s(A,h,P),T===null?k=A:T.sibling=A,T=A);return e&&C.forEach(function(ie){return t(x,ie)}),X&&Sn(x,P),k}function v(x,h,g,b){var k=_r(g);if(typeof k!="function")throw Error(N(150));if(g=k.call(g),g==null)throw Error(N(151));for(var T=k=null,C=h,P=h=0,A=null,M=g.next();C!==null&&!M.done;P++,M=g.next()){C.index>P?(A=C,C=null):A=C.sibling;var ie=p(x,C,M.value,b);if(ie===null){C===null&&(C=A);break}e&&C&&ie.alternate===null&&t(x,C),h=s(ie,h,P),T===null?k=ie:T.sibling=ie,T=ie,C=A}if(M.done)return n(x,C),X&&Sn(x,P),k;if(C===null){for(;!M.done;P++,M=g.next())M=f(x,M.value,b),M!==null&&(h=s(M,h,P),T===null?k=M:T.sibling=M,T=M);return X&&Sn(x,P),k}for(C=r(x,C);!M.done;P++,M=g.next())M=y(C,x,P,M.value,b),M!==null&&(e&&M.alternate!==null&&C.delete(M.key===null?P:M.key),h=s(M,h,P),T===null?k=M:T.sibling=M,T=M);return e&&C.forEach(function(ne){return t(x,ne)}),X&&Sn(x,P),k}function w(x,h,g,b){if(typeof g=="object"&&g!==null&&g.type===Qn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Qi:e:{for(var k=g.key,T=h;T!==null;){if(T.key===k){if(k=g.type,k===Qn){if(T.tag===7){n(x,T.sibling),h=i(T,g.props.children),h.return=x,x=h;break e}}else if(T.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===$t&&dd(k)===T.type){n(x,T.sibling),h=i(T,g.props),h.ref=Br(x,T,g),h.return=x,x=h;break e}n(x,T);break}else t(x,T);T=T.sibling}g.type===Qn?(h=Dn(g.props.children,x.mode,b,g.key),h.return=x,x=h):(b=Es(g.type,g.key,g.props,null,x.mode,b),b.ref=Br(x,h,g),b.return=x,x=b)}return o(x);case Yn:e:{for(T=g.key;h!==null;){if(h.key===T)if(h.tag===4&&h.stateNode.containerInfo===g.containerInfo&&h.stateNode.implementation===g.implementation){n(x,h.sibling),h=i(h,g.children||[]),h.return=x,x=h;break e}else{n(x,h);break}else t(x,h);h=h.sibling}h=wa(g,x.mode,b),h.return=x,x=h}return o(x);case $t:return T=g._init,w(x,h,T(g._payload),b)}if(Gr(g))return m(x,h,g,b);if(_r(g))return v(x,h,g,b);as(x,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,h!==null&&h.tag===6?(n(x,h.sibling),h=i(h,g),h.return=x,x=h):(n(x,h),h=xa(g,x.mode,b),h.return=x,x=h),o(x)):n(x,h)}return w}var Sr=Nh(!0),Th=Nh(!1),Gs=pn(null),Ys=null,ir=null,Su=null;function bu(){Su=ir=Ys=null}function ju(e){var t=Gs.current;Q(Gs),e._currentValue=t}function hl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function mr(e,t){Ys=e,Su=ir=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Oe=!0),e.firstContext=null)}function rt(e){var t=e._currentValue;if(Su!==e)if(e={context:e,memoizedValue:t,next:null},ir===null){if(Ys===null)throw Error(N(308));ir=e,Ys.dependencies={lanes:0,firstContext:e}}else ir=ir.next=e;return t}var Nn=null;function ku(e){Nn===null?Nn=[e]:Nn.push(e)}function Eh(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,ku(t)):(n.next=i.next,i.next=n),t.interleaved=n,_t(e,r)}function _t(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ht=!1;function Cu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Rh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Lt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function tn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,B&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,_t(e,n)}return i=r.interleaved,i===null?(t.next=t,ku(r)):(t.next=i.next,i.next=t),r.interleaved=t,_t(e,n)}function js(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,cu(e,n)}}function fd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Qs(e,t,n,r){var i=e.updateQueue;Ht=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(s!==null){var f=i.baseState;o=0,d=c=l=null,a=s;do{var p=a.lane,y=a.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:y,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=e,v=a;switch(p=t,y=n,v.tag){case 1:if(m=v.payload,typeof m=="function"){f=m.call(y,f,p);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=v.payload,p=typeof m=="function"?m.call(y,f,p):m,p==null)break e;f=te({},f,p);break e;case 2:Ht=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else y={eventTime:y,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=y,l=f):d=d.next=y,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(l=f),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);Vn|=o,e.lanes=o,e.memoizedState=f}}function pd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(N(191,i));i.call(r)}}}var Vi={},bt=pn(Vi),bi=pn(Vi),ji=pn(Vi);function Tn(e){if(e===Vi)throw Error(N(174));return e}function Pu(e,t){switch(q(ji,t),q(bi,e),q(bt,Vi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ga(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ga(t,e)}Q(bt),q(bt,t)}function br(){Q(bt),Q(bi),Q(ji)}function Lh(e){Tn(ji.current);var t=Tn(bt.current),n=Ga(t,e.type);t!==n&&(q(bi,e),q(bt,n))}function Nu(e){bi.current===e&&(Q(bt),Q(bi))}var J=pn(0);function Xs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var pa=[];function Tu(){for(var e=0;e<pa.length;e++)pa[e]._workInProgressVersionPrimary=null;pa.length=0}var ks=Vt.ReactCurrentDispatcher,ha=Vt.ReactCurrentBatchConfig,Fn=0,ee=null,fe=null,he=null,Js=!1,ri=!1,ki=0,Lx=0;function xe(){throw Error(N(321))}function Eu(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ht(e[n],t[n]))return!1;return!0}function Ru(e,t,n,r,i,s){if(Fn=s,ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ks.current=e===null||e.memoizedState===null?Ox:_x,e=n(r,i),ri){s=0;do{if(ri=!1,ki=0,25<=s)throw Error(N(301));s+=1,he=fe=null,t.updateQueue=null,ks.current=zx,e=n(r,i)}while(ri)}if(ks.current=Zs,t=fe!==null&&fe.next!==null,Fn=0,he=fe=ee=null,Js=!1,t)throw Error(N(300));return e}function Lu(){var e=ki!==0;return ki=0,e}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return he===null?ee.memoizedState=he=e:he=he.next=e,he}function it(){if(fe===null){var e=ee.alternate;e=e!==null?e.memoizedState:null}else e=fe.next;var t=he===null?ee.memoizedState:he.next;if(t!==null)he=t,fe=e;else{if(e===null)throw Error(N(310));fe=e,e={memoizedState:fe.memoizedState,baseState:fe.baseState,baseQueue:fe.baseQueue,queue:fe.queue,next:null},he===null?ee.memoizedState=he=e:he=he.next=e}return he}function Ci(e,t){return typeof t=="function"?t(e):t}function ma(e){var t=it(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=fe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,l=null,c=s;do{var d=c.lane;if((Fn&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=r):l=l.next=f,ee.lanes|=d,Vn|=d}c=c.next}while(c!==null&&c!==s);l===null?o=r:l.next=a,ht(r,t.memoizedState)||(Oe=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,ee.lanes|=s,Vn|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ga(e){var t=it(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=e(s,o.action),o=o.next;while(o!==i);ht(s,t.memoizedState)||(Oe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Ah(){}function Dh(e,t){var n=ee,r=it(),i=t(),s=!ht(r.memoizedState,i);if(s&&(r.memoizedState=i,Oe=!0),r=r.queue,Au(_h.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||he!==null&&he.memoizedState.tag&1){if(n.flags|=2048,Pi(9,Oh.bind(null,n,r,i,t),void 0,null),me===null)throw Error(N(349));Fn&30||Mh(n,t,i)}return i}function Mh(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ee.updateQueue,t===null?(t={lastEffect:null,stores:null},ee.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Oh(e,t,n,r){t.value=n,t.getSnapshot=r,zh(t)&&Fh(e)}function _h(e,t,n){return n(function(){zh(t)&&Fh(e)})}function zh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ht(e,n)}catch{return!0}}function Fh(e){var t=_t(e,1);t!==null&&pt(t,e,1,-1)}function hd(e){var t=xt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ci,lastRenderedState:e},t.queue=e,e=e.dispatch=Mx.bind(null,ee,e),[t.memoizedState,e]}function Pi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ee.updateQueue,t===null?(t={lastEffect:null,stores:null},ee.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Vh(){return it().memoizedState}function Cs(e,t,n,r){var i=xt();ee.flags|=e,i.memoizedState=Pi(1|t,n,void 0,r===void 0?null:r)}function ko(e,t,n,r){var i=it();r=r===void 0?null:r;var s=void 0;if(fe!==null){var o=fe.memoizedState;if(s=o.destroy,r!==null&&Eu(r,o.deps)){i.memoizedState=Pi(t,n,s,r);return}}ee.flags|=e,i.memoizedState=Pi(1|t,n,s,r)}function md(e,t){return Cs(8390656,8,e,t)}function Au(e,t){return ko(2048,8,e,t)}function Ih(e,t){return ko(4,2,e,t)}function Bh(e,t){return ko(4,4,e,t)}function Uh(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $h(e,t,n){return n=n!=null?n.concat([e]):null,ko(4,4,Uh.bind(null,t,e),n)}function Du(){}function Hh(e,t){var n=it();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Eu(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Wh(e,t){var n=it();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Eu(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Kh(e,t,n){return Fn&21?(ht(n,t)||(n=Xp(),ee.lanes|=n,Vn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Oe=!0),e.memoizedState=n)}function Ax(e,t){var n=H;H=n!==0&&4>n?n:4,e(!0);var r=ha.transition;ha.transition={};try{e(!1),t()}finally{H=n,ha.transition=r}}function qh(){return it().memoizedState}function Dx(e,t,n){var r=rn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Gh(e))Yh(t,n);else if(n=Eh(e,t,n,r),n!==null){var i=Le();pt(n,e,r,i),Qh(n,t,r)}}function Mx(e,t,n){var r=rn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Gh(e))Yh(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var o=t.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,ht(a,o)){var l=t.interleaved;l===null?(i.next=i,ku(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=Eh(e,t,i,r),n!==null&&(i=Le(),pt(n,e,r,i),Qh(n,t,r))}}function Gh(e){var t=e.alternate;return e===ee||t!==null&&t===ee}function Yh(e,t){ri=Js=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Qh(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,cu(e,n)}}var Zs={readContext:rt,useCallback:xe,useContext:xe,useEffect:xe,useImperativeHandle:xe,useInsertionEffect:xe,useLayoutEffect:xe,useMemo:xe,useReducer:xe,useRef:xe,useState:xe,useDebugValue:xe,useDeferredValue:xe,useTransition:xe,useMutableSource:xe,useSyncExternalStore:xe,useId:xe,unstable_isNewReconciler:!1},Ox={readContext:rt,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:rt,useEffect:md,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Cs(4194308,4,Uh.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Cs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Cs(4,2,e,t)},useMemo:function(e,t){var n=xt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=xt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Dx.bind(null,ee,e),[r.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:hd,useDebugValue:Du,useDeferredValue:function(e){return xt().memoizedState=e},useTransition:function(){var e=hd(!1),t=e[0];return e=Ax.bind(null,e[1]),xt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ee,i=xt();if(X){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),me===null)throw Error(N(349));Fn&30||Mh(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,md(_h.bind(null,r,s,e),[e]),r.flags|=2048,Pi(9,Oh.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=xt(),t=me.identifierPrefix;if(X){var n=Et,r=Tt;n=(r&~(1<<32-ft(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ki++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Lx++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},_x={readContext:rt,useCallback:Hh,useContext:rt,useEffect:Au,useImperativeHandle:$h,useInsertionEffect:Ih,useLayoutEffect:Bh,useMemo:Wh,useReducer:ma,useRef:Vh,useState:function(){return ma(Ci)},useDebugValue:Du,useDeferredValue:function(e){var t=it();return Kh(t,fe.memoizedState,e)},useTransition:function(){var e=ma(Ci)[0],t=it().memoizedState;return[e,t]},useMutableSource:Ah,useSyncExternalStore:Dh,useId:qh,unstable_isNewReconciler:!1},zx={readContext:rt,useCallback:Hh,useContext:rt,useEffect:Au,useImperativeHandle:$h,useInsertionEffect:Ih,useLayoutEffect:Bh,useMemo:Wh,useReducer:ga,useRef:Vh,useState:function(){return ga(Ci)},useDebugValue:Du,useDeferredValue:function(e){var t=it();return fe===null?t.memoizedState=e:Kh(t,fe.memoizedState,e)},useTransition:function(){var e=ga(Ci)[0],t=it().memoizedState;return[e,t]},useMutableSource:Ah,useSyncExternalStore:Dh,useId:qh,unstable_isNewReconciler:!1};function ut(e,t){if(e&&e.defaultProps){t=te({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ml(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Co={isMounted:function(e){return(e=e._reactInternals)?Hn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Le(),i=rn(e),s=Lt(r,i);s.payload=t,n!=null&&(s.callback=n),t=tn(e,s,i),t!==null&&(pt(t,e,i,r),js(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Le(),i=rn(e),s=Lt(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=tn(e,s,i),t!==null&&(pt(t,e,i,r),js(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Le(),r=rn(e),i=Lt(n,r);i.tag=2,t!=null&&(i.callback=t),t=tn(e,i,r),t!==null&&(pt(t,e,r,n),js(t,e,r))}};function gd(e,t,n,r,i,s,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,o):t.prototype&&t.prototype.isPureReactComponent?!vi(n,r)||!vi(i,s):!0}function Xh(e,t,n){var r=!1,i=un,s=t.contextType;return typeof s=="object"&&s!==null?s=rt(s):(i=ze(t)?_n:Pe.current,r=t.contextTypes,s=(r=r!=null)?xr(e,i):un),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Co,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function yd(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Co.enqueueReplaceState(t,t.state,null)}function gl(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Cu(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=rt(s):(s=ze(t)?_n:Pe.current,i.context=xr(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(ml(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Co.enqueueReplaceState(i,i.state,null),Qs(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function jr(e,t){try{var n="",r=t;do n+=dv(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function ya(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function yl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Fx=typeof WeakMap=="function"?WeakMap:Map;function Jh(e,t,n){n=Lt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){to||(to=!0,Nl=r),yl(e,t)},n}function Zh(e,t,n){n=Lt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){yl(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){yl(e,t),typeof r!="function"&&(nn===null?nn=new Set([this]):nn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function vd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fx;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Jx.bind(null,e,t,n),t.then(e,e))}function xd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function wd(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Lt(-1,1),t.tag=2,tn(n,t,1))),n.lanes|=1),e)}var Vx=Vt.ReactCurrentOwner,Oe=!1;function Re(e,t,n,r){t.child=e===null?Th(t,null,n,r):Sr(t,e.child,n,r)}function Sd(e,t,n,r,i){n=n.render;var s=t.ref;return mr(t,i),r=Ru(e,t,n,r,s,i),n=Lu(),e!==null&&!Oe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,zt(e,t,i)):(X&&n&&vu(t),t.flags|=1,Re(e,t,r,i),t.child)}function bd(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!Bu(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,em(e,t,s,r,i)):(e=Es(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:vi,n(o,r)&&e.ref===t.ref)return zt(e,t,i)}return t.flags|=1,e=sn(s,r),e.ref=t.ref,e.return=t,t.child=e}function em(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(vi(s,r)&&e.ref===t.ref)if(Oe=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(Oe=!0);else return t.lanes=e.lanes,zt(e,t,i)}return vl(e,t,n,r,i)}function tm(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(or,He),He|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,q(or,He),He|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,q(or,He),He|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,q(or,He),He|=r;return Re(e,t,i,n),t.child}function nm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function vl(e,t,n,r,i){var s=ze(n)?_n:Pe.current;return s=xr(t,s),mr(t,i),n=Ru(e,t,n,r,s,i),r=Lu(),e!==null&&!Oe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,zt(e,t,i)):(X&&r&&vu(t),t.flags|=1,Re(e,t,n,i),t.child)}function jd(e,t,n,r,i){if(ze(n)){var s=!0;Ws(t)}else s=!1;if(mr(t,i),t.stateNode===null)Ps(e,t),Xh(t,n,r),gl(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=rt(c):(c=ze(n)?_n:Pe.current,c=xr(t,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==c)&&yd(t,o,r,c),Ht=!1;var p=t.memoizedState;o.state=p,Qs(t,r,o,i),l=t.memoizedState,a!==r||p!==l||_e.current||Ht?(typeof d=="function"&&(ml(t,n,d,r),l=t.memoizedState),(a=Ht||gd(t,n,a,r,p,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),o.props=r,o.state=l,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Rh(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:ut(t.type,a),o.props=c,f=t.pendingProps,p=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=rt(l):(l=ze(n)?_n:Pe.current,l=xr(t,l));var y=n.getDerivedStateFromProps;(d=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||p!==l)&&yd(t,o,r,l),Ht=!1,p=t.memoizedState,o.state=p,Qs(t,r,o,i);var m=t.memoizedState;a!==f||p!==m||_e.current||Ht?(typeof y=="function"&&(ml(t,n,y,r),m=t.memoizedState),(c=Ht||gd(t,n,c,r,p,m,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,m,l)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),o.props=r,o.state=m,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return xl(e,t,n,r,s,i)}function xl(e,t,n,r,i,s){nm(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&ld(t,n,!1),zt(e,t,s);r=t.stateNode,Vx.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Sr(t,e.child,null,s),t.child=Sr(t,null,a,s)):Re(e,t,a,s),t.memoizedState=r.state,i&&ld(t,n,!0),t.child}function rm(e){var t=e.stateNode;t.pendingContext?ad(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ad(e,t.context,!1),Pu(e,t.containerInfo)}function kd(e,t,n,r,i){return wr(),wu(i),t.flags|=256,Re(e,t,n,r),t.child}var wl={dehydrated:null,treeContext:null,retryLane:0};function Sl(e){return{baseLanes:e,cachePool:null,transitions:null}}function im(e,t,n){var r=t.pendingProps,i=J.current,s=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),q(J,i&1),e===null)return pl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,s?(r=t.mode,s=t.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=To(o,r,0,null),e=Dn(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Sl(n),t.memoizedState=wl,e):Mu(t,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return Ix(e,t,o,r,a,i,n);if(s){s=r.fallback,o=t.mode,i=e.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=sn(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=sn(a,s):(s=Dn(s,o,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,o=e.child.memoizedState,o=o===null?Sl(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=e.childLanes&~n,t.memoizedState=wl,r}return s=e.child,e=s.sibling,r=sn(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Mu(e,t){return t=To({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ls(e,t,n,r){return r!==null&&wu(r),Sr(t,e.child,null,n),e=Mu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ix(e,t,n,r,i,s,o){if(n)return t.flags&256?(t.flags&=-257,r=ya(Error(N(422))),ls(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=To({mode:"visible",children:r.children},i,0,null),s=Dn(s,i,o,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&Sr(t,e.child,null,o),t.child.memoizedState=Sl(o),t.memoizedState=wl,s);if(!(t.mode&1))return ls(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(N(419)),r=ya(s,r,void 0),ls(e,t,o,r)}if(a=(o&e.childLanes)!==0,Oe||a){if(r=me,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,_t(e,i),pt(r,e,i,-1))}return Iu(),r=ya(Error(N(421))),ls(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Zx.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,We=en(i.nextSibling),Ke=t,X=!0,dt=null,e!==null&&(Ze[et++]=Tt,Ze[et++]=Et,Ze[et++]=zn,Tt=e.id,Et=e.overflow,zn=t),t=Mu(t,r.children),t.flags|=4096,t)}function Cd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),hl(e.return,t,n)}function va(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function sm(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(Re(e,t,r.children,n),r=J.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Cd(e,n,t);else if(e.tag===19)Cd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(q(J,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Xs(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),va(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Xs(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}va(t,!0,n,null,s);break;case"together":va(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ps(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function zt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Vn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=sn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=sn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Bx(e,t,n){switch(t.tag){case 3:rm(t),wr();break;case 5:Lh(t);break;case 1:ze(t.type)&&Ws(t);break;case 4:Pu(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;q(Gs,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(q(J,J.current&1),t.flags|=128,null):n&t.child.childLanes?im(e,t,n):(q(J,J.current&1),e=zt(e,t,n),e!==null?e.sibling:null);q(J,J.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return sm(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),q(J,J.current),r)break;return null;case 22:case 23:return t.lanes=0,tm(e,t,n)}return zt(e,t,n)}var om,bl,am,lm;om=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};bl=function(){};am=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Tn(bt.current);var s=null;switch(n){case"input":i=Ha(e,i),r=Ha(e,r),s=[];break;case"select":i=te({},i,{value:void 0}),r=te({},r,{value:void 0}),s=[];break;case"textarea":i=qa(e,i),r=qa(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=$s)}Ya(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(di.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(di.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Y("scroll",e),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(t.updateQueue=c)&&(t.flags|=4)}};lm=function(e,t,n,r){n!==r&&(t.flags|=4)};function Ur(e,t){if(!X)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function we(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ux(e,t,n){var r=t.pendingProps;switch(xu(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return we(t),null;case 1:return ze(t.type)&&Hs(),we(t),null;case 3:return r=t.stateNode,br(),Q(_e),Q(Pe),Tu(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(os(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,dt!==null&&(Rl(dt),dt=null))),bl(e,t),we(t),null;case 5:Nu(t);var i=Tn(ji.current);if(n=t.type,e!==null&&t.stateNode!=null)am(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(N(166));return we(t),null}if(e=Tn(bt.current),os(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[wt]=t,r[Si]=s,e=(t.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(i=0;i<Qr.length;i++)Y(Qr[i],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":Mc(r,s),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Y("invalid",r);break;case"textarea":_c(r,s),Y("invalid",r)}Ya(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&ss(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ss(r.textContent,a,e),i=["children",""+a]):di.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Y("scroll",r)}switch(n){case"input":Xi(r),Oc(r,s,!0);break;case"textarea":Xi(r),zc(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=$s)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=_p(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[wt]=t,e[Si]=r,om(e,t,!1,!1),t.stateNode=e;e:{switch(o=Qa(n,r),n){case"dialog":Y("cancel",e),Y("close",e),i=r;break;case"iframe":case"object":case"embed":Y("load",e),i=r;break;case"video":case"audio":for(i=0;i<Qr.length;i++)Y(Qr[i],e);i=r;break;case"source":Y("error",e),i=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),i=r;break;case"details":Y("toggle",e),i=r;break;case"input":Mc(e,r),i=Ha(e,r),Y("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=te({},r,{value:void 0}),Y("invalid",e);break;case"textarea":_c(e,r),i=qa(e,r),Y("invalid",e);break;default:i=r}Ya(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Vp(e,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&zp(e,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&fi(e,l):typeof l=="number"&&fi(e,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(di.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Y("scroll",e):l!=null&&iu(e,s,l,o))}switch(n){case"input":Xi(e),Oc(e,r,!1);break;case"textarea":Xi(e),zc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ln(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?dr(e,!!r.multiple,s,!1):r.defaultValue!=null&&dr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=$s)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return we(t),null;case 6:if(e&&t.stateNode!=null)lm(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(N(166));if(n=Tn(ji.current),Tn(bt.current),os(t)){if(r=t.stateNode,n=t.memoizedProps,r[wt]=t,(s=r.nodeValue!==n)&&(e=Ke,e!==null))switch(e.tag){case 3:ss(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ss(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[wt]=t,t.stateNode=r}return we(t),null;case 13:if(Q(J),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(X&&We!==null&&t.mode&1&&!(t.flags&128))Ph(),wr(),t.flags|=98560,s=!1;else if(s=os(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(N(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(N(317));s[wt]=t}else wr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;we(t),s=!1}else dt!==null&&(Rl(dt),dt=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||J.current&1?pe===0&&(pe=3):Iu())),t.updateQueue!==null&&(t.flags|=4),we(t),null);case 4:return br(),bl(e,t),e===null&&xi(t.stateNode.containerInfo),we(t),null;case 10:return ju(t.type._context),we(t),null;case 17:return ze(t.type)&&Hs(),we(t),null;case 19:if(Q(J),s=t.memoizedState,s===null)return we(t),null;if(r=(t.flags&128)!==0,o=s.rendering,o===null)if(r)Ur(s,!1);else{if(pe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Xs(e),o!==null){for(t.flags|=128,Ur(s,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,e=o.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return q(J,J.current&1|2),t.child}e=e.sibling}s.tail!==null&&oe()>kr&&(t.flags|=128,r=!0,Ur(s,!1),t.lanes=4194304)}else{if(!r)if(e=Xs(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ur(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!X)return we(t),null}else 2*oe()-s.renderingStartTime>kr&&n!==1073741824&&(t.flags|=128,r=!0,Ur(s,!1),t.lanes=4194304);s.isBackwards?(o.sibling=t.child,t.child=o):(n=s.last,n!==null?n.sibling=o:t.child=o,s.last=o)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=oe(),t.sibling=null,n=J.current,q(J,r?n&1|2:n&1),t):(we(t),null);case 22:case 23:return Vu(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?He&1073741824&&(we(t),t.subtreeFlags&6&&(t.flags|=8192)):we(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function $x(e,t){switch(xu(t),t.tag){case 1:return ze(t.type)&&Hs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return br(),Q(_e),Q(Pe),Tu(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Nu(t),null;case 13:if(Q(J),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));wr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Q(J),null;case 4:return br(),null;case 10:return ju(t.type._context),null;case 22:case 23:return Vu(),null;case 24:return null;default:return null}}var us=!1,be=!1,Hx=typeof WeakSet=="function"?WeakSet:Set,L=null;function sr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){re(e,t,r)}else n.current=null}function jl(e,t,n){try{n()}catch(r){re(e,t,r)}}var Pd=!1;function Wx(e,t){if(ol=Is,e=ph(),yu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,d=0,f=e,p=null;t:for(;;){for(var y;f!==n||i!==0&&f.nodeType!==3||(a=o+i),f!==s||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(y=f.firstChild)!==null;)p=f,f=y;for(;;){if(f===e)break t;if(p===n&&++c===i&&(a=o),p===s&&++d===r&&(l=o),(y=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=y}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(al={focusedElem:e,selectionRange:n},Is=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var v=m.memoizedProps,w=m.memoizedState,x=t.stateNode,h=x.getSnapshotBeforeUpdate(t.elementType===t.type?v:ut(t.type,v),w);x.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(b){re(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return m=Pd,Pd=!1,m}function ii(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&jl(t,n,s)}i=i.next}while(i!==r)}}function Po(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function kl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function um(e){var t=e.alternate;t!==null&&(e.alternate=null,um(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[wt],delete t[Si],delete t[cl],delete t[Nx],delete t[Tx])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function cm(e){return e.tag===5||e.tag===3||e.tag===4}function Nd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||cm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$s));else if(r!==4&&(e=e.child,e!==null))for(Cl(e,t,n),e=e.sibling;e!==null;)Cl(e,t,n),e=e.sibling}function Pl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Pl(e,t,n),e=e.sibling;e!==null;)Pl(e,t,n),e=e.sibling}var ge=null,ct=!1;function Bt(e,t,n){for(n=n.child;n!==null;)dm(e,t,n),n=n.sibling}function dm(e,t,n){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(vo,n)}catch{}switch(n.tag){case 5:be||sr(n,t);case 6:var r=ge,i=ct;ge=null,Bt(e,t,n),ge=r,ct=i,ge!==null&&(ct?(e=ge,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ge.removeChild(n.stateNode));break;case 18:ge!==null&&(ct?(e=ge,n=n.stateNode,e.nodeType===8?da(e.parentNode,n):e.nodeType===1&&da(e,n),gi(e)):da(ge,n.stateNode));break;case 4:r=ge,i=ct,ge=n.stateNode.containerInfo,ct=!0,Bt(e,t,n),ge=r,ct=i;break;case 0:case 11:case 14:case 15:if(!be&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&jl(n,t,o),i=i.next}while(i!==r)}Bt(e,t,n);break;case 1:if(!be&&(sr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){re(n,t,a)}Bt(e,t,n);break;case 21:Bt(e,t,n);break;case 22:n.mode&1?(be=(r=be)||n.memoizedState!==null,Bt(e,t,n),be=r):Bt(e,t,n);break;default:Bt(e,t,n)}}function Td(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Hx),t.forEach(function(r){var i=e0.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function lt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:ge=a.stateNode,ct=!1;break e;case 3:ge=a.stateNode.containerInfo,ct=!0;break e;case 4:ge=a.stateNode.containerInfo,ct=!0;break e}a=a.return}if(ge===null)throw Error(N(160));dm(s,o,i),ge=null,ct=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){re(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)fm(t,e),t=t.sibling}function fm(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(lt(t,e),yt(e),r&4){try{ii(3,e,e.return),Po(3,e)}catch(v){re(e,e.return,v)}try{ii(5,e,e.return)}catch(v){re(e,e.return,v)}}break;case 1:lt(t,e),yt(e),r&512&&n!==null&&sr(n,n.return);break;case 5:if(lt(t,e),yt(e),r&512&&n!==null&&sr(n,n.return),e.flags&32){var i=e.stateNode;try{fi(i,"")}catch(v){re(e,e.return,v)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,o=n!==null?n.memoizedProps:s,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Mp(i,s),Qa(a,o);var c=Qa(a,s);for(o=0;o<l.length;o+=2){var d=l[o],f=l[o+1];d==="style"?Vp(i,f):d==="dangerouslySetInnerHTML"?zp(i,f):d==="children"?fi(i,f):iu(i,d,f,c)}switch(a){case"input":Wa(i,s);break;case"textarea":Op(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var y=s.value;y!=null?dr(i,!!s.multiple,y,!1):p!==!!s.multiple&&(s.defaultValue!=null?dr(i,!!s.multiple,s.defaultValue,!0):dr(i,!!s.multiple,s.multiple?[]:"",!1))}i[Si]=s}catch(v){re(e,e.return,v)}}break;case 6:if(lt(t,e),yt(e),r&4){if(e.stateNode===null)throw Error(N(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(v){re(e,e.return,v)}}break;case 3:if(lt(t,e),yt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{gi(t.containerInfo)}catch(v){re(e,e.return,v)}break;case 4:lt(t,e),yt(e);break;case 13:lt(t,e),yt(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(zu=oe())),r&4&&Td(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(be=(c=be)||d,lt(t,e),be=c):lt(t,e),yt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(L=e,d=e.child;d!==null;){for(f=L=d;L!==null;){switch(p=L,y=p.child,p.tag){case 0:case 11:case 14:case 15:ii(4,p,p.return);break;case 1:sr(p,p.return);var m=p.stateNode;if(typeof m.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(v){re(r,n,v)}}break;case 5:sr(p,p.return);break;case 22:if(p.memoizedState!==null){Rd(f);continue}}y!==null?(y.return=p,L=y):Rd(f)}d=d.sibling}e:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{i=f.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Fp("display",o))}catch(v){re(e,e.return,v)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(v){re(e,e.return,v)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:lt(t,e),yt(e),r&4&&Td(e);break;case 21:break;default:lt(t,e),yt(e)}}function yt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(cm(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(fi(i,""),r.flags&=-33);var s=Nd(e);Pl(e,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Nd(e);Cl(e,a,o);break;default:throw Error(N(161))}}catch(l){re(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Kx(e,t,n){L=e,pm(e)}function pm(e,t,n){for(var r=(e.mode&1)!==0;L!==null;){var i=L,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||us;if(!o){var a=i.alternate,l=a!==null&&a.memoizedState!==null||be;a=us;var c=be;if(us=o,(be=l)&&!c)for(L=i;L!==null;)o=L,l=o.child,o.tag===22&&o.memoizedState!==null?Ld(i):l!==null?(l.return=o,L=l):Ld(i);for(;s!==null;)L=s,pm(s),s=s.sibling;L=i,us=a,be=c}Ed(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,L=s):Ed(e)}}function Ed(e){for(;L!==null;){var t=L;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:be||Po(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!be)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:ut(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&pd(t,s,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}pd(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&gi(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}be||t.flags&512&&kl(t)}catch(p){re(t,t.return,p)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function Rd(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function Ld(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Po(4,t)}catch(l){re(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){re(t,i,l)}}var s=t.return;try{kl(t)}catch(l){re(t,s,l)}break;case 5:var o=t.return;try{kl(t)}catch(l){re(t,o,l)}}}catch(l){re(t,t.return,l)}if(t===e){L=null;break}var a=t.sibling;if(a!==null){a.return=t.return,L=a;break}L=t.return}}var qx=Math.ceil,eo=Vt.ReactCurrentDispatcher,Ou=Vt.ReactCurrentOwner,nt=Vt.ReactCurrentBatchConfig,B=0,me=null,de=null,ye=0,He=0,or=pn(0),pe=0,Ni=null,Vn=0,No=0,_u=0,si=null,Me=null,zu=0,kr=1/0,Pt=null,to=!1,Nl=null,nn=null,cs=!1,Yt=null,no=0,oi=0,Tl=null,Ns=-1,Ts=0;function Le(){return B&6?oe():Ns!==-1?Ns:Ns=oe()}function rn(e){return e.mode&1?B&2&&ye!==0?ye&-ye:Rx.transition!==null?(Ts===0&&(Ts=Xp()),Ts):(e=H,e!==0||(e=window.event,e=e===void 0?16:ih(e.type)),e):1}function pt(e,t,n,r){if(50<oi)throw oi=0,Tl=null,Error(N(185));_i(e,n,r),(!(B&2)||e!==me)&&(e===me&&(!(B&2)&&(No|=n),pe===4&&qt(e,ye)),Fe(e,r),n===1&&B===0&&!(t.mode&1)&&(kr=oe()+500,jo&&hn()))}function Fe(e,t){var n=e.callbackNode;Rv(e,t);var r=Vs(e,e===me?ye:0);if(r===0)n!==null&&Ic(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ic(n),t===1)e.tag===0?Ex(Ad.bind(null,e)):jh(Ad.bind(null,e)),Cx(function(){!(B&6)&&hn()}),n=null;else{switch(Jp(r)){case 1:n=uu;break;case 4:n=Yp;break;case 16:n=Fs;break;case 536870912:n=Qp;break;default:n=Fs}n=Sm(n,hm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function hm(e,t){if(Ns=-1,Ts=0,B&6)throw Error(N(327));var n=e.callbackNode;if(gr()&&e.callbackNode!==n)return null;var r=Vs(e,e===me?ye:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ro(e,r);else{t=r;var i=B;B|=2;var s=gm();(me!==e||ye!==t)&&(Pt=null,kr=oe()+500,An(e,t));do try{Qx();break}catch(a){mm(e,a)}while(!0);bu(),eo.current=s,B=i,de!==null?t=0:(me=null,ye=0,t=pe)}if(t!==0){if(t===2&&(i=tl(e),i!==0&&(r=i,t=El(e,i))),t===1)throw n=Ni,An(e,0),qt(e,r),Fe(e,oe()),n;if(t===6)qt(e,r);else{if(i=e.current.alternate,!(r&30)&&!Gx(i)&&(t=ro(e,r),t===2&&(s=tl(e),s!==0&&(r=s,t=El(e,s))),t===1))throw n=Ni,An(e,0),qt(e,r),Fe(e,oe()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(N(345));case 2:bn(e,Me,Pt);break;case 3:if(qt(e,r),(r&130023424)===r&&(t=zu+500-oe(),10<t)){if(Vs(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Le(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ul(bn.bind(null,e,Me,Pt),t);break}bn(e,Me,Pt);break;case 4:if(qt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-ft(r);s=1<<o,o=t[o],o>i&&(i=o),r&=~s}if(r=i,r=oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*qx(r/1960))-r,10<r){e.timeoutHandle=ul(bn.bind(null,e,Me,Pt),r);break}bn(e,Me,Pt);break;case 5:bn(e,Me,Pt);break;default:throw Error(N(329))}}}return Fe(e,oe()),e.callbackNode===n?hm.bind(null,e):null}function El(e,t){var n=si;return e.current.memoizedState.isDehydrated&&(An(e,t).flags|=256),e=ro(e,t),e!==2&&(t=Me,Me=n,t!==null&&Rl(t)),e}function Rl(e){Me===null?Me=e:Me.push.apply(Me,e)}function Gx(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!ht(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function qt(e,t){for(t&=~_u,t&=~No,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ft(t),r=1<<n;e[n]=-1,t&=~r}}function Ad(e){if(B&6)throw Error(N(327));gr();var t=Vs(e,0);if(!(t&1))return Fe(e,oe()),null;var n=ro(e,t);if(e.tag!==0&&n===2){var r=tl(e);r!==0&&(t=r,n=El(e,r))}if(n===1)throw n=Ni,An(e,0),qt(e,t),Fe(e,oe()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,bn(e,Me,Pt),Fe(e,oe()),null}function Fu(e,t){var n=B;B|=1;try{return e(t)}finally{B=n,B===0&&(kr=oe()+500,jo&&hn())}}function In(e){Yt!==null&&Yt.tag===0&&!(B&6)&&gr();var t=B;B|=1;var n=nt.transition,r=H;try{if(nt.transition=null,H=1,e)return e()}finally{H=r,nt.transition=n,B=t,!(B&6)&&hn()}}function Vu(){He=or.current,Q(or)}function An(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,kx(n)),de!==null)for(n=de.return;n!==null;){var r=n;switch(xu(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Hs();break;case 3:br(),Q(_e),Q(Pe),Tu();break;case 5:Nu(r);break;case 4:br();break;case 13:Q(J);break;case 19:Q(J);break;case 10:ju(r.type._context);break;case 22:case 23:Vu()}n=n.return}if(me=e,de=e=sn(e.current,null),ye=He=t,pe=0,Ni=null,_u=No=Vn=0,Me=si=null,Nn!==null){for(t=0;t<Nn.length;t++)if(n=Nn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Nn=null}return e}function mm(e,t){do{var n=de;try{if(bu(),ks.current=Zs,Js){for(var r=ee.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Js=!1}if(Fn=0,he=fe=ee=null,ri=!1,ki=0,Ou.current=null,n===null||n.return===null){pe=1,Ni=t,de=null;break}e:{var s=e,o=n.return,a=n,l=t;if(t=ye,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var y=xd(o);if(y!==null){y.flags&=-257,wd(y,o,a,s,t),y.mode&1&&vd(s,c,t),t=y,l=c;var m=t.updateQueue;if(m===null){var v=new Set;v.add(l),t.updateQueue=v}else m.add(l);break e}else{if(!(t&1)){vd(s,c,t),Iu();break e}l=Error(N(426))}}else if(X&&a.mode&1){var w=xd(o);if(w!==null){!(w.flags&65536)&&(w.flags|=256),wd(w,o,a,s,t),wu(jr(l,a));break e}}s=l=jr(l,a),pe!==4&&(pe=2),si===null?si=[s]:si.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var x=Jh(s,l,t);fd(s,x);break e;case 1:a=l;var h=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof h.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(nn===null||!nn.has(g)))){s.flags|=65536,t&=-t,s.lanes|=t;var b=Zh(s,a,t);fd(s,b);break e}}s=s.return}while(s!==null)}vm(n)}catch(k){t=k,de===n&&n!==null&&(de=n=n.return);continue}break}while(!0)}function gm(){var e=eo.current;return eo.current=Zs,e===null?Zs:e}function Iu(){(pe===0||pe===3||pe===2)&&(pe=4),me===null||!(Vn&268435455)&&!(No&268435455)||qt(me,ye)}function ro(e,t){var n=B;B|=2;var r=gm();(me!==e||ye!==t)&&(Pt=null,An(e,t));do try{Yx();break}catch(i){mm(e,i)}while(!0);if(bu(),B=n,eo.current=r,de!==null)throw Error(N(261));return me=null,ye=0,pe}function Yx(){for(;de!==null;)ym(de)}function Qx(){for(;de!==null&&!Sv();)ym(de)}function ym(e){var t=wm(e.alternate,e,He);e.memoizedProps=e.pendingProps,t===null?vm(e):de=t,Ou.current=null}function vm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=$x(n,t),n!==null){n.flags&=32767,de=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{pe=6,de=null;return}}else if(n=Ux(n,t,He),n!==null){de=n;return}if(t=t.sibling,t!==null){de=t;return}de=t=e}while(t!==null);pe===0&&(pe=5)}function bn(e,t,n){var r=H,i=nt.transition;try{nt.transition=null,H=1,Xx(e,t,n,r)}finally{nt.transition=i,H=r}return null}function Xx(e,t,n,r){do gr();while(Yt!==null);if(B&6)throw Error(N(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(Lv(e,s),e===me&&(de=me=null,ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||cs||(cs=!0,Sm(Fs,function(){return gr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=nt.transition,nt.transition=null;var o=H;H=1;var a=B;B|=4,Ou.current=null,Wx(e,n),fm(n,e),yx(al),Is=!!ol,al=ol=null,e.current=n,Kx(n),bv(),B=a,H=o,nt.transition=s}else e.current=n;if(cs&&(cs=!1,Yt=e,no=i),s=e.pendingLanes,s===0&&(nn=null),Cv(n.stateNode),Fe(e,oe()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(to)throw to=!1,e=Nl,Nl=null,e;return no&1&&e.tag!==0&&gr(),s=e.pendingLanes,s&1?e===Tl?oi++:(oi=0,Tl=e):oi=0,hn(),null}function gr(){if(Yt!==null){var e=Jp(no),t=nt.transition,n=H;try{if(nt.transition=null,H=16>e?16:e,Yt===null)var r=!1;else{if(e=Yt,Yt=null,no=0,B&6)throw Error(N(331));var i=B;for(B|=4,L=e.current;L!==null;){var s=L,o=s.child;if(L.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(L=c;L!==null;){var d=L;switch(d.tag){case 0:case 11:case 15:ii(8,d,s)}var f=d.child;if(f!==null)f.return=d,L=f;else for(;L!==null;){d=L;var p=d.sibling,y=d.return;if(um(d),d===c){L=null;break}if(p!==null){p.return=y,L=p;break}L=y}}}var m=s.alternate;if(m!==null){var v=m.child;if(v!==null){m.child=null;do{var w=v.sibling;v.sibling=null,v=w}while(v!==null)}}L=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,L=o;else e:for(;L!==null;){if(s=L,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ii(9,s,s.return)}var x=s.sibling;if(x!==null){x.return=s.return,L=x;break e}L=s.return}}var h=e.current;for(L=h;L!==null;){o=L;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,L=g;else e:for(o=h;L!==null;){if(a=L,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Po(9,a)}}catch(k){re(a,a.return,k)}if(a===o){L=null;break e}var b=a.sibling;if(b!==null){b.return=a.return,L=b;break e}L=a.return}}if(B=i,hn(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(vo,e)}catch{}r=!0}return r}finally{H=n,nt.transition=t}}return!1}function Dd(e,t,n){t=jr(n,t),t=Jh(e,t,1),e=tn(e,t,1),t=Le(),e!==null&&(_i(e,1,t),Fe(e,t))}function re(e,t,n){if(e.tag===3)Dd(e,e,n);else for(;t!==null;){if(t.tag===3){Dd(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(nn===null||!nn.has(r))){e=jr(n,e),e=Zh(t,e,1),t=tn(t,e,1),e=Le(),t!==null&&(_i(t,1,e),Fe(t,e));break}}t=t.return}}function Jx(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Le(),e.pingedLanes|=e.suspendedLanes&n,me===e&&(ye&n)===n&&(pe===4||pe===3&&(ye&130023424)===ye&&500>oe()-zu?An(e,0):_u|=n),Fe(e,t)}function xm(e,t){t===0&&(e.mode&1?(t=es,es<<=1,!(es&130023424)&&(es=4194304)):t=1);var n=Le();e=_t(e,t),e!==null&&(_i(e,t,n),Fe(e,n))}function Zx(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),xm(e,n)}function e0(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(t),xm(e,n)}var wm;wm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||_e.current)Oe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Oe=!1,Bx(e,t,n);Oe=!!(e.flags&131072)}else Oe=!1,X&&t.flags&1048576&&kh(t,qs,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ps(e,t),e=t.pendingProps;var i=xr(t,Pe.current);mr(t,n),i=Ru(null,t,r,e,i,n);var s=Lu();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ze(r)?(s=!0,Ws(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Cu(t),i.updater=Co,t.stateNode=i,i._reactInternals=t,gl(t,r,e,n),t=xl(null,t,r,!0,s,n)):(t.tag=0,X&&s&&vu(t),Re(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ps(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=n0(r),e=ut(r,e),i){case 0:t=vl(null,t,r,e,n);break e;case 1:t=jd(null,t,r,e,n);break e;case 11:t=Sd(null,t,r,e,n);break e;case 14:t=bd(null,t,r,ut(r.type,e),n);break e}throw Error(N(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ut(r,i),vl(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ut(r,i),jd(e,t,r,i,n);case 3:e:{if(rm(t),e===null)throw Error(N(387));r=t.pendingProps,s=t.memoizedState,i=s.element,Rh(e,t),Qs(t,r,null,n);var o=t.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=jr(Error(N(423)),t),t=kd(e,t,r,n,i);break e}else if(r!==i){i=jr(Error(N(424)),t),t=kd(e,t,r,n,i);break e}else for(We=en(t.stateNode.containerInfo.firstChild),Ke=t,X=!0,dt=null,n=Th(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(wr(),r===i){t=zt(e,t,n);break e}Re(e,t,r,n)}t=t.child}return t;case 5:return Lh(t),e===null&&pl(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,o=i.children,ll(r,i)?o=null:s!==null&&ll(r,s)&&(t.flags|=32),nm(e,t),Re(e,t,o,n),t.child;case 6:return e===null&&pl(t),null;case 13:return im(e,t,n);case 4:return Pu(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Sr(t,null,r,n):Re(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ut(r,i),Sd(e,t,r,i,n);case 7:return Re(e,t,t.pendingProps,n),t.child;case 8:return Re(e,t,t.pendingProps.children,n),t.child;case 12:return Re(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value,q(Gs,r._currentValue),r._currentValue=o,s!==null)if(ht(s.value,o)){if(s.children===i.children&&!_e.current){t=zt(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=Lt(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),hl(s.return,n,t),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===t.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(N(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),hl(o,n,t),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===t){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Re(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,mr(t,n),i=rt(i),r=r(i),t.flags|=1,Re(e,t,r,n),t.child;case 14:return r=t.type,i=ut(r,t.pendingProps),i=ut(r.type,i),bd(e,t,r,i,n);case 15:return em(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ut(r,i),Ps(e,t),t.tag=1,ze(r)?(e=!0,Ws(t)):e=!1,mr(t,n),Xh(t,r,i),gl(t,r,i,n),xl(null,t,r,!0,e,n);case 19:return sm(e,t,n);case 22:return tm(e,t,n)}throw Error(N(156,t.tag))};function Sm(e,t){return Gp(e,t)}function t0(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(e,t,n,r){return new t0(e,t,n,r)}function Bu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function n0(e){if(typeof e=="function")return Bu(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ou)return 11;if(e===au)return 14}return 2}function sn(e,t){var n=e.alternate;return n===null?(n=tt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Es(e,t,n,r,i,s){var o=2;if(r=e,typeof e=="function")Bu(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Qn:return Dn(n.children,i,s,t);case su:o=8,i|=8;break;case Ia:return e=tt(12,n,t,i|2),e.elementType=Ia,e.lanes=s,e;case Ba:return e=tt(13,n,t,i),e.elementType=Ba,e.lanes=s,e;case Ua:return e=tt(19,n,t,i),e.elementType=Ua,e.lanes=s,e;case Lp:return To(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ep:o=10;break e;case Rp:o=9;break e;case ou:o=11;break e;case au:o=14;break e;case $t:o=16,r=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=tt(o,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function Dn(e,t,n,r){return e=tt(7,e,r,t),e.lanes=n,e}function To(e,t,n,r){return e=tt(22,e,r,t),e.elementType=Lp,e.lanes=n,e.stateNode={isHidden:!1},e}function xa(e,t,n){return e=tt(6,e,null,t),e.lanes=n,e}function wa(e,t,n){return t=tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function r0(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ea(0),this.expirationTimes=ea(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ea(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Uu(e,t,n,r,i,s,o,a,l){return e=new r0(e,t,n,a,l),t===1?(t=1,s===!0&&(t|=8)):t=0,s=tt(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Cu(s),e}function i0(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function bm(e){if(!e)return un;e=e._reactInternals;e:{if(Hn(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ze(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(ze(n))return bh(e,n,t)}return t}function jm(e,t,n,r,i,s,o,a,l){return e=Uu(n,r,!0,e,i,s,o,a,l),e.context=bm(null),n=e.current,r=Le(),i=rn(n),s=Lt(r,i),s.callback=t??null,tn(n,s,i),e.current.lanes=i,_i(e,i,r),Fe(e,r),e}function Eo(e,t,n,r){var i=t.current,s=Le(),o=rn(i);return n=bm(n),t.context===null?t.context=n:t.pendingContext=n,t=Lt(s,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=tn(i,t,o),e!==null&&(pt(e,i,o,s),js(e,i,o)),o}function io(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Md(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function $u(e,t){Md(e,t),(e=e.alternate)&&Md(e,t)}function s0(){return null}var km=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hu(e){this._internalRoot=e}Ro.prototype.render=Hu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));Eo(e,t,null,null)};Ro.prototype.unmount=Hu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;In(function(){Eo(null,e,null,null)}),t[Ot]=null}};function Ro(e){this._internalRoot=e}Ro.prototype.unstable_scheduleHydration=function(e){if(e){var t=th();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Kt.length&&t!==0&&t<Kt[n].priority;n++);Kt.splice(n,0,e),n===0&&rh(e)}};function Wu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Lo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Od(){}function o0(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=io(o);s.call(c)}}var o=jm(t,r,e,0,null,!1,!1,"",Od);return e._reactRootContainer=o,e[Ot]=o.current,xi(e.nodeType===8?e.parentNode:e),In(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=io(l);a.call(c)}}var l=Uu(e,0,!1,null,null,!1,!1,"",Od);return e._reactRootContainer=l,e[Ot]=l.current,xi(e.nodeType===8?e.parentNode:e),In(function(){Eo(t,l,n,r)}),l}function Ao(e,t,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var l=io(o);a.call(l)}}Eo(t,o,e,i)}else o=o0(n,t,e,i,r);return io(o)}Zp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Yr(t.pendingLanes);n!==0&&(cu(t,n|1),Fe(t,oe()),!(B&6)&&(kr=oe()+500,hn()))}break;case 13:In(function(){var r=_t(e,1);if(r!==null){var i=Le();pt(r,e,1,i)}}),$u(e,1)}};du=function(e){if(e.tag===13){var t=_t(e,134217728);if(t!==null){var n=Le();pt(t,e,134217728,n)}$u(e,134217728)}};eh=function(e){if(e.tag===13){var t=rn(e),n=_t(e,t);if(n!==null){var r=Le();pt(n,e,t,r)}$u(e,t)}};th=function(){return H};nh=function(e,t){var n=H;try{return H=e,t()}finally{H=n}};Ja=function(e,t,n){switch(t){case"input":if(Wa(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=bo(r);if(!i)throw Error(N(90));Dp(r),Wa(r,i)}}}break;case"textarea":Op(e,n);break;case"select":t=n.value,t!=null&&dr(e,!!n.multiple,t,!1)}};Up=Fu;$p=In;var a0={usingClientEntryPoint:!1,Events:[Fi,er,bo,Ip,Bp,Fu]},$r={findFiberByHostInstance:Pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},l0={bundleType:$r.bundleType,version:$r.version,rendererPackageName:$r.rendererPackageName,rendererConfig:$r.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Kp(e),e===null?null:e.stateNode},findFiberByHostInstance:$r.findFiberByHostInstance||s0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ds=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ds.isDisabled&&ds.supportsFiber)try{vo=ds.inject(l0),St=ds}catch{}}Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=a0;Ye.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wu(t))throw Error(N(200));return i0(e,t,null,n)};Ye.createRoot=function(e,t){if(!Wu(e))throw Error(N(299));var n=!1,r="",i=km;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Uu(e,1,!1,null,null,n,!1,r,i),e[Ot]=t.current,xi(e.nodeType===8?e.parentNode:e),new Hu(t)};Ye.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=Kp(t),e=e===null?null:e.stateNode,e};Ye.flushSync=function(e){return In(e)};Ye.hydrate=function(e,t,n){if(!Lo(t))throw Error(N(200));return Ao(null,e,t,!0,n)};Ye.hydrateRoot=function(e,t,n){if(!Wu(e))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=km;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=jm(t,null,e,1,n??null,i,!1,s,o),e[Ot]=t.current,xi(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Ro(t)};Ye.render=function(e,t,n){if(!Lo(t))throw Error(N(200));return Ao(null,e,t,!1,n)};Ye.unmountComponentAtNode=function(e){if(!Lo(e))throw Error(N(40));return e._reactRootContainer?(In(function(){Ao(null,null,e,!1,function(){e._reactRootContainer=null,e[Ot]=null})}),!0):!1};Ye.unstable_batchedUpdates=Fu;Ye.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Lo(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return Ao(e,t,n,!1,r)};Ye.version="18.3.1-next-f1338f8080-20240426";function Cm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Cm)}catch(e){console.error(e)}}Cm(),Cp.exports=Ye;var u0=Cp.exports,_d=u0;Fa.createRoot=_d.createRoot,Fa.hydrateRoot=_d.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ti(){return Ti=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ti.apply(this,arguments)}var Qt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Qt||(Qt={}));const zd="popstate";function c0(e){e===void 0&&(e={});function t(r,i){let{pathname:s,search:o,hash:a}=r.location;return Ll("",{pathname:s,search:o,hash:a},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:so(i)}return f0(t,n,null,e)}function le(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ku(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function d0(){return Math.random().toString(36).substr(2,8)}function Fd(e,t){return{usr:e.state,key:e.key,idx:t}}function Ll(e,t,n,r){return n===void 0&&(n=null),Ti({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Lr(t):t,{state:n,key:t&&t.key||r||d0()})}function so(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Lr(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function f0(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,a=Qt.Pop,l=null,c=d();c==null&&(c=0,o.replaceState(Ti({},o.state,{idx:c}),""));function d(){return(o.state||{idx:null}).idx}function f(){a=Qt.Pop;let w=d(),x=w==null?null:w-c;c=w,l&&l({action:a,location:v.location,delta:x})}function p(w,x){a=Qt.Push;let h=Ll(v.location,w,x);c=d()+1;let g=Fd(h,c),b=v.createHref(h);try{o.pushState(g,"",b)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;i.location.assign(b)}s&&l&&l({action:a,location:v.location,delta:1})}function y(w,x){a=Qt.Replace;let h=Ll(v.location,w,x);c=d();let g=Fd(h,c),b=v.createHref(h);o.replaceState(g,"",b),s&&l&&l({action:a,location:v.location,delta:0})}function m(w){let x=i.location.origin!=="null"?i.location.origin:i.location.href,h=typeof w=="string"?w:so(w);return h=h.replace(/ $/,"%20"),le(x,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,x)}let v={get action(){return a},get location(){return e(i,o)},listen(w){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(zd,f),l=w,()=>{i.removeEventListener(zd,f),l=null}},createHref(w){return t(i,w)},createURL:m,encodeLocation(w){let x=m(w);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:p,replace:y,go(w){return o.go(w)}};return v}var Vd;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Vd||(Vd={}));function p0(e,t,n){return n===void 0&&(n="/"),h0(e,t,n)}function h0(e,t,n,r){let i=typeof t=="string"?Lr(t):t,s=qu(i.pathname||"/",n);if(s==null)return null;let o=Pm(e);m0(o);let a=null;for(let l=0;a==null&&l<o.length;++l){let c=N0(s);a=k0(o[l],c)}return a}function Pm(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,a)=>{let l={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};l.relativePath.startsWith("/")&&(le(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=on([r,l.relativePath]),d=n.concat(l);s.children&&s.children.length>0&&(le(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Pm(s.children,t,d,c)),!(s.path==null&&!s.index)&&t.push({path:c,score:b0(c,s.index),routesMeta:d})};return e.forEach((s,o)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))i(s,o);else for(let l of Nm(s.path))i(s,o,l)}),t}function Nm(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=Nm(r.join("/")),a=[];return a.push(...o.map(l=>l===""?s:[s,l].join("/"))),i&&a.push(...o),a.map(l=>e.startsWith("/")&&l===""?"/":l)}function m0(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:j0(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const g0=/^:[\w-]+$/,y0=3,v0=2,x0=1,w0=10,S0=-2,Id=e=>e==="*";function b0(e,t){let n=e.split("/"),r=n.length;return n.some(Id)&&(r+=S0),t&&(r+=v0),n.filter(i=>!Id(i)).reduce((i,s)=>i+(g0.test(s)?y0:s===""?x0:w0),r)}function j0(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function k0(e,t,n){let{routesMeta:r}=e,i={},s="/",o=[];for(let a=0;a<r.length;++a){let l=r[a],c=a===r.length-1,d=s==="/"?t:t.slice(s.length)||"/",f=C0({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),p=l.route;if(!f)return null;Object.assign(i,f.params),o.push({params:i,pathname:on([s,f.pathname]),pathnameBase:A0(on([s,f.pathnameBase])),route:p}),f.pathnameBase!=="/"&&(s=on([s,f.pathnameBase]))}return o}function C0(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=P0(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),a=i.slice(1);return{params:r.reduce((c,d,f)=>{let{paramName:p,isOptional:y}=d;if(p==="*"){let v=a[f]||"";o=s.slice(0,s.length-v.length).replace(/(.)\/+$/,"$1")}const m=a[f];return y&&!m?c[p]=void 0:c[p]=(m||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:e}}function P0(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Ku(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,l)=>(r.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function N0(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ku(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function qu(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const T0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,E0=e=>T0.test(e);function R0(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?Lr(e):e,s;if(n)if(E0(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Ku(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=Bd(n.substring(1),"/"):s=Bd(n,t)}else s=t;return{pathname:s,search:D0(r),hash:M0(i)}}function Bd(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function Sa(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function L0(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Gu(e,t){let n=L0(e);return t?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Yu(e,t,n,r){r===void 0&&(r=!1);let i;typeof e=="string"?i=Lr(e):(i=Ti({},e),le(!i.pathname||!i.pathname.includes("?"),Sa("?","pathname","search",i)),le(!i.pathname||!i.pathname.includes("#"),Sa("#","pathname","hash",i)),le(!i.search||!i.search.includes("#"),Sa("#","search","hash",i)));let s=e===""||i.pathname==="",o=s?"/":i.pathname,a;if(o==null)a=n;else{let f=t.length-1;if(!r&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),f-=1;i.pathname=p.join("/")}a=f>=0?t[f]:"/"}let l=R0(i,a),c=o&&o!=="/"&&o.endsWith("/"),d=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}const on=e=>e.join("/").replace(/\/\/+/g,"/"),A0=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),D0=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,M0=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function O0(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Tm=["post","put","patch","delete"];new Set(Tm);const _0=["get",...Tm];new Set(_0);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ei(){return Ei=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ei.apply(this,arguments)}const Qu=S.createContext(null),z0=S.createContext(null),mn=S.createContext(null),Do=S.createContext(null),kt=S.createContext({outlet:null,matches:[],isDataRoute:!1}),Em=S.createContext(null);function F0(e,t){let{relative:n}=t===void 0?{}:t;Ar()||le(!1);let{basename:r,navigator:i}=S.useContext(mn),{hash:s,pathname:o,search:a}=Am(e,{relative:n}),l=o;return r!=="/"&&(l=o==="/"?r:on([r,o])),i.createHref({pathname:l,search:a,hash:s})}function Ar(){return S.useContext(Do)!=null}function It(){return Ar()||le(!1),S.useContext(Do).location}function Rm(e){S.useContext(mn).static||S.useLayoutEffect(e)}function Wn(){let{isDataRoute:e}=S.useContext(kt);return e?Z0():V0()}function V0(){Ar()||le(!1);let e=S.useContext(Qu),{basename:t,future:n,navigator:r}=S.useContext(mn),{matches:i}=S.useContext(kt),{pathname:s}=It(),o=JSON.stringify(Gu(i,n.v7_relativeSplatPath)),a=S.useRef(!1);return Rm(()=>{a.current=!0}),S.useCallback(function(c,d){if(d===void 0&&(d={}),!a.current)return;if(typeof c=="number"){r.go(c);return}let f=Yu(c,JSON.parse(o),s,d.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:on([t,f.pathname])),(d.replace?r.replace:r.push)(f,d.state,d)},[t,r,o,s,e])}const I0=S.createContext(null);function B0(e){let t=S.useContext(kt).outlet;return t&&S.createElement(I0.Provider,{value:e},t)}function Lm(){let{matches:e}=S.useContext(kt),t=e[e.length-1];return t?t.params:{}}function Am(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=S.useContext(mn),{matches:i}=S.useContext(kt),{pathname:s}=It(),o=JSON.stringify(Gu(i,r.v7_relativeSplatPath));return S.useMemo(()=>Yu(e,JSON.parse(o),s,n==="path"),[e,o,s,n])}function U0(e,t){return $0(e,t)}function $0(e,t,n,r){Ar()||le(!1);let{navigator:i}=S.useContext(mn),{matches:s}=S.useContext(kt),o=s[s.length-1],a=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let c=It(),d;if(t){var f;let w=typeof t=="string"?Lr(t):t;l==="/"||(f=w.pathname)!=null&&f.startsWith(l)||le(!1),d=w}else d=c;let p=d.pathname||"/",y=p;if(l!=="/"){let w=l.replace(/^\//,"").split("/");y="/"+p.replace(/^\//,"").split("/").slice(w.length).join("/")}let m=p0(e,{pathname:y}),v=G0(m&&m.map(w=>Object.assign({},w,{params:Object.assign({},a,w.params),pathname:on([l,i.encodeLocation?i.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?l:on([l,i.encodeLocation?i.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),s,n,r);return t&&v?S.createElement(Do.Provider,{value:{location:Ei({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:Qt.Pop}},v):v}function H0(){let e=J0(),t=O0(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return S.createElement(S.Fragment,null,S.createElement("h2",null,"Unexpected Application Error!"),S.createElement("h3",{style:{fontStyle:"italic"}},t),n?S.createElement("pre",{style:i},n):null,null)}const W0=S.createElement(H0,null);class K0 extends S.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?S.createElement(kt.Provider,{value:this.props.routeContext},S.createElement(Em.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function q0(e){let{routeContext:t,match:n,children:r}=e,i=S.useContext(Qu);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),S.createElement(kt.Provider,{value:t},r)}function G0(e,t,n,r){var i;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var s;if(!n)return null;if(n.errors)e=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,a=(i=n)==null?void 0:i.errors;if(a!=null){let d=o.findIndex(f=>f.route.id&&(a==null?void 0:a[f.route.id])!==void 0);d>=0||le(!1),o=o.slice(0,Math.min(o.length,d+1))}let l=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<o.length;d++){let f=o[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=d),f.route.id){let{loaderData:p,errors:y}=n,m=f.route.loader&&p[f.route.id]===void 0&&(!y||y[f.route.id]===void 0);if(f.route.lazy||m){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((d,f,p)=>{let y,m=!1,v=null,w=null;n&&(y=a&&f.route.id?a[f.route.id]:void 0,v=f.route.errorElement||W0,l&&(c<0&&p===0?(e1("route-fallback"),m=!0,w=null):c===p&&(m=!0,w=f.route.hydrateFallbackElement||null)));let x=t.concat(o.slice(0,p+1)),h=()=>{let g;return y?g=v:m?g=w:f.route.Component?g=S.createElement(f.route.Component,null):f.route.element?g=f.route.element:g=d,S.createElement(q0,{match:f,routeContext:{outlet:d,matches:x,isDataRoute:n!=null},children:g})};return n&&(f.route.ErrorBoundary||f.route.errorElement||p===0)?S.createElement(K0,{location:n.location,revalidation:n.revalidation,component:v,error:y,children:h(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):h()},null)}var Dm=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Dm||{}),Mm=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Mm||{});function Y0(e){let t=S.useContext(Qu);return t||le(!1),t}function Q0(e){let t=S.useContext(z0);return t||le(!1),t}function X0(e){let t=S.useContext(kt);return t||le(!1),t}function Om(e){let t=X0(),n=t.matches[t.matches.length-1];return n.route.id||le(!1),n.route.id}function J0(){var e;let t=S.useContext(Em),n=Q0(),r=Om();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Z0(){let{router:e}=Y0(Dm.UseNavigateStable),t=Om(Mm.UseNavigateStable),n=S.useRef(!1);return Rm(()=>{n.current=!0}),S.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,Ei({fromRouteId:t},s)))},[e,t])}const Ud={};function e1(e,t,n){Ud[e]||(Ud[e]=!0)}function t1(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function n1(e){let{to:t,replace:n,state:r,relative:i}=e;Ar()||le(!1);let{future:s,static:o}=S.useContext(mn),{matches:a}=S.useContext(kt),{pathname:l}=It(),c=Wn(),d=Yu(t,Gu(a,s.v7_relativeSplatPath),l,i==="path"),f=JSON.stringify(d);return S.useEffect(()=>c(JSON.parse(f),{replace:n,state:r,relative:i}),[c,f,i,n,r]),null}function r1(e){return B0(e.context)}function $e(e){le(!1)}function i1(e){let{basename:t="/",children:n=null,location:r,navigationType:i=Qt.Pop,navigator:s,static:o=!1,future:a}=e;Ar()&&le(!1);let l=t.replace(/^\/*/,"/"),c=S.useMemo(()=>({basename:l,navigator:s,static:o,future:Ei({v7_relativeSplatPath:!1},a)}),[l,a,s,o]);typeof r=="string"&&(r=Lr(r));let{pathname:d="/",search:f="",hash:p="",state:y=null,key:m="default"}=r,v=S.useMemo(()=>{let w=qu(d,l);return w==null?null:{location:{pathname:w,search:f,hash:p,state:y,key:m},navigationType:i}},[l,d,f,p,y,m,i]);return v==null?null:S.createElement(mn.Provider,{value:c},S.createElement(Do.Provider,{children:n,value:v}))}function s1(e){let{children:t,location:n}=e;return U0(Al(t),n)}new Promise(()=>{});function Al(e,t){t===void 0&&(t=[]);let n=[];return S.Children.forEach(e,(r,i)=>{if(!S.isValidElement(r))return;let s=[...t,i];if(r.type===S.Fragment){n.push.apply(n,Al(r.props.children,s));return}r.type!==$e&&le(!1),!r.props.index||!r.props.children||le(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Al(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Dl(){return Dl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Dl.apply(this,arguments)}function o1(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,s;for(s=0;s<r.length;s++)i=r[s],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function a1(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function l1(e,t){return e.button===0&&(!t||t==="_self")&&!a1(e)}function Ml(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(i=>[n,i]):[[n,r]])},[]))}function u1(e,t){let n=Ml(e);return t&&t.forEach((r,i)=>{n.has(i)||t.getAll(i).forEach(s=>{n.append(i,s)})}),n}const c1=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],d1="6";try{window.__reactRouterVersion=d1}catch{}const f1="startTransition",$d=Jy[f1];function p1(e){let{basename:t,children:n,future:r,window:i}=e,s=S.useRef();s.current==null&&(s.current=c0({window:i,v5Compat:!0}));let o=s.current,[a,l]=S.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},d=S.useCallback(f=>{c&&$d?$d(()=>l(f)):l(f)},[l,c]);return S.useLayoutEffect(()=>o.listen(d),[o,d]),S.useEffect(()=>t1(r),[r]),S.createElement(i1,{basename:t,children:n,location:a.location,navigationType:a.action,navigator:o,future:r})}const h1=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",m1=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,V=S.forwardRef(function(t,n){let{onClick:r,relative:i,reloadDocument:s,replace:o,state:a,target:l,to:c,preventScrollReset:d,viewTransition:f}=t,p=o1(t,c1),{basename:y}=S.useContext(mn),m,v=!1;if(typeof c=="string"&&m1.test(c)&&(m=c,h1))try{let g=new URL(window.location.href),b=c.startsWith("//")?new URL(g.protocol+c):new URL(c),k=qu(b.pathname,y);b.origin===g.origin&&k!=null?c=k+b.search+b.hash:v=!0}catch{}let w=F0(c,{relative:i}),x=g1(c,{replace:o,state:a,target:l,preventScrollReset:d,relative:i,viewTransition:f});function h(g){r&&r(g),g.defaultPrevented||x(g)}return S.createElement("a",Dl({},p,{href:m||w,onClick:v||s?r:h,ref:n,target:l}))});var Hd;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Hd||(Hd={}));var Wd;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Wd||(Wd={}));function g1(e,t){let{target:n,replace:r,state:i,preventScrollReset:s,relative:o,viewTransition:a}=t===void 0?{}:t,l=Wn(),c=It(),d=Am(e,{relative:o});return S.useCallback(f=>{if(l1(f,n)){f.preventDefault();let p=r!==void 0?r:so(c)===so(d);l(e,{replace:p,state:i,preventScrollReset:s,relative:o,viewTransition:a})}},[c,l,d,r,i,n,e,s,o,a])}function y1(e){let t=S.useRef(Ml(e)),n=S.useRef(!1),r=It(),i=S.useMemo(()=>u1(r.search,n.current?null:t.current),[r.search]),s=Wn(),o=S.useCallback((a,l)=>{const c=Ml(typeof a=="function"?a(i):a);n.current=!0,s("?"+c,l)},[s,i]);return[i,o]}const _m=S.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),Mo=S.createContext({}),Oo=S.createContext(null),_o=typeof document<"u",Xu=_o?S.useLayoutEffect:S.useEffect,zm=S.createContext({strict:!1}),Ju=e=>e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),v1="framerAppearId",Fm="data-"+Ju(v1);function x1(e,t,n,r){const{visualElement:i}=S.useContext(Mo),s=S.useContext(zm),o=S.useContext(Oo),a=S.useContext(_m).reducedMotion,l=S.useRef();r=r||s.renderer,!l.current&&r&&(l.current=r(e,{visualState:t,parent:i,props:n,presenceContext:o,blockInitialAnimation:o?o.initial===!1:!1,reducedMotionConfig:a}));const c=l.current;S.useInsertionEffect(()=>{c&&c.update(n,o)});const d=S.useRef(!!(n[Fm]&&!window.HandoffComplete));return Xu(()=>{c&&(c.render(),d.current&&c.animationState&&c.animationState.animateChanges())}),S.useEffect(()=>{c&&(c.updateFeatures(),!d.current&&c.animationState&&c.animationState.animateChanges(),d.current&&(d.current=!1,window.HandoffComplete=!0))}),c}function ar(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function w1(e,t,n){return S.useCallback(r=>{r&&e.mount&&e.mount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):ar(n)&&(n.current=r))},[t])}function Ri(e){return typeof e=="string"||Array.isArray(e)}function zo(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}const Zu=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],ec=["initial",...Zu];function Fo(e){return zo(e.animate)||ec.some(t=>Ri(e[t]))}function Vm(e){return!!(Fo(e)||e.variants)}function S1(e,t){if(Fo(e)){const{initial:n,animate:r}=e;return{initial:n===!1||Ri(n)?n:void 0,animate:Ri(r)?r:void 0}}return e.inherit!==!1?t:{}}function b1(e){const{initial:t,animate:n}=S1(e,S.useContext(Mo));return S.useMemo(()=>({initial:t,animate:n}),[Kd(t),Kd(n)])}function Kd(e){return Array.isArray(e)?e.join(" "):e}const qd={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Li={};for(const e in qd)Li[e]={isEnabled:t=>qd[e].some(n=>!!t[n])};function j1(e){for(const t in e)Li[t]={...Li[t],...e[t]}}const tc=S.createContext({}),Im=S.createContext({}),k1=Symbol.for("motionComponentSymbol");function C1({preloadedFeatures:e,createVisualElement:t,useRender:n,useVisualState:r,Component:i}){e&&j1(e);function s(a,l){let c;const d={...S.useContext(_m),...a,layoutId:P1(a)},{isStatic:f}=d,p=b1(a),y=r(a,f);if(!f&&_o){p.visualElement=x1(i,y,d,t);const m=S.useContext(Im),v=S.useContext(zm).strict;p.visualElement&&(c=p.visualElement.loadFeatures(d,v,e,m))}return S.createElement(Mo.Provider,{value:p},c&&p.visualElement?S.createElement(c,{visualElement:p.visualElement,...d}):null,n(i,a,w1(y,p.visualElement,l),y,f,p.visualElement))}const o=S.forwardRef(s);return o[k1]=i,o}function P1({layoutId:e}){const t=S.useContext(tc).id;return t&&e!==void 0?t+"-"+e:e}function N1(e){function t(r,i={}){return C1(e(r,i))}if(typeof Proxy>"u")return t;const n=new Map;return new Proxy(t,{get:(r,i)=>(n.has(i)||n.set(i,t(i)),n.get(i))})}const T1=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function nc(e){return typeof e!="string"||e.includes("-")?!1:!!(T1.indexOf(e)>-1||/[A-Z]/.test(e))}const oo={};function E1(e){Object.assign(oo,e)}const Ii=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Kn=new Set(Ii);function Bm(e,{layout:t,layoutId:n}){return Kn.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!oo[e]||e==="opacity")}const Be=e=>!!(e&&e.getVelocity),R1={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},L1=Ii.length;function A1(e,{enableHardwareAcceleration:t=!0,allowTransformNone:n=!0},r,i){let s="";for(let o=0;o<L1;o++){const a=Ii[o];if(e[a]!==void 0){const l=R1[a]||a;s+=`${l}(${e[a]}) `}}return t&&!e.z&&(s+="translateZ(0)"),s=s.trim(),i?s=i(e,r?"":s):n&&r&&(s="none"),s}const Um=e=>t=>typeof t=="string"&&t.startsWith(e),$m=Um("--"),Ol=Um("var(--"),D1=/var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,M1=(e,t)=>t&&typeof e=="number"?t.transform(e):e,cn=(e,t,n)=>Math.min(Math.max(n,e),t),qn={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},ai={...qn,transform:e=>cn(0,1,e)},fs={...qn,default:1},li=e=>Math.round(e*1e5)/1e5,Vo=/(-)?([\d]*\.?[\d])+/g,Hm=/(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,O1=/^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;function Bi(e){return typeof e=="string"}const Ui=e=>({test:t=>Bi(t)&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),Ut=Ui("deg"),jt=Ui("%"),_=Ui("px"),_1=Ui("vh"),z1=Ui("vw"),Gd={...jt,parse:e=>jt.parse(e)/100,transform:e=>jt.transform(e*100)},Yd={...qn,transform:Math.round},Wm={borderWidth:_,borderTopWidth:_,borderRightWidth:_,borderBottomWidth:_,borderLeftWidth:_,borderRadius:_,radius:_,borderTopLeftRadius:_,borderTopRightRadius:_,borderBottomRightRadius:_,borderBottomLeftRadius:_,width:_,maxWidth:_,height:_,maxHeight:_,size:_,top:_,right:_,bottom:_,left:_,padding:_,paddingTop:_,paddingRight:_,paddingBottom:_,paddingLeft:_,margin:_,marginTop:_,marginRight:_,marginBottom:_,marginLeft:_,rotate:Ut,rotateX:Ut,rotateY:Ut,rotateZ:Ut,scale:fs,scaleX:fs,scaleY:fs,scaleZ:fs,skew:Ut,skewX:Ut,skewY:Ut,distance:_,translateX:_,translateY:_,translateZ:_,x:_,y:_,z:_,perspective:_,transformPerspective:_,opacity:ai,originX:Gd,originY:Gd,originZ:_,zIndex:Yd,fillOpacity:ai,strokeOpacity:ai,numOctaves:Yd};function rc(e,t,n,r){const{style:i,vars:s,transform:o,transformOrigin:a}=e;let l=!1,c=!1,d=!0;for(const f in t){const p=t[f];if($m(f)){s[f]=p;continue}const y=Wm[f],m=M1(p,y);if(Kn.has(f)){if(l=!0,o[f]=m,!d)continue;p!==(y.default||0)&&(d=!1)}else f.startsWith("origin")?(c=!0,a[f]=m):i[f]=m}if(t.transform||(l||r?i.transform=A1(e.transform,n,d,r):i.transform&&(i.transform="none")),c){const{originX:f="50%",originY:p="50%",originZ:y=0}=a;i.transformOrigin=`${f} ${p} ${y}`}}const ic=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Km(e,t,n){for(const r in t)!Be(t[r])&&!Bm(r,n)&&(e[r]=t[r])}function F1({transformTemplate:e},t,n){return S.useMemo(()=>{const r=ic();return rc(r,t,{enableHardwareAcceleration:!n},e),Object.assign({},r.vars,r.style)},[t])}function V1(e,t,n){const r=e.style||{},i={};return Km(i,r,e),Object.assign(i,F1(e,t,n)),e.transformValues?e.transformValues(i):i}function I1(e,t,n){const r={},i=V1(e,t,n);return e.drag&&e.dragListener!==!1&&(r.draggable=!1,i.userSelect=i.WebkitUserSelect=i.WebkitTouchCallout="none",i.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(r.tabIndex=0),r.style=i,r}const B1=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","transformValues","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function ao(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||B1.has(e)}let qm=e=>!ao(e);function U1(e){e&&(qm=t=>t.startsWith("on")?!ao(t):e(t))}try{U1(require("@emotion/is-prop-valid").default)}catch{}function $1(e,t,n){const r={};for(const i in e)i==="values"&&typeof e.values=="object"||(qm(i)||n===!0&&ao(i)||!t&&!ao(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}function Qd(e,t,n){return typeof e=="string"?e:_.transform(t+n*e)}function H1(e,t,n){const r=Qd(t,e.x,e.width),i=Qd(n,e.y,e.height);return`${r} ${i}`}const W1={offset:"stroke-dashoffset",array:"stroke-dasharray"},K1={offset:"strokeDashoffset",array:"strokeDasharray"};function q1(e,t,n=1,r=0,i=!0){e.pathLength=1;const s=i?W1:K1;e[s.offset]=_.transform(-r);const o=_.transform(t),a=_.transform(n);e[s.array]=`${o} ${a}`}function sc(e,{attrX:t,attrY:n,attrScale:r,originX:i,originY:s,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},d,f,p){if(rc(e,c,d,p),f){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:y,style:m,dimensions:v}=e;y.transform&&(v&&(m.transform=y.transform),delete y.transform),v&&(i!==void 0||s!==void 0||m.transform)&&(m.transformOrigin=H1(v,i!==void 0?i:.5,s!==void 0?s:.5)),t!==void 0&&(y.x=t),n!==void 0&&(y.y=n),r!==void 0&&(y.scale=r),o!==void 0&&q1(y,o,a,l,!1)}const Gm=()=>({...ic(),attrs:{}}),oc=e=>typeof e=="string"&&e.toLowerCase()==="svg";function G1(e,t,n,r){const i=S.useMemo(()=>{const s=Gm();return sc(s,t,{enableHardwareAcceleration:!1},oc(r),e.transformTemplate),{...s.attrs,style:{...s.style}}},[t]);if(e.style){const s={};Km(s,e.style,e),i.style={...s,...i.style}}return i}function Y1(e=!1){return(n,r,i,{latestValues:s},o)=>{const l=(nc(n)?G1:I1)(r,s,o,n),d={...$1(r,typeof n=="string",e),...l,ref:i},{children:f}=r,p=S.useMemo(()=>Be(f)?f.get():f,[f]);return S.createElement(n,{...d,children:p})}}function Ym(e,{style:t,vars:n},r,i){Object.assign(e.style,t,i&&i.getProjectionStyles(r));for(const s in n)e.style.setProperty(s,n[s])}const Qm=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function Xm(e,t,n,r){Ym(e,t,void 0,r);for(const i in t.attrs)e.setAttribute(Qm.has(i)?i:Ju(i),t.attrs[i])}function ac(e,t){const{style:n}=e,r={};for(const i in n)(Be(n[i])||t.style&&Be(t.style[i])||Bm(i,e))&&(r[i]=n[i]);return r}function Jm(e,t){const n=ac(e,t);for(const r in e)if(Be(e[r])||Be(t[r])){const i=Ii.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;n[i]=e[r]}return n}function lc(e,t,n,r={},i={}){return typeof t=="function"&&(t=t(n!==void 0?n:e.custom,r,i)),typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"&&(t=t(n!==void 0?n:e.custom,r,i)),t}function Zm(e){const t=S.useRef(null);return t.current===null&&(t.current=e()),t.current}const lo=e=>Array.isArray(e),Q1=e=>!!(e&&typeof e=="object"&&e.mix&&e.toValue),X1=e=>lo(e)?e[e.length-1]||0:e;function Rs(e){const t=Be(e)?e.get():e;return Q1(t)?t.toValue():t}function J1({scrapeMotionValuesFromProps:e,createRenderState:t,onMount:n},r,i,s){const o={latestValues:Z1(r,i,s,e),renderState:t()};return n&&(o.mount=a=>n(r,a,o)),o}const eg=e=>(t,n)=>{const r=S.useContext(Mo),i=S.useContext(Oo),s=()=>J1(e,t,r,i);return n?s():Zm(s)};function Z1(e,t,n,r){const i={},s=r(e,{});for(const p in s)i[p]=Rs(s[p]);let{initial:o,animate:a}=e;const l=Fo(e),c=Vm(e);t&&c&&!l&&e.inherit!==!1&&(o===void 0&&(o=t.initial),a===void 0&&(a=t.animate));let d=n?n.initial===!1:!1;d=d||o===!1;const f=d?a:o;return f&&typeof f!="boolean"&&!zo(f)&&(Array.isArray(f)?f:[f]).forEach(y=>{const m=lc(e,y);if(!m)return;const{transitionEnd:v,transition:w,...x}=m;for(const h in x){let g=x[h];if(Array.isArray(g)){const b=d?g.length-1:0;g=g[b]}g!==null&&(i[h]=g)}for(const h in v)i[h]=v[h]}),i}const ae=e=>e;class Xd{constructor(){this.order=[],this.scheduled=new Set}add(t){if(!this.scheduled.has(t))return this.scheduled.add(t),this.order.push(t),!0}remove(t){const n=this.order.indexOf(t);n!==-1&&(this.order.splice(n,1),this.scheduled.delete(t))}clear(){this.order.length=0,this.scheduled.clear()}}function ew(e){let t=new Xd,n=new Xd,r=0,i=!1,s=!1;const o=new WeakSet,a={schedule:(l,c=!1,d=!1)=>{const f=d&&i,p=f?t:n;return c&&o.add(l),p.add(l)&&f&&i&&(r=t.order.length),l},cancel:l=>{n.remove(l),o.delete(l)},process:l=>{if(i){s=!0;return}if(i=!0,[t,n]=[n,t],n.clear(),r=t.order.length,r)for(let c=0;c<r;c++){const d=t.order[c];d(l),o.has(d)&&(a.schedule(d),e())}i=!1,s&&(s=!1,a.process(l))}};return a}const ps=["prepare","read","update","preRender","render","postRender"],tw=40;function nw(e,t){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},s=ps.reduce((f,p)=>(f[p]=ew(()=>n=!0),f),{}),o=f=>s[f].process(i),a=()=>{const f=performance.now();n=!1,i.delta=r?1e3/60:Math.max(Math.min(f-i.timestamp,tw),1),i.timestamp=f,i.isProcessing=!0,ps.forEach(o),i.isProcessing=!1,n&&t&&(r=!1,e(a))},l=()=>{n=!0,r=!0,i.isProcessing||e(a)};return{schedule:ps.reduce((f,p)=>{const y=s[p];return f[p]=(m,v=!1,w=!1)=>(n||l(),y.schedule(m,v,w)),f},{}),cancel:f=>ps.forEach(p=>s[p].cancel(f)),state:i,steps:s}}const{schedule:G,cancel:Ft,state:Se,steps:ba}=nw(typeof requestAnimationFrame<"u"?requestAnimationFrame:ae,!0),rw={useVisualState:eg({scrapeMotionValuesFromProps:Jm,createRenderState:Gm,onMount:(e,t,{renderState:n,latestValues:r})=>{G.read(()=>{try{n.dimensions=typeof t.getBBox=="function"?t.getBBox():t.getBoundingClientRect()}catch{n.dimensions={x:0,y:0,width:0,height:0}}}),G.render(()=>{sc(n,r,{enableHardwareAcceleration:!1},oc(t.tagName),e.transformTemplate),Xm(t,n)})}})},iw={useVisualState:eg({scrapeMotionValuesFromProps:ac,createRenderState:ic})};function sw(e,{forwardMotionProps:t=!1},n,r){return{...nc(e)?rw:iw,preloadedFeatures:n,useRender:Y1(t),createVisualElement:r,Component:e}}function Rt(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}const tg=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1;function Io(e,t="page"){return{point:{x:e[t+"X"],y:e[t+"Y"]}}}const ow=e=>t=>tg(t)&&e(t,Io(t));function At(e,t,n,r){return Rt(e,t,ow(n),r)}const aw=(e,t)=>n=>t(e(n)),an=(...e)=>e.reduce(aw);function ng(e){let t=null;return()=>{const n=()=>{t=null};return t===null?(t=e,n):!1}}const Jd=ng("dragHorizontal"),Zd=ng("dragVertical");function rg(e){let t=!1;if(e==="y")t=Zd();else if(e==="x")t=Jd();else{const n=Jd(),r=Zd();n&&r?t=()=>{n(),r()}:(n&&n(),r&&r())}return t}function ig(){const e=rg(!0);return e?(e(),!1):!0}class gn{constructor(t){this.isMounted=!1,this.node=t}update(){}}function ef(e,t){const n="pointer"+(t?"enter":"leave"),r="onHover"+(t?"Start":"End"),i=(s,o)=>{if(s.pointerType==="touch"||ig())return;const a=e.getProps();e.animationState&&a.whileHover&&e.animationState.setActive("whileHover",t),a[r]&&G.update(()=>a[r](s,o))};return At(e.current,n,i,{passive:!e.getProps()[r]})}class lw extends gn{mount(){this.unmount=an(ef(this.node,!0),ef(this.node,!1))}unmount(){}}class uw extends gn{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=an(Rt(this.node.current,"focus",()=>this.onFocus()),Rt(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}const sg=(e,t)=>t?e===t?!0:sg(e,t.parentElement):!1;function ja(e,t){if(!t)return;const n=new PointerEvent("pointer"+e);t(n,Io(n))}class cw extends gn{constructor(){super(...arguments),this.removeStartListeners=ae,this.removeEndListeners=ae,this.removeAccessibleListeners=ae,this.startPointerPress=(t,n)=>{if(this.isPressing)return;this.removeEndListeners();const r=this.node.getProps(),s=At(window,"pointerup",(a,l)=>{if(!this.checkPressEnd())return;const{onTap:c,onTapCancel:d,globalTapTarget:f}=this.node.getProps();G.update(()=>{!f&&!sg(this.node.current,a.target)?d&&d(a,l):c&&c(a,l)})},{passive:!(r.onTap||r.onPointerUp)}),o=At(window,"pointercancel",(a,l)=>this.cancelPress(a,l),{passive:!(r.onTapCancel||r.onPointerCancel)});this.removeEndListeners=an(s,o),this.startPress(t,n)},this.startAccessiblePress=()=>{const t=s=>{if(s.key!=="Enter"||this.isPressing)return;const o=a=>{a.key!=="Enter"||!this.checkPressEnd()||ja("up",(l,c)=>{const{onTap:d}=this.node.getProps();d&&G.update(()=>d(l,c))})};this.removeEndListeners(),this.removeEndListeners=Rt(this.node.current,"keyup",o),ja("down",(a,l)=>{this.startPress(a,l)})},n=Rt(this.node.current,"keydown",t),r=()=>{this.isPressing&&ja("cancel",(s,o)=>this.cancelPress(s,o))},i=Rt(this.node.current,"blur",r);this.removeAccessibleListeners=an(n,i)}}startPress(t,n){this.isPressing=!0;const{onTapStart:r,whileTap:i}=this.node.getProps();i&&this.node.animationState&&this.node.animationState.setActive("whileTap",!0),r&&G.update(()=>r(t,n))}checkPressEnd(){return this.removeEndListeners(),this.isPressing=!1,this.node.getProps().whileTap&&this.node.animationState&&this.node.animationState.setActive("whileTap",!1),!ig()}cancelPress(t,n){if(!this.checkPressEnd())return;const{onTapCancel:r}=this.node.getProps();r&&G.update(()=>r(t,n))}mount(){const t=this.node.getProps(),n=At(t.globalTapTarget?window:this.node.current,"pointerdown",this.startPointerPress,{passive:!(t.onTapStart||t.onPointerStart)}),r=Rt(this.node.current,"focus",this.startAccessiblePress);this.removeStartListeners=an(n,r)}unmount(){this.removeStartListeners(),this.removeEndListeners(),this.removeAccessibleListeners()}}const _l=new WeakMap,ka=new WeakMap,dw=e=>{const t=_l.get(e.target);t&&t(e)},fw=e=>{e.forEach(dw)};function pw({root:e,...t}){const n=e||document;ka.has(n)||ka.set(n,{});const r=ka.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(fw,{root:e,...t})),r[i]}function hw(e,t,n){const r=pw(t);return _l.set(e,n),r.observe(e),()=>{_l.delete(e),r.unobserve(e)}}const mw={some:0,all:1};class gw extends gn{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:i="some",once:s}=t,o={root:n?n.current:void 0,rootMargin:r,threshold:typeof i=="number"?i:mw[i]},a=l=>{const{isIntersecting:c}=l;if(this.isInView===c||(this.isInView=c,s&&!c&&this.hasEnteredView))return;c&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",c);const{onViewportEnter:d,onViewportLeave:f}=this.node.getProps(),p=c?d:f;p&&p(l)};return hw(this.node.current,o,a)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(yw(t,n))&&this.startObserver()}unmount(){}}function yw({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const vw={inView:{Feature:gw},tap:{Feature:cw},focus:{Feature:uw},hover:{Feature:lw}};function og(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function xw(e){const t={};return e.values.forEach((n,r)=>t[r]=n.get()),t}function ww(e){const t={};return e.values.forEach((n,r)=>t[r]=n.getVelocity()),t}function Bo(e,t,n){const r=e.getProps();return lc(r,t,n!==void 0?n:r.custom,xw(e),ww(e))}let uc=ae;const Mn=e=>e*1e3,Dt=e=>e/1e3,Sw={current:!1},ag=e=>Array.isArray(e)&&typeof e[0]=="number";function lg(e){return!!(!e||typeof e=="string"&&ug[e]||ag(e)||Array.isArray(e)&&e.every(lg))}const Xr=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,ug={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Xr([0,.65,.55,1]),circOut:Xr([.55,0,1,.45]),backIn:Xr([.31,.01,.66,-.59]),backOut:Xr([.33,1.53,.69,.99])};function cg(e){if(e)return ag(e)?Xr(e):Array.isArray(e)?e.map(cg):ug[e]}function bw(e,t,n,{delay:r=0,duration:i,repeat:s=0,repeatType:o="loop",ease:a,times:l}={}){const c={[t]:n};l&&(c.offset=l);const d=cg(a);return Array.isArray(d)&&(c.easing=d),e.animate(c,{delay:r,duration:i,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:s+1,direction:o==="reverse"?"alternate":"normal"})}function jw(e,{repeat:t,repeatType:n="loop"}){const r=t&&n!=="loop"&&t%2===1?0:e.length-1;return e[r]}const dg=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,kw=1e-7,Cw=12;function Pw(e,t,n,r,i){let s,o,a=0;do o=t+(n-t)/2,s=dg(o,r,i)-e,s>0?n=o:t=o;while(Math.abs(s)>kw&&++a<Cw);return o}function $i(e,t,n,r){if(e===t&&n===r)return ae;const i=s=>Pw(s,0,1,e,n);return s=>s===0||s===1?s:dg(i(s),t,r)}const Nw=$i(.42,0,1,1),Tw=$i(0,0,.58,1),fg=$i(.42,0,.58,1),Ew=e=>Array.isArray(e)&&typeof e[0]!="number",pg=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,hg=e=>t=>1-e(1-t),cc=e=>1-Math.sin(Math.acos(e)),mg=hg(cc),Rw=pg(cc),gg=$i(.33,1.53,.69,.99),dc=hg(gg),Lw=pg(dc),Aw=e=>(e*=2)<1?.5*dc(e):.5*(2-Math.pow(2,-10*(e-1))),Dw={linear:ae,easeIn:Nw,easeInOut:fg,easeOut:Tw,circIn:cc,circInOut:Rw,circOut:mg,backIn:dc,backInOut:Lw,backOut:gg,anticipate:Aw},tf=e=>{if(Array.isArray(e)){uc(e.length===4);const[t,n,r,i]=e;return $i(t,n,r,i)}else if(typeof e=="string")return Dw[e];return e},fc=(e,t)=>n=>!!(Bi(n)&&O1.test(n)&&n.startsWith(e)||t&&Object.prototype.hasOwnProperty.call(n,t)),yg=(e,t,n)=>r=>{if(!Bi(r))return r;const[i,s,o,a]=r.match(Vo);return{[e]:parseFloat(i),[t]:parseFloat(s),[n]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}},Mw=e=>cn(0,255,e),Ca={...qn,transform:e=>Math.round(Mw(e))},En={test:fc("rgb","red"),parse:yg("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+Ca.transform(e)+", "+Ca.transform(t)+", "+Ca.transform(n)+", "+li(ai.transform(r))+")"};function Ow(e){let t="",n="",r="",i="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}const zl={test:fc("#"),parse:Ow,transform:En.transform},lr={test:fc("hsl","hue"),parse:yg("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+jt.transform(li(t))+", "+jt.transform(li(n))+", "+li(ai.transform(r))+")"},Ee={test:e=>En.test(e)||zl.test(e)||lr.test(e),parse:e=>En.test(e)?En.parse(e):lr.test(e)?lr.parse(e):zl.parse(e),transform:e=>Bi(e)?e:e.hasOwnProperty("red")?En.transform(e):lr.transform(e)},Z=(e,t,n)=>-n*e+n*t+e;function Pa(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function _w({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,s=0,o=0;if(!t)i=s=o=n;else{const a=n<.5?n*(1+t):n+t-n*t,l=2*n-a;i=Pa(l,a,e+1/3),s=Pa(l,a,e),o=Pa(l,a,e-1/3)}return{red:Math.round(i*255),green:Math.round(s*255),blue:Math.round(o*255),alpha:r}}const Na=(e,t,n)=>{const r=e*e;return Math.sqrt(Math.max(0,n*(t*t-r)+r))},zw=[zl,En,lr],Fw=e=>zw.find(t=>t.test(e));function nf(e){const t=Fw(e);let n=t.parse(e);return t===lr&&(n=_w(n)),n}const vg=(e,t)=>{const n=nf(e),r=nf(t),i={...n};return s=>(i.red=Na(n.red,r.red,s),i.green=Na(n.green,r.green,s),i.blue=Na(n.blue,r.blue,s),i.alpha=Z(n.alpha,r.alpha,s),En.transform(i))};function Vw(e){var t,n;return isNaN(e)&&Bi(e)&&(((t=e.match(Vo))===null||t===void 0?void 0:t.length)||0)+(((n=e.match(Hm))===null||n===void 0?void 0:n.length)||0)>0}const xg={regex:D1,countKey:"Vars",token:"${v}",parse:ae},wg={regex:Hm,countKey:"Colors",token:"${c}",parse:Ee.parse},Sg={regex:Vo,countKey:"Numbers",token:"${n}",parse:qn.parse};function Ta(e,{regex:t,countKey:n,token:r,parse:i}){const s=e.tokenised.match(t);s&&(e["num"+n]=s.length,e.tokenised=e.tokenised.replace(t,r),e.values.push(...s.map(i)))}function uo(e){const t=e.toString(),n={value:t,tokenised:t,values:[],numVars:0,numColors:0,numNumbers:0};return n.value.includes("var(--")&&Ta(n,xg),Ta(n,wg),Ta(n,Sg),n}function bg(e){return uo(e).values}function jg(e){const{values:t,numColors:n,numVars:r,tokenised:i}=uo(e),s=t.length;return o=>{let a=i;for(let l=0;l<s;l++)l<r?a=a.replace(xg.token,o[l]):l<r+n?a=a.replace(wg.token,Ee.transform(o[l])):a=a.replace(Sg.token,li(o[l]));return a}}const Iw=e=>typeof e=="number"?0:e;function Bw(e){const t=bg(e);return jg(e)(t.map(Iw))}const dn={test:Vw,parse:bg,createTransformer:jg,getAnimatableNone:Bw},kg=(e,t)=>n=>`${n>0?t:e}`;function Cg(e,t){return typeof e=="number"?n=>Z(e,t,n):Ee.test(e)?vg(e,t):e.startsWith("var(")?kg(e,t):Ng(e,t)}const Pg=(e,t)=>{const n=[...e],r=n.length,i=e.map((s,o)=>Cg(s,t[o]));return s=>{for(let o=0;o<r;o++)n[o]=i[o](s);return n}},Uw=(e,t)=>{const n={...e,...t},r={};for(const i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Cg(e[i],t[i]));return i=>{for(const s in r)n[s]=r[s](i);return n}},Ng=(e,t)=>{const n=dn.createTransformer(t),r=uo(e),i=uo(t);return r.numVars===i.numVars&&r.numColors===i.numColors&&r.numNumbers>=i.numNumbers?an(Pg(r.values,i.values),n):kg(e,t)},Ai=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r},rf=(e,t)=>n=>Z(e,t,n);function $w(e){return typeof e=="number"?rf:typeof e=="string"?Ee.test(e)?vg:Ng:Array.isArray(e)?Pg:typeof e=="object"?Uw:rf}function Hw(e,t,n){const r=[],i=n||$w(e[0]),s=e.length-1;for(let o=0;o<s;o++){let a=i(e[o],e[o+1]);if(t){const l=Array.isArray(t)?t[o]||ae:t;a=an(l,a)}r.push(a)}return r}function Tg(e,t,{clamp:n=!0,ease:r,mixer:i}={}){const s=e.length;if(uc(s===t.length),s===1)return()=>t[0];e[0]>e[s-1]&&(e=[...e].reverse(),t=[...t].reverse());const o=Hw(t,r,i),a=o.length,l=c=>{let d=0;if(a>1)for(;d<e.length-2&&!(c<e[d+1]);d++);const f=Ai(e[d],e[d+1],c);return o[d](f)};return n?c=>l(cn(e[0],e[s-1],c)):l}function Ww(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const i=Ai(0,t,r);e.push(Z(n,1,i))}}function Kw(e){const t=[0];return Ww(t,e.length-1),t}function qw(e,t){return e.map(n=>n*t)}function Gw(e,t){return e.map(()=>t||fg).splice(0,e.length-1)}function co({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const i=Ew(r)?r.map(tf):tf(r),s={done:!1,value:t[0]},o=qw(n&&n.length===t.length?n:Kw(t),e),a=Tg(o,t,{ease:Array.isArray(i)?i:Gw(t,i)});return{calculatedDuration:e,next:l=>(s.value=a(l),s.done=l>=e,s)}}function Eg(e,t){return t?e*(1e3/t):0}const Yw=5;function Rg(e,t,n){const r=Math.max(t-Yw,0);return Eg(n-e(r),t-r)}const Ea=.001,Qw=.01,Xw=10,Jw=.05,Zw=1;function eS({duration:e=800,bounce:t=.25,velocity:n=0,mass:r=1}){let i,s,o=1-t;o=cn(Jw,Zw,o),e=cn(Qw,Xw,Dt(e)),o<1?(i=c=>{const d=c*o,f=d*e,p=d-n,y=Fl(c,o),m=Math.exp(-f);return Ea-p/y*m},s=c=>{const f=c*o*e,p=f*n+n,y=Math.pow(o,2)*Math.pow(c,2)*e,m=Math.exp(-f),v=Fl(Math.pow(c,2),o);return(-i(c)+Ea>0?-1:1)*((p-y)*m)/v}):(i=c=>{const d=Math.exp(-c*e),f=(c-n)*e+1;return-Ea+d*f},s=c=>{const d=Math.exp(-c*e),f=(n-c)*(e*e);return d*f});const a=5/e,l=nS(i,s,a);if(e=Mn(e),isNaN(l))return{stiffness:100,damping:10,duration:e};{const c=Math.pow(l,2)*r;return{stiffness:c,damping:o*2*Math.sqrt(r*c),duration:e}}}const tS=12;function nS(e,t,n){let r=n;for(let i=1;i<tS;i++)r=r-e(r)/t(r);return r}function Fl(e,t){return e*Math.sqrt(1-t*t)}const rS=["duration","bounce"],iS=["stiffness","damping","mass"];function sf(e,t){return t.some(n=>e[n]!==void 0)}function sS(e){let t={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...e};if(!sf(e,iS)&&sf(e,rS)){const n=eS(e);t={...t,...n,mass:1},t.isResolvedFromDuration=!0}return t}function Lg({keyframes:e,restDelta:t,restSpeed:n,...r}){const i=e[0],s=e[e.length-1],o={done:!1,value:i},{stiffness:a,damping:l,mass:c,duration:d,velocity:f,isResolvedFromDuration:p}=sS({...r,velocity:-Dt(r.velocity||0)}),y=f||0,m=l/(2*Math.sqrt(a*c)),v=s-i,w=Dt(Math.sqrt(a/c)),x=Math.abs(v)<5;n||(n=x?.01:2),t||(t=x?.005:.5);let h;if(m<1){const g=Fl(w,m);h=b=>{const k=Math.exp(-m*w*b);return s-k*((y+m*w*v)/g*Math.sin(g*b)+v*Math.cos(g*b))}}else if(m===1)h=g=>s-Math.exp(-w*g)*(v+(y+w*v)*g);else{const g=w*Math.sqrt(m*m-1);h=b=>{const k=Math.exp(-m*w*b),T=Math.min(g*b,300);return s-k*((y+m*w*v)*Math.sinh(T)+g*v*Math.cosh(T))/g}}return{calculatedDuration:p&&d||null,next:g=>{const b=h(g);if(p)o.done=g>=d;else{let k=y;g!==0&&(m<1?k=Rg(h,g,b):k=0);const T=Math.abs(k)<=n,C=Math.abs(s-b)<=t;o.done=T&&C}return o.value=o.done?s:b,o}}}function of({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:s=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:d}){const f=e[0],p={done:!1,value:f},y=P=>a!==void 0&&P<a||l!==void 0&&P>l,m=P=>a===void 0?l:l===void 0||Math.abs(a-P)<Math.abs(l-P)?a:l;let v=n*t;const w=f+v,x=o===void 0?w:o(w);x!==w&&(v=x-f);const h=P=>-v*Math.exp(-P/r),g=P=>x+h(P),b=P=>{const A=h(P),M=g(P);p.done=Math.abs(A)<=c,p.value=p.done?x:M};let k,T;const C=P=>{y(p.value)&&(k=P,T=Lg({keyframes:[p.value,m(p.value)],velocity:Rg(g,P,p.value),damping:i,stiffness:s,restDelta:c,restSpeed:d}))};return C(0),{calculatedDuration:null,next:P=>{let A=!1;return!T&&k===void 0&&(A=!0,b(P),C(P)),k!==void 0&&P>k?T.next(P-k):(!A&&b(P),p)}}}const oS=e=>{const t=({timestamp:n})=>e(n);return{start:()=>G.update(t,!0),stop:()=>Ft(t),now:()=>Se.isProcessing?Se.timestamp:performance.now()}},af=2e4;function lf(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<af;)t+=n,r=e.next(t);return t>=af?1/0:t}const aS={decay:of,inertia:of,tween:co,keyframes:co,spring:Lg};function fo({autoplay:e=!0,delay:t=0,driver:n=oS,keyframes:r,type:i="keyframes",repeat:s=0,repeatDelay:o=0,repeatType:a="loop",onPlay:l,onStop:c,onComplete:d,onUpdate:f,...p}){let y=1,m=!1,v,w;const x=()=>{w=new Promise(D=>{v=D})};x();let h;const g=aS[i]||co;let b;g!==co&&typeof r[0]!="number"&&(b=Tg([0,100],r,{clamp:!1}),r=[0,100]);const k=g({...p,keyframes:r});let T;a==="mirror"&&(T=g({...p,keyframes:[...r].reverse(),velocity:-(p.velocity||0)}));let C="idle",P=null,A=null,M=null;k.calculatedDuration===null&&s&&(k.calculatedDuration=lf(k));const{calculatedDuration:ie}=k;let ne=1/0,se=1/0;ie!==null&&(ne=ie+o,se=ne*(s+1)-o);let K=0;const ot=D=>{if(A===null)return;y>0&&(A=Math.min(A,D)),y<0&&(A=Math.min(D-se/y,A)),P!==null?K=P:K=Math.round(D-A)*y;const $=K-t*(y>=0?1:-1),at=y>=0?$<0:$>se;K=Math.max($,0),C==="finished"&&P===null&&(K=se);let Te=K,Ct=k;if(s){const Go=Math.min(K,se)/ne;let Gi=Math.floor(Go),xn=Go%1;!xn&&Go>=1&&(xn=1),xn===1&&Gi--,Gi=Math.min(Gi,s+1),!!(Gi%2)&&(a==="reverse"?(xn=1-xn,o&&(xn-=o/ne)):a==="mirror"&&(Ct=T)),Te=cn(0,1,xn)*ne}const Ue=at?{done:!1,value:r[0]}:Ct.next(Te);b&&(Ue.value=b(Ue.value));let{done:vn}=Ue;!at&&ie!==null&&(vn=y>=0?K>=se:K<=0);const My=P===null&&(C==="finished"||C==="running"&&vn);return f&&f(Ue.value),My&&E(),Ue},U=()=>{h&&h.stop(),h=void 0},Ne=()=>{C="idle",U(),v(),x(),A=M=null},E=()=>{C="finished",d&&d(),U(),v()},O=()=>{if(m)return;h||(h=n(ot));const D=h.now();l&&l(),P!==null?A=D-P:(!A||C==="finished")&&(A=D),C==="finished"&&x(),M=A,P=null,C="running",h.start()};e&&O();const z={then(D,$){return w.then(D,$)},get time(){return Dt(K)},set time(D){D=Mn(D),K=D,P!==null||!h||y===0?P=D:A=h.now()-D/y},get duration(){const D=k.calculatedDuration===null?lf(k):k.calculatedDuration;return Dt(D)},get speed(){return y},set speed(D){D===y||!h||(y=D,z.time=Dt(K))},get state(){return C},play:O,pause:()=>{C="paused",P=K},stop:()=>{m=!0,C!=="idle"&&(C="idle",c&&c(),Ne())},cancel:()=>{M!==null&&ot(M),Ne()},complete:()=>{C="finished"},sample:D=>(A=0,ot(D))};return z}function lS(e){let t;return()=>(t===void 0&&(t=e()),t)}const uS=lS(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),cS=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),hs=10,dS=2e4,fS=(e,t)=>t.type==="spring"||e==="backgroundColor"||!lg(t.ease);function pS(e,t,{onUpdate:n,onComplete:r,...i}){if(!(uS()&&cS.has(t)&&!i.repeatDelay&&i.repeatType!=="mirror"&&i.damping!==0&&i.type!=="inertia"))return!1;let o=!1,a,l,c=!1;const d=()=>{l=new Promise(g=>{a=g})};d();let{keyframes:f,duration:p=300,ease:y,times:m}=i;if(fS(t,i)){const g=fo({...i,repeat:0,delay:0});let b={done:!1,value:f[0]};const k=[];let T=0;for(;!b.done&&T<dS;)b=g.sample(T),k.push(b.value),T+=hs;m=void 0,f=k,p=T-hs,y="linear"}const v=bw(e.owner.current,t,f,{...i,duration:p,ease:y,times:m}),w=()=>{c=!1,v.cancel()},x=()=>{c=!0,G.update(w),a(),d()};return v.onfinish=()=>{c||(e.set(jw(f,i)),r&&r(),x())},{then(g,b){return l.then(g,b)},attachTimeline(g){return v.timeline=g,v.onfinish=null,ae},get time(){return Dt(v.currentTime||0)},set time(g){v.currentTime=Mn(g)},get speed(){return v.playbackRate},set speed(g){v.playbackRate=g},get duration(){return Dt(p)},play:()=>{o||(v.play(),Ft(w))},pause:()=>v.pause(),stop:()=>{if(o=!0,v.playState==="idle")return;const{currentTime:g}=v;if(g){const b=fo({...i,autoplay:!1});e.setWithVelocity(b.sample(g-hs).value,b.sample(g).value,hs)}x()},complete:()=>{c||v.finish()},cancel:x}}function hS({keyframes:e,delay:t,onUpdate:n,onComplete:r}){const i=()=>(n&&n(e[e.length-1]),r&&r(),{time:0,speed:1,duration:0,play:ae,pause:ae,stop:ae,then:s=>(s(),Promise.resolve()),cancel:ae,complete:ae});return t?fo({keyframes:[0,1],duration:0,delay:t,onComplete:i}):i()}const mS={type:"spring",stiffness:500,damping:25,restSpeed:10},gS=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),yS={type:"keyframes",duration:.8},vS={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},xS=(e,{keyframes:t})=>t.length>2?yS:Kn.has(e)?e.startsWith("scale")?gS(t[1]):mS:vS,Vl=(e,t)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(dn.test(t)||t==="0")&&!t.startsWith("url(")),wS=new Set(["brightness","contrast","saturate","opacity"]);function SS(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(Vo)||[];if(!r)return e;const i=n.replace(r,"");let s=wS.has(t)?1:0;return r!==n&&(s*=100),t+"("+s+i+")"}const bS=/([a-z-]*)\(.*?\)/g,Il={...dn,getAnimatableNone:e=>{const t=e.match(bS);return t?t.map(SS).join(" "):e}},jS={...Wm,color:Ee,backgroundColor:Ee,outlineColor:Ee,fill:Ee,stroke:Ee,borderColor:Ee,borderTopColor:Ee,borderRightColor:Ee,borderBottomColor:Ee,borderLeftColor:Ee,filter:Il,WebkitFilter:Il},pc=e=>jS[e];function Ag(e,t){let n=pc(e);return n!==Il&&(n=dn),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const Dg=e=>/^0[^.\s]+$/.test(e);function kS(e){if(typeof e=="number")return e===0;if(e!==null)return e==="none"||e==="0"||Dg(e)}function CS(e,t,n,r){const i=Vl(t,n);let s;Array.isArray(n)?s=[...n]:s=[null,n];const o=r.from!==void 0?r.from:e.get();let a;const l=[];for(let c=0;c<s.length;c++)s[c]===null&&(s[c]=c===0?o:s[c-1]),kS(s[c])&&l.push(c),typeof s[c]=="string"&&s[c]!=="none"&&s[c]!=="0"&&(a=s[c]);if(i&&l.length&&a)for(let c=0;c<l.length;c++){const d=l[c];s[d]=Ag(t,a)}return s}function PS({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:i,repeat:s,repeatType:o,repeatDelay:a,from:l,elapsed:c,...d}){return!!Object.keys(d).length}function hc(e,t){return e[t]||e.default||e}const NS={skipAnimations:!1},mc=(e,t,n,r={})=>i=>{const s=hc(r,e)||{},o=s.delay||r.delay||0;let{elapsed:a=0}=r;a=a-Mn(o);const l=CS(t,e,n,s),c=l[0],d=l[l.length-1],f=Vl(e,c),p=Vl(e,d);let y={keyframes:l,velocity:t.getVelocity(),ease:"easeOut",...s,delay:-a,onUpdate:m=>{t.set(m),s.onUpdate&&s.onUpdate(m)},onComplete:()=>{i(),s.onComplete&&s.onComplete()}};if(PS(s)||(y={...y,...xS(e,y)}),y.duration&&(y.duration=Mn(y.duration)),y.repeatDelay&&(y.repeatDelay=Mn(y.repeatDelay)),!f||!p||Sw.current||s.type===!1||NS.skipAnimations)return hS(y);if(!r.isHandoff&&t.owner&&t.owner.current instanceof HTMLElement&&!t.owner.getProps().onUpdate){const m=pS(t,e,y);if(m)return m}return fo(y)};function po(e){return!!(Be(e)&&e.add)}const Mg=e=>/^\-?\d*\.?\d+$/.test(e);function gc(e,t){e.indexOf(t)===-1&&e.push(t)}function yc(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}class vc{constructor(){this.subscriptions=[]}add(t){return gc(this.subscriptions,t),()=>yc(this.subscriptions,t)}notify(t,n,r){const i=this.subscriptions.length;if(i)if(i===1)this.subscriptions[0](t,n,r);else for(let s=0;s<i;s++){const o=this.subscriptions[s];o&&o(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const TS=e=>!isNaN(parseFloat(e));class ES{constructor(t,n={}){this.version="10.18.0",this.timeDelta=0,this.lastUpdated=0,this.canTrackVelocity=!1,this.events={},this.updateAndNotify=(r,i=!0)=>{this.prev=this.current,this.current=r;const{delta:s,timestamp:o}=Se;this.lastUpdated!==o&&(this.timeDelta=s,this.lastUpdated=o,G.postRender(this.scheduleVelocityCheck)),this.prev!==this.current&&this.events.change&&this.events.change.notify(this.current),this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()),i&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.scheduleVelocityCheck=()=>G.postRender(this.velocityCheck),this.velocityCheck=({timestamp:r})=>{r!==this.lastUpdated&&(this.prev=this.current,this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=t,this.canTrackVelocity=TS(this.current),this.owner=n.owner}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new vc);const r=this.events[t].add(n);return t==="change"?()=>{r(),G.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t,n=!0){!n||!this.passiveEffect?this.updateAndNotify(t,n):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,n,r){this.set(n),this.prev=t,this.timeDelta=r}jump(t){this.updateAndNotify(t),this.prev=t,this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){return this.canTrackVelocity?Eg(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Cr(e,t){return new ES(e,t)}const Og=e=>t=>t.test(e),RS={test:e=>e==="auto",parse:e=>e},_g=[qn,_,jt,Ut,z1,_1,RS],Hr=e=>_g.find(Og(e)),LS=[..._g,Ee,dn],AS=e=>LS.find(Og(e));function DS(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Cr(n))}function MS(e,t){const n=Bo(e,t);let{transitionEnd:r={},transition:i={},...s}=n?e.makeTargetAnimatable(n,!1):{};s={...s,...r};for(const o in s){const a=X1(s[o]);DS(e,o,a)}}function OS(e,t,n){var r,i;const s=Object.keys(t).filter(a=>!e.hasValue(a)),o=s.length;if(o)for(let a=0;a<o;a++){const l=s[a],c=t[l];let d=null;Array.isArray(c)&&(d=c[0]),d===null&&(d=(i=(r=n[l])!==null&&r!==void 0?r:e.readValue(l))!==null&&i!==void 0?i:t[l]),d!=null&&(typeof d=="string"&&(Mg(d)||Dg(d))?d=parseFloat(d):!AS(d)&&dn.test(c)&&(d=Ag(l,c)),e.addValue(l,Cr(d,{owner:e})),n[l]===void 0&&(n[l]=d),d!==null&&e.setBaseTarget(l,d))}}function _S(e,t){return t?(t[e]||t.default||t).from:void 0}function zS(e,t,n){const r={};for(const i in e){const s=_S(i,t);if(s!==void 0)r[i]=s;else{const o=n.getValue(i);o&&(r[i]=o.get())}}return r}function FS({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function VS(e,t){const n=e.get();if(Array.isArray(t)){for(let r=0;r<t.length;r++)if(t[r]!==n)return!0}else return n!==t}function zg(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:s=e.getDefaultTransition(),transitionEnd:o,...a}=e.makeTargetAnimatable(t);const l=e.getValue("willChange");r&&(s=r);const c=[],d=i&&e.animationState&&e.animationState.getState()[i];for(const f in a){const p=e.getValue(f),y=a[f];if(!p||y===void 0||d&&FS(d,f))continue;const m={delay:n,elapsed:0,...hc(s||{},f)};if(window.HandoffAppearAnimations){const x=e.getProps()[Fm];if(x){const h=window.HandoffAppearAnimations(x,f,p,G);h!==null&&(m.elapsed=h,m.isHandoff=!0)}}let v=!m.isHandoff&&!VS(p,y);if(m.type==="spring"&&(p.getVelocity()||m.velocity)&&(v=!1),p.animation&&(v=!1),v)continue;p.start(mc(f,p,y,e.shouldReduceMotion&&Kn.has(f)?{type:!1}:m));const w=p.animation;po(l)&&(l.add(f),w.then(()=>l.remove(f))),c.push(w)}return o&&Promise.all(c).then(()=>{o&&MS(e,o)}),c}function Bl(e,t,n={}){const r=Bo(e,t,n.custom);let{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);const s=r?()=>Promise.all(zg(e,r,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(l=0)=>{const{delayChildren:c=0,staggerChildren:d,staggerDirection:f}=i;return IS(e,t,c+l,d,f,n)}:()=>Promise.resolve(),{when:a}=i;if(a){const[l,c]=a==="beforeChildren"?[s,o]:[o,s];return l().then(()=>c())}else return Promise.all([s(),o(n.delay)])}function IS(e,t,n=0,r=0,i=1,s){const o=[],a=(e.variantChildren.size-1)*r,l=i===1?(c=0)=>c*r:(c=0)=>a-c*r;return Array.from(e.variantChildren).sort(BS).forEach((c,d)=>{c.notify("AnimationStart",t),o.push(Bl(c,t,{...s,delay:n+l(d)}).then(()=>c.notify("AnimationComplete",t)))}),Promise.all(o)}function BS(e,t){return e.sortNodePosition(t)}function US(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const i=t.map(s=>Bl(e,s,n));r=Promise.all(i)}else if(typeof t=="string")r=Bl(e,t,n);else{const i=typeof t=="function"?Bo(e,t,n.custom):t;r=Promise.all(zg(e,i,n))}return r.then(()=>e.notify("AnimationComplete",t))}const $S=[...Zu].reverse(),HS=Zu.length;function WS(e){return t=>Promise.all(t.map(({animation:n,options:r})=>US(e,n,r)))}function KS(e){let t=WS(e);const n=GS();let r=!0;const i=(l,c)=>{const d=Bo(e,c);if(d){const{transition:f,transitionEnd:p,...y}=d;l={...l,...y,...p}}return l};function s(l){t=l(e)}function o(l,c){const d=e.getProps(),f=e.getVariantContext(!0)||{},p=[],y=new Set;let m={},v=1/0;for(let x=0;x<HS;x++){const h=$S[x],g=n[h],b=d[h]!==void 0?d[h]:f[h],k=Ri(b),T=h===c?g.isActive:null;T===!1&&(v=x);let C=b===f[h]&&b!==d[h]&&k;if(C&&r&&e.manuallyAnimateOnMount&&(C=!1),g.protectedKeys={...m},!g.isActive&&T===null||!b&&!g.prevProp||zo(b)||typeof b=="boolean")continue;let A=qS(g.prevProp,b)||h===c&&g.isActive&&!C&&k||x>v&&k,M=!1;const ie=Array.isArray(b)?b:[b];let ne=ie.reduce(i,{});T===!1&&(ne={});const{prevResolvedValues:se={}}=g,K={...se,...ne},ot=U=>{A=!0,y.has(U)&&(M=!0,y.delete(U)),g.needsAnimating[U]=!0};for(const U in K){const Ne=ne[U],E=se[U];if(m.hasOwnProperty(U))continue;let O=!1;lo(Ne)&&lo(E)?O=!og(Ne,E):O=Ne!==E,O?Ne!==void 0?ot(U):y.add(U):Ne!==void 0&&y.has(U)?ot(U):g.protectedKeys[U]=!0}g.prevProp=b,g.prevResolvedValues=ne,g.isActive&&(m={...m,...ne}),r&&e.blockInitialAnimation&&(A=!1),A&&(!C||M)&&p.push(...ie.map(U=>({animation:U,options:{type:h,...l}})))}if(y.size){const x={};y.forEach(h=>{const g=e.getBaseTarget(h);g!==void 0&&(x[h]=g)}),p.push({animation:x})}let w=!!p.length;return r&&(d.initial===!1||d.initial===d.animate)&&!e.manuallyAnimateOnMount&&(w=!1),r=!1,w?t(p):Promise.resolve()}function a(l,c,d){var f;if(n[l].isActive===c)return Promise.resolve();(f=e.variantChildren)===null||f===void 0||f.forEach(y=>{var m;return(m=y.animationState)===null||m===void 0?void 0:m.setActive(l,c)}),n[l].isActive=c;const p=o(d,l);for(const y in n)n[y].protectedKeys={};return p}return{animateChanges:o,setActive:a,setAnimateFunction:s,getState:()=>n}}function qS(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!og(t,e):!1}function wn(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function GS(){return{animate:wn(!0),whileInView:wn(),whileHover:wn(),whileTap:wn(),whileDrag:wn(),whileFocus:wn(),exit:wn()}}class YS extends gn{constructor(t){super(t),t.animationState||(t.animationState=KS(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();this.unmount(),zo(t)&&(this.unmount=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){}}let QS=0;class XS extends gn{constructor(){super(...arguments),this.id=QS++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n,custom:r}=this.node.presenceContext,{isPresent:i}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===i)return;const s=this.node.animationState.setActive("exit",!t,{custom:r??this.node.getProps().custom});n&&!t&&s.then(()=>n(this.id))}mount(){const{register:t}=this.node.presenceContext||{};t&&(this.unmount=t(this.id))}unmount(){}}const JS={animation:{Feature:YS},exit:{Feature:XS}},uf=(e,t)=>Math.abs(e-t);function ZS(e,t){const n=uf(e.x,t.x),r=uf(e.y,t.y);return Math.sqrt(n**2+r**2)}class Fg{constructor(t,n,{transformPagePoint:r,contextWindow:i,dragSnapToOrigin:s=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const f=La(this.lastMoveEventInfo,this.history),p=this.startEvent!==null,y=ZS(f.offset,{x:0,y:0})>=3;if(!p&&!y)return;const{point:m}=f,{timestamp:v}=Se;this.history.push({...m,timestamp:v});const{onStart:w,onMove:x}=this.handlers;p||(w&&w(this.lastMoveEvent,f),this.startEvent=this.lastMoveEvent),x&&x(this.lastMoveEvent,f)},this.handlePointerMove=(f,p)=>{this.lastMoveEvent=f,this.lastMoveEventInfo=Ra(p,this.transformPagePoint),G.update(this.updatePoint,!0)},this.handlePointerUp=(f,p)=>{this.end();const{onEnd:y,onSessionEnd:m,resumeAnimation:v}=this.handlers;if(this.dragSnapToOrigin&&v&&v(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const w=La(f.type==="pointercancel"?this.lastMoveEventInfo:Ra(p,this.transformPagePoint),this.history);this.startEvent&&y&&y(f,w),m&&m(f,w)},!tg(t))return;this.dragSnapToOrigin=s,this.handlers=n,this.transformPagePoint=r,this.contextWindow=i||window;const o=Io(t),a=Ra(o,this.transformPagePoint),{point:l}=a,{timestamp:c}=Se;this.history=[{...l,timestamp:c}];const{onSessionStart:d}=n;d&&d(t,La(a,this.history)),this.removeListeners=an(At(this.contextWindow,"pointermove",this.handlePointerMove),At(this.contextWindow,"pointerup",this.handlePointerUp),At(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),Ft(this.updatePoint)}}function Ra(e,t){return t?{point:t(e.point)}:e}function cf(e,t){return{x:e.x-t.x,y:e.y-t.y}}function La({point:e},t){return{point:e,delta:cf(e,Vg(t)),offset:cf(e,e2(t)),velocity:t2(t,.1)}}function e2(e){return e[0]}function Vg(e){return e[e.length-1]}function t2(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const i=Vg(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>Mn(t)));)n--;if(!r)return{x:0,y:0};const s=Dt(i.timestamp-r.timestamp);if(s===0)return{x:0,y:0};const o={x:(i.x-r.x)/s,y:(i.y-r.y)/s};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function Ge(e){return e.max-e.min}function Ul(e,t=0,n=.01){return Math.abs(e-t)<=n}function df(e,t,n,r=.5){e.origin=r,e.originPoint=Z(t.min,t.max,e.origin),e.scale=Ge(n)/Ge(t),(Ul(e.scale,1,1e-4)||isNaN(e.scale))&&(e.scale=1),e.translate=Z(n.min,n.max,e.origin)-e.originPoint,(Ul(e.translate)||isNaN(e.translate))&&(e.translate=0)}function ui(e,t,n,r){df(e.x,t.x,n.x,r?r.originX:void 0),df(e.y,t.y,n.y,r?r.originY:void 0)}function ff(e,t,n){e.min=n.min+t.min,e.max=e.min+Ge(t)}function n2(e,t,n){ff(e.x,t.x,n.x),ff(e.y,t.y,n.y)}function pf(e,t,n){e.min=t.min-n.min,e.max=e.min+Ge(t)}function ci(e,t,n){pf(e.x,t.x,n.x),pf(e.y,t.y,n.y)}function r2(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?Z(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?Z(n,e,r.max):Math.min(e,n)),e}function hf(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function i2(e,{top:t,left:n,bottom:r,right:i}){return{x:hf(e.x,n,i),y:hf(e.y,t,r)}}function mf(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function s2(e,t){return{x:mf(e.x,t.x),y:mf(e.y,t.y)}}function o2(e,t){let n=.5;const r=Ge(e),i=Ge(t);return i>r?n=Ai(t.min,t.max-r,e.min):r>i&&(n=Ai(e.min,e.max-i,t.min)),cn(0,1,n)}function a2(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const $l=.35;function l2(e=$l){return e===!1?e=0:e===!0&&(e=$l),{x:gf(e,"left","right"),y:gf(e,"top","bottom")}}function gf(e,t,n){return{min:yf(e,t),max:yf(e,n)}}function yf(e,t){return typeof e=="number"?e:e[t]||0}const vf=()=>({translate:0,scale:1,origin:0,originPoint:0}),ur=()=>({x:vf(),y:vf()}),xf=()=>({min:0,max:0}),ce=()=>({x:xf(),y:xf()});function Je(e){return[e("x"),e("y")]}function Ig({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function u2({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function c2(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function Aa(e){return e===void 0||e===1}function Hl({scale:e,scaleX:t,scaleY:n}){return!Aa(e)||!Aa(t)||!Aa(n)}function jn(e){return Hl(e)||Bg(e)||e.z||e.rotate||e.rotateX||e.rotateY}function Bg(e){return wf(e.x)||wf(e.y)}function wf(e){return e&&e!=="0%"}function ho(e,t,n){const r=e-n,i=t*r;return n+i}function Sf(e,t,n,r,i){return i!==void 0&&(e=ho(e,i,r)),ho(e,n,r)+t}function Wl(e,t=0,n=1,r,i){e.min=Sf(e.min,t,n,r,i),e.max=Sf(e.max,t,n,r,i)}function Ug(e,{x:t,y:n}){Wl(e.x,t.translate,t.scale,t.originPoint),Wl(e.y,n.translate,n.scale,n.originPoint)}function d2(e,t,n,r=!1){const i=n.length;if(!i)return;t.x=t.y=1;let s,o;for(let a=0;a<i;a++){s=n[a],o=s.projectionDelta;const l=s.instance;l&&l.style&&l.style.display==="contents"||(r&&s.options.layoutScroll&&s.scroll&&s!==s.root&&cr(e,{x:-s.scroll.offset.x,y:-s.scroll.offset.y}),o&&(t.x*=o.x.scale,t.y*=o.y.scale,Ug(e,o)),r&&jn(s.latestValues)&&cr(e,s.latestValues))}t.x=bf(t.x),t.y=bf(t.y)}function bf(e){return Number.isInteger(e)||e>1.0000000000001||e<.999999999999?e:1}function Wt(e,t){e.min=e.min+t,e.max=e.max+t}function jf(e,t,[n,r,i]){const s=t[i]!==void 0?t[i]:.5,o=Z(e.min,e.max,s);Wl(e,t[n],t[r],o,t.scale)}const f2=["x","scaleX","originX"],p2=["y","scaleY","originY"];function cr(e,t){jf(e.x,t,f2),jf(e.y,t,p2)}function $g(e,t){return Ig(c2(e.getBoundingClientRect(),t))}function h2(e,t,n){const r=$g(e,n),{scroll:i}=t;return i&&(Wt(r.x,i.offset.x),Wt(r.y,i.offset.y)),r}const Hg=({current:e})=>e?e.ownerDocument.defaultView:null,m2=new WeakMap;class g2{constructor(t){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=ce(),this.visualElement=t}start(t,{snapToCursor:n=!1}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const i=d=>{const{dragSnapToOrigin:f}=this.getProps();f?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(Io(d,"page").point)},s=(d,f)=>{const{drag:p,dragPropagation:y,onDragStart:m}=this.getProps();if(p&&!y&&(this.openGlobalLock&&this.openGlobalLock(),this.openGlobalLock=rg(p),!this.openGlobalLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Je(w=>{let x=this.getAxisMotionValue(w).get()||0;if(jt.test(x)){const{projection:h}=this.visualElement;if(h&&h.layout){const g=h.layout.layoutBox[w];g&&(x=Ge(g)*(parseFloat(x)/100))}}this.originPoint[w]=x}),m&&G.update(()=>m(d,f),!1,!0);const{animationState:v}=this.visualElement;v&&v.setActive("whileDrag",!0)},o=(d,f)=>{const{dragPropagation:p,dragDirectionLock:y,onDirectionLock:m,onDrag:v}=this.getProps();if(!p&&!this.openGlobalLock)return;const{offset:w}=f;if(y&&this.currentDirection===null){this.currentDirection=y2(w),this.currentDirection!==null&&m&&m(this.currentDirection);return}this.updateAxis("x",f.point,w),this.updateAxis("y",f.point,w),this.visualElement.render(),v&&v(d,f)},a=(d,f)=>this.stop(d,f),l=()=>Je(d=>{var f;return this.getAnimationState(d)==="paused"&&((f=this.getAxisMotionValue(d).animation)===null||f===void 0?void 0:f.play())}),{dragSnapToOrigin:c}=this.getProps();this.panSession=new Fg(t,{onSessionStart:i,onStart:s,onMove:o,onSessionEnd:a,resumeAnimation:l},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:c,contextWindow:Hg(this.visualElement)})}stop(t,n){const r=this.isDragging;if(this.cancel(),!r)return;const{velocity:i}=n;this.startAnimation(i);const{onDragEnd:s}=this.getProps();s&&G.update(()=>s(t,n))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:i}=this.getProps();if(!r||!ms(t,i,this.currentDirection))return;const s=this.getAxisMotionValue(t);let o=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(o=r2(o,this.constraints[t],this.elastic[t])),s.set(o)}resolveConstraints(){var t;const{dragConstraints:n,dragElastic:r}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(t=this.visualElement.projection)===null||t===void 0?void 0:t.layout,s=this.constraints;n&&ar(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&i?this.constraints=i2(i.layoutBox,n):this.constraints=!1,this.elastic=l2(r),s!==this.constraints&&i&&this.constraints&&!this.hasMutatedConstraints&&Je(o=>{this.getAxisMotionValue(o)&&(this.constraints[o]=a2(i.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!ar(t))return!1;const r=t.current,{projection:i}=this.visualElement;if(!i||!i.layout)return!1;const s=h2(r,i.root,this.visualElement.getTransformPagePoint());let o=s2(i.layout.layoutBox,s);if(n){const a=n(u2(o));this.hasMutatedConstraints=!!a,a&&(o=Ig(a))}return o}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:i,dragTransition:s,dragSnapToOrigin:o,onDragTransitionEnd:a}=this.getProps(),l=this.constraints||{},c=Je(d=>{if(!ms(d,n,this.currentDirection))return;let f=l&&l[d]||{};o&&(f={min:0,max:0});const p=i?200:1e6,y=i?40:1e7,m={type:"inertia",velocity:r?t[d]:0,bounceStiffness:p,bounceDamping:y,timeConstant:750,restDelta:1,restSpeed:10,...s,...f};return this.startAxisValueAnimation(d,m)});return Promise.all(c).then(a)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return r.start(mc(t,r,0,n))}stopAnimation(){Je(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){Je(t=>{var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.state}getAxisMotionValue(t){const n="_drag"+t.toUpperCase(),r=this.visualElement.getProps(),i=r[n];return i||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){Je(n=>{const{drag:r}=this.getProps();if(!ms(n,r,this.currentDirection))return;const{projection:i}=this.visualElement,s=this.getAxisMotionValue(n);if(i&&i.layout){const{min:o,max:a}=i.layout.layoutBox[n];s.set(t[n]-Z(o,a,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!ar(n)||!r||!this.constraints)return;this.stopAnimation();const i={x:0,y:0};Je(o=>{const a=this.getAxisMotionValue(o);if(a){const l=a.get();i[o]=o2({min:l,max:l},this.constraints[o])}});const{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),Je(o=>{if(!ms(o,t,null))return;const a=this.getAxisMotionValue(o),{min:l,max:c}=this.constraints[o];a.set(Z(l,c,i[o]))})}addListeners(){if(!this.visualElement.current)return;m2.set(this.visualElement,this);const t=this.visualElement.current,n=At(t,"pointerdown",l=>{const{drag:c,dragListener:d=!0}=this.getProps();c&&d&&this.start(l)}),r=()=>{const{dragConstraints:l}=this.getProps();ar(l)&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,s=i.addEventListener("measure",r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),r();const o=Rt(window,"resize",()=>this.scalePositionWithinConstraints()),a=i.addEventListener("didUpdate",({delta:l,hasLayoutChanged:c})=>{this.isDragging&&c&&(Je(d=>{const f=this.getAxisMotionValue(d);f&&(this.originPoint[d]+=l[d].translate,f.set(f.get()+l[d].translate))}),this.visualElement.render())});return()=>{o(),n(),s(),a&&a()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:i=!1,dragConstraints:s=!1,dragElastic:o=$l,dragMomentum:a=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:i,dragConstraints:s,dragElastic:o,dragMomentum:a}}}function ms(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function y2(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class v2 extends gn{constructor(t){super(t),this.removeGroupControls=ae,this.removeListeners=ae,this.controls=new g2(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||ae}unmount(){this.removeGroupControls(),this.removeListeners()}}const kf=e=>(t,n)=>{e&&G.update(()=>e(t,n))};class x2 extends gn{constructor(){super(...arguments),this.removePointerDownListener=ae}onPointerDown(t){this.session=new Fg(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Hg(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:i}=this.node.getProps();return{onSessionStart:kf(t),onStart:kf(n),onMove:r,onEnd:(s,o)=>{delete this.session,i&&G.update(()=>i(s,o))}}}mount(){this.removePointerDownListener=At(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}function w2(){const e=S.useContext(Oo);if(e===null)return[!0,null];const{isPresent:t,onExitComplete:n,register:r}=e,i=S.useId();return S.useEffect(()=>r(i),[]),!t&&n?[!1,()=>n&&n(i)]:[!0]}const Ls={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function Cf(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const Wr={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(_.test(e))e=parseFloat(e);else return e;const n=Cf(e,t.target.x),r=Cf(e,t.target.y);return`${n}% ${r}%`}},S2={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,i=dn.parse(e);if(i.length>5)return r;const s=dn.createTransformer(e),o=typeof i[0]!="number"?1:0,a=n.x.scale*t.x,l=n.y.scale*t.y;i[0+o]/=a,i[1+o]/=l;const c=Z(a,l,.5);return typeof i[2+o]=="number"&&(i[2+o]/=c),typeof i[3+o]=="number"&&(i[3+o]/=c),s(i)}};class b2 extends yo.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:i}=this.props,{projection:s}=t;E1(j2),s&&(n.group&&n.group.add(s),r&&r.register&&i&&r.register(s),s.root.didUpdate(),s.addEventListener("animationComplete",()=>{this.safeToRemove()}),s.setOptions({...s.options,onExitComplete:()=>this.safeToRemove()})),Ls.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:i,isPresent:s}=this.props,o=r.projection;return o&&(o.isPresent=s,i||t.layoutDependency!==n||n===void 0?o.willUpdate():this.safeToRemove(),t.isPresent!==s&&(s?o.promote():o.relegate()||G.postRender(()=>{const a=o.getStack();(!a||!a.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),queueMicrotask(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:i}=t;i&&(i.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(i),r&&r.deregister&&r.deregister(i))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function Wg(e){const[t,n]=w2(),r=S.useContext(tc);return yo.createElement(b2,{...e,layoutGroup:r,switchLayoutGroup:S.useContext(Im),isPresent:t,safeToRemove:n})}const j2={borderRadius:{...Wr,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Wr,borderTopRightRadius:Wr,borderBottomLeftRadius:Wr,borderBottomRightRadius:Wr,boxShadow:S2},Kg=["TopLeft","TopRight","BottomLeft","BottomRight"],k2=Kg.length,Pf=e=>typeof e=="string"?parseFloat(e):e,Nf=e=>typeof e=="number"||_.test(e);function C2(e,t,n,r,i,s){i?(e.opacity=Z(0,n.opacity!==void 0?n.opacity:1,P2(r)),e.opacityExit=Z(t.opacity!==void 0?t.opacity:1,0,N2(r))):s&&(e.opacity=Z(t.opacity!==void 0?t.opacity:1,n.opacity!==void 0?n.opacity:1,r));for(let o=0;o<k2;o++){const a=`border${Kg[o]}Radius`;let l=Tf(t,a),c=Tf(n,a);if(l===void 0&&c===void 0)continue;l||(l=0),c||(c=0),l===0||c===0||Nf(l)===Nf(c)?(e[a]=Math.max(Z(Pf(l),Pf(c),r),0),(jt.test(c)||jt.test(l))&&(e[a]+="%")):e[a]=c}(t.rotate||n.rotate)&&(e.rotate=Z(t.rotate||0,n.rotate||0,r))}function Tf(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const P2=qg(0,.5,mg),N2=qg(.5,.95,ae);function qg(e,t,n){return r=>r<e?0:r>t?1:n(Ai(e,t,r))}function Ef(e,t){e.min=t.min,e.max=t.max}function Xe(e,t){Ef(e.x,t.x),Ef(e.y,t.y)}function Rf(e,t,n,r,i){return e-=t,e=ho(e,1/n,r),i!==void 0&&(e=ho(e,1/i,r)),e}function T2(e,t=0,n=1,r=.5,i,s=e,o=e){if(jt.test(t)&&(t=parseFloat(t),t=Z(o.min,o.max,t/100)-o.min),typeof t!="number")return;let a=Z(s.min,s.max,r);e===s&&(a-=t),e.min=Rf(e.min,t,n,a,i),e.max=Rf(e.max,t,n,a,i)}function Lf(e,t,[n,r,i],s,o){T2(e,t[n],t[r],t[i],t.scale,s,o)}const E2=["x","scaleX","originX"],R2=["y","scaleY","originY"];function Af(e,t,n,r){Lf(e.x,t,E2,n?n.x:void 0,r?r.x:void 0),Lf(e.y,t,R2,n?n.y:void 0,r?r.y:void 0)}function Df(e){return e.translate===0&&e.scale===1}function Gg(e){return Df(e.x)&&Df(e.y)}function L2(e,t){return e.x.min===t.x.min&&e.x.max===t.x.max&&e.y.min===t.y.min&&e.y.max===t.y.max}function Yg(e,t){return Math.round(e.x.min)===Math.round(t.x.min)&&Math.round(e.x.max)===Math.round(t.x.max)&&Math.round(e.y.min)===Math.round(t.y.min)&&Math.round(e.y.max)===Math.round(t.y.max)}function Mf(e){return Ge(e.x)/Ge(e.y)}class A2{constructor(){this.members=[]}add(t){gc(this.members,t),t.scheduleRender()}remove(t){if(yc(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(i=>t===i);if(n===0)return!1;let r;for(let i=n;i>=0;i--){const s=this.members[i];if(s.isPresent!==!1){r=s;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:i}=t.options;i===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function Of(e,t,n){let r="";const i=e.x.translate/t.x,s=e.y.translate/t.y;if((i||s)&&(r=`translate3d(${i}px, ${s}px, 0) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{rotate:l,rotateX:c,rotateY:d}=n;l&&(r+=`rotate(${l}deg) `),c&&(r+=`rotateX(${c}deg) `),d&&(r+=`rotateY(${d}deg) `)}const o=e.x.scale*t.x,a=e.y.scale*t.y;return(o!==1||a!==1)&&(r+=`scale(${o}, ${a})`),r||"none"}const D2=(e,t)=>e.depth-t.depth;class M2{constructor(){this.children=[],this.isDirty=!1}add(t){gc(this.children,t),this.isDirty=!0}remove(t){yc(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(D2),this.isDirty=!1,this.children.forEach(t)}}function O2(e,t){const n=performance.now(),r=({timestamp:i})=>{const s=i-n;s>=t&&(Ft(r),e(s-t))};return G.read(r,!0),()=>Ft(r)}function _2(e){window.MotionDebug&&window.MotionDebug.record(e)}function z2(e){return e instanceof SVGElement&&e.tagName!=="svg"}function F2(e,t,n){const r=Be(e)?e:Cr(e);return r.start(mc("",r,t,n)),r.animation}const _f=["","X","Y","Z"],V2={visibility:"hidden"},zf=1e3;let I2=0;const kn={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0};function Qg({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(o={},a=t==null?void 0:t()){this.id=I2++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,kn.totalNodes=kn.resolvedTargetDeltas=kn.recalculatedProjection=0,this.nodes.forEach($2),this.nodes.forEach(G2),this.nodes.forEach(Y2),this.nodes.forEach(H2),_2(kn)},this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=a?a.root||a:this,this.path=a?[...a.path,a]:[],this.parent=a,this.depth=a?a.depth+1:0;for(let l=0;l<this.path.length;l++)this.path[l].shouldResetTransform=!0;this.root===this&&(this.nodes=new M2)}addEventListener(o,a){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new vc),this.eventHandlers.get(o).add(a)}notifyListeners(o,...a){const l=this.eventHandlers.get(o);l&&l.notify(...a)}hasListeners(o){return this.eventHandlers.has(o)}mount(o,a=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=z2(o),this.instance=o;const{layoutId:l,layout:c,visualElement:d}=this.options;if(d&&!d.current&&d.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),a&&(c||l)&&(this.isLayoutDirty=!0),e){let f;const p=()=>this.root.updateBlockedByResize=!1;e(o,()=>{this.root.updateBlockedByResize=!0,f&&f(),f=O2(p,250),Ls.hasAnimatedSinceResize&&(Ls.hasAnimatedSinceResize=!1,this.nodes.forEach(Vf))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&d&&(l||c)&&this.addEventListener("didUpdate",({delta:f,hasLayoutChanged:p,hasRelativeTargetChanged:y,layout:m})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const v=this.options.transition||d.getDefaultTransition()||eb,{onLayoutAnimationStart:w,onLayoutAnimationComplete:x}=d.getProps(),h=!this.targetLayout||!Yg(this.targetLayout,m)||y,g=!p&&y;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||g||p&&(h||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(f,g);const b={...hc(v,"layout"),onPlay:w,onComplete:x};(d.shouldReduceMotion||this.options.layoutRoot)&&(b.delay=0,b.type=!1),this.startAnimation(b)}else p||Vf(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=m})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,Ft(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(Q2),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let d=0;d<this.path.length;d++){const f=this.path[d];f.shouldResetTransform=!0,f.updateScroll("snapshot"),f.options.layoutRoot&&f.willUpdate(!1)}const{layoutId:a,layout:l}=this.options;if(a===void 0&&!l)return;const c=this.getTransformTemplate();this.prevTransformTemplateValue=c?c(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Ff);return}this.isUpdating||this.nodes.forEach(K2),this.isUpdating=!1,this.nodes.forEach(q2),this.nodes.forEach(B2),this.nodes.forEach(U2),this.clearAllSnapshots();const a=performance.now();Se.delta=cn(0,1e3/60,a-Se.timestamp),Se.timestamp=a,Se.isProcessing=!0,ba.update.process(Se),ba.preRender.process(Se),ba.render.process(Se),Se.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,queueMicrotask(()=>this.update()))}clearAllSnapshots(){this.nodes.forEach(W2),this.sharedNodes.forEach(X2)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,G.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){G.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let l=0;l<this.path.length;l++)this.path[l].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutCorrected=ce(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:a}=this.options;a&&a.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let a=!!(this.options.layoutScroll&&this.instance);this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(a=!1),a&&(this.scroll={animationId:this.root.animationId,phase:o,isRoot:r(this.instance),offset:n(this.instance)})}resetTransform(){if(!i)return;const o=this.isLayoutDirty||this.shouldResetTransform,a=this.projectionDelta&&!Gg(this.projectionDelta),l=this.getTransformTemplate(),c=l?l(this.latestValues,""):void 0,d=c!==this.prevTransformTemplateValue;o&&(a||jn(this.latestValues)||d)&&(i(this.instance,c),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const a=this.measurePageBox();let l=this.removeElementScroll(a);return o&&(l=this.removeTransform(l)),tb(l),{animationId:this.root.animationId,measuredBox:a,layoutBox:l,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:o}=this.options;if(!o)return ce();const a=o.measureViewportBox(),{scroll:l}=this.root;return l&&(Wt(a.x,l.offset.x),Wt(a.y,l.offset.y)),a}removeElementScroll(o){const a=ce();Xe(a,o);for(let l=0;l<this.path.length;l++){const c=this.path[l],{scroll:d,options:f}=c;if(c!==this.root&&d&&f.layoutScroll){if(d.isRoot){Xe(a,o);const{scroll:p}=this.root;p&&(Wt(a.x,-p.offset.x),Wt(a.y,-p.offset.y))}Wt(a.x,d.offset.x),Wt(a.y,d.offset.y)}}return a}applyTransform(o,a=!1){const l=ce();Xe(l,o);for(let c=0;c<this.path.length;c++){const d=this.path[c];!a&&d.options.layoutScroll&&d.scroll&&d!==d.root&&cr(l,{x:-d.scroll.offset.x,y:-d.scroll.offset.y}),jn(d.latestValues)&&cr(l,d.latestValues)}return jn(this.latestValues)&&cr(l,this.latestValues),l}removeTransform(o){const a=ce();Xe(a,o);for(let l=0;l<this.path.length;l++){const c=this.path[l];if(!c.instance||!jn(c.latestValues))continue;Hl(c.latestValues)&&c.updateSnapshot();const d=ce(),f=c.measurePageBox();Xe(d,f),Af(a,c.latestValues,c.snapshot?c.snapshot.layoutBox:void 0,d)}return jn(this.latestValues)&&Af(a,this.latestValues),a}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Se.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var a;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const c=!!this.resumingFrom||this!==l;if(!(o||c&&this.isSharedProjectionDirty||this.isProjectionDirty||!((a=this.parent)===null||a===void 0)&&a.isProjectionDirty||this.attemptToResolveRelativeTarget))return;const{layout:f,layoutId:p}=this.options;if(!(!this.layout||!(f||p))){if(this.resolvedRelativeTargetAt=Se.timestamp,!this.targetDelta&&!this.relativeTarget){const y=this.getClosestProjectingParent();y&&y.layout&&this.animationProgress!==1?(this.relativeParent=y,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ce(),this.relativeTargetOrigin=ce(),ci(this.relativeTargetOrigin,this.layout.layoutBox,y.layout.layoutBox),Xe(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=ce(),this.targetWithTransforms=ce()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),n2(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Xe(this.target,this.layout.layoutBox),Ug(this.target,this.targetDelta)):Xe(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const y=this.getClosestProjectingParent();y&&!!y.resumingFrom==!!this.resumingFrom&&!y.options.layoutScroll&&y.target&&this.animationProgress!==1?(this.relativeParent=y,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ce(),this.relativeTargetOrigin=ce(),ci(this.relativeTargetOrigin,this.target,y.target),Xe(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}kn.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||Hl(this.parent.latestValues)||Bg(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var o;const a=this.getLead(),l=!!this.resumingFrom||this!==a;let c=!0;if((this.isProjectionDirty||!((o=this.parent)===null||o===void 0)&&o.isProjectionDirty)&&(c=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(c=!1),this.resolvedRelativeTargetAt===Se.timestamp&&(c=!1),c)return;const{layout:d,layoutId:f}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(d||f))return;Xe(this.layoutCorrected,this.layout.layoutBox);const p=this.treeScale.x,y=this.treeScale.y;d2(this.layoutCorrected,this.treeScale,this.path,l),a.layout&&!a.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(a.target=a.layout.layoutBox);const{target:m}=a;if(!m){this.projectionTransform&&(this.projectionDelta=ur(),this.projectionTransform="none",this.scheduleRender());return}this.projectionDelta||(this.projectionDelta=ur(),this.projectionDeltaWithTransform=ur());const v=this.projectionTransform;ui(this.projectionDelta,this.layoutCorrected,m,this.latestValues),this.projectionTransform=Of(this.projectionDelta,this.treeScale),(this.projectionTransform!==v||this.treeScale.x!==p||this.treeScale.y!==y)&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",m)),kn.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){if(this.options.scheduleRender&&this.options.scheduleRender(),o){const a=this.getStack();a&&a.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}setAnimationOrigin(o,a=!1){const l=this.snapshot,c=l?l.latestValues:{},d={...this.latestValues},f=ur();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!a;const p=ce(),y=l?l.source:void 0,m=this.layout?this.layout.source:void 0,v=y!==m,w=this.getStack(),x=!w||w.members.length<=1,h=!!(v&&!x&&this.options.crossfade===!0&&!this.path.some(Z2));this.animationProgress=0;let g;this.mixTargetDelta=b=>{const k=b/1e3;If(f.x,o.x,k),If(f.y,o.y,k),this.setTargetDelta(f),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(ci(p,this.layout.layoutBox,this.relativeParent.layout.layoutBox),J2(this.relativeTarget,this.relativeTargetOrigin,p,k),g&&L2(this.relativeTarget,g)&&(this.isProjectionDirty=!1),g||(g=ce()),Xe(g,this.relativeTarget)),v&&(this.animationValues=d,C2(d,c,this.latestValues,k,h,x)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=k},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(Ft(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=G.update(()=>{Ls.hasAnimatedSinceResize=!0,this.currentAnimation=F2(0,zf,{...o,onUpdate:a=>{this.mixTargetDelta(a),o.onUpdate&&o.onUpdate(a)},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(zf),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:a,target:l,layout:c,latestValues:d}=o;if(!(!a||!l||!c)){if(this!==o&&this.layout&&c&&Xg(this.options.animationType,this.layout.layoutBox,c.layoutBox)){l=this.target||ce();const f=Ge(this.layout.layoutBox.x);l.x.min=o.target.x.min,l.x.max=l.x.min+f;const p=Ge(this.layout.layoutBox.y);l.y.min=o.target.y.min,l.y.max=l.y.min+p}Xe(a,l),cr(a,d),ui(this.projectionDeltaWithTransform,this.layoutCorrected,a,d)}}registerSharedNode(o,a){this.sharedNodes.has(o)||this.sharedNodes.set(o,new A2),this.sharedNodes.get(o).add(a);const c=a.options.initialPromotionConfig;a.promote({transition:c?c.transition:void 0,preserveFollowOpacity:c&&c.shouldPreserveFollowOpacity?c.shouldPreserveFollowOpacity(a):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var o;const{layoutId:a}=this.options;return a?((o=this.getStack())===null||o===void 0?void 0:o.lead)||this:this}getPrevLead(){var o;const{layoutId:a}=this.options;return a?(o=this.getStack())===null||o===void 0?void 0:o.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:a,preserveFollowOpacity:l}={}){const c=this.getStack();c&&c.promote(this,l),o&&(this.projectionDelta=void 0,this.needsReset=!0),a&&this.setOptions({transition:a})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetRotation(){const{visualElement:o}=this.options;if(!o)return;let a=!1;const{latestValues:l}=o;if((l.rotate||l.rotateX||l.rotateY||l.rotateZ)&&(a=!0),!a)return;const c={};for(let d=0;d<_f.length;d++){const f="rotate"+_f[d];l[f]&&(c[f]=l[f],o.setStaticValue(f,0))}o.render();for(const d in c)o.setStaticValue(d,c[d]);o.scheduleRender()}getProjectionStyles(o){var a,l;if(!this.instance||this.isSVG)return;if(!this.isVisible)return V2;const c={visibility:""},d=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,c.opacity="",c.pointerEvents=Rs(o==null?void 0:o.pointerEvents)||"",c.transform=d?d(this.latestValues,""):"none",c;const f=this.getLead();if(!this.projectionDelta||!this.layout||!f.target){const v={};return this.options.layoutId&&(v.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,v.pointerEvents=Rs(o==null?void 0:o.pointerEvents)||""),this.hasProjected&&!jn(this.latestValues)&&(v.transform=d?d({},""):"none",this.hasProjected=!1),v}const p=f.animationValues||f.latestValues;this.applyTransformsToTarget(),c.transform=Of(this.projectionDeltaWithTransform,this.treeScale,p),d&&(c.transform=d(p,c.transform));const{x:y,y:m}=this.projectionDelta;c.transformOrigin=`${y.origin*100}% ${m.origin*100}% 0`,f.animationValues?c.opacity=f===this?(l=(a=p.opacity)!==null&&a!==void 0?a:this.latestValues.opacity)!==null&&l!==void 0?l:1:this.preserveOpacity?this.latestValues.opacity:p.opacityExit:c.opacity=f===this?p.opacity!==void 0?p.opacity:"":p.opacityExit!==void 0?p.opacityExit:0;for(const v in oo){if(p[v]===void 0)continue;const{correct:w,applyTo:x}=oo[v],h=c.transform==="none"?p[v]:w(p[v],f);if(x){const g=x.length;for(let b=0;b<g;b++)c[x[b]]=h}else c[v]=h}return this.options.layoutId&&(c.pointerEvents=f===this?Rs(o==null?void 0:o.pointerEvents)||"":"none"),c}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var a;return(a=o.currentAnimation)===null||a===void 0?void 0:a.stop()}),this.root.nodes.forEach(Ff),this.root.sharedNodes.clear()}}}function B2(e){e.updateLayout()}function U2(e){var t;const n=((t=e.resumeFrom)===null||t===void 0?void 0:t.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:i}=e.layout,{animationType:s}=e.options,o=n.source!==e.layout.source;s==="size"?Je(f=>{const p=o?n.measuredBox[f]:n.layoutBox[f],y=Ge(p);p.min=r[f].min,p.max=p.min+y}):Xg(s,n.layoutBox,r)&&Je(f=>{const p=o?n.measuredBox[f]:n.layoutBox[f],y=Ge(r[f]);p.max=p.min+y,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[f].max=e.relativeTarget[f].min+y)});const a=ur();ui(a,r,n.layoutBox);const l=ur();o?ui(l,e.applyTransform(i,!0),n.measuredBox):ui(l,r,n.layoutBox);const c=!Gg(a);let d=!1;if(!e.resumeFrom){const f=e.getClosestProjectingParent();if(f&&!f.resumeFrom){const{snapshot:p,layout:y}=f;if(p&&y){const m=ce();ci(m,n.layoutBox,p.layoutBox);const v=ce();ci(v,r,y.layoutBox),Yg(m,v)||(d=!0),f.options.layoutRoot&&(e.relativeTarget=v,e.relativeTargetOrigin=m,e.relativeParent=f)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:n,delta:l,layoutDelta:a,hasLayoutChanged:c,hasRelativeTargetChanged:d})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function $2(e){kn.totalNodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function H2(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function W2(e){e.clearSnapshot()}function Ff(e){e.clearMeasurements()}function K2(e){e.isLayoutDirty=!1}function q2(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function Vf(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function G2(e){e.resolveTargetDelta()}function Y2(e){e.calcProjection()}function Q2(e){e.resetRotation()}function X2(e){e.removeLeadSnapshot()}function If(e,t,n){e.translate=Z(t.translate,0,n),e.scale=Z(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function Bf(e,t,n,r){e.min=Z(t.min,n.min,r),e.max=Z(t.max,n.max,r)}function J2(e,t,n,r){Bf(e.x,t.x,n.x,r),Bf(e.y,t.y,n.y,r)}function Z2(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const eb={duration:.45,ease:[.4,0,.1,1]},Uf=e=>typeof navigator<"u"&&navigator.userAgent.toLowerCase().includes(e),$f=Uf("applewebkit/")&&!Uf("chrome/")?Math.round:ae;function Hf(e){e.min=$f(e.min),e.max=$f(e.max)}function tb(e){Hf(e.x),Hf(e.y)}function Xg(e,t,n){return e==="position"||e==="preserve-aspect"&&!Ul(Mf(t),Mf(n),.2)}const nb=Qg({attachResizeListener:(e,t)=>Rt(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Da={current:void 0},Jg=Qg({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!Da.current){const e=new nb({});e.mount(window),e.setOptions({layoutScroll:!0}),Da.current=e}return Da.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),rb={pan:{Feature:x2},drag:{Feature:v2,ProjectionNode:Jg,MeasureLayout:Wg}},ib=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function sb(e){const t=ib.exec(e);if(!t)return[,];const[,n,r]=t;return[n,r]}function Kl(e,t,n=1){const[r,i]=sb(e);if(!r)return;const s=window.getComputedStyle(t).getPropertyValue(r);if(s){const o=s.trim();return Mg(o)?parseFloat(o):o}else return Ol(i)?Kl(i,t,n+1):i}function ob(e,{...t},n){const r=e.current;if(!(r instanceof Element))return{target:t,transitionEnd:n};n&&(n={...n}),e.values.forEach(i=>{const s=i.get();if(!Ol(s))return;const o=Kl(s,r);o&&i.set(o)});for(const i in t){const s=t[i];if(!Ol(s))continue;const o=Kl(s,r);o&&(t[i]=o,n||(n={}),n[i]===void 0&&(n[i]=s))}return{target:t,transitionEnd:n}}const ab=new Set(["width","height","top","left","right","bottom","x","y","translateX","translateY"]),Zg=e=>ab.has(e),lb=e=>Object.keys(e).some(Zg),Wf=e=>e===qn||e===_,Kf=(e,t)=>parseFloat(e.split(", ")[t]),qf=(e,t)=>(n,{transform:r})=>{if(r==="none"||!r)return 0;const i=r.match(/^matrix3d\((.+)\)$/);if(i)return Kf(i[1],t);{const s=r.match(/^matrix\((.+)\)$/);return s?Kf(s[1],e):0}},ub=new Set(["x","y","z"]),cb=Ii.filter(e=>!ub.has(e));function db(e){const t=[];return cb.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t.length&&e.render(),t}const Pr={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:qf(4,13),y:qf(5,14)};Pr.translateX=Pr.x;Pr.translateY=Pr.y;const fb=(e,t,n)=>{const r=t.measureViewportBox(),i=t.current,s=getComputedStyle(i),{display:o}=s,a={};o==="none"&&t.setStaticValue("display",e.display||"block"),n.forEach(c=>{a[c]=Pr[c](r,s)}),t.render();const l=t.measureViewportBox();return n.forEach(c=>{const d=t.getValue(c);d&&d.jump(a[c]),e[c]=Pr[c](l,s)}),e},pb=(e,t,n={},r={})=>{t={...t},r={...r};const i=Object.keys(t).filter(Zg);let s=[],o=!1;const a=[];if(i.forEach(l=>{const c=e.getValue(l);if(!e.hasValue(l))return;let d=n[l],f=Hr(d);const p=t[l];let y;if(lo(p)){const m=p.length,v=p[0]===null?1:0;d=p[v],f=Hr(d);for(let w=v;w<m&&p[w]!==null;w++)y?uc(Hr(p[w])===y):y=Hr(p[w])}else y=Hr(p);if(f!==y)if(Wf(f)&&Wf(y)){const m=c.get();typeof m=="string"&&c.set(parseFloat(m)),typeof p=="string"?t[l]=parseFloat(p):Array.isArray(p)&&y===_&&(t[l]=p.map(parseFloat))}else f!=null&&f.transform&&(y!=null&&y.transform)&&(d===0||p===0)?d===0?c.set(y.transform(d)):t[l]=f.transform(p):(o||(s=db(e),o=!0),a.push(l),r[l]=r[l]!==void 0?r[l]:t[l],c.jump(p))}),a.length){const l=a.indexOf("height")>=0?window.pageYOffset:null,c=fb(t,e,a);return s.length&&s.forEach(([d,f])=>{e.getValue(d).set(f)}),e.render(),_o&&l!==null&&window.scrollTo({top:l}),{target:c,transitionEnd:r}}else return{target:t,transitionEnd:r}};function hb(e,t,n,r){return lb(t)?pb(e,t,n,r):{target:t,transitionEnd:r}}const mb=(e,t,n,r)=>{const i=ob(e,t,r);return t=i.target,r=i.transitionEnd,hb(e,t,n,r)},ql={current:null},ey={current:!1};function gb(){if(ey.current=!0,!!_o)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>ql.current=e.matches;e.addListener(t),t()}else ql.current=!1}function yb(e,t,n){const{willChange:r}=t;for(const i in t){const s=t[i],o=n[i];if(Be(s))e.addValue(i,s),po(r)&&r.add(i);else if(Be(o))e.addValue(i,Cr(s,{owner:e})),po(r)&&r.remove(i);else if(o!==s)if(e.hasValue(i)){const a=e.getValue(i);!a.hasAnimated&&a.set(s)}else{const a=e.getStaticValue(i);e.addValue(i,Cr(a!==void 0?a:s,{owner:e}))}}for(const i in n)t[i]===void 0&&e.removeValue(i);return t}const Gf=new WeakMap,ty=Object.keys(Li),vb=ty.length,Yf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],xb=ec.length;class wb{constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:i,visualState:s},o={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.scheduleRender=()=>G.render(this.render,!1,!0);const{latestValues:a,renderState:l}=s;this.latestValues=a,this.baseTarget={...a},this.initialValues=n.initial?{...a}:{},this.renderState=l,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=i,this.options=o,this.isControllingVariants=Fo(n),this.isVariantNode=Vm(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:c,...d}=this.scrapeMotionValuesFromProps(n,{});for(const f in d){const p=d[f];a[f]!==void 0&&Be(p)&&(p.set(a[f],!1),po(c)&&c.add(f))}}scrapeMotionValuesFromProps(t,n){return{}}mount(t){this.current=t,Gf.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,r)=>this.bindToMotionValue(r,n)),ey.current||gb(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:ql.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){Gf.delete(this.current),this.projection&&this.projection.unmount(),Ft(this.notifyUpdate),Ft(this.render),this.valueSubscriptions.forEach(t=>t()),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const t in this.events)this.events[t].clear();for(const t in this.features)this.features[t].unmount();this.current=null}bindToMotionValue(t,n){const r=Kn.has(t),i=n.on("change",o=>{this.latestValues[t]=o,this.props.onUpdate&&G.update(this.notifyUpdate,!1,!0),r&&this.projection&&(this.projection.isTransformDirty=!0)}),s=n.on("renderRequest",this.scheduleRender);this.valueSubscriptions.set(t,()=>{i(),s()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}loadFeatures({children:t,...n},r,i,s){let o,a;for(let l=0;l<vb;l++){const c=ty[l],{isEnabled:d,Feature:f,ProjectionNode:p,MeasureLayout:y}=Li[c];p&&(o=p),d(n)&&(!this.features[c]&&f&&(this.features[c]=new f(this)),y&&(a=y))}if((this.type==="html"||this.type==="svg")&&!this.projection&&o){this.projection=new o(this.latestValues,this.parent&&this.parent.projection);const{layoutId:l,layout:c,drag:d,dragConstraints:f,layoutScroll:p,layoutRoot:y}=n;this.projection.setOptions({layoutId:l,layout:c,alwaysMeasureLayout:!!d||f&&ar(f),visualElement:this,scheduleRender:()=>this.scheduleRender(),animationType:typeof c=="string"?c:"both",initialPromotionConfig:s,layoutScroll:p,layoutRoot:y})}return a}updateFeatures(){for(const t in this.features){const n=this.features[t];n.isMounted?n.update():(n.mount(),n.isMounted=!0)}}triggerBuild(){this.build(this.renderState,this.latestValues,this.options,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):ce()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}makeTargetAnimatable(t,n=!0){return this.makeTargetAnimatableFromInstance(t,this.props,n)}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<Yf.length;r++){const i=Yf[r];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const s=t["on"+i];s&&(this.propEventSubscriptions[i]=this.on(i,s))}this.prevMotionValues=yb(this,this.scrapeMotionValuesFromProps(t,this.prevProps),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}getVariantContext(t=!1){if(t)return this.parent?this.parent.getVariantContext():void 0;if(!this.isControllingVariants){const r=this.parent?this.parent.getVariantContext()||{}:{};return this.props.initial!==void 0&&(r.initial=this.props.initial),r}const n={};for(let r=0;r<xb;r++){const i=ec[r],s=this.props[i];(Ri(s)||s===!1)&&(n[i]=s)}return n}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){n!==this.values.get(t)&&(this.removeValue(t),this.bindToMotionValue(t,n)),this.values.set(t,n),this.latestValues[t]=n.get()}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=Cr(n,{owner:this}),this.addValue(t,r)),r}readValue(t){var n;return this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(n=this.getBaseTargetFromProps(this.props,t))!==null&&n!==void 0?n:this.readValueFromInstance(this.current,t,this.options)}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var n;const{initial:r}=this.props,i=typeof r=="string"||typeof r=="object"?(n=lc(this.props,r))===null||n===void 0?void 0:n[t]:void 0;if(r&&i!==void 0)return i;const s=this.getBaseTargetFromProps(this.props,t);return s!==void 0&&!Be(s)?s:this.initialValues[t]!==void 0&&i===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new vc),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}}class ny extends wb{sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}makeTargetAnimatableFromInstance({transition:t,transitionEnd:n,...r},{transformValues:i},s){let o=zS(r,t||{},this);if(i&&(n&&(n=i(n)),r&&(r=i(r)),o&&(o=i(o))),s){OS(this,r,o);const a=mb(this,r,o,n);n=a.transitionEnd,r=a.target}return{transition:t,transitionEnd:n,...r}}}function Sb(e){return window.getComputedStyle(e)}class bb extends ny{constructor(){super(...arguments),this.type="html"}readValueFromInstance(t,n){if(Kn.has(n)){const r=pc(n);return r&&r.default||0}else{const r=Sb(t),i=($m(n)?r.getPropertyValue(n):r[n])||0;return typeof i=="string"?i.trim():i}}measureInstanceViewportBox(t,{transformPagePoint:n}){return $g(t,n)}build(t,n,r,i){rc(t,n,r,i.transformTemplate)}scrapeMotionValuesFromProps(t,n){return ac(t,n)}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;Be(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}renderInstance(t,n,r,i){Ym(t,n,r,i)}}class jb extends ny{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(Kn.has(n)){const r=pc(n);return r&&r.default||0}return n=Qm.has(n)?n:Ju(n),t.getAttribute(n)}measureInstanceViewportBox(){return ce()}scrapeMotionValuesFromProps(t,n){return Jm(t,n)}build(t,n,r,i){sc(t,n,r,this.isSVGTag,i.transformTemplate)}renderInstance(t,n,r,i){Xm(t,n,r,i)}mount(t){this.isSVGTag=oc(t.tagName),super.mount(t)}}const kb=(e,t)=>nc(e)?new jb(t,{enableHardwareAcceleration:!1}):new bb(t,{enableHardwareAcceleration:!0}),Cb={layout:{ProjectionNode:Jg,MeasureLayout:Wg}},Pb={...JS,...vw,...rb,...Cb},R=N1((e,t)=>sw(e,t,Pb,kb));function ry(){const e=S.useRef(!1);return Xu(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Nb(){const e=ry(),[t,n]=S.useState(0),r=S.useCallback(()=>{e.current&&n(t+1)},[t]);return[S.useCallback(()=>G.postRender(r),[r]),t]}class Tb extends S.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=n.offsetHeight||0,r.width=n.offsetWidth||0,r.top=n.offsetTop,r.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function Eb({children:e,isPresent:t}){const n=S.useId(),r=S.useRef(null),i=S.useRef({width:0,height:0,top:0,left:0});return S.useInsertionEffect(()=>{const{width:s,height:o,top:a,left:l}=i.current;if(t||!r.current||!s||!o)return;r.current.dataset.motionPopId=n;const c=document.createElement("style");return document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${o}px !important;
            top: ${a}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[t]),S.createElement(Tb,{isPresent:t,childRef:r,sizeRef:i},S.cloneElement(e,{ref:r}))}const Ma=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:s,mode:o})=>{const a=Zm(Rb),l=S.useId(),c=S.useMemo(()=>({id:l,initial:t,isPresent:n,custom:i,onExitComplete:d=>{a.set(d,!0);for(const f of a.values())if(!f)return;r&&r()},register:d=>(a.set(d,!1),()=>a.delete(d))}),s?void 0:[n]);return S.useMemo(()=>{a.forEach((d,f)=>a.set(f,!1))},[n]),S.useEffect(()=>{!n&&!a.size&&r&&r()},[n]),o==="popLayout"&&(e=S.createElement(Eb,{isPresent:n},e)),S.createElement(Oo.Provider,{value:c},e)};function Rb(){return new Map}function Lb(e){return S.useEffect(()=>()=>e(),[])}const Cn=e=>e.key||"";function Ab(e,t){e.forEach(n=>{const r=Cn(n);t.set(r,n)})}function Db(e){const t=[];return S.Children.forEach(e,n=>{S.isValidElement(n)&&t.push(n)}),t}const xc=({children:e,custom:t,initial:n=!0,onExitComplete:r,exitBeforeEnter:i,presenceAffectsLayout:s=!0,mode:o="sync"})=>{const a=S.useContext(tc).forceRender||Nb()[0],l=ry(),c=Db(e);let d=c;const f=S.useRef(new Map).current,p=S.useRef(d),y=S.useRef(new Map).current,m=S.useRef(!0);if(Xu(()=>{m.current=!1,Ab(c,y),p.current=d}),Lb(()=>{m.current=!0,y.clear(),f.clear()}),m.current)return S.createElement(S.Fragment,null,d.map(h=>S.createElement(Ma,{key:Cn(h),isPresent:!0,initial:n?void 0:!1,presenceAffectsLayout:s,mode:o},h)));d=[...d];const v=p.current.map(Cn),w=c.map(Cn),x=v.length;for(let h=0;h<x;h++){const g=v[h];w.indexOf(g)===-1&&!f.has(g)&&f.set(g,void 0)}return o==="wait"&&f.size&&(d=[]),f.forEach((h,g)=>{if(w.indexOf(g)!==-1)return;const b=y.get(g);if(!b)return;const k=v.indexOf(g);let T=h;if(!T){const C=()=>{f.delete(g);const P=Array.from(y.keys()).filter(A=>!w.includes(A));if(P.forEach(A=>y.delete(A)),p.current=c.filter(A=>{const M=Cn(A);return M===g||P.includes(M)}),!f.size){if(l.current===!1)return;a(),r&&r()}};T=S.createElement(Ma,{key:Cn(b),isPresent:!1,onExitComplete:C,custom:t,presenceAffectsLayout:s,mode:o},b),f.set(g,T)}d.splice(k,0,T)}),d=d.map(h=>{const g=h.key;return f.has(g)?h:S.createElement(Ma,{key:Cn(h),isPresent:!0,presenceAffectsLayout:s,mode:o},h)}),S.createElement(S.Fragment,null,f.size?d:d.map(h=>S.cloneElement(h)))};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Mb={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ob=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),W=(e,t)=>{const n=S.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:a="",children:l,...c},d)=>S.createElement("svg",{ref:d,...Mb,width:i,height:i,stroke:r,strokeWidth:o?Number(s)*24/Number(i):s,className:["lucide",`lucide-${Ob(e)}`,a].join(" "),...c},[...t.map(([f,p])=>S.createElement(f,p)),...Array.isArray(l)?l:[l]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=W("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy=W("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=W("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=W("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _b=W("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sy=W("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zb=W("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fb=W("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vb=W("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rn=W("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oy=W("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=W("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bn=W("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=W("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ib=W("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bb=W("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=W("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ub=W("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=W("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $b=W("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sc=W("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hb=W("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wb=W("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=W("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=W("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ay=W("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kb=W("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);function ly(e,t){return function(){return e.apply(t,arguments)}}const{toString:qb}=Object.prototype,{getPrototypeOf:bc}=Object,{iterator:Uo,toStringTag:uy}=Symbol,$o=(e=>t=>{const n=qb.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),gt=e=>(e=e.toLowerCase(),t=>$o(t)===e),Ho=e=>t=>typeof t===e,{isArray:Dr}=Array,Nr=Ho("undefined");function Hi(e){return e!==null&&!Nr(e)&&e.constructor!==null&&!Nr(e.constructor)&&Ve(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const cy=gt("ArrayBuffer");function Gb(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&cy(e.buffer),t}const Yb=Ho("string"),Ve=Ho("function"),dy=Ho("number"),Wi=e=>e!==null&&typeof e=="object",Qb=e=>e===!0||e===!1,As=e=>{if($o(e)!=="object")return!1;const t=bc(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(uy in e)&&!(Uo in e)},Xb=e=>{if(!Wi(e)||Hi(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Jb=gt("Date"),Zb=gt("File"),ej=gt("Blob"),tj=gt("FileList"),nj=e=>Wi(e)&&Ve(e.pipe),rj=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Ve(e.append)&&((t=$o(e))==="formdata"||t==="object"&&Ve(e.toString)&&e.toString()==="[object FormData]"))},ij=gt("URLSearchParams"),[sj,oj,aj,lj]=["ReadableStream","Request","Response","Headers"].map(gt),uj=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ki(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,i;if(typeof e!="object"&&(e=[e]),Dr(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(Hi(e))return;const s=n?Object.getOwnPropertyNames(e):Object.keys(e),o=s.length;let a;for(r=0;r<o;r++)a=s[r],t.call(null,e[a],a,e)}}function fy(e,t){if(Hi(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}const Ln=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,py=e=>!Nr(e)&&e!==Ln;function Gl(){const{caseless:e,skipUndefined:t}=py(this)&&this||{},n={},r=(i,s)=>{const o=e&&fy(n,s)||s;As(n[o])&&As(i)?n[o]=Gl(n[o],i):As(i)?n[o]=Gl({},i):Dr(i)?n[o]=i.slice():(!t||!Nr(i))&&(n[o]=i)};for(let i=0,s=arguments.length;i<s;i++)arguments[i]&&Ki(arguments[i],r);return n}const cj=(e,t,n,{allOwnKeys:r}={})=>(Ki(t,(i,s)=>{n&&Ve(i)?e[s]=ly(i,n):e[s]=i},{allOwnKeys:r}),e),dj=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),fj=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},pj=(e,t,n,r)=>{let i,s,o;const a={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),s=i.length;s-- >0;)o=i[s],(!r||r(o,e,t))&&!a[o]&&(t[o]=e[o],a[o]=!0);e=n!==!1&&bc(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},hj=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},mj=e=>{if(!e)return null;if(Dr(e))return e;let t=e.length;if(!dy(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},gj=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&bc(Uint8Array)),yj=(e,t)=>{const r=(e&&e[Uo]).call(e);let i;for(;(i=r.next())&&!i.done;){const s=i.value;t.call(e,s[0],s[1])}},vj=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},xj=gt("HTMLFormElement"),wj=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,i){return r.toUpperCase()+i}),Jf=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Sj=gt("RegExp"),hy=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Ki(n,(i,s)=>{let o;(o=t(i,s,e))!==!1&&(r[s]=o||i)}),Object.defineProperties(e,r)},bj=e=>{hy(e,(t,n)=>{if(Ve(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(Ve(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},jj=(e,t)=>{const n={},r=i=>{i.forEach(s=>{n[s]=!0})};return Dr(e)?r(e):r(String(e).split(t)),n},kj=()=>{},Cj=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Pj(e){return!!(e&&Ve(e.append)&&e[uy]==="FormData"&&e[Uo])}const Nj=e=>{const t=new Array(10),n=(r,i)=>{if(Wi(r)){if(t.indexOf(r)>=0)return;if(Hi(r))return r;if(!("toJSON"in r)){t[i]=r;const s=Dr(r)?[]:{};return Ki(r,(o,a)=>{const l=n(o,i+1);!Nr(l)&&(s[a]=l)}),t[i]=void 0,s}}return r};return n(e,0)},Tj=gt("AsyncFunction"),Ej=e=>e&&(Wi(e)||Ve(e))&&Ve(e.then)&&Ve(e.catch),my=((e,t)=>e?setImmediate:t?((n,r)=>(Ln.addEventListener("message",({source:i,data:s})=>{i===Ln&&s===n&&r.length&&r.shift()()},!1),i=>{r.push(i),Ln.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Ve(Ln.postMessage)),Rj=typeof queueMicrotask<"u"?queueMicrotask.bind(Ln):typeof process<"u"&&process.nextTick||my,Lj=e=>e!=null&&Ve(e[Uo]),j={isArray:Dr,isArrayBuffer:cy,isBuffer:Hi,isFormData:rj,isArrayBufferView:Gb,isString:Yb,isNumber:dy,isBoolean:Qb,isObject:Wi,isPlainObject:As,isEmptyObject:Xb,isReadableStream:sj,isRequest:oj,isResponse:aj,isHeaders:lj,isUndefined:Nr,isDate:Jb,isFile:Zb,isBlob:ej,isRegExp:Sj,isFunction:Ve,isStream:nj,isURLSearchParams:ij,isTypedArray:gj,isFileList:tj,forEach:Ki,merge:Gl,extend:cj,trim:uj,stripBOM:dj,inherits:fj,toFlatObject:pj,kindOf:$o,kindOfTest:gt,endsWith:hj,toArray:mj,forEachEntry:yj,matchAll:vj,isHTMLForm:xj,hasOwnProperty:Jf,hasOwnProp:Jf,reduceDescriptors:hy,freezeMethods:bj,toObjectSet:jj,toCamelCase:wj,noop:kj,toFiniteNumber:Cj,findKey:fy,global:Ln,isContextDefined:py,isSpecCompliantForm:Pj,toJSONObject:Nj,isAsyncFn:Tj,isThenable:Ej,setImmediate:my,asap:Rj,isIterable:Lj};function F(e,t,n,r,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status?i.status:null)}j.inherits(F,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:j.toJSONObject(this.config),code:this.code,status:this.status}}});const gy=F.prototype,yy={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{yy[e]={value:e}});Object.defineProperties(F,yy);Object.defineProperty(gy,"isAxiosError",{value:!0});F.from=(e,t,n,r,i,s)=>{const o=Object.create(gy);j.toFlatObject(e,o,function(d){return d!==Error.prototype},c=>c!=="isAxiosError");const a=e&&e.message?e.message:"Error",l=t==null&&e?e.code:t;return F.call(o,a,l,n,r,i),e&&o.cause==null&&Object.defineProperty(o,"cause",{value:e,configurable:!0}),o.name=e&&e.name||"Error",s&&Object.assign(o,s),o};const Aj=null;function Yl(e){return j.isPlainObject(e)||j.isArray(e)}function vy(e){return j.endsWith(e,"[]")?e.slice(0,-2):e}function Zf(e,t,n){return e?e.concat(t).map(function(i,s){return i=vy(i),!n&&s?"["+i+"]":i}).join(n?".":""):t}function Dj(e){return j.isArray(e)&&!e.some(Yl)}const Mj=j.toFlatObject(j,{},null,function(t){return/^is[A-Z]/.test(t)});function Wo(e,t,n){if(!j.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=j.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,w){return!j.isUndefined(w[v])});const r=n.metaTokens,i=n.visitor||d,s=n.dots,o=n.indexes,l=(n.Blob||typeof Blob<"u"&&Blob)&&j.isSpecCompliantForm(t);if(!j.isFunction(i))throw new TypeError("visitor must be a function");function c(m){if(m===null)return"";if(j.isDate(m))return m.toISOString();if(j.isBoolean(m))return m.toString();if(!l&&j.isBlob(m))throw new F("Blob is not supported. Use a Buffer instead.");return j.isArrayBuffer(m)||j.isTypedArray(m)?l&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function d(m,v,w){let x=m;if(m&&!w&&typeof m=="object"){if(j.endsWith(v,"{}"))v=r?v:v.slice(0,-2),m=JSON.stringify(m);else if(j.isArray(m)&&Dj(m)||(j.isFileList(m)||j.endsWith(v,"[]"))&&(x=j.toArray(m)))return v=vy(v),x.forEach(function(g,b){!(j.isUndefined(g)||g===null)&&t.append(o===!0?Zf([v],b,s):o===null?v:v+"[]",c(g))}),!1}return Yl(m)?!0:(t.append(Zf(w,v,s),c(m)),!1)}const f=[],p=Object.assign(Mj,{defaultVisitor:d,convertValue:c,isVisitable:Yl});function y(m,v){if(!j.isUndefined(m)){if(f.indexOf(m)!==-1)throw Error("Circular reference detected in "+v.join("."));f.push(m),j.forEach(m,function(x,h){(!(j.isUndefined(x)||x===null)&&i.call(t,x,j.isString(h)?h.trim():h,v,p))===!0&&y(x,v?v.concat(h):[h])}),f.pop()}}if(!j.isObject(e))throw new TypeError("data must be an object");return y(e),t}function ep(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function jc(e,t){this._pairs=[],e&&Wo(e,this,t)}const xy=jc.prototype;xy.append=function(t,n){this._pairs.push([t,n])};xy.toString=function(t){const n=t?function(r){return t.call(this,r,ep)}:ep;return this._pairs.map(function(i){return n(i[0])+"="+n(i[1])},"").join("&")};function Oj(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function wy(e,t,n){if(!t)return e;const r=n&&n.encode||Oj;j.isFunction(n)&&(n={serialize:n});const i=n&&n.serialize;let s;if(i?s=i(t,n):s=j.isURLSearchParams(t)?t.toString():new jc(t,n).toString(r),s){const o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class tp{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){j.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Sy={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},_j=typeof URLSearchParams<"u"?URLSearchParams:jc,zj=typeof FormData<"u"?FormData:null,Fj=typeof Blob<"u"?Blob:null,Vj={isBrowser:!0,classes:{URLSearchParams:_j,FormData:zj,Blob:Fj},protocols:["http","https","file","blob","url","data"]},kc=typeof window<"u"&&typeof document<"u",Ql=typeof navigator=="object"&&navigator||void 0,Ij=kc&&(!Ql||["ReactNative","NativeScript","NS"].indexOf(Ql.product)<0),Bj=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Uj=kc&&window.location.href||"http://localhost",$j=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:kc,hasStandardBrowserEnv:Ij,hasStandardBrowserWebWorkerEnv:Bj,navigator:Ql,origin:Uj},Symbol.toStringTag,{value:"Module"})),je={...$j,...Vj};function Hj(e,t){return Wo(e,new je.classes.URLSearchParams,{visitor:function(n,r,i,s){return je.isNode&&j.isBuffer(n)?(this.append(r,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)},...t})}function Wj(e){return j.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Kj(e){const t={},n=Object.keys(e);let r;const i=n.length;let s;for(r=0;r<i;r++)s=n[r],t[s]=e[s];return t}function by(e){function t(n,r,i,s){let o=n[s++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),l=s>=n.length;return o=!o&&j.isArray(i)?i.length:o,l?(j.hasOwnProp(i,o)?i[o]=[i[o],r]:i[o]=r,!a):((!i[o]||!j.isObject(i[o]))&&(i[o]=[]),t(n,r,i[o],s)&&j.isArray(i[o])&&(i[o]=Kj(i[o])),!a)}if(j.isFormData(e)&&j.isFunction(e.entries)){const n={};return j.forEachEntry(e,(r,i)=>{t(Wj(r),i,n,0)}),n}return null}function qj(e,t,n){if(j.isString(e))try{return(t||JSON.parse)(e),j.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const qi={transitional:Sy,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",i=r.indexOf("application/json")>-1,s=j.isObject(t);if(s&&j.isHTMLForm(t)&&(t=new FormData(t)),j.isFormData(t))return i?JSON.stringify(by(t)):t;if(j.isArrayBuffer(t)||j.isBuffer(t)||j.isStream(t)||j.isFile(t)||j.isBlob(t)||j.isReadableStream(t))return t;if(j.isArrayBufferView(t))return t.buffer;if(j.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let a;if(s){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Hj(t,this.formSerializer).toString();if((a=j.isFileList(t))||r.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return Wo(a?{"files[]":t}:t,l&&new l,this.formSerializer)}}return s||i?(n.setContentType("application/json",!1),qj(t)):t}],transformResponse:[function(t){const n=this.transitional||qi.transitional,r=n&&n.forcedJSONParsing,i=this.responseType==="json";if(j.isResponse(t)||j.isReadableStream(t))return t;if(t&&j.isString(t)&&(r&&!this.responseType||i)){const o=!(n&&n.silentJSONParsing)&&i;try{return JSON.parse(t,this.parseReviver)}catch(a){if(o)throw a.name==="SyntaxError"?F.from(a,F.ERR_BAD_RESPONSE,this,null,this.response):a}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:je.classes.FormData,Blob:je.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};j.forEach(["delete","get","head","post","put","patch"],e=>{qi.headers[e]={}});const Gj=j.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Yj=e=>{const t={};let n,r,i;return e&&e.split(`
`).forEach(function(o){i=o.indexOf(":"),n=o.substring(0,i).trim().toLowerCase(),r=o.substring(i+1).trim(),!(!n||t[n]&&Gj[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},np=Symbol("internals");function Kr(e){return e&&String(e).trim().toLowerCase()}function Ds(e){return e===!1||e==null?e:j.isArray(e)?e.map(Ds):String(e)}function Qj(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Xj=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Oa(e,t,n,r,i){if(j.isFunction(r))return r.call(this,t,n);if(i&&(t=n),!!j.isString(t)){if(j.isString(r))return t.indexOf(r)!==-1;if(j.isRegExp(r))return r.test(t)}}function Jj(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Zj(e,t){const n=j.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(i,s,o){return this[r].call(this,t,i,s,o)},configurable:!0})})}let Ie=class{constructor(t){t&&this.set(t)}set(t,n,r){const i=this;function s(a,l,c){const d=Kr(l);if(!d)throw new Error("header name must be a non-empty string");const f=j.findKey(i,d);(!f||i[f]===void 0||c===!0||c===void 0&&i[f]!==!1)&&(i[f||l]=Ds(a))}const o=(a,l)=>j.forEach(a,(c,d)=>s(c,d,l));if(j.isPlainObject(t)||t instanceof this.constructor)o(t,n);else if(j.isString(t)&&(t=t.trim())&&!Xj(t))o(Yj(t),n);else if(j.isObject(t)&&j.isIterable(t)){let a={},l,c;for(const d of t){if(!j.isArray(d))throw TypeError("Object iterator must return a key-value pair");a[c=d[0]]=(l=a[c])?j.isArray(l)?[...l,d[1]]:[l,d[1]]:d[1]}o(a,n)}else t!=null&&s(n,t,r);return this}get(t,n){if(t=Kr(t),t){const r=j.findKey(this,t);if(r){const i=this[r];if(!n)return i;if(n===!0)return Qj(i);if(j.isFunction(n))return n.call(this,i,r);if(j.isRegExp(n))return n.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Kr(t),t){const r=j.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Oa(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let i=!1;function s(o){if(o=Kr(o),o){const a=j.findKey(r,o);a&&(!n||Oa(r,r[a],a,n))&&(delete r[a],i=!0)}}return j.isArray(t)?t.forEach(s):s(t),i}clear(t){const n=Object.keys(this);let r=n.length,i=!1;for(;r--;){const s=n[r];(!t||Oa(this,this[s],s,t,!0))&&(delete this[s],i=!0)}return i}normalize(t){const n=this,r={};return j.forEach(this,(i,s)=>{const o=j.findKey(r,s);if(o){n[o]=Ds(i),delete n[s];return}const a=t?Jj(s):String(s).trim();a!==s&&delete n[s],n[a]=Ds(i),r[a]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return j.forEach(this,(r,i)=>{r!=null&&r!==!1&&(n[i]=t&&j.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(i=>r.set(i)),r}static accessor(t){const r=(this[np]=this[np]={accessors:{}}).accessors,i=this.prototype;function s(o){const a=Kr(o);r[a]||(Zj(i,o),r[a]=!0)}return j.isArray(t)?t.forEach(s):s(t),this}};Ie.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);j.reduceDescriptors(Ie.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});j.freezeMethods(Ie);function _a(e,t){const n=this||qi,r=t||n,i=Ie.from(r.headers);let s=r.data;return j.forEach(e,function(a){s=a.call(n,s,i.normalize(),t?t.status:void 0)}),i.normalize(),s}function jy(e){return!!(e&&e.__CANCEL__)}function Mr(e,t,n){F.call(this,e??"canceled",F.ERR_CANCELED,t,n),this.name="CanceledError"}j.inherits(Mr,F,{__CANCEL__:!0});function ky(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new F("Request failed with status code "+n.status,[F.ERR_BAD_REQUEST,F.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function ek(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function tk(e,t){e=e||10;const n=new Array(e),r=new Array(e);let i=0,s=0,o;return t=t!==void 0?t:1e3,function(l){const c=Date.now(),d=r[s];o||(o=c),n[i]=l,r[i]=c;let f=s,p=0;for(;f!==i;)p+=n[f++],f=f%e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),c-o<t)return;const y=d&&c-d;return y?Math.round(p*1e3/y):void 0}}function nk(e,t){let n=0,r=1e3/t,i,s;const o=(c,d=Date.now())=>{n=d,i=null,s&&(clearTimeout(s),s=null),e(...c)};return[(...c)=>{const d=Date.now(),f=d-n;f>=r?o(c,d):(i=c,s||(s=setTimeout(()=>{s=null,o(i)},r-f)))},()=>i&&o(i)]}const mo=(e,t,n=3)=>{let r=0;const i=tk(50,250);return nk(s=>{const o=s.loaded,a=s.lengthComputable?s.total:void 0,l=o-r,c=i(l),d=o<=a;r=o;const f={loaded:o,total:a,progress:a?o/a:void 0,bytes:l,rate:c||void 0,estimated:c&&a&&d?(a-o)/c:void 0,event:s,lengthComputable:a!=null,[t?"download":"upload"]:!0};e(f)},n)},rp=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},ip=e=>(...t)=>j.asap(()=>e(...t)),rk=je.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,je.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(je.origin),je.navigator&&/(msie|trident)/i.test(je.navigator.userAgent)):()=>!0,ik=je.hasStandardBrowserEnv?{write(e,t,n,r,i,s,o){if(typeof document>"u")return;const a=[`${e}=${encodeURIComponent(t)}`];j.isNumber(n)&&a.push(`expires=${new Date(n).toUTCString()}`),j.isString(r)&&a.push(`path=${r}`),j.isString(i)&&a.push(`domain=${i}`),s===!0&&a.push("secure"),j.isString(o)&&a.push(`SameSite=${o}`),document.cookie=a.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function sk(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function ok(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Cy(e,t,n){let r=!sk(t);return e&&(r||n==!1)?ok(e,t):t}const sp=e=>e instanceof Ie?{...e}:e;function Un(e,t){t=t||{};const n={};function r(c,d,f,p){return j.isPlainObject(c)&&j.isPlainObject(d)?j.merge.call({caseless:p},c,d):j.isPlainObject(d)?j.merge({},d):j.isArray(d)?d.slice():d}function i(c,d,f,p){if(j.isUndefined(d)){if(!j.isUndefined(c))return r(void 0,c,f,p)}else return r(c,d,f,p)}function s(c,d){if(!j.isUndefined(d))return r(void 0,d)}function o(c,d){if(j.isUndefined(d)){if(!j.isUndefined(c))return r(void 0,c)}else return r(void 0,d)}function a(c,d,f){if(f in t)return r(c,d);if(f in e)return r(void 0,c)}const l={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(c,d,f)=>i(sp(c),sp(d),f,!0)};return j.forEach(Object.keys({...e,...t}),function(d){const f=l[d]||i,p=f(e[d],t[d],d);j.isUndefined(p)&&f!==a||(n[d]=p)}),n}const Py=e=>{const t=Un({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:i,xsrfCookieName:s,headers:o,auth:a}=t;if(t.headers=o=Ie.from(o),t.url=wy(Cy(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),a&&o.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):""))),j.isFormData(n)){if(je.hasStandardBrowserEnv||je.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if(j.isFunction(n.getHeaders)){const l=n.getHeaders(),c=["content-type","content-length"];Object.entries(l).forEach(([d,f])=>{c.includes(d.toLowerCase())&&o.set(d,f)})}}if(je.hasStandardBrowserEnv&&(r&&j.isFunction(r)&&(r=r(t)),r||r!==!1&&rk(t.url))){const l=i&&s&&ik.read(s);l&&o.set(i,l)}return t},ak=typeof XMLHttpRequest<"u",lk=ak&&function(e){return new Promise(function(n,r){const i=Py(e);let s=i.data;const o=Ie.from(i.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:c}=i,d,f,p,y,m;function v(){y&&y(),m&&m(),i.cancelToken&&i.cancelToken.unsubscribe(d),i.signal&&i.signal.removeEventListener("abort",d)}let w=new XMLHttpRequest;w.open(i.method.toUpperCase(),i.url,!0),w.timeout=i.timeout;function x(){if(!w)return;const g=Ie.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders()),k={data:!a||a==="text"||a==="json"?w.responseText:w.response,status:w.status,statusText:w.statusText,headers:g,config:e,request:w};ky(function(C){n(C),v()},function(C){r(C),v()},k),w=null}"onloadend"in w?w.onloadend=x:w.onreadystatechange=function(){!w||w.readyState!==4||w.status===0&&!(w.responseURL&&w.responseURL.indexOf("file:")===0)||setTimeout(x)},w.onabort=function(){w&&(r(new F("Request aborted",F.ECONNABORTED,e,w)),w=null)},w.onerror=function(b){const k=b&&b.message?b.message:"Network Error",T=new F(k,F.ERR_NETWORK,e,w);T.event=b||null,r(T),w=null},w.ontimeout=function(){let b=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const k=i.transitional||Sy;i.timeoutErrorMessage&&(b=i.timeoutErrorMessage),r(new F(b,k.clarifyTimeoutError?F.ETIMEDOUT:F.ECONNABORTED,e,w)),w=null},s===void 0&&o.setContentType(null),"setRequestHeader"in w&&j.forEach(o.toJSON(),function(b,k){w.setRequestHeader(k,b)}),j.isUndefined(i.withCredentials)||(w.withCredentials=!!i.withCredentials),a&&a!=="json"&&(w.responseType=i.responseType),c&&([p,m]=mo(c,!0),w.addEventListener("progress",p)),l&&w.upload&&([f,y]=mo(l),w.upload.addEventListener("progress",f),w.upload.addEventListener("loadend",y)),(i.cancelToken||i.signal)&&(d=g=>{w&&(r(!g||g.type?new Mr(null,e,w):g),w.abort(),w=null)},i.cancelToken&&i.cancelToken.subscribe(d),i.signal&&(i.signal.aborted?d():i.signal.addEventListener("abort",d)));const h=ek(i.url);if(h&&je.protocols.indexOf(h)===-1){r(new F("Unsupported protocol "+h+":",F.ERR_BAD_REQUEST,e));return}w.send(s||null)})},uk=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,i;const s=function(c){if(!i){i=!0,a();const d=c instanceof Error?c:this.reason;r.abort(d instanceof F?d:new Mr(d instanceof Error?d.message:d))}};let o=t&&setTimeout(()=>{o=null,s(new F(`timeout ${t} of ms exceeded`,F.ETIMEDOUT))},t);const a=()=>{e&&(o&&clearTimeout(o),o=null,e.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),e=null)};e.forEach(c=>c.addEventListener("abort",s));const{signal:l}=r;return l.unsubscribe=()=>j.asap(a),l}},ck=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},dk=async function*(e,t){for await(const n of fk(e))yield*ck(n,t)},fk=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},op=(e,t,n,r)=>{const i=dk(e,t);let s=0,o,a=l=>{o||(o=!0,r&&r(l))};return new ReadableStream({async pull(l){try{const{done:c,value:d}=await i.next();if(c){a(),l.close();return}let f=d.byteLength;if(n){let p=s+=f;n(p)}l.enqueue(new Uint8Array(d))}catch(c){throw a(c),c}},cancel(l){return a(l),i.return()}},{highWaterMark:2})},ap=64*1024,{isFunction:gs}=j,pk=(({Request:e,Response:t})=>({Request:e,Response:t}))(j.global),{ReadableStream:lp,TextEncoder:up}=j.global,cp=(e,...t)=>{try{return!!e(...t)}catch{return!1}},hk=e=>{e=j.merge.call({skipUndefined:!0},pk,e);const{fetch:t,Request:n,Response:r}=e,i=t?gs(t):typeof fetch=="function",s=gs(n),o=gs(r);if(!i)return!1;const a=i&&gs(lp),l=i&&(typeof up=="function"?(m=>v=>m.encode(v))(new up):async m=>new Uint8Array(await new n(m).arrayBuffer())),c=s&&a&&cp(()=>{let m=!1;const v=new n(je.origin,{body:new lp,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!v}),d=o&&a&&cp(()=>j.isReadableStream(new r("").body)),f={stream:d&&(m=>m.body)};i&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!f[m]&&(f[m]=(v,w)=>{let x=v&&v[m];if(x)return x.call(v);throw new F(`Response type '${m}' is not supported`,F.ERR_NOT_SUPPORT,w)})});const p=async m=>{if(m==null)return 0;if(j.isBlob(m))return m.size;if(j.isSpecCompliantForm(m))return(await new n(je.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(j.isArrayBufferView(m)||j.isArrayBuffer(m))return m.byteLength;if(j.isURLSearchParams(m)&&(m=m+""),j.isString(m))return(await l(m)).byteLength},y=async(m,v)=>{const w=j.toFiniteNumber(m.getContentLength());return w??p(v)};return async m=>{let{url:v,method:w,data:x,signal:h,cancelToken:g,timeout:b,onDownloadProgress:k,onUploadProgress:T,responseType:C,headers:P,withCredentials:A="same-origin",fetchOptions:M}=Py(m),ie=t||fetch;C=C?(C+"").toLowerCase():"text";let ne=uk([h,g&&g.toAbortSignal()],b),se=null;const K=ne&&ne.unsubscribe&&(()=>{ne.unsubscribe()});let ot;try{if(T&&c&&w!=="get"&&w!=="head"&&(ot=await y(P,x))!==0){let D=new n(v,{method:"POST",body:x,duplex:"half"}),$;if(j.isFormData(x)&&($=D.headers.get("content-type"))&&P.setContentType($),D.body){const[at,Te]=rp(ot,mo(ip(T)));x=op(D.body,ap,at,Te)}}j.isString(A)||(A=A?"include":"omit");const U=s&&"credentials"in n.prototype,Ne={...M,signal:ne,method:w.toUpperCase(),headers:P.normalize().toJSON(),body:x,duplex:"half",credentials:U?A:void 0};se=s&&new n(v,Ne);let E=await(s?ie(se,M):ie(v,Ne));const O=d&&(C==="stream"||C==="response");if(d&&(k||O&&K)){const D={};["status","statusText","headers"].forEach(Ct=>{D[Ct]=E[Ct]});const $=j.toFiniteNumber(E.headers.get("content-length")),[at,Te]=k&&rp($,mo(ip(k),!0))||[];E=new r(op(E.body,ap,at,()=>{Te&&Te(),K&&K()}),D)}C=C||"text";let z=await f[j.findKey(f,C)||"text"](E,m);return!O&&K&&K(),await new Promise((D,$)=>{ky(D,$,{data:z,headers:Ie.from(E.headers),status:E.status,statusText:E.statusText,config:m,request:se})})}catch(U){throw K&&K(),U&&U.name==="TypeError"&&/Load failed|fetch/i.test(U.message)?Object.assign(new F("Network Error",F.ERR_NETWORK,m,se),{cause:U.cause||U}):F.from(U,U&&U.code,m,se)}}},mk=new Map,Ny=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:i}=t,s=[r,i,n];let o=s.length,a=o,l,c,d=mk;for(;a--;)l=s[a],c=d.get(l),c===void 0&&d.set(l,c=a?new Map:hk(t)),d=c;return c};Ny();const Cc={http:Aj,xhr:lk,fetch:{get:Ny}};j.forEach(Cc,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const dp=e=>`- ${e}`,gk=e=>j.isFunction(e)||e===null||e===!1;function yk(e,t){e=j.isArray(e)?e:[e];const{length:n}=e;let r,i;const s={};for(let o=0;o<n;o++){r=e[o];let a;if(i=r,!gk(r)&&(i=Cc[(a=String(r)).toLowerCase()],i===void 0))throw new F(`Unknown adapter '${a}'`);if(i&&(j.isFunction(i)||(i=i.get(t))))break;s[a||"#"+o]=i}if(!i){const o=Object.entries(s).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build"));let a=n?o.length>1?`since :
`+o.map(dp).join(`
`):" "+dp(o[0]):"as no adapter specified";throw new F("There is no suitable adapter to dispatch the request "+a,"ERR_NOT_SUPPORT")}return i}const Ty={getAdapter:yk,adapters:Cc};function za(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Mr(null,e)}function fp(e){return za(e),e.headers=Ie.from(e.headers),e.data=_a.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ty.getAdapter(e.adapter||qi.adapter,e)(e).then(function(r){return za(e),r.data=_a.call(e,e.transformResponse,r),r.headers=Ie.from(r.headers),r},function(r){return jy(r)||(za(e),r&&r.response&&(r.response.data=_a.call(e,e.transformResponse,r.response),r.response.headers=Ie.from(r.response.headers))),Promise.reject(r)})}const Ey="1.13.2",Ko={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ko[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const pp={};Ko.transitional=function(t,n,r){function i(s,o){return"[Axios v"+Ey+"] Transitional option '"+s+"'"+o+(r?". "+r:"")}return(s,o,a)=>{if(t===!1)throw new F(i(o," has been removed"+(n?" in "+n:"")),F.ERR_DEPRECATED);return n&&!pp[o]&&(pp[o]=!0,console.warn(i(o," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(s,o,a):!0}};Ko.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function vk(e,t,n){if(typeof e!="object")throw new F("options must be an object",F.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const s=r[i],o=t[s];if(o){const a=e[s],l=a===void 0||o(a,s,e);if(l!==!0)throw new F("option "+s+" must be "+l,F.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new F("Unknown option "+s,F.ERR_BAD_OPTION)}}const Ms={assertOptions:vk,validators:Ko},vt=Ms.validators;let On=class{constructor(t){this.defaults=t||{},this.interceptors={request:new tp,response:new tp}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const s=i.stack?i.stack.replace(/^.+\n/,""):"";try{r.stack?s&&!String(r.stack).endsWith(s.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+s):r.stack=s}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Un(this.defaults,n);const{transitional:r,paramsSerializer:i,headers:s}=n;r!==void 0&&Ms.assertOptions(r,{silentJSONParsing:vt.transitional(vt.boolean),forcedJSONParsing:vt.transitional(vt.boolean),clarifyTimeoutError:vt.transitional(vt.boolean)},!1),i!=null&&(j.isFunction(i)?n.paramsSerializer={serialize:i}:Ms.assertOptions(i,{encode:vt.function,serialize:vt.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Ms.assertOptions(n,{baseUrl:vt.spelling("baseURL"),withXsrfToken:vt.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=s&&j.merge(s.common,s[n.method]);s&&j.forEach(["delete","get","head","post","put","patch","common"],m=>{delete s[m]}),n.headers=Ie.concat(o,s);const a=[];let l=!0;this.interceptors.request.forEach(function(v){typeof v.runWhen=="function"&&v.runWhen(n)===!1||(l=l&&v.synchronous,a.unshift(v.fulfilled,v.rejected))});const c=[];this.interceptors.response.forEach(function(v){c.push(v.fulfilled,v.rejected)});let d,f=0,p;if(!l){const m=[fp.bind(this),void 0];for(m.unshift(...a),m.push(...c),p=m.length,d=Promise.resolve(n);f<p;)d=d.then(m[f++],m[f++]);return d}p=a.length;let y=n;for(;f<p;){const m=a[f++],v=a[f++];try{y=m(y)}catch(w){v.call(this,w);break}}try{d=fp.call(this,y)}catch(m){return Promise.reject(m)}for(f=0,p=c.length;f<p;)d=d.then(c[f++],c[f++]);return d}getUri(t){t=Un(this.defaults,t);const n=Cy(t.baseURL,t.url,t.allowAbsoluteUrls);return wy(n,t.params,t.paramsSerializer)}};j.forEach(["delete","get","head","options"],function(t){On.prototype[t]=function(n,r){return this.request(Un(r||{},{method:t,url:n,data:(r||{}).data}))}});j.forEach(["post","put","patch"],function(t){function n(r){return function(s,o,a){return this.request(Un(a||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}On.prototype[t]=n(),On.prototype[t+"Form"]=n(!0)});let xk=class Ry{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const r=this;this.promise.then(i=>{if(!r._listeners)return;let s=r._listeners.length;for(;s-- >0;)r._listeners[s](i);r._listeners=null}),this.promise.then=i=>{let s;const o=new Promise(a=>{r.subscribe(a),s=a}).then(i);return o.cancel=function(){r.unsubscribe(s)},o},t(function(s,o,a){r.reason||(r.reason=new Mr(s,o,a),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ry(function(i){t=i}),cancel:t}}};function wk(e){return function(n){return e.apply(null,n)}}function Sk(e){return j.isObject(e)&&e.isAxiosError===!0}const Xl={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Xl).forEach(([e,t])=>{Xl[t]=e});function Ly(e){const t=new On(e),n=ly(On.prototype.request,t);return j.extend(n,On.prototype,t,{allOwnKeys:!0}),j.extend(n,t,null,{allOwnKeys:!0}),n.create=function(i){return Ly(Un(e,i))},n}const ue=Ly(qi);ue.Axios=On;ue.CanceledError=Mr;ue.CancelToken=xk;ue.isCancel=jy;ue.VERSION=Ey;ue.toFormData=Wo;ue.AxiosError=F;ue.Cancel=ue.CanceledError;ue.all=function(t){return Promise.all(t)};ue.spread=wk;ue.isAxiosError=Sk;ue.mergeConfig=Un;ue.AxiosHeaders=Ie;ue.formToJSON=e=>by(j.isHTMLForm(e)?new FormData(e):e);ue.getAdapter=Ty.getAdapter;ue.HttpStatusCode=Xl;ue.default=ue;const{Axios:Yk,AxiosError:Qk,CanceledError:Xk,isCancel:Jk,CancelToken:Zk,VERSION:eC,all:tC,Cancel:nC,isAxiosError:rC,spread:iC,toFormData:sC,AxiosHeaders:oC,HttpStatusCode:aC,formToJSON:lC,getAdapter:uC,mergeConfig:cC}=ue,Ce=ue.create({baseURL:"/api",headers:{"Content-Type":"application/json"}});Ce.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});Ce.interceptors.response.use(e=>e,e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});const Ay=S.createContext(null);function bk({children:e}){const[t,n]=S.useState(null),[r,i]=S.useState(null),[s,o]=S.useState(!0);S.useEffect(()=>{a()},[]);const a=async()=>{if(localStorage.getItem("token"))try{const v=await Ce.get("/auth/me");n(v.data.user),i(v.data.team)}catch{localStorage.removeItem("token")}o(!1)},y={user:t,team:r,loading:s,login:async(m,v)=>{const w=await Ce.post("/auth/login",{email:m,password:v});return localStorage.setItem("token",w.data.token),n(w.data.user),i(w.data.team),w.data},register:async m=>{const v=await Ce.post("/auth/register",m);return localStorage.setItem("token",v.data.token),n(v.data.user),v.data},logout:()=>{localStorage.removeItem("token"),n(null),i(null)},updateUser:m=>{n(v=>({...v,...m}))},updateTeam:m=>{i(m)},isAuthenticated:!!t};return u.jsx(Ay.Provider,{value:y,children:e})}function st(){const e=S.useContext(Ay);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e}function jk(){const[e,t]=S.useState(!1),[n,r]=S.useState(!1),{user:i,logout:s,isAuthenticated:o}=st(),a=It();S.useEffect(()=>{const d=()=>{t(window.scrollY>20)};return window.addEventListener("scroll",d),()=>window.removeEventListener("scroll",d)},[]),S.useEffect(()=>{r(!1)},[a]);const l=[{to:"/listings",label:"Browse Parts",icon:ke},{to:"/teams",label:"Teams",icon:mt}],c=o?[{to:"/dashboard",label:"Dashboard",icon:Vb},{to:"/listings/create",label:"Post Listing",icon:yr},{to:"/profile",label:"Profile",icon:Mi}]:[{to:"/login",label:"Login",icon:oy},{to:"/register",label:"Sign Up",icon:Mi}];return u.jsxs(R.nav,{className:`navbar ${e?"scrolled":""}`,initial:{y:-100},animate:{y:0},transition:{duration:.5,ease:"easeOut"},children:[u.jsxs("div",{className:"navbar-container",children:[u.jsxs(V,{to:"/",className:"logo",children:[u.jsx(R.div,{className:"logo-icon",whileHover:{rotate:180},transition:{duration:.5},children:u.jsx(ke,{size:28})}),u.jsxs("span",{className:"logo-text",children:["FTC",u.jsx("span",{className:"logo-accent",children:"Market"})]})]}),u.jsx("div",{className:"nav-links desktop-only",children:l.map(d=>u.jsxs(V,{to:d.to,className:`nav-link ${a.pathname===d.to?"active":""}`,children:[u.jsx(d.icon,{size:18}),d.label]},d.to))}),u.jsxs("div",{className:"nav-actions desktop-only",children:[c.map(d=>u.jsxs(V,{to:d.to,className:`nav-link ${a.pathname===d.to?"active":""}`,children:[u.jsx(d.icon,{size:18}),d.label]},d.to)),o&&u.jsxs("button",{onClick:s,className:"nav-link logout-btn",children:[u.jsx(Xf,{size:18}),"Logout"]})]}),u.jsx("button",{className:"mobile-menu-btn mobile-only",onClick:()=>r(!n),children:n?u.jsx(ay,{size:24}):u.jsx(Ib,{size:24})})]}),u.jsx(xc,{children:n&&u.jsxs(R.div,{className:"mobile-menu",initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},children:[[...l,...c].map((d,f)=>u.jsx(R.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:f*.1},children:u.jsxs(V,{to:d.to,className:"mobile-link",children:[u.jsx(d.icon,{size:20}),d.label]})},d.to)),o&&u.jsxs(R.button,{onClick:s,className:"mobile-link logout-btn",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:(l.length+c.length)*.1},children:[u.jsx(Xf,{size:20}),"Logout"]})]})}),u.jsx("style",{children:`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(15, 15, 26, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid transparent;
          transition: all var(--transition-base);
        }

        .navbar.scrolled {
          background: rgba(15, 15, 26, 0.95);
          border-bottom-color: var(--border-color);
          box-shadow: var(--shadow-md);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-md);
          color: white;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .logo-accent {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .nav-link.active {
          color: var(--primary);
          background: rgba(245, 124, 0, 0.1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logout-btn {
          color: var(--text-secondary);
        }

        .logout-btn:hover {
          color: #ff4444;
          background: rgba(255, 68, 68, 0.1);
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-menu {
          overflow: hidden;
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          margin-bottom: 4px;
          background: none;
          border: none;
          width: 100%;
          cursor: pointer;
        }

        .mobile-link:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }
      `})]})}function kk(){const e=new Date().getFullYear();return u.jsxs("footer",{className:"footer",children:[u.jsxs("div",{className:"footer-container",children:[u.jsxs("div",{className:"footer-main",children:[u.jsxs("div",{className:"footer-brand",children:[u.jsxs(V,{to:"/",className:"footer-logo",children:[u.jsx("div",{className:"logo-icon",children:u.jsx(ke,{size:24})}),u.jsxs("span",{className:"logo-text",children:["FTC",u.jsx("span",{className:"logo-accent",children:"Market"})]})]}),u.jsx("p",{className:"footer-desc",children:"Connecting FTC teams to share parts, build robots, and strengthen the community."})]}),u.jsxs("div",{className:"footer-links",children:[u.jsxs("div",{className:"footer-col",children:[u.jsx("h4",{children:"Marketplace"}),u.jsx(V,{to:"/listings",children:"Browse Parts"}),u.jsx(V,{to:"/listings?type=have",children:"Available Parts"}),u.jsx(V,{to:"/listings?type=want",children:"Wanted Parts"})]}),u.jsxs("div",{className:"footer-col",children:[u.jsx("h4",{children:"Community"}),u.jsx(V,{to:"/teams",children:"Find Teams"}),u.jsx(V,{to:"/teams/create",children:"Register Team"})]}),u.jsxs("div",{className:"footer-col",children:[u.jsx("h4",{children:"Account"}),u.jsx(V,{to:"/login",children:"Login"}),u.jsx(V,{to:"/register",children:"Sign Up"}),u.jsx(V,{to:"/dashboard",children:"Dashboard"})]})]})]}),u.jsxs(R.div,{className:"footer-bottom",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},children:[u.jsxs("p",{className:"copyright",children:[e," FTC Marketplace. Made with"," ",u.jsx(Fb,{size:14,className:"heart-icon"})," for the FTC community."]}),u.jsx("p",{className:"disclaimer",children:"Not affiliated with FIRST. This is a community project."})]})]}),u.jsx("style",{children:`
        .footer {
          background: var(--secondary);
          border-top: 1px solid var(--border-color);
          padding: 60px 24px 30px;
          margin-top: 80px;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border-color);
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 16px;
        }

        .footer-logo .logo-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-sm);
          color: white;
        }

        .footer-logo .logo-text {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-logo .logo-accent {
          color: var(--primary);
        }

        .footer-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.7;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-col h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-col a {
          display: block;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 10px;
          transition: color var(--transition-fast);
        }

        .footer-col a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          padding-top: 30px;
          text-align: center;
        }

        .copyright {
          font-size: 14px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .heart-icon {
          color: #ff4444;
          animation: pulse 1.5s infinite;
        }

        .disclaimer {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `})]})}function Ck(){return u.jsxs("div",{className:"layout",children:[u.jsx(jk,{}),u.jsx(R.main,{className:"main-content",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},children:u.jsx(r1,{})}),u.jsx(kk,{}),u.jsx("style",{children:`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          padding-top: 80px;
        }
      `})]})}function Pk(){const e={initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:.6}},t={animate:{transition:{staggerChildren:.1}}},n=[{icon:ke,title:"List Your Parts",description:"Post parts you have available or parts you need. Help fellow teams build their robots."},{icon:Sc,title:"Find What You Need",description:"Search by category, location, or team. Filter to find exactly what your robot needs."},{icon:Bb,title:"Connect & Trade",description:"Contact teams directly to arrange trades, loans, or purchases. Build lasting relationships."}],r=[{value:"500+",label:"Active Teams"},{value:"2,000+",label:"Parts Listed"},{value:"50",label:"States"},{value:"100%",label:"Free to Use"}];return u.jsxs("div",{className:"home",children:[u.jsxs("section",{className:"hero",children:[u.jsxs("div",{className:"hero-bg",children:[u.jsx("div",{className:"hero-gradient"}),u.jsx("div",{className:"hero-grid"}),u.jsx(R.div,{className:"hero-orb orb-1",animate:{x:[0,50,0],y:[0,-30,0]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),u.jsx(R.div,{className:"hero-orb orb-2",animate:{x:[0,-40,0],y:[0,40,0]},transition:{duration:10,repeat:1/0,ease:"easeInOut"}})]}),u.jsxs("div",{className:"hero-content container",children:[u.jsxs(R.div,{className:"hero-badge",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.5},children:[u.jsx(Kb,{size:14}),"Built for FTC Teams"]}),u.jsxs(R.h1,{className:"hero-title",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:["Connect Teams.",u.jsx("br",{}),u.jsx("span",{className:"text-gradient",children:"Share Parts."}),u.jsx("br",{}),"Build Together."]}),u.jsx(R.p,{className:"hero-subtitle",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},children:"The marketplace where FTC teams find, trade, and share robot parts. Stop waiting for shipping - connect with nearby teams today."}),u.jsxs(R.div,{className:"hero-actions",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:[u.jsxs(V,{to:"/listings",className:"btn btn-primary btn-lg",children:["Browse Parts",u.jsx(Qf,{size:20})]}),u.jsx(V,{to:"/register",className:"btn btn-secondary btn-lg",children:"Register Your Team"})]}),u.jsx(R.div,{className:"hero-stats",initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.5},children:r.map((i,s)=>u.jsxs(R.div,{className:"stat-item",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6+s*.1},children:[u.jsx("span",{className:"stat-value",children:i.value}),u.jsx("span",{className:"stat-label",children:i.label})]},s))})]})]}),u.jsx("section",{className:"features-section",children:u.jsxs("div",{className:"container",children:[u.jsxs(R.div,{className:"section-header",initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[u.jsx("h2",{children:"How It Works"}),u.jsx("p",{children:"Get your robot built faster with parts from your community"})]}),u.jsx(R.div,{className:"features-grid",variants:t,initial:"initial",whileInView:"animate",viewport:{once:!0},children:n.map((i,s)=>u.jsxs(R.div,{className:"feature-card",variants:e,whileHover:{y:-8,transition:{duration:.2}},children:[u.jsx("div",{className:"feature-icon",children:u.jsx(i.icon,{size:28})}),u.jsx("h3",{children:i.title}),u.jsx("p",{children:i.description})]},s))})]})}),u.jsx("section",{className:"cta-section",children:u.jsx("div",{className:"container",children:u.jsxs(R.div,{className:"cta-card",initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[u.jsxs("div",{className:"cta-content",children:[u.jsx("h2",{children:"Ready to Get Started?"}),u.jsx("p",{children:"Join hundreds of FTC teams already using the marketplace. Register your team and start connecting today."}),u.jsxs("div",{className:"cta-actions",children:[u.jsxs(V,{to:"/register",className:"btn btn-primary btn-lg",children:["Create Account",u.jsx(Qf,{size:20})]}),u.jsx(V,{to:"/listings",className:"btn btn-outline btn-lg",children:"View Listings"})]})]}),u.jsx("div",{className:"cta-visual",children:u.jsx(R.div,{className:"cta-icon-grid",animate:{rotate:360},transition:{duration:60,repeat:1/0,ease:"linear"},children:[...Array(8)].map((i,s)=>u.jsx("div",{className:"floating-icon",style:{transform:`rotate(${s*45}deg) translateX(100px)`},children:u.jsx(ke,{size:24})},s))})})]})})}),u.jsx("style",{children:`
        .home {
          overflow: hidden;
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 60px 0;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, rgba(245, 124, 0, 0.15) 0%, transparent 60%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          top: 10%;
          right: 10%;
          background: rgba(245, 124, 0, 0.2);
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          bottom: 20%;
          left: 5%;
          background: rgba(0, 212, 255, 0.1);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(245, 124, 0, 0.1);
          border: 1px solid rgba(245, 124, 0, 0.3);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(40px, 8vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid var(--border-color);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: var(--primary);
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Features Section */
        .features-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .section-header p {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: all var(--transition-base);
        }

        .feature-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-md);
          color: white;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .feature-card p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 60px 0 100px;
        }

        .cta-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 60px;
          position: relative;
          overflow: hidden;
        }

        .cta-content h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cta-visual {
          position: relative;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-icon-grid {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .floating-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--primary);
        }

        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-card {
            grid-template-columns: 1fr;
            padding: 40px;
          }

          .cta-visual {
            display: none;
          }

          .hero-stats {
            gap: 24px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            letter-spacing: -1px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .hero-actions .btn {
            width: 100%;
          }
        }
      `})]})}function Nk(){var p,y;const[e,t]=S.useState({email:"",password:""}),[n,r]=S.useState(""),[i,s]=S.useState(!1),{login:o}=st(),a=Wn(),c=((y=(p=It().state)==null?void 0:p.from)==null?void 0:y.pathname)||"/dashboard",d=m=>{t(v=>({...v,[m.target.name]:m.target.value})),r("")},f=async m=>{var v,w;m.preventDefault(),s(!0),r("");try{await o(e.email,e.password),a(c,{replace:!0})}catch(x){r(((w=(v=x.response)==null?void 0:v.data)==null?void 0:w.message)||"Invalid email or password")}finally{s(!1)}};return u.jsxs("div",{className:"auth-page",children:[u.jsxs(R.div,{className:"auth-container",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("div",{className:"auth-header",children:[u.jsx(R.div,{className:"auth-icon",initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring"},children:u.jsx(oy,{size:28})}),u.jsx("h1",{children:"Welcome Back"}),u.jsx("p",{children:"Sign in to your FTC Marketplace account"})]}),n&&u.jsxs(R.div,{className:"error-message",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},children:[u.jsx(yn,{size:18}),n]}),u.jsxs("form",{onSubmit:f,className:"auth-form",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Email Address"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Bn,{size:18,className:"input-icon"}),u.jsx("input",{type:"email",name:"email",value:e.email,onChange:d,className:"form-input",placeholder:"you@example.com",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Password"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Rn,{size:18,className:"input-icon"}),u.jsx("input",{type:"password",name:"password",value:e.password,onChange:d,className:"form-input",placeholder:"Enter your password",required:!0})]})]}),u.jsx(R.button,{type:"submit",className:"btn btn-primary btn-lg submit-btn",disabled:i,whileHover:{scale:1.02},whileTap:{scale:.98},children:i?"Signing in...":"Sign In"})]}),u.jsx("div",{className:"auth-footer",children:u.jsxs("p",{children:["Don't have an account?"," ",u.jsx(V,{to:"/register",children:"Create one"})]})})]}),u.jsx("style",{children:`
        .auth-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .auth-container {
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 48px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          margin: 0 auto 20px;
        }

        .auth-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .auth-header p {
          color: var(--text-secondary);
          font-size: 15px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .auth-form {
          margin-bottom: 24px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .input-with-icon .form-input {
          padding-left: 44px;
        }

        .submit-btn {
          width: 100%;
          margin-top: 8px;
        }

        .auth-footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .auth-footer p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 32px 24px;
          }
        }
      `})]})}function Tk(){const[e,t]=S.useState({name:"",email:"",password:"",confirmPassword:""}),[n,r]=S.useState(""),[i,s]=S.useState(!1),{register:o}=st(),a=Wn(),l=p=>{t(y=>({...y,[p.target.name]:p.target.value})),r("")},c=async p=>{var y,m;if(p.preventDefault(),s(!0),r(""),e.password!==e.confirmPassword){r("Passwords do not match"),s(!1);return}if(e.password.length<8){r("Password must be at least 8 characters"),s(!1);return}try{await o({name:e.name,email:e.email,password:e.password}),a("/dashboard")}catch(v){r(((m=(y=v.response)==null?void 0:y.data)==null?void 0:m.message)||"Registration failed. Please try again.")}finally{s(!1)}},f=(()=>{const p=e.password;if(!p)return null;let y=0;return p.length>=8&&y++,p.match(/[a-z]/)&&p.match(/[A-Z]/)&&y++,p.match(/\d/)&&y++,p.match(/[^a-zA-Z\d]/)&&y++,y})();return u.jsxs("div",{className:"auth-page",children:[u.jsxs(R.div,{className:"auth-container",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("div",{className:"auth-header",children:[u.jsx(R.div,{className:"auth-icon",initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring"},children:u.jsx(Wb,{size:28})}),u.jsx("h1",{children:"Create Account"}),u.jsx("p",{children:"Join the FTC Marketplace community"})]}),n&&u.jsxs(R.div,{className:"error-message",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},children:[u.jsx(yn,{size:18}),n]}),u.jsxs("form",{onSubmit:c,className:"auth-form",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Full Name"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Mi,{size:18,className:"input-icon"}),u.jsx("input",{type:"text",name:"name",value:e.name,onChange:l,className:"form-input",placeholder:"Your full name",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Email Address"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Bn,{size:18,className:"input-icon"}),u.jsx("input",{type:"email",name:"email",value:e.email,onChange:l,className:"form-input",placeholder:"you@example.com",required:!0})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Password"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Rn,{size:18,className:"input-icon"}),u.jsx("input",{type:"password",name:"password",value:e.password,onChange:l,className:"form-input",placeholder:"At least 8 characters",required:!0})]}),e.password&&u.jsxs("div",{className:"password-strength",children:[u.jsx("div",{className:"strength-bars",children:[1,2,3,4].map(p=>u.jsx("div",{className:`strength-bar ${f>=p?`level-${f}`:""}`},p))}),u.jsxs("span",{className:"strength-text",children:[f===1&&"Weak",f===2&&"Fair",f===3&&"Good",f===4&&"Strong"]})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Confirm Password"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Rn,{size:18,className:"input-icon"}),u.jsx("input",{type:"password",name:"confirmPassword",value:e.confirmPassword,onChange:l,className:"form-input",placeholder:"Confirm your password",required:!0}),e.confirmPassword&&e.password===e.confirmPassword&&u.jsx(wc,{size:18,className:"input-success"})]})]}),u.jsx(R.button,{type:"submit",className:"btn btn-primary btn-lg submit-btn",disabled:i,whileHover:{scale:1.02},whileTap:{scale:.98},children:i?"Creating Account...":"Create Account"})]}),u.jsx("div",{className:"auth-footer",children:u.jsxs("p",{children:["Already have an account?"," ",u.jsx(V,{to:"/login",children:"Sign in"})]})})]}),u.jsx("style",{children:`
        .auth-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .auth-container {
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 48px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          margin: 0 auto 20px;
        }

        .auth-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .auth-header p {
          color: var(--text-secondary);
          font-size: 15px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .auth-form {
          margin-bottom: 24px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .input-success {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--accent-green);
        }

        .input-with-icon .form-input {
          padding-left: 44px;
        }

        .password-strength {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
        }

        .strength-bars {
          display: flex;
          gap: 4px;
          flex: 1;
        }

        .strength-bar {
          height: 4px;
          flex: 1;
          background: var(--border-color);
          border-radius: 2px;
          transition: background var(--transition-fast);
        }

        .strength-bar.level-1 { background: #ff4444; }
        .strength-bar.level-2 { background: #ffaa00; }
        .strength-bar.level-3 { background: #88cc00; }
        .strength-bar.level-4 { background: var(--accent-green); }

        .strength-text {
          font-size: 12px;
          color: var(--text-muted);
          min-width: 50px;
        }

        .submit-btn {
          width: 100%;
          margin-top: 8px;
        }

        .auth-footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .auth-footer p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 32px 24px;
          }
        }
      `})]})}function Or({fullScreen:e=!1,size:t=40}){const n=u.jsxs("div",{className:"spinner-container",children:[u.jsx(R.div,{className:"spinner",style:{width:t,height:t},animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"},children:u.jsx("div",{className:"spinner-inner"})}),u.jsx("style",{children:`
        .spinner-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-dark);
          z-index: 9999;
        }

        .spinner-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .spinner {
          position: relative;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            var(--primary) 360deg
          );
          mask: radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px));
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px));
        }

        .spinner-inner {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: var(--bg-dark);
        }
      `})]});return e?u.jsx("div",{className:"spinner-wrapper",children:n}):n}function Ek(){var l;const{user:e,team:t}=st(),[n,r]=S.useState([]),[i,s]=S.useState(!0);S.useEffect(()=>{t?o():s(!1)},[t]);const o=async()=>{try{const c=await Ce.get("/listings/my");r(c.data.listings||[])}catch{r(Rk())}finally{s(!1)}},a=async c=>{if(confirm("Are you sure you want to delete this listing?"))try{await Ce.delete(`/listings/${c}`),r(n.filter(d=>d.id!==c))}catch{alert("Failed to delete listing")}};return u.jsxs("div",{className:"dashboard",children:[u.jsxs("div",{className:"container",children:[u.jsxs(R.div,{className:"dashboard-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("h1",{children:["Welcome back, ",((l=e==null?void 0:e.name)==null?void 0:l.split(" ")[0])||"User"]}),u.jsx("p",{children:"Manage your team and listings from here"})]}),u.jsxs("div",{className:"dashboard-grid",children:[u.jsxs(R.div,{className:"dashboard-card team-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[u.jsxs("div",{className:"card-header",children:[u.jsx(mt,{size:20}),u.jsx("h2",{children:"Your Team"})]}),t?u.jsxs("div",{className:"team-info",children:[u.jsxs("div",{className:"team-badge",children:[u.jsxs("span",{className:"team-number",children:["#",t.team_number]}),u.jsx("span",{className:"team-name",children:t.name})]}),u.jsxs("p",{className:"team-location",children:[t.city,", ",t.state]}),u.jsx(V,{to:`/teams/${t.id}`,className:"btn btn-secondary btn-sm",children:"View Team Profile"})]}):u.jsxs("div",{className:"no-team",children:[u.jsx(yn,{size:24}),u.jsx("p",{children:"You're not part of a team yet"}),u.jsxs(V,{to:"/teams/create",className:"btn btn-primary",children:[u.jsx(yr,{size:16}),"Create or Join Team"]})]})]}),u.jsxs(R.div,{className:"dashboard-card actions-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[u.jsxs("div",{className:"card-header",children:[u.jsx(ke,{size:20}),u.jsx("h2",{children:"Quick Actions"})]}),u.jsxs("div",{className:"quick-actions",children:[u.jsxs(V,{to:"/listings/create",className:"action-btn",children:[u.jsx("div",{className:"action-icon have",children:u.jsx(yr,{size:20})}),u.jsx("span",{children:"Post New Listing"})]}),u.jsxs(V,{to:"/listings",className:"action-btn",children:[u.jsx("div",{className:"action-icon browse",children:u.jsx(ke,{size:20})}),u.jsx("span",{children:"Browse Parts"})]}),u.jsxs(V,{to:"/teams",className:"action-btn",children:[u.jsx("div",{className:"action-icon teams",children:u.jsx(mt,{size:20})}),u.jsx("span",{children:"Find Teams"})]})]})]})]}),u.jsxs(R.div,{className:"my-listings-section",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[u.jsxs("div",{className:"section-header",children:[u.jsx("h2",{children:"My Listings"}),t&&u.jsxs(V,{to:"/listings/create",className:"btn btn-primary btn-sm",children:[u.jsx(yr,{size:16}),"New Listing"]})]}),i?u.jsx(Or,{}):t?n.length===0?u.jsxs("div",{className:"empty-state",children:[u.jsx(ke,{size:40}),u.jsx("p",{children:"You haven't created any listings yet"}),u.jsx(V,{to:"/listings/create",className:"btn btn-primary",children:"Create Your First Listing"})]}):u.jsxs("div",{className:"listings-table",children:[u.jsxs("div",{className:"table-header",children:[u.jsx("span",{children:"Title"}),u.jsx("span",{children:"Type"}),u.jsx("span",{children:"Category"}),u.jsx("span",{children:"Posted"}),u.jsx("span",{children:"Actions"})]}),n.map((c,d)=>u.jsxs(R.div,{className:"table-row",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:d*.05},children:[u.jsx("span",{className:"listing-title",children:u.jsx(V,{to:`/listings/${c.id}`,children:c.title})}),u.jsx("span",{children:u.jsx("span",{className:`badge badge-${c.type}`,children:c.type==="have"?"Have":"Want"})}),u.jsx("span",{className:"listing-category",children:c.category}),u.jsx("span",{className:"listing-date",children:new Date(c.created_at).toLocaleDateString()}),u.jsxs("span",{className:"listing-actions",children:[u.jsx(V,{to:`/listings/${c.id}/edit`,className:"action-icon-btn",children:u.jsx(Ub,{size:16})}),u.jsx("button",{className:"action-icon-btn delete",onClick:()=>a(c.id),children:u.jsx(Hb,{size:16})})]})]},c.id))]}):u.jsxs("div",{className:"empty-state",children:[u.jsx(ke,{size:40}),u.jsx("p",{children:"Join a team to start creating listings"})]})]})]}),u.jsx("style",{children:`
        .dashboard {
          padding: 40px 0 80px;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .dashboard-header p {
          color: var(--text-secondary);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .dashboard-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--primary);
        }

        .card-header h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .team-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .team-number {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .team-name {
          font-size: 20px;
          font-weight: 600;
        }

        .team-location {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 16px;
        }

        .no-team {
          text-align: center;
          padding: 20px;
        }

        .no-team svg {
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .no-team p {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .action-btn:hover {
          background: var(--secondary-light);
          transform: translateX(4px);
        }

        .action-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: white;
        }

        .action-icon.have { background: var(--accent-green); }
        .action-icon.browse { background: var(--primary); }
        .action-icon.teams { background: var(--accent-purple); }

        .my-listings-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .empty-state svg {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .empty-state p {
          margin-bottom: 20px;
        }

        .listings-table {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 100px 120px 100px 100px;
          gap: 16px;
          padding: 14px 20px;
          background: var(--bg-dark);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 100px 120px 100px 100px;
          gap: 16px;
          padding: 16px 20px;
          align-items: center;
          border-top: 1px solid var(--border-color);
          transition: background var(--transition-fast);
        }

        .table-row:hover {
          background: var(--bg-dark);
        }

        .listing-title a {
          color: var(--text-primary);
          font-weight: 500;
        }

        .listing-title a:hover {
          color: var(--primary);
        }

        .listing-category {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: capitalize;
        }

        .listing-date {
          font-size: 14px;
          color: var(--text-muted);
        }

        .listing-actions {
          display: flex;
          gap: 8px;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-icon-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        .action-icon-btn.delete:hover {
          color: #ff4444;
          border-color: #ff4444;
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr 80px 80px;
          }

          .table-header span:nth-child(3),
          .table-header span:nth-child(4),
          .table-row span:nth-child(3),
          .table-row span:nth-child(4) {
            display: none;
          }
        }
      `})]})}function Rk(){return[{id:1,title:"REV Robotics HD Hex Motor",type:"have",category:"motors",created_at:new Date().toISOString()},{id:2,title:"Color Sensor V3",type:"have",category:"sensors",created_at:new Date(Date.now()-864e5).toISOString()}]}const Pc=[{value:"AL",label:"Alabama"},{value:"AK",label:"Alaska"},{value:"AZ",label:"Arizona"},{value:"AR",label:"Arkansas"},{value:"CA",label:"California"},{value:"CO",label:"Colorado"},{value:"CT",label:"Connecticut"},{value:"DE",label:"Delaware"},{value:"FL",label:"Florida"},{value:"GA",label:"Georgia"},{value:"HI",label:"Hawaii"},{value:"ID",label:"Idaho"},{value:"IL",label:"Illinois"},{value:"IN",label:"Indiana"},{value:"IA",label:"Iowa"},{value:"KS",label:"Kansas"},{value:"KY",label:"Kentucky"},{value:"LA",label:"Louisiana"},{value:"ME",label:"Maine"},{value:"MD",label:"Maryland"},{value:"MA",label:"Massachusetts"},{value:"MI",label:"Michigan"},{value:"MN",label:"Minnesota"},{value:"MS",label:"Mississippi"},{value:"MO",label:"Missouri"},{value:"MT",label:"Montana"},{value:"NE",label:"Nebraska"},{value:"NV",label:"Nevada"},{value:"NH",label:"New Hampshire"},{value:"NJ",label:"New Jersey"},{value:"NM",label:"New Mexico"},{value:"NY",label:"New York"},{value:"NC",label:"North Carolina"},{value:"ND",label:"North Dakota"},{value:"OH",label:"Ohio"},{value:"OK",label:"Oklahoma"},{value:"OR",label:"Oregon"},{value:"PA",label:"Pennsylvania"},{value:"RI",label:"Rhode Island"},{value:"SC",label:"South Carolina"},{value:"SD",label:"South Dakota"},{value:"TN",label:"Tennessee"},{value:"TX",label:"Texas"},{value:"UT",label:"Utah"},{value:"VT",label:"Vermont"},{value:"VA",label:"Virginia"},{value:"WA",label:"Washington"},{value:"WV",label:"West Virginia"},{value:"WI",label:"Wisconsin"},{value:"WY",label:"Wyoming"},{value:"DC",label:"Washington D.C."}],qo=[{value:"motors",label:"Motors"},{value:"sensors",label:"Sensors"},{value:"structural",label:"Structural Parts"},{value:"electronics",label:"Electronics"},{value:"drivetrain",label:"Wheels & Drivetrain"},{value:"3d-printed",label:"3D Printed Parts"},{value:"control",label:"Control Systems"},{value:"hardware",label:"Hardware & Fasteners"},{value:"other",label:"Other"}],Nc=[{value:"new",label:"New / Unused"},{value:"like-new",label:"Like New"},{value:"good",label:"Good Condition"},{value:"fair",label:"Fair / Used"},{value:"parts",label:"For Parts Only"}];function Dy({listing:e}){var i,s;const t=o=>{var a;return((a=qo.find(l=>l.value===o))==null?void 0:a.label)||o},n=o=>{var a;return((a=Nc.find(l=>l.value===o))==null?void 0:a.label)||o},r=o=>{const a=new Date(o),c=Math.abs(new Date-a),d=Math.floor(c/(1e3*60*60*24));return d===0?"Today":d===1?"Yesterday":d<7?`${d} days ago`:a.toLocaleDateString()};return u.jsx(R.div,{whileHover:{y:-6},transition:{duration:.2},children:u.jsxs(V,{to:`/listings/${e.id}`,className:"listing-card",children:[u.jsxs("div",{className:"card-header",children:[u.jsx("span",{className:`badge badge-${e.type}`,children:e.type==="have"?"Available":"Wanted"}),u.jsx("span",{className:"badge badge-category",children:t(e.category)})]}),u.jsx("h3",{className:"card-title",children:e.title}),u.jsxs("p",{className:"card-description",children:[(i=e.description)==null?void 0:i.substring(0,100),((s=e.description)==null?void 0:s.length)>100?"...":""]}),u.jsxs("div",{className:"card-meta",children:[e.condition&&u.jsxs("span",{className:"meta-item",children:[u.jsx(ke,{size:14}),n(e.condition)]}),e.quantity&&u.jsxs("span",{className:"meta-item",children:["Qty: ",e.quantity]})]}),u.jsxs("div",{className:"card-footer",children:[u.jsxs("div",{className:"team-info",children:[u.jsx(mt,{size:14}),u.jsxs("span",{children:["Team ",e.team_number]})]}),u.jsxs("div",{className:"location-info",children:[u.jsx(Di,{size:14}),u.jsxs("span",{children:[e.city,", ",e.state]})]})]}),u.jsxs("div",{className:"card-time",children:[u.jsx(sy,{size:12}),r(e.created_at)]}),u.jsx("style",{children:`
          .listing-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 24px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
          }

          .listing-card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-glow);
          }

          .card-header {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
          }

          .card-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--text-primary);
            line-height: 1.4;
          }

          .card-description {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 16px;
            flex: 1;
          }

          .card-meta {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-muted);
          }

          .card-footer {
            display: flex;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid var(--border-color);
          }

          .team-info,
          .location-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-secondary);
          }

          .card-time {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 12px;
          }
        `})]})})}function Lk(){const[e,t]=y1(),[n,r]=S.useState([]),[i,s]=S.useState(!0),[o,a]=S.useState(!1),{isAuthenticated:l}=st(),[c,d]=S.useState({search:e.get("search")||"",type:e.get("type")||"",category:e.get("category")||"",state:e.get("state")||""});S.useEffect(()=>{f()},[e]);const f=async()=>{s(!0);try{const v=new URLSearchParams;c.search&&v.append("search",c.search),c.type&&v.append("type",c.type),c.category&&v.append("category",c.category),c.state&&v.append("state",c.state);const w=await Ce.get(`/listings?${v.toString()}`);r(w.data.listings||[])}catch(v){console.error("Error fetching listings:",v),r(Ak())}finally{s(!1)}},p=(v,w)=>{const x={...c,[v]:w};d(x);const h=new URLSearchParams;Object.entries(x).forEach(([g,b])=>{b&&h.set(g,b)}),t(h)},y=()=>{d({search:"",type:"",category:"",state:""}),t({})},m=c.type||c.category||c.state;return u.jsxs("div",{className:"listings-page",children:[u.jsxs("div",{className:"container",children:[u.jsxs(R.div,{className:"page-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("div",{className:"header-content",children:[u.jsx("h1",{children:"Browse Parts"}),u.jsx("p",{children:"Find the parts you need from teams near you"})]}),l&&u.jsxs(V,{to:"/listings/create",className:"btn btn-primary",children:[u.jsx(yr,{size:18}),"Post Listing"]})]}),u.jsxs(R.div,{className:"filters-section",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:[u.jsxs("div",{className:"search-bar",children:[u.jsx(Sc,{size:20,className:"search-icon"}),u.jsx("input",{type:"text",placeholder:"Search parts...",value:c.search,onChange:v=>p("search",v.target.value),className:"search-input"})]}),u.jsxs("button",{className:`filter-toggle ${o?"active":""}`,onClick:()=>a(!o),children:[u.jsx(zb,{size:18}),"Filters",m&&u.jsx("span",{className:"filter-count",children:"!"}),u.jsx(_b,{size:18,className:o?"rotate":""})]})]}),u.jsx(xc,{children:o&&u.jsxs(R.div,{className:"filters-panel",initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},children:[u.jsxs("div",{className:"filters-grid",children:[u.jsxs("div",{className:"filter-group",children:[u.jsx("label",{children:"Type"}),u.jsxs("select",{value:c.type,onChange:v=>p("type",v.target.value),className:"form-select",children:[u.jsx("option",{value:"",children:"All Types"}),u.jsx("option",{value:"have",children:"Have (Offering)"}),u.jsx("option",{value:"want",children:"Want (Looking For)"})]})]}),u.jsxs("div",{className:"filter-group",children:[u.jsx("label",{children:"Category"}),u.jsxs("select",{value:c.category,onChange:v=>p("category",v.target.value),className:"form-select",children:[u.jsx("option",{value:"",children:"All Categories"}),qo.map(v=>u.jsx("option",{value:v.value,children:v.label},v.value))]})]}),u.jsxs("div",{className:"filter-group",children:[u.jsx("label",{children:"State"}),u.jsxs("select",{value:c.state,onChange:v=>p("state",v.target.value),className:"form-select",children:[u.jsx("option",{value:"",children:"All States"}),Pc.map(v=>u.jsx("option",{value:v.value,children:v.label},v.value))]})]})]}),m&&u.jsxs("button",{className:"clear-filters",onClick:y,children:[u.jsx(ay,{size:16}),"Clear All Filters"]})]})}),u.jsx("div",{className:"listings-results",children:i?u.jsx(Or,{}):n.length===0?u.jsxs(R.div,{className:"no-results",initial:{opacity:0},animate:{opacity:1},children:[u.jsx(ke,{size:48}),u.jsx("h3",{children:"No Listings Found"}),u.jsx("p",{children:"Try adjusting your filters or search terms"})]}):u.jsx(R.div,{className:"listings-grid",initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},children:n.map((v,w)=>u.jsx(R.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:w*.05},children:u.jsx(Dy,{listing:v})},v.id))})})]}),u.jsx("style",{children:`
        .listings-page {
          padding: 40px 0 80px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .header-content h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .header-content p {
          color: var(--text-secondary);
        }

        .filters-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-bar {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          font-size: 15px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-toggle:hover,
        .filter-toggle.active {
          border-color: var(--primary);
          color: var(--primary);
        }

        .filter-toggle .rotate {
          transform: rotate(180deg);
        }

        .filter-count {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
        }

        .filters-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .filter-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .clear-filters {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .clear-filters:hover {
          color: var(--primary);
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .no-results {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-secondary);
        }

        .no-results svg {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .no-results h3 {
          font-size: 20px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .listings-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .filters-section {
            flex-direction: column;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function Ak(){return[{id:1,title:"REV Robotics HD Hex Motor",type:"have",category:"motors",condition:"like-new",quantity:2,description:"Barely used HD Hex motors from last season. Work perfectly.",team_number:"12345",team_name:"TechBots",state:"CA",city:"San Jose",created_at:new Date().toISOString()},{id:2,title:"Looking for GoBuilda Wheels",type:"want",category:"drivetrain",description:"Need 4x 96mm mecanum wheels for our drivetrain.",team_number:"67890",team_name:"RoboWarriors",state:"TX",city:"Austin",created_at:new Date().toISOString()},{id:3,title:"Color Sensor V3",type:"have",category:"sensors",condition:"good",quantity:1,description:"REV Color Sensor V3, tested and working.",team_number:"11111",team_name:"Circuit Breakers",state:"NY",city:"Buffalo",created_at:new Date().toISOString()},{id:4,title:"Aluminum Extrusion 40x40",type:"have",category:"structural",condition:"new",quantity:10,description:"10 pieces of 500mm aluminum extrusion, never used.",team_number:"22222",team_name:"Metal Minds",state:"WA",city:"Seattle",created_at:new Date().toISOString()},{id:5,title:"Need Control Hub",type:"want",category:"control",description:"Looking for a REV Control Hub, new or used.",team_number:"33333",team_name:"Byte Force",state:"FL",city:"Miami",created_at:new Date().toISOString()},{id:6,title:"Custom 3D Printed Claw",type:"have",category:"3d-printed",condition:"new",quantity:1,description:"Custom designed gripper claw, printed in PETG.",team_number:"44444",team_name:"Print Squad",state:"CO",city:"Denver",created_at:new Date().toISOString()}]}function Dk(){const{id:e}=Lm(),[t,n]=S.useState(null),[r,i]=S.useState(!0),[s,o]=S.useState(!1),{isAuthenticated:a}=st();S.useEffect(()=>{l()},[e]);const l=async()=>{try{const p=await Ce.get(`/listings/${e}`);n(p.data.listing)}catch{n(Mk(e))}finally{i(!1)}},c=p=>{var y;return((y=qo.find(m=>m.value===p))==null?void 0:y.label)||p},d=p=>{var y;return((y=Nc.find(m=>m.value===p))==null?void 0:y.label)||p},f=p=>new Date(p).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});return r?u.jsx(Or,{fullScreen:!0}):t?u.jsxs("div",{className:"listing-detail",children:[u.jsx("div",{className:"container",children:u.jsxs(R.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs(V,{to:"/listings",className:"back-link",children:[u.jsx(iy,{size:18}),"Back to Listings"]}),u.jsxs("div",{className:"detail-grid",children:[u.jsxs("div",{className:"detail-main",children:[u.jsxs("div",{className:"detail-header",children:[u.jsxs("div",{className:"badges",children:[u.jsx("span",{className:`badge badge-${t.type}`,children:t.type==="have"?"Available":"Wanted"}),u.jsx("span",{className:"badge badge-category",children:c(t.category)})]}),u.jsx("h1",{children:t.title}),u.jsxs("div",{className:"listing-meta",children:[u.jsxs("span",{className:"meta-item",children:[u.jsx(sy,{size:16}),"Posted ",f(t.created_at)]}),u.jsxs("span",{className:"meta-item",children:[u.jsx(Di,{size:16}),t.city,", ",t.state]})]})]}),u.jsxs("div",{className:"detail-section",children:[u.jsx("h2",{children:"Description"}),u.jsx("p",{children:t.description})]}),t.type==="have"&&u.jsxs("div",{className:"detail-section",children:[u.jsx("h2",{children:"Details"}),u.jsxs("div",{className:"details-grid",children:[t.condition&&u.jsxs("div",{className:"detail-item",children:[u.jsx("span",{className:"detail-label",children:"Condition"}),u.jsx("span",{className:"detail-value",children:d(t.condition)})]}),t.quantity&&u.jsxs("div",{className:"detail-item",children:[u.jsx("span",{className:"detail-label",children:"Quantity"}),u.jsx("span",{className:"detail-value",children:t.quantity})]})]})]})]}),u.jsx("div",{className:"detail-sidebar",children:u.jsxs("div",{className:"team-card",children:[u.jsxs("div",{className:"team-header",children:[u.jsx("div",{className:"team-icon",children:u.jsx(mt,{size:24})}),u.jsxs("div",{children:[u.jsxs("h3",{children:["Team ",t.team_number]}),u.jsx("p",{children:t.team_name})]})]}),u.jsxs("div",{className:"team-location",children:[u.jsx(Di,{size:16}),t.city,", ",t.state]}),a?u.jsx(u.Fragment,{children:s?u.jsxs(R.div,{className:"contact-info",initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},children:[u.jsxs("div",{className:"contact-item",children:[u.jsx(Bn,{size:16}),u.jsx("a",{href:`mailto:${t.contact_email||"team@example.com"}`,children:t.contact_email||"team@example.com"})]}),u.jsx("p",{className:"contact-note",children:"Please mention the listing title when reaching out."})]}):u.jsxs(R.button,{className:"btn btn-primary contact-btn",onClick:()=>o(!0),whileHover:{scale:1.02},whileTap:{scale:.98},children:[u.jsx(Bn,{size:18}),"Show Contact Info"]})}):u.jsxs("div",{className:"login-prompt",children:[u.jsx("p",{children:"Sign in to view contact information"}),u.jsx(V,{to:"/login",className:"btn btn-primary",children:"Sign In"})]}),u.jsx(V,{to:`/teams/${t.team_id||t.team_number}`,className:"view-team-link",children:"View Team Profile"})]})})]})]})}),u.jsx("style",{children:`
        .listing-detail {
          padding: 40px 0 80px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
          transition: color var(--transition-fast);
        }

        .back-link:hover {
          color: var(--primary);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }

        .detail-main {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 32px;
        }

        .detail-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .badges {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .detail-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .listing-meta {
          display: flex;
          gap: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .detail-section {
          margin-bottom: 32px;
        }

        .detail-section:last-child {
          margin-bottom: 0;
        }

        .detail-section h2 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .detail-section p {
          color: var(--text-secondary);
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .detail-item {
          background: var(--bg-dark);
          padding: 16px;
          border-radius: var(--radius-md);
        }

        .detail-label {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 16px;
          font-weight: 600;
        }

        .team-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 24px;
        }

        .team-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .team-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-md);
          color: white;
        }

        .team-header h3 {
          font-size: 18px;
          font-weight: 600;
        }

        .team-header p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .team-location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .contact-btn {
          width: 100%;
        }

        .contact-info {
          overflow: hidden;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background: rgba(245, 124, 0, 0.1);
          border-radius: var(--radius-md);
          margin-bottom: 12px;
        }

        .contact-item a {
          color: var(--primary);
          font-weight: 500;
        }

        .contact-note {
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
        }

        .login-prompt {
          text-align: center;
          padding: 20px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
        }

        .login-prompt p {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .view-team-link {
          display: block;
          text-align: center;
          margin-top: 16px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .view-team-link:hover {
          color: var(--primary);
        }

        .not-found {
          text-align: center;
          padding: 100px 20px;
        }

        .not-found svg {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .not-found h2 {
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]}):u.jsxs("div",{className:"not-found",children:[u.jsx(yn,{size:48}),u.jsx("h2",{children:"Listing Not Found"}),u.jsx(V,{to:"/listings",className:"btn btn-primary",children:"Back to Listings"})]})}function Mk(e){return{id:e,title:"REV Robotics HD Hex Motor",type:"have",category:"motors",condition:"like-new",quantity:2,description:`Barely used HD Hex motors from last season. Work perfectly. We upgraded to the new UltraPlanetary motors and no longer need these.

Includes original packaging and all mounting hardware.`,team_number:"12345",team_name:"TechBots",team_id:1,state:"CA",city:"San Jose",contact_email:"team12345@example.com",created_at:new Date().toISOString()}}function Ok(){const e=Wn(),{team:t}=st(),[n,r]=S.useState({type:"have",title:"",category:"",condition:"",quantity:1,description:""}),[i,s]=S.useState(""),[o,a]=S.useState(!1),l=d=>{const{name:f,value:p}=d.target;r(y=>({...y,[f]:p})),s("")},c=async d=>{var f,p;if(d.preventDefault(),a(!0),s(""),!t){s("You must be part of a team to create a listing"),a(!1);return}try{const y=await Ce.post("/listings",n);e(`/listings/${y.data.listing.id}`)}catch(y){s(((p=(f=y.response)==null?void 0:f.data)==null?void 0:p.message)||"Failed to create listing")}finally{a(!1)}};return t?u.jsxs("div",{className:"create-listing",children:[u.jsx("div",{className:"container",children:u.jsxs(R.div,{className:"create-form-container",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("div",{className:"form-header",children:[u.jsx("h1",{children:"Create Listing"}),u.jsx("p",{children:"Share parts you have or parts you're looking for"})]}),i&&u.jsxs(R.div,{className:"error-message",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},children:[u.jsx(yn,{size:18}),i]}),u.jsxs("form",{onSubmit:c,children:[u.jsxs("div",{className:"form-section",children:[u.jsx("h3",{children:"What type of listing is this?"}),u.jsxs("div",{className:"type-selector",children:[u.jsxs("label",{className:`type-option ${n.type==="have"?"selected":""}`,children:[u.jsx("input",{type:"radio",name:"type",value:"have",checked:n.type==="have",onChange:l}),u.jsxs("div",{className:"type-content",children:[u.jsx("span",{className:"type-icon have",children:u.jsx(wc,{size:20})}),u.jsx("span",{className:"type-label",children:"I Have"}),u.jsx("span",{className:"type-desc",children:"I'm offering parts to others"})]})]}),u.jsxs("label",{className:`type-option ${n.type==="want"?"selected":""}`,children:[u.jsx("input",{type:"radio",name:"type",value:"want",checked:n.type==="want",onChange:l}),u.jsxs("div",{className:"type-content",children:[u.jsx("span",{className:"type-icon want",children:u.jsx(ke,{size:20})}),u.jsx("span",{className:"type-label",children:"I Want"}),u.jsx("span",{className:"type-desc",children:"I'm looking for parts"})]})]})]})]}),u.jsxs("div",{className:"form-section",children:[u.jsx("h3",{children:"Listing Details"}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Title *"}),u.jsx("input",{type:"text",name:"title",value:n.title,onChange:l,className:"form-input",placeholder:"e.g., REV HD Hex Motor, GoBuilda Wheels",required:!0})]}),u.jsxs("div",{className:"form-row",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Category *"}),u.jsxs("select",{name:"category",value:n.category,onChange:l,className:"form-select",required:!0,children:[u.jsx("option",{value:"",children:"Select category"}),qo.map(d=>u.jsx("option",{value:d.value,children:d.label},d.value))]})]}),n.type==="have"&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Condition"}),u.jsxs("select",{name:"condition",value:n.condition,onChange:l,className:"form-select",children:[u.jsx("option",{value:"",children:"Select condition"}),Nc.map(d=>u.jsx("option",{value:d.value,children:d.label},d.value))]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Quantity"}),u.jsx("input",{type:"number",name:"quantity",value:n.quantity,onChange:l,className:"form-input",min:"1"})]})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Description *"}),u.jsx("textarea",{name:"description",value:n.description,onChange:l,className:"form-textarea",placeholder:"Describe the part(s) in detail. Include any relevant information like brand, model, usage history, etc.",required:!0,rows:5})]})]}),u.jsxs("div",{className:"form-section",children:[u.jsx("h3",{children:"Your Team"}),u.jsxs("div",{className:"team-preview",children:[u.jsxs("div",{className:"team-info",children:[u.jsxs("strong",{children:["Team ",t.team_number]})," - ",t.name]}),u.jsxs("div",{className:"team-location",children:[t.city,", ",t.state]})]})]}),u.jsx(R.button,{type:"submit",className:"btn btn-primary btn-lg submit-btn",disabled:o,whileHover:{scale:1.02},whileTap:{scale:.98},children:o?"Creating...":"Create Listing"})]})]})}),u.jsx("style",{children:`
        .create-listing {
          padding: 40px 0 80px;
        }

        .create-form-container {
          max-width: 700px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 40px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-header p {
          color: var(--text-secondary);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .form-section {
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .form-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .type-selector {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .type-option {
          cursor: pointer;
        }

        .type-option input {
          display: none;
        }

        .type-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: var(--bg-dark);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .type-option:hover .type-content {
          border-color: var(--border-light);
        }

        .type-option.selected .type-content {
          border-color: var(--primary);
          background: rgba(245, 124, 0, 0.05);
        }

        .type-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: white;
        }

        .type-icon.have {
          background: var(--accent-green);
        }

        .type-icon.want {
          background: var(--accent-purple);
        }

        .type-label {
          font-size: 16px;
          font-weight: 600;
        }

        .type-desc {
          font-size: 13px;
          color: var(--text-muted);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        .team-preview {
          padding: 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
        }

        .team-info {
          margin-bottom: 4px;
        }

        .team-location {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .submit-btn {
          width: 100%;
          margin-top: 16px;
        }

        .no-team-message {
          text-align: center;
          padding: 80px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          max-width: 500px;
          margin: 0 auto;
        }

        .no-team-message svg {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .no-team-message h2 {
          margin-bottom: 12px;
        }

        .no-team-message p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        @media (max-width: 640px) {
          .create-form-container {
            padding: 24px;
          }

          .type-selector {
            grid-template-columns: 1fr;
          }
        }
      `})]}):u.jsx("div",{className:"create-listing",children:u.jsx("div",{className:"container",children:u.jsxs(R.div,{className:"no-team-message",initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[u.jsx(ke,{size:48}),u.jsx("h2",{children:"Join a Team First"}),u.jsx("p",{children:"You need to be part of a team before you can create listings."}),u.jsx("a",{href:"/teams/create",className:"btn btn-primary",children:"Create or Join a Team"})]})})})}function _k(){const[e,t]=S.useState([]),[n,r]=S.useState(!0),[i,s]=S.useState(""),[o,a]=S.useState(""),{isAuthenticated:l}=st();S.useEffect(()=>{c()},[o]);const c=async()=>{r(!0);try{const f=new URLSearchParams;o&&f.append("state",o);const p=await Ce.get(`/teams?${f.toString()}`);t(p.data.teams||[])}catch{t(Fk())}finally{r(!1)}},d=e.filter(f=>{var y;if(!i)return!0;const p=i.toLowerCase();return f.team_number.toString().includes(p)||f.name.toLowerCase().includes(p)||((y=f.city)==null?void 0:y.toLowerCase().includes(p))});return u.jsxs("div",{className:"teams-page",children:[u.jsxs("div",{className:"container",children:[u.jsxs(R.div,{className:"page-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("div",{className:"header-content",children:[u.jsx("h1",{children:"FTC Teams"}),u.jsx("p",{children:"Find and connect with teams in your area"})]}),l&&u.jsxs(V,{to:"/teams/create",className:"btn btn-primary",children:[u.jsx(yr,{size:18}),"Register Team"]})]}),u.jsxs(R.div,{className:"filters-section",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:[u.jsxs("div",{className:"search-bar",children:[u.jsx(Sc,{size:20,className:"search-icon"}),u.jsx("input",{type:"text",placeholder:"Search by team number, name, or city...",value:i,onChange:f=>s(f.target.value),className:"search-input"})]}),u.jsxs("select",{value:o,onChange:f=>a(f.target.value),className:"form-select state-filter",children:[u.jsx("option",{value:"",children:"All States"}),Pc.map(f=>u.jsx("option",{value:f.value,children:f.label},f.value))]})]}),u.jsx("div",{className:"teams-results",children:n?u.jsx(Or,{}):d.length===0?u.jsxs(R.div,{className:"no-results",initial:{opacity:0},animate:{opacity:1},children:[u.jsx(mt,{size:48}),u.jsx("h3",{children:"No Teams Found"}),u.jsx("p",{children:"Try adjusting your search or filters"})]}):u.jsx(R.div,{className:"teams-grid",initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},children:d.map((f,p)=>u.jsx(R.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:p*.05},children:u.jsx(zk,{team:f})},f.id))})})]}),u.jsx("style",{children:`
        .teams-page {
          padding: 40px 0 80px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .header-content h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .header-content p {
          color: var(--text-secondary);
        }

        .filters-section {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .search-bar {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          font-size: 15px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .state-filter {
          width: 200px;
        }

        .teams-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .no-results {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-secondary);
        }

        .no-results svg {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .no-results h3 {
          font-size: 20px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .teams-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
          }

          .state-filter {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .teams-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function zk({team:e}){return u.jsx(R.div,{whileHover:{y:-6},transition:{duration:.2},children:u.jsxs(V,{to:`/teams/${e.id}`,className:"team-card",children:[u.jsxs("div",{className:"team-header",children:[u.jsx("div",{className:"team-icon",children:u.jsx(mt,{size:24})}),u.jsxs("div",{className:"team-number",children:["#",e.team_number]})]}),u.jsx("h3",{className:"team-name",children:e.name}),u.jsxs("div",{className:"team-location",children:[u.jsx(Di,{size:14}),e.city,", ",e.state]}),u.jsxs("div",{className:"team-stats",children:[u.jsxs("div",{className:"stat",children:[u.jsx(ke,{size:14}),u.jsxs("span",{children:[e.listings_count||0," listings"]})]}),u.jsxs("div",{className:"stat",children:[u.jsx(mt,{size:14}),u.jsxs("span",{children:[e.members_count||1," members"]})]})]}),u.jsx("style",{children:`
          .team-card {
            display: block;
            padding: 24px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
          }

          .team-card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-glow);
          }

          .team-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }

          .team-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border-radius: var(--radius-md);
            color: white;
          }

          .team-number {
            font-size: 14px;
            font-weight: 600;
            color: var(--primary);
          }

          .team-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
          }

          .team-location {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 16px;
          }

          .team-stats {
            display: flex;
            gap: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--border-color);
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-muted);
          }
        `})]})})}function Fk(){return[{id:1,team_number:"12345",name:"TechBots",city:"San Jose",state:"CA",listings_count:5,members_count:8},{id:2,team_number:"67890",name:"RoboWarriors",city:"Austin",state:"TX",listings_count:3,members_count:12},{id:3,team_number:"11111",name:"Circuit Breakers",city:"Buffalo",state:"NY",listings_count:8,members_count:6},{id:4,team_number:"22222",name:"Metal Minds",city:"Seattle",state:"WA",listings_count:2,members_count:10},{id:5,team_number:"33333",name:"Byte Force",city:"Miami",state:"FL",listings_count:4,members_count:7},{id:6,team_number:"44444",name:"Print Squad",city:"Denver",state:"CO",listings_count:6,members_count:9}]}function Vk(){const{id:e}=Lm(),[t,n]=S.useState(null),[r,i]=S.useState([]),[s,o]=S.useState(!0),[a,l]=S.useState(!1),{isAuthenticated:c}=st();S.useEffect(()=>{d()},[e]);const d=async()=>{try{const[f,p]=await Promise.all([Ce.get(`/teams/${e}`),Ce.get(`/listings?team_id=${e}`)]);n(f.data.team),i(p.data.listings||[])}catch{n(Ik(e)),i(Bk())}finally{o(!1)}};return s?u.jsx(Or,{fullScreen:!0}):t?u.jsxs("div",{className:"team-detail",children:[u.jsx("div",{className:"container",children:u.jsxs(R.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs(V,{to:"/teams",className:"back-link",children:[u.jsx(iy,{size:18}),"Back to Teams"]}),u.jsxs("div",{className:"team-header-card",children:[u.jsxs("div",{className:"team-header-content",children:[u.jsx("div",{className:"team-icon",children:u.jsx(mt,{size:32})}),u.jsxs("div",{className:"team-info",children:[u.jsxs("div",{className:"team-number",children:["Team #",t.team_number]}),u.jsx("h1",{children:t.name}),u.jsxs("div",{className:"team-meta",children:[u.jsxs("span",{className:"meta-item",children:[u.jsx(Di,{size:16}),t.city,", ",t.state]}),u.jsxs("span",{className:"meta-item",children:[u.jsx(mt,{size:16}),t.members_count||1," members"]}),u.jsxs("span",{className:"meta-item",children:[u.jsx(ke,{size:16}),r.length," listings"]})]})]})]}),t.description&&u.jsx("p",{className:"team-description",children:t.description}),u.jsx("div",{className:"team-contact",children:c?a?u.jsx(R.div,{className:"contact-info",initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},children:u.jsxs("div",{className:"contact-item",children:[u.jsx(Bn,{size:18}),u.jsx("a",{href:`mailto:${t.contact_email||"team@example.com"}`,children:t.contact_email||"team@example.com"})]})}):u.jsxs(R.button,{className:"btn btn-primary",onClick:()=>l(!0),whileHover:{scale:1.02},whileTap:{scale:.98},children:[u.jsx(Bn,{size:18}),"Contact Team"]}):u.jsx("div",{className:"login-prompt",children:u.jsx(V,{to:"/login",className:"btn btn-primary",children:"Sign in to contact"})})})]}),u.jsxs("div",{className:"team-listings",children:[u.jsx("h2",{children:"Team Listings"}),r.length===0?u.jsxs("div",{className:"no-listings",children:[u.jsx(ke,{size:32}),u.jsx("p",{children:"This team hasn't posted any listings yet."})]}):u.jsx("div",{className:"listings-grid",children:r.map((f,p)=>u.jsx(R.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:p*.05},children:u.jsx(Dy,{listing:f})},f.id))})]}),t.members&&t.members.length>0&&u.jsxs("div",{className:"team-members",children:[u.jsx("h2",{children:"Team Members"}),u.jsx("div",{className:"members-grid",children:t.members.map((f,p)=>u.jsxs(R.div,{className:"member-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:p*.05},children:[u.jsx("div",{className:"member-avatar",children:f.name.charAt(0).toUpperCase()}),u.jsxs("div",{className:"member-info",children:[u.jsx("span",{className:"member-name",children:f.name}),u.jsx("span",{className:"member-role",children:f.role})]})]},f.id))})]})]})}),u.jsx("style",{children:`
        .team-detail {
          padding: 40px 0 80px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .back-link:hover {
          color: var(--primary);
        }

        .team-header-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 32px;
          margin-bottom: 40px;
        }

        .team-header-content {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .team-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          flex-shrink: 0;
        }

        .team-number {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .team-info h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .team-meta {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .team-description {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .contact-info {
          overflow: hidden;
        }

        .contact-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: rgba(245, 124, 0, 0.1);
          border-radius: var(--radius-md);
        }

        .contact-item a {
          color: var(--primary);
          font-weight: 500;
        }

        .team-listings {
          margin-bottom: 40px;
        }

        .team-listings h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .no-listings {
          text-align: center;
          padding: 60px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          color: var(--text-secondary);
        }

        .no-listings svg {
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .team-members h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .member-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary-light);
          border-radius: 50%;
          font-weight: 600;
          color: var(--primary);
        }

        .member-name {
          display: block;
          font-weight: 500;
        }

        .member-role {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          text-transform: capitalize;
        }

        .not-found {
          text-align: center;
          padding: 100px 20px;
        }

        .not-found svg {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .not-found h2 {
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .listings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .team-header-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .team-meta {
            justify-content: center;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]}):u.jsxs("div",{className:"not-found",children:[u.jsx(yn,{size:48}),u.jsx("h2",{children:"Team Not Found"}),u.jsx(V,{to:"/teams",className:"btn btn-primary",children:"Back to Teams"})]})}function Ik(e){return{id:e,team_number:"12345",name:"TechBots",city:"San Jose",state:"CA",description:"We are Team TechBots, a competitive FTC robotics team based in San Jose, California. Our mission is to inspire young engineers and create innovative robots that push the boundaries of what's possible.",contact_email:"team12345@example.com",members_count:8,members:[{id:1,name:"Alex Johnson",role:"admin"},{id:2,name:"Sam Lee",role:"member"},{id:3,name:"Jordan Smith",role:"member"}]}}function Bk(){return[{id:1,title:"REV Robotics HD Hex Motor",type:"have",category:"motors",condition:"like-new",quantity:2,description:"Barely used HD Hex motors from last season.",team_number:"12345",team_name:"TechBots",state:"CA",city:"San Jose",created_at:new Date().toISOString()},{id:2,title:"Color Sensor V3",type:"have",category:"sensors",condition:"good",quantity:1,description:"REV Color Sensor V3, tested and working.",team_number:"12345",team_name:"TechBots",state:"CA",city:"San Jose",created_at:new Date().toISOString()}]}function Uk(){const e=Wn(),{updateTeam:t}=st(),[n,r]=S.useState({team_number:"",name:"",city:"",state:"",description:"",contact_email:""}),[i,s]=S.useState(""),[o,a]=S.useState(!1),l=d=>{const{name:f,value:p}=d.target;r(y=>({...y,[f]:p})),s("")},c=async d=>{var f,p;if(d.preventDefault(),a(!0),s(""),!n.team_number.match(/^\d+$/)){s("Team number must contain only digits"),a(!1);return}try{const y=await Ce.post("/teams",n);t(y.data.team),e(`/teams/${y.data.team.id}`)}catch(y){s(((p=(f=y.response)==null?void 0:f.data)==null?void 0:p.message)||"Failed to create team")}finally{a(!1)}};return u.jsxs("div",{className:"create-team",children:[u.jsx("div",{className:"container",children:u.jsxs(R.div,{className:"create-form-container",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsxs("div",{className:"form-header",children:[u.jsx(R.div,{className:"form-icon",initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring"},children:u.jsx(mt,{size:28})}),u.jsx("h1",{children:"Register Your Team"}),u.jsx("p",{children:"Create a team profile to start listing parts"})]}),i&&u.jsxs(R.div,{className:"error-message",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},children:[u.jsx(yn,{size:18}),i]}),u.jsxs("form",{onSubmit:c,children:[u.jsxs("div",{className:"form-row",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Team Number *"}),u.jsx("input",{type:"text",name:"team_number",value:n.team_number,onChange:l,className:"form-input",placeholder:"e.g., 12345",required:!0})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Team Name *"}),u.jsx("input",{type:"text",name:"name",value:n.name,onChange:l,className:"form-input",placeholder:"e.g., TechBots",required:!0})]})]}),u.jsxs("div",{className:"form-row",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"City *"}),u.jsx("input",{type:"text",name:"city",value:n.city,onChange:l,className:"form-input",placeholder:"e.g., San Jose",required:!0})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"State *"}),u.jsxs("select",{name:"state",value:n.state,onChange:l,className:"form-select",required:!0,children:[u.jsx("option",{value:"",children:"Select state"}),Pc.map(d=>u.jsx("option",{value:d.value,children:d.label},d.value))]})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Contact Email *"}),u.jsx("input",{type:"email",name:"contact_email",value:n.contact_email,onChange:l,className:"form-input",placeholder:"team@example.com",required:!0}),u.jsx("span",{className:"form-hint",children:"This email will be visible to logged-in users who want to contact your team."})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Team Description"}),u.jsx("textarea",{name:"description",value:n.description,onChange:l,className:"form-textarea",placeholder:"Tell other teams about yourselves...",rows:4})]}),u.jsx(R.button,{type:"submit",className:"btn btn-primary btn-lg submit-btn",disabled:o,whileHover:{scale:1.02},whileTap:{scale:.98},children:o?"Creating Team...":"Create Team"})]})]})}),u.jsx("style",{children:`
        .create-team {
          padding: 40px 0 80px;
        }

        .create-form-container {
          max-width: 600px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 40px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          margin: 0 auto 20px;
        }

        .form-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-header p {
          color: var(--text-secondary);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-hint {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .submit-btn {
          width: 100%;
          margin-top: 16px;
        }

        @media (max-width: 640px) {
          .create-form-container {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function $k(){const{user:e,updateUser:t}=st(),[n,r]=S.useState({name:(e==null?void 0:e.name)||"",email:(e==null?void 0:e.email)||""}),[i,s]=S.useState({currentPassword:"",newPassword:"",confirmPassword:""}),[o,a]=S.useState(""),[l,c]=S.useState(""),[d,f]=S.useState(!1),[p,y]=S.useState(!1),m=h=>{r(g=>({...g,[h.target.name]:h.target.value})),a(""),c("")},v=h=>{s(g=>({...g,[h.target.name]:h.target.value})),a("")},w=async h=>{var g,b;h.preventDefault(),f(!0),a(""),c("");try{const k=await Ce.put("/auth/profile",n);t(k.data.user),c("Profile updated successfully")}catch(k){a(((b=(g=k.response)==null?void 0:g.data)==null?void 0:b.message)||"Failed to update profile")}finally{f(!1)}},x=async h=>{var g,b;if(h.preventDefault(),y(!0),a(""),i.newPassword!==i.confirmPassword){a("New passwords do not match"),y(!1);return}if(i.newPassword.length<8){a("Password must be at least 8 characters"),y(!1);return}try{await Ce.put("/auth/password",{current_password:i.currentPassword,new_password:i.newPassword}),s({currentPassword:"",newPassword:"",confirmPassword:""}),c("Password changed successfully")}catch(k){a(((b=(g=k.response)==null?void 0:g.data)==null?void 0:b.message)||"Failed to change password")}finally{y(!1)}};return u.jsxs("div",{className:"profile-page",children:[u.jsxs("div",{className:"container",children:[u.jsxs(R.div,{className:"profile-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[u.jsx("h1",{children:"Profile Settings"}),u.jsx("p",{children:"Manage your account information"})]}),u.jsxs("div",{className:"profile-grid",children:[u.jsxs(R.div,{className:"profile-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[u.jsxs("div",{className:"card-header",children:[u.jsx(Mi,{size:20}),u.jsx("h2",{children:"Personal Information"})]}),o&&u.jsxs("div",{className:"error-message",children:[u.jsx(yn,{size:18}),o]}),l&&u.jsxs("div",{className:"success-message",children:[u.jsx(wc,{size:18}),l]}),u.jsxs("form",{onSubmit:w,children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Full Name"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Mi,{size:18,className:"input-icon"}),u.jsx("input",{type:"text",name:"name",value:n.name,onChange:m,className:"form-input",placeholder:"Your name"})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Email Address"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Bn,{size:18,className:"input-icon"}),u.jsx("input",{type:"email",name:"email",value:n.email,onChange:m,className:"form-input",placeholder:"you@example.com"})]})]}),u.jsx(R.button,{type:"submit",className:"btn btn-primary",disabled:d,whileHover:{scale:1.02},whileTap:{scale:.98},children:d?"Saving...":u.jsxs(u.Fragment,{children:[u.jsx($b,{size:18}),"Save Changes"]})})]})]}),u.jsxs(R.div,{className:"profile-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[u.jsxs("div",{className:"card-header",children:[u.jsx(Rn,{size:20}),u.jsx("h2",{children:"Change Password"})]}),u.jsxs("form",{onSubmit:x,children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Current Password"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Rn,{size:18,className:"input-icon"}),u.jsx("input",{type:"password",name:"currentPassword",value:i.currentPassword,onChange:v,className:"form-input",placeholder:"Enter current password"})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"New Password"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Rn,{size:18,className:"input-icon"}),u.jsx("input",{type:"password",name:"newPassword",value:i.newPassword,onChange:v,className:"form-input",placeholder:"At least 8 characters"})]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Confirm New Password"}),u.jsxs("div",{className:"input-with-icon",children:[u.jsx(Rn,{size:18,className:"input-icon"}),u.jsx("input",{type:"password",name:"confirmPassword",value:i.confirmPassword,onChange:v,className:"form-input",placeholder:"Confirm new password"})]})]}),u.jsx(R.button,{type:"submit",className:"btn btn-secondary",disabled:p,whileHover:{scale:1.02},whileTap:{scale:.98},children:p?"Changing...":"Change Password"})]})]})]})]}),u.jsx("style",{children:`
        .profile-page {
          padding: 40px 0 80px;
        }

        .profile-header {
          margin-bottom: 32px;
        }

        .profile-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-header p {
          color: var(--text-secondary);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 900px;
        }

        .profile-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          color: var(--primary);
        }

        .card-header h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(0, 200, 83, 0.1);
          border: 1px solid rgba(0, 200, 83, 0.3);
          border-radius: var(--radius-md);
          color: var(--accent-green);
          font-size: 14px;
          margin-bottom: 20px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .input-with-icon .form-input {
          padding-left: 44px;
        }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function ys({children:e}){const{isAuthenticated:t,loading:n}=st(),r=It();return n?u.jsx(Or,{fullScreen:!0}):t?e:u.jsx(n1,{to:"/login",state:{from:r},replace:!0})}function Hk(){return u.jsx(xc,{mode:"wait",children:u.jsx(s1,{children:u.jsxs($e,{path:"/",element:u.jsx(Ck,{}),children:[u.jsx($e,{index:!0,element:u.jsx(Pk,{})}),u.jsx($e,{path:"login",element:u.jsx(Nk,{})}),u.jsx($e,{path:"register",element:u.jsx(Tk,{})}),u.jsx($e,{path:"listings",element:u.jsx(Lk,{})}),u.jsx($e,{path:"listings/:id",element:u.jsx(Dk,{})}),u.jsx($e,{path:"teams",element:u.jsx(_k,{})}),u.jsx($e,{path:"teams/:id",element:u.jsx(Vk,{})}),u.jsx($e,{path:"dashboard",element:u.jsx(ys,{children:u.jsx(Ek,{})})}),u.jsx($e,{path:"listings/create",element:u.jsx(ys,{children:u.jsx(Ok,{})})}),u.jsx($e,{path:"teams/create",element:u.jsx(ys,{children:u.jsx(Uk,{})})}),u.jsx($e,{path:"profile",element:u.jsx(ys,{children:u.jsx($k,{})})})]})})})}Fa.createRoot(document.getElementById("root")).render(u.jsx(yo.StrictMode,{children:u.jsx(p1,{children:u.jsx(bk,{children:u.jsx(Hk,{})})})}));
