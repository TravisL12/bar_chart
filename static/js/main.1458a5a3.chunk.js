(this["webpackJsonpbar-chart-demo"]=this["webpackJsonpbar-chart-demo"]||[]).push([[0],{136:function(t,n,e){},139:function(t,n,e){"use strict";e.r(n);var r=e(2),a=e.n(r),c=e(33),o=e.n(c),i=(e(136),e(34));function u(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.round(Math.random()*(t-n)+n)}var s=[{type:"cat",color:"pink"},{type:"dog",color:"magenta"},{type:"fish",color:"purple"},{type:"cow",color:"green"},{type:"mouse",color:"lightblue"}],l=s.map((function(t){return t.type})),f=s.map((function(t){return t.color})),d=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,n=[],e=u(25,10),r=0;r<e;r++){var a=l.reduce((function(n,e){return n[e]=u(t),n}),{});n.push(Object(i.a)({time:"2021-05-05 10:00:0".concat(r)},a))}return n},p=function(){for(var t=[],n=u(25,10),e=0;e<n;e++)t.push(u(100,1));return t},j=function(){return l.map((function(t){for(var n=[],e=u(100,1),r=0;r<1e3;r++){var a=e+u(1,-1);n.push({x:r,y:a}),e=a}return[t,n]}))},b=function(){for(var t=[],n=u(50,10),e=0;e<n;e++)t.push({x:u(100,5),y:u(100,10),r:u(20,10),type:l[e%l.length]});return t},x=function(){return l.reduce((function(t,n){return t[n]=u(20,3),t}),{})},m=e(3),y=e(1),h=function(t){var n=t.componentProp,e=t.getData,a=Object(r.useState)(e()),c=Object(m.a)(a,2),o=c[0],i=c[1],u=n;return Object(y.jsxs)("div",{children:[Object(y.jsx)("div",{children:Object(y.jsx)("button",{onClick:function(){var t=e();i(t)},children:"Update Data"})}),Object(y.jsx)(u,{data:o})]})},g=e(0),v=50,O=1e3-v-30,k=400-20-50;var w=function(t){var n=t.data,e=Object(r.useRef)(),a=n.map((function(t){return t.time})),c=Object.keys(n[0]).slice(1),o=g.n().keys(c)(n),i=g.l().domain(c).range(f),u=g.j().range([0,O]).padding([.2]),s=g.k().rangeRound([k,0]),l=Object(r.useCallback)((function(){var t=g.m(e.current);u.domain(a),t.select(".x-axis").call(g.c(u)).selectAll("text").text((function(t){return t.slice(11)})).attr("transform","translate(-13,26) rotate(-90)"),s.domain([0,1.2*g.h(n,(function(t){return g.o(Object.values(t))}))]),t.select(".y-axis").transition().call(g.d(s)),t.selectAll("g.stacks").selectAll("g.stack").data(o).join((function(t){var n=t.append("g").attr("class",(function(t){return"stack ".concat(t.key)}));return n.append("g").attr("class","bars").attr("fill",(function(t){return i(t.key)})),d(n.select(".bars")),n}),(function(t){d(t.select(".bars"))}))}),[n]),d=function(t){t.selectAll("rect").data((function(t){return t})).join((function(t){return t.append("rect").attr("class","bar").attr("height",(function(t){return s(t[0])-s(t[1])})).attr("width",u.bandwidth()).attr("x",(function(t){return u(t.data.time)})).attr("y",(function(t){return s(t[1])})).attr("stroke","grey").style("opacity",0).call((function(t){return t.transition().duration(500).style("opacity",1)})).on("mouseover",p).on("mouseleave",j)}),(function(t){t.transition().attr("height",(function(t){return s(t[0])-s(t[1])})).attr("width",u.bandwidth()).attr("x",(function(t){return u(t.data.time)})).attr("y",(function(t){return s(t[1])}))}))},p=function(){var t=g.m(this.parentNode).datum().key;g.m(e.current).selectAll(".bar").style("opacity",.2),g.m(e.current).selectAll(".".concat(t," rect")).style("opacity",1)},j=function(){g.m(e.current).selectAll(".bar").style("opacity",.8)};return Object(r.useEffect)((function(){var t=g.m(e.current);t.attr("width",1e3).attr("height",400).append("g").attr("class","stacks").attr("transform","translate(".concat(v,")")),t.append("g").attr("class","x-axis").attr("transform","translate(".concat(v,", ").concat(k,")")),t.append("g").attr("class","y-axis").attr("transform","translate(".concat(v,")"))}),[]),Object(r.useEffect)((function(){l()}),[n,l,e.current]),Object(y.jsx)("div",{style:{padding:"10px 0"},children:Object(y.jsx)("svg",{ref:e})})},A=50,E=1e3-A-30,R=300-20-50;var C=function(t){var n=t.data,e=Object(r.useRef)(),a=g.j().range([0,E]).padding(.3),c=g.k().range([R,0]),o=function(t){return"translate(".concat(a.bandwidth()/2,t>10?", 15)":", -2)")},i=Object(r.useCallback)((function(){var t=g.m(e.current);a.domain(Object.keys(n)),t.select(".x-axis").call(g.c(a)).selectAll("text").text((function(t){return+t+1})),c.domain([0,1.1*g.h(n)]),t.select(".y-axis").transition().call(g.d(c)),t.selectAll(".bars").selectAll(".bar").data(n).join((function(t){var n=t.append("g").attr("class","bar");return n.append("rect").attr("x",(function(t,n){return a(n)})).attr("y",(function(t){return c(t)})).attr("height",(function(t){return R-c(t)})).attr("width",a.bandwidth()).attr("stroke-width",1).attr("stroke","black").attr("fill",f[0]),n.append("text").text((function(t){return t})).join("text").attr("x",(function(t,n){return a(n)})).attr("y",(function(t){return c(t)})).attr("transform",o).attr("text-anchor","middle"),n}),(function(t){t.select("rect").transition().attr("x",(function(t,n){return a(n)})).attr("y",(function(t){return c(t)})).attr("height",(function(t){return R-c(t)})).attr("width",a.bandwidth()),t.select("text").transition().text((function(t){return t})).attr("x",(function(t,n){return a(n)})).attr("y",(function(t){return c(t)})).attr("transform",o)}),(function(t){t.select("text").remove(),t.select("rect").transition().style("opacity",0),t.transition().remove()}))}),[n,R,E]);return Object(r.useEffect)((function(){var t=g.m(e.current);t.attr("width",1e3).attr("height",300).append("g").attr("class","bars").attr("transform","translate(".concat(A,")")),t.append("g").attr("class","x-axis").attr("transform","translate(".concat(A,", ").concat(R,")")),t.append("g").attr("class","y-axis").attr("transform","translate(".concat(A,")"))}),[]),Object(r.useEffect)((function(){i()}),[n,i,e.current]),Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{children:[Object(y.jsx)("button",{onClick:function(){n.sort((function(t,n){return g.b(t,n)})),i()},children:"asc"}),Object(y.jsx)("button",{onClick:function(){n.sort((function(t,n){return g.e(t,n)})),i()},children:"desc"})]}),Object(y.jsx)("div",{style:{padding:"10px 0"},children:Object(y.jsx)("svg",{ref:e})})]})},D=50,P=1e3-D-30,M=400-20-50;var _=function(t){var n=t.data,e=Object(r.useRef)(),a=g.k().range([0,P]),c=g.k().rangeRound([M,0]),o=g.l().domain(n.map((function(t){return t.type}))).range(f),i=Object(r.useCallback)((function(){var t=g.m(e.current);a.domain([0,g.h(n,(function(t){return t.x}))]),t.select(".x-axis").call(g.c(a)),c.domain([0,1.2*g.h(n,(function(t){return t.y}))]),t.select(".y-axis").transition().call(g.d(c)),t.selectAll(".scatter").selectAll("circle").data(n).join((function(t){return t.append("circle").attr("fill","red").attr("stroke","white").attr("cx",(function(t){return a(t.x)})).attr("cy",(function(t){return c(t.y)})).attr("r",(function(t){return t.r})).call((function(t){return t.transition().attr("fill",(function(t){return o(t.type)}))})).on("mouseover",(function(t){g.m(t.target).transition().style("opacity",.8).attr("r",25)})).on("mouseleave",(function(t){var n=t.target.__data__;g.m(t.target).transition().attr("fill",o(n.type)).attr("r",n.r)})),t}),(function(t){t.transition().delay((function(t,n){return 50*n})).duration(500).attr("fill","none").attr("stroke","blue").attr("cx",(function(t){return a(t.x)})).attr("cy",(function(t){return c(t.y)})).call((function(t){return t.transition().duration(500).attr("stroke","white").attr("fill",(function(t){return o(t.type)}))}))}),(function(t){return t.transition().duration(1e3).attr("fill","yellow").attr("stroke-width",4).attr("stroke","black").call((function(t){return t.style("opacity",0).remove()}))}))}),[n]);return Object(r.useEffect)((function(){var t=g.m(e.current);t.attr("width",1e3).attr("height",400).append("g").attr("class","scatter").attr("transform","translate(".concat(D,")")),t.append("g").attr("class","x-axis").attr("transform","translate(".concat(D,", ").concat(M,")")),t.append("g").attr("class","y-axis").attr("transform","translate(".concat(D,")"))}),[]),Object(r.useEffect)((function(){i()}),[n,i,e.current]),Object(y.jsx)("div",{style:{padding:"10px 0"},children:Object(y.jsx)("svg",{ref:e})})},N=50,J=1e3-N-30,S=400-20-50;var z=function(t){var n=t.data,e=Object(r.useRef)(),a=g.k().range([0,J]),c=g.k().rangeRound([S,0]),o=g.l().domain(l).range(f),i=Object(r.useCallback)((function(){var t=g.m(e.current);a.domain([0,g.h(n,(function(t){return g.h(t[1],(function(t){return t.x}))}))]),t.select(".x-axis").call(g.c(a)),c.domain(g.f(n.map((function(t){var n=Object(m.a)(t,2);n[0];return n[1]})).flat(),(function(t){return t.y}))),t.select(".y-axis").transition().call(g.d(c)),t.selectAll(".lines").selectAll(".line").data(n,(function(t){return t[0]})).join((function(t){return t.append("g").attr("class",(function(t){return"line ".concat(t[0])})).append("path").attr("fill","none").attr("stroke-width",2).attr("stroke",(function(t){return o(t[0])})).attr("d",(function(t){return g.g().x((function(t){return a(t.x)})).y((function(t){return c(t.y)}))(t[1])})).on("mouseover",u).on("mouseleave",s)}),(function(t){t.select("path").transition().attr("fill","none").attr("stroke-width",2).attr("stroke",(function(t){return o(t[0])})).attr("d",(function(t){return g.g().x((function(t){return a(t.x)})).y((function(t){return c(t.y)}))(t[1])}))}))}),[n,a,c]),u=function(){var t=g.m(this.parentNode).datum()[0];g.m(e.current).selectAll(".line").style("opacity",.2),g.m(e.current).selectAll(".".concat(t)).style("opacity",1)},s=function(){g.m(e.current).selectAll(".line").style("opacity",1)};return Object(r.useEffect)((function(){var t=g.m(e.current);t.attr("width",1e3).attr("height",400).append("g").attr("class","lines").attr("transform","translate(".concat(N,")")),t.append("g").attr("class","x-axis").attr("transform","translate(".concat(N,", ").concat(S,")")),t.append("g").attr("class","y-axis").attr("transform","translate(".concat(N,")"))}),[]),Object(r.useEffect)((function(){i()}),[n,i]),Object(y.jsx)("div",{style:{padding:"10px 0"},children:Object(y.jsx)("svg",{ref:e})})},B=1e3,I=B-50-30,U=400-20-50,q=Math.min(I,U)/2;var F=function(t){var n=t.data,e=Object(r.useRef)(),a=g.l().domain(Object.keys(n)).range(f),c=g.i().value((function(t){return t.value})).sort((function(t,n){return g.b(t.key,n.key)})),o=Object(r.useCallback)((function(){var t=g.m(e.current),r=c(Object.entries(n).map((function(t){var n=Object(m.a)(t,2);return{key:n[0],value:n[1]}}))),o=g.a().innerRadius(0).outerRadius(q);t.selectAll(".pie").selectAll(".piece").data(r,(function(t){return t.data.key})).join((function(t){var n=t.append("g").attr("class","piece");return n.append("path").attr("d",o).attr("fill",(function(t){return a(t.data.key)})).attr("stroke","black").style("stroke-width","2px").style("opacity",.7),n.append("text").text((function(t){return t.data.key})).attr("transform",(function(t){return"translate(".concat(o.centroid(t),")")})).style("text-anchor","middle").style("font-size",17),n}),(function(t){t.select("path").transition().attr("d",o),t.select("text").transition().text((function(t){return t.data.key})).attr("transform",(function(t){return"translate(".concat(o.centroid(t),")")}))}))}),[n]);return Object(r.useEffect)((function(){g.m(e.current).attr("width",B).attr("height",400).append("g").attr("class","pie").attr("transform","translate(".concat(500,", ").concat(200,")"))}),[]),Object(r.useEffect)((function(){o()}),[n,o,e.current]),Object(y.jsx)("div",{style:{padding:"10px 0"},children:Object(y.jsx)("svg",{ref:e})})},G=function(){return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)(h,{componentProp:F,getData:x}),Object(y.jsx)(h,{componentProp:z,getData:j}),Object(y.jsx)(h,{componentProp:_,getData:b}),Object(y.jsx)(h,{componentProp:w,getData:d}),Object(y.jsx)(h,{componentProp:C,getData:p})]})};o.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)(G,{})}),document.getElementById("root"))}},[[139,1,2]]]);
//# sourceMappingURL=main.1458a5a3.chunk.js.map