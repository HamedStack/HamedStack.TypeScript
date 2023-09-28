import { Nullable } from "../types";

/**
 * Maybe Monad for handling nullable values in a safe way.
 */
class Maybe<T> {
    /**
     * @param value Nullable value which could be null or T.
     */
    constructor(private value: Nullable<T>) {}

    /**
     * Returns a new Maybe instance containing the given value.
     * @param value Non-nullable value.
     */
    static just<T>(value: T) {
        return new Maybe(value);
    }

    /**
     * Returns a new Maybe instance representing a missing value.
     */
    static nothing<T>() {
        return new Maybe<T>(null);
    }

    /**
     * Checks if the Maybe is equal to another Maybe.
     * @param other The other Maybe to compare with.
     * @param equalityFn A function that checks equality between the underlying values of two Maybes.
     */
    equals(
        other: Maybe<T>,
        equalityFn: (a: T, b: T) => boolean = (a, b) => a === b,
    ) {
        return (
            this.isJust() === other.isJust() &&
            (this.isNothing() || equalityFn(this.value as T, other.value as T))
        );
    }

    /**
     * Applies a function to the Maybe's value if it exists, otherwise does nothing. The function should return another Maybe.
     * @param fn Function to apply to the Maybe's value.
     */
    flatMap<R>(fn: (value: T) => Maybe<R>): Maybe<R> {
        return this.isNothing() ? Maybe.nothing<R>() : fn(this.value as T);
    }

    /**
     * Invokes the appropriate function depending on whether the Maybe is a Just or a Nothing.
     * @param whenNothing Function to invoke if the Maybe is a Nothing.
     * @param whenJust Function to invoke if the Maybe is a Just.
     */
    fold<R>(whenNothing: () => R, whenJust: (value: T) => R): R {
        return this.isNothing() ? whenNothing() : whenJust(this.value as T);
    }

    /**
     * Returns the contained value if the Maybe is a Just. If the Maybe is a Nothing, returns the provided default value.
     * @param defaultValue Default value to return if the Maybe is a Nothing.
     */
    getOrElse(defaultValue: T) {
        return this.isJust() ? (this.value as T) : defaultValue;
    }

    /**
     * Returns the contained value if the Maybe is a Just. If the Maybe is a Nothing, throws the provided error.
     * @param error Error to throw if the Maybe is a Nothing.
     */
    getOrElseThrow(error: Error) {
        if (this.isNothing()) {
            throw error;
        }
        return this.value as T;
    }

    /**
     * Returns true if the Maybe contains a value, false otherwise.
     */
    isJust() {
        return this.value !== null;
    }

    /**
     * Returns true if the Maybe does not contain a value (i.e., it's Nothing), false otherwise.
     */
    isNothing() {
        return !this.isJust();
    }

    /**
     * Transforms the value contained in the Maybe if it exists, otherwise does nothing.
     * @param fn Function to transform the contained value.
     */
    map<R>(fn: (value: T) => R): Maybe<R> {
        return this.isNothing()
            ? Maybe.nothing<R>()
            : Maybe.just(fn(this.value as T));
    }

    /**
     * Returns the Maybe itself if it contains a value, otherwise returns a Maybe containing the provided default value.
     * @param defaultValue Default value to be wrapped in a Maybe if the original Maybe is a Nothing.
     */
    orDefault(defaultValue: T) {
        return this.isNothing() ? Maybe.just(defaultValue) : this;
    }

    /**
     * Returns the Maybe itself if it contains a value, otherwise returns the provided Maybe.
     * @param other Another Maybe to be returned if the original Maybe is a Nothing.
     */
    orJust(other: Maybe<T>) {
        return this.isJust() ? this : other;
    }

    /**
     * Returns the value if it exists, otherwise returns null.
     */
    toNullable(): Nullable<T> {
        return this.value;
    }

    /**
     * Returns a string representation of the Maybe.
     */
    toString() {
        return this.isJust() ? `Just(${this.value})` : "Nothing";
    }
}

export { Maybe };
