(this["webpackJsonpbar-chart-demo"]=this["webpackJsonpbar-chart-demo"]||[]).push([[0],{94:function(t,n,e){},97:function(t,n,e){"use strict";e.r(n);var r=e(1),a=e.n(r),c=e(26),i=e.n(c),u=(e(94),e(2)),o=e(0),s=10,f=30,l=80,d=50,p=800-d-f,h=400-s-l;var g=function(t){var n=t.data,e=Object(r.useRef)(),a=n.map((function(t){return t.time})),c=Object.keys(n[0]).slice(1),i=u.g().keys(c)(n),g=u.e().domain(c).range(["pink","magenta","purple"]),j=u.c().domain(a).range([0,p]).padding([.2]),b=u.d().domain([0,60]).range([h,0]),x=function(t){t.selectAll("rect").data((function(t){return t}),(function(t){return t.data.time})).join((function(t){return t.append("rect").attr("class","bar").attr("x",(function(t){return j(t.data.time)})).attr("transform","translate(".concat(d,")")).attr("y",(function(t){return b(t[1])})).attr("height",(function(t){return b(t[0])-b(t[1])})).attr("width",j.bandwidth())}),(function(t){t.transition().attr("y",(function(t){return b(t[1])})).attr("height",(function(t){return b(t[0])-b(t[1])}))}))},m=Object(r.useCallback)((function(){var t=u.f(e.current);t.select(".x-axis").call(u.a(j)).selectAll("text").text((function(t){return t.slice(11)})).attr("transform","translate(-13,26) rotate(-90)"),t.select(".y-axis").attr("transform","translate(".concat(d,")")).call(u.b(b)),t.selectAll("g.stacks").selectAll("g.stack").data(i).join((function(t){var n=t.append("g").attr("class","stack");return n.append("g").attr("class","bars").attr("fill",(function(t){return g(t.key)})),x(n.select(".bars")),n}),(function(t){x(t.select(".bars"))}))}),[n]);return Object(r.useEffect)((function(){m()}),[n,m]),Object(r.useEffect)((function(){var t=u.f(e.current);t.attr("width",p+d+f).attr("height",h+s+l).append("g").attr("class","stacks"),t.append("g").attr("class","x-axis").attr("transform","translate(".concat(d,", ").concat(h,")")),t.append("g").attr("class","y-axis"),m()}),[]),Object(o.jsx)("svg",{ref:e})};var j=function(t){var n=t.data,e=Object(r.useRef)(),a=Math.max(Math.max.apply(null,n),200),c=30*n.length+100,i=Object(r.useCallback)((function(){var t=u.f(e.current),r=u.c().domain(Object.keys(n)).range([0,c]).padding(.3),i=u.d().domain([0,a]).range([a,0]);t.selectAll("g").data(n).join((function(t){var n=t.append("g");return n.append("rect").attr("x",(function(t,n){return r(n)})).attr("y",(function(t){return i(t)})).attr("height",(function(t){return t})).attr("width",30).attr("stroke-width",1).attr("stroke","plum").attr("fill","pink"),n.append("text").text((function(t){return t})).join("text").attr("x",(function(t,n){return r(n)})).attr("y",(function(t){return i(t)})).attr("width",30).attr("dominant-baseline","hanging"),n}),(function(t){t.select("rect").transition().attr("y",(function(t){return i(t)})).attr("height",(function(t){return t})),t.select("text").transition().text((function(t){return t})).attr("y",(function(t){return i(t)}))}))}),[n,a,c]);return Object(r.useEffect)((function(){u.f(e.current).attr("width",c).attr("height",a)}),[]),Object(r.useEffect)((function(){return i(),function(){}}),[n,i]),Object(o.jsx)("svg",{ref:e})};function b(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.round(Math.random()*(t-n)+n)}var x=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,e=[],r=0;r<n;r++)e.push({time:"2021-05-05 10:00:0".concat(r),cat:b(t),dog:b(t),fish:b(t)});return e},m=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20,n=[],e=0;e<t;e++)n.push(b(100,1));return n},v=e(8),O=function(t){var n=t.componentProp,e=t.getData,a=Object(r.useState)(e()),c=Object(v.a)(a,2),i=c[0],u=c[1],s=n;return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{children:Object(o.jsx)("button",{onClick:function(){return u(e())},children:"Update Data"})}),Object(o.jsx)(s,{data:i})]})},k=function(){return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(O,{componentProp:g,getData:x}),Object(o.jsx)(O,{componentProp:j,getData:m})]})};i.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(k,{})}),document.getElementById("root"))}},[[97,1,2]]]);
//# sourceMappingURL=main.500df24c.chunk.js.map