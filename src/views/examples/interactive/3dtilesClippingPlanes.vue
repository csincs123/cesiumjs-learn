<script setup>
import * as Cesium from 'cesium'
import {onMounted, ref} from 'vue'

const selectValue = ref('')
const selectOptions = [
    {
        value: 'instance',
        label: '实例',
    },
    {
        value: 'model',
        label: '模型',
    },
]
let viewer = null
let scene = null

let targetY = 0.0;
let planeEntities = [];
let selectedPlane;
let clippingPlanes;

onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer')
    if (viewer) {
        scene = viewer.scene
    }

    const downHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    downHandler.setInputAction(function (movement) {
        const pickedObject = scene.pick(movement.position)
        if(
            Cesium.defined(pickedObject) &&
            Cesium.defined(pickedObject.id) &&
            Cesium.defined(pickedObject.id.plane) 
        ) {
            selectedPlane = pickedObject.id.plane
            selectedPlane.material =  Cesium.Color.WHITE.withAlpha(0.05)
            selectedPlane.outlineColor = Cesium.Color.WHITE
            scene.screenSpaceCameraController.enableInputs = false
        }
    }, Cesium.screenSpaceEventType.LEFT_DOWN)

    const upHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    upHandler.setInputAction(function (movement) {
        if (Cesium.defined(selectedPlane)) {
            selectedPlane.material = Cesium.Color.WHILE.withAlpha(0.1)
            selectedPlane.outlineColor = Cesium.Color.WHILE
            selectedPlane = undefined
        }

        scene.screenSpaceCameraController.enableInputs = true
    }, Cesium.ScreenSpaceEventType.LEFT_UP)

    const moveHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    moveHandler.setInputAction(function (movement) {
        if (Cesium.defined(selectedPlane)) {
            const deltaY = movement.startPosition.y - movement.endPosition.deltaY
            targetY += deltaY
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
})

const createPlaneUpdateFunction = (plane) => {
    return function () {
        plane.distance = targetY
        return plane
    }
}


const clipObjects = ["BIM", "Point Cloud", "Instanced", "Model"];
const viewModel = {
    debugBoundingVolumesEnabled: false,
    edgeStylingEnabled: true,
    exampleTypes: clipObjects,
    currentExampleType: clipObjects[0],
};
const loadTileset = async (resource, modelMatrix) => {
    const currentExampleType = viewModel.currentExampleType

    clippingPlanes = new Cesium.clippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 0.0)
        ],
        edgeWidth: viewModel.edgeStylingEnabled ? 1.0 : 0.0
    })

    try{
        const url = await Promise.resolve(resource)
        tileset = await Cesium.Cesium3DTileset.fromUrl(url, {
            clippingPlanes: clippingPlanes
        })

        if (currentExampleType !== viewModel.currentExampleType) {
            // Another tileset was loaded, discard the current result
            return;
        }

        if (Cesium.defined(modelMatrix)) {
            tileset.modelMatrix = modelMatrix
        }

        viewer.scene.primitives.add(tileset)
        tileset.debugBoundingVolume = viewModel.debugBoundingVolumesEnabled
        const boundingSphere = tileset.boundingShpere
        const radius = boundingSphere.radius
        viewer.zoomTo(tileset, new Cesium.HeadingPitchRanges(0.5, -0.2, radius* 4.0))

        if(!Cesium.Matrix4.equals(tileset.root.transform, Cesium.Matrix4.IDENTITY)) {
            const transformCenter = Cesium.Matrix4.getTranslation(tileset.root.transform, new Cesium.Cartesian3())
            const transformCartographic = Cesium.Cartographic.fromCartesian(transformCenter)
            const boundingShpereCartographic = Cesium.Cartographic.fromCartesian(tileset.boundingShpere.center)
            const height = boundingShpereCartographic.height - transformCartographic.height
            clippingPlanes.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0.0, 0.0, height))
        }

        for(let i = 0; i < clippingPlanes.length; i++) {
            const plane = clippingPlanes.get(i)
            const planeEntity = viewer.entities.add({
                position: boundingShpere.center,
                plane: {
                    dimensions: new Cesium.Cartesian2(radius * 2.5, radius * 2.5),
                    material: Cesium.Color.WHITE.withAlpha(0.1),
                    plane: new Cesium.CallbackPropery(createPlaneUpdateFunction(plane, false)),
                    outline: true,
                    outlineColor: Cesium.Color.WHITE
                }
            })
            planeEntities.push(planeEntity)
        }
        return tileset
    } catch (error) {
        console.log(`Error loading tileset: ${error}`)
    }
}

const loadModel = async (url) => {
    clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
            new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 0.0)
        ],
        edgeWidth: viewModel.edgeStylingEnabled? 1.0: 0.0
    })
    const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 300.0)
    const heading = Cesium.Math.toRadians(135.0)
    const pitch = 0.0
    const roll = 0.0
    const hpr = new Cesium.headingPitchRoll(heading, pitch, roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)
    const entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
            uri: url,
            scale: 8,
            minimumPixelSize: 100.0,
            clippingPlanes: clippingPlanes
        }
    })

    viewer.trackedEntity = entity;

    for (let i = 0; i < clippingPlanes.length; ++i) {
        const plane = clippingPlanes.get(i)
        const planeEntity = viewer.entities.add({
            position: position,
            plane: {
                dimensions: new Cesium.Cartesian2(300.0, 300.0),
                material: Cesium.Color.WHITE.withAlpha(0.1),
                plane: new Cesium.CallbackProperty(
                    createPlaneUpdateFunction(plane),
                    false
                ),
                outline: true,
                outlineColor: Cesium.Color.WHITE
            }
        })

        planeEntities.push(planeEntity)
    }
}

const instanceUrl = ""
const modelUrl = ""

</script>

<template>
<div id ="cesiumContainer" class = 'map'>
    <div class='toolbar'>
        <el-select v-model="selectValue" style="width: 120px">
            <el-option 
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <el-checkbox label="显示边界体积"></el-checkbox>
        <el-checkbox label="启用边缘样式"></el-checkbox>
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
    left: 20px;
    z-index: 100;
    display: flex;
    background: rgba(128,128,128,0.5);
    color: white;
}
.toolbar .el-select {
    margin-right: 10px;
}
.toolbar .el-checkbox {
    margin-right: 10px;
    color: white;
}
</style>