"use strict";(self.webpackChunkPorscheDesignSystem_3_9_0=self.webpackChunkPorscheDesignSystem_3_9_0||[]).push([["table"],{3662:(t,o,e)=>{e.d(o,{b:()=>r});const r="4px"},9621:(t,o,e)=>{e.d(o,{c:()=>s,h:()=>r});const r={"&([hidden])":{display:"none"}},s={colorScheme:"light dark"}},411:(t,o,e)=>{e.d(o,{a:()=>s,f:()=>r});const r="'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif",s="calc(6px + 2.125ex)"},4876:(t,o,e)=>{e.d(o,{f:()=>r});const r="1rem"},3749:(t,o,e)=>{e.d(o,{f:()=>r});const r="clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem)"},6397:(t,o,e)=>{e.d(o,{a:()=>s,f:()=>r});const r="normal",s="normal"},5030:(t,o,e)=>{e.d(o,{f:()=>r});const r=400},7336:(t,o,e)=>{e.d(o,{f:()=>r});const r=600},1639:(t,o,e)=>{e.d(o,{g:()=>r});const r=(t,o)=>t.getAttribute(o)},2801:(t,o,e)=>{e.d(o,{g:()=>s});var r=e(8634);const s=(t,o)=>(0,r.O)(t,`[slot="${o}"]`)},4702:(t,o,e)=>{e.d(o,{h:()=>r});const r=(t,o)=>t.hasAttribute(o)},8582:(t,o,e)=>{e.d(o,{h:()=>s});var r=e(2801);const s=(t,o)=>!!(0,r.g)(t,o)},7042:(t,o,e)=>{e.d(o,{h:()=>r});const r=t=>({"@media(hover:hover)":t})},101:(t,o,e)=>{e.d(o,{i:()=>s});var r=e(8634);const s=(t,o)=>{const{parentElement:e}=t;return e&&(0,r.j)(e)===o}},2559:(t,o,e)=>{e.r(o),e.d(o,{p_table:()=>A,p_table_body:()=>H,p_table_cell:()=>P,p_table_head:()=>B,p_table_head_cell:()=>R,p_table_head_row:()=>U,p_table_row:()=>G});var r=e(8634),s=e(8582),a=e(269),i=e(9621),n=e(675),l=e(1332),c=e(4828),h=e(882),d=e(3163),p=e(3749),b=e(411),u=e(7336),g=e(1639),f=e(4702),m=e(7042),v=e(931),w=e(3662);e(2801),e(4545),e(101);const k="--p-internal-table-hover-color",C="--p-internal-table-border-color",y="--p-internal-table-head-cell-icon-filter",$=t=>{const{primaryColor:o,hoverColor:e,contrastLowColor:s}=(0,r.a2)(t),{primaryColor:a,hoverColor:h,contrastLowColor:d}=(0,r.a2)("dark");return(0,r.g)({"@global":{":host":(0,r.a)({display:"block",...l.t,color:o,textAlign:"start",...i.c,...i.h,...(0,r.q)(t,{color:a})}),"::slotted(*)":(0,r.a)({[k]:e,[C]:s,[y]:(0,r.a1)(t)?"invert(100%)":"none",...(0,r.q)(t,{[k]:h,[C]:d,[y]:"invert(100%)"}),...r.y&&(0,n.g)({[y]:"none"},{[y]:"invert(100%)"})})},caption:{marginBottom:c.s},table:{display:"table",borderCollapse:"collapse",width:"100%",whiteSpace:"nowrap"}})},x="internalSortingChange",_={caption:r.A.string,theme:r.A.oneOf(a.T)},A=class{constructor(t){(0,r.r)(this,t),this.sortingChange=(0,r.C)(this,"sortingChange",3),this.update=(0,r.C)(this,"update",3),this.caption=void 0,this.theme="light"}componentWillLoad(){var t;t=this.host,this.caption||(0,s.h)(t,"caption")||(0,r.c)(`caption has to be set via property or named slot for component ${(0,r.j)(t)} in order to ensure accessibility.`),this.host.shadowRoot.addEventListener(x,(t=>{t.stopPropagation(),this.update.emit(t.detail),this.sortingChange.emit(t.detail)}))}render(){(0,r.v)(this,_),(0,r.e)(this.host,$,this.theme);const t=(0,r.k)(this.host),o=(0,s.h)(this.host,"caption"),e="caption",a=this.caption?{"aria-label":this.caption}:o&&{"aria-labelledby":e};return(0,r.f)(r.H,null,o&&(0,r.f)("div",{id:e,class:"caption"},(0,r.f)("slot",{name:"caption"})),(0,r.f)(t.pScroller,{scrollbar:!0,theme:this.theme},(0,r.f)("div",{class:"table",role:"table",...a},(0,r.f)("slot",null))))}get host(){return(0,r.i)(this)}},S=()=>(0,r.g)({"@global":{":host":(0,r.a)({display:"table-row-group",...i.h})}}),H=class{constructor(t){(0,r.r)(this,t)}connectedCallback(){(0,h.t)(this.host,"p-table")}render(){return(0,r.e)(this.host,S),(0,r.f)(r.H,{role:"rowgroup"},(0,r.f)("slot",null))}get host(){return(0,r.i)(this)}},L=t=>(0,r.g)({"@global":{":host":{...(0,r.a)({display:"table-cell",padding:d.s,margin:0,whiteSpace:t?"normal":"nowrap",...i.h}),verticalAlign:"middle"}}}),E={multiline:r.A.boolean},P=class{constructor(t){(0,r.r)(this,t),this.multiline=!1}connectedCallback(){(0,h.t)(this.host,"p-table-row")}render(){return(0,r.v)(this,E),(0,r.e)(this.host,L,this.multiline),(0,r.f)(r.H,{role:"cell"},(0,r.f)("slot",null))}get host(){return(0,r.i)(this)}},z=()=>(0,r.g)({"@global":{":host":(0,r.a)({display:"table-header-group",fontSize:p.f,lineHeight:b.a,fontWeight:u.f,...i.h})}}),B=class{constructor(t){(0,r.r)(this,t)}connectedCallback(){(0,h.t)(this.host,"p-table")}render(){return(0,r.e)(this.host,z),(0,r.f)(r.H,{role:"rowgroup"},(0,r.f)("slot",null))}get host(){return(0,r.i)(this)}},I=t=>"asc"===t,O=(t,o)=>void 0!==t&&void 0!==o,{hoverColor:T,focusColor:W}=(0,r.x)("light"),j="-2px",q="-4px",D=(t,o,e,s)=>{const a=O(t,o);return(0,r.g)({"@global":{":host":(0,r.a)({display:"table-cell",padding:`2px ${d.s} ${d.s}`,verticalAlign:"bottom",whiteSpace:s?"normal":"nowrap",...i.h}),...a?{button:{position:"relative",display:"flex",gap:v.s,width:"auto",margin:0,padding:0,font:"inherit",color:"inherit",outline:0,alignItems:"flex-end",WebkitAppearance:"none",appearance:"none",background:"transparent",textAlign:"start",border:0,zIndex:0,cursor:"pointer","&::before":{content:'""',position:"absolute",top:j,bottom:j,right:q,left:q,borderRadius:w.b,zIndex:-1,transition:(0,r.w)("background-color")},...(0,m.h)({"&:hover, &:focus":{"& .icon":{opacity:1}},"&:hover::before":{...r.$,backgroundColor:T}}),"&:focus::before":{border:`${r.o} solid ${W}`},"&:not(:focus-visible)::before":{border:0}}}:e&&{span:{...(0,r.P)(),display:"block",border:0}}},...a&&{icon:{transition:(0,r.w)("opacity"),opacity:t?1:0,transform:`rotate3d(0,0,1,${I(o)?0:180}deg)`,transformOrigin:"50% 50%",filter:`var(${y})`}}})},N={sort:r.A.shape({id:r.A.string,active:r.A.boolean,direction:r.A.oneOf([void 0,"asc","desc"])}),hideLabel:r.A.breakpoint("boolean"),multiline:r.A.boolean},R=class{constructor(t){(0,r.r)(this,t),this.onButtonClick=()=>{var t,o;this.host.dispatchEvent(new CustomEvent(x,(t=this.sort,{bubbles:!0,detail:{...t,active:!0,direction:t.active?(o=t.direction,I(o)?"desc":"asc"):t.direction}})))},this.sort=void 0,this.hideLabel=!1,this.multiline=!1}connectedCallback(){var t,o;(0,h.t)(this.host,"p-table-head-row"),t=this.host,o="sort",(0,f.h)(t,o)&&(0,r.t)(`attribute ${o}='${(0,g.g)(t,o)}' needs to be set as property.`)}componentShouldUpdate(t,o){return(0,r.h)(t,o)}render(){(0,r.v)(this,N);const{active:t,direction:o}=this.sort||{};(0,r.e)(this.host,D,t,o,this.hideLabel,this.multiline);const e=(0,r.k)(this.host);return(0,r.f)(r.H,{scope:"col",role:"columnheader","aria-sort":(s=this.sort,s?.active?I(s.direction)?"ascending":"descending":null)},O(t,o)?(0,r.f)("button",{type:"button",onClick:this.onButtonClick},(0,r.f)("slot",null),(0,r.f)(e.pIcon,{class:"icon",color:"inherit",size:"x-small",name:"arrow-up","aria-hidden":"true"})):(0,r.f)("span",null,(0,r.f)("slot",null)));var s}get host(){return(0,r.i)(this)}},M=()=>(0,r.g)({"@global":{":host":(0,r.a)({display:"table-row",...i.h})}}),U=class{constructor(t){(0,r.r)(this,t)}connectedCallback(){(0,h.t)(this.host,"p-table-head")}render(){return(0,r.e)(this.host,M),(0,r.f)(r.H,{role:"row"},(0,r.f)("slot",null))}get host(){return(0,r.i)(this)}},F=()=>(0,r.g)({"@global":{":host":(0,r.a)({display:"table-row",borderTop:`1px solid var(${C})`,borderBottom:`1px solid var(${C})`,transition:(0,r.w)("background"),...i.h,...(0,m.h)({"&(:hover)":{background:`var(${k})`}})})}}),G=class{constructor(t){(0,r.r)(this,t)}connectedCallback(){(0,h.t)(this.host,"p-table-body")}render(){return(0,r.e)(this.host,F),(0,r.f)(r.H,{role:"row"},(0,r.f)("slot",null))}get host(){return(0,r.i)(this)}}},675:(t,o,e)=>{e.d(o,{g:()=>r});const r=(t,o)=>({"@media (forced-colors: active) and (prefers-color-scheme: light)":t,"@media (forced-colors: active) and (prefers-color-scheme: dark)":o})},4828:(t,o,e)=>{e.d(o,{s:()=>r});const r="clamp(16px, 1.25vw + 12px, 36px)"},3163:(t,o,e)=>{e.d(o,{s:()=>r});const r="clamp(8px, 0.5vw + 6px, 16px)"},931:(t,o,e)=>{e.d(o,{s:()=>r});const r="4px"},4545:(t,o,e)=>{e.d(o,{_:()=>n,a:()=>l,f:()=>i});var r=e(411),s=e(5030),a=e(6397);const i={overflowWrap:"break-word",hyphens:"auto"},n=`${a.f} ${a.a} ${s.f} `,l=`/${r.a} ${r.f}`},1332:(t,o,e)=>{e.d(o,{t:()=>a});var r=e(4545),s=e(4876);const a={font:`${r._}${s.f}${r.a}`,...r.f}},269:(t,o,e)=>{e.d(o,{T:()=>r});const r=["light","dark","auto"]},882:(t,o,e)=>{e.d(o,{t:()=>a});var r=e(8634),s=e(101);const a=(t,o)=>{if(t.parentElement&&!(0,s.i)(t,o)){const e=(0,r.k)(t)[o],s=(0,r.l)(t.parentElement);(0,r.t)(`parent HTMLElement of ${(0,r.l)(t)} should be of kind ${e} but got ${s}.`)}}}}]);