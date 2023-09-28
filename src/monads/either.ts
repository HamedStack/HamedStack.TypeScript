type EitherType<L, R> = { tag: "Left"; value: L } | { tag: "Right"; value: R };

class Either {
    static Left<L>(value: L): EitherType<L, never> {
        return { tag: "Left", value };
    }

    static Right<R>(value: R): EitherType<never, R> {
        return { tag: "Right", value };
    }

    static equals<L, R>(
        e1: EitherType<L, R>,
        e2: EitherType<L, R>,
        equalityFn: (a: R, b: R) => boolean = (a, b) => a === b,
    ): boolean {
        return (
            (this.isRight(e1) &&
                this.isRight(e2) &&
                equalityFn(e1.value, e2.value)) ||
            (this.isLeft(e1) && this.isLeft(e2) && e1.value === e2.value)
        );
    }

    static flatMap<L, R, R2>(
        f: (value: R) => EitherType<L, R2>,
        e: EitherType<L, R>,
    ): EitherType<L, R2> {
        return this.isRight(e) ? f(e.value) : e;
    }

    static fold<L, R, T>(
        onLeft: (value: L) => T,
        onRight: (value: R) => T,
        e: EitherType<L, R>,
    ): T {
        return this.isRight(e) ? onRight(e.value) : onLeft(e.value);
    }

    static getOrElse<L, R>(defaultValue: R, e: EitherType<L, R>): R {
        return this.isRight(e) ? e.value : defaultValue;
    }

    static isLeft<L, R>(e: EitherType<L, R>): e is { tag: "Left"; value: L } {
        return e.tag === "Left";
    }

    static isRight<L, R>(e: EitherType<L, R>): e is { tag: "Right"; value: R } {
        return e.tag === "Right";
    }

    static map<L, R, R2>(
        f: (value: R) => R2,
        e: EitherType<L, R>,
    ): EitherType<L, R2> {
        return this.isRight(e) ? this.Right(f(e.value)) : e;
    }

    static orElse<L, R, L2>(
        f: (value: L) => EitherType<L2, R>,
        e: EitherType<L, R>,
    ): EitherType<L2, R> {
        return this.isLeft(e) ? f(e.value) : e;
    }
}

export { Either, EitherType };
