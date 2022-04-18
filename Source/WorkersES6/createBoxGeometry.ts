import BoxGeometry from '../Core/BoxGeometry'

export default (boxGeometry: number[] | BoxGeometry, offset?: number) => {
  if (boxGeometry instanceof BoxGeometry) {
    return BoxGeometry.createGeometry(boxGeometry)
  } else {
    const _geometry = BoxGeometry.unpack(boxGeometry, offset)
    return BoxGeometry.createGeometry(_geometry)
  }
}
