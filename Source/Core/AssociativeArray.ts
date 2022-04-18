import defined from './defined'
import DeveloperError from './DeveloperError'

class AssociativeArray {

  private _array: any[]
  private _hash: {}

  constructor() {
    this._array = []
    this._hash = {}
  }

  get length() {
    return this._array.length
  }

  get values() {
    return this._array
  }

  contains(key: string | number) {
    //>>includeStart('debug', pragmas.debug);
    if (typeof key !== "string" && typeof key !== "number") {
      throw new DeveloperError("key is required to be a string or number.");
    }
    //>>includeEnd('debug');
    return defined(this._hash[key])
  }

  set(key: string | number, value: any) {
    //>>includeStart('debug', pragmas.debug);
    if (typeof key !== "string" && typeof key !== "number") {
      throw new DeveloperError("key is required to be a string or number.")
    }
    //>>includeEnd('debug');

    const oldValue = this._hash[key]
    if (value !== oldValue) {
      this.remove(key)
      this._hash[key] = value
      this._array.push(value)
    }
  }

  get(key: string | number) {
    //>>includeStart('debug', pragmas.debug);
    if (typeof key !== "string" && typeof key !== "number") {
      throw new DeveloperError("key is required to be a string or number.")
    }
    //>>includeEnd('debug');
    return this._hash[key]
  }

  remove(key: string | number) {
    //>>includeStart('debug', pragmas.debug);
    if (defined(key) && typeof key !== "string" && typeof key !== "number") {
      throw new DeveloperError("key is required to be a string or number.")
    }
    //>>includeEnd('debug');

    const value = this._hash[key]
    const hasValue = defined(value)
    if (hasValue) {
      const array = this._array
      array.splice(array.indexOf(value), 1)
      delete this._hash[key]
    }
    return hasValue
  }

  removeAll() {
    const array = this._array
    if (array.length > 0) {
      this._hash = {}
      array.length = 0
    }
  }
}

export default AssociativeArray
