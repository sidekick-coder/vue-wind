import $ from"./prose-code.392427a0.mjs";import{a as v,i as D,b as N,e as T,r as B,w as E,f as F,o as _,h as y,j as c,c as H,k as O,u as h,l as m,m as V,p as j,T as z}from"./entry.7fef546f.mjs";function A(r,e,i){const[t,n]=typeof e=="string"?[{},e]:[e,i],o=t.key||n;if(!o||typeof o!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+o);if(!r)throw new Error("[nuxt] [useFetch] request is missing.");const l="$f"+o,u=v(()=>{let a=r;return typeof a=="function"&&(a=a()),D(a)?a.value:a}),{server:s,lazy:p,default:f,transform:d,pick:w,watch:x,initialCache:k,...g}=t,C={...g,cache:typeof t.cache=="boolean"?void 0:t.cache},b={server:s,lazy:p,default:f,transform:d,pick:w,initialCache:k,watch:[u,...x||[]]};return N(l,()=>$fetch(u.value,C),b,"$gRmotygr1d")}const L={class:"w-full border rounded drop-shadow bg-white my-5"},M={class:"p-5"},R={class:"border-t px-5 py-2 text-right"},q={key:0},K={class:"text-center w-full py-2"},I=T({__name:"c-example",props:{file:{type:String,default:""}},async setup(r){let e,i;const t=r,n=B(!1),{data:o}=([e,i]=E(()=>A(`/api/examples/${t.file}`,"$5tsXuz3jNr")),e=await e,i(),e),l=v(()=>`example-${t.file.replace(/\//g,"-")}`);return(u,s)=>{const p=F("fa-icon"),f=$;return _(),y("div",L,[c("div",M,[(_(),H(O(h(l))))]),c("div",R,[c("button",{onClick:s[0]||(s[0]=d=>n.value=!n.value)},[m(p,{icon:"fa-solid fa-code"})])]),m(z,{name:"slide-down"},{default:V(()=>[n.value?(_(),y("div",q,[m(f,{innerHTML:h(o),rounded:!1},null,8,["innerHTML"]),c("div",K,[c("button",{onClick:s[1]||(s[1]=d=>n.value=!1)}," Hide ")])])):j("",!0)]),_:1})])}}});export{I as default};
