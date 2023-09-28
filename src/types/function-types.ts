/* eslint-disable @typescript-eslint/ban-types */
type UnaryFunction<T, R> = (arg: T) => R;

type ReadonlyFunction<T extends (...args: unknown[]) => unknown> = (
    ...args: Parameters<T>
) => Readonly<ReturnType<T>>;
type OptionalFunction<T extends (...args: unknown[]) => unknown> = (
    ...args: Parameters<T>
) => ReturnType<T> | undefined;

type FunctionArguments<T extends (...args: unknown[]) => unknown> = T extends (
    ...args: infer U
) => unknown
    ? U
    : never;
type FunctionReturn<T extends (...args: unknown[]) => unknown> = T extends (
    ...args: unknown[]
) => infer U
    ? U
    : never;

type FunctionType<T> = T extends (...args: unknown[]) => unknown ? T : never;

type FunctionWith<T, U> = T extends (...args: unknown[]) => unknown
    ? FunctionArguments<T> extends U
        ? T
        : FunctionReturn<T> extends U
        ? T
        : never
    : never;

type ExcludeFunction<T> = T extends Function ? never : T;

export {
    ExcludeFunction,
    FunctionArguments,
    FunctionReturn,
    FunctionType,
    FunctionWith,
    OptionalFunction,
    ReadonlyFunction,
    UnaryFunction,
};
