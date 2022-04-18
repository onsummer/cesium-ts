import Color from '../Core/Color'
import defaultValue from '../Core/defaultValue'

type SunLightOptions = {
  color: Color;
  intensity: number;
}

class SunLight {
  /**
   * The color of the light.
   * @type {Color}
   * @default Color.WHITE
   */
  public color: Color
  /**
   * The intensity of the light.
   * @type {Number}
   * @default 2.0
   */
  public intensity: number

  constructor(options: SunLightOptions) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT)

    this.color = Color.clone(defaultValue(options.color, Color.WHITE))
    this.intensity = defaultValue(options.intensity, 2.0)
  }
}

export default SunLight
