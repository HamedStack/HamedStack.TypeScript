import { ResultStatus } from "./result-status";

export class Result<T> {
    public readonly errorMessage: string | null;
    public readonly error: Error | null;
    public readonly hasError: boolean;
    public readonly isConflict: boolean;
    public readonly isFailure: boolean;
    public readonly isForbidden: boolean;
    public readonly isInvalid: boolean;
    public readonly isNotFound: boolean;
    public readonly isSuccess: boolean;
    public readonly isUnauthorized: boolean;
    public readonly isUnsupported: boolean;
    public readonly metaData: { [key: string]: unknown } | null;
    public readonly status: ResultStatus;
    public readonly value: T | null;

    private constructor(
        value: T | null,
        status: ResultStatus,
        error: Error | null = null,
        errorMessage: string | null = null,
        metaData: { [key: string]: unknown } | null = null,
    ) {
        this.hasError = status !== ResultStatus.Success;
        this.value = value;
        this.isSuccess = status === ResultStatus.Success;
        this.isFailure = status === ResultStatus.Failure;
        this.isConflict = status === ResultStatus.Conflict;
        this.isInvalid = status === ResultStatus.Invalid;
        this.isForbidden = status === ResultStatus.Forbidden;
        this.isUnauthorized = status === ResultStatus.Unauthorized;
        this.isUnsupported = status === ResultStatus.Unsupported;
        this.isNotFound = status === ResultStatus.NotFound;
        this.status = status;
        this.error = error;
        this.errorMessage = errorMessage;
        this.metaData = metaData;
    }

    public static conflict<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.Conflict,
            error,
            errorMessage,
            metaData,
        );
    }

    public static failure<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.Failure,
            error,
            errorMessage,
            metaData,
        );
    }

    public static forbidden<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.Forbidden,
            error,
            errorMessage,
            metaData,
        );
    }

    public static invalid<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.Invalid,
            error,
            errorMessage,
            metaData,
        );
    }

    public static notFound<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.NotFound,
            error,
            errorMessage,
            metaData,
        );
    }

    public static success<T>(value: T): Result<T> {
        return new Result<T>(value, ResultStatus.Success);
    }

    public static unauthorized<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.Unauthorized,
            error,
            errorMessage,
            metaData,
        );
    }

    public static unsupported<T>(
        errorMessage?: string,
        error?: Error,
        metaData?: { [key: string]: unknown },
    ): Result<T> {
        return new Result<T>(
            null,
            ResultStatus.Unsupported,
            error,
            errorMessage,
            metaData,
        );
    }

    public addOrUpdateMetadata(key: string, value: unknown): Result<T> {
        if (!key) throw new Error("Value cannot be null or whitespace.");
        const newMetaData = { ...this.metaData, [key]: value };
        return new Result<T>(
            this.value,
            this.status,
            this.error,
            this.errorMessage,
            newMetaData,
        );
    }

    public map<TResult>(mapper: (value: T | null) => TResult): Result<TResult> {
        return this.isSuccess
            ? Result.success(mapper(this.value))
            : Result.failure(
                  this.errorMessage || undefined,
                  this.error || undefined,
                  this.metaData || undefined,
              );
    }
    public recover(recovery: (value: T | null) => Result<T>): Result<T> {
        return this.isSuccess ? this : recovery(this.value);
    }

    public match<TResult>(
        success: (value: T) => TResult,
        failure: (
            errorMessage: string | null,
            error: Error | null,
            metaData: Record<string, unknown> | null,
        ) => TResult,
    ): TResult {
        return this.isSuccess
            ? success(this.value!)
            : failure(this.errorMessage, this.error, this.metaData);
    }

    public unwrapOrNull(): T | null {
        return this.isSuccess ? this.value : null;
    }

    public unwrapOrDefault(defaultValue: T | unknown): T | unknown {
        return this.isSuccess ? this.value : defaultValue;
    }

    public unwrap(): T {
        if (this.isSuccess) {
            return this.value as T;
        }
        throw new Error("Cannot unwrap an failed result.");
    }

    public unwrapOrThrow(errorProvider: () => Error): T {
        if (this.isSuccess) {
            return this.value as T;
        }
        throw errorProvider();
    }
}
