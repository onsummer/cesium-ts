import BoundingSphere from '../Core/BoundingSphere'
import Cartesian3 from '../Core/Cartesian3'
import Matrix4 from '../Core/Matrix4'

enum LoadState {
  NEEDS_LOAD = 0,
  LOADING = 1,
  LOADED = 2,
  FAILED = 3,
}

const scratchCartesian = new Cartesian3()
const scratchMatrix = new Matrix4()

class ModelInstanceCollection {
  public _model
  public _dirty: boolean

  private _boundingSphere: BoundingSphere

  expandBoundingSphere(instanceModelMatrix: Matrix4) {
    const translation = Matrix4.getTranslation(
      instanceModelMatrix,
      scratchCartesian
    )
    BoundingSphere.expand(
      this._boundingSphere,
      translation,
      this._boundingSphere
    )
  }
}

export default ModelInstanceCollection
