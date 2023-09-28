function assertIsError(error: unknown): asserts error is Error {
    if (!(error instanceof Error)) {
        throw error;
    }
}

function assert(condition: unknown): asserts condition {
    if (!condition) {
        throw new Error("Assertion failed");
    }
}

export { assert, assertIsError };
