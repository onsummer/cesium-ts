import defaultValue from './defaultValue'
import defined from './defined'

export type VertexFormatOptions = {
  position?: boolean
  normal?: boolean
  st?: boolean
  bitangent?: boolean
  tangent?: boolean
  color?: boolean
}

class VertexFormat {
  public position: boolean
  public normal: boolean
  public st: boolean
  public bitangent: boolean
  public tangent: boolean
  public color: boolean

  constructor(options?: VertexFormatOptions) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT)

    this.position = defaultValue(options.position, false)
    this.normal = defaultValue(options.normal, false)
    this.st = defaultValue(options.st, false)
    this.bitangent = defaultValue(options.bitangent, false)
    this.tangent = defaultValue(options.tangent, false)
    this.color = defaultValue(options.color, false)
  }

  static readonly packedLength = 6

  
  static readonly POSITION_NORMAL_AND_ST = new VertexFormat({
    position: true,
    normal: true,
    st: true,
  })
  
  static readonly DEFAULT = VertexFormat.POSITION_NORMAL_AND_ST

  static unpack(array: number[], startingIndex: number = 0, result?: VertexFormat) {
    startingIndex = defaultValue(startingIndex, 0)

    if (!defined(result)) {
      result = new VertexFormat()
    }

    result.position = array[startingIndex++] === 1.0
    result.normal = array[startingIndex++] === 1.0
    result.st = array[startingIndex++] === 1.0
    result.tangent = array[startingIndex++] === 1.0
    result.bitangent = array[startingIndex++] === 1.0
    result.color = array[startingIndex] === 1.0
    return result
  }

  static clone(vertexFormat: VertexFormat, result?: VertexFormat) {
    if (!defined(vertexFormat)) {
      return undefined
    }
    if (!defined(result)) {
      result = new VertexFormat()
    }

    result.position = vertexFormat.position
    result.normal = vertexFormat.normal
    result.st = vertexFormat.st
    result.tangent = vertexFormat.tangent
    result.bitangent = vertexFormat.bitangent
    result.color = vertexFormat.color
    return result;
  }
}

export default VertexFormat
