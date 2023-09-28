type CssProperties = Record<
    string,
    CssNestedProperties | boolean | number | string
>;

interface CssNestedProperties extends Record<string, unknown> {
    [k: string]: CssNestedProperties | boolean | number | string;
}

/**
 * Converts a CSS object to a CSS string.
 * @param {CssProperties | CssNestedProperties} cssObj - The CSS object to convert.
 * @returns {string} The CSS string.
 * @throws {TypeError} If the input is not a valid CSS object.
 */
function toCss(cssObj: CssNestedProperties | CssProperties): string {
    return convertToCss(cssObj, []);
}

/**
 * Converts a CSS object to a CSS string recursively.
 * @param {CssProperties | CssNestedProperties} cssObj - The CSS object to convert.
 * @param {string[]} parentSelectors - The array of parent selectors.
 * @returns {string} The CSS string.
 * @throws {TypeError} If the input is not a valid CSS object.
 */
function convertToCss(
    cssObj: CssNestedProperties | CssProperties,
    parentSelectors: string[] = [],
): string {
    if (!cssObj || typeof cssObj !== "object" || Array.isArray(cssObj)) {
        throw new TypeError(
            `Expected an argument of type object, but got ${typeof cssObj}`,
        );
    }

    const lines: string[] = [];
    const atRules: string[] = [];

    for (const [key, value] of Object.entries(cssObj)) {
        const selectors = [...parentSelectors];

        if (key.startsWith("--")) {
            if (typeof value === "string" || typeof value === "number") {
                lines.push(`${key}: ${value};`);
            } else {
                throw new TypeError(
                    `Expected a value of type string or number for CSS variable, but got ${typeof value}`,
                );
            }
            continue;
        }

        if (key.startsWith("@")) {
            if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            ) {
                atRules.push(
                    `${key} { ${convertToCss(
                        value as CssNestedProperties,
                        [],
                    )} }`,
                );
            } else {
                throw new TypeError(
                    `Expected an object for CSS at-rule, but got ${typeof value}`,
                );
            }
            continue;
        }

        if (key.startsWith("&")) {
            selectors[selectors.length - 1] += key.slice(1);
        } else {
            selectors.push(caseConverter(key));
        }

        if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
        ) {
            lines.push(
                `${convertToCss(value as CssNestedProperties, selectors)}`,
            );
        } else if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            lines.push(`${selectors.join(" ")}: ${value};`);
        } else {
            throw new TypeError(
                `Expected a value of type string, number, or boolean, but got ${typeof value}`,
            );
        }
    }

    return [...lines, ...atRules].join(" ");

    /**
     * Converts a string to kebab-case.
     * @param {string} str - The string to convert.
     * @returns {string} The converted string in kebab-case.
     */
    function caseConverter(str: string): string {
        if (str.length === 0) return str;
        const isUppercase = str[0] === str[0].toUpperCase();
        const result = str
            .split(/(?=[A-Z])/)
            .join("-")
            .toLowerCase();
        return isUppercase ? `-${result}` : result;
    }
}

export { CssNestedProperties, CssProperties, toCss };
