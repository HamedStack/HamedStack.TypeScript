/**
 * Converts a base64-encoded string to a Blob object.
 * @param {string} base64 - The base64-encoded string representing the data.
 * @returns {Blob} The Blob object created from the base64 data.
 * @example
 * // Example usage:
 * const base64Data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgA...";
 * const blob = base64ToBlob(base64Data);
 * console.log(blob); // Blob { ... }
 */
function base64ToBlob(base64: string): Blob {
    const base64Part = base64.substring(base64.indexOf(",") + 1);
    const formatPart = base64.substring(
        base64.indexOf(":") + 1,
        base64.indexOf(";"),
    );
    const binary = toArrayBuffer(atob(base64Part));
    const blob = new Blob([binary], { type: formatPart });
    return blob;
    function toArrayBuffer(base64Image: string) {
        const length = base64Image.length;
        const buf = new ArrayBuffer(length);
        const arr = new Uint8Array(buf);
        for (let i = 0; i < length; i++) {
            arr[i] = base64Image.charCodeAt(i);
        }
        return buf;
    }
}

export { base64ToBlob };
