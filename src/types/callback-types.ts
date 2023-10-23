type CallbackFunction = () => void;
type CallbackFunctionVariadic = (...args: unknown[]) => void;
type CallbackFunctionVariadicReturn = (...args: unknown[]) => unknown;

type CallbackPromiseFunction = () => Promise<void>;
type CallbackPromiseFunctionVariadic = (...args: unknown[]) => Promise<void>;
type CallbackPromiseFunctionVariadicReturn = (
    ...args: unknown[]
) => Promise<unknown>;

type PredicateFunction = (arg: unknown) => boolean;
type PredicateFunctionVariadic = (...args: unknown[]) => boolean;

type PredicateOfTFunction<T> = (arg: T) => boolean;
type PredicateOfTFunctionVariadic<T> = (...args: T[]) => boolean;

export {
    CallbackFunction,
    CallbackFunctionVariadic,
    CallbackFunctionVariadicReturn,
    CallbackPromiseFunction,
    CallbackPromiseFunctionVariadic,
    CallbackPromiseFunctionVariadicReturn,
    PredicateFunction,
    PredicateFunctionVariadic,
    PredicateOfTFunction,
    PredicateOfTFunctionVariadic,
};
