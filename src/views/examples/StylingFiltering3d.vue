<script setup>
import * as Cesium from 'cesium'
import {ref, onMounted } from 'vue'

const curOptions = ref('')

let viewer = null
let buildingsTileset = null
const options = [
    {label: "应用基础样式", value: 'Apply a basic style'},
    {label: "基于属性显示要素", value: 'Show features based on a property'},
    {label: "颜色特征使用条件", value: 'Color features using conditions'},
    {label: "处理未定义属性", value: 'Handle undefined properties'},
    {label: "点云样式", value: 'Point cloud styling example'},
]

const HandleUndefinedProperties = function () {
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
        color: {
        conditions: [
            ["${material} === null", "color('white')"],
            ["${material} === 'glass'", "color('skyblue', 0.5)"],
            ["${material} === 'concrete'", "color('grey')"],
            ["${material} === 'brick'", "color('indianred')"],
            ["true", "color('white')"],
        ],
        },
    });
}


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

const pointCloudStyle = async function () {
    // 取消lookAt效果，恢复到默认相机位置
    viewer.scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    let pointCloudTileset;
    try {
        // A ~10 billion point 3D Tileset of the city of Montreal, Canada captured in 2015 with a resolution of 20 cm. Tiled and hosted by Cesium ion.
        pointCloudTileset = await Cesium.Cesium3DTileset.fromIonAssetId(28945, {
            pointCloudShading: {
                attenuation: true,
                maximumAttenuation: 2,
            },
        });
        viewer.scene.primitives.add(pointCloudTileset);
    } catch (error) {
        console.log(`Error loading tileset: ${error}`);
    }
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(
            1269319.8408991008,
            -4293301.826913256,
            4527724.561372451
        ),
        orientation: {
            direction: new Cesium.Cartesian3(
            -0.742505030107832,
            -0.3413204607149223,
            -0.5763563336703441
            ),
            up: new Cesium.Cartesian3(
            -0.04655102331027917,
            -0.8320643756800384,
            0.5527222421370013
            ),
        },
        easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
    });
    pointCloudTileset.style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
            ["${Classification} === 2", "color('brown')"],       // ground
            ["${Classification} === 3", "color('greenyellow')"], // low vegetation
            ["${Classification} === 4", "color('green')"],       // medium vegetation
            ["${Classification} === 5", "color('darkgreen')"],   // high vegetation
            ["true", "color('white')"]
            ]
        }
    });
}


const handleSelect = (value) => {
  switch (value) {
    case 'Apply a basic style':
        basicStyle()
        break;
    case 'Show features based on a property':
        showFeatures()
        break
    case 'Color features using conditions':
        colorFeatures()
        break
    case 'Point cloud styling example':
        pointCloudStyle()
        break
    case 'Handle undefined properties':
        HandleUndefinedProperties()
        break
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
                v-model="curOptions"
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