enum Tonemapper {
  /**
   * Use the Reinhard tonemapping operator.
   *
   * @type {Number}
   * @constant
   */
  REINHARD = 0,

  /**
   * Use the modified Reinhard tonemapping operator.
   *
   * @type {Number}
   * @constant
   */
  MODIFIED_REINHARD = 1,

  /**
   * Use the Filmic tonemapping operator.
   *
   * @type {Number}
   * @constant
   */
  FILMIC = 2,

  /**
   * Use the ACES tonemapping operator.
   *
   * @type {Number}
   * @constant
   */
  ACES = 3,
}

export const validate = (tonemapper: Tonemapper) => {
  return (
    tonemapper === Tonemapper.REINHARD ||
    tonemapper === Tonemapper.MODIFIED_REINHARD ||
    tonemapper === Tonemapper.FILMIC ||
    tonemapper === Tonemapper.ACES
  )
}

export default Tonemapper 
