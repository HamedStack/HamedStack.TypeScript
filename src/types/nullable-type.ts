type Nullable<T> = T | null;

type ExcludeNull<T> = Exclude<T, null>;

export { ExcludeNull, Nullable };
