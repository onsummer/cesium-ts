import defaultValue from './defaultValue'
import defined from './defined'
import DeveloperError from './DeveloperError'
import CesiumMath from './Math'

class Cartesian3 {
  public x: number
  public y: number
  public z: number

  constructor(
    x: number = 0,
    y: number = 0,
    z: number = 0
  ) {
    this.x = x
    this.y = y
    this.z = z
  }

  clone(source: Cartesian3, result: Cartesian3) {
    if (!defined(source)) {
      return undefined
    }
    if (!defined(result)) {
      return new Cartesian3(source.x, source.y, source.z)
    }

    result.x = source.x
    result.y = source.y
    result.z = source.z
    return result
  }

  equals(right: Cartesian3) {
    return Cartesian3.equals(this, right)
  }

  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  static add(left: Cartesian3, right: Cartesian3, result: Cartesian3) {
    result.x = left.x + right.x
    result.y = left.y + right.y
    result.z = left.z + right.z
    return result
  }

  static equals(left: Cartesian3, right: Cartesian3) {
    return (
      left === right ||
      (defined(left) &&
        defined(right) &&
        left.x === right.x &&
        left.y === right.y &&
        left.z === right.z)
    )
  }

  static projectVector(a: Cartesian3, b: Cartesian3, result?: Cartesian3) {
    const scalar = Cartesian3.dot(a, b) / Cartesian3.dot(b, b)
    return Cartesian3.multiplyByScalar(b, scalar, result)
  }

  static dot(left: Cartesian3, right: Cartesian3) {
    return left.x * right.x + left.y * right.y + left.z * right.z
  }

  static clone(source: Cartesian3, result?: Cartesian3) {
    if (!defined(source)) {
      return undefined
    }
    if (!defined(result)) {
      return new Cartesian3(source.x, source.y, source.z)
    }

    result.x = source.x
    result.y = source.y
    result.z = source.z
    return result
  }

  static multiplyByScalar(source: Cartesian3, scalar: number, result?: Cartesian3) {
    result.x = source.x * scalar
    result.y = source.y * scalar
    result.z = source.z * scalar
    return result
  }

  static magnitude(cartesian: Cartesian3) {
    return Math.sqrt(Cartesian3.magnitudeSquared(cartesian))
  }

  static magnitudeSquared(cartesian: Cartesian3) {
    return (
      cartesian.x * cartesian.x +
      cartesian.y * cartesian.y +
      cartesian.z * cartesian.z
    )
  }

  static normailze(source: Cartesian3, result: Cartesian3) {
    const magnitude = Cartesian3.magnitude(source);

    result.x = source.x / magnitude;
    result.y = source.y / magnitude;
    result.z = source.z / magnitude;

    //>>includeStart('debug', pragmas.debug);
    if (isNaN(result.x) || isNaN(result.y) || isNaN(result.z)) {
      throw new DeveloperError("normalized result is not a number")
    }
    //>>includeEnd('debug');

    return result;
  }

  static subtract(left: Cartesian3, right: Cartesian3, result: Cartesian3) {
    result.x = left.x - right.x
    result.y = left.y - right.y
    result.z = left.z - right.z
    return result
  }

  static unpack(array: number[], startingIndex: number = 0, result?: Cartesian3) {
    startingIndex = defaultValue(startingIndex, 0);

    if (!defined(result)) {
      result = new Cartesian3()
    }
    result.x = array[startingIndex++]
    result.y = array[startingIndex++]
    result.z = array[startingIndex]
    return result
  }

  static readonly packedLength = 3

  static readonly ZERO = new Cartesian3(0.0, 0.0, 0.0)

  static readonly ONE = new Cartesian3(1.0, 1.0, 1.0)

  static readonly UNIT_X = new Cartesian3(1.0, 0.0, 0.0)

  static readonly UNIT_Y = new Cartesian3(0.0, 1.0, 0.0)

  static readonly UNIT_Z = new Cartesian3(0.0, 0.0, 1.0)
}

export default Cartesian3
