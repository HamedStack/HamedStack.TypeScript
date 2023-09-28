/**
 * Represents a successful result containing a value of type TValue.
 * This type is used in the Result type.
 */
type Ok<TValue> = {
    /**
     * Unwraps the result, providing a callback function for handling the successful value.
     * If the result is an Ok, the provided callback is invoked with the value.
     * If an optional onError callback is provided, it's ignored in the Ok case.
     * @param onError (Optional) A callback function to handle errors (ignored in the Ok case).
     * @param onValue A callback function to handle the successful value.
     * @returns The unwrapped value of type TValue.
     */
    unwrap: (onError?: unknown, onValue?: (value: TValue) => void) => TValue;
};

/**
 * Represents an erroneous result containing an error of type TError.
 * This type is used in the Result type.
 */
type Err<TError> = {
    /**
     * Unwraps the result, providing a callback function for handling the error.
     * If the result is an Err, the provided onError callback is invoked with the error.
     * If an optional onValue callback is provided, it's ignored in the Err case.
     * @param onError A callback function to handle the error.
     * @param onValue (Optional) A callback function to handle the successful value (ignored in the Err case).
     * @returns This function never returns, as it throws an error.
     */
    unwrap: (onError?: (err: TError) => void, onValue?: unknown) => never;
};

/**
 * Represents a result that can be either Ok (successful) or Err (erroneous).
 * Use this type to handle operations that may succeed with a value or fail with an error.
 * @typeparam TValue The type of the successful value.
 * @typeparam TError The type of the error.
 */
type Result<TValue, TError> = Err<TError> | Ok<TValue>;

export { Err, Ok, Result };
