/* eslint-disable @typescript-eslint/no-explicit-any */

type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U>
    ? U
    : never;
type PromiseReturnType<T extends (...args: unknown[]) => any> = PromiseType<
    ReturnType<T>
>;
type ExcludePromise<T> = T extends Promise<unknown> ? never : T;
type PromiseValueType<T> = T extends Promise<infer U> ? U : T;
type PromiseOrValueType<T> = Promise<T> | T;

type PromiseInstanceType<C extends new (...args: unknown[]) => any> =
    PromiseType<InstanceType<C>>;
type ReturnTypeOf<F extends (...args: unknown[]) => unknown> = F extends (
    ...args: unknown[]
) => infer R
    ? R
    : never;

type PromiseOrValueInstanceType<C extends new (...args: unknown[]) => unknown> =
    PromiseOrValueType<InstanceType<C>>;
type ExcludePromiseOrValue<T> = Exclude<T, Promise<T> | T>;

type PromiseReturningFunction<T extends (...args: unknown[]) => unknown> =
    T extends (...args: unknown[]) => Promise<unknown> ? T : never;

type PromiseOfArray<T> = Promise<T[]>;
type PromiseOfObject<T> = Promise<T>;

type PromiseOrValueObject<T> = {
    [K in keyof T]: PromiseOrValueType<T[K]>;
};
type PromiseOrValueTuple<T extends unknown[]> = {
    [K in keyof T]: PromiseOrValueType<T[K]>;
};
type PromiseOrValueArray<T> = Array<PromiseOrValueType<T>>;
type PromiseOrValueFunction<T extends (...args: unknown[]) => unknown> =
    T extends (...args: unknown[]) => infer U ? Promise<U> | U : never;

export {
    ExcludePromise,
    ExcludePromiseOrValue,
    PromiseInstanceType,
    PromiseOfArray,
    PromiseOfObject,
    PromiseOrValueArray,
    PromiseOrValueFunction,
    PromiseOrValueInstanceType,
    PromiseOrValueObject,
    PromiseOrValueTuple,
    PromiseOrValueType,
    PromiseReturnType,
    PromiseReturningFunction,
    PromiseType,
    PromiseValueType,
    ReturnTypeOf,
};
