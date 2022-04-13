enum PrimitiveType {
  POINTS,
  LINES,
  LINE_LOOP,
  LINE_STRIP,
  TRIANGLES,
  TRIANGLE_STRIP,
  TRIANGLE_FAN
}

export default PrimitiveType

export const validate = (primitiveType: PrimitiveType) => {
  return (
    primitiveType === PrimitiveType.POINTS ||
    primitiveType === PrimitiveType.LINES ||
    primitiveType === PrimitiveType.LINE_LOOP ||
    primitiveType === PrimitiveType.LINE_STRIP ||
    primitiveType === PrimitiveType.TRIANGLES ||
    primitiveType === PrimitiveType.TRIANGLE_STRIP ||
    primitiveType === PrimitiveType.TRIANGLE_FAN
  )
}