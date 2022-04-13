import defined from './defined'

class RuntimeError {
  
  readonly name: string
  readonly message: string
  readonly stack: string

  constructor(message: string) {
    this.name = "RuntimeError"
    this.message = message

    let stack: string;
    try {
      throw new Error()
    } catch (e) {
      stack = e.stack;
    }
    this.stack = stack
  }

  toString() {
    let str = `${this.name}: ${this.message}`

    if (defined(this.stack)) {
      str += "\n" +this.stack.toString()
    }

    return str
  }
}

export default RuntimeError