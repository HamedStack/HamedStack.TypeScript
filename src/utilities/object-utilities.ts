/* eslint-disable @typescript-eslint/ban-types */

/**
 * Invokes the given function with the provided value and returns the value. Use it to perform intermediate operations in a method chain.
 */
function tap(value: unknown, interceptor: Function): unknown {
    interceptor(value);
    return value;
}

/**
 * Executes the given function with the provided value and returns the result. Use it to perform a sequence of operations in a method chain.
 */
function thru(value: unknown, interceptor: Function): unknown {
    return interceptor(value);
}

/**
 * Copies the enumerable properties of the source object(s) to the destination object.
 */
function assign<T extends object>(target: T, ...sources: object[]): T {
    Object.assign(target, ...sources);
    return target;
}

/**
 * Copies the enumerable and inherited properties of the source object(s) to the destination object.
 */
function assignIn<T extends object>(target: T, ...sources: object[]): T {
    for (const source of sources) {
        for (const key in source) {
            (target as Record<string, unknown>)[key] = (
                source as Record<string, unknown>
            )[key];
        }
    }
    return target;
}

/**
 * This method is like `assignIn` except that it accepts a customizer which is invoked to produce the assigned values.
 */
function assignInWith<T extends object>(target: T, ...sources: object[]): T {
    for (const source of sources) {
        for (const key in source) {
            (target as Record<string, unknown>)[key] = (
                source as Record<string, unknown>
            )[key];
        }
    }
    return target;
}

/**
 * This method is like `assign` except that it accepts a customizer which is invoked to produce the assigned values.
 */
function assignWith<T extends object>(target: T, ...sources: object[]): T {
    Object.assign(target, ...sources);
    return target;
}

/**
 * Creates an array of values corresponding to paths of the object.
 */
function valueAt(
    object: { [key: string]: unknown },
    paths: string[],
    separator = ".",
): unknown[] {
    return paths.map((path) => {
        const keys = path.split(separator);
        let value: unknown = object;

        for (const key of keys) {
            if (value && typeof value === "object" && key in value) {
                value = (value as { [key: string]: unknown })[key];
            } else {
                value = undefined;
                break;
            }
        }

        return value;
    });
}

/**
 * Creates a new object with the specified prototype object and properties.
 */
function create(
    prototype: null | object,
    properties: PropertyDescriptorMap = {},
): object {
    return Object.create(prototype, properties);
}

/**
 * Assigns default properties of the source objects to the destination object.
 */
function defaults<T extends object>(object: T, ...sources: object[]): T {
    for (const source of sources) {
        for (const key in source) {
            if (!(key in object)) {
                (object as Record<string, unknown>)[key] = (
                    source as Record<string, unknown>
                )[key];
            }
        }
    }
    return object;
}

/**
 * This method is like `defaults` except that it recursively assigns default properties.
 */
function defaultsDeep<T extends object>(object: T, ...sources: object[]): T {
    for (const source of sources) {
        for (const key in source) {
            if (!(key in object)) {
                (object as Record<string, unknown>)[key] = (
                    source as Record<string, unknown>
                )[key];
            } else if (
                typeof object[key as keyof typeof object] === "object" &&
                typeof source[key as keyof typeof source] === "object"
            ) {
                defaultsDeep(
                    object[key as keyof typeof object] as object,
                    source[key as keyof typeof source] as object,
                );
            }
        }
    }
    return object;
}

/**
 * This method returns the key of the first element predicate returns truthy for.
 */
function findKey<T>(
    object: Record<string, T>,
    predicate: (value: T, key: string) => boolean,
): string | undefined {
    for (const key in object) {
        if (predicate(object[key], key)) {
            return key;
        }
    }
}

/**
 * This method returns the key of the last element predicate returns truthy for.
 */
function findLastKey<T>(
    object: Record<string, T>,
    predicate: (value: T, key: string) => boolean,
): string | undefined {
    const keys = Object.keys(object);
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        if (predicate(object[key], key)) {
            return key;
        }
    }
}

/**
 * Iterates over own and inherited enumerable string keyed properties of an object, invoking `iteratee` for each property.
 */
function forIn<T extends object>(
    object: T,
    iteratee: (value: unknown, key: string) => void,
): T {
    for (const key in object) {
        iteratee(object[key], key);
    }
    return object;
}

/**
 * This method is like `forIn` except that it iterates over properties in reverse order.
 */
function forInRight<T extends object>(
    object: T,
    iteratee: (value: unknown, key: string) => void,
): T {
    const keys = Object.keys(object).reverse();
    for (const key of keys) {
        iteratee((object as Record<string, unknown>)[key], key);
    }
    return object;
}

/**
 * Iterates over own enumerable string keyed properties of an object, invoking `iteratee` for each property.
 */
function forOwn<T extends object>(
    object: T,
    iteratee: (value: unknown, key: string) => void,
): T {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            iteratee(object[key], key);
        }
    }
    return object;
}

/**
 * This method is like `forOwn` except that it iterates over properties in reverse order.
 */
function forOwnRight<T extends object>(
    object: T,
    iteratee: (value: unknown, key: string) => void,
): T {
    const keys = Object.keys(object).reverse();
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            iteratee((object as Record<string, unknown>)[key], key);
        }
    }
    return object;
}

/**
 * Creates an array of function property names from own enumerable properties of `object`.
 */
function functions(object: object): string[] {
    const result: string[] = [];
    for (const key in object) {
        if (typeof (object as Record<string, unknown>)[key] === "function") {
            result.push(key);
        }
    }
    return result;
}

/**
 * Creates an array of function property names from own and inherited enumerable properties of `object`.
 */
function functionsIn(object: object): string[] {
    const result: string[] = [];
    for (const key in object) {
        result.push(key);
    }
    return result;
}

/**
 * Gets the value at `path` of `object`.
 */
function get(
    object: object,
    path: string | string[],
    defaultValue?: unknown,
    separator = ".",
): unknown {
    const pathArray = Array.isArray(path) ? path : path.split(separator);
    let result: unknown = object;
    for (const key of pathArray) {
        if (result == null) {
            return defaultValue;
        }
        result = (result as Record<string, unknown>)[key];
    }
    return result !== undefined ? result : defaultValue;
}

/**
 * Checks if `path` is a direct property of `object`.
 */
function has(
    object: object,
    path: string | string[],
    separator = ".",
): boolean {
    const pathArray = Array.isArray(path) ? path : path.split(separator);
    let result: unknown = object;
    for (const key of pathArray) {
        if (result == null || !(key in (result as Record<string, unknown>))) {
            return false;
        }
        result = (result as Record<string, unknown>)[key];
    }
    return true;
}

/**
 * Creates an object composed of the inverted keys and values of `object`.
 */
function invert(object: Record<string, string>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key in object) {
        result[object[key]] = key;
    }
    return result;
}

/**
 * This method is like `invert` except that it group the inverted values by iteratee.
 */
function invertBy<T extends Record<string, unknown>>(
    object: T,
    iteratee: (value: unknown) => string,
): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const key in object) {
        const value = object[key];
        const invertedKey = iteratee(value);
        if (invertedKey in result) {
            result[invertedKey].push(key);
        } else {
            result[invertedKey] = [key];
        }
    }
    return result;
}

/**
 * Invokes the method at `path` of `object`.
 */
function invoke(
    object: object,
    path: string | string[],
    ...args: unknown[]
): unknown {
    const method = get(object, path);
    if (typeof method === "function") {
        return method.apply(object, args);
    }
}

/**
 * Creates an array of the own enumerable property names of `object`.
 */
function keys(object: object): string[] {
    return Object.keys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 */
function keysIn(object: object): string[] {
    const result: string[] = [];
    for (const key in object) {
        result.push(key);
    }
    return result;
}

/**
 * Creates an object with the same keys as `object` and values generated by running each own enumerable string keyed property of `object` through `iteratee`.
 */
function mapKeys(
    object: Record<string, unknown>,
    iteratee: (value: unknown, key: string) => string,
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key in object) {
        const value = object[key];
        result[iteratee(value, key)] = value;
    }
    return result;
}

/**
 * Creates an object with the same keys as `object` and values generated by running each own enumerable string keyed property of `object` through `iteratee`.
 */
function mapValues(
    object: Record<string, unknown>,
    iteratee: (value: unknown, key: string) => unknown,
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key in object) {
        result[key] = iteratee(object[key], key);
    }
    return result;
}

/**
 * Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.
 */
function merge<T extends object>(object: T, ...sources: object[]): T {
    Object.assign(object, ...sources);
    return object;
}

/**
 * This method is like `merge` except that it accepts a customizer which is invoked to produce the merged values.
 */
function mergeWith<T extends object>(object: T, ...sources: object[]): T {
    for (const source of sources) {
        for (const key in source) {
            const targetValue = (object as Record<string, unknown>)[key];
            const sourceValue = (source as Record<string, unknown>)[key];
            if (targetValue !== sourceValue) {
                (object as Record<string, unknown>)[key] = sourceValue;
            }
        }
    }
    return object;
}

/**
 * Creates an object composed of the object properties omitted based on the given keys.
 */
function omit(
    object: Record<string, unknown>,
    keys: string[],
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key in object) {
        if (!keys.includes(key)) {
            result[key] = object[key];
        }
    }
    return result;
}

/**
 * Creates an object composed of the object properties omitted based on the given predicate.
 */
function omitBy(
    object: Record<string, unknown>,
    predicate: (value: unknown, key: string) => boolean,
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key in object) {
        const value = object[key];
        if (!predicate(value, key)) {
            result[key] = value;
        }
    }
    return result;
}

/**
 * Creates an object composed of the picked object properties.
 */
function pick(
    object: Record<string, unknown>,
    keys: string[],
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key of keys) {
        if (key in object) {
            result[key] = object[key];
        }
    }
    return result;
}

/**
 * Creates an object composed of the object properties picked based on the given predicate.
 */
function pickBy(
    object: Record<string, unknown>,
    predicate: (value: unknown, key: string) => boolean,
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key in object) {
        const value = object[key];
        if (predicate(value, key)) {
            result[key] = value;
        }
    }
    return result;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is a function, it's invoked with the `this` binding of its parent object and its result is returned.
 */
function result(
    object: object,
    path: string | string[],
    defaultValue?: unknown,
): unknown {
    const value = get(object, path, defaultValue);
    if (typeof value === "function") {
        return value.call(object);
    }
    return value;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist, it's created.
 */
function set(
    object: Record<string, unknown>,
    path: string | string[],
    value: unknown,
    separator = ".",
): Record<string, unknown> {
    const pathArray = Array.isArray(path) ? path : path.split(separator);
    let result: Record<string, unknown> = object;
    for (let i = 0; i < pathArray.length - 1; i++) {
        const key = pathArray[i];
        if (!(key in result)) {
            result[key] = {};
        }
        result = result[key] as Record<string, unknown>;
    }
    result[pathArray[pathArray.length - 1]] = value;
    return object;
}

/**
 * This method is like `set` except that it accepts a customizer which is invoked to produce the object of path.
 */
function setWith(
    object: Record<string, unknown>,
    path: string | string[],
    value: unknown,
    customizer: (
        nsValue: unknown,
        key: string,
        nsObject: Record<string, unknown>,
    ) => unknown,
    separator = ".",
): Record<string, unknown> {
    const pathArray = Array.isArray(path) ? path : path.split(separator);
    let result: Record<string, unknown> = object;
    for (let i = 0; i < pathArray.length - 1; i++) {
        const key = pathArray[i];
        if (!(key in result)) {
            result[key] = customizer(
                undefined,
                pathArray.slice(i + 1).join(separator),
                object,
            );
        }
        result = result[key] as Record<string, unknown>;
    }
    result[pathArray[pathArray.length - 1]] = value;
    return object;
}

/**
 * Creates an array of own enumerable string keyed-value pairs for `object`.
 */
function toPairs(object: object): [string, unknown][] {
    return Object.entries(object);
}

/**
 * Creates an array of own and inherited enumerable string keyed-value pairs for `object`.
 */
function toPairsIn(object: { [key: string]: unknown }): [string, unknown][] {
    const result: [string, unknown][] = [];
    for (const key in object) {
        result.push([key, object[key]]);
    }
    return result;
}

/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object.
 */
function transform<T extends object>(
    object: T,
    iteratee: (
        accumulator: T,
        value: unknown,
        key: string,
        object: T,
    ) => boolean | void,
    accumulator?: T,
): T {
    const keys = Object.keys(object);
    for (const key of keys) {
        if (
            iteratee(accumulator as T, object[key as keyof T], key, object) ===
            false
        ) {
            break;
        }
    }
    return accumulator || object;
}

/**
 * Removes the property at `path` of `object`.
 */
function unset(
    object: Record<string, unknown>,
    path: string | string[],
    separator = ".",
): boolean {
    const pathArray = Array.isArray(path) ? path : path.split(separator);
    let result = false;
    if (pathArray.length === 1) {
        result = delete object[pathArray[0]];
    } else {
        let current: Record<string, unknown> = object;
        for (let i = 0; i < pathArray.length - 1; i++) {
            const key = pathArray[i];
            if (!(key in current)) {
                result = false;
                break;
            }
            current = current[key] as Record<string, unknown>;
        }
        if (!result) {
            result = delete current[pathArray[pathArray.length - 1]];
        }
    }
    return result;
}

/**
 * This method is like `set` except that it accepts a updater to produce the value to set.
 */
function update(
    object: Record<string, unknown>,
    path: string | string[],
    updater: (value: unknown) => unknown,
): object {
    const newValue = updater(get(object, path));
    set(object, path, newValue);
    return object;
}

/**
 * This method is like `update` except that it accepts a customizer which is invoked to produce the value to set.
 */
function updateWith(
    object: Record<string, unknown>,
    path: string | string[],
    updater: (value: unknown, key: string, nsObject: object) => unknown,
    customizer: (nsValue: unknown, key: string, nsObject: object) => unknown,
): object {
    const pathArray = Array.isArray(path) ? path : path.split(".");
    const newValue = updater(
        get(object, path),
        pathArray[pathArray.length - 1],
        object,
    );
    setWith(object, path, newValue, customizer);
    return object;
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 */
function values(object: object): unknown[] {
    return Object.values(object);
}

/**
 * Creates an array of the own and inherited enumerable string keyed property values of `object`.
 */
function valuesIn<T>(object: T): unknown[] {
    const result: unknown[] = [];
    for (const key in object) {
        result.push((object as Record<string, unknown>)[key]);
    }
    return result;
}

/**
 * Flattens an object. This function can also handle objects that have child objects.
 * Child objects are retrieved using the provided `getChildren` function.
 * The resulting array contains all objects and their children in a flat structure.
 * @param rootObject - The root object to be flattened.
 * @param getChildren - A function that, given an object, returns its child objects or undefined.
 * @returns A flat array containing the root object and its child objects.
 */
function flattenObject(
    rootObject: Record<string, unknown>,
    getChildren:
        | ((
              item: Record<string, unknown>,
          ) => Record<string, unknown>[] | undefined)
        | undefined,
): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];
    if (!rootObject) {
        return result;
    }
    result.push(rootObject);
    const children = getChildren?.(rootObject);
    if (!children) {
        return result;
    }
    for (const child of children) {
        if (child) {
            result.push(...flattenObject(child, getChildren));
        }
    }
    return result;
}

// Binds methods of an object to the object itself, overwriting the original methods
function bindAll(
    object: Record<string, unknown>,
    ...methodNames: string[]
): void {
    methodNames.forEach((methodName) => {
        object[methodName] = (object[methodName] as Function).bind(object);
    });
}

// Creates a function that iterates over a list of predicate-function pairs and returns the value of the first predicate that evaluates to true
function cond(pairs: [Function, Function][]): (...args: unknown[]) => unknown {
    return function (...args: unknown[]): unknown {
        for (const [predicate, transform] of pairs) {
            if (predicate(...args)) {
                return transform(...args);
            }
        }
    };
}

// Creates a function that checks if all properties of a source object conform to corresponding predicate functions
function conforms(
    source: Record<string, (value: unknown) => boolean>,
): (object: Record<string, unknown>) => boolean {
    return function (object: Record<string, unknown>): boolean {
        for (const key in source) {
            if (!source[key](object[key])) {
                return false;
            }
        }
        return true;
    };
}

// Returns a function that always returns a constant value
function constant(value: unknown): Function {
    return function (): unknown {
        return value;
    };
}

// Creates a composed function by chaining multiple functions together
function flow(...funcs: Function[]): Function {
    return function (...args: unknown[]): unknown {
        return funcs.reduce((result, func) => func(result), args);
    };
}

// Creates a composed function by chaining multiple functions together in reverse order
function flowRight(...funcs: Function[]): Function {
    return function (...args: unknown[]): unknown {
        return funcs.reduceRight((result, func) => func(result), args);
    };
}

// Returns the first argument it receives
function identity(value: unknown): unknown {
    return value;
}

// Creates a function that returns the property value at a given path of an object
function iteratee(
    path: string | string[],
    separator = ".",
): (object: Record<string, unknown>) => unknown {
    const pathArray = Array.isArray(path) ? path : path.split(separator);
    return function (object: Record<string, unknown>): unknown {
        let result: unknown = object;
        for (const key of pathArray) {
            if (
                typeof result === "object" &&
                result !== null &&
                key in result
            ) {
                result = (result as Record<string, unknown>)[key];
            } else {
                return undefined;
            }
        }
        return result;
    };
}

// Creates a function that checks if an object has the specified properties and values
function matches(
    source: Record<string, unknown>,
): (object: Record<string, unknown>) => boolean {
    return function (object: Record<string, unknown>): boolean {
        for (const key in source) {
            if (
                Object.prototype.hasOwnProperty.call(source, key) &&
                source[key] !== object[key]
            ) {
                return false;
            }
        }
        return true;
    };
}

// Creates a function that checks if an object has a property with the specified key and value
function matchesProperty(
    path: string | string[],
    value: unknown,
): (object: Record<string, unknown>) => boolean {
    const iterateeFunc = iteratee(path);
    return function (object: Record<string, unknown>): boolean {
        return iterateeFunc(object) === value;
    };
}

// Creates a function that invokes the method at the specified path of an object
function method(
    path: string | string[],
    ...args: unknown[]
): (object: Record<string, unknown>) => unknown {
    const iterateeFunc = iteratee(path);
    return function (object: Record<string, unknown>): unknown {
        const method = iterateeFunc(object) as (...args: unknown[]) => unknown;
        return method.apply(object, args);
    };
}

// Creates a function that invokes the method at the specified path of a provided object
function methodOf(
    object: Record<string, unknown>,
    ...args: unknown[]
): (path: string | string[]) => unknown {
    return function (path: string | string[]): unknown {
        const iterateeFunc = iteratee(path);
        const method = iterateeFunc(object) as (...args: unknown[]) => unknown;
        return method.apply(object, args);
    };
}

// Extends an object with properties from other objects
function mixin<T extends Record<string, unknown>>(
    object: T,
    ...sources: T[]
): T {
    sources.forEach((source) => {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                object[key] = source[key];
            }
        }
    });
    return object;
}

// Creates a function that returns the nth argument it receives
function nthArg(n = 0): Function {
    return function (...args: unknown[]): unknown {
        return args[n];
    };
}

// Creates a function that invokes multiple functions with the same arguments and returns an array of the results
function over(...iteratees: Function[]): Function {
    return function (...args: unknown[]): unknown[] {
        return iteratees.map((iteratee) => iteratee(...args));
    };
}

// Creates a function that checks if all of the provided predicates return true
function overEvery(...predicates: Function[]): Function {
    return function (...args: unknown[]): boolean {
        return predicates.every((predicate) => predicate(...args));
    };
}

// Creates a function that checks if any of the provided predicates return true
function overSome(...predicates: Function[]): Function {
    return function (...args: unknown[]): boolean {
        return predicates.some((predicate) => predicate(...args));
    };
}

// Creates a function that returns the value of a property at a given path of an object
function property(
    path: string | string[],
): (object: Record<string, unknown>) => unknown {
    const iterateeFunc = iteratee(path);
    return function (object: Record<string, unknown>): unknown {
        return iterateeFunc(object);
    };
}

// Creates a function that returns the value of a property at a given path of a provided object
function propertyOf(
    object: Record<string, unknown>,
): (path: string | string[]) => unknown {
    return function (path: string | string[]): unknown {
        const iterateeFunc = iteratee(path);
        return iterateeFunc(object);
    };
}

// Creates an array of numbers in the specified range
function range(start: number, end?: number, step = 1): number[] {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    const result = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

// Creates an array of numbers in the specified range in reverse order
function rangeRight(start: number, end?: number, step = 1): number[] {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    const result = [];
    for (let i = end - step; i >= start; i -= step) {
        result.push(i);
    }
    return result;
}

// Runs a function inside a specified context
function runInContext(context: object): Function {
    return function (func: Function): unknown {
        return func.call(context);
    };
}

// Returns a function that does nothing and returns undefined
function stubFunction(): () => undefined {
    return () => undefined;
}

// Returns a new empty array
function stubArray(): unknown[] {
    return [];
}

// Returns false
function stubFalse(): boolean {
    return false;
}

// Returns an empty object
function stubObject(): object {
    return {};
}

// Returns an empty string
function stubString(value?: string): string {
    return value || "";
}

// Returns true
function stubTrue(): boolean {
    return true;
}

// Invokes a provided function a specified number of times and returns an array of the results
function times(n: number, iteratee: (index: number) => unknown): unknown[] {
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(iteratee(i));
    }
    return result;
}

// Converts a string to an array of its property paths
function toPath(value: string | string[], separator = "."): string[] {
    return Array.isArray(value) ? value : value.split(separator);
}

// Generates a unique ID
function uniqueId(): string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
}

function unixTimestamp(date = Date.now()) {
    return Math.floor(date / 1000);
}

function getType(val: unknown): string {
    return Object.prototype.toString.call(val).slice(8, -1);
}

function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;

    if (
        typeof a === "object" &&
        a !== null &&
        typeof b === "object" &&
        b !== null
    ) {
        const aIsArray = Array.isArray(a);
        const bIsArray = Array.isArray(b);

        if (aIsArray !== bIsArray) return false;

        if (aIsArray && bIsArray) {
            if ((a as unknown[]).length !== (b as unknown[]).length)
                return false;

            for (let i = 0; i < (a as unknown[]).length; i++) {
                if (!deepEqual((a as unknown[])[i], (b as unknown[])[i]))
                    return false;
            }

            return true;
        }

        const aKeys = Object.keys(a as object);
        const bKeys = Object.keys(b as object);

        if (aKeys.length !== bKeys.length) return false;

        for (const key of aKeys) {
            if (
                !bKeys.includes(key) ||
                !deepEqual(
                    (a as { [key: string]: unknown })[key],
                    (b as { [key: string]: unknown })[key],
                )
            )
                return false;
        }

        return true;
    }

    return false;
}

function shallowEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;

    if (
        typeof a === "object" &&
        a !== null &&
        typeof b === "object" &&
        b !== null
    ) {
        const aKeys = Object.keys(a as object);
        const bKeys = Object.keys(b as object);

        if (aKeys.length !== bKeys.length) return false;

        for (const key of aKeys) {
            if (
                !bKeys.includes(key) ||
                (a as { [key: string]: unknown })[key] !==
                    (b as { [key: string]: unknown })[key]
            )
                return false;
        }

        return true;
    }

    return false;
}

export {
    assign,
    assignIn,
    assignInWith,
    assignWith,
    bindAll,
    cond,
    conforms,
    constant,
    create,
    deepEqual,
    defaults,
    defaultsDeep,
    findKey,
    findLastKey,
    flattenObject,
    flow,
    flowRight,
    forIn,
    forInRight,
    forOwn,
    forOwnRight,
    functions,
    functionsIn,
    get,
    getType,
    has,
    identity,
    invert,
    invertBy,
    invoke,
    iteratee,
    keys,
    keysIn,
    mapKeys,
    mapValues,
    matches,
    matchesProperty,
    merge,
    mergeWith,
    method,
    methodOf,
    mixin,
    nthArg,
    omit,
    omitBy,
    over,
    overEvery,
    overSome,
    pick,
    pickBy,
    property,
    propertyOf,
    range,
    rangeRight,
    result,
    runInContext,
    set,
    setWith,
    shallowEqual,
    stubArray,
    stubFalse,
    stubFunction,
    stubObject,
    stubString,
    stubTrue,
    tap,
    thru,
    times,
    toPairs,
    toPairsIn,
    toPath,
    transform,
    uniqueId,
    unixTimestamp,
    unset,
    update,
    updateWith,
    valueAt,
    values,
    valuesIn,
};
