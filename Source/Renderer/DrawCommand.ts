import defaultValue from '../Core/defaultValue'
import BoundingSphere from '../Core/BoundingSphere'
import OrientedBoundingBox from '../Core/OrientedBoundingBox'
import Matrix4 from '../Core/Matrix4'
import PrimitiveType from '../Core/PrimitiveType'
import Primitive from '../Scene/Primitive'
import Context from './Context'
import Framebuffer from './Framebuffer'
import Pass from './Pass'
import PassState from './PassState'
import RenderState from './RenderState'
import ShaderProgram from './ShaderProgram'
import VertexArray from './VertexArray'

const Flags = {
  CULL: 1,
  OCCLUDE: 2,
  EXECUTE_IN_CLOSEST_FRUSTUM: 4,
  DEBUG_SHOW_BOUNDING_VOLUME: 8,
  CAST_SHADOWS: 16,
  RECEIVE_SHADOWS: 32,
  PICK_ONLY: 64,
  DEPTH_FOR_TRANSLUCENT_CLASSIFICATION: 128,
};

export type DrawCommandOptions = {
  boundingVolume: BoundingSphere,
  orientedBoundingBox: OrientedBoundingBox,
  modelMatrix: Matrix4,
  primitiveType: PrimitiveType,
  vertexArray: VertexArray,
  count: number,
  offset: number,
  instanceCount: number,
  shaderProgram: ShaderProgram,
  uniformMap: {},
  renderState: RenderState,
  framebuffer: Framebuffer,
  pass: Pass,
  owner: Primitive,
  pickId: string,
  cull: number,
  occlude: any,
  executeInClosestFrustum: boolean,
  debugShowBoundingVolume: boolean,
  castShadows: boolean,
  receiveShadows: boolean,
  pickOnly: boolean,
  depthForTranslucentClassification: boolean,
}

const hasFlag = (command: DrawCommand, flag: number) => {
  return (command._flags & flag) === flag;
}

const setFlag = (command: DrawCommand, flag: number, value: boolean) => {
  if (value) {
    command._flags |= flag;
  } else {
    command._flags &= ~flag;
  }
}

class DrawCommand {
  private _boundingVolume: BoundingSphere
  private _orientedBoundingBox: OrientedBoundingBox
  private _modelMatrix: Matrix4
  private _primitiveType: PrimitiveType
  private _vertexArray: VertexArray
  private _count: number
  private _offset: number
  private _instanceCount: number
  private _shaderProgram: ShaderProgram
  private _uniformMap: {}
  private _renderState: RenderState
  private _framebuffer: Framebuffer
  private _pass: Pass
  private _owner: Primitive
  private _debugOverlappingFrustums: number
  private _pickId: string
  
  private derivedCommands: {}
  
  public _flags: number
  public lastDirtyTime: number
  public dirty: boolean

  constructor(options?: DrawCommandOptions) {
    options = defaultValue(options, {})
    this._boundingVolume = options.boundingVolume
    this._orientedBoundingBox = options.orientedBoundingBox
    this._modelMatrix = options.modelMatrix
    this._primitiveType = defaultValue(
      options.primitiveType,
      PrimitiveType.TRIANGLES
    )
    this._vertexArray = options.vertexArray
    this._count = options.count
    this._offset = defaultValue(options.offset, 0)
    this._instanceCount = defaultValue(options.instanceCount, 0)
    this._shaderProgram = options.shaderProgram
    this._uniformMap = options.uniformMap
    this._renderState = options.renderState
    this._framebuffer = options.framebuffer
    this._pass = options.pass
    this._owner = options.owner
    this._debugOverlappingFrustums = 0
    this._pickId = options.pickId

    this._flags = 0;

    this.cull = defaultValue(options.cull, true)
    this.occlude = defaultValue(options.occlude, true)
    this.executeInClosestFrustum = defaultValue(
      options.executeInClosestFrustum,
      false
    )
    this.debugShowBoundingVolume = defaultValue(
      options.debugShowBoundingVolume,
      false
    )
    this.castShadows = defaultValue(options.castShadows, false)
    this.receiveShadows = defaultValue(options.receiveShadows, false)
    this.pickOnly = defaultValue(options.pickOnly, false)
    this.depthForTranslucentClassification = defaultValue(
      options.depthForTranslucentClassification,
      false
    )

    this.dirty = true
    this.lastDirtyTime = 0
    this.derivedCommands = {}
  }

  get boundingVolume() {
    return this._boundingVolume
  }
  set boundingVolume(value) {
    if (this._boundingVolume !== value) {
      this._boundingVolume = value
      this.dirty = true
    }
  }

  get orientedBoundingBox() {
    return this._orientedBoundingBox
  }
  set orientedBoundingBox(value) {
    if (this._orientedBoundingBox !== value) {
      this._orientedBoundingBox = value
      this.dirty = true
    }
  }

  get cull() {
    return hasFlag(this, Flags.CULL)
  }
  set cull(value) {
    if (hasFlag(this, Flags.CULL) !== value) {
      setFlag(this, Flags.CULL, value)
      this.dirty = true
    }
  }

  get occlude() {
    return hasFlag(this, Flags.OCCLUDE)
  }
  set occlude(value) {
    if (hasFlag(this, Flags.OCCLUDE) !== value) {
      setFlag(this, Flags.OCCLUDE, value)
      this.dirty = true
    }
  }

  get modelMatrix() {
    return this._modelMatrix
  }
  set modelMatrix(value) {
    if (this._modelMatrix !== value) {
      this._modelMatrix = value
      this.dirty = true
    }
  }

  get primitiveType() {
    return this._primitiveType
  }
  set primitiveType(value) {
    if (this._primitiveType !== value) {
      this._primitiveType = value
      this.dirty = true
    }
  }

  get vertexArray() {
    return this._vertexArray
  }
  set vertexArray(value) {
    if (this._vertexArray !== value) {
      this._vertexArray = value
      this.dirty = true
    }
  }

  get count() {
    return this._count
  }
  set count(value) {
    if (this._count !== value) {
      this._count = value
      this.dirty = true
    }
  }

  get offset() {
    return this._offset
  }
  set offset(value) {
    if (this._offset !== value) {
      this._offset = value
      this.dirty = true
    }
  }

  get instanceCount() {
    return this._instanceCount
  }
  set instanceCount(value) {
    if (this._instanceCount !== value) {
      this._instanceCount = value
      this.dirty = true
    }
  }

  get shaderProgram() {
    return this._shaderProgram
  }
  set shaderProgram(value) {
    if (this._shaderProgram !== value) {
      this._shaderProgram = value
      this.dirty = true
    }
  }

  get castShadows() {
    return hasFlag(this, Flags.CAST_SHADOWS)
  }
  set castShadows(value) {
    if (hasFlag(this, Flags.CAST_SHADOWS) !== value) {
      setFlag(this, Flags.CAST_SHADOWS, value)
      this.dirty = true
    }
  }

  get receiveShadows() {
    return hasFlag(this, Flags.RECEIVE_SHADOWS)
  }
  set receiveShadows(value) {
    if (hasFlag(this, Flags.RECEIVE_SHADOWS) !== value) {
      setFlag(this, Flags.RECEIVE_SHADOWS, value)
      this.dirty = true
    }
  }

  get uniformMap() {
    return this._uniformMap
  }
  set uniformMap(value) {
    if (this._uniformMap !== value) {
      this._uniformMap = value
      this.dirty = true
    }
  }

  get renderState() {
    return this._renderState
  }
  set renderState(value) {
    if (this._renderState !== value) {
      this._renderState = value
      this.dirty = true
    }
  }

  get framebuffer() {
    return this._framebuffer
  }
  set framebuffer(value) {
    if (this._framebuffer !== value) {
      this._framebuffer = value
      this.dirty = true
    }
  }

  get pass() {
    return this._pass
  }
  set pass(value) {
    if (this._pass !== value) {
      this._pass = value
      this.dirty = true
    }
  }

  get executeInClosestFrustum() {
    return hasFlag(this, Flags.EXECUTE_IN_CLOSEST_FRUSTUM)
  }
  set executeInClosestFrustum(value) {
    if (hasFlag(this, Flags.EXECUTE_IN_CLOSEST_FRUSTUM) !== value) {
      setFlag(this, Flags.EXECUTE_IN_CLOSEST_FRUSTUM, value)
      this.dirty = true
    }
  }

  get owner() {
    return this._owner
  }
  set owner(value) {
    if (this._owner !== value) {
      this._owner = value
      this.dirty = true
    }
  }

  get debugShowBoundingVolume() {
    return hasFlag(this, Flags.DEBUG_SHOW_BOUNDING_VOLUME)
  }
  set debugShowBoundingVolume(value) {
    if (hasFlag(this, Flags.DEBUG_SHOW_BOUNDING_VOLUME) !== value) {
      setFlag(this, Flags.DEBUG_SHOW_BOUNDING_VOLUME, value)
      this.dirty = true
    }
  }

  get debugOverlappingFrustums() {
    return this._debugOverlappingFrustums
  }
  set debugOverlappingFrustums(value) {
    if (this._debugOverlappingFrustums !== value) {
      this._debugOverlappingFrustums = value
      this.dirty = true
    }
  }

  get pickId() {
    return this._pickId
  }
  set pickId(value) {
    if (this._pickId !== value) {
      this._pickId = value
      this.dirty = true
    }
  }

  get pickOnly() {
    return hasFlag(this, Flags.PICK_ONLY)
  }
  set pickOnly(value) {
    if (hasFlag(this, Flags.PICK_ONLY) !== value) {
      setFlag(this, Flags.PICK_ONLY, value)
      this.dirty = true
    }
  }

  get depthForTranslucentClassification() {
    return hasFlag(this, Flags.DEPTH_FOR_TRANSLUCENT_CLASSIFICATION)
  }
  set depthForTranslucentClassification(value) {
    if (hasFlag(this, Flags.DEPTH_FOR_TRANSLUCENT_CLASSIFICATION) !== value) {
      setFlag(this, Flags.DEPTH_FOR_TRANSLUCENT_CLASSIFICATION, value)
      this.dirty = true
    }
  }

  /**
   * Executes the draw command.
   * 
   * @param context The renderer context in which to draw.
   * @param passState The state for the current render pass.
   */
  execute(context: Context, passState?: PassState) {
    context.draw(this, passState)
  }

  static shallowClone(command?: DrawCommand, result?: DrawCommand) {
    if (result === undefined || result === null) {
      result = new DrawCommand()
    }

    result._boundingVolume = command._boundingVolume
    result._orientedBoundingBox = command._orientedBoundingBox
    result._modelMatrix = command._modelMatrix
    result._primitiveType = command._primitiveType
    result._vertexArray = command._vertexArray
    result._count = command._count
    result._offset = command._offset
    result._instanceCount = command._instanceCount
    result._shaderProgram = command._shaderProgram
    result._uniformMap = command._uniformMap
    result._renderState = command._renderState
    result._framebuffer = command._framebuffer
    result._pass = command._pass
    result._owner = command._owner
    result._debugOverlappingFrustums = command._debugOverlappingFrustums
    result._pickId = command._pickId
    result._flags = command._flags

    result.dirty = true
    result.lastDirtyTime = 0

    return result
  }
}

export default DrawCommand
