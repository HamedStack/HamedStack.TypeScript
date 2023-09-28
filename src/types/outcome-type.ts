interface Outcome<T> {
    hasError: boolean;
    value: Error | T;
}

export { Outcome };
