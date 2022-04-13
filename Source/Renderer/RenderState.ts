
type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext

export type RenderStateOptions = {

}

class RenderState {
  constructor(renderState?: RenderStateOptions) {

  }

  static fromCache(renderState: RenderState) { }

  static removeFromCache(renderState: RenderState) { }

  static getCache() { }

  static clearCache() { }

  static apply(gl: WebGLContext, renderState: RenderState, passState) {

  }

  static partialApply(
    gl: WebGLContext,
    previousRenderState: RenderState,
    renderState: RenderState,
    previousPassState,
    passState,
    clear: boolean
  ) {

  }

  static getState(renderState: RenderState) {

  }
}

export default RenderState
