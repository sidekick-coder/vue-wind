import{_ as s}from"./w-data-table.vue_vue_type_script_setup_true_lang.c9649a44.mjs";import{e as i,o as n,c,m as d,j as r,G as m}from"./entry.7fef546f.mjs";const _={class:"bg-teal-500 text-white rounded-full px-2 text-center w-[100px]"},b=i({__name:"slot-item-column",setup(p){const t=[],a=[{name:"id",field:"id",label:"#"},{name:"title",field:"title",label:"Title"},{name:"date",field:"date",label:"Date"}];for(let e=0;e<10;e++)t.push({id:e,title:`Article ${e}`,date:`2022-01-2${e}`});return(e,f)=>{const l=s;return n(),c(l,{items:t,columns:a,class:"border"},{"item-date":d(({value:o})=>[r("div",_,m(o),1)]),_:1})}}});export{b as default};