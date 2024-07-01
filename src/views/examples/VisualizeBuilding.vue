<script setup>
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, GeoJsonDataSource, ClassificationType, Model} from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted } from "vue";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDNiMDU1Yi0zNTM0LTQ3ZGEtYTYwNy03NjExYjY5NGVjNTYiLCJpZCI6MTA1NDE2LCJpYXQiOjE2NjEwODc2Mzl9.Tb0oUIPl1DsCS6BQDDvhTeImZI8PQDb1g3hX62SopF0';
let viewer = null
onMounted(async () => {
  viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain()
  })
  // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
  });
  // step2 Add Cesium OSM Buildings.
  const buildingsTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingsTileset);

  await addBuildingGeoJSON();
})

async function addBuildingGeoJSON() {
  // Load the GeoJSON file from Cesium ion.
  // const geoJSONURL = await Cesium.IonResource.fromAssetId(your_asset_id);
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const new_building_denver = '/new_building_denver.json';
  const geoJSON = await GeoJsonDataSource.load(new_building_denver, { clampToGround: true });
  // Add it to the scene.
  const dataSource = await viewer.dataSources.add(geoJSON);
  // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
  // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
  for (const entity of dataSource.entities.values) {
    entity.polygon.classificationType = ClassificationType.TERRAIN;
  }
  // Move the camera so that the polygon is in view.
  viewer.flyTo(dataSource);
}

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
      // If a building does not have one of these elementIds, set `show = true`.
      [true, true]
    ]
  },
  // Set the default color style for this particular 3D Tileset.
  // For any building that has a `cesium#color` property, use that color, otherwise make it white.
  color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
});

// STEP 6 CODE
// Add the 3D Tileset you created from your Cesium ion account.
const newBuildingTilesetUrl = '/PSFS.glb'
const newBuildingTileset = await Model.fromGltfAsync({
  url: newBuildingTilesetUrl
})
// const newBuildingTileset = await Cesium.Cesium3DTileset.fromIonAssetId();
viewer.scene.primitives.add(newBuildingTileset);

// Move the camera to the new building.
viewer.flyTo(newBuildingTileset);


</script>

<template>
  <div id = "cesiumContainer" class="map"> 
    <button id="toggle-building" >Toggle new building</button>
  </div>
</template>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
  #toggle-building { z-index: 1; position: fixed; top: 5px; left: 5px; }
</style>