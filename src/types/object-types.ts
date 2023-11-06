/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { DeepPartial } from "./array-types";

type RequiredProperties<T, K extends keyof T> = {
    [P in K]-?: T[P];
};

type ReadonlyProperties<T> = { readonly [K in keyof T]: T[K] };
type OptionalProperties<T> = { [K in keyof T]?: T[K] };

type ReadonlyPromise<T> = Promise<Readonly<T>>;
type OptionalPromise<T> = Promise<T | undefined>;
type ReadonlyObjectValue<T> = { readonly [K in keyof T]: T[K] };
type OptionalObjectValue<T> = { [K in keyof T]?: T[K] };

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ExcludeProperties<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type ExcludeValues<T, V> = {
    [P in keyof T]: T[P] extends V ? never : P;
}[keyof T];
type Partialize<T, K extends keyof T> = { [P in K]: T[P] } & Partial<
    Omit<T, K>
>;
type ObjectKeys<T> = keyof T;
type Difference<T, U> = T extends U ? never : T;
type Intersection<T, U> = T extends U ? T : never;

type PickWithKeys<T, K extends keyof T> = Pick<T, K>;
type ValueOf<T, K extends keyof T> = T[K];
type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
type ReadonlyKeys<T> = {
    [K in keyof T]-?: Readonly<T[K]> extends T[K] ? K : never;
}[keyof T];
type WriteableKeys<T> = {
    [K in keyof T]-?: Readonly<T[K]> extends T[K] ? never : K;
}[keyof T];
type WriteableObject<T> = { -readonly [K in keyof T]: T[K] };

type Strict<T> = T & { [K in keyof T]-?: T[K] };
type LiteralUnion<T extends U, U> = T | (U & {});

type Head<T> = T extends [infer I, ...infer _] ? I : never;

type Tail<T> = T extends [infer _, ...infer Rest] ? Rest : never;

type DeepPartialObject<T> = { [K in keyof T]?: DeepPartial<T[K]> };

type ExtractKeys<T> = T extends Record<infer K, unknown> ? K : never;

type ObjectWith<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type InstanceType<C extends new (...args: unknown[]) => unknown> =
    C extends new (...args: unknown[]) => infer I ? I : never;

type JoinPath<
    ParentPath extends string,
    Segment extends string,
> = "" extends ParentPath ? Segment : `${ParentPath}.${Segment}`;

type Literal<T> = T extends boolean | number | string
    ? ReturnType<T["valueOf"]>
    : T;

type KeyOfUnion<T> = T extends unknown ? keyof T : never;


type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

type Combine<T1, T2> = Prettify<
    {
        [K in keyof (T1 | T2)]: T1[K] | T2[K];
    } & Partial<T1 & T2>>;

type MapByKeys<T extends Record<string, unknown>, K extends keyof T = keyof T> = { [P in K]: T[P]; };


export {
    DeepPartialObject,
    DeepReadonly,
    Difference,
    ExcludeProperties,
    ExcludeValues,
    ExtractKeys,
    Head,
    InstanceType,
    Intersection,
    JoinPath,
    KeyOfUnion,
    Literal,
    LiteralUnion,
    ObjectKeys,
    ObjectWith,
    OptionalKeys,
    OptionalObjectValue,
    OptionalPromise,
    OptionalProperties,
    Partialize,
    PickWithKeys,
    ReadonlyKeys,
    ReadonlyObjectValue,
    ReadonlyPromise,
    ReadonlyProperties,
    RequiredKeys,
    RequiredProperties,
    Strict,
    Tail,
    ValueOf,
    WriteableKeys,
    WriteableObject,
    Prettify,
    Combine,
    MapByKeys,
};
