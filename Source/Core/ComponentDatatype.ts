import WebGLConstants from './WebGLConstants'

enum ComponentDatatype {
  /**
   * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
   * of an element in <code>Int8Array</code>.
   *
   * @type {Number}
   * @constant
   */
  BYTE = WebGLConstants.BYTE,

  /**
   * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
   * of an element in <code>Uint8Array</code>.
   *
   * @type {Number}
   * @constant
   */
  UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,

  /**
   * 16-bit signed short corresponding to <code>SHORT</code> and the type
   * of an element in <code>Int16Array</code>.
   *
   * @type {Number}
   * @constant
   */
  SHORT = WebGLConstants.SHORT,

  /**
   * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
   * of an element in <code>Uint16Array</code>.
   *
   * @type {Number}
   * @constant
   */
  UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,

  /**
   * 32-bit signed int corresponding to <code>INT</code> and the type
   * of an element in <code>Int32Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {Number}
   * @constant
   */
  INT = WebGLConstants.INT,

  /**
   * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
   * of an element in <code>Uint32Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {Number}
   * @constant
   */
  UNSIGNED_INT = WebGLConstants.UNSIGNED_INT,

  /**
   * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
   * of an element in <code>Float32Array</code>.
   *
   * @type {Number}
   * @constant
   */
  FLOAT = WebGLConstants.FLOAT,

  /**
   * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL =
   * this is not supported in WebGL, and is emulated in Cesium via {@link GeometryPipeline.encodeAttribute})
   * and the type of an element in <code>Float64Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {Number}
   * @constant
   * @default 0x140A
   */
  DOUBLE = WebGLConstants.DOUBLE,
}

export default ComponentDatatype
