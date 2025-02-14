<script setup>
import * as Cesium from 'cesium'
import {onMounted, ref, watch} from 'vue'

const selectValue = ref('')
const showBoundingVolumes = ref(false)
const enableEdgeStyleing = ref(false)
const selectOptions = [
    {
        value: 'instance',
        label: '实例',
        url: import.meta.env.BASE_URL + '/cesium3dtiles/instanced/InstancedOrientation/tileset.json'
    },
    {
        value: 'model',
        label: '模型',
        url: import.meta.env.BASE_URL + '/Cesium_Air.glb'
    },
    {
        value: 'bim',
        label: 'bim',
        url: Cesium.IonResource.fromAssetId(2464651)
    },
    {
        value: 'pointCloud',
        label: '点云',
        url: Cesium.IonResource.fromAssetId(16421)
    }
]
let viewer = null
let scene = null

let targetY = 0.0;
let planeEntities = [];
let selectedPlane;
let clippingPlanes;
let tileset = null;

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
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

    const upHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    upHandler.setInputAction(function () {
        if (Cesium.defined(selectedPlane)) {
            selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1)
            selectedPlane.outlineColor = Cesium.Color.WHILE
            selectedPlane = undefined
        }

        scene.screenSpaceCameraController.enableInputs = true
    }, Cesium.ScreenSpaceEventType.LEFT_UP)

    const moveHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    moveHandler.setInputAction(function (movement) {
        if (Cesium.defined(selectedPlane)) {
            const deltaY = movement.startPosition.y - movement.endPosition.y
            targetY += deltaY
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
})

watch(showBoundingVolumes, (newValue) => {
    if (Cesium.defined(tileset)) {
        tileset.debugShowBoundingVolume = newValue;
    }
})

watch(enableEdgeStyleing, (newValue) => {
    if (Cesium.defined(clippingPlanes)) {
        const edgeWidth = newValue ? 1.0 : 0.0;
        clippingPlanes.edgeWidth = edgeWidth;
    }
})
const createPlaneUpdateFunction = (plane) => {
    return function () {
        // console.log('targetY', targetY)
        plane.distance = targetY
        return plane
    }
}

const clipObjects = ["instance", "model", "bim", "pointCloud"];
const viewModel = {
    debugBoundingVolumesEnabled: false,
    edgeStylingEnabled: true,
    exampleTypes: clipObjects,
    currentExampleType: clipObjects[0],
};

const loadTileset = async (resource, modelMatrix) => {
    const currentExampleType = viewModel.currentExampleType

    clippingPlanes = new Cesium.ClippingPlaneCollection({
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
        const boundingSphere = tileset.boundingSphere
        const radius = boundingSphere.radius
        viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.5, -0.2, radius* 4.0))

        if(!Cesium.Matrix4.equals(tileset.root.transform, Cesium.Matrix4.IDENTITY)) {
            const transformCenter = Cesium.Matrix4.getTranslation(tileset.root.transform, new Cesium.Cartesian3())
            const transformCartographic = Cesium.Cartographic.fromCartesian(transformCenter)
            const boundingSphereCartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
            const height = boundingSphereCartographic.height - transformCartographic.height
            clippingPlanes.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0.0, 0.0, height))
        }

        for(let i = 0; i < clippingPlanes.length; i++) {
            const plane = clippingPlanes.get(i)
            const planeEntity = viewer.entities.add({
                position: boundingSphere.center,
                plane: {
                    dimensions: new Cesium.Cartesian2(radius * 2.5, radius * 2.5),
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
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
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

const reset = () => {
    viewer.entities.removeAll();
    if (Cesium.defined(tileset)) {
        viewer.scene.primitives.remove(tileset);
    }

    planeEntities = [];
    targetY = 0.0;
    tileset = undefined;
}

const selectChange = (value) => {
    reset()
    viewModel.currentExampleType = value
    let selectOption = selectOptions.find(item=> item.value === value)
    switch(value) {
        case 'instance':
            loadTileset(
                selectOption.url,
                Cesium.Matrix4.fromTranslation(
                  new Cesium.Cartesian3(15.0, -58.6, 50.825),
                ),
              );
            break;
        case 'model':
            loadModel(selectOption.url);
            break;
        case 'bim':
            loadTileset(selectOption.url)
            break;
        case 'pointCloud':
            loadTileset(selectOption.url)
            break;
        default:
            break
    }
}
</script>

<template>
<div id ="cesiumContainer" class = 'map'>
    <div class='toolbar'>
        <el-select v-model="selectValue" @change="selectChange" style="width: 120px">
            <el-option 
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <el-checkbox label="显示边界体积" v-model = "showBoundingVolumes" ></el-checkbox>
        <el-checkbox label="启用边缘样式" v-model = "enableEdgeStyleing"></el-checkbox>
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