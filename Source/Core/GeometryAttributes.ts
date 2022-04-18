import defaultValue from './defaultValue'
import GeometryAttribute from './GeometryAttribute'

export type GeometryAttributesOptions = {
  position?: GeometryAttribute
  normal?: GeometryAttribute
  st?: GeometryAttribute
  bitangent?: GeometryAttribute
  tangent?: GeometryAttribute
  color?: GeometryAttribute
}

class GeometryAttributes {
  public position?: GeometryAttribute
  public normal?: GeometryAttribute
  public st?: GeometryAttribute
  public bitangent?: GeometryAttribute
  public tangent?: GeometryAttribute
  public color?: GeometryAttribute

  public applyOffset?: GeometryAttribute
  
  constructor(options?: GeometryAttributesOptions) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT)

    this.position = options.position;
    this.normal = options.normal;
    this.st = options.st;
    this.bitangent = options.bitangent;
    this.tangent = options.tangent;
    this.color = options.color;
  }
}

export default GeometryAttributes
