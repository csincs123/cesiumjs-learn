import * as Cesium from 'cesium'

export async function addTerrainAsync (viewer) {
//   viewer.scene.setTerrain(
//     new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(2523866))
//   )
  const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
    process.env.GIS_API + '/terrain/',
    {
      requestWaterMask: true,
      requestVertexNormals: true
    }
  )
  viewer.terrainProvider = terrainProvider
}

export async function add3dTiles (viewer, tileUrl, adjustHeight, isSetView) {
  let tileset = await Cesium.Cesium3DTileset.fromUrl(tileUrl)
  const cartographic = Cesium.Cartographic.fromCartesian(
    tileset.boundingSphere.center
  )
  const surface = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    0.0
  )
  const offset = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    adjustHeight
  )
  const translation = Cesium.Cartesian3.subtract(
    offset,
    surface,
    new Cesium.Cartesian3()
  )
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  viewer.scene.primitives.add(tileset)

  if (isSetView) {
    const boundingSphere = tileset.boundingSphere;
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
  }

  return tileset
}

export function addChineseImageAnnotation (viewer) {
  var TDT_KEY = '0ba0c3d3c24144281b1886d94e45dad0'
  var TDT_CIA_W = 'http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=' + TDT_KEY
  let cia = new Cesium.WebMapTileServiceImageryProvider({ // 调用影像中文注记服务
    url: TDT_CIA_W,
    layer: 'cia_w',
    style: 'default',
    format: 'tiles',
    tileMatrixSetID: 'GoogleMapsCompatible',
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], // 天地图8个服务器
    minimumLevel: 0,
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(cia)
}

export function addTiandituImage (viewer) {
  var TDT_KEY = '1fce32479ffd3e8c69f9eb81e44183b4'
  var TDT_CIA_W = 'https://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&layer=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&tk=' + TDT_KEY
  let cia = new Cesium.WebMapTileServiceImageryProvider({ // 调用影像中文注记服务
    url: TDT_CIA_W,
    layer: 'img',
    style: 'default',
    format: 'tiles',
    tileMatrixSetID: 'GoogleMapsCompatible',
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], // 天地图8个服务器
    minimumLevel: 0,
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(cia)
}

export function setInitCamera () {
  window.viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      111.21100987784337, 24.526202243995645, 56258.239797757094
    ),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-40),
      roll: Cesium.Math.toRadians(0) // heading、pitch和roll就是镜头相对于xyz轴的角度，比如pitch为-90°而另外两个为0时，就是90°向下俯视地球。
    }
  })
}

export function addWmsLayer (url, layers, styles) {
  let wms = new Cesium.WebMapServiceImageryProvider({ // 调用影像中文注记服务
    url: url, // 'http://10.10.10.44:8080/geoserver/flood/wms',
    layers: layers, // 'flood:筛选村2',
    styles: styles, // 'flood:筛选村2',
    tileWidth: 1024,
    tileHeight: 1024,
    parameters: {
      format: 'image/png',
      transparent: true
    }
  })
  window.viewer.imageryLayers.addImageryProvider(wms)
}

export function getCameraPosition () {
  var camera = window.viewer.scene.camera
  var position = camera.position
  console.log('当前相机位置：', position)
  // 这里可以执行你需要的代码
  var ellipsoid = window.viewer.scene.globe.ellipsoid
  var cameraCartographic = ellipsoid.cartesianToCartographic(position)
  var cameraLatitude = Cesium.Math.toDegrees(cameraCartographic.latitude)
  var cameraLongitude = Cesium.Math.toDegrees(cameraCartographic.longitude)
  var cameraHeight = cameraCartographic.height
  console.log(`Latitude: ${cameraLatitude}, Longitude: ${cameraLongitude}, Height: ${cameraHeight}`)
}


export function removeWaterSurface (waterPrimitives, simulate) {
  if (waterPrimitives.length !== 0) {
    if (simulate) {
      for (let i = 0; i < waterPrimitives.length; i++) {
        window.viewer.scene.primitives.remove(waterPrimitives[i])
      }
    } else {
      for (let i = 0; i < waterPrimitives.length; i++) {
        waterPrimitives[i].show = false
      }
    }
  }
}
