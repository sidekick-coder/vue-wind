import{_ as o}from"./w-data-table.vue_vue_type_script_setup_true_lang.c9649a44.mjs";import{e as n,o as i,c as s}from"./entry.7fef546f.mjs";const m=n({__name:"loading",setup(c){const t=[],a=[{name:"id",field:"id",label:"#"},{name:"title",field:"title",label:"Title"},{name:"date",field:"date",label:"Date"}];for(let e=0;e<10;e++)t.push({id:e,title:`Article ${e}`,date:`2022-01-2${e}`});return(e,d)=>{const l=o;return i(),s(l,{items:t,columns:a,class:"border",loading:""})}}});export{m as default};