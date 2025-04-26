import decimal from 'decimal.js'

export type DecimalTypes = decimal

// Default precision
decimal.set({ precision: 20 })

export const add = (
    value1: decimal | number | string,
    value2: decimal | number | string
): decimal => {
    return new decimal(value1).plus(new decimal(value2))
}

export const sub = (
    value1: decimal | number | string,
    value2: decimal | number | string
): decimal => {
    return new decimal(value1).minus(new decimal(value2))
}

export const multiply = (
    value1: decimal | number | string,
    value2: decimal | number | string
): decimal => {
    return new decimal(value1).times(new decimal(value2))
}

export const divide = (
    value1: decimal | number | string,
    value2: decimal | number | string
): decimal => {
    return new decimal(value1).dividedBy(new decimal(value2))
}

export const toNumber = (decimalValue: decimal): number => {
    return decimalValue.toNumber()
}

export const toFixedNumber = (
    value: decimal,
    decimalPlaces: number
): number => {
    return Number(value.toFixed(decimalPlaces))
}

/* 
  Directly exports the decimal class for use if direct access to specific
  functionality is required.
*/

export { decimal }
