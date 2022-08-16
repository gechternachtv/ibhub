(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerpolicy&&(i.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?i.credentials="include":l.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();function M(){}function Qt(n,e){for(const t in e)n[t]=e[t];return n}function Vt(n){return n()}function jt(){return Object.create(null)}function ke(n){n.forEach(Vt)}function Zt(n){return typeof n=="function"}function _e(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}let Xe;function be(n,e){return Xe||(Xe=document.createElement("a")),Xe.href=e,n===Xe.href}function cn(n){return Object.keys(n).length===0}function $t(n,...e){if(n==null)return M;const t=n.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function ot(n,e,t){n.$$.on_destroy.push($t(e,t))}function c(n,e){n.appendChild(e)}function O(n,e,t){n.insertBefore(e,t||null)}function N(n){n.parentNode.removeChild(n)}function He(n,e){for(let t=0;t<n.length;t+=1)n[t]&&n[t].d(e)}function p(n){return document.createElement(n)}function L(n){return document.createTextNode(n)}function m(){return L(" ")}function at(){return L("")}function oe(n,e,t,s){return n.addEventListener(e,t,s),()=>n.removeEventListener(e,t,s)}function a(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function an(n){return Array.from(n.childNodes)}function V(n,e){e=""+e,n.wholeText!==e&&(n.data=e)}function fe(n,e){n.value=e==null?"":e}function Q(n,e,t){n.classList[t?"add":"remove"](e)}function fn(n,e,{bubbles:t=!1,cancelable:s=!1}={}){const l=document.createEvent("CustomEvent");return l.initCustomEvent(n,t,s,e),l}let Ue;function Te(n){Ue=n}function Qe(){if(!Ue)throw new Error("Function called outside component initialization");return Ue}function ft(n){Qe().$$.on_mount.push(n)}function un(n){Qe().$$.after_update.push(n)}function dn(n){Qe().$$.on_destroy.push(n)}function pn(){const n=Qe();return(e,t,{cancelable:s=!1}={})=>{const l=n.$$.callbacks[e];if(l){const i=fn(e,t,{cancelable:s});return l.slice().forEach(o=>{o.call(n,i)}),!i.defaultPrevented}return!0}}function Ct(n,e){const t=n.$$.callbacks[e.type];t&&t.slice().forEach(s=>s.call(this,e))}const Ae=[],Et=[],Ge=[],Nt=[],xt=Promise.resolve();let rt=!1;function en(){rt||(rt=!0,xt.then(nn))}function tn(){return en(),xt}function ct(n){Ge.push(n)}const it=new Set;let Ye=0;function nn(){const n=Ue;do{for(;Ye<Ae.length;){const e=Ae[Ye];Ye++,Te(e),hn(e.$$)}for(Te(null),Ae.length=0,Ye=0;Et.length;)Et.pop()();for(let e=0;e<Ge.length;e+=1){const t=Ge[e];it.has(t)||(it.add(t),t())}Ge.length=0}while(Ae.length);for(;Nt.length;)Nt.pop()();rt=!1,it.clear(),Te(n)}function hn(n){if(n.fragment!==null){n.update(),ke(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(ct)}}const Ke=new Set;let ve;function ut(){ve={r:0,c:[],p:ve}}function dt(){ve.r||ke(ve.c),ve=ve.p}function he(n,e){n&&n.i&&(Ke.delete(n),n.i(e))}function we(n,e,t,s){if(n&&n.o){if(Ke.has(n))return;Ke.add(n),ve.c.push(()=>{Ke.delete(n),s&&(t&&n.d(1),s())}),n.o(e)}else s&&s()}function ln(n,e){const t={},s={},l={$$scope:1};let i=n.length;for(;i--;){const o=n[i],r=e[i];if(r){for(const f in o)f in r||(s[f]=1);for(const f in r)l[f]||(t[f]=r[f],l[f]=1);n[i]=r}else for(const f in o)l[f]=1}for(const o in s)o in t||(t[o]=void 0);return t}function sn(n){return typeof n=="object"&&n!==null?n:{}}function Re(n){n&&n.c()}function Oe(n,e,t,s){const{fragment:l,on_mount:i,on_destroy:o,after_update:r}=n.$$;l&&l.m(e,t),s||ct(()=>{const f=i.map(Vt).filter(Zt);o?o.push(...f):ke(f),n.$$.on_mount=[]}),r.forEach(ct)}function Se(n,e){const t=n.$$;t.fragment!==null&&(ke(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function _n(n,e){n.$$.dirty[0]===-1&&(Ae.push(n),en(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function ye(n,e,t,s,l,i,o,r=[-1]){const f=Ue;Te(n);const d=n.$$={fragment:null,ctx:null,props:i,update:M,not_equal:l,bound:jt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:jt(),dirty:r,skip_bound:!1,root:e.target||f.$$.root};o&&o(d.root);let u=!1;if(d.ctx=t?t(n,e.props||{},(_,w,...j)=>{const h=j.length?j[0]:w;return d.ctx&&l(d.ctx[_],d.ctx[_]=h)&&(!d.skip_bound&&d.bound[_]&&d.bound[_](h),u&&_n(n,_)),w}):[],d.update(),u=!0,ke(d.before_update),d.fragment=s?s(d.ctx):!1,e.target){if(e.hydrate){const _=an(e.target);d.fragment&&d.fragment.l(_),_.forEach(N)}else d.fragment&&d.fragment.c();e.intro&&he(n.$$.fragment),Oe(n,e.target,e.anchor,e.customElement),nn()}Te(f)}class je{$destroy(){Se(this,1),this.$destroy=M}$on(e,t){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(t),()=>{const l=s.indexOf(t);l!==-1&&s.splice(l,1)}}$set(e){this.$$set&&!cn(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Ne=[];function on(n,e){return{subscribe:pt(n,e).subscribe}}function pt(n,e=M){let t;const s=new Set;function l(r){if(_e(n,r)&&(n=r,t)){const f=!Ne.length;for(const d of s)d[1](),Ne.push(d,n);if(f){for(let d=0;d<Ne.length;d+=2)Ne[d][0](Ne[d+1]);Ne.length=0}}}function i(r){l(r(n))}function o(r,f=M){const d=[r,f];return s.add(d),s.size===1&&(t=e(l)||M),r(n),()=>{s.delete(d),s.size===0&&(t(),t=null)}}return{set:l,update:i,subscribe:o}}function rn(n,e,t){const s=!Array.isArray(n),l=s?[n]:n,i=e.length<2;return on(t,o=>{let r=!1;const f=[];let d=0,u=M;const _=()=>{if(d)return;u();const j=e(s?f[0]:f,o);i?o(j):u=Zt(j)?j:M},w=l.map((j,h)=>$t(j,S=>{f[h]=S,d&=~(1<<h),r&&_()},()=>{d|=1<<h}));return r=!0,_(),function(){ke(w),u()}})}function mn(n,e){if(n instanceof RegExp)return{keys:!1,pattern:n};var t,s,l,i,o=[],r="",f=n.split("/");for(f[0]||f.shift();l=f.shift();)t=l[0],t==="*"?(o.push("wild"),r+="/(.*)"):t===":"?(s=l.indexOf("?",1),i=l.indexOf(".",1),o.push(l.substring(1,~s?s:~i?i:l.length)),r+=!!~s&&!~i?"(?:/([^/]+?))?":"/([^/]+?)",~i&&(r+=(~s?"?":"")+"\\"+l.substring(i))):r+="/"+l;return{keys:o,pattern:new RegExp("^"+r+(e?"(?=$|/)":"/?$"),"i")}}function gn(n){let e,t,s;const l=[n[2]];var i=n[0];function o(r){let f={};for(let d=0;d<l.length;d+=1)f=Qt(f,l[d]);return{props:f}}return i&&(e=new i(o()),e.$on("routeEvent",n[7])),{c(){e&&Re(e.$$.fragment),t=at()},m(r,f){e&&Oe(e,r,f),O(r,t,f),s=!0},p(r,f){const d=f&4?ln(l,[sn(r[2])]):{};if(i!==(i=r[0])){if(e){ut();const u=e;we(u.$$.fragment,1,0,()=>{Se(u,1)}),dt()}i?(e=new i(o()),e.$on("routeEvent",r[7]),Re(e.$$.fragment),he(e.$$.fragment,1),Oe(e,t.parentNode,t)):e=null}else i&&e.$set(d)},i(r){s||(e&&he(e.$$.fragment,r),s=!0)},o(r){e&&we(e.$$.fragment,r),s=!1},d(r){r&&N(t),e&&Se(e,r)}}}function vn(n){let e,t,s;const l=[{params:n[1]},n[2]];var i=n[0];function o(r){let f={};for(let d=0;d<l.length;d+=1)f=Qt(f,l[d]);return{props:f}}return i&&(e=new i(o()),e.$on("routeEvent",n[6])),{c(){e&&Re(e.$$.fragment),t=at()},m(r,f){e&&Oe(e,r,f),O(r,t,f),s=!0},p(r,f){const d=f&6?ln(l,[f&2&&{params:r[1]},f&4&&sn(r[2])]):{};if(i!==(i=r[0])){if(e){ut();const u=e;we(u.$$.fragment,1,0,()=>{Se(u,1)}),dt()}i?(e=new i(o()),e.$on("routeEvent",r[6]),Re(e.$$.fragment),he(e.$$.fragment,1),Oe(e,t.parentNode,t)):e=null}else i&&e.$set(d)},i(r){s||(e&&he(e.$$.fragment,r),s=!0)},o(r){e&&we(e.$$.fragment,r),s=!1},d(r){r&&N(t),e&&Se(e,r)}}}function bn(n){let e,t,s,l;const i=[vn,gn],o=[];function r(f,d){return f[1]?0:1}return e=r(n),t=o[e]=i[e](n),{c(){t.c(),s=at()},m(f,d){o[e].m(f,d),O(f,s,d),l=!0},p(f,[d]){let u=e;e=r(f),e===u?o[e].p(f,d):(ut(),we(o[u],1,1,()=>{o[u]=null}),dt(),t=o[e],t?t.p(f,d):(t=o[e]=i[e](f),t.c()),he(t,1),t.m(s.parentNode,s))},i(f){l||(he(t),l=!0)},o(f){we(t),l=!1},d(f){o[e].d(f),f&&N(s)}}}function Ot(){const n=window.location.href.indexOf("#/");let e=n>-1?window.location.href.substr(n+1):"/";const t=e.indexOf("?");let s="";return t>-1&&(s=e.substr(t+1),e=e.substr(0,t)),{location:e,querystring:s}}const ht=on(null,function(e){e(Ot());const t=()=>{e(Ot())};return window.addEventListener("hashchange",t,!1),function(){window.removeEventListener("hashchange",t,!1)}}),wn=rn(ht,n=>n.location),kn=rn(ht,n=>n.querystring),St=pt(void 0);async function yn(){await tn(),window.history.back()}function jn(n){n?window.scrollTo(n.__svelte_spa_router_scrollX,n.__svelte_spa_router_scrollY):window.scrollTo(0,0)}function Cn(n,e,t){let{routes:s={}}=e,{prefix:l=""}=e,{restoreScrollState:i=!1}=e;class o{constructor(b,k){if(!k||typeof k!="function"&&(typeof k!="object"||k._sveltesparouter!==!0))throw Error("Invalid component object");if(!b||typeof b=="string"&&(b.length<1||b.charAt(0)!="/"&&b.charAt(0)!="*")||typeof b=="object"&&!(b instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:U,keys:E}=mn(b);this.path=b,typeof k=="object"&&k._sveltesparouter===!0?(this.component=k.component,this.conditions=k.conditions||[],this.userData=k.userData,this.props=k.props||{}):(this.component=()=>Promise.resolve(k),this.conditions=[],this.props={}),this._pattern=U,this._keys=E}match(b){if(l){if(typeof l=="string")if(b.startsWith(l))b=b.substr(l.length)||"/";else return null;else if(l instanceof RegExp){const T=b.match(l);if(T&&T[0])b=b.substr(T[0].length)||"/";else return null}}const k=this._pattern.exec(b);if(k===null)return null;if(this._keys===!1)return k;const U={};let E=0;for(;E<this._keys.length;){try{U[this._keys[E]]=decodeURIComponent(k[E+1]||"")||null}catch{U[this._keys[E]]=null}E++}return U}async checkConditions(b){for(let k=0;k<this.conditions.length;k++)if(!await this.conditions[k](b))return!1;return!0}}const r=[];s instanceof Map?s.forEach((g,b)=>{r.push(new o(b,g))}):Object.keys(s).forEach(g=>{r.push(new o(g,s[g]))});let f=null,d=null,u={};const _=pn();async function w(g,b){await tn(),_(g,b)}let j=null,h=null;i&&(h=g=>{g.state&&(g.state.__svelte_spa_router_scrollY||g.state.__svelte_spa_router_scrollX)?j=g.state:j=null},window.addEventListener("popstate",h),un(()=>{jn(j)}));let S=null,R=null;const q=ht.subscribe(async g=>{S=g;let b=0;for(;b<r.length;){const k=r[b].match(g.location);if(!k){b++;continue}const U={route:r[b].path,location:g.location,querystring:g.querystring,userData:r[b].userData,params:k&&typeof k=="object"&&Object.keys(k).length?k:null};if(!await r[b].checkConditions(U)){t(0,f=null),R=null,w("conditionsFailed",U);return}w("routeLoading",Object.assign({},U));const E=r[b].component;if(R!=E){E.loading?(t(0,f=E.loading),R=E,t(1,d=E.loadingParams),t(2,u={}),w("routeLoaded",Object.assign({},U,{component:f,name:f.name,params:d}))):(t(0,f=null),R=null);const T=await E();if(g!=S)return;t(0,f=T&&T.default||T),R=E}k&&typeof k=="object"&&Object.keys(k).length?t(1,d=k):t(1,d=null),t(2,u=r[b].props),w("routeLoaded",Object.assign({},U,{component:f,name:f.name,params:d})).then(()=>{St.set(d)});return}t(0,f=null),R=null,St.set(void 0)});dn(()=>{q(),h&&window.removeEventListener("popstate",h)});function z(g){Ct.call(this,n,g)}function C(g){Ct.call(this,n,g)}return n.$$set=g=>{"routes"in g&&t(3,s=g.routes),"prefix"in g&&t(4,l=g.prefix),"restoreScrollState"in g&&t(5,i=g.restoreScrollState)},n.$$.update=()=>{n.$$.dirty&32&&(history.scrollRestoration=i?"manual":"auto")},[f,d,u,s,l,i,z,C]}class En extends je{constructor(e){super(),ye(this,e,Cn,bn,_e,{routes:3,prefix:4,restoreScrollState:5})}}function Lt(n,e,t){const s=n.slice();return s[5]=e[t],s}function At(n,e,t){const s=n.slice();return s[8]=e[t],s}function Tt(n){let e;return{c(){e=p("div"),e.textContent="new!",a(e,"class","newposttag svelte-1riyko1")},m(t,s){O(t,e,s)},d(t){t&&N(e)}}}function Ut(n){let e,t=n[5].contains,s=[];for(let l=0;l<t.length;l+=1)s[l]=Rt(At(n,t,l));return{c(){e=p("div");for(let l=0;l<s.length;l+=1)s[l].c();a(e,"class","contains svelte-1riyko1")},m(l,i){O(l,e,i);for(let o=0;o<s.length;o+=1)s[o].m(e,null)},p(l,i){if(i&1){t=l[5].contains;let o;for(o=0;o<t.length;o+=1){const r=At(l,t,o);s[o]?s[o].p(r,i):(s[o]=Rt(r),s[o].c(),s[o].m(e,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=t.length}},d(l){l&&N(e),He(s,l)}}}function Rt(n){let e,t=n[8]+"",s;return{c(){e=p("span"),s=L(t),a(e,"class","svelte-1riyko1")},m(l,i){O(l,e,i),c(e,s)},p(l,i){i&1&&t!==(t=l[8]+"")&&V(s,t)},d(l){l&&N(e)}}}function qt(n){let e;return{c(){e=p("div"),e.textContent="[Dead]",a(e,"class","dead svelte-1riyko1")},m(t,s){O(t,e,s)},d(t){t&&N(e)}}}function Dt(n){let e,t,s,l,i,o,r,f,d,u=n[5].name+"",_,w,j,h=n[5].host+"",S,R,q=n[1].find(B),z,C,g,b,k=n[5].updates+"",U,E,T,Y,y,A,F,re,Z,ce,ae,D,ue,J;function B(...W){return n[2](n[5],...W)}let G=q&&Tt(),I=n[5].contains.length>0&&Ut(n),K=n[5].dead&&qt();function Ce(...W){return n[3](n[5],...W)}return{c(){e=p("div"),t=p("div"),s=p("div"),l=p("a"),i=p("img"),f=m(),d=p("div"),_=L(u),w=m(),j=p("div"),S=L(h),R=m(),G&&G.c(),z=m(),I&&I.c(),C=m(),g=p("div"),b=p("strong"),b.textContent="Updates: ",U=L(k),E=m(),T=p("div"),K&&K.c(),Y=m(),y=p("div"),A=p("a"),F=L("open link"),Z=m(),ce=p("div"),ae=p("a"),D=L("view channel"),J=m(),a(i,"loading","lazy"),be(i.src,o=n[5].thumb)||a(i,"src",o),a(i,"alt",""),a(i,"class","svelte-1riyko1"),a(l,"href",r=n[5].link),a(l,"target","_blank"),a(s,"class","thumb svelte-1riyko1"),a(d,"class","title svelte-1riyko1"),a(j,"class","hostName svelte-1riyko1"),a(g,"class","updates svelte-1riyko1"),a(t,"class","card-container"),a(A,"target","_blank"),a(A,"href",re=n[5].link),a(A,"class","svelte-1riyko1"),a(y,"class","feed-btn svelte-1riyko1"),a(ae,"href",ue="#/new?id="+n[5].id),a(ae,"class","svelte-1riyko1"),a(ce,"class","feed-btn svelte-1riyko1"),a(T,"class","card-container feed-btn-container svelte-1riyko1"),a(e,"class","card svelte-1riyko1"),Q(e,"newpost",n[1].find(Ce))},m(W,H){O(W,e,H),c(e,t),c(t,s),c(s,l),c(l,i),c(t,f),c(t,d),c(d,_),c(t,w),c(t,j),c(j,S),c(t,R),G&&G.m(t,null),c(t,z),I&&I.m(t,null),c(t,C),c(t,g),c(g,b),c(g,U),c(e,E),c(e,T),K&&K.m(T,null),c(T,Y),c(T,y),c(y,A),c(A,F),c(T,Z),c(T,ce),c(ce,ae),c(ae,D),c(e,J)},p(W,H){n=W,H&1&&!be(i.src,o=n[5].thumb)&&a(i,"src",o),H&1&&r!==(r=n[5].link)&&a(l,"href",r),H&1&&u!==(u=n[5].name+"")&&V(_,u),H&1&&h!==(h=n[5].host+"")&&V(S,h),H&3&&(q=n[1].find(B)),q?G||(G=Tt(),G.c(),G.m(t,z)):G&&(G.d(1),G=null),n[5].contains.length>0?I?I.p(n,H):(I=Ut(n),I.c(),I.m(t,C)):I&&(I.d(1),I=null),H&1&&k!==(k=n[5].updates+"")&&V(U,k),n[5].dead?K||(K=qt(),K.c(),K.m(T,Y)):K&&(K.d(1),K=null),H&1&&re!==(re=n[5].link)&&a(A,"href",re),H&1&&ue!==(ue="#/new?id="+n[5].id)&&a(ae,"href",ue),H&3&&Q(e,"newpost",n[1].find(Ce))},d(W){W&&N(e),G&&G.d(),I&&I.d(),K&&K.d()}}}function Nn(n){let e,t,s,l,i=[...n[0]].reverse(),o=[];for(let r=0;r<i.length;r+=1)o[r]=Dt(Lt(n,i,r));return{c(){e=p("main"),t=p("h1"),t.textContent="Active Channels",s=m(),l=p("div");for(let r=0;r<o.length;r+=1)o[r].c();a(t,"class","svelte-1riyko1"),a(l,"class","container svelte-1riyko1"),a(e,"class","svelte-1riyko1")},m(r,f){O(r,e,f),c(e,t),c(e,s),c(e,l);for(let d=0;d<o.length;d+=1)o[d].m(l,null)},p(r,[f]){if(f&3){i=[...r[0]].reverse();let d;for(d=0;d<i.length;d+=1){const u=Lt(r,i,d);o[d]?o[d].p(u,f):(o[d]=Dt(u),o[d].c(),o[d].m(l,null))}for(;d<o.length;d+=1)o[d].d(1);o.length=i.length}},i:M,o:M,d(r){r&&N(e),He(o,r)}}}function On(n,e,t){let s=[],l=[];return ft(async()=>{t(1,l=await(await fetch("/api/getnews")).json()),t(0,s=await(await fetch("/api/channels")).json()),console.log(s)}),[s,l,(r,f)=>f.channelid===r.id,(r,f)=>f.channelid===r.id]}class Sn extends je{constructor(e){super(),ye(this,e,On,Nn,_e,{})}}const qe=pt(0);function Pt(n,e,t){const s=n.slice();return s[6]=e[t],s[8]=t,s}function Ft(n){let e;return{c(){e=p("div"),e.textContent="[ NEW !]",a(e,"class","newposttag svelte-1s5dtoj")},m(t,s){O(t,e,s)},d(t){t&&N(e)}}}function It(n){let e,t,s,l=n[6].date+"",i,o,r,f=n[6].title+"",d,u,_=n[1].find(ae)&&n[2],w,j,h,S,R,q,z=n[6].content+"",C,g,b,k,U,E,T,Y,y,A,F,re,Z,ce;function ae(...J){return n[4](n[6],...J)}let D=_&&Ft();function ue(...J){return n[5](n[6],...J)}return{c(){e=p("div"),t=p("div"),s=p("div"),i=L(l),o=m(),r=p("h2"),d=L(f),u=m(),D&&D.c(),w=m(),j=p("div"),h=p("img"),R=m(),q=p("div"),C=L(z),g=m(),b=p("div"),k=p("div"),U=p("div"),E=p("a"),T=L("open link"),y=m(),A=p("div"),F=p("a"),re=L("view channel"),ce=m(),a(s,"class","date svelte-1s5dtoj"),a(r,"class","svelte-1s5dtoj"),a(h,"loading","lazy"),be(h.src,S=n[6].image)||a(h,"src",S),a(h,"alt",""),a(h,"class","svelte-1s5dtoj"),a(j,"class","thumb svelte-1s5dtoj"),a(q,"class","channelcontent svelte-1s5dtoj"),a(t,"class","card-container svelte-1s5dtoj"),a(E,"target","_blank"),a(E,"href",Y=n[6].link),a(E,"class","svelte-1s5dtoj"),a(U,"class","feed-btn svelte-1s5dtoj"),a(F,"href",Z="#/new?id="+n[6].channelid),a(F,"class","svelte-1s5dtoj"),a(A,"class","feed-btn svelte-1s5dtoj"),a(k,"class","card-container feed-btn-container svelte-1s5dtoj"),a(b,"class","feed-btn-holder svelte-1s5dtoj"),a(e,"class","card svelte-1s5dtoj"),Q(e,"newpost",n[1].find(ue)&&n[2])},m(J,B){O(J,e,B),c(e,t),c(t,s),c(s,i),c(t,o),c(t,r),c(r,d),c(t,u),D&&D.m(t,null),c(t,w),c(t,j),c(j,h),c(t,R),c(t,q),c(q,C),c(e,g),c(e,b),c(b,k),c(k,U),c(U,E),c(E,T),c(k,y),c(k,A),c(A,F),c(F,re),c(e,ce)},p(J,B){n=J,B&1&&l!==(l=n[6].date+"")&&V(i,l),B&1&&f!==(f=n[6].title+"")&&V(d,f),B&7&&(_=n[1].find(ae)&&n[2]),_?D||(D=Ft(),D.c(),D.m(t,w)):D&&(D.d(1),D=null),B&1&&!be(h.src,S=n[6].image)&&a(h,"src",S),B&1&&z!==(z=n[6].content+"")&&V(C,z),B&1&&Y!==(Y=n[6].link)&&a(E,"href",Y),B&1&&Z!==(Z="#/new?id="+n[6].channelid)&&a(F,"href",Z),B&7&&Q(e,"newpost",n[1].find(ue)&&n[2])},d(J){J&&N(e),D&&D.d()}}}function Ln(n){let e,t,s,l,i,o,r,f,d,u=[...n[0]].reverse(),_=[];for(let w=0;w<u.length;w+=1)_[w]=It(Pt(n,u,w));return{c(){e=p("main"),t=p("h1"),t.textContent="Feed",s=m(),l=p("div"),i=p("button"),i.textContent="mark as read",o=m(),r=p("div");for(let w=0;w<_.length;w+=1)_[w].c();a(t,"class","svelte-1s5dtoj"),a(i,"class","svelte-1s5dtoj"),a(l,"class","feedoptions svelte-1s5dtoj"),a(r,"class","container svelte-1s5dtoj"),a(e,"class","svelte-1s5dtoj")},m(w,j){O(w,e,j),c(e,t),c(e,s),c(e,l),c(l,i),c(e,o),c(e,r);for(let h=0;h<_.length;h+=1)_[h].m(r,null);f||(d=oe(i,"click",n[3]),f=!0)},p(w,[j]){if(j&7){u=[...w[0]].reverse();let h;for(h=0;h<u.length;h+=1){const S=Pt(w,u,h);_[h]?_[h].p(S,j):(_[h]=It(S),_[h].c(),_[h].m(r,null))}for(;h<_.length;h+=1)_[h].d(1);_.length=u.length}},i:M,o:M,d(w){w&&N(e),He(_,w),f=!1,d()}}}function An(n,e,t){let s=[],l=[],i=!0;const o=async()=>{const d=await(await fetch("/api/readallnews")).json();console.log(d),qe.update(u=>0),t(2,i=!1)};return ft(async()=>{t(0,s=await(await fetch("/api/feed")).json()),t(1,l=await(await fetch("/api/getnews")).json()),console.log(s,l)}),[s,l,i,o,(d,u)=>u.postid===d.postid,(d,u)=>u.postid===d.postid]}class Tn extends je{constructor(e){super(),ye(this,e,An,Ln,_e,{})}}function zt(n,e,t){const s=n.slice();return s[24]=e[t],s}function Un(n){let e;return{c(){e=L("New!")},m(t,s){O(t,e,s)},p:M,d(t){t&&N(e)}}}function Rn(n){let e,t=n[1].id+"",s,l,i,o,r;return{c(){e=L("Updating "),s=L(t),l=m(),i=p("button"),i.textContent="Clear",a(i,"class","svelte-1pn05g9")},m(f,d){O(f,e,d),O(f,s,d),O(f,l,d),O(f,i,d),o||(r=oe(i,"click",n[6]),o=!0)},p(f,d){d&2&&t!==(t=f[1].id+"")&&V(s,t)},d(f){f&&N(e),f&&N(s),f&&N(l),f&&N(i),o=!1,r()}}}function Mt(n){let e,t,s,l,i,o;return{c(){e=p("div"),t=p("label"),t.textContent="dead",s=m(),l=p("input"),a(t,"for","dead"),a(l,"id","dead"),a(l,"type","checkbox"),a(l,"class","svelte-1pn05g9"),a(e,"class","select-holder svelte-1pn05g9")},m(r,f){O(r,e,f),c(e,t),c(e,s),c(e,l),l.checked=n[1].dead,i||(o=oe(l,"change",n[17]),i=!0)},p(r,f){f&2&&(l.checked=r[1].dead)},d(r){r&&N(e),i=!1,o()}}}function qn(n){let e,t,s;return{c(){e=p("button"),e.textContent="New!",a(e,"type","button"),a(e,"class","svelte-1pn05g9")},m(l,i){O(l,e,i),t||(s=oe(e,"click",n[8]),t=!0)},p:M,d(l){l&&N(e),t=!1,s()}}}function Dn(n){let e,t,s;return{c(){e=p("button"),e.textContent="Update!",a(e,"type","button"),a(e,"class","svelte-1pn05g9")},m(l,i){O(l,e,i),t||(s=oe(e,"click",n[7]),t=!0)},p:M,d(l){l&&N(e),t=!1,s()}}}function Jt(n){let e,t,s;return{c(){e=p("button"),e.textContent="Delete!",a(e,"type","button"),a(e,"class","svelte-1pn05g9")},m(l,i){O(l,e,i),t||(s=oe(e,"click",n[9]),t=!0)},p:M,d(l){l&&N(e),t=!1,s()}}}function Bt(n){let e,t;return{c(){e=p("img"),be(e.src,t=n[1].thumb)||a(e,"src",t),a(e,"alt","data.name")},m(s,l){O(s,e,l)},p(s,l){l&2&&!be(e.src,t=s[1].thumb)&&a(e,"src",t)},d(s){s&&N(e)}}}function Wt(n){let e;return{c(){e=p("span"),e.textContent="[Dead]",a(e,"class","dead svelte-1pn05g9")},m(t,s){O(t,e,s)},d(t){t&&N(e)}}}function Xt(n){let e,t=n[1].contains,s=[];for(let l=0;l<t.length;l+=1)s[l]=Yt(zt(n,t,l));return{c(){e=p("div");for(let l=0;l<s.length;l+=1)s[l].c();a(e,"class","contains svelte-1pn05g9")},m(l,i){O(l,e,i);for(let o=0;o<s.length;o+=1)s[o].m(e,null)},p(l,i){if(i&2){t=l[1].contains;let o;for(o=0;o<t.length;o+=1){const r=zt(l,t,o);s[o]?s[o].p(r,i):(s[o]=Yt(r),s[o].c(),s[o].m(e,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=t.length}},d(l){l&&N(e),He(s,l)}}}function Yt(n){let e,t=n[24]+"",s;return{c(){e=p("span"),s=L(t),a(e,"class","svelte-1pn05g9")},m(l,i){O(l,e,i),c(e,s)},p(l,i){i&2&&t!==(t=l[24]+"")&&V(s,t)},d(l){l&&N(e)}}}function Gt(n){let e,t,s=n[1].updates+"",l;return{c(){e=p("div"),t=L("Updates: "),l=L(s),a(e,"class","replies svelte-1pn05g9")},m(i,o){O(i,e,o),c(e,t),c(e,l)},p(i,o){o&2&&s!==(s=i[1].updates+"")&&V(l,s)},d(i){i&&N(e)}}}function Kt(n){let e,t,s,l,i,o,r,f,d,u;return{c(){e=p("div"),t=p("a"),s=L("visit"),i=m(),o=p("a"),r=p("img"),d=L(" archive.ph"),a(t,"class","btn-link svelte-1pn05g9"),a(t,"target","_blank"),a(t,"href",l=n[1].link),a(r,"alt",""),be(r.src,f="https://archive.ph/apple-touch-icon-144x144.png")||a(r,"src",f),a(r,"class","svelte-1pn05g9"),a(o,"class","btn-link svelte-1pn05g9"),a(o,"target","_blank"),a(o,"href",u="https://archive.today/?run=1&url="+n[1].link),a(e,"class","btn-links-holder svelte-1pn05g9")},m(_,w){O(_,e,w),c(e,t),c(t,s),c(e,i),c(e,o),c(o,r),c(o,d)},p(_,w){w&2&&l!==(l=_[1].link)&&a(t,"href",l),w&2&&u!==(u="https://archive.today/?run=1&url="+_[1].link)&&a(o,"href",u)},d(_){_&&N(e)}}}function Ht(n){let e,t,s,l,i,o=n[1].laspost+"",r;return{c(){e=p("div"),t=p("div"),s=p("h4"),s.textContent="Last update:",l=m(),i=p("div"),r=L(o),a(s,"class","data-content svelte-1pn05g9"),a(i,"class","status-text svelte-1pn05g9"),a(t,"class","status-content"),a(e,"class","svelte-1pn05g9"),Q(e,"newpost",n[5].find(n[18]))},m(f,d){O(f,e,d),c(e,t),c(t,s),c(t,l),c(t,i),c(i,r)},p(f,d){d&2&&o!==(o=f[1].laspost+"")&&V(r,o),d&34&&Q(e,"newpost",f[5].find(f[18]))},d(f){f&&N(e)}}}function Pn(n){let e,t,s,l,i,o,r,f,d,u,_,w,j,h,S,R,q,z,C,g,b,k,U,E,T,Y,y,A,F,re,Z,ce,ae,D,ue,J,B,G,I,K,Ce,W,H,_t,Ee,me,Ve,X,Ze,De,Pe=n[1].name+"",$e,mt,Fe,Ie=n[1].host+"",xe,gt,et,tt,vt,ge,nt,Le,ze,bt,Me,Je,lt,st,wt;function kt(v,P){return v[1].id!=""?Rn:Un}let Be=kt(n),de=Be(n),$=n[1].id!=""&&Mt(n);function yt(v,P){return v[1].id!=""?Dn:qn}let We=yt(n),pe=We(n),x=n[1].id!=""&&Jt(n),ee=n[1].thumb!=""&&Bt(n),ie=n[1].dead&&Wt(),te=n[1].contains.length>0&&Xt(n),ne=n[1].id!=""&&Gt(n),le=n[3]&&Kt(n),se=n[1].laspost!=""&&Ht(n);return{c(){e=p("main"),t=p("section"),s=p("div"),de.c(),l=m(),i=p("form"),o=p("div"),r=p("label"),r.textContent="name",f=m(),d=p("input"),u=m(),_=p("div"),w=p("label"),w.textContent="link",j=m(),h=p("input"),S=m(),R=p("div"),q=p("label"),q.textContent="observeName",z=m(),C=p("input"),g=m(),b=p("div"),k=p("label"),k.textContent="contains",U=m(),E=p("input"),T=m(),Y=p("div"),y=p("label"),y.textContent="thumb",A=m(),F=p("input"),re=m(),Z=p("div"),ce=p("label"),ce.textContent="meta",ae=m(),D=p("textarea"),ue=m(),J=p("div"),B=p("label"),B.textContent="news on top",G=m(),I=p("input"),K=m(),$&&$.c(),Ce=m(),W=p("div"),pe.c(),H=m(),x&&x.c(),_t=m(),Ee=p("div"),me=p("div"),ee&&ee.c(),Ve=m(),X=p("div"),ie&&ie.c(),Ze=m(),De=p("h3"),$e=L(Pe),mt=m(),Fe=p("div"),xe=L(Ie),gt=m(),te&&te.c(),et=m(),ne&&ne.c(),tt=m(),le&&le.c(),vt=m(),ge=p("div"),se&&se.c(),nt=m(),Le=p("div"),ze=p("h4"),ze.textContent="STATUS:",bt=m(),Me=p("div"),Je=p("div"),lt=L(n[4]),a(s,"class","id svelte-1pn05g9"),a(r,"for","name"),a(d,"id","name"),a(d,"placeholder","name*"),a(d,"class","svelte-1pn05g9"),a(o,"class","svelte-1pn05g9"),a(w,"for","link"),a(h,"id","link"),a(h,"placeholder","link*"),a(h,"class","svelte-1pn05g9"),a(_,"class","svelte-1pn05g9"),a(q,"for","observeName"),a(C,"id","observeName"),a(C,"placeholder","observer*"),a(C,"class","svelte-1pn05g9"),a(R,"class","svelte-1pn05g9"),a(k,"for","containsstr"),a(E,"id","containsstr"),a(E,"placeholder","contains"),a(E,"class","svelte-1pn05g9"),a(b,"class","svelte-1pn05g9"),a(y,"for","thumb"),a(F,"id","thumb"),a(F,"placeholder","thumb"),a(F,"class","svelte-1pn05g9"),a(Y,"class","svelte-1pn05g9"),a(ce,"for","meta"),a(D,"id","meta"),a(D,"placeholder","meta"),a(Z,"class","svelte-1pn05g9"),a(B,"for","newestOnTop"),a(I,"id","newestOnTop"),a(I,"type","checkbox"),a(I,"class","svelte-1pn05g9"),a(J,"class","select-holder svelte-1pn05g9"),a(W,"class","form-btns-holder svelte-1pn05g9"),a(i,"class","svelte-1pn05g9"),a(De,"class","svelte-1pn05g9"),a(Fe,"class","hostName svelte-1pn05g9"),a(X,"class","postdata svelte-1pn05g9"),a(me,"class","thumb"),a(ze,"class","svelte-1pn05g9"),a(Je,"class","status-text svelte-1pn05g9"),a(Me,"class","status-content"),a(ge,"class","status"),a(Ee,"class","thumb-holder svelte-1pn05g9"),a(t,"class","svelte-1pn05g9"),Q(t,"btnActive",n[2]),a(e,"class","svelte-1pn05g9")},m(v,P){O(v,e,P),c(e,t),c(t,s),de.m(s,null),c(t,l),c(t,i),c(i,o),c(o,r),c(o,f),c(o,d),fe(d,n[1].name),c(i,u),c(i,_),c(_,w),c(_,j),c(_,h),fe(h,n[1].link),c(i,S),c(i,R),c(R,q),c(R,z),c(R,C),fe(C,n[1].observeName),c(i,g),c(i,b),c(b,k),c(b,U),c(b,E),fe(E,n[0]),c(i,T),c(i,Y),c(Y,y),c(Y,A),c(Y,F),fe(F,n[1].thumb),c(i,re),c(i,Z),c(Z,ce),c(Z,ae),c(Z,D),fe(D,n[1].meta),c(i,ue),c(i,J),c(J,B),c(J,G),c(J,I),I.checked=n[1].newestOnTop,c(i,K),$&&$.m(i,null),c(i,Ce),c(i,W),pe.m(W,null),c(W,H),x&&x.m(W,null),c(t,_t),c(t,Ee),c(Ee,me),ee&&ee.m(me,null),c(me,Ve),c(me,X),ie&&ie.m(X,null),c(X,Ze),c(X,De),c(De,$e),c(X,mt),c(X,Fe),c(Fe,xe),c(X,gt),te&&te.m(X,null),c(X,et),ne&&ne.m(X,null),c(X,tt),le&&le.m(X,null),c(Ee,vt),c(Ee,ge),se&&se.m(ge,null),c(ge,nt),c(ge,Le),c(Le,ze),c(Le,bt),c(Le,Me),c(Me,Je),c(Je,lt),st||(wt=[oe(d,"input",n[10]),oe(h,"input",n[11]),oe(C,"input",n[12]),oe(E,"input",n[13]),oe(F,"input",n[14]),oe(D,"input",n[15]),oe(I,"change",n[16])],st=!0)},p(v,[P]){Be===(Be=kt(v))&&de?de.p(v,P):(de.d(1),de=Be(v),de&&(de.c(),de.m(s,null))),P&2&&d.value!==v[1].name&&fe(d,v[1].name),P&2&&h.value!==v[1].link&&fe(h,v[1].link),P&2&&C.value!==v[1].observeName&&fe(C,v[1].observeName),P&1&&E.value!==v[0]&&fe(E,v[0]),P&2&&F.value!==v[1].thumb&&fe(F,v[1].thumb),P&2&&fe(D,v[1].meta),P&2&&(I.checked=v[1].newestOnTop),v[1].id!=""?$?$.p(v,P):($=Mt(v),$.c(),$.m(i,Ce)):$&&($.d(1),$=null),We===(We=yt(v))&&pe?pe.p(v,P):(pe.d(1),pe=We(v),pe&&(pe.c(),pe.m(W,H))),v[1].id!=""?x?x.p(v,P):(x=Jt(v),x.c(),x.m(W,null)):x&&(x.d(1),x=null),v[1].thumb!=""?ee?ee.p(v,P):(ee=Bt(v),ee.c(),ee.m(me,Ve)):ee&&(ee.d(1),ee=null),v[1].dead?ie||(ie=Wt(),ie.c(),ie.m(X,Ze)):ie&&(ie.d(1),ie=null),P&2&&Pe!==(Pe=v[1].name+"")&&V($e,Pe),P&2&&Ie!==(Ie=v[1].host+"")&&V(xe,Ie),v[1].contains.length>0?te?te.p(v,P):(te=Xt(v),te.c(),te.m(X,et)):te&&(te.d(1),te=null),v[1].id!=""?ne?ne.p(v,P):(ne=Gt(v),ne.c(),ne.m(X,tt)):ne&&(ne.d(1),ne=null),v[3]?le?le.p(v,P):(le=Kt(v),le.c(),le.m(X,null)):le&&(le.d(1),le=null),v[1].laspost!=""?se?se.p(v,P):(se=Ht(v),se.c(),se.m(ge,nt)):se&&(se.d(1),se=null),P&16&&V(lt,v[4]),P&4&&Q(t,"btnActive",v[2])},i:M,o:M,d(v){v&&N(e),de.d(),$&&$.d(),pe.d(),x&&x.d(),ee&&ee.d(),ie&&ie.d(),te&&te.d(),ne&&ne.d(),le&&le.d(),se&&se.d(),st=!1,ke(wt)}}}function Fn(n,e,t){let s;ot(n,kn,y=>t(19,s=y));let l=!1,i=!1,o="",r="Creating new",f=[];const d=new URLSearchParams(s),u={id:"",name:"",link:"",host:"",observeName:"",contains:[],newestOnTop:!1,thumb:"",dead:!1,laspost:"",meta:"",updates:1};ft(async()=>{for(const y in u)d.get(y)&&(typeof u[y]=="string"?t(1,u[y]=d.get(y),u):typeof u[y]=="boolean"?t(1,u[y]=d.get(y)==="true",u):typeof u[y]=="object"&&t(1,u[y]=d.get(y).split(","),u));if(d.get("id")){t(4,r="fetching data...");const y=await fetch(`/api/channels/${d.get("id")}`);if(y.ok){const A=await y.json();for(const F in u)t(1,u[F]=A[F],u);t(4,r=`Updating ${u.id}`),t(0,o=u.contains.toString()),t(5,f=await(await fetch("/api/getnews")).json()),console.log(A)}else h(),t(4,r="Url id not found")}t(2,l=!0)});const _=y=>{try{if(y==="")throw"empty selector";return document.querySelector(y),!0}catch(A){console.warn(A)}return!1},w=y=>{try{return new URL(y),!0}catch(A){console.warn(A)}return!1},j={method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer"};function h(){t(1,u.id="",u),t(1,u.name="",u),t(1,u.link="",u),t(1,u.observeName="",u),t(1,u.contains=[],u),t(1,u.newestOnTop=!1,u),t(1,u.thumb="",u),t(1,u.dead=!1,u),t(1,u.meta="",u),t(1,u.laspost="",u),t(1,u.host="",u),t(4,r="Creating new")}async function S(){try{if(console.log(u),t(4,r="posting..."),t(2,l=!1),u.name==="")throw"empty name";if(!i)throw"invalid url";if(!_(u.observeName))throw"invalid selector";t(1,u.host=new URL(u.link).hostname,u);const y=await fetch("/api/update",{...j,body:JSON.stringify(u)});console.log(y),t(4,r=`${u.id} updated!`),t(2,l=!0)}catch(y){return console.warn(y),t(4,r=`error updating, ${y}`),t(2,l=!0),!1}}async function R(){try{if(u.name==="")throw"empty name";if(!i)throw"invalid url";if(!_(u.observeName))throw"invalid selector";t(1,u.host=new URL(u.link).hostname,u),t(4,r="creating..."),t(2,l=!1),console.log("sneding...",u);const A=await(await fetch("/api/new",{...j,body:JSON.stringify(u)})).json();if(A.error)throw A;{console.log(A),t(1,u.id=A.id,u),t(4,r="updating...");const F=await(await fetch("/api/updateall")).json(),re=await(await fetch("/api/getnews")).json();qe.update(Z=>re.length),t(4,r="New target created!"),t(2,l=!0)}}catch(y){return console.warn(y),t(4,r=`error updating, ${y}`),t(2,l=!0),!1}}async function q(){t(4,r="deleting..."),t(2,l=!1),await fetch("/api/delete",{...j,body:JSON.stringify({id:u.id})}),h(),t(4,r=`${u.id} deleted!`),t(2,l=!0)}function z(){u.name=this.value,t(1,u),t(0,o)}function C(){u.link=this.value,t(1,u),t(0,o)}function g(){u.observeName=this.value,t(1,u),t(0,o)}function b(){o=this.value,t(0,o)}function k(){u.thumb=this.value,t(1,u),t(0,o)}function U(){u.meta=this.value,t(1,u),t(0,o)}function E(){u.newestOnTop=this.checked,t(1,u),t(0,o)}function T(){u.dead=this.checked,t(1,u),t(0,o)}const Y=y=>y.channelid===u.id;return n.$$.update=()=>{n.$$.dirty&3&&(t(1,u.contains=o===""?[]:o.split(","),u),t(3,i=w(u.link)))},[o,u,l,i,r,f,h,S,R,q,z,C,g,b,k,U,E,T,Y]}class In extends je{constructor(e){super(),ye(this,e,Fn,Pn,_e,{})}}function zn(n){let e,t,s;return{c(){e=p("main"),t=p("h2"),s=L(n[0]),a(e,"class","svelte-1vfehgx")},m(l,i){O(l,e,i),c(e,t),c(t,s)},p(l,[i]){i&1&&V(s,l[0])},i:M,o:M,d(l){l&&N(e)}}}function Mn(n,e,t){let s="updating...";return(async()=>{try{const l=await(await fetch("/api/updateall")).json();console.log(l);const i=await(await fetch("/api/getnews")).json();qe.update(o=>i.length),t(0,s="success!"),yn()}catch(l){t(0,s=`${l}`),console.warn(l)}})(),[s]}class Jn extends je{constructor(e){super(),ye(this,e,Mn,zn,_e,{})}}class Bn extends je{constructor(e){super(),ye(this,e,null,null,_e,{})}}function Wn(n){let e,t,s,l,i,o,r,f,d,u,_,w,j,h,S,R,q,z;return document.title=e=n[0]+" ibhub",q=new En({props:{routes:{"/":Sn,"/feed":Tn,"/new":In,"/updateall":Jn,"/about":Bn}}}),{c(){t=p("style"),t.textContent=`:root {
			--alert:#fb0000;
			--news:#fb0000;
			--header-bg: #e04001;
			--main-font-1: #800000;
			--main-font-2: #800000;
			--button-bg:#800000;
			--button-color:#ffffee;
			--header-color:#ffffee;
			--card-bg: #f0e0d6;
			--container-bg:#ffffee;
			--gradient-col-1:#fed6af;
			--gradient-col-2:#ffffee;
			--container:1300px;
		}
		body {
			background: var(--gradient-col-1);
			background: linear-gradient(0deg, var(--gradient-col-2) 0%, var(--gradient-col-1) 80%);
			background-repeat: no-repeat;
			background-attachment: fixed;
		}`,s=m(),l=p("main"),i=p("nav"),o=p("a"),o.textContent="Channels",r=m(),f=p("a"),d=L(`Feed 
			`),u=p("strong"),_=L(n[0]),w=m(),j=p("a"),j.textContent="Add",h=m(),S=p("a"),S.textContent="GET!",R=m(),Re(q.$$.fragment),a(o,"href","/#/"),a(o,"class","svelte-1naj95c"),Q(o,"active",n[1]==="/"),a(f,"href","/#/feed"),a(f,"class","svelte-1naj95c"),Q(f,"active",n[1]==="/feed"),a(j,"href","/#/new"),a(j,"class","svelte-1naj95c"),Q(j,"active",n[1]==="/new"),a(S,"href","/#/updateall"),a(S,"class","svelte-1naj95c"),Q(S,"active",n[1]==="/updateall"),a(i,"class","svelte-1naj95c")},m(C,g){c(document.head,t),O(C,s,g),O(C,l,g),c(l,i),c(i,o),c(i,r),c(i,f),c(f,d),c(f,u),c(u,_),c(i,w),c(i,j),c(i,h),c(i,S),c(l,R),Oe(q,l,null),z=!0},p(C,[g]){(!z||g&1)&&e!==(e=C[0]+" ibhub")&&(document.title=e),g&2&&Q(o,"active",C[1]==="/"),(!z||g&1)&&V(_,C[0]),g&2&&Q(f,"active",C[1]==="/feed"),g&2&&Q(j,"active",C[1]==="/new"),g&2&&Q(S,"active",C[1]==="/updateall")},i(C){z||(he(q.$$.fragment,C),z=!0)},o(C){we(q.$$.fragment,C),z=!1},d(C){N(t),C&&N(s),C&&N(l),Se(q)}}}function Xn(n,e,t){let s,l;ot(n,qe,o=>t(2,s=o)),ot(n,wn,o=>t(1,l=o)),(async()=>{const o=await(await fetch("/api/getnews")).json();qe.update(r=>o.length)})();let i="";return n.$$.update=()=>{n.$$.dirty&4&&(s>0?t(0,i=`(${s})`):t(0,i=""))},[i,l,s]}class Yn extends je{constructor(e){super(),ye(this,e,Xn,Wn,_e,{})}}new Yn({target:document.getElementById("app")});