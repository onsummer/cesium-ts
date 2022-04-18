enum ShadowMode {
  /**
   * The object does not cast or receive shadows.
   *
   * @type {Number}
   * @constant
   */
  DISABLED = 0,

  /**
   * The object casts and receives shadows.
   *
   * @type {Number}
   * @constant
   */
  ENABLED = 1,

  /**
   * The object casts shadows only.
   *
   * @type {Number}
   * @constant
   */
  CAST_ONLY = 2,

  /**
   * The object receives shadows only.
   *
   * @type {Number}
   * @constant
   */
  RECEIVE_ONLY = 3,
}

export const NUMBER_OF_SHADOW_MODES = 4

export const castShadows = (shadowMode: ShadowMode) => {
  return (
    shadowMode === ShadowMode.ENABLED || shadowMode === ShadowMode.CAST_ONLY
  )
}

export const receiveShadows = (shadowMode: ShadowMode) => {
  return (
    shadowMode === ShadowMode.ENABLED || shadowMode === ShadowMode.RECEIVE_ONLY
  )
}

export const fromCastReceive = (castShadows: boolean, receiveShadows: boolean) => {
  if (castShadows && receiveShadows) {
    return ShadowMode.ENABLED;
  } else if (castShadows) {
    return ShadowMode.CAST_ONLY;
  } else if (receiveShadows) {
    return ShadowMode.RECEIVE_ONLY;
  }
  return ShadowMode.DISABLED;
}

export default ShadowMode
