import{s as g}from"./contents-Ch7XZWCx.js";import{_ as M,E as V,n as N,q as T,r as a,o as U,s as q,a as t,c as i,b as o,d as F,e as v,F as d,f as u,h as C,m as B,t as r,x as R,y as z}from"./index-ZlcCc1lM.js";const D={components:{ElMenu:V,ElSubMenu:N,ElMenuItem:T},setup(){const y=a("0"),f=a(null),m=a(null),s=a(),p=a(!0);let b=[];const _=e=>{const c=document.getElementById(g[e].id);c&&c.scrollIntoView({behavior:"smooth",block:"start"})},h=e=>{const c=document.getElementById(e);c&&c.scrollIntoView({behavior:"smooth",block:"start"})},S=e=>{console.log("key",e),p.value=!0,e.startsWith("sub")?h(e):_(Number(e))},n=()=>{g.forEach((e,c)=>{document.getElementById(e.id),e.children&&e.children.forEach(l=>{const k=document.getElementById(l.id);if(k){const E=new IntersectionObserver(w=>{w.forEach(I=>{I.isIntersecting&&(f.value=l.id,s.value.open(c))})},{root:m.value,threshold:.6});E.observe(k),b.push(E)}})})};return U(()=>{n()}),q(()=>{b.forEach(e=>e.disconnect())}),{sections:g,activeSection:y,activeSubSection:f,scrollToSection:_,scrollToSubSection:h,handleMenuSelect:S,contentContainer:m,menuRef:s,clickCard:e=>{window.open(`/card${e.router}`)},showCard:p}}},L={class:"container"},O={class:"sidebar"},W=["src"],j=["src"],A={class:"content",ref:"contentContainer"},G=["id"],H=["id"],J={class:"header"},K={class:"tip"},P={class:"cardBox"},Q=["onClick"],X={class:"title"},Y=["src"];function Z(y,f,m,s,p,b){const _=C("el-menu-item"),h=C("el-sub-menu"),S=C("el-menu");return t(),i("div",L,[o("div",O,[F(S,{"default-active":s.activeSection,class:"el-menu-vertical",onSelect:s.handleMenuSelect,"unique-opened":"",ref:"menuRef"},{default:v(()=>[(t(!0),i(d,null,u(s.sections,(n,x)=>(t(),B(h,{key:n.id,index:String(x)},{title:v(()=>[o("img",{src:n.iconUrl,class:"menuIcon"},null,8,W),o("span",null,r(n.title),1)]),default:v(()=>[(t(!0),i(d,null,u(n.children,(e,c)=>(t(),B(_,{key:e.id,index:e.id,class:R({"is-active":s.activeSubSection===e.id})},{title:v(()=>[o("img",{src:e.iconUrl,class:"menuIcon"},null,8,j),z(" "+r(e.title),1)]),_:2},1032,["index","class"]))),128))]),_:2},1032,["index"]))),128))]),_:1},8,["default-active","onSelect"])]),o("div",A,[(t(!0),i(d,null,u(s.sections,(n,x)=>(t(),i("div",{key:n.id,id:n.id,class:"content-section"},[o("h2",null,r(n.title),1),(t(!0),i(d,null,u(n.children,(e,c)=>(t(),i("div",{key:e.id,id:e.id,class:"sub-content-section"},[o("h3",J,r(e.title),1),o("div",K,r(e.tip),1),o("div",P,[(t(!0),i(d,null,u(e.card,(l,k)=>(t(),i("div",{class:"card",key:l,onClick:E=>s.clickCard(l)},[o("div",X,r(l.title),1),o("img",{src:l.url},null,8,Y)],8,Q))),128))])],8,H))),128))],8,G))),128))],512)])}const ne=M(D,[["render",Z],["__scopeId","data-v-274badb8"]]);export{ne as default};