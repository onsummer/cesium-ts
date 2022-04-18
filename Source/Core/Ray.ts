import Cartesian3 from './Cartesian3'
import defined from './defined'
import defaultValue from './defaultValue'

class Ray {
  public origin: Cartesian3
  public direction: Cartesian3

  constructor(
    origin: Cartesian3,
    direction: Cartesian3
  ) {
    direction = Cartesian3.clone(defaultValue(direction, Cartesian3.ZERO))
    if (!Cartesian3.equals(direction, Cartesian3.ZERO)) {
      Cartesian3.normailze(direction, direction)
    }

    this.origin = Cartesian3.clone(defaultValue(origin, Cartesian3.ZERO))
    
    this.direction = direction
  }

  clone(ray: Ray, result?: Ray) {
    if (!defined(ray)) {
      return undefined
    }
    if (!defined(result)) {
      return new Ray(ray.origin, ray.direction)
    }
    result.origin = Cartesian3.clone(ray.origin)
    result.direction = Cartesian3.clone(ray.direction)
    return result
  }

  getPoint(ray: Ray, t: number, result: Cartesian3) {
    if (!defined(result)) {
      result = new Cartesian3()
    }

    result = Cartesian3.multiplyByScalar(ray.direction, t, result)
    return Cartesian3.add(ray.origin, result, result)
  }
}

export default Ray
