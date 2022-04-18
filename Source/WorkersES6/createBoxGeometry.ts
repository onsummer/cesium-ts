import BoxGeometry from '../Core/BoxGeometry'
import defined from '../Core/defined'

export default (boxGeometry, offset) => {
  if (defined(offset)) {
    boxGeometry = BoxGeometry.unpack(boxGeometry, offset);
  }
  return BoxGeometry.createGeometry(boxGeometry);
}
