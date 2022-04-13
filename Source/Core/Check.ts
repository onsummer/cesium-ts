import defined from './defined'
import DeveloperError from './DeveloperError'

const getCheckFunction = (typeOfName: string) => {
  return (name: string, test: any) => {
    if (typeof test !== typeOfName) {
      throw new DeveloperError(
        getFailedTypeErrorMessage(typeof test, typeOfName, name)
      )
    }
  }
}

const checkNumberFunction = (name: string, test: any) => {
  if (typeof test !== "number") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "number", name)
    )
  }
}

checkNumberFunction.lessThan = (name: string, test: any, limit: number) => {
  Check.typeOf.number(name, test)
  if (test >= limit) {
    throw new DeveloperError(
      `Expected ${name} to be less than ${limit}, actual value was ${test}`
    );
  }
}

checkNumberFunction.lessThanOrEquals = (name: string, test: any, limit: number) => {
  Check.typeOf.number(name, test)
  if (test > limit) {
    throw new DeveloperError(
      `Expected ${name} to be less than or equal to ${limit}, actual value was ${test}`
    );
  }
}

checkNumberFunction.greaterThan = (name: string, test: any, limit: number) => {
  Check.typeOf.number(name, test)
  if (test > limit) {
    throw new DeveloperError(
      `Expected ${name} to be greater than ${limit}, actual value was ${test}`
    );
  }
}

checkNumberFunction.greaterThanOrEquals = (name: string, test: any, limit: number) => {
  Check.typeOf.number(name, test)
  if (test > limit) {
    throw new DeveloperError(
      `Expected ${name} to be greater than or equal to ${limit}, actual value was ${test}`
    );
  }
}

const Check = {
  typeOf: {
    func: getCheckFunction('function'),
    string: getCheckFunction('string'),
    number: checkNumberFunction,
    object: getCheckFunction('object'),
    bool: getCheckFunction('boolean'),
    bigint: getCheckFunction('bigint')
  },
  defined: (name: string, test: any) => {
    if (!defined(test)) {
      throw new DeveloperError(getUndefinedErrorMessage(name))
    }
  }
}

const getUndefinedErrorMessage = (name: string) => {
  return `${name} is required, actual value was undefined`
}

function getFailedTypeErrorMessage(actual: any, expected: any, name: any) {
  return `Expected ${name} to be typeof ${expected}, actual typeof was ${actual}`
}

export default Check
