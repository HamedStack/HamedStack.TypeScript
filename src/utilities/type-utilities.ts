import { TypedArray } from "../types";

// Creates an array of elements with `value` as the single element if `value` is not already an array
function castArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [value];
}

// Creates a shallow clone of `value`
function clone<T>(value: T): T {
    return Object.assign({}, value);
}

// Creates a deep clone of `value` using JSON serialization
function cloneDeep<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}

// Creates a deep clone of `value` using a customizer function
function cloneDeepWith<T>(
    value: T,
    customizer: (value: unknown) => unknown,
): T {
    const cloned = cloneDeep(value);
    return customizer(cloned) as T;
}

// Creates a shallow clone of `value` using a customizer function
function cloneWith<T>(value: T, customizer: (value: unknown) => unknown): T {
    const cloned = clone(value);
    return customizer(cloned) as T;
}

// Checks if `object` conforms to the provided properties and values
function conformsTo<T extends object>(object: T, source: Partial<T>): boolean {
    for (const key in source) {
        const predicate = source[key] as (value: unknown) => boolean;
        if (!predicate(object[key])) {
            return false;
        }
    }
    return true;
}

// Performs a loose equality comparison between two values
function eq(value: unknown, other: unknown): boolean {
    return value === other || (value !== value && other !== other);
}

// Checks if `value` is greater than `other`
function gt<T extends number>(value: T, other: T): boolean {
    return value > other;
}

// Checks if `value` is greater than or equal to `other`
function gte<T extends number>(value: T, other: T): boolean {
    return value >= other;
}

// Checks if `value` is an arguments object
function isArguments(value: unknown): boolean {
    return Object.prototype.toString.call(value) === "[object Arguments]";
}

// Checks if `value` is an array
function isArray(value: unknown): boolean {
    return Array.isArray(value);
}

// Checks if `value` is an ArrayBuffer
function isArrayBuffer(value: unknown): boolean {
    return value instanceof ArrayBuffer;
}

// Checks if `value` is array-like (has a length property)
function isArrayLike(value: unknown): boolean {
    return (
        value != null &&
        typeof (value as { length: unknown }).length === "number"
    );
}

// Checks if `value` is an array-like object
function isArrayLikeObject(value: unknown): boolean {
    return isArrayLike(value) && typeof value === "object";
}

// Checks if `value` is a boolean
function isBoolean(value: unknown): boolean {
    return typeof value === "boolean";
}

// Checks if `value` is a Buffer
function isBuffer(value: unknown): boolean {
    return Buffer.isBuffer(value);
}

// Checks if `value` is a DOM element
function isElement(value: unknown): boolean {
    return value instanceof Element;
}

// Checks if `value` is an empty value (empty array, object, string, or null/undefined)
function isEmpty(value: unknown): boolean {
    if (value == null) {
        return true;
    }
    if (isArrayLike(value) || typeof value === "string") {
        return (value as { length: unknown }).length === 0;
    }
    if (typeof value === "object") {
        return Object.keys(value as object).length === 0;
    }
    return false;
}

// Performs a deep comparison between two values to determine if they are equivalent
function isEqual(value: unknown, other: unknown): boolean {
    return (
        value === other || isEqualWith(value, other, defaultIsEqualCustomizer)
    );

    function defaultIsEqualCustomizer(value: unknown, other: unknown): boolean {
        if (typeof value !== typeof other) {
            return false;
        }

        if (typeof value !== "object" || value === null || other === null) {
            return value === other;
        }

        if (Array.isArray(value) !== Array.isArray(other)) {
            return false;
        }

        if (Array.isArray(value)) {
            const valueArray = value as unknown[];
            const otherArray = other as unknown[];

            if (valueArray.length !== otherArray.length) {
                return false;
            }

            for (let i = 0; i < valueArray.length; i++) {
                if (!defaultIsEqualCustomizer(valueArray[i], otherArray[i])) {
                    return false;
                }
            }

            return true;
        }

        const valueObj = value as Record<string, unknown>;
        const otherObj = other as Record<string, unknown>;
        const keysA = Object.keys(valueObj);
        const keysB = Object.keys(otherObj);

        if (keysA.length !== keysB.length) {
            return false;
        }

        for (const key of keysA) {
            if (!defaultIsEqualCustomizer(valueObj[key], otherObj[key])) {
                return false;
            }
        }

        return true;
    }
}

// Performs a deep comparison between two values using a customizer function
function isEqualWith(
    value: unknown,
    other: unknown,
    customizer: (v1: unknown, v2: unknown) => boolean,
): boolean {
    if (value === other) {
        return true;
    }
    return customizer(value, other);
}

// Checks if `value` is an Error object
function isError(value: unknown): boolean {
    return value instanceof Error;
}

// Checks if `value` is a finite number
function isFinite(value: unknown): boolean {
    return Number.isFinite(value);
}

// Checks if `value` is a function
function isFunction(value: unknown): boolean {
    return typeof value === "function";
}

// Checks if `value` is an integer
function isInteger(value: unknown): boolean {
    return Number.isInteger(value);
}

// Checks if `value` is a valid array-like length
function isLength<T extends number>(value: T): value is T {
    return isInteger(value) && value >= 0;
}

// Checks if `value` is a Map object
function isMap(value: unknown): boolean {
    return value instanceof Map;
}

// Checks if `value` matches the properties and values of `source`
function isMatch(
    object: Record<string, unknown>,
    source: Record<string, unknown>,
): boolean {
    return Object.keys(source).every((key) =>
        isEqual(object[key], source[key]),
    );
}

// Checks if `value` matches the properties and values of `source` using a customizer function

function isMatchWith(
    object: Record<string, unknown>,
    source: Record<string, unknown>,
    customizer: (v1: unknown, v2: unknown) => boolean,
): boolean {
    return Object.keys(source).every((key) =>
        customizer(object[key], source[key]),
    );
}

// Checks if `value` is NaN
function isNaN(value: unknown): boolean {
    return Number.isNaN(value);
}

// Checks if `value` is a native function
function isNative(value: unknown): boolean {
    return typeof value === "function" && /native code/.test(value.toString());
}

// Checks if `value` is null or undefined
function isNil(value: unknown): boolean {
    return value == null;
}

// Checks if `value` is null
function isNull(value: unknown): boolean {
    return value === null;
}

// Checks if `value` is an object (excluding null)
function isObject(value: unknown): boolean {
    return typeof value === "object" && value !== null;
}

// Checks if `value` is an object-like (has a value of type object and is not null)
function isObjectLike(value: unknown): boolean {
    return typeof value === "object" && value === null;
}

// Checks if `value` is a plain object (created by the Object constructor or literal notation)
function isPlainObject(value: unknown): boolean {
    if (
        !isObjectLike(value) ||
        Object.prototype.toString.call(value) !== "[object Object]"
    ) {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}

// Checks if `value` is a RegExp object
function isRegExp(value: unknown): boolean {
    return value instanceof RegExp;
}

// Checks if `value` is a safe integer
function isSafeInteger(value: unknown): boolean {
    return Number.isSafeInteger(value);
}

// Checks if `value` is a Set object
function isSet(value: unknown): boolean {
    return value instanceof Set;
}

// Checks if `value` is a string
function isString(value: unknown): boolean {
    return typeof value === "string";
}

// Checks if `value` is a Symbol
function isSymbol(value: unknown): boolean {
    return typeof value === "symbol";
}

// Checks if `value` is an undefined value
function isUndefined(value: unknown): boolean {
    return value === undefined;
}

// Checks if `value` is a weak Map object
function isWeakMap(value: unknown): boolean {
    return value instanceof WeakMap;
}

// Checks if `value` is a weak Set object
function isWeakSet(value: unknown): boolean {
    return value instanceof WeakSet;
}

// Checks if `value` is less than `other`
function lt<T extends number>(value: T, other: T): boolean {
    return value < other;
}

// Checks if `value` is less than or equal to `other`
function lte<T extends number>(value: T, other: T): boolean {
    return value <= other;
}

// Converts `value` to an array
function toArray<T>(value: T | T[]): T[] {
    if (Array.isArray(value)) {
        return value as T[];
    }
    if (isIterable(value)) {
        return Array.from(value) as T[];
    }
    return [value] as T[];
}

// Converts `value` to a finite number
function toFinite(value: unknown): number {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
}

// Converts `value` to an integer
function toInteger(value: unknown): number {
    const parsedValue = Number(value);
    return Number.isInteger(parsedValue) ? parsedValue : 0;
}

// Converts `value` to a safe integer
function toSafeInteger(value: unknown): number {
    const parsedValue = Number(value);
    if (Number.isSafeInteger(parsedValue)) {
        return parsedValue;
    }
    if (parsedValue < Number.MIN_SAFE_INTEGER) {
        return Number.MIN_SAFE_INTEGER;
    }
    if (parsedValue > Number.MAX_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER;
    }
    return 0;
}

// Converts `value` to a string
function toString(value: unknown): string {
    if (value == null) {
        return "";
    }
    if (typeof value === "string") {
        return value;
    }
    return String(value);
}

/**
 * Checks if a value is iterable.
 * @param value The value to check.
 * @returns Returns `true` if the value is iterable, `false` otherwise.
 */
function isIterable(value: unknown): value is Iterable<unknown> {
    return (
        typeof value === "object" && value !== null && Symbol.iterator in value
    );
}

/**
 * Safely converts a JavaScript value to a JSON string, handling circular references.
 * @param value - The value to be converted to a JSON string.
 * @param replacer - Optional. A function that alters the behavior of the stringification process.
 * @param space - Optional. The number of spaces to use for indentation or a string used for indentation.
 * @returns A JSON string representing the input value.
 */
function safeStringify(
    value: unknown,
    replacer?: (key: string, value: unknown) => unknown,
    space?: number | string,
): string {
    const seen = new WeakSet();

    /**
     * Default replacer function used when a custom replacer is not provided.
     * @param key - The current key being processed.
     * @param val - The value corresponding to the current key.
     * @returns The value to be stringified.
     */
    const defaultReplacer = (key: string, val: unknown) => {
        if (typeof val === "object" && val !== null) {
            if (seen.has(val)) {
                return "[Circular Reference]";
            }
            seen.add(val);
        }
        return val;
    };

    try {
        return JSON.stringify(value, replacer || defaultReplacer, space);
    } catch (error) {
        console.error("Error while stringifying:", error);
        return "";
    }
}

// Converts `value` to a number
function toNumber(value: unknown): number {
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }
    return 0;
}

// Converts `value` to a plain object
function toPlainObject(value: unknown): object {
    if (typeof value !== "object" || value === null) {
        return {};
    }
    return { ...value };
}

function isNumber(val: unknown): val is number {
    return typeof val === "number" && !isNaN(val);
}

function isStringArray(val: unknown): val is string[] {
    return Array.isArray(val) && val.every(isString);
}

function isNumberArray(val: unknown): val is number[] {
    return Array.isArray(val) && val.every(isNumber);
}

function isDate(val: unknown): val is Date {
    return (val &&
        Object.prototype.toString.call(val) === "[object Date]" &&
        !isNaN(val)) as boolean;
}

function isPromise(val: unknown): val is Promise<unknown> {
    return val instanceof Promise;
}

function isBigInt(val: unknown): val is bigint {
    return typeof val === "bigint";
}
function isNumeric(n: unknown): boolean {
    return !isNaN(parseFloat(n as string)) && isFinite(n);
}
function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

function isWindow(obj: unknown): boolean {
    return (
        obj !== null &&
        typeof obj === "object" &&
        obj === (obj as { window?: unknown }).window
    );
}

function type(obj: unknown): string {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function isTypedArray(val: unknown): val is TypedArray {
    return (
        val instanceof Int8Array ||
        val instanceof Uint8Array ||
        val instanceof Uint8ClampedArray ||
        val instanceof Int16Array ||
        val instanceof Uint16Array ||
        val instanceof Int32Array ||
        val instanceof Uint32Array ||
        val instanceof Float32Array ||
        val instanceof Float64Array
    );
}

function isReadonlyArray<T>(val: unknown): val is ReadonlyArray<T> {
    return Array.isArray(val) && Object.isFrozen(val);
}

function hasSameType<T>(val: unknown, type: T): val is T {
    return val === type;
}

function isObjectEmpty(obj: object): boolean {
    return isObject(obj) && Object.keys(obj).length === 0;
}

function isLiteral<T extends boolean | number | string>(
    val: unknown,
    type: T,
): val is T {
    return val === type;
}

function isUnion<T extends Array<unknown>>(
    val: unknown,
    types: T,
): val is T[number] {
    return types.some(
        (t) =>
            typeof t === "function" &&
            val instanceof (t as new (...args: unknown[]) => unknown),
    );
}

function isExactUnion<T extends Array<unknown>>(
    val: unknown,
    types: T,
): val is T[number] {
    return types.some((t) => hasSameType(val, t));
}

function isPromiseOfT<T>(obj: Promise<T> | T): obj is Promise<T> {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof (obj as Promise<T>).then === "function"
    );
}

export {
    castArray,
    clone,
    cloneDeep,
    cloneDeepWith,
    cloneWith,
    conformsTo,
    eq,
    gt,
    gte,
    hasSameType,
    isArguments,
    isArray,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isBigInt,
    isBoolean,
    isBuffer,
    isDate,
    isElement,
    isEmpty,
    isEmptyObject,
    isEqual,
    isEqualWith,
    isError,
    isExactUnion,
    isFinite,
    isFunction,
    isInteger,
    isIterable,
    isLength,
    isLiteral,
    isMap,
    isMatch,
    isMatchWith,
    isNaN,
    isNative,
    isNil,
    isNull,
    isNumber,
    isNumberArray,
    isNumeric,
    isObject,
    isObjectEmpty,
    isObjectLike,
    isPlainObject,
    isPromise,
    isPromiseOfT,
    isReadonlyArray,
    isRegExp,
    isSafeInteger,
    isSet,
    isString,
    isStringArray,
    isSymbol,
    isTypedArray,
    isUndefined,
    isUnion,
    isWeakMap,
    isWeakSet,
    isWindow,
    lt,
    lte,
    safeStringify,
    toArray,
    toFinite,
    toInteger,
    toNumber,
    toPlainObject,
    toSafeInteger,
    toString,
    type,
};
