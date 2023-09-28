/* eslint-disable @typescript-eslint/ban-types */

import { UnaryFunction } from "../types";

/**
 * Creates a function that accepts up to `n` arguments, ignoring unknown additional arguments.
 */
function ary(
    func: (...args: unknown[]) => unknown,
    n: number,
): (...args: unknown[]) => unknown {
    return function (...args: unknown[]) {
        return func(...args.slice(0, n));
    };
}

/**
 * Creates a function that invokes `func` only before the specified `n` calls.
 */
function before<T extends Function>(n: number, func: T): T {
    let count = 0;
    let result: unknown;
    return function (this: unknown, ...args: unknown[]) {
        if (count < n) {
            count++;
            result = func.apply(this, args);
        }
        return result;
    } as unknown as T;
}

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg` and prepends unknown additional supplied arguments.
 */
function bind(
    func: Function,
    thisArg: unknown,
    ...partials: unknown[]
): Function {
    return func.bind(thisArg, ...partials);
}

/**
 * Creates a function that invokes the method at `object[key]` with the `this` binding of `object` and prepends unknown additional supplied arguments.
 */
function bindKey<T, K extends keyof T>(
    object: T,
    key: K,
    ...partials: unknown[]
): (...args: unknown[]) => unknown {
    const func = object[key];
    if (typeof func !== "function") {
        throw new Error("Expected a function");
    }
    return func.bind(object, ...partials);
}

/**
 * Creates a curried function that invokes `func` with arguments provided one at a time.
 */
function curry<T extends (...args: unknown[]) => unknown>(
    func: T,
    arity = func.length,
): T {
    return function curried(this: unknown, ...args: unknown[]): unknown {
        if (args.length >= arity) {
            return func.apply(this, args);
        }
        return (...nextArgs: unknown[]): unknown => {
            return curried.apply(this, args.concat(nextArgs));
        };
    } as T;
}

/**
 * Creates a curried function that invokes `func` with arguments provided in reverse order.
 */
function curryRight<T extends (...args: unknown[]) => unknown>(
    func: T,
    arity = func.length,
): T {
    return function curried(this: unknown, ...args: unknown[]): unknown {
        if (args.length >= arity) {
            return func.apply(this, args);
        }
        return (...nextArgs: unknown[]): unknown => {
            return curried.apply(this, nextArgs.concat(args));
        };
    } as T;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.
 */
function debounce(func: Function, wait = 0): Function {
    let timeout: NodeJS.Timeout;
    return function debounced(this: unknown, ...args: unknown[]): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

/**
 * Defers invoking the `func` until the current call stack has cleared.
 */
function defer(func: Function): void {
    setTimeout(func, 0);
}

/**
 * Invokes `func` after `wait` milliseconds.
 */
function delay(func: Function, wait = 0, ...args: unknown[]): void {
    setTimeout(() => {
        func(...args);
    }, wait);
}

/**
 * Creates a function that invokes `func` with arguments reversed.
 */
function flip(func: Function): Function {
    return function (this: unknown, ...args: unknown[]): unknown {
        return func.apply(this, args.reverse());
    };
}

/**
 * Creates a memoized function that caches the result of `func` for the given argument.
 */
function memoize(func: Function): Function {
    const cache: Record<string, unknown> = {};
    return function (this: unknown, ...args: unknown[]): unknown {
        const key = JSON.stringify(args);
        if (cache[key] === undefined) {
            cache[key] = func.apply(this, args);
        }
        return cache[key];
    };
}

/**
 * Creates a negated version of `predicate` function.
 */
function negate(predicate: Function): Function {
    return function (this: unknown, ...args: unknown[]): boolean {
        return !predicate.apply(this, args);
    };
}

/**
 * Creates a function that invokes `func` only once. Subsequent calls to the returned function will return the result of the first call.
 */
function once(func: Function): Function {
    let result: unknown;
    let executed = false;
    return function (this: unknown, ...args: unknown[]): unknown {
        if (!executed) {
            result = func.apply(this, args);
            executed = true;
        }
        return result;
    };
}

/**
 * Creates a function that invokes `func` with arguments transformed by corresponding `transforms`.
 */
function overArgs(func: Function, transforms: Function[]): Function {
    return function (this: unknown, ...args: unknown[]): unknown {
        const transformedArgs = args.map(
            (arg, index) => transforms[index]?.call(this, arg) ?? arg,
        );
        return func.apply(this, transformedArgs);
    };
}

/**
 * Creates a partially applied function by filling in `partials` argument placeholders.
 */
function partial(func: Function, ...partials: unknown[]): Function {
    return function (this: unknown, ...args: unknown[]): unknown {
        const combinedArgs = partials.map((partial) =>
            partial === undefined ? args.shift() : partial,
        );
        return func.apply(this, combinedArgs.concat(args));
    };
}

/**
 * Creates a partially applied function by filling in `partials` argument placeholders from the right.
 */
function partialRight(func: Function, ...partials: unknown[]): Function {
    return function (this: unknown, ...args: unknown[]): unknown {
        const combinedArgs = partials
            .reverse()
            .map((partial) => (partial === undefined ? args.pop() : partial))
            .reverse();
        return func.apply(this, combinedArgs.concat(args));
    };
}

/**
 * Creates a function that invokes `func` with arguments rearranged according to the specified `indexes`.
 */
function rearg(func: Function, indexes: number[]): Function {
    return function (this: unknown, ...args: unknown[]): unknown {
        const rearrangedArgs = indexes.map((index) => args[index]);
        return func.apply(this, rearrangedArgs);
    };
}

/**
 * Creates a function that invokes `func` with the rest arguments it receives.
 */
function rest(func: Function, start = func.length - 1): Function {
    return function (this: unknown, ...args: unknown[]): unknown {
        const restArgs = args.slice(start);
        const initialArgs = args.slice(0, start);
        return func.apply(this, [initialArgs, ...restArgs]);
    };
}

/**
 * Creates a function that invokes `func` with an array of arguments, spreading them out.
 */
function spread(func: Function): Function {
    return function (this: unknown, argsArray: unknown[]): unknown {
        return func.apply(this, argsArray);
    };
}

/**
 * Creates a throttled function that invokes `func` at most once per every `wait` milliseconds.
 */
function throttle(func: Function, wait = 0): Function {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;
    return function throttled(this: unknown, ...args: unknown[]): void {
        const now = Date.now();
        const remaining = wait - (now - previous);
        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

/**
 * Creates a function that accepts only one argument, discarding unknown additional arguments.
 */
function unary(func: Function): Function {
    return function (this: unknown, arg: unknown): unknown {
        return func.call(this, arg);
    };
}

/**
 * Wraps `func` to enable currying.
 */
function wrap(
    func: (...args: unknown[]) => unknown,
    wrapper: (...args: unknown[]) => unknown,
): (...args: unknown[]) => unknown {
    return curry(wrapper, func.length)(func) as (...args: unknown[]) => unknown;
}

/**
 * Invokes `func` when it is called `n` or more times.
 */
function after(n: number, func: Function): Function {
    let count = 0;
    return function (this: unknown, ...args: unknown[]): unknown {
        count++;
        if (count >= n) {
            return func.apply(this, args);
        }
    };
}

/**
 * Creates a pipeline of synchronous unary functions and returns a new function.
 * When the returned function is called with an argument, it passes that argument
 * through each function in the pipeline, starting with the first function, and
 * returns the final result.
 *
 * @param first The first function to apply in the pipeline.
 * @param fns The rest of the functions to apply in the pipeline.
 * @returns A new function that applies the pipeline to its argument.
 */
function pipe<T>(
    first: UnaryFunction<T, T>,
    ...fns: Array<UnaryFunction<T, T>>
): (initial: T) => T {
    return function (initial: T): T {
        return fns.reduce((prev, fn) => fn(prev), first(initial));
    };
}

/**
 * Similar to the `pipe` function, but designed for asynchronous unary functions.
 * It creates a pipeline of asynchronous functions and returns a new function.
 * When the returned function is called with an argument, it asynchronously
 * passes that argument through each function in the pipeline, awaiting each
 * function before applying the next one, and returns a Promise of the final result.
 *
 * @param first The first async function to apply in the pipeline.
 * @param fns The rest of the async functions to apply in the pipeline.
 * @returns A new function that applies the pipeline to its argument.
 */
function pipeAsync<T>(
    first: UnaryFunction<T, Promise<T>>,
    ...fns: Array<UnaryFunction<T, Promise<T>>>
): (initial: T) => Promise<T> {
    return async function (initial: T): Promise<T> {
        return await fns.reduce(
            async (prev, fn) => fn(await prev),
            first(initial),
        );
    };
}

/**
 * Composes multiple functions into a single function that applies them in right-to-left order.
 *
 * @template T - The type of the input and output values.
 * @param {...((input: T) => T)[]} fns - The functions to compose.
 * @returns {(input: T) => T} A function that applies the composed functions to the input value.
 */
function compose<T>(...fns: ((input: T) => T)[]): (input: T) => T {
    return (input: T) => fns.reduceRight((acc, fn) => fn(acc), input);
}

export {
    after,
    ary,
    before,
    bind,
    bindKey,
    compose,
    curry,
    curryRight,
    debounce,
    defer,
    delay,
    flip,
    memoize,
    negate,
    once,
    overArgs,
    partial,
    partialRight,
    pipe,
    pipeAsync,
    rearg,
    rest,
    spread,
    throttle,
    unary,
    wrap,
};
