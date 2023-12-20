"use strict";(self.webpackChunkPorscheDesignSystem_3_9_0=self.webpackChunkPorscheDesignSystem_3_9_0||[]).push([["fieldset-wrapper"],{9621:(e,s,t)=>{t.d(s,{c:()=>r,h:()=>o});const o={"&([hidden])":{display:"none"}},r={colorScheme:"light dark"}},8986:(e,s,t)=>{t.d(s,{F:()=>n,h:()=>a});var o=t(6430),r=t(3630);const a={font:`${o._}${r.f}${o.a}`},n=["small","medium"]},411:(e,s,t)=>{t.d(s,{a:()=>r,f:()=>o});const o="'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif",r="calc(6px + 2.125ex)"},3630:(e,s,t)=>{t.d(s,{f:()=>o});const o=t(3559).f},7270:(e,s,t)=>{t.d(s,{f:()=>o});const o=t(4876).f},3559:(e,s,t)=>{t.d(s,{f:()=>o});const o="clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"},4876:(e,s,t)=>{t.d(s,{f:()=>o});const o="1rem"},6397:(e,s,t)=>{t.d(s,{a:()=>r,f:()=>o});const o="normal",r="normal"},5030:(e,s,t)=>{t.d(s,{f:()=>o});const o=400},7336:(e,s,t)=>{t.d(s,{f:()=>o});const o=600},2801:(e,s,t)=>{t.d(s,{g:()=>r});var o=t(8634);const r=(e,s)=>(0,o.O)(e,`[slot="${s}"]`)},8582:(e,s,t)=>{t.d(s,{h:()=>r});var o=t(2801);const r=(e,s)=>!!(0,o.g)(e,s)},6430:(e,s,t)=>{t.d(s,{_:()=>n,a:()=>l});var o=t(411),r=t(7336),a=t(6397);const n=`${a.f} ${a.a} ${r.f} `,l=`/${o.a} ${o.f}`},3868:(e,s,t)=>{t.d(s,{h:()=>a});var o=t(6430),r=t(7270);const a={font:`${o._}${r.f}${o.a}`}},8303:(e,s,t)=>{t.r(s),t.d(s,{p_fieldset_wrapper:()=>f});var o=t(8634),r=t(2037),a=t(1845),n=t(269),l=t(8986),i=t(9621),c=t(2236),h=t(3868);t(8582),t(2801),t(1332),t(4545);const d=(e,s,t,a)=>(0,o.g)({"@global":{":host":(0,o.a)({display:"block",...i.c,...i.h}),fieldset:{margin:0,padding:0,border:"none"},...t&&{legend:{margin:`0 0 ${c.s}`,padding:0,color:(0,o.x)(a).primaryColor,..."small"===s?h.h:l.h,...(0,o.q)(a,{color:(0,o.x)("dark").primaryColor})}}},...(0,r.b)(),...(0,o.m)((0,r.g)(a,e),{message:{marginTop:c.s}})}),m={label:o.A.string,labelSize:o.A.oneOf(l.F),required:o.A.boolean,state:o.A.oneOf(r.F),message:o.A.string,theme:o.A.oneOf(n.T)},f=class{constructor(e){(0,o.r)(this,e),this.label="",this.labelSize="medium",this.required=!1,this.state="none",this.message="",this.theme="light"}render(){(0,o.v)(this,m),(0,a.w)(this.host,"Please use new p-fieldset component instead."),(0,o.e)(this.host,d,this.state,this.labelSize,(0,r.h)(this.host,this.label),this.theme);const e=(0,r.c)(this.host,this.message,this.state);return(0,o.f)("fieldset",{"aria-describedby":e?r.m:null},(0,r.h)(this.host,this.label)&&(0,o.f)("legend",null,this.label||(0,o.f)("slot",{name:"label"}),this.required&&(0,o.f)(r.R,null)),(0,o.f)("slot",null),(0,o.f)(r.S,{state:this.state,message:this.message,theme:this.theme,host:this.host}))}get host(){return(0,o.i)(this)}}},2037:(e,s,t)=>{t.d(s,{F:()=>l,R:()=>p,S:()=>u,a:()=>d,b:()=>f,c:()=>h,g:()=>m,h:()=>c,m:()=>g});var o=t(8582),r=t(8634),a=t(931),n=t(1332);const l=["none","error","success"],i=e=>"error"===e?"alert":"success"===e?"status":null,c=(e,s)=>!!s||(0,o.h)(e,"label"),h=(e,s,t)=>(s||(0,o.h)(e,"message"))&&["success","error"].includes(t),d=(e,s)=>{const t=(0,r.x)(e);return{formStateColor:t[`${s}Color`],formStateHoverColor:t[`${s}ColorDarken`]}},m=(e,s,t)=>({message:{display:"flex",gap:a.s,...n.t,color:d(e,s).formStateColor,...(0,r.q)(e,{color:d("dark",s).formStateColor}),transition:(0,r.w)("color"),...t}}),f=()=>({required:{userSelect:"none"}}),g="message",u=({state:e,message:s,theme:t,host:o})=>{const a=(0,r.k)(o),n="error"===e;return h(o,s,e)&&(0,r.f)("span",{id:g,class:"message",role:i(e)},(0,r.f)(a.pIcon,{name:n?"exclamation":"check",color:n?"notification-error":"notification-success",theme:t,"aria-hidden":"true"}),s||(0,r.f)("slot",{name:"message"}))},p=()=>(0,r.f)("span",{class:"required"}," *")},2236:(e,s,t)=>{t.d(s,{s:()=>o});const o="16px"},931:(e,s,t)=>{t.d(s,{s:()=>o});const o="4px"},4545:(e,s,t)=>{t.d(s,{_:()=>l,a:()=>i,f:()=>n});var o=t(411),r=t(5030),a=t(6397);const n={overflowWrap:"break-word",hyphens:"auto"},l=`${a.f} ${a.a} ${r.f} `,i=`/${o.a} ${o.f}`},1332:(e,s,t)=>{t.d(s,{t:()=>a});var o=t(4545),r=t(4876);const a={font:`${o._}${r.f}${o.a}`,...o.f}},269:(e,s,t)=>{t.d(s,{T:()=>o});const o=["light","dark","auto"]},1845:(e,s,t)=>{t.d(s,{w:()=>r});var o=t(8634);const r=(e,s)=>{(0,o.c)(`component ${(0,o.j)(e)} is deprecated and will be removed with next major release.`,s)}}}]);