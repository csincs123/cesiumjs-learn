<script setup>
import * as Cesium from 'cesium'
import {onMounted, reactive } from 'vue'

const form = reactive({
  screenPosition: '',
  cartesian3: '',
  pickPosition: '',
  rayPosition: '',
  modelCartographic: '',
  rayCartographic: ''
})

let viewer = null
onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain()
    })
    let buildingsTileset = await Cesium.createOsmBuildingsAsync()
    viewer.scene.primitives.add(buildingsTileset)

    // Adjust the camera to look at Melbourne
    viewer.camera.lookAt(
        new Cesium.Cartesian3.fromDegrees(144.96007, -37.82249),
        new Cesium.Cartesian3(0.0, -1500.0, 1200.0)
    );
    mouseClick()
})

const mouseClick = () => {
    new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction((movement) => {
        // 屏幕坐标
        form.screenPosition = `x:${round(movement.position.x)}, y: ${round(movement.position.y)}`
        // 椭球面坐标
        let pickEllipsoid = viewer.camera.pickEllipsoid(movement.position, viewer.scene.ellipsoid)
        form.cartesian3 = `x:${round(pickEllipsoid.x)}, y:${round(pickEllipsoid.y)}, z:${round(pickEllipsoid.z)}`
        // 场景坐标
        let pickPosition = viewer.scene.pickPosition(movement.position)
        form.pickPosition = `x:${round(pickPosition.x)}, y:${round(pickPosition.y)}, z:${round(pickPosition.z)}`
        // 模型经纬度
        let modelCartographic = Cesium.Cartographic.fromCartesian(pickPosition)
        let modelLng = Cesium.Math.toDegrees(modelCartographic.longitude).toFixed(6)
        let modelLat = Cesium.Math.toDegrees(modelCartographic.latitude).toFixed(6)
        form.modelCartographic = `x:${modelLng}, y:${modelLat}, z:${modelCartographic.height.toFixed(4)}`
        // 地标坐标
        let ray = viewer.camera.getPickRay(movement.position)
        var rayPosition = viewer.scene.globe.pick(ray, viewer.scene);
        form.rayPosition = `x:${round(rayPosition.x)}, y:${round(rayPosition.y)}, z:${round(rayPosition.z)}`
        // 地面经纬度
        let rayCartographic = Cesium.Cartographic.fromCartesian(rayPosition)
        let rayLng = Cesium.Math.toDegrees(rayCartographic.longitude).toFixed(6)
        let rayLat = Cesium.Math.toDegrees(rayCartographic.latitude).toFixed(6)
        form.rayCartographic = `x:${rayLng}, y:${rayLat}, z:${rayCartographic.height.toFixed(4)}`
        // 获取Cesium3DTileFeature
        const feature = viewer.scene.pick(movement.position)
        if(feature instanceof Cesium.Cesium3DTileFeature ) {
            feature.color = Cesium.Color.RED
        }
        // 获取Cesium3DTileFeature集合
        const featureArray = viewer.scene.drillPick(movement.position)
        featureArray.forEach(feature => {
            feature.color = Cesium.Color.BLUE
        })
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

// const mouseClick = () => {
//   new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction((movement) => {
//    let pickPosition = viewer.scene.pickPosition(movement.position)
//    let modelCartographic = Cesium.Cartographic.fromCartesian(pickPosition)
//    let lng = Cesium.Math.toDegrees(modelCartographic.longitude).toFixed(6)
//    let lat = Cesium.Math.toDegrees(modelCartographic.latitude).toFixed(6)
//    console.log(`lng:${lng}, lat:${lat}`)
//   },Cesium.ScreenSpaceEventType.LEFT_CLICK)
// }

// mouseClick()

const round = (number) => {
    return number.toFixed(2)
}
</script>

<template>
<div id ="cesiumContainer" class = 'map'>
    <div class = "floatDiv">
        <el-form :model="form" label-width="auto">
            <el-form-item label= "屏幕坐标" >
                <el-input v-model="form.screenPosition" />
            </el-form-item>
            <el-form-item label= "椭球面坐标" >
                <el-input v-model="form.cartesian3" />
            </el-form-item>
            <el-form-item label= "场景坐标" >
                <el-input v-model="form.pickPosition" />
            </el-form-item>
            <el-form-item label= "模型经纬度" >
                <el-input v-model="form.modelCartographic" />
            </el-form-item>
            <el-form-item label= "地标坐标" >
                <el-input v-model="form.rayPosition" />
            </el-form-item>
            <el-form-item label= "地面经纬度" >
                <el-input v-model="form.rayCartographic" />
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<style scoped>
.map {
    height: 100%;
    width: 100%;
    position: relative;
}
.floatDiv{
    position: absolute;
    top: 10px; /* 距离顶部 10px */
    left: 10px; /* 距离左侧 10px */
    z-index: 10; /* 提高层级，确保浮层显示在地图上方 */
    width: 27vw;
    /* height: 30vh; */
    /* background: rgb(24, 184, 32); */
}
::v-deep(.el-form-item__label) {
    color: #aef
}
</style>