(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{393:function(t,s,e){"use strict";e.r(s);e(104),e(177),e(68);var a=e(62),n={props:{propsData:{type:Object,required:!0}},methods:{getPropTypeName:function(t){var s=this;return Array.isArray(t)?t.map((function(t){return s.getPropTypeName(t)})).join(" | "):Object(a.a)(t())},getPropDefaultValues:function(t){return"function"==typeof t?t():t||"undefiend"}}},r=e(2),p=Object(r.a)(n,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.propsData?e("div",{staticClass:"w-full"},t._l(t.propsData,(function(s,a,n){return e("div",{key:a,class:"grid grid-cols-12 text-left border-b py-2 px-3 last:border-b-0 overflow-y-auto"},[e("span",{staticClass:"col-span-4"},[e("span",{staticClass:"text-xs block text-gray-500"},[t._v("Name")]),t._v("\n            "+t._s(a)+"\n            "),e("span",{staticClass:"text-xs block"},[t._v("\n                "+t._s(s.description)+"\n            ")])]),t._v(" "),e("span",{staticClass:"col-span-3"},[e("span",{staticClass:"text-xs block text-gray-500"},[t._v("Type")]),t._v("\n            "+t._s(t.getPropTypeName(s.type))+"\n        ")]),t._v(" "),e("span",{staticClass:"col-span-5 text-xs"},[e("span",{staticClass:"text-xs block text-gray-500"},[t._v("Default")]),t._v("\n            "+t._s(t.getPropDefaultValues(s.default))+"\n        ")])])})),0):t._e()}),[],!1,null,null,null);s.default=p.exports}}]);