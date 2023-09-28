type TupleWithoutFirst<T extends unknown[]> = T extends [unknown, ...infer U]
    ? U
    : never;
type TupleWithoutLast<T extends unknown[]> = T extends [...infer U, unknown]
    ? U
    : never;

type ReadonlyTuple<T extends unknown[]> = ReadonlyArray<T[number]>;
type OptionalTuple<T extends unknown[]> = Array<T[number] | undefined>;
type ExcludeTuple<T> = T extends unknown[] ? never : T;

export {
    ExcludeTuple,
    OptionalTuple,
    ReadonlyTuple,
    TupleWithoutFirst,
    TupleWithoutLast,
};
