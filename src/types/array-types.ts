type TypedArray =
    | Float32Array
    | Float64Array
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array;

type FirstElement<T extends unknown[]> = T extends [infer U, ...unknown[]]
    ? U
    : never;
type LastElement<T extends unknown[]> = T extends [...unknown[], infer U]
    ? U
    : never;

type NonEmptyArray<T> = [T, ...T[]];

type OptionalArray<T> = Array<T | undefined>;

type ArrayType<T> = T extends (infer U)[] ? U : never;

type DeepPartial<T> = T extends unknown[]
    ? DeepPartialArray<T[number]>
    : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T | undefined;

type DeepPartialArray<T> = Array<DeepPartial<T>>;

type ExcludeArray<T> = T extends Array<unknown> ? never : T;

export {
    ArrayType,
    DeepPartial,
    DeepPartialArray,
    ExcludeArray,
    FirstElement,
    LastElement,
    NonEmptyArray,
    OptionalArray,
    TypedArray,
};
