import{_ as a,o as s,a as t,c as n}from"./index-BedfObjg.js";const o={id:"cesiumContainer",class:"map"},c={__name:"WMS",setup(i){let e=null;return s(async()=>{e=new Cesium.Viewer("cesiumContainer"),e.scene.debugShowFramesPerSecond=!0;let r=new Cesium.WebMapServiceImageryProvider({url:"https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?",layers:"nexrad-n0r",credit:"demo",parameters:{transparent:"true",format:"image/png"}});e.imageryLayers.addImageryProvider(r)}),(r,m)=>(t(),n("div",o))}},u=a(c,[["__scopeId","data-v-62c828d4"]]);export{u as default};