import{s as E}from"./contents-D5XusJhq.js";import{_ as M,E as V,n as N,q as T,r as a,o as $,s as q,a as c,c as l,b as i,d as F,e as m,F as d,f as u,h as g,m as w,t as r,x as R,y as j}from"./index-BedfObjg.js";const z={components:{ElMenu:V,ElSubMenu:N,ElMenuItem:T},setup(){const C=a("0"),b=a(null),S=a(null),n=a(),x=a(!0),y="/cesiumjs-learn";let _=[];const h=e=>{const o=document.getElementById(E[e].id);o&&o.scrollIntoView({behavior:"smooth",block:"start"})},v=e=>{const o=document.getElementById(e);o&&o.scrollIntoView({behavior:"smooth",block:"start"})},s=e=>{console.log("key",e),x.value=!0,e.startsWith("sub")?v(e):h(Number(e))},f=()=>{E.forEach((e,o)=>{document.getElementById(e.id),e.children&&e.children.forEach(p=>{const k=document.getElementById(p.id);if(k){const B=new IntersectionObserver(U=>{U.forEach(I=>{I.isIntersecting&&(b.value=p.id,n.value.open(o))})},{root:S.value,threshold:.6});B.observe(k),_.push(B)}})})};return $(()=>{f()}),q(()=>{_.forEach(e=>e.disconnect())}),{sections:E,activeSection:C,activeSubSection:b,scrollToSection:h,scrollToSubSection:v,handleMenuSelect:s,contentContainer:S,menuRef:n,clickCard:e=>{window.open(`#/card${e.router}`,"_blank")},showCard:x,baseUrl:y}}},D={class:"container"},L={class:"sidebar"},O=["src"],W=["src"],A={class:"content",ref:"contentContainer"},G=["id"],H=["id"],J={class:"header"},K={class:"tip"},P={class:"cardBox"},Q=["onClick"],X={class:"title"},Y=["src"];function Z(C,b,S,n,x,y){const _=g("el-menu-item"),h=g("el-sub-menu"),v=g("el-menu");return c(),l("div",D,[i("div",L,[F(v,{"default-active":n.activeSection,class:"el-menu-vertical",onSelect:n.handleMenuSelect,"unique-opened":"",ref:"menuRef"},{default:m(()=>[(c(!0),l(d,null,u(n.sections,(s,f)=>(c(),w(h,{key:s.id,index:String(f)},{title:m(()=>[i("img",{src:`${n.baseUrl}${s.iconUrl}`,class:"menuIcon"},null,8,O),i("span",null,r(s.title),1)]),default:m(()=>[(c(!0),l(d,null,u(s.children,(t,e)=>(c(),w(_,{key:t.id,index:t.id,class:R({"is-active":n.activeSubSection===t.id})},{title:m(()=>[i("img",{src:`${n.baseUrl}${t.iconUrl}`,class:"menuIcon"},null,8,W),j(" "+r(t.title),1)]),_:2},1032,["index","class"]))),128))]),_:2},1032,["index"]))),128))]),_:1},8,["default-active","onSelect"])]),i("div",A,[(c(!0),l(d,null,u(n.sections,(s,f)=>(c(),l("div",{key:s.id,id:s.id,class:"content-section"},[i("h2",null,r(s.title),1),(c(!0),l(d,null,u(s.children,(t,e)=>(c(),l("div",{key:t.id,id:t.id,class:"sub-content-section"},[i("h3",J,r(t.title),1),i("div",K,r(t.tip),1),i("div",P,[(c(!0),l(d,null,u(t.card,(o,p)=>(c(),l("div",{class:"card",key:o,onClick:k=>n.clickCard(o)},[i("div",X,r(o.title),1),i("img",{src:`${n.baseUrl}${o.url}`},null,8,Y)],8,Q))),128))])],8,H))),128))],8,G))),128))],512)])}const te=M(z,[["render",Z],["__scopeId","data-v-4f8189d4"]]);export{te as default};