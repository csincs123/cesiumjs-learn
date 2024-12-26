import * as Cesium from "cesium"

export async function drawTIN(viewer, pointTxtSrc, pointIndexSrc, geometryColor) {
  const coord64 = await readPointTxt(pointTxtSrc)
  console.log('coord64', coord64)
  const index16 = await readPointIndexTxt(pointIndexSrc)

  // 创建GeometryInstance
  const geometry = new Cesium.Geometry({
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    attributes: {
      position: new Cesium.GeometryAttribute({
        componentDatatype: Cesium.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        // normalize: false,
        values: new Float64Array(coord64.flat())
      })
    },
    indices: new Uint16Array(index16),
    primitiveType: Cesium.PrimitiveType.TRIANGLES,
    boundingSphere: Cesium.BoundingSphere.fromVertices(coord64.flat())
  })
  const instance = new Cesium.GeometryInstance({
    geometry: geometry,
    attributes: {
      // color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE.withAlpha(0.5)), // 半透明红色
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(geometryColor) // 半透明红色), // 半透明红色
    }
    // geometry: Cesium.GeometryPipeline.toWireframe(geometry)
  })

  // 创建Primitive并添加到场景中
  const primitive = new Cesium.Primitive({
    geometryInstances: instance,
    asynchronous: false,
    releaseGeometryInstances: false,
    compressVertices: false,
    appearance: new Cesium.PerInstanceColorAppearance({
      translucent: true,
      flat: true
    })
  })
  viewer.scene.primitives.add(primitive)

  const geometry1 = new Cesium.Geometry({
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    attributes: {
      position: new Cesium.GeometryAttribute({
        componentDatatype: Cesium.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        // normalize: false,
        values: new Float64Array(coord64.flat())
      })
      // color: new Cesium.GeometryAttribute({
      //     componentDatatype: Cesium.ComponentDatatype.FLOAT,
      //     componentsPerAttribute: 4,
      //     values: index16
      // })
    },
    indices: new Uint16Array(index16),
    primitiveType: Cesium.PrimitiveType.TRIANGLES,
    boundingSphere: Cesium.BoundingSphere.fromVertices(coord64.flat())
  })
  const instance1 = new Cesium.GeometryInstance({
    // geometry: geometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(geometryColor) // 半透明红色
    },
    geometry: Cesium.GeometryPipeline.toWireframe(geometry1)
  })

  // 创建Primitive并添加到场景中
  const primitive1 = new Cesium.Primitive({
    geometryInstances: instance1,
    asynchronous: false,
    releaseGeometryInstances: false,
    compressVertices: false,
    appearance: new Cesium.PerInstanceColorAppearance({
      translucent: true,
      flat: true
    })
  })
  viewer.scene.primitives.add(primitive1)

  return { primitive, primitive1 }
}

async function readPointTxt(url) {
  const response = await fetch(url)
  const text = await response.text()
  console.log('Pointtext', text)
  // 将每行数据拆分为数组
  const lines = text.trim().split("\n")
  const coords_world = lines.map((line) => {
    const cart = Cesium.Cartesian3.fromDegrees(...line.split(",").map(Number))
    return [cart.x, cart.y, cart.z]
  })
  // const values = lines.flatMap(line => line.split(',').map(Number));

  // const coords_world = coords.map((coord) => {
  //     const cart = Cesium.Cartesian3.fromDegrees(...coord)
  //     return [cart.x, cart.y, cart.z]
  // })
  return coords_world
}

async function readPointIndexTxt(url) {
  const response = await fetch(url)
  const text = await response.text()
  console.log('Indextext', text)
  // 将每行数据拆分为数组
  const lines = text.trim().split("\n")
  const values = lines.flatMap((line) => line.split(",").map(Number))
  return new Uint16Array(values)
}
