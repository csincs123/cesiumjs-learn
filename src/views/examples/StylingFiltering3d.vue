<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

let viewer = null
let buildingsTileset = null
const options = [
    {label: "应用基础样式", value: 'Apply a basic style'},
    {label: "基于属性显示要素", value: 'Show features based on a property'},
    {label: "颜色特征使用条件", value: 'Color features using conditions'},
]
const basicStyle = function () {
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ["${name} === 'Crown Entertainment Complex'", "color('red')"],
                ["true", "color('white')"]
            ]
        }
    })
}
const showFeatures = function () {
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
        show: "${feature['building']} === 'residential' || ${feature['building']} === 'apartments'",
    });
}

const colorFeatures = function () {
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
        defines: {
            distanceFromComplex:
            "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(144.96007, -37.82249))",
        },
        color: {
            conditions: [
            ["${distanceFromComplex} > 0.010", "color('#d65c5c')"],
            ["${distanceFromComplex} > 0.006", "color('#f58971')"],
            ["${distanceFromComplex} > 0.002", "color('#f5af71')"],
            ["${distanceFromComplex} > 0.0001", "color('#f5ec71')"],
            ["true", "color('#ffffff')"],
            ],
        },
    });
}
const handleSelect = (value) => {
  switch (value) {
    case 'Apply a basic style':
        basicStyle()
      break;
    case 'Show features based on a property':
        showFeatures()
    case 'Color features using conditions':
        colorFeatures()
    default:
      break;
  }
}
onMounted(async () => {
    viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain()
    })
    buildingsTileset = await Cesium.createOsmBuildingsAsync()
    viewer.scene.primitives.add(buildingsTileset)

    // Adjust the camera to look at Melbourne
    viewer.camera.lookAt(
        new Cesium.Cartesian3.fromDegrees(144.96007, -37.82249),
        new Cesium.Cartesian3(0.0, -1500.0, 1200.0)
    );
    })
</script>

<template>
    <div id="cesiumContainer" class="map">
        <div class="select">
            <el-select
                v-model="value"
                @change="handleSelect"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
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
    width: 240px
  }
</style>