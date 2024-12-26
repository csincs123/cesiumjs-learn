<script setup>
import * as Cesium from 'cesium'
import {onMounted, reactive } from 'vue'

const form = reactive({
  screenPosition: '',
  cartesian3: '',
  pickPosition: '',
  rayPosition: '',
  type: [],
  resource: '',
  desc: '',
})

let viewer = null
onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain()
    })
    mouseClick()
})

const mouseClick = () => {
    new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction((movement) => {
        // 屏幕坐标
        form.screenPosition = `x:${round(movement.position.x)}, y: ${round(movement.position.y)}`
        // 椭球面坐标
        let pickEllipsoid = viewer.camera.pickEllipsoid(movement.position, viewer.scene.ellipsoid)
        form.cartesian3 = `x:${round(pickEllipsoid.x)}, y:${round(pickEllipsoid.y)}, z:${round(pickEllipsoid.z)}`
        // 地标坐标
        let ray = viewer.camera.getPickRay(movement.position)
        var rayPosition = viewer.scene.globe.pick(ray, viewer.scene);
        form.rayPosition = `x:${round(rayPosition.x)}, y:${round(rayPosition.y)}, z:${round(rayPosition.z)}`
        // 场景坐标
        let pickPosition = viewer.scene.pickPosition(movement.position)
        form.pickPosition = `x:${round(pickPosition.x)}, y:${round(pickPosition.y)}, z:${round(pickPosition.z)}`
        
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

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
            <el-form-item label= "地标坐标" >
                <el-input v-model="form.rayPosition" />
            </el-form-item>
            <el-form-item label= "drillPick" >
                <el-input v-model="form.pickPosition" />
            </el-form-item>
            <el-form-item label= "scenePick" >
                <el-input v-model="form.pickPosition" />
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
    width: 35vw;
    /* height: 30vh; */
    /* background: rgb(24, 184, 32); */
}
::v-deep(.el-form-item__label) {
    color: #aef
}
</style>