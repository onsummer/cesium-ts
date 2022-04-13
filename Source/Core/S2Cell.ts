import Check from './Check'
import Cartesian3 from './Cartesian3'
import Ellipsoid from './Ellipsoid'
import defined from './defined'
import FeatureDetection from './FeatureDetection'
import RuntimeError from './RuntimeError'
import DeveloperError from './DeveloperError'

const S2_MAX_LEVEL = 30
const S2_LIMIT_IJ = 1 << S2_MAX_LEVEL
const S2_MAX_SITI = (1 << (S2_MAX_LEVEL + 1) >>> 0)
const S2_POSITION_BITS = 2 * S2_MAX_LEVEL + 1
const S2_LOOKUP_BITS = 4
const S2_LOOKUP_POSITIONS = []
const S2_LOOKUP_IJ = []
const S2_POSITION_TO_IJ = [
  [0, 1, 3, 2],
  [0, 2, 3, 1],
  [3, 2, 0, 1],
  [3, 1, 0, 2],
]
const S2_SWAP_MASK = 1
const S2_INVERT_MASK = 2
const S2_POSITION_TO_ORIENTATION_MASK = [
  S2_SWAP_MASK,
  0,
  0,
  S2_SWAP_MASK | S2_INVERT_MASK,
]

class S2Cell {
  private _cellId: BigInt
  private _level: number

  constructor(cellId: BigInt) {
    if (!FeatureDetection.supportsBigInt()) {
      throw new RuntimeError('S2 required BigInt support')
    }

    if (!defined(cellId)) {
      throw new DeveloperError('cell ID is required.')
    }

    if (!S2Cell.isValidId(cellId)) {
      throw new DeveloperError("cell ID is invalid.");
    }
    //>>includeEnd('debug');

    this._cellId = cellId
    this._level = S2Cell.getLevel(cellId)
  }

  static fromToken(token: string) {

  }

  static isValidId(cellId: BigInt) {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.bigint("cellId", cellId);
    //>>includeEnd('debug');

    // Check if sentinel bit is missing.
    // @ts-ignore
    if (cellId <= 0) {
      return false;
    }

    // Check if face bits indicate a valid value, in range [0-5].
    // @ts-ignore
    if (cellId >> BigInt(S2_POSITION_BITS) > 5) {
      return false;
    }

    // Check trailing 1 bit is in one of the even bit positions allowed for the 30 levels, using a bitmask.
    // @ts-ignore
    const lowestSetBit = cellId & (~cellId + BigInt(1));
    // @ts-ignore
    if (!(lowestSetBit & BigInt("0x1555555555555555"))) {
      return false;
    }

    return true;
  }

  static isValidToken(token: string) {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.string("token", token);
    //>>includeEnd('debug');

    if (!/^[0-9a-fA-F]{1,16}$/.test(token)) {
      return false;
    }

    return S2Cell.isValidId(S2Cell.getIdFromToken(token));
  }

  static getIdFromToken(token: string) {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.string("token", token);
    //>>includeEnd('debug');

    return BigInt("0x" + token + "0".repeat(16 - token.length))
  }

  static getTokenFromId(cellId?: bigint) {

  }

  static getLevel(cellId: BigInt) {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.bigint("cellId", cellId);
    if (!S2Cell.isValidId(cellId)) {
      throw new DeveloperError()
    }
    //>>includeEnd('debug');

    let lsbPosition = 0;
    while (cellId !== BigInt(0)) {
      // @ts-ignore
      if (cellId & BigInt(1)) {
        break;
      }
      lsbPosition++;
      // @ts-ignore
      cellId = cellId >> BigInt(1); // eslint-disable-line
    }

    // We use (>> 1) because there are 2 bits per level.
    return S2_MAX_LEVEL - (lsbPosition >> 1);
  }

  getChild(index: number) {

  }

  getParent() {

  }

  getParentAtLevel(level: number) {

  }

  getCenter(ellipsoid: Ellipsoid) {

  }

  getVertex(index: number, ellipsoid: Ellipsoid) {

  }

  static fromFacePositionLevel(face: number, position: bigint, level: number) {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.bigint("position", position);
    if (face < 0 || face > 5) {
      throw new DeveloperError("Invalid S2 Face (must be within 0-5)");
    }

    if (level < 0 || level > S2_MAX_LEVEL) {
      throw new DeveloperError("Invalid level (must be within 0-30)");
    }
    if (position < 0 || position >= Math.pow(4, level)) {
      throw new DeveloperError("Invalid Hilbert position for level");
    }
    //>>includeEnd('debug');

    const faceBitString =
      (face < 4 ? "0" : "") + (face < 2 ? "0" : "") + face.toString(2);
    const positionBitString = position.toString(2);
    const positionPrefixPadding = Array(
      2 * level - positionBitString.length + 1
    ).join("0");
    const positionSuffixPadding = Array(S2_POSITION_BITS - 2 * level).join("0");

    const cellId = BigInt(
      "0b" +
      faceBitString +
      positionPrefixPadding +
      positionBitString +
      "1" + // Adding the sentinel bit that always follows the position bits.
      positionSuffixPadding
    );
    return new S2Cell(cellId)
  }
}

const getS2Center = (cellId: number, level: number) => {
  const faceSiTi = convertCellIdToFaceSiTi(cellId, level);
  return convertFaceSiTitoXYZ(faceSiTi[0], faceSiTi[1], faceSiTi[2])
}

const getS2Vertex = (cellId, level, index) => {
  const faceIJ = convertCellIdToFaceIJ(cellId, level)
  const uv = convertIJLeveltoBoundUV([faceIJ[1], faceIJ[2]], level)
  // Handles CCW ordering of the vertices.
  const y = (index >> 1) & 1
  return convertFaceUVtoXYZ(faceIJ[0], uv[0][y ^ (index & 1)], uv[1][y]);
}

const convertCellIdToFaceSiTi = (cellId: number, level: number) => {
  const faceIJ = convertCellIdToFaceIJ(cellId)
  const face = faceIJ[0]
  const i = faceIJ[1]
  const j = faceIJ[2]

  const isLeaf = level === 30
  const shouldCorrect =
    // @ts-ignore
    !isLeaf && (BigInt(i) ^ (cellId >> BigInt(2))) & BigInt(1)
  const correction = isLeaf ? 1 : shouldCorrect ? 2 : 0
  const si = (i << 1) + correction
  const ti = (j << 1) + correction
  return [face, si, ti]
}

const convertCellIdToFaceIJ = (cellId: number) => {
  if (S2_LOOKUP_POSITIONS.length === 0) {
    generateLookupTable()
  }

  // @ts-ignore
  const face = Number(cellId >> BigInt(S2_POSITION_BITS))
  const lookupMask = (1 << S2_LOOKUP_BITS) - 1
  let bits = face & S2_SWAP_MASK

  let i = 0
  let j = 0

  for (let k = 7; k >= 0; k--) {
    const numberOfBits =
      k === 7 ? S2_MAX_LEVEL - 7 * S2_LOOKUP_BITS : S2_LOOKUP_BITS
    const extractMask = (1 << (2 * numberOfBits)) - 1
    bits +=
      Number(
        // @ts-ignore
        (cellId >> BigInt(k * 2 * S2_LOOKUP_BITS + 1)) & BigInt(extractMask)
      ) << 2

    bits = S2_LOOKUP_IJ[bits]

    var offset = k * S2_LOOKUP_BITS
    i += (bits >> (S2_LOOKUP_BITS + 2)) << offset
    j += ((bits >> 2) & lookupMask) << offset

    bits &= S2_SWAP_MASK | S2_INVERT_MASK
  }

  return [face, i, j]
}

const convertFaceSiTitoXYZ = (face: number, si: number, ti: number) => {
  const s = convertSiTitoST(si)
  const t = convertSiTitoST(ti)

  const u = convertSTtoUV(s)
  const v = convertSTtoUV(t)
  return convertFaceUVtoXYZ(face, u, v)
}

const convertFaceUVtoXYZ = (face: number, u: number, v: number) => {
  switch (face) {
    case 0:
      return new Cartesian3(1, u, v)
    case 1:
      return new Cartesian3(-u, 1, v)
    case 2:
      return new Cartesian3(-u, -v, 1)
    case 3:
      return new Cartesian3(-1, -v, -u)
    case 4:
      return new Cartesian3(v, -1, -u)
    default:
      return new Cartesian3(v, u, -1)
  }
}

const convertSTtoUV = (s: number) => {
  if (s >= 0.5) return (1 / 3) * (4 * s * s - 1)
  return (1 / 3) * (1 - 4 * (1 - s) * (1 - s))
}

const convertSiTitoST = (si: number) => {
  return (1.0 / S2_MAX_SITI) * si
}

const convertIJLeveltoBoundUV = (ij: number[], level: number) => {
  const result: [number[], number[]] = [[], []]
  const cellSize = getSizeIJ(level)
  for (let d = 0; d < 2; ++d) {
    const ijLow = ij[d] & -cellSize
    const ijHigh = ijLow + cellSize
    result[d][0] = convertSTtoUV(convertIJtoSTMinimum(ijLow))
    result[d][1] = convertSTtoUV(convertIJtoSTMinimum(ijHigh))
  }
  return result
}

const getSizeIJ = (level: number) => {
  return (1 << (S2_MAX_LEVEL - level)) >>> 0
}

const convertIJtoSTMinimum = (i: number) => {
  return (1.0 / S2_LIMIT_IJ) * i
}

const generateLookupCell = (
  level: number,
  i: number,
  j: number,
  originalOrientation: number,
  position: number,
  orientation: number
) => {
  if (level === S2_LOOKUP_BITS) {
    var ij = (i << S2_LOOKUP_BITS) + j
    S2_LOOKUP_POSITIONS[(ij << 2) + originalOrientation] =
      (position << 2) + orientation
    S2_LOOKUP_IJ[(position << 2) + originalOrientation] =
      (ij << 2) + orientation
  } else {
    level++
    i <<= 1
    j <<= 1
    position <<= 2
    var r = S2_POSITION_TO_IJ[orientation]
    generateLookupCell(
      level,
      i + (r[0] >> 1),
      j + (r[0] & 1),
      originalOrientation,
      position,
      orientation ^ S2_POSITION_TO_ORIENTATION_MASK[0]
    )
    generateLookupCell(
      level,
      i + (r[1] >> 1),
      j + (r[1] & 1),
      originalOrientation,
      position + 1,
      orientation ^ S2_POSITION_TO_ORIENTATION_MASK[1]
    )
    generateLookupCell(
      level,
      i + (r[2] >> 1),
      j + (r[2] & 1),
      originalOrientation,
      position + 2,
      orientation ^ S2_POSITION_TO_ORIENTATION_MASK[2]
    )
    generateLookupCell(
      level,
      i + (r[3] >> 1),
      j + (r[3] & 1),
      originalOrientation,
      position + 3,
      orientation ^ S2_POSITION_TO_ORIENTATION_MASK[3]
    )
  }
}

const generateLookupTable = () => {
  generateLookupCell(0, 0, 0, 0, 0, 0)
  generateLookupCell(0, 0, 0, S2_SWAP_MASK, 0, S2_SWAP_MASK)
  generateLookupCell(0, 0, 0, S2_INVERT_MASK, 0, S2_INVERT_MASK)
  generateLookupCell(
    0,
    0,
    0,
    S2_SWAP_MASK | S2_INVERT_MASK,
    0,
    S2_SWAP_MASK | S2_INVERT_MASK
  )
}

const lsb = (cellId: BigInt) => {
  // @ts-ignore
  return cellId & (~cellId + BigInt(1))
}

const lsbForLevel = (level: number) => {
  // @ts-ignore
  return BigInt(1) << BigInt(2 * (S2_MAX_LEVEL - level))
}

const Mod67BitPosition = [
  64,
  0,
  1,
  39,
  2,
  15,
  40,
  23,
  3,
  12,
  16,
  59,
  41,
  19,
  24,
  54,
  4,
  64,
  13,
  10,
  17,
  62,
  60,
  28,
  42,
  30,
  20,
  51,
  25,
  44,
  55,
  47,
  5,
  32,
  65,
  38,
  14,
  22,
  11,
  58,
  18,
  53,
  63,
  9,
  61,
  27,
  29,
  50,
  43,
  46,
  31,
  37,
  21,
  57,
  52,
  8,
  26,
  49,
  45,
  36,
  56,
  7,
  48,
  35,
  6,
  34,
  33,
  0,
]

const countTrailingZeroBits = (x: number) => {
  // @ts-ignore
  return Mod67BitPosition[(-x & x) % BigInt(67)]
}

export default S2Cell
