import defaultValue from './defaultValue'
import defined from './defined'

type TypedArray = Float32Array | Float64Array | 
Uint16Array | Uint32Array | Uint8Array | 
Int16Array | Int8Array | Int32Array

const arrayFill = (array: any[] | TypedArray, value: any, start: number = 0, end?: number) => {
  if (typeof array.fill === "function") {
    return array.fill(value, start, end)
  }

  const length = array.length >>> 0
  const relativeStart = start
  // If negative, find wrap around position
  let k =
    relativeStart < 0
      ? Math.max(length + relativeStart, 0)
      : Math.min(relativeStart, length)
  const relativeEnd = defaultValue(end, length)
  // If negative, find wrap around position
  const last =
    relativeEnd < 0
      ? Math.max(length + relativeEnd, 0)
      : Math.min(relativeEnd, length)

  // Fill array accordingly
  while (k < last) {
    array[k] = value
    k++
  }
  return array
}

export default arrayFill
