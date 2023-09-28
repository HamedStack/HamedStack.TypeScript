type CallbackFunction = () => void;
type CallbackFunctionVariadic = (...args: unknown[]) => void;
type CallbackFunctionVariadicReturn = (...args: unknown[]) => unknown;

type CallbackPromiseFunction = () => Promise<void>;
type CallbackPromiseFunctionVariadic = (...args: unknown[]) => Promise<void>;
type CallbackPromiseFunctionVariadicReturn = (
    ...args: unknown[]
) => Promise<unknown>;

export {
    CallbackFunction,
    CallbackFunctionVariadic,
    CallbackFunctionVariadicReturn,
    CallbackPromiseFunction,
    CallbackPromiseFunctionVariadic,
    CallbackPromiseFunctionVariadicReturn,
};
