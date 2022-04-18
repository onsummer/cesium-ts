enum VerticalOrigin {
  /**
   * The origin is at the vertical center between <code>BASELINE</code> and <code>TOP</code>.
   *
   * @type {Number}
   * @constant
   */
  CENTER = 0,

  /**
   * The origin is at the bottom of the object.
   *
   * @type {Number}
   * @constant
   */
  BOTTOM = 1,

  /**
   * If the object contains text, the origin is at the baseline of the text, else the origin is at the bottom of the object.
   *
   * @type {Number}
   * @constant
   */
  BASELINE = 2,

  /**
   * The origin is at the top of the object.
   *
   * @type {Number}
   * @constant
   */
  TOP = -1,
}

export default VerticalOrigin
