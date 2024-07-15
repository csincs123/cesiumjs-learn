<script setup >
import * as Cesium from 'cesium'
import {ref, onMounted} from 'vue'

const value = ref('')
let viewer = null
const options = [
  {label: "飞向一个地点", value: 'Fly to a location'},
  {label: "飞向一个地点（带方向）", value: 'Fly to a location with orientation'},
  {label: "飞向一个实体", value: 'Fly to an asset'},
  {label: "创建缓动函数", value: 'Create an easing function'},
  {label: "看一个点", value: 'Look at a point'},
  {label: "绕一点运行", value: 'Orbit around a point'},
]
const flyLocation = () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 1500.0)
  });
}
const flyLocationOrientation = () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 1500.0),
    orientation: {
      heading: Cesium.Math.toRadians(20.0),
      pitch: Cesium.Math.toRadians(-35.0),
      roll: 0.0,
    },
  });
}
const flyAsset = () => {
  var west = -90.0;
  var south = 38.0;
  var east = -87.0;
  var north = 40.0;
  var rectangle = viewer.entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(west, south, east, north),
    },
  });
  viewer.flyTo(rectangle);
}

const easing = () => {
  viewer.camera.flyTo({
    destination: new Cesium.Cartesian3(
      -3961951.575572026,
      3346492.0945766014,
      3702340.5336036095
    ),
    orientation: {
      direction: new Cesium.Cartesian3(
        0.8982074415844437,
        -0.4393530288745287,
        0.013867512433959908
      ),
      up: new Cesium.Cartesian3(
        0.12793638617798253,
        0.29147314437764565,
        0.9479850669701113
      ),
    },
    complete: function () {
      setTimeout(function () {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2304817.2435183465,
            -3639113.128132953,
            4688495.013644141
          ),
          orientation: {
            direction: new Cesium.Cartesian3(
              0.3760550186878076,
              0.9007147395506565,
              0.21747547189489164
            ),
            up: new Cesium.Cartesian3(
              -0.20364591529594356,
              -0.14862471084230877,
              0.9676978022659334
            ),
          },
          easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
          duration: 5,
        });
      }, 5000);
    },
  });
}

const lookPoint = () => {
  const center = Cesium.Cartesian3.fromRadians(
    2.4213211833389243,
    0.6171926869414084,
    3626.0426275055174
  );
  const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
  viewer.scene.camera.lookAtTransform(
    transform,
    new Cesium.HeadingPitchRange(0, -Math.PI / 4, 2900)
  );
}

const orbitAroundPoint = () => {
  // Lock camera to a point
  const center = Cesium.Cartesian3.fromRadians(
    2.4213211833389243,
    0.6171926869414084,
    3626.0426275055174
  );
  const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
  viewer.scene.camera.lookAtTransform(
    transform,
    new Cesium.HeadingPitchRange(0, -Math.PI / 8, 2900)
  );

  // Orbit this point
  viewer.clock.onTick.addEventListener(function (clock) {
    viewer.scene.camera.rotateRight(0.005);
  });
}

onMounted (async () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain()
  })
})

const handleSelect = (value) => {
  switch (value) {
    case 'Fly to a location':
      flyLocation()
      break;
    case 'Fly to a location with orientation':
      flyLocationOrientation()
      break
    case 'Fly to an asset':
      flyAsset()
      break
    case 'Create an easing function':
      easing()
      break
    case 'Look at a point':
      lookPoint()
      break
    case 'Orbit around a point':
      orbitAroundPoint()
      break
    default:
      break;
  }
}
</script>

<template>
  <div id = "cesiumContainer" class="map">
    <div class="select">
      <el-select 
        v-model="value"
        style="width: 240px"
        placeholder="摄像头操作"
        @change="handleSelect"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-checkbox v-model="checked1" label="Get location of a point" size="large" />
      <el-checkbox v-model="checked2" label="Screen space camera controller" size="large" />
    </div>
  </div>
</template>


<style>
  .map {
    height: 100%;
    width: 100%;
  }
  .select {
    z-index: 100;
    position: absolute;
    top: 10px;
    left: 200px;
  }

</style>