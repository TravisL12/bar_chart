(this["webpackJsonpbar-chart-demo"]=this["webpackJsonpbar-chart-demo"]||[]).push([[0],{94:function(t,n,e){},97:function(t,n,e){"use strict";e.r(n);var a=e(1),r=e.n(a),c=e(26),i=e.n(c),o=(e(94),e(8)),u=e(2),d=e(0),s=10,l=30,f=20,h=50,p=800-h-l,g=400-s-f;var j=function(t){var n=t.data,e=Object(a.useRef)(),r=Object(a.useCallback)((function(){e.current&&u.f(e.current).selectAll("*").remove();var t=u.f(e.current),a=Object.keys(n[0]).slice(1),r=n.map((function(t){return t.time})),c=u.c().domain(r).range([0,p]).padding([.2]);t.append("g").attr("transform","translate(".concat(h,", ").concat(g,")")).call(u.a(c));var i=u.d().domain([0,60]).range([g,0]);t.append("g").attr("transform","translate(".concat(h,")")).call(u.b(i));var o=u.e().domain(a).range(["pink","magenta","purple"]),d=u.g().keys(a)(n);t.append("g").selectAll("g").data(d).join("g").attr("fill",(function(t){return o(t.key)})).selectAll("rect").data((function(t){return t})).join("rect").attr("x",(function(t){return c(t.data.time)})).attr("transform","translate(".concat(h,")")).attr("y",(function(t){return i(t[1])})).attr("height",(function(t){return i(t[0])-i(t[1])})).attr("width",c.bandwidth())}),[n]);return Object(a.useEffect)((function(){u.f(e.current).append("svg").attr("width",p+h+l).attr("height",g+s+f).append("g").attr("transform","translate(".concat(h,", ").concat(s,")")),r()}),[n,r]),Object(d.jsx)("svg",{width:800,height:400,ref:e})};function b(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.round(Math.random()*(t-n)+n)}var m=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20,n=[],e=0;e<t;e++)n.push({time:"2021-05-05 10:00:0".concat(e),cat:b(10),dog:b(10),fish:b(10)});return n},v=function(){var t=Object(a.useState)(m()),n=Object(o.a)(t,2),e=n[0],r=n[1];return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{children:Object(d.jsx)("button",{onClick:function(){return r(m())},children:"Update Data"})}),Object(d.jsx)(j,{data:e})]})};i.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root"))}},[[97,1,2]]]);
//# sourceMappingURL=main.904d8a09.chunk.js.map