<script setup>
import * as Cesium from 'cesium'
import {onMounted, ref} from 'vue'
import {add3dTiles} from '../../../components/utils/mapUtil.js'

let viewer = null
onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer')
})

const load3dtile = async () => {
    // const buildingModel = await new Cesium.Cesium3DTileset({
    //     url: 'http://localhost:9900/tileset.json'
    // })
    const tileUrl = '/cesiumjs-learn/Scene/Production_1.json'

    add3dTiles(viewer, tileUrl, 50, true)
    // 'http://localhost:9900/tileset.json'
    // 'http://111.8.143.90:1812/tiles/tc_3dtiles/'
    // const buildingModel = await Cesium.Cesium3DTileset.fromUrl(tileUrl)
    // // url: 'http://localhost:9900/tileset.json'
    // console.log('buildingModel', buildingModel)
    // viewer.scene.primitives.add(buildingModel)
    // const boundingSphere = buildingModel.boundingSphere;
    // viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
}
</script>

<template>
<div id ="cesiumContainer" class = 'map'>
    <div class="toolbar">
        <el-button @click="load3dtile">加载模型</el-button>
    </div>
</div>
</template>

<style scoped>
.map {
    height: 100%;
    width: 100%; 
}
.toolbar {
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>