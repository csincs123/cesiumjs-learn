<script setup>
import * as Cesium from 'cesium'
import {ref, reactive, onMounted, watch} from 'vue'

let viewer = null
let viewModel = reactive({
    emissionRate: 5.0,
    gravity: 0.0,
    minimumParticleLife: 1.2,
    maximumParticleLife: 1.2,
    minimumSpeed: 1.0,
    maximumSpeed: 4.0,
    startScale: 1.0,
    endScale: 5.0,
    particleSize: 25.0
});
let milkEntity = null
let particleSystem = null
let curEmitter = ref('')

const emitterOption = [
  {value:"Circle Emitter", name: "圆形发射器"},
  {value:"Sphere Emitter", name: "球体发射器"},
  {value:"Cone Emitter", name: "锥形发射器"},
  {value:"Box Emitter", name: "盒发射器"}
] 


onMounted(async () => {
    viewer = new Cesium.Viewer("cesiumContainer");
    const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
    const stop = Cesium.JulianDate.addSeconds(
        start,
        120,
        new Cesium.JulianDate()
    );
    //Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 1;
    viewer.clock.shouldAnimate = false;

    //Set timeline to simulation bounds
    viewer.timeline.zoomTo(start, stop);
    const pos1 = Cesium.Cartesian3.fromDegrees(
        -75.15787310614596,
        39.97862668312678
    );
    const pos2 = Cesium.Cartesian3.fromDegrees(
        -75.1633691390455,
        39.95355089912078
    );
    const position = new Cesium.SampledPositionProperty();
    position.addSample(start, pos1);
    position.addSample(stop, pos2);
    milkEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
              start: start,
              stop: stop,
          }),
      ]),
      model: {
          uri: "CesiumMilkTruck.glb",
          minimumPixelSize: 64,
      },
      viewFrom: new Cesium.Cartesian3(-100.0, 0.0, 100.0),
      position: position,
      orientation: new Cesium.VelocityOrientationProperty(position),
    });
    viewer.trackedEntity = milkEntity;
    
    particleSystem = viewer.scene.primitives.add(
      new Cesium.ParticleSystem({
        image: "smoke.png",

        startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
        endColor: Cesium.Color.WHITE.withAlpha(0.0),

        startScale: viewModel.startScale,
        endScale: viewModel.endScale,

        minimumParticleLife: viewModel.minimumParticleLife,
        maximumParticleLife: viewModel.maximumParticleLife,

        minimumSpeed: viewModel.minimumSpeed,
        maximumSpeed: viewModel.maximumSpeed,

        imageSize: new Cesium.Cartesian2(
          viewModel.particleSize,
          viewModel.particleSize
        ),

        emissionRate: viewModel.emissionRate,

        // bursts: [
        //   // these burst will occasionally sync to create a multicolored effect
        //   new Cesium.ParticleBurst({
        //     time: 5.0,
        //     minimum: 10,
        //     maximum: 100,
        //   }),
        //   new Cesium.ParticleBurst({
        //     time: 10.0,
        //     minimum: 50,
        //     maximum: 100,
        //   }),
        //   new Cesium.ParticleBurst({
        //     time: 15.0,
        //     minimum: 200,
        //     maximum: 300,
        //   }),
        // ],

        lifetime: 16.0,

        emitter: new Cesium.CircleEmitter(2.0),

        emitterModelMatrix: computeEmitterModelMatrix(),

        // updateCallback: applyGravity,
      })
  );

    viewer.scene.preUpdate.addEventListener(function (scene, time) {
      particleSystem.modelMatrix = computeModelMatrix(milkEntity, time);

      // Account for any changes to the emitter model matrix.
      particleSystem.emitterModelMatrix = computeEmitterModelMatrix();

      // Spin the emitter if enabled.
      if (viewModel.spin) {
        viewModel.heading += 1.0;
        viewModel.pitch += 1.0;
        viewModel.roll += 1.0;
      }
    });
})



const entityPosition = new Cesium.Cartesian3();
const entityOrientation = new Cesium.Quaternion();
const rotationMatrix = new Cesium.Matrix3();
const modelMatrix = new Cesium.Matrix4();

function computeModelMatrix(entity, time) {
  return entity.computeModelMatrix(time, new Cesium.Matrix4());
}

function computeEmitterModelMatrix () {
  const emitterModelMatrix = new Cesium.Matrix4();
  const translation = new Cesium.Cartesian3();
  const rotation = new Cesium.Quaternion();
  let hpr = new Cesium.HeadingPitchRoll();
  const trs = new Cesium.TranslationRotationScale();
  hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
  trs.translation = Cesium.Cartesian3.fromElements(
    -4.0,
    0.0,
    1.4,
    translation
  );
  trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

  return Cesium.Matrix4.fromTranslationRotationScale(
    trs,
    emitterModelMatrix
  );
}
watch(() => viewModel.emissionRate, (emissionRate) => {
  particleSystem.emissionRate = parseFloat(emissionRate)
})

watch(() => viewModel.minimumParticleLife, (minimumParticleLife) => {
  particleSystem.minimumParticleLife = parseFloat(minimumParticleLife)
})

watch(() => viewModel.maximumParticleLife, (maximumParticleLife) => {
  particleSystem.maximumParticleLife = parseFloat(maximumParticleLife)
})

watch(() => viewModel.minimumSpeed, (minimumSpeed) => {
  particleSystem.minimumSpeed = parseFloat(minimumSpeed)
})

watch(() => viewModel.maximumSpeed, (maximumSpeed) => {
  particleSystem.maximumSpeed = parseFloat(maximumSpeed)
})

watch(() => viewModel.startScale, (startScale) => {
  particleSystem.startScale = parseFloat(startScale)
})

watch(() => viewModel.endScale, (endScale) => {
  particleSystem.endScale = parseFloat(endScale)
})

watch(() => viewModel.particleSize, (particleSize) => {
  particleSize = parseFloat(particleSize)
  particleSystem.minimumImageSize.x = particleSize;
  particleSystem.minimumImageSize.y = particleSize;
  particleSystem.maximumImageSize.x = particleSize;
  particleSystem.maximumImageSize.y = particleSize;
})

function emitterSelect (emitterValue) {
  switch (emitterValue) {
    case 'Circle Emitter':
      particleSystem.emitter = new Cesium.CircleEmitter(2.0);
      break
    case 'Sphere Emitter':
      particleSystem.emitter = new Cesium.SphereEmitter(2.5);
      break
    case 'Cone Emitter':
      particleSystem.emitter = new Cesium.ConeEmitter(
        Cesium.Math.toRadians(45.0)
      );
      break
    case 'Box Emitter':
      particleSystem.emitter = new Cesium.BoxEmitter(
        new Cesium.Cartesian3(10.0, 10.0, 10.0)
      );
      break
    default:
      break
  }
}



</script>

<template>
    <div id = "cesiumContainer" class = "map"></div>
    <div id = "toolbar">
        <table>
        <tbody>
          <tr>
            <td>Rate</td>
            <td>
              <input type="range" min="0.0" max="100.0" step="1" v-model="viewModel.emissionRate">  
              <input type="text" size="5" v-model="viewModel.emissionRate">
            </td>
          </tr>

          <tr>
            <td>Size</td>
            <td>
              <input type="range" min="2" max="60.0" step="1" v-model="viewModel.particleSize">
              <input type="text" size="5" v-model="viewModel.particleSize">
            </td>
          </tr>

          <tr>
            <td>Min Life</td>
            <td>
              <input type="range" min="0.1" max="30.0" step="0.1" v-model="viewModel.minimumParticleLife">
              <input type="text" size="5" v-model="viewModel.minimumParticleLife">
            </td>
          </tr>

          <tr>
            <td>Max Life</td>
            <td>
              <input type="range" min="0.1" max="30.0" step="0.1" v-model="viewModel.maximumParticleLife">
              <input type="text" size="5" v-model="viewModel.maximumParticleLife">
            </td>
          </tr>

          <tr>
            <td>Min Speed</td>
            <td>
              <input type="range" min="0.0" max="30.0" step="1" v-model="viewModel.minimumSpeed">
              <input type="text" size="5" v-model="viewModel.minimumSpeed">
            </td>
          </tr>

          <tr>
            <td>Max Speed</td>
            <td>
              <input type="range" min="0.0" max="30.0" step="1" v-model="viewModel.maximumSpeed">
              <input type="text" size="5" v-model="viewModel.maximumSpeed">
            </td>
          </tr>


          <tr>
            <td>Start Scale</td>
            <td>
              <input type="range" min="0.0" max="10.0" step="1" v-model="viewModel.startScale">
              <input type="text" size="5" v-model="viewModel.startScale">
            </td>
          </tr>

          <tr>
            <td>End Scale</td>
            <td>
              <input type="range" min="0.0" max="10.0" step="1" v-model="viewModel.endScale">
              <input type="text" size="5" v-model="viewModel.endScale">
            </td>
          </tr>

          <tr>
            <td>Gravity</td>
            <td>
              <input type="range" min="-20.0" max="20.0" step="1" v-model="viewModel.gravity">
              <input type="text" size="5" v-model="viewModel.gravity">
            </td>
          </tr>
        </tbody>
      </table>
      <el-select
        v-model="curEmitter"
        @change="emitterSelect"
        placeholder="选择粒子发射器"
      >
        <el-option 
          v-for="item in emitterOption"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
</template>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
  #toolbar {
    z-index: 100;
    position: absolute;
    color: #ffffff;
    top: 10px;
    background: rgba(42, 42, 42, 0.8);
    padding: 4px;
    border-radius: 4px;
  }

  #toolbar input {
    vertical-align: middle;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  #toolbar .header {
    font-weight: bold;
  }
</style>