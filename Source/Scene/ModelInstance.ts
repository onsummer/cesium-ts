import Matrix4 from '../Core/Matrix4'
import ModelInstanceCollection from './ModelInstanceCollection'

class ModelInstance {
  private primitive: ModelInstanceCollection

  private _modelMatrix: Matrix4
  private _instanceId: number

  constructor(
    collection: ModelInstanceCollection,
    modelMatrix: Matrix4,
    instanceId: number
  ) {
    this.primitive = collection
    this._modelMatrix = Matrix4.clone(modelMatrix)
    this._instanceId = instanceId
  }
  get instanceId() {
    return this._instanceId
  }

  get model() {
    return this.primitive._model
  }

  get modelMatrix() {
    return Matrix4.clone(this._modelMatrix)
  }
  set modelMatrix(value) {
    Matrix4.clone(value, this._modelMatrix)
    this.primitive.expandBoundingSphere(this._modelMatrix)
    this.primitive._dirty = true
  }
}

export default ModelInstance
