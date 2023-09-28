type Optional<T extends K, K> = Omit<T, keyof K>;

type OptionalArrayOfT<T> = Array<T | undefined>;

export { Optional, OptionalArrayOfT };
