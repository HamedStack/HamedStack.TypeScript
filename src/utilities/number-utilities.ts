/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 */
function clamp(number: number, lower?: number, upper?: number): number {
    if (lower !== undefined && number < lower) {
        return lower;
    } else if (upper !== undefined && number > upper) {
        return upper;
    } else {
        return number;
    }
}

/**
 * Checks if `number` is within the range specified by `start` and up to, but not including, `end`.
 * If `end` is not specified, it's set to `start` with `start` then set to 0.
 */
function inRange(number: number, start: number, end?: number): boolean {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (start > end) {
        [start, end] = [end, start];
    }
    return number >= start && number < end;
}

/**
 * Generates a random number between the inclusive `lower` and `upper` bounds.
 * If only `upper` is provided, the range is set from 0 to `upper`.
 * If no arguments are provided, the range is set from 0 to 1.
 */
function random(lower?: number, upper?: number): number {
    if (lower === undefined && upper === undefined) {
        return Math.random();
    } else if (lower !== undefined && upper === undefined) {
        return lower + Math.random() * (1 - lower);
    } else if (lower !== undefined && upper !== undefined) {
        return lower + Math.random() * (upper - lower);
    } else {
        return Math.random();
    }
}

/**
 * Computes the ceiling of `number`.
 */
function ceil(number: number, precision = 0): number {
    const multiplier = Math.pow(10, precision);
    return Math.ceil(number * multiplier) / multiplier;
}

/**
 * Divides `dividend` by `divisor`.
 */
function divide(dividend: number, divisor: number): number {
    return dividend / divisor;
}

/**
 * Computes the floor of `number`.
 */
function floor(number: number, precision = 0): number {
    const multiplier = Math.pow(10, precision);
    return Math.floor(number * multiplier) / multiplier;
}

/**
 * Computes the maximum value of `array`.
 */
function max(array: number[]): number {
    return Math.max(...array);
}

/**
 * Computes the maximum value of `array` based on the result of `iteratee` for each element.
 */
function maxBy<T>(array: T[], iteratee: (value: T) => number): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    let maxVal = iteratee(array[0]);
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) {
        const val = iteratee(array[i]);
        if (val > maxVal) {
            maxVal = val;
            maxValue = array[i];
        }
    }
    return maxValue;
}

/**
 * Computes the mean of the values in `array`.
 */
function mean(array: number[]): number {
    if (array.length === 0) {
        return NaN;
    }
    return sum(array) / array.length;
}

/**
 * Computes the mean of the values in `array` based on the result of `iteratee` for each element.
 */
function meanBy<T>(array: T[], iteratee: (value: T) => number): number {
    if (array.length === 0) {
        return NaN;
    }
    return sumBy(array, iteratee) / array.length;
}

/**
 * Computes the minimum value of `array`.
 */
function min(array: number[]): number {
    return Math.min(...array);
}

/**
 * Computes the minimum value of `array` based on the result of `iteratee` for each element.
 */
function minBy<T>(array: T[], iteratee: (value: T) => number): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    let minVal = iteratee(array[0]);
    let minValue = array[0];
    for (let i = 1; i < array.length; i++) {
        const val = iteratee(array[i]);
        if (val < minVal) {
            minVal = val;
            minValue = array[i];
        }
    }
    return minValue;
}

/**
 * Multiplies two numbers.
 */
function multiply(a: number, b: number): number {
    return a * b;
}

/**
 * Rounds `number` to the nearest integer.
 */
function round(number: number): number {
    return Math.round(number);
}

/**
 * Subtracts `subtrahend` from `minuend`.
 */
function subtract(minuend: number, subtrahend: number): number {
    return minuend - subtrahend;
}

/**
 * Computes the sum of the values in `array`.
 */
function sum(array: number[]): number {
    return array.reduce((total, value) => total + value, 0);
}

/**
 * Computes the sum of the values in `array` based on the result of `iteratee` for each element.
 */
function sumBy<T>(array: T[], iteratee: (value: T) => number): number {
    return array.reduce((total, value) => total + iteratee(value), 0);
}

/**
 * Adds two or more numbers together.
 */
function add(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

export {
    add,
    ceil,
    clamp,
    divide,
    floor,
    inRange,
    max,
    maxBy,
    mean,
    meanBy,
    min,
    minBy,
    multiply,
    random,
    round,
    subtract,
    sum,
    sumBy,
};
