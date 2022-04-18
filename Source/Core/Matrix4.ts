import Cartesian3 from './Cartesian3'
import defaultValue from './defaultValue'
import defined from './defined'

class Matrix4 {
  constructor(
    column0Row0: number = 0,
    column1Row0: number = 0,
    column2Row0: number = 0,
    column3Row0: number = 0,
    column0Row1: number = 0,
    column1Row1: number = 0,
    column2Row1: number = 0,
    column3Row1: number = 0,
    column0Row2: number = 0,
    column1Row2: number = 0,
    column2Row2: number = 0,
    column3Row2: number = 0,
    column0Row3: number = 0,
    column1Row3: number = 0,
    column2Row3: number = 0,
    column3Row3: number = 0
  ) {
    this[0] = column0Row0
    this[1] = column0Row1
    this[2] = column0Row2
    this[3] = column0Row3
    this[4] = column1Row0
    this[5] = column1Row1
    this[6] = column1Row2
    this[7] = column1Row3
    this[8] = column2Row0
    this[9] = column2Row1
    this[10] = column2Row2
    this[11] = column2Row3
    this[12] = column3Row0
    this[13] = column3Row1
    this[14] = column3Row2
    this[15] = column3Row3
  }

  static clone(matrix: Matrix4, result?: Matrix4) {
    if (!defined(matrix)) {
      return undefined
    }
    if (!defined(result)) {
      return new Matrix4(
        matrix[0],
        matrix[4],
        matrix[8],
        matrix[12],
        matrix[1],
        matrix[5],
        matrix[9],
        matrix[13],
        matrix[2],
        matrix[6],
        matrix[10],
        matrix[14],
        matrix[3],
        matrix[7],
        matrix[11],
        matrix[15]
      )
    }
    result[0] = matrix[0]
    result[1] = matrix[1]
    result[2] = matrix[2]
    result[3] = matrix[3]
    result[4] = matrix[4]
    result[5] = matrix[5]
    result[6] = matrix[6]
    result[7] = matrix[7]
    result[8] = matrix[8]
    result[9] = matrix[9]
    result[10] = matrix[10]
    result[11] = matrix[11]
    result[12] = matrix[12]
    result[13] = matrix[13]
    result[14] = matrix[14]
    result[15] = matrix[15]
    return result
  }

  static getTranslation(matrix: Matrix4, result: Cartesian3) {
    result.x = matrix[12]
    result.y = matrix[13]
    result.z = matrix[14]
    return result
  }
}

export default Matrix4
