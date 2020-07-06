(this.webpackJsonpspatium=this.webpackJsonpspatium||[]).push([[0],{26:function(e,a,t){e.exports=t(39)},31:function(e,a,t){},38:function(e,a,t){},39:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),l=t(3),i=t.n(l),r=(t(31),t(16)),c=t.n(r),s=t(22),u=t(25),m=t(13),g=t(6),v=t(11),d=Object(v.b)({name:"map",initialState:{distance:0,averageElevation:0,maxElevation:-1/0,minElevation:1/0},reducers:{setDistance:function(e,a){e.distance=a.payload},setAverageElevation:function(e,a){e.averageElevation=a.payload},setMaxElevation:function(e,a){e.maxElevation=a.payload},setMinElevation:function(e,a){e.minElevation=a.payload}}}),p=d.actions,E=p.setDistance,f=p.setAverageElevation,h=p.setMaxElevation,b=p.setMinElevation,w=function(e){return e.map.distance},M=function(e){return e.map.averageElevation},O=function(e){return e.map.maxElevation},_=function(e){return e.map.minElevation},x=d.reducer,j=t(9),k=t(12),C=t(7),S=(t(37),t(5)),y=t.n(S),N=["places"];function z(){var e=o.a.useCallback((function(e,a){var t,n,o,l,i,r,c,s=0,u=Math.PI;return t=e.lng*(u/180),n=a.lng*(u/180),o=e.lat*(u/180),i=n-t,r=(l=a.lat*(u/180))-o,c=Math.pow(Math.sin(r/2),2)+Math.cos(o)*Math.cos(l)*Math.pow(Math.sin(i/2),2),6371,s+=6371*(2*Math.asin(Math.sqrt(c)))}),[]),a=Object(n.useState)(null),t=Object(m.a)(a,2),l=t[0],i=t[1],r=Object(n.useState)([]),c=Object(m.a)(r,2),s=c[0],v=c[1],d=Object(n.useState)({lat:0,lng:0}),p=Object(m.a)(d,2),x=p[0],k=p[1],C=Object(g.c)(w),S=Object(g.c)(M),z=Object(g.c)(_),F=Object(g.c)(O),T=Object(g.b)(),B=o.a.useCallback((function(e){var a=e.lat,t=e.lng,n=e.zoom;k({lat:a,lng:t}),null===n?P.current.setZoom(P.current.getZoom()):P.current.setZoom(n)}),[]),D=o.a.useCallback((function(e){i({lat:e.latLng.lat(),lng:e.latLng.lng()})}),[]),P=o.a.useRef(),q=o.a.useCallback((function(e){P.current=e,navigator.geolocation.getCurrentPosition((function(e){B({lat:e.coords.latitude,lng:e.coords.longitude,zoom:14})}),(function(){return null}))}),[B]),I=Object(j.d)({googleMapsApiKey:"AIzaSyAa75TR-eiwjheRpEeNSCoxTslFCEH3X9w",libraries:N}),K=I.isLoaded;return I.loadError?"Error loading maps":K?o.a.createElement("div",null,o.a.createElement("img",{className:y.a.logo,src:"logo.svg",alt:""}),o.a.createElement("h1",{className:y.a.appName},"Spatium"),o.a.createElement(A,{panTo:B}),o.a.createElement(L,{panTo:B}),o.a.createElement("div",{className:y.a.distance},"Distance: ",C.toFixed(2)," km."),o.a.createElement("div",{className:y.a.averageElevation},"Average Elevation: ",S.toFixed(2)," m."),o.a.createElement("div",{className:y.a.minElevation},"Min. Elevation: ",z===1/0?(0).toFixed(2):z.toFixed(2)," m."),o.a.createElement("div",{className:y.a.maxElevation},"Max. Elevation: ",F===-1/0?(0).toFixed(2):F.toFixed(2)," m."),o.a.createElement(j.a,{mapContainerStyle:{width:"100vw",height:"100vh"},zoom:2.5,center:x,options:{disableDefaultUI:!0,zoomControl:!0},onClick:D,onLoad:q},l&&o.a.createElement(j.b,{position:{lat:l.lat,lng:l.lng},icon:{url:"pencil.svg",scaledSize:new window.google.maps.Size(30,30),origin:new window.google.maps.Point(0,0),anchor:new window.google.maps.Point(15,15)},draggable:!0,onDrag:function(a){i({lat:a.latLng.lat(),lng:a.latLng.lng()});var t={lat:a.latLng.lat(),lng:a.latLng.lng(),elevation:0};(new window.google.maps.ElevationService).getElevationForLocations({locations:[{lat:t.lat,lng:t.lng}]},(function(e,a){if("OK"===a){var n=e[0].elevation;n>0?(t.elevation=n,n>F?T(h(n)):n<z&&T(b(n))):t.elevation=0}else console.log("Elevation service failed due to: "+a),t.elevation=0}));var n=Object(u.a)(s);if(n.push(t),v(n),s.length>1){var o=C+e(n[n.length-2],n[n.length-1]);T(E(o));for(var l=0,r=0;r<s.length;r++)l+=s[r].elevation;l/=s.length,T(f(l))}}}),o.a.createElement(j.c,{path:s,options:{strokeOpacity:.8,strokeColor:"#3266A8",fillColor:"#3266A8"}}))):"Loading Maps"}function L(e){var a=e.panTo;return o.a.createElement("button",{className:y.a.locate,onClick:function(){navigator.geolocation.getCurrentPosition((function(e){a({lat:e.coords.latitude,lng:e.coords.longitude,zoom:14})}),(function(){return null}))}},o.a.createElement("img",{src:"compass.svg",alt:"compass - locate me"}))}function A(e){var a=e.panTo,t=Object(k.a)({requestOptions:{location:{lat:function(){return 43.653225},lng:function(){return-79.383186}},radius:2e5}}),n=t.ready,l=t.value,i=t.suggestions,r=i.status,u=i.data,m=t.setValue,g=t.clearSuggestions;return o.a.createElement("div",{className:y.a.search},o.a.createElement(C.a,{onSelect:function(){var e=Object(s.a)(c.a.mark((function e(t){var n,o,l,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(t,!1),g(),e.prev=2,e.next=5,Object(k.b)({address:t});case 5:return n=e.sent,e.next=8,Object(k.c)(n[0]);case 8:o=e.sent,l=o.lat,i=o.lng,a({lat:l,lng:i,zoom:14}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),console.log("error!");case 17:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(a){return e.apply(this,arguments)}}()},o.a.createElement(C.b,{value:l,onChange:function(e){m(e.target.value)},disabled:!n,placeholder:"Enter an address"}),o.a.createElement(C.e,null,o.a.createElement(C.c,null,"OK"===r&&u.map((function(e){var a=e.id,t=e.description;return o.a.createElement(C.d,{key:a,value:t})}))))))}t(38);var F=function(){return o.a.createElement(z,null)},T=Object(v.a)({reducer:{map:x}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g.a,{store:T},o.a.createElement(F,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},5:function(e,a,t){e.exports={averageElevation:"Map_averageElevation__3cfzc",minElevation:"Map_minElevation__14XMx",maxElevation:"Map_maxElevation__ZmXBY",distance:"Map_distance__2qQCE",search:"Map_search__2QBuO",logo:"Map_logo__E2v3q",appName:"Map_appName__2eQEX",locate:"Map_locate__1OiBK"}}},[[26,1,2]]]);
//# sourceMappingURL=main.d9eb7756.chunk.js.map