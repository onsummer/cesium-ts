import Cartesian3 from './Cartesian3'
import defined from './defined'

const expandScratch = new Cartesian3()

class BoundingSphere {

  public center: Cartesian3
  public radius: number

  constructor(center: Cartesian3 = Cartesian3.ZERO, radius: number = 0) {
    this.center = Cartesian3.clone(center, Cartesian3.ZERO)
    this.radius = radius
  }

  static clone(sphere: BoundingSphere, result?: BoundingSphere) {
    if (!defined(sphere)) {
      return undefined
    }

    if (!defined(result)) {
      return new BoundingSphere(sphere.center, sphere.radius)
    }

    result.center = Cartesian3.clone(sphere.center, result.center)
    result.radius = sphere.radius
    return result
  }

  static expand(sphere: BoundingSphere, point: Cartesian3, result: BoundingSphere) {
    result = BoundingSphere.clone(sphere, result)

    const radius = Cartesian3.magnitude(
      Cartesian3.subtract(point, result.center, expandScratch)
    )
    if (radius > result.radius) {
      result.radius = radius
    }

    return result
  }
}

export default BoundingSphere
