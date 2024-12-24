<script setup>
import * as Cesium from 'cesium'
import {ref, onMounted} from 'vue'
import selectEdit from '@/components/selectEdit/index.vue'

let viewer = null
let wyoming = null
let ellipse = null
let polyline = null
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer')
})
const options = [
    {label: "第一个实体", value: firstEntity},
    {label: "材质", value: materials},
    {label: "材质-图像", value: materialsImage},
    {label: "材质-棋盘", value: materialCheckerboard},
    {label: "材质-条纹", value: materialStrpe},
    {label: "材质-网格", value: materialGrid},
    {label: "材质-外轮廓", value: materialOutlines},
    {label: "折线", value: polylines},
    {label: "折线-外轮廓", value: polylinesOutline},
    {label: "折线-发光", value: polylinesGlow},
    {label: "高度", value: height},
    {label: "挤压高度", value: heightExtrusions},
    {label: "实体-选择和描述", value: selectionDescription},
    {label: "相机控制", value: cameraControls},
    {label: "拾取-pick", value: pick},
    {label: "拾取-drillPick", value: drillPick},
    {label: "点-标签", value: pointLabel},
    {label: "广告牌", value: billboard},
    {label: "3d模型", value: model3d},
    {label: "3d模型方向", value: model3dOrientation},
]
function model3dOrientation () {
  const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706);
  const heading = Cesium.Math.toRadians(45.0);
  const pitch = Cesium.Math.toRadians(15.0);
  const roll = Cesium.Math.toRadians(0.0);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    new Cesium.HeadingPitchRoll(heading, pitch, roll)
  );

  const entity = viewer.entities.add({
    position: position,
    orientation: orientation,
    model: {
      uri: "GroundVehicle.glb",
    },
  });
  viewer.trackedEntity = entity;
}
function model3d () {
  const model3dEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model: {
      uri: "GroundVehicle.glb",
    },
  });
  viewer.trackedEntity = model3dEntity;
}
function billboard () {
  const citizensBankPark = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    billboard: {
      image: "4821473b86284c69bdcd80d6379d49ba.jpg",
      width: 64,
      height: 64,
    },
    label: {
      text: "Citizens Bank Park",
      font: "14pt monospace",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(0, 32),
    },
  });
viewer.zoomTo(citizensBankPark);
}
function pointLabel () {
  const citizensBankPark = viewer.entities.add({
    name: "Citizens Bank Park",
    position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    point: {
      pixelSize: 5,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
    },
    label: {
      text: "Citizens Bank Park",
      font: "14pt monospace",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9),
    },
  });

  viewer.zoomTo(viewer.entities);
}
function drillPick () {
  var canvas = document.getElementById('cesiumContainer');
  canvas.addEventListener('click', function(e) {
    let entityId = drillPickEntities(viewer, new Cesium.Cartesian2(e.clientX, e.clientY))
    console.log('entityId', entityId)
  })
}
function pick () {
  var canvas = document.getElementById('cesiumContainer');
  canvas.addEventListener('click', function(e) {
    let entityId = pickEntity(viewer, new Cesium.Cartesian2(e.clientX, e.clientY))
    console.log('entityId', entityId)
  })
}
/**
 * Returns the list of entities at the provided window coordinates.
 * The entities are sorted front to back by their visual order.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity[]} The picked entities or undefined.
 */
 function drillPickEntities(viewer, windowPosition) {
  let picked, entity, i;
  const pickedPrimitives = viewer.scene.drillPick(windowPosition);
  const length = pickedPrimitives.length;
  const result = [];
  const hash = {};

  for (i = 0; i < length; i++) {
    picked = pickedPrimitives[i];
    entity = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (entity instanceof Cesium.Entity && !Cesium.defined(hash[entity.id])) {
      result.push(entity);
      hash[entity.id] = true;
    }
  }
  return result;
}
/**
 * Returns the top-most entity at the provided window coordinates
 * or undefined if no entity is at that location.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity} The picked entity or undefined.
 */
 function pickEntity(viewer, windowPosition) {
  const picked = viewer.scene.pick(windowPosition);
  if (Cesium.defined(picked)) {
    const id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) {
      return id;
    }
  }
  return undefined;
}
async function cameraControls () {
  const heading = Cesium.Math.toRadians(90);
  const pitch = Cesium.Math.toRadians(-30);
  viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch));
  // const result = await viewer.flyTo(wyoming);
  // if (result) {
  //   viewer.selectedEntity = wyoming;
  // }

  wyoming.position = Cesium.Cartesian3.fromDegrees(-107.724, 42.68);
  viewer.trackedEntity = wyoming;
}
function selectionDescription () {
  wyoming.name = "Wyoming";
  wyoming.description =
    '\
  <img\
    width="50%"\
    style="float:left; margin: 0 1em 1em 0;"\
    src="u=1034156886,276373436&fm=253&fmt=auto&app=138&f=JPEG.webp"/>\
  <p>\
    Wyoming is a state in the mountain region of the Western \
    United States.\
  </p>\
  <p>\
    Wyoming is the 10th most extensive, but the least populous \
    and the second least densely populated of the 50 United \
    States. The western two thirds of the state is covered mostly \
    with the mountain ranges and rangelands in the foothills of \
    the eastern Rocky Mountains, while the eastern third of the \
    state is high elevation prairie known as the High Plains. \
    Cheyenne is the capital and the most populous city in Wyoming, \
    with a population estimate of 63,624 in 2017.\
  </p>\
  <p>\
    Source: \
    <a style="color: WHITE"\
      target="_blank"\
      href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
  </p>';
}
function heightExtrusions () {
  wyoming.polygon.height = 200000;
  wyoming.polygon.extrudedHeight = 250000;
}
function height () {
  wyoming.polygon.height = 250000;
}
function polylinesGlow () {
  polyline.material = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.2,
    color: Cesium.Color.BLUE,
  });
}
function polylinesOutline () {
  polyline.material = new Cesium.PolylineOutlineMaterialProperty({
    color: Cesium.Color.ORANGE,
    outlineWidth: 3,
    outlineColor: Cesium.Color.BLACK,
  });
}

function polylines () {
  const entity = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
      width: 5,
      material: Cesium.Color.RED,
    },
    id: 'polyline'
  });
  viewer.zoomTo(viewer.entities);

  polyline = entity.polyline; // For upcoming examples
}
function materialOutlines () {
  ellipse.fill = false;
  ellipse.outline = true;
  ellipse.outlineColor = Cesium.Color.YELLOW;
  ellipse.outlineWidth = 2.0;
}
function materialGrid () {
  ellipse.material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(8, 8),
    lineThickness: new Cesium.Cartesian2(2.0, 2.0),
  });
}

function materialStrpe () {
  ellipse.material = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
    repeat: 32,
  });
}
function materialCheckerboard () {
  ellipse.material = new Cesium.CheckerboardMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
    repeat: new Cesium.Cartesian2(4, 4),
  });
}
function materialsImage () {
  ellipse.material = "6c6515466de37629f9b67a959c6c8ed5.jpeg"; 
}
function firstEntity () {
  wyoming = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
        -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
        -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
        -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
      ]),
      height: 0,
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });
  // wyoming.polygon.height = 200000;
  // wyoming.polygon.extrudedHeight = 250000;

  viewer.zoomTo(wyoming);
}

function materials () {
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
    ellipse: {
      semiMinorAxis: 250000.0,
      semiMajorAxis: 400000.0,
      material: Cesium.Color.BLUE.withAlpha(0.5),
    },
  });
  viewer.zoomTo(viewer.entities);

  ellipse = entity.ellipse; // For upcoming examples
}
</script>

<template>
  <div id = "cesiumContainer" class = "map">
    <selectEdit :options = "options" ></selectEdit>
  </div>
</template>

<style>
  .map{
    height: 100%;
    width:100%
  }
</style>