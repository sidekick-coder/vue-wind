import{_ as n}from"./w-input.vue_vue_type_script_setup_true_lang.31c9fe31.mjs";import{e as c,r as d,o as i,h as m,j as o,l}from"./entry.3efad827.mjs";import"./validation.9116fd8b.mjs";import"./input.568995dd.mjs";const f={class:"flex flex-wrap"},g={class:"mb-4 w-full"},u={class:"mb-4 w-full"},v=c({__name:"modify",setup(h){const a=d("Dark mode input");function r(e){e.remove("placeholder-shown:bg-gray-200","focus:bg-white","text-gray-400").add("placeholder-shown:bg-gray-700","bg-gray-600","text-teal-500"),e.child("label").remove("text-gray-500").add("text-teal-400")}function s(e){e.remove("placeholder-shown:bg-gray-200","focus:bg-white","text-gray-400").add("placeholder-shown:bg-gray-700","bg-gray-600","text-blue-500").add("text-right"),e.child("label").remove("text-gray-500").add("text-blue-400 text-right")}return(e,_)=>{const t=n;return i(),m("div",f,[o("div",g,[l(t,{label:"Label on left",value:a.value,modify:r},null,8,["value"])]),o("div",u,[l(t,{label:"Label on right",value:a.value,modify:s},null,8,["value"])])])}}});export{v as default};
