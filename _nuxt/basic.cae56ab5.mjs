import{_ as k}from"./w-input.vue_vue_type_script_setup_true_lang.88fb46f1.mjs";import{_ as x}from"./w-btn.vue_vue_type_script_setup_true_lang.8908fd5c.mjs";import{e as v,o as b,h as E,s as $,P as y,r as c,c as B,m as _,j as d,l as u,N as h}from"./entry.7fef546f.mjs";import{p as N}from"./validation.a34a86ab.mjs";import"./input.ee8e1b2b.mjs";const S=["onSubmit"],q=v({__name:"w-form",emits:["submit"],setup(V,{expose:a,emit:l}){const t=N();function r(){!t.inputs.value.map(e=>e()).every(e=>e===!0)||l("submit")}function n(s=!1){if(s)return t.resets.value.forEach(o=>o());setTimeout(()=>{t.resets.value.forEach(o=>o())},5)}return a({submit:r,reset:n}),(s,o)=>(b(),E("form",{onSubmit:y(r,["prevent"])},[$(s.$slots,"default")],40,S))}}),C={class:"mb-4"},R={class:"mb-4"},A={class:"flex"},F=h("reset"),T=h("submit"),P=v({__name:"basic",setup(V){const a=c(),l=c(""),t=c("");function r(){alert("submit: all files valid")}function n(e){return!!e||"Field required"}function s(e){return e?e.includes("@")||"Invalid email":!0}function o(){var e;l.value="",t.value="",(e=a.value)==null||e.reset()}return(e,i)=>{const f=k,p=x,w=q;return b(),B(w,{onSubmit:r,ref_key:"formRef",ref:a},{default:_(()=>[d("div",C,[u(f,{modelValue:l.value,"onUpdate:modelValue":i[0]||(i[0]=m=>l.value=m),label:"Required",rules:[n]},null,8,["modelValue","rules"])]),d("div",R,[u(f,{modelValue:t.value,"onUpdate:modelValue":i[1]||(i[1]=m=>t.value=m),label:"Email",rules:[n,s]},null,8,["modelValue","rules"])]),d("div",A,[u(p,{class:"mr-4",color:"gray",onClick:o,type:"button"},{default:_(()=>[F]),_:1}),u(p,null,{default:_(()=>[T]),_:1})])]),_:1},512)}}});export{P as default};