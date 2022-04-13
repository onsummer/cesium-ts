import BoundingRectangle from '../Core/BoundingRectangle'
import Context from './Context'
import Framebuffer from './Framebuffer'

class PassState {
  context: Context
  framebuffer?: Framebuffer
  blendingEnabled: boolean
  scissorTest?: {}
  viewport?: BoundingRectangle

  constructor(context: Context) {
    this.context = context
    this.framebuffer = undefined
    this.blendingEnabled = undefined
    this.scissorTest = undefined
    this.viewport = undefined
  }
}

export default PassState
