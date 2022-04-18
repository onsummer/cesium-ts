import defaultValue from './defaultValue'
import defined from './defined'

const hue2rgb = (m1: number, m2: number, h: number) => {
  if (h < 0) {
    h += 1
  }
  if (h > 1) {
    h -= 1
  }
  if (h * 6 < 1) {
    return m1 + (m2 - m1) * 6 * h
  }
  if (h * 2 < 1) {
    return m2
  }
  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6
  }
  return m1
}

//#rgba
const rgbaMatcher = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i
//#rrggbbaa
const rrggbbaaMatcher = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i
//rgb(), rgba(), or rgb%()
const rgbParenthesesMatcher = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i
//hsl() or hsla()
const hslParenthesesMatcher = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i

class Color {
  public red: number
  public green: number
  public blue: number
  public alpha: number

  constructor(red = 1, green = 1, blue = 1, alpha = 1) {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  static fromHsl(
    hue = 0,
    saturation = 0,
    lightness = 0,
    alpha = 1,
    result?: Color
  ) {
    hue = hue % 1
    let red = lightness
    let green = lightness
    let blue = lightness

    if (saturation !== 0) {
      let m2: number
      if (lightness < 0.5) {
        m2 = lightness * (1 + saturation)
      } else {
        m2 = lightness + saturation - lightness * saturation
      }

      const m1 = 2.0 * lightness - m2
      red = hue2rgb(m1, m2, hue + 1 / 3)
      green = hue2rgb(m1, m2, hue)
      blue = hue2rgb(m1, m2, hue - 1 / 3)
    }

    if (!defined(result)) {
      return new Color(red, green, blue, alpha)
    }

    result.red = red
    result.green = green
    result.blue = blue
    result.alpha = alpha
    return result
  }

  static clone(color: Color, result?: Color) {
    if (!defined(color)) {
      return undefined
    }
    if (!defined(result)) {
      return new Color(color.red, color.green, color.blue, color.alpha)
    }
    result.red = color.red
    result.green = color.green
    result.blue = color.blue
    result.alpha = color.alpha
    return result
  }

  static fromCssColorString(color: string, result?: Color) {
    if (!defined(result)) {
      result = new Color()
    }

    color = color.replace(/\s/g, '')
    const namedColor = Color[color.toUpperCase()]

    if (defined(namedColor)) {
      Color.clone(namedColor, result);
      return result;
    }

    let matches = rgbaMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 15;
      result.green = parseInt(matches[2], 16) / 15.0;
      result.blue = parseInt(matches[3], 16) / 15.0;
      result.alpha = parseInt(defaultValue(matches[4], "f"), 16) / 15.0;
      return result;
    }

    matches = rrggbbaaMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 255.0;
      result.green = parseInt(matches[2], 16) / 255.0;
      result.blue = parseInt(matches[3], 16) / 255.0;
      result.alpha = parseInt(defaultValue(matches[4], "ff"), 16) / 255.0;
      return result;
    }

    matches = rgbParenthesesMatcher.exec(color);
    if (matches !== null) {
      result.red =
        parseFloat(matches[1]) / ("%" === matches[1].substr(-1) ? 100.0 : 255.0);
      result.green =
        parseFloat(matches[2]) / ("%" === matches[2].substr(-1) ? 100.0 : 255.0);
      result.blue =
        parseFloat(matches[3]) / ("%" === matches[3].substr(-1) ? 100.0 : 255.0);
      result.alpha = parseFloat(defaultValue(matches[4], "1.0"));
      return result;
    }

    matches = hslParenthesesMatcher.exec(color);
    if (matches !== null) {
      return Color.fromHsl(
        parseFloat(matches[1]) / 360.0,
        parseFloat(matches[2]) / 100.0,
        parseFloat(matches[3]) / 100.0,
        parseFloat(defaultValue(matches[4], "1.0")),
        result
      );
    }

    result = undefined;
    return result
  }

  static WHITE = Object.freeze(Color.fromCssColorString("#FFFFFF"))
}

export default Color
