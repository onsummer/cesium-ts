import BoundingSphere from './BoundingSphere'
import defaultValue from './defaultValue'
import GeometryAttributes from './GeometryAttributes'
import GeometryType from './GeometryType'
import PrimitiveType from './PrimitiveType'

export type GeometryOptions = {
  attributes: GeometryAttributes
  indices?: Uint16Array | Uint32Array
  primitiveType?: PrimitiveType
  boundingSphere?: BoundingSphere
  geometryType?: GeometryType
  boundingSphereCV?: any
  offsetAttribute?: any
}

class Geometry {
  public attributes: GeometryAttributes
  public indices?: Uint16Array | Uint32Array
  public primitiveType?: PrimitiveType
  public boundingSphere?: BoundingSphere
  public geometryType?: GeometryType
  public boundingSphereCV?: any
  public offsetAttribute?: any

  constructor(options: GeometryOptions) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT)

    this.attributes = options.attributes
    this.indices = options.indices
    this.primitiveType = defaultValue(
      options.primitiveType,
      PrimitiveType.TRIANGLES
    )
    this.boundingSphere = options.boundingSphere
    this.geometryType = defaultValue(options.geometryType, GeometryType.NONE)
    this.boundingSphereCV = options.boundingSphereCV
    this.offsetAttribute = options.offsetAttribute
  }
}

export default Geometry
