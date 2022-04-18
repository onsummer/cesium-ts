enum BoundingSphereState {
  /**
   * The BoundingSphere has been computed.
   * @type BoundingSphereState
   * @constant
   */
  DONE = 0,
  /**
   * The BoundingSphere is still being computed.
   * @type BoundingSphereState
   * @constant
   */
  PENDING = 1,
  /**
   * The BoundingSphere does not exist.
   * @type BoundingSphereState
   * @constant
   */
  FAILED = 2,
}

export default BoundingSphereState