type Undefinable<T> = T | undefined;
type ExcludeUndefined<T> = Exclude<T, undefined>;
type ExcludeNullAndUndefined<T> = Exclude<Exclude<T, null>, undefined>;

export { ExcludeNullAndUndefined, ExcludeUndefined, Undefinable };
