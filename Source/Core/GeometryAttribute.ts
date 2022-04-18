import ComponentDatatype from './ComponentDatatype'
import defaultValue from './defaultValue'
import defined from './defined'
import DeveloperError from './DeveloperError'

type ValueType = number[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array

export type GeometryAttributeOptions = {
  componentDatatype: ComponentDatatype
  componentsPerAttribute: number
  normalize?: boolean
  values: ValueType
}

class GeometryAttribute {

  public componentDatatype: ComponentDatatype
  public componentsPerAttribute: number
  public normalize: boolean
  public values: ValueType

  constructor(options: GeometryAttributeOptions) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT)
    if (
      options.componentsPerAttribute < 1 ||
      options.componentsPerAttribute > 4
    ) {
      throw new DeveloperError(
        'options.componentsPerAttribute must be between 1 and 4.'
      )
    }

    this.componentDatatype = options.componentDatatype
    this.componentsPerAttribute = options.componentsPerAttribute
    this.normalize = defaultValue(options.normalize, false)
    this.values = options.values
  }
}

export default GeometryAttribute;

