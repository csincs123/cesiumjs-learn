import{_ as P,o as b,a as w,c as f,b as p}from"./index-u4VPhVJI.js";const g=async C=>{try{const e=await fetch(C);if(!e.ok)throw new Error("Network response was not ok "+e.statusText);return await e.json()}catch(e){console.error("Fetch error:",e)}},E={id:"cesiumContainer",class:"map"},x={key:0,class:"buttonDiv"},I={__name:"BuildFlightTracker",setup(C){let e=null,c=null,i=null,n=null,l=null,s=null,a=null;b(async()=>{e=new Cesium.Viewer("cesiumContainer",{terrain:Cesium.Terrain.fromWorldTerrain()}),c=await Cesium.createOsmBuildingsAsync(),e.scene.primitives.add(c)});async function v(){if(a){a.show=!a.show;return}i=await g("/flight.json"),a=new Cesium.CustomDataSource("myData");for(let o=0;o<i.length;o++){const t=i[o];let u=new Cesium.Entity({description:`Location: (${t.longitude}, ${t.latitude}, ${t.height})`,position:Cesium.Cartesian3.fromDegrees(t.longitude,t.latitude,t.height),point:{pixelSize:10,color:Cesium.Color.RED}});a.entities.add(u)}e.dataSources.add(a)}async function h(o){i||(i=await g("/flight.json"));const t=30,u=t*(i.length-1);n=Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z"),l=Cesium.JulianDate.addSeconds(n,u,new Cesium.JulianDate),e.clock.startTime=n.clone(),e.clock.stopTime=l.clone(),e.clock.currentTime=n.clone(),e.timeline.zoomTo(n,l),e.clock.multiplier=50,e.clock.shouldAnimate=!0,s=new Cesium.SampledPositionProperty;for(let r=0;r<i.length;r++){const d=i[r],S=Cesium.JulianDate.addSeconds(n,r*t,new Cesium.JulianDate),D=Cesium.Cartesian3.fromDegrees(d.longitude,d.latitude,d.height);s.addSample(S,D)}e.entities.removeAll();let m=null;o==="greenPoint"?m={availability:new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({start:n,stop:l})]),position:s,point:{pixelSize:30,color:Cesium.Color.GREEN},path:new Cesium.PathGraphics({width:3})}:m=y();const T=e.entities.add(m);e.trackedEntity=T}function y(){return{availability:new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({start:n,stop:l})]),position:s,model:{uri:"/Cesium_Air.glb",minimumPixelSize:100},orientation:new Cesium.VelocityOrientationProperty(s),path:new Cesium.PathGraphics({width:3})}}function _(){h("greenPoint")}function k(){h("airplane")}return(o,t)=>(w(),f("div",E,[(w(),f("div",x,[p("button",{onClick:v},"step1: 添加雷达数据"),p("button",{onClick:_},"step2: 绿点移动"),p("button",{onClick:k},"step3: 飞机移动")]))]))}},B=P(I,[["__scopeId","data-v-e459debd"]]);export{B as default};