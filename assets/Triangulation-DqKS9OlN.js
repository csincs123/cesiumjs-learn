import{_ as p,o as C,r as y,a as d,c as f}from"./index-DNjwDPI8.js";async function w(s,o,e,i){const t=await _(o);console.log("coord64",t);const r=await g(e),n=new Cesium.Geometry({vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,attributes:{position:new Cesium.GeometryAttribute({componentDatatype:Cesium.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:new Float64Array(t.flat())})},indices:new Uint16Array(r),primitiveType:Cesium.PrimitiveType.TRIANGLES,boundingSphere:Cesium.BoundingSphere.fromVertices(t.flat())}),a=new Cesium.GeometryInstance({geometry:n,attributes:{color:Cesium.ColorGeometryInstanceAttribute.fromColor(i)}}),c=new Cesium.Primitive({geometryInstances:a,asynchronous:!1,releaseGeometryInstances:!1,compressVertices:!1,appearance:new Cesium.PerInstanceColorAppearance({translucent:!0,flat:!0})});s.scene.primitives.add(c);const u=new Cesium.Geometry({vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,attributes:{position:new Cesium.GeometryAttribute({componentDatatype:Cesium.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:new Float64Array(t.flat())})},indices:new Uint16Array(r),primitiveType:Cesium.PrimitiveType.TRIANGLES,boundingSphere:Cesium.BoundingSphere.fromVertices(t.flat())}),l=new Cesium.GeometryInstance({attributes:{color:Cesium.ColorGeometryInstanceAttribute.fromColor(i)},geometry:Cesium.GeometryPipeline.toWireframe(u)}),m=new Cesium.Primitive({geometryInstances:l,asynchronous:!1,releaseGeometryInstances:!1,compressVertices:!1,appearance:new Cesium.PerInstanceColorAppearance({translucent:!0,flat:!0})});return s.scene.primitives.add(m),{primitive:c,primitive1:m}}async function _(s){const e=await(await fetch(s)).text();return console.log("Pointtext",e),e.trim().split(`
`).map(r=>{const n=Cesium.Cartesian3.fromDegrees(...r.split(",").map(Number));return[n.x,n.y,n.z]})}async function g(s){const e=await(await fetch(s)).text();console.log("Indextext",e);const t=e.trim().split(`
`).flatMap(r=>r.split(",").map(Number));return new Uint16Array(t)}const x={id:"cesiumContainer",class:"map"},v={__name:"Triangulation",setup(s){const o="/cesiumjs-learn";let e=null;C(async()=>{e=new Cesium.Viewer("cesiumContainer",{terrain:Cesium.Terrain.fromWorldTerrain()}),await t(),r(123.06125894180711,41.03382854489735,2164.4393773033075)});const i=y(null),t=()=>{const n=new Cesium.Color(0,0,1,.5);i.value=w(e,o+"/triangle/point_大孤山铁矿_3_+5m.txt",o+"/triangle/index_大孤山铁矿_3_+5m.txt",n)},r=(n,a,c)=>{e.camera.setView({destination:Cesium.Cartesian3.fromDegrees(n,a,c),orientation:{heading:Cesium.Math.toRadians(0),pitch:Cesium.Math.toRadians(-45),roll:0}})};return(n,a)=>(d(),f("div",x))}},I=p(v,[["__scopeId","data-v-f5e548a6"]]);export{I as default};