export interface JsonPropertyInfo {
    name: string;
    type: null | string;
    value: unknown;
}

function getJsonPropertyInfos(obj: unknown): JsonPropertyInfo[] {
    const result: JsonPropertyInfo[] = [];
    const walked: unknown[] = [];
    const stack: {
        obj: unknown;
        stack: string;
    }[] = [{ obj: obj, stack: "" }];

    while (stack.length > 0) {
        const { obj: itemObj, stack: itemStack } = stack.pop() as {
            obj: unknown;
            stack: string;
        };

        if (typeof itemObj === "object" && itemObj !== null) {
            for (const property in itemObj as Record<string, unknown>) {
                if (Object.prototype.hasOwnProperty.call(itemObj, property)) {
                    const value = (itemObj as Record<string, unknown>)[
                        property
                    ];
                    const valueType = typeof value;

                    if (valueType === "object" && value != null) {
                        if (!walked.includes(value)) {
                            walked.push(value);
                            const newStack = itemStack
                                ? `${itemStack}.${property}`
                                : property;
                            stack.push({ obj: value, stack: newStack });
                        }
                    }

                    result.push({
                        name: itemStack ? `${itemStack}.${property}` : property,
                        type: valueType,
                        value: value,
                    });
                }
            }
        }
    }
    return result;
}

function getJsonProperties(obj: unknown, hasIndexer = true): string[] {
    return getJsonPropertyInfos(obj)
        .map((prop) =>
            hasIndexer ? prop.name.replace(/\.[0-9]+/g, "") : prop.name,
        )
        .filter((prop, index, self) => self.indexOf(prop) === index);
}

function getJsonPropertiesWithType(obj: unknown, hasIndexer = true): string[] {
    return getJsonPropertyInfos(obj)
        .map((prop) =>
            hasIndexer
                ? `${prop.name.replace(/\.[0-9]+/g, "")}-${prop.type}`
                : `${prop.name}-${prop.type}`,
        )
        .filter((prop, index, self) => self.indexOf(prop) === index);
}

function isValidJson(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

function tryValidateJson(str: string): { isValid: boolean; value: unknown } {
    try {
        const val = JSON.parse(str) as Record<string, unknown>;
        return {
            isValid: true,
            value: val,
        };
    } catch (e) {
        return {
            isValid: false,
            value: undefined,
        };
    }
}

function getObjectKeyValuePairs(
    obj: Record<string, unknown>,
    separator = ".",
): [string, unknown][] {
    return extract(obj);

    function extract(
        obj: Record<string, unknown>,
        parentKey?: string,
    ): [string, unknown][] {
        return Object.entries(obj).flatMap(([key, value]) => {
            const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
            if (typeof value === "object" && value !== null) {
                return extract(value as Record<string, unknown>, newKey);
            } else {
                return [[newKey, value]];
            }
        });
    }
}

function flattenJson(
    obj: Record<string, unknown>,
    separator: string,
    prefix = "",
): Record<string, unknown> {
    return flattenRecursively(obj, separator, prefix, {});

    function flattenRecursively(
        obj: Record<string, unknown>,
        separator: string,
        prefix: string,
        result: Record<string, unknown> = {},
    ): Record<string, unknown> {
        Object.entries(obj).forEach(([key, value]) => {
            const newKey = prefix ? `${prefix}${separator}${key}` : key;
            if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            ) {
                flattenRecursively(
                    value as Record<string, unknown>,
                    separator,
                    newKey,
                    result,
                );
            } else {
                result[newKey] = value;
            }
        });
        return result;
    }
}

function unflattenJson(
    obj: Record<string, unknown>,
    separator: string,
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    Object.entries(obj).forEach(([key, value]) => {
        key.split(separator).reduce(
            (
                current: Record<string, unknown>,
                part: string,
                index: number,
                keys: string[],
            ) => {
                if (index === keys.length - 1) {
                    current[part] = value;
                } else {
                    current[part] = current[part] || {};
                }
                return current[part] as Record<string, unknown>;
            },
            result,
        );
    });
    return result;
}

export {
    flattenJson,
    getJsonProperties,
    getJsonPropertiesWithType,
    getJsonPropertyInfos,
    getObjectKeyValuePairs,
    isValidJson,
    tryValidateJson,
    unflattenJson,
};
