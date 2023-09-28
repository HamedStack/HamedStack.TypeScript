/* eslint-disable @typescript-eslint/no-explicit-any */

function createNestedProxyHandler<T>() {
    const createHander = <T>(path: string[] = []) => ({
        get: (target: T, key: keyof T): any => {
            if (key == "isProxy") return true;
            if (typeof target[key] === "object" && target[key] != null)
                return new Proxy(
                    target[key],
                    createHander<any>([...path, key as string]),
                );
            return target[key];
        },
        set: (target: T, key: keyof T, value: any) => {
            target[key] = value;
            return true;
        },
    });
    return createHander<T>();
}

const createNestedProxy = <T>(target: T) =>
    new Proxy(target as object, createNestedProxyHandler<object>());

export { createNestedProxy, createNestedProxyHandler };
