import { getISO8601Now } from "./date-utilities";

function sleepAsync(milliseconds = 250): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
function sleep(milliseconds = 250) {
    const now = new Date().getTime();
    while (new Date().getTime() < now + milliseconds);
}

async function promiseWrap<T>(promise: Promise<T>, onfinally?: () => void) {
    try {
        const data = await promise;
        return [data, undefined];
    } catch (err) {
        return [undefined, err];
    } finally {
        if (onfinally) {
            onfinally();
        }
    }
}

function toPromise<T>(value: T): Promise<T> {
    return Promise.resolve(value);
}

const promisify = (fn: (...args: unknown[]) => void) => {
    return (...args: unknown[]) => {
        return new Promise((resolve, reject) => {
            function customCallback(err: Error | null, ...results: unknown[]) {
                if (err) {
                    return reject(err);
                }
                return resolve(results.length === 1 ? results[0] : results);
            }
            args.push(customCallback);
            fn(...args);
        });
    };
};

export interface PollingOption {
    attempts?: number;
    errorMessage?: string;
    ignoreFailureException?: boolean;
    interval?: number | number[];
    logCallback?: (status: PollingStatus) => void;
    mode: "retry" | "timeout";
    postFailureCallback?: () => boolean | void;
    timeout?: number;
}

export interface PollingStatus {
    attempt: number;
    dateTimeNow: string;
    executionTime: number;
    interval: number;
    maxAttempts: number;
    status: boolean;
}

async function polling(check: () => boolean, option: PollingOption) {
    const defaultOption: PollingOption = {
        attempts: 25,
        errorMessage: undefined,
        ignoreFailureException: false,
        interval: 200,
        logCallback: undefined,
        mode: "timeout",
        postFailureCallback: undefined,
        timeout: 5000,
    };
    const options = { ...defaultOption, ...option };
    let attempts = 0;
    let maxAttempts = 0;
    if (!(options.mode == "retry" || options.mode == "timeout")) {
        throw new Error("mode must be either 'retry' or 'timeout'");
    }
    if (options.mode == "timeout" && !options.timeout && !options.interval) {
        throw new Error(
            "timeout and interval must be provided when mode is 'timeout'",
        );
    }
    if (options.mode == "retry" && !options.attempts) {
        throw new Error("attempts must be provided when mode is 'retry'");
    }
    if (options.mode == "timeout" && options.timeout && options.interval) {
        const interval = Array.isArray(options.interval)
            ? options.interval[options.interval.length - 1]
            : options.interval;
        attempts = Math.floor(options.timeout / interval);
        maxAttempts = attempts;
        if (!options.errorMessage) options.errorMessage = "Timed out retrying.";
    }
    if (options.mode == "retry" && options.attempts) {
        attempts = options.attempts;
        maxAttempts = options.attempts;
        if (!options.errorMessage)
            options.errorMessage = "Retried too many times.";
    }

    let waitTime: number[] = [];
    if (options.interval) {
        if (Array.isArray(options.interval)) {
            waitTime = options.interval.reverse();
        } else {
            waitTime = [options.interval];
        }
    }

    const execute = async (
        resolve: (arg0: boolean) => unknown,
        reject: (arg0: string) => unknown,
    ) => {
        let currentWaitTime = 0;
        if (Array.isArray(options.interval)) {
            if (options.interval.length > 1) {
                if (option.mode != "timeout")
                    currentWaitTime = (<number[]>waitTime).pop() as number;
            } else {
                currentWaitTime = waitTime[0];
            }
        } else {
            currentWaitTime = waitTime[0];
        }
        const start = performance.now();
        const result = check();
        const end = performance.now();
        if (result) {
            --attempts;
            if (
                options.logCallback &&
                options.logCallback instanceof Function
            ) {
                options.logCallback({
                    attempt: maxAttempts - attempts,
                    dateTimeNow: getISO8601Now(),
                    executionTime: end - start,
                    interval: currentWaitTime,
                    maxAttempts: maxAttempts,
                    status: result,
                });
            }
            return resolve(result);
        }
        if (attempts < 1) {
            if (
                options.postFailureCallback &&
                options.postFailureCallback instanceof Function
            ) {
                const fnResult = options.postFailureCallback();
                if (fnResult === true || fnResult === false) {
                    return resolve(fnResult);
                }
            } else if (!options.ignoreFailureException)
                return reject(<string>option.errorMessage);
            return;
        }
        if (currentWaitTime) {
            --attempts;
            if (
                options.logCallback &&
                options.logCallback instanceof Function
            ) {
                options.logCallback({
                    attempt: maxAttempts - attempts,
                    dateTimeNow: getISO8601Now(),
                    executionTime: end - start,
                    interval: currentWaitTime,
                    maxAttempts: maxAttempts,
                    status: result,
                });
            }
            setTimeout(execute, currentWaitTime, resolve, reject);
        }
    };
    return new Promise(execute);
}

export interface Abortable {
    abort: (reason?: string) => void;
    readonly abortReason?: string;
}

export interface ExecutorFunction<T> {
    (
        resolve: (value: PromiseLike<T> | T) => void,
        reject: (reason?: unknown) => void,
    ): void;
}

export interface AbortableExecutorFunction<T> {
    (
        resolve: (value: PromiseLike<T> | T) => void,
        reject: (reason?: unknown) => void,
        abortSignal: AbortSignal,
    ): void;
}

class AbortablePromise<T> extends Promise<T> implements Abortable {
    static from = <T>(promise: Promise<T>): AbortablePromise<T> => {
        if (promise instanceof AbortablePromise) {
            return promise;
        }
        return new AbortablePromise<T>((resolve, reject) => {
            promise.then(resolve).catch(reject);
        });
    };
    private _abortReason?: string;

    public abort: Abortable["abort"];
    constructor(executor: AbortableExecutorFunction<T>) {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;

        const normalExecutor: ExecutorFunction<T> = (resolve, reject) => {
            abortSignal.addEventListener("abort", () => {
                reject(new AbortError(this.abortReason));
            });

            executor(resolve, reject, abortSignal);
        };

        super(normalExecutor);
        this.abort = (reason) => {
            this._abortReason = reason ? reason : "Aborted";
            abortController.abort();
        };
    }

    public get abortReason(): string | undefined {
        return this._abortReason;
    }
}

class AbortError extends Error {
    constructor(message = "Aborted") {
        super(message);
        this.name = "AbortError";
    }
}

export {
    AbortError,
    AbortablePromise,
    polling,
    promiseWrap,
    promisify,
    sleep,
    sleepAsync,
    toPromise,
};
