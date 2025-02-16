<script setup>
import * as Cesium from 'cesium'
import {isReactive, onMounted, ref} from 'vue'
import {add3dTiles, addChineseImageAnnotation, addTiandituImage} from '../../../components/utils/mapUtil.js'

let viewer = null

// 编辑状态
let isEditing = false
// 存储点击的顶点
const vertices = []
 // 绘制的点、线、多边形实体
let pointEntity;
let lineEntity;
let polygonEntity;

onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer')
    addTiandituImage(viewer)
    addChineseImageAnnotation(viewer)
    addHandler()
})

const load3dtile = async () => {
    const tileUrl = '/cesiumjs-learn/Scene/Production_1.json'
    add3dTiles(viewer, tileUrl, 40, true)
}

const editor = () => {
    isEditing = !isEditing;
    if (isEditing) {
        // this.textContent = '完成'
        vertices.length = 0
        if (polygonEntity) {
            viewer.entities.remove(polygonEntity)
            polygonEntity = undefined
        }
    }
}

const deleteEditor = () => {
}

const addHandler = () => {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    handler.setInputAction(function (movement) {
        if (isEditing) {
            if (pointEntity) {
                viewer.entities.remove(pointEntity);
                pointEntity = undefined;
            }
            if (lineEntity) {
                viewer.entities.remove(lineEntity);
                lineEntity = undefined;
            }
            if (polygonEntity) {
                viewer.entities.remove(polygonEntity);
                polygonEntity = undefined;
            }
            const cartesian = viewer.scene.pickPosition(movement.position)
            // const cartesian = viewer.scene.globe.pick(ray, viewer.scene)
            if (cartesian) {
                vertices.push(cartesian);
                if (vertices.length == 1) {
                    pointEntity = viewer.entities.add({
                        position: cartesian,
                        point: {
                            color: Cesium.Color.YELLOW,
                            pixelSize: 5
                        }
                    });
                } else if (vertices.length == 2 ) {
                    lineEntity = viewer.entities.add({
                        polyline: {
                            positions: vertices,
                            width: 2,
                            material: Cesium.Color.YELLOW
                        }
                    });
                } else {
                    // 绘制多边形
                    polygonEntity = viewer.entities.add({
                        polygon: {
                            hierarchy: new Cesium.PolygonHierarchy(vertices),
                            material: Cesium.Color.YELLOW.withAlpha(0.5),
                            heightReference: Cesium.HeightReference.CLAMP_TO_3D_TILE
                        }
                    })
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

</script>

<template>
<div id ="cesiumContainer" class = 'map'>
    <div class="toolbar">
        <el-button @click="load3dtile">加载模型</el-button>
        <el-button @click="editor">编辑</el-button>
        <el-button @click="deleteEditor">删除编辑</el-button>
    </div>
</div>
</template>

<style scoped>
.map {
    height: 100%;
    width: 100%;
    position: relative;
}
.toolbar {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
}
</style>