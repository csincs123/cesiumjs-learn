import{_ as B,r as T,o as O,w as H,a as P,c as V,b as U,d as g,e as R,F as j,f as F,g as _}from"./index-DNjwDPI8.js";const D={id:"cesiumContainer",class:"map"},L={class:"toolbar"},N={__name:"3dtilesClippingPlanes",setup(Y){const y=T(""),f=T(!1),h=T(!1),S=[{value:"instance",label:"实例",url:"/cesiumjs-learn/cesium3dtiles/instanced/InstancedOrientation/tileset.json"},{value:"model",label:"模型",url:"/cesiumjs-learn/Cesium_Air.glb"},{value:"bim",label:"bim",url:Cesium.IonResource.fromAssetId(2464651)},{value:"pointCloud",label:"点云",url:Cesium.IonResource.fromAssetId(16421)}];let l=null,p=null,b=0,w=[],r,o,t=null;O(async()=>{l=new Cesium.Viewer("cesiumContainer"),l&&(p=l.scene),new Cesium.ScreenSpaceEventHandler(l.scene.canvas).setInputAction(function(a){const s=p.pick(a.position);Cesium.defined(s)&&Cesium.defined(s.id)&&Cesium.defined(s.id.plane)&&(r=s.id.plane,r.material=Cesium.Color.WHITE.withAlpha(.05),r.outlineColor=Cesium.Color.WHITE,p.screenSpaceCameraController.enableInputs=!1)},Cesium.ScreenSpaceEventType.LEFT_DOWN),new Cesium.ScreenSpaceEventHandler(l.scene.canvas).setInputAction(function(){Cesium.defined(r)&&(r.material=Cesium.Color.WHITE.withAlpha(.1),r.outlineColor=Cesium.Color.WHILE,r=void 0),p.screenSpaceCameraController.enableInputs=!0},Cesium.ScreenSpaceEventType.LEFT_UP),new Cesium.ScreenSpaceEventHandler(l.scene.canvas).setInputAction(function(a){if(Cesium.defined(r)){const s=a.startPosition.y-a.endPosition.y;b+=s}},Cesium.ScreenSpaceEventType.MOUSE_MOVE)}),H(f,n=>{Cesium.defined(t)&&(t.debugShowBoundingVolume=n)}),H(h,n=>{if(Cesium.defined(o)){const e=n?1:0;o.edgeWidth=e}});const I=n=>function(){return n.distance=b,n},x=["instance","model","bim","pointCloud"],C={debugBoundingVolumesEnabled:!1,edgeStylingEnabled:!0,exampleTypes:x,currentExampleType:x[0]},v=async(n,e)=>{const u=C.currentExampleType;o=new Cesium.ClippingPlaneCollection({planes:[new Cesium.ClippingPlane(new Cesium.Cartesian3(0,0,-1),0)],edgeWidth:1});try{const a=await Promise.resolve(n);if(t=await Cesium.Cesium3DTileset.fromUrl(a,{clippingPlanes:o}),u!==C.currentExampleType)return;Cesium.defined(e)&&(t.modelMatrix=e),l.scene.primitives.add(t),t.debugBoundingVolume=C.debugBoundingVolumesEnabled;const s=t.boundingSphere,i=s.radius;if(l.zoomTo(t,new Cesium.HeadingPitchRange(.5,-.2,i*4)),!Cesium.Matrix4.equals(t.root.transform,Cesium.Matrix4.IDENTITY)){const c=Cesium.Matrix4.getTranslation(t.root.transform,new Cesium.Cartesian3),m=Cesium.Cartographic.fromCartesian(c),E=Cesium.Cartographic.fromCartesian(t.boundingSphere.center).height-m.height;o.modelMatrix=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0,0,E))}for(let c=0;c<o.length;c++){const m=o.get(c),d=l.entities.add({position:s.center,plane:{dimensions:new Cesium.Cartesian2(i*2.5,i*2.5),material:Cesium.Color.WHITE.withAlpha(.1),plane:new Cesium.CallbackProperty(I(m),!1),outline:!0,outlineColor:Cesium.Color.WHITE}});w.push(d)}return t}catch(a){console.log(`Error loading tileset: ${a}`)}},k=async n=>{o=new Cesium.ClippingPlaneCollection({planes:[new Cesium.ClippingPlane(new Cesium.Cartesian3(0,0,-1),0)],edgeWidth:1});const e=Cesium.Cartesian3.fromDegrees(-123.0744619,44.0503706,300),u=Cesium.Math.toRadians(135),a=0,s=0,i=new Cesium.HeadingPitchRoll(u,a,s),c=Cesium.Transforms.headingPitchRollQuaternion(e,i),m=l.entities.add({name:n,position:e,orientation:c,model:{uri:n,scale:8,minimumPixelSize:100,clippingPlanes:o}});l.trackedEntity=m;for(let d=0;d<o.length;++d){const E=o.get(d),A=l.entities.add({position:e,plane:{dimensions:new Cesium.Cartesian2(300,300),material:Cesium.Color.WHITE.withAlpha(.1),plane:new Cesium.CallbackProperty(I(E),!1),outline:!0,outlineColor:Cesium.Color.WHITE}});w.push(A)}},W=()=>{l.entities.removeAll(),Cesium.defined(t)&&l.scene.primitives.remove(t),w=[],b=0,t=void 0},M=n=>{W(),C.currentExampleType=n;let e=S.find(u=>u.value===n);switch(n){case"instance":v(e.url,Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(15,-58.6,50.825)));break;case"model":k(e.url);break;case"bim":v(e.url);break;case"pointCloud":v(e.url);break}};return(n,e)=>{const u=_("el-option"),a=_("el-select"),s=_("el-checkbox");return P(),V("div",D,[U("div",L,[g(a,{modelValue:y.value,"onUpdate:modelValue":e[0]||(e[0]=i=>y.value=i),onChange:M,style:{width:"120px"}},{default:R(()=>[(P(),V(j,null,F(S,i=>g(u,{key:i.value,label:i.label,value:i.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"]),g(s,{label:"显示边界体积",modelValue:f.value,"onUpdate:modelValue":e[1]||(e[1]=i=>f.value=i)},null,8,["modelValue"]),g(s,{label:"启用边缘样式",modelValue:h.value,"onUpdate:modelValue":e[2]||(e[2]=i=>h.value=i)},null,8,["modelValue"])])])}}},q=B(N,[["__scopeId","data-v-eb281bee"]]);export{q as default};