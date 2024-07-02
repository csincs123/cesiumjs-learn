<script setup>
// import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, GeoJsonDataSource, ClassificationType, Model, Cesium3DTileStyle,Ellipsoid} from 'cesium';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted } from "vue";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDNiMDU1Yi0zNTM0L' + 
                          'TQ3ZGEtYTYwNy03NjExYjY5NGVjNTYiLCJpZCI6MTA1NDE2LCJpYXQiOjE2NjEwODc' + 
                          '2Mzl9.Tb0oUIPl1DsCS6BQDDvhTeImZI8PQDb1g3hX62SopF0';
let viewer = null
let buildingsTileset = null
let newBuildingTileset = null

onMounted(async () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain()
  })
  // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
  });
  // step2 Add Cesium OSM Buildings.
  buildingsTileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingsTileset);

  // await addBuildingGeoJSON();

  
})

async function addBuildingGeoJSON() {
  // Load the GeoJSON file from Cesium ion.
  // const geoJSONURL = await Cesium.IonResource.fromAssetId(your_asset_id);
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const new_building_denver = '/new_building_denver.json';
  const geoJSON = await Cesium.GeoJsonDataSource.load(new_building_denver, { clampToGround: true });
  // Add it to the scene.
  const dataSource = await viewer.dataSources.add(geoJSON);
  // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
  // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
  for (const entity of dataSource.entities.values) {
    entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
  }
  // Move the camera so that the polygon is in view.
  viewer.flyTo(dataSource);
}

function hiddenOldBuilding () {
  // STEP 4 CODE
  // Hide individual buildings in this area using 3D Tiles Styling language.
  buildingsTileset.style = new Cesium.Cesium3DTileStyle({
    // Create a style rule to control each building's "show" property.
    show: {
      conditions : [
        // Any building that has this elementId will have `show = false`.
        ['${elementId} === 332469316', false],
        ['${elementId} === 332469317', false],
        ['${elementId} === 235368665', false],
        ['${elementId} === 530288180', false],
        ['${elementId} === 530288179', false],
        ['${elementId} === 532245203', false],
        // If a building does not have one of these elementIds, set `show = true`.
        [true, true]
      ]
    },
    // Set the default color style for this particular 3D Tileset.
    // For any building that has a `cesium#color` property, use that color, otherwise make it white.
    color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
  });
}


async function showNewBuilding () {

  if (newBuildingTileset) {
    newBuildingTileset.show = !newBuildingTileset.show
    return 
  }

  // STEP 6 CODE
  // Add the 3D Tileset you created from your Cesium ion account.
  const newBuildingTilesetUrl = '/PSFS.glb'

  // Position a model with modelMatrix and display it with a minimum size of 128 pixels
  const position = Cesium.Cartesian3.fromDegrees(
    -104.9909,
    39.73579,
    1577
  );

  const headingPositionRoll = new Cesium.HeadingPitchRoll(-8,0,0);
  // const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
  //   "north",
  //   "west"
  // );

  newBuildingTileset = await Cesium.Model.fromGltfAsync({
    url: newBuildingTilesetUrl,
    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
     position,
     headingPositionRoll,
     Cesium.Ellipsoid.WGS84,
    //  fixedFrameTransform
   )
  })
  // const newBuildingTileset = await Cesium.Cesium3DTileset.fromIonAssetId();
  viewer.scene.primitives.add(newBuildingTileset);
  console.log('newBuildingTileset', newBuildingTileset)
  // Move the camera to the new building.
  // viewer.flyTo(newBuildingTileset);

}


</script>

<template>
  <div id = "cesiumContainer" class="map"> 
    <div class="buttonDiv">
      <button @click="addBuildingGeoJSON" >显示新建筑范围</button>
      <button @click="hiddenOldBuilding">隐藏旧建筑</button>
      <button @click="showNewBuilding">显示新建筑</button>
    </div>
    
  </div>
</template>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
  /* position: fixed;  */
  #toggle-building { z-index: 1; top: 5px; left: 5px; }

  .buttonDiv {
    z-index: 100;
    width: 100px;
    position: absolute;
    top: 10px;
    left: 200px;
  }

</style>