import{s as x}from"./index-CI0gfamW.js";import{o as z,a as G,c as H,d as S}from"./index-ZlcCc1lM.js";const V={id:"cesiumContainer",class:"map"},Y={__name:"CreatingEntities",setup(N){let e=null,o=null,a=null,u=null;z(async()=>{e=new Cesium.Viewer("cesiumContainer")});const d=[{label:"第一个实体",value:A},{label:"材质",value:D},{label:"材质-图像",value:_},{label:"材质-棋盘",value:M},{label:"材质-条纹",value:I},{label:"材质-网格",value:B},{label:"材质-外轮廓",value:W},{label:"折线",value:T},{label:"折线-外轮廓",value:O},{label:"折线-发光",value:L},{label:"高度",value:P},{label:"挤压高度",value:E},{label:"实体-选择和描述",value:k},{label:"相机控制",value:w},{label:"拾取-pick",value:y},{label:"拾取-drillPick",value:g},{label:"点-标签",value:f},{label:"广告牌",value:h},{label:"3d模型",value:p},{label:"3d模型方向",value:C}];function C(){const i=Cesium.Cartesian3.fromDegrees(-123.0744619,44.0503706),t=Cesium.Math.toRadians(45),n=Cesium.Math.toRadians(15),l=Cesium.Math.toRadians(0),s=Cesium.Transforms.headingPitchRollQuaternion(i,new Cesium.HeadingPitchRoll(t,n,l)),r=e.entities.add({position:i,orientation:s,model:{uri:"GroundVehicle.glb"}});e.trackedEntity=r}function p(){const i=e.entities.add({position:Cesium.Cartesian3.fromDegrees(-123.0744619,44.0503706),model:{uri:"GroundVehicle.glb"}});e.trackedEntity=i}function h(){const i=e.entities.add({position:Cesium.Cartesian3.fromDegrees(-75.166493,39.9060534),billboard:{image:"4821473b86284c69bdcd80d6379d49ba.jpg",width:64,height:64},label:{text:"Citizens Bank Park",font:"14pt monospace",style:Cesium.LabelStyle.FILL_AND_OUTLINE,outlineWidth:2,verticalOrigin:Cesium.VerticalOrigin.TOP,pixelOffset:new Cesium.Cartesian2(0,32)}});e.zoomTo(i)}function f(){e.entities.add({name:"Citizens Bank Park",position:Cesium.Cartesian3.fromDegrees(-75.166493,39.9060534),point:{pixelSize:5,color:Cesium.Color.RED,outlineColor:Cesium.Color.WHITE,outlineWidth:2},label:{text:"Citizens Bank Park",font:"14pt monospace",style:Cesium.LabelStyle.FILL_AND_OUTLINE,outlineWidth:2,verticalOrigin:Cesium.VerticalOrigin.BOTTOM,pixelOffset:new Cesium.Cartesian2(0,-9)}}),e.zoomTo(e.entities)}function g(){var i=document.getElementById("cesiumContainer");i.addEventListener("click",function(t){let n=b(e,new Cesium.Cartesian2(t.clientX,t.clientY));console.log("entityId",n)})}function y(){var i=document.getElementById("cesiumContainer");i.addEventListener("click",function(t){let n=v(e,new Cesium.Cartesian2(t.clientX,t.clientY));console.log("entityId",n)})}function b(i,t){let n,l,s;const r=i.scene.drillPick(t),R=r.length,m=[],c={};for(s=0;s<R;s++)n=r[s],l=Cesium.defaultValue(n.id,n.primitive.id),l instanceof Cesium.Entity&&!Cesium.defined(c[l.id])&&(m.push(l),c[l.id]=!0);return m}function v(i,t){const n=i.scene.pick(t);if(Cesium.defined(n)){const l=Cesium.defaultValue(n.id,n.primitive.id);if(l instanceof Cesium.Entity)return l}}async function w(){const i=Cesium.Math.toRadians(90),t=Cesium.Math.toRadians(-30);e.zoomTo(o,new Cesium.HeadingPitchRange(i,t)),o.position=Cesium.Cartesian3.fromDegrees(-107.724,42.68),e.trackedEntity=o}function k(){o.name="Wyoming",o.description='  <img    width="50%"    style="float:left; margin: 0 1em 1em 0;"    src="u=1034156886,276373436&fm=253&fmt=auto&app=138&f=JPEG.webp"/>  <p>    Wyoming is a state in the mountain region of the Western     United States.  </p>  <p>    Wyoming is the 10th most extensive, but the least populous     and the second least densely populated of the 50 United     States. The western two thirds of the state is covered mostly     with the mountain ranges and rangelands in the foothills of     the eastern Rocky Mountains, while the eastern third of the     state is high elevation prairie known as the High Plains.     Cheyenne is the capital and the most populous city in Wyoming,     with a population estimate of 63,624 in 2017.  </p>  <p>    Source:     <a style="color: WHITE"      target="_blank"      href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>  </p>'}function E(){o.polygon.height=2e5,o.polygon.extrudedHeight=25e4}function P(){o.polygon.height=25e4}function L(){u.material=new Cesium.PolylineGlowMaterialProperty({glowPower:.2,color:Cesium.Color.BLUE})}function O(){u.material=new Cesium.PolylineOutlineMaterialProperty({color:Cesium.Color.ORANGE,outlineWidth:3,outlineColor:Cesium.Color.BLACK})}function T(){const i=e.entities.add({polyline:{positions:Cesium.Cartesian3.fromDegreesArray([-77,35,-77.1,35]),width:5,material:Cesium.Color.RED},id:"polyline"});e.zoomTo(e.entities),u=i.polyline}function W(){a.fill=!1,a.outline=!0,a.outlineColor=Cesium.Color.YELLOW,a.outlineWidth=2}function B(){a.material=new Cesium.GridMaterialProperty({color:Cesium.Color.YELLOW,cellAlpha:.2,lineCount:new Cesium.Cartesian2(8,8),lineThickness:new Cesium.Cartesian2(2,2)})}function I(){a.material=new Cesium.StripeMaterialProperty({evenColor:Cesium.Color.WHITE,oddColor:Cesium.Color.BLACK,repeat:32})}function M(){a.material=new Cesium.CheckerboardMaterialProperty({evenColor:Cesium.Color.WHITE,oddColor:Cesium.Color.BLACK,repeat:new Cesium.Cartesian2(4,4)})}function _(){a.material="6c6515466de37629f9b67a959c6c8ed5.jpeg"}function A(){o=e.entities.add({polygon:{hierarchy:Cesium.Cartesian3.fromDegreesArray([-109.080842,45.002073,-105.91517,45.002073,-104.058488,44.996596,-104.053011,43.002989,-104.053011,41.003906,-105.728954,40.998429,-107.919731,41.003906,-109.04798,40.998429,-111.047063,40.998429,-111.047063,42.000709,-111.047063,44.476286,-111.05254,45.002073]),height:0,material:Cesium.Color.RED.withAlpha(.5),outline:!0,outlineColor:Cesium.Color.BLACK}}),e.zoomTo(o)}function D(){const i=e.entities.add({position:Cesium.Cartesian3.fromDegrees(-103,40),ellipse:{semiMinorAxis:25e4,semiMajorAxis:4e5,material:Cesium.Color.BLUE.withAlpha(.5)}});e.zoomTo(e.entities),a=i.ellipse}return(i,t)=>(G(),H("div",V,[S(x,{options:d})]))}};export{Y as default};