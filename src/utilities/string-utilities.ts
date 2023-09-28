/**
 * Converts a string to camel case.
 */
function camelCase(str: string): string {
    const words = str.match(/[A-Za-z0-9]+/g) || [];
    if (words.length === 0) {
        return "";
    }
    const firstWord = words[0]?.toLowerCase();
    const restWords = words
        .slice(1)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        );
    return firstWord + restWords.join("");
}

/**
 * Capitalizes the first character of a string.
 */
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Removes diacritical marks from a string.
 */
function deburr(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Checks if a string ends with the given target string.
 */
function endsWith(str: string, target: string, position?: number): boolean {
    if (position === undefined || position > str.length) {
        position = str.length;
    }
    const end = position - target.length;
    return str.slice(end, position) === target;
}

/**
 * Escapes special characters in a string.
 */
function escape(str: string): string {
    return str.replace(/[<>&"']/g, (match) => {
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
            default:
                return match;
        }
    });
}

/**
 * Escapes special characters in a regular expression string.
 */
function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Converts a string to kebab case.
 */
function kebabCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[_\s]+/g, "-")
        .toLowerCase();
}

/**
 * Converts a string to lower case.
 */
function lowerCase(str: string): string {
    return str.toLowerCase();
}

/**
 * Converts the first character of a string to lower case.
 */
function lowerFirst(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Pads a string on both sides with characters until it reaches the given length.
 */
function pad(str: string, length: number, chars = " "): string {
    const strLength = str.length;
    if (strLength >= length) {
        return str;
    }
    const padLength = length - strLength;
    const leftPadding = chars
        .repeat(Math.ceil(padLength / chars.length))
        .slice(0, padLength);
    const rightPadding = chars
        .repeat(Math.ceil(padLength / chars.length))
        .slice(0, padLength - leftPadding.length);
    return leftPadding + str + rightPadding;
}

/**
 * Pads a string on the end with characters until it reaches the given length.
 */
function padEnd(str: string, length: number, chars = " "): string {
    const strLength = str.length;
    if (strLength >= length) {
        return str;
    }
    const padLength = length - strLength;
    const padding = chars
        .repeat(Math.ceil(padLength / chars.length))
        .slice(0, padLength);
    return str + padding;
}

/**
 * Pads a string on the start with characters until it reaches the given length.
 */
function padStart(str: string, length: number, chars = " "): string {
    const strLength = str.length;
    if (strLength >= length) {
        return str;
    }
    const padLength = length - strLength;
    const padding = chars
        .repeat(Math.ceil(padLength / chars.length))
        .slice(0, padLength);
    return padding + str;
}

/**
 * Parses a string to an integer of the specified radix.
 */
function parseInt(str: string, radix = 10): number {
    return Number.parseInt(str, radix);
}

/**
 * Repeats a string `n` times.
 */
function repeat(str: string, n: number): string {
    return str.repeat(n);
}

/**
 * Replaces all occurrences of a pattern in a string with a replacement.
 */
function replace(
    str: string,
    pattern: RegExp | string,
    replacement: string,
): string {
    return str.replace(pattern, replacement);
}

/**
 * Converts a string to snake case.
 */
function snakeCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[_\s]+/g, "_")
        .toLowerCase();
}

/**
 * Splits a string into an array of words.
 */
function split(
    str: string,
    separator: RegExp | string,
    limit?: number,
): string[] {
    return str.split(separator, limit);
}

/**
 * Converts a string to start case (capitalizes the first character of each word).
 */
function startCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_\s]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Checks if a string starts with the given target string.
 */
function startsWith(str: string, target: string, position = 0): boolean {
    return str.slice(position, position + target.length) === target;
}

/**
 * Evaluates a template string with interpolated placeholders.
 */
function template(str: string, placeholders: Record<string, unknown>): string {
    return str.replace(/{{(.*?)}}/g, (_, key) =>
        String(placeholders[key.trim()]),
    );
}

/**
 * Converts a string to lower case.
 */
function toLower(str: string): string {
    return str.toLowerCase();
}

/**
 * Converts a string to upper case.
 */
function toUpper(str: string): string {
    return str.toUpperCase();
}

/**
 * Removes leading and trailing whitespace from a string.
 */
function trim(str: string): string {
    return str.trim();
}

/**
 * Removes trailing whitespace from a string.
 */
function trimEnd(str: string): string {
    return str.trimEnd();
}

/**
 * Removes leading whitespace from a string.
 */
function trimStart(str: string): string {
    return str.trimStart();
}

/**
 * Truncates a string to a specified length.
 */
function truncate(
    str: string,
    options: {
        length: number;
        omission?: string;
        separator?: RegExp | string;
    } = { length: 30, omission: "..." },
): string {
    const { length, omission = "...", separator } = options;
    if (str.length <= length) {
        return str;
    }
    let truncated = str.slice(0, length);
    if (separator) {
        const separatorMatch = truncated.match(new RegExp(separator + "$"));
        if (separatorMatch) {
            truncated = truncated.slice(0, separatorMatch.index);
        }
    }
    return truncated + omission;
}

/**
 * Unescapes special characters in an HTML string.
 */
function unescape(str: string): string {
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (match) => {
        switch (match) {
            case "&amp;":
                return "&";
            case "&lt;":
                return "<";
            case "&gt;":
                return ">";
            case "&quot;":
                return '"';
            case "&#39;":
                return "'";
            default:
                return match;
        }
    });
}

/**
 * Converts a string to upper case.
 */
function upperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * Converts the first character of a string to upper case.
 */
function upperFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Splits a string into an array of words.
 */
function words(str: string, pattern?: RegExp | string): string[] {
    return str.match(pattern || /\b\w+\b/g) || [];
}
/**
 * A function to convert ArrayBuffer to hexadecimal
 */
function toHexAsBuffer(buffer: ArrayBuffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const padding = "00000000";
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}

/**
 * A function to convert string to hexadecimal
 */
function toHex(s: string): string {
    let hex = "";
    for (let i = 0; i < s.length; i++) {
        hex += "" + s.charCodeAt(i).toString(16);
    }
    return hex;
}
/**
 * UUIDv1 generation
 */
function generateUUIDv1(): string {
    const now =
        typeof performance !== "undefined" && performance.now != null
            ? performance.now()
            : Date.now();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (now + Math.random() * 16) % 16 | 0;
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        },
    );
    return uuid;
}

/**
 * UUIDv4 generation
 */
function generateUUIDv4(): string {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        },
    );
}

/**
 * This function takes a string as input and returns an encoded Uint8Array.
 * It uses the TextEncoder object which is a global object in modern browsers.
 * It provides encoding of string data to bytes using UTF-8 encoding.
 *
 * @param message - The string that should be encoded.
 * @returns The encoded Uint8Array.
 */
function encode(message: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(message);
}

/**
 * This function takes a Uint8Array as input and returns a decoded string.
 * It uses the TextDecoder object which is a global object in modern browsers.
 * It provides decoding of text data that has been encoded to bytes.
 *
 * @param data - The Uint8Array that should be decoded.
 * @returns The decoded string.
 */
function decode(data: Uint8Array): string {
    const decoder = new TextDecoder();
    return decoder.decode(data);
}

function isNullOrWhiteSpace(str: string) {
    return str === null || str == "" || str.match(/^ *$/) !== null;
}

function isNullOrEmpty(str: string) {
    return str === null || str == "";
}

function isNotNullOrWhiteSpace(str: string) {
    return !isNullOrWhiteSpace(str);
}

function isNotNullOrEmpty(str: string) {
    return !isNullOrEmpty(str);
}

export {
    camelCase,
    capitalize,
    deburr,
    decode,
    encode,
    endsWith,
    escape,
    escapeRegExp,
    generateUUIDv1,
    generateUUIDv4,
    isNotNullOrEmpty,
    isNotNullOrWhiteSpace,
    isNullOrEmpty,
    isNullOrWhiteSpace,
    kebabCase,
    lowerCase,
    lowerFirst,
    pad,
    padEnd,
    padStart,
    parseInt,
    repeat,
    replace,
    snakeCase,
    split,
    startCase,
    startsWith,
    template,
    toHex,
    toHexAsBuffer,
    toLower,
    toUpper,
    trim,
    trimEnd,
    trimStart,
    truncate,
    unescape,
    upperCase,
    upperFirst,
    words,
};
