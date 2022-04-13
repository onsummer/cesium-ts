const defaultValue = (a: any, b: any) => {
  if (a !== undefined && a !== null) {
    return a
  }
  return b
}

defaultValue.EMPTY_OBJECT = Object.freeze({})

export default defaultValue