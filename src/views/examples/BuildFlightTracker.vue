<script setup>
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted } from "vue";
import {fetchLocalJson} from '@/components/utils/JSONUtil.js'


Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDNiMDU1Yi0zNTM0L' + 
                          'TQ3ZGEtYTYwNy03NjExYjY5NGVjNTYiLCJpZCI6MTA1NDE2LCJpYXQiOjE2NjEwODc' + 
                          '2Mzl9.Tb0oUIPl1DsCS6BQDDvhTeImZI8PQDb1g3hX62SopF0';
let viewer = null
let buildingsTileset = null
let flightData = null
let start = null
let stop = null
let positionProperty = null
let radarDataSource = null

onMounted(async () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain()
  })
  // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
  // viewer.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
  // });
  // step2 Add Cesium OSM Buildings.
  buildingsTileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingsTileset);
})


async function addRadarSamples () {
  if (radarDataSource) {
    radarDataSource.show = !radarDataSource.show  
    return 
  }
  flightData = await fetchLocalJson('/flight.json')

  radarDataSource = new Cesium.CustomDataSource('myData');
  // radarCollection = new Cesium.EntityCollection()
  
  // Create a point for each.
  for (let i = 0; i < flightData.length; i++) {
    const dataPoint = flightData[i];
    let entity = new Cesium.Entity({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position: Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height),
      point: { pixelSize: 10, color: Cesium.Color.RED }
    })
    radarDataSource.entities.add(entity)
  }
  // radarDataSource.entities = radarCollection
  viewer.dataSources.add(radarDataSource);
}

async function movementOvertime (type) {
  if (!flightData) {
    flightData = await fetchLocalJson('/flight.json')
  }
  /* Initialize the viewer clock:
    Assume the radar samples are 30 seconds apart, and calculate the entire flight duration based on that assumption.
    Get the start and stop date times of the flight, where the start is the known flight departure time (converted from PST 
      to UTC) and the stop is the start plus the calculated duration. (Note that Cesium uses Julian dates. See 
      https://simple.wikipedia.org/wiki/Julian_day.)
    Initialize the viewer's clock by setting its start and stop to the flight start and stop times we just calculated. 
    Also, set the viewer's current time to the start time and take the user to that time. 
  */
  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  start = Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z");
  stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.timeline.zoomTo(start, stop);
  // Speed up the playback speed 50x.
  viewer.clock.multiplier = 50;
  // Start playing the scene.
  viewer.clock.shouldAnimate = true;

  // The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
  positionProperty = new Cesium.SampledPositionProperty();

  for (let i = 0; i < flightData.length; i++) {
    const dataPoint = flightData[i];

    // Declare the time for this individual sample and store it in a new JulianDate instance.
    const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
    const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
    // Store the position along with its timestamp.
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(time, position);

  }
  // STEP 4 CODE (green circle entity)
  // Create an entity to both visualize the entire radar sample series with a line and add a point that moves along the samples.
  let model = null
  if (type === 'greenPoint') {
    model = {
      availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
      position: positionProperty,
      point: { pixelSize: 30, color: Cesium.Color.GREEN },
      path: new Cesium.PathGraphics({ width: 3 })
    }
  } else {
    model = loadAirModel()
  }
  const airplaneEntity = viewer.entities.add(model);
  // Make the camera track this moving entity.
  viewer.trackedEntity = airplaneEntity;
} 

// STEP 6 CODE (airplane entity)
function loadAirModel() {
  // Load the glTF model from Cesium ion.
  const airplaneModelUrl = '/Cesium_Air.glb'
  return  {
    availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
    position: positionProperty,
    // Attach the 3D model instead of the green point.
    model: { uri: airplaneModelUrl, minimumPixelSize: 100 },
    // Automatically compute the orientation from the position.
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),    
    path: new Cesium.PathGraphics({ width: 3 })
  }
}

function movementGreenPoint () {
    movementOvertime('greenPoint')
}

function movementAirplane () {
  movementOvertime('airplane')
}




</script>

<template>
  <div id = "cesiumContainer" class="map"> 
    <div class="buttonDiv">
      <button @click="addRadarSamples" >添加雷达数据</button>
      <button @click="movementGreenPoint">绿点移动</button>
      <button @click="movementAirplane">飞机移动</button>
    </div>
  </div>
</template>


<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
  .buttonDiv {
    display: flex;
    justify-content: space-around;
    z-index: 100;
    /* width: 100px; */
    position: absolute;
    top: 10px;
    left: 200px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .buttonDiv button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }
  .buttonDiv button:hover {
    background-color: #2980b9
  }
  .buttonDiv button:focus {
    outline: none
  }
</style>
