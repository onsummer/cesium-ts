import defined from './defined'

class DeveloperError {

  readonly name: string
  readonly message: string
  readonly stack: string

  constructor(message?: string) {
    this.name = 'DeveloperError'
    this.message = message

    let stack: string;
    try {
      throw new Error()
    } catch (e) {
      stack = e.stack
    }

    this.stack = stack
  }

  toString() {
    let str = `${this.name}: ${this.message}`
    
    if (defined(this.stack)) {
      str += "\n" + this.stack.toString()
    }

    return str
  }

  static throwInstantiationError() {
    throw new DeveloperError(
      "This function defines an interface and should not be called directly."
    )
  }
}

if (defined(Object.create)) {
  DeveloperError.prototype = Object.create(Error.prototype)
  DeveloperError.prototype.constructor = DeveloperError
}

export default DeveloperError
