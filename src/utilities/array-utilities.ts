/**
 * `chunk` divides an array into chunks of the specified size
 */
function chunk<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

/**
 * `compact` removes all falsy values from an array
 */
function compact<T>(array: T[]): T[] {
    return array.filter((item) => Boolean(item));
}

/**
 * `concat` concatenates multiple arrays
 */
function concat<T>(array: T[], ...arrays: T[][]): T[] {
    return [...array, ...arrays.flat()];
}

/**
 * `difference` creates an array of array values not included in the other given arrays
 */
function difference<T>(array: T[], ...arrays: T[][]): T[] {
    const otherValues = new Set(arrays.flat());
    return array.filter((value) => !otherValues.has(value));
}

/**
 * `drop` creates a slice of array with n elements dropped from the beginning
 */
function drop<T>(array: T[], n = 1): T[] {
    return array.slice(n);
}

/**
 * `fill` fills elements of array with value from start up to, but not including, end
 */
function fill<T>(array: T[], value: T, start = 0, end = array.length): T[] {
    return array.map((v, i) => (i >= start && i < end ? value : v));
}

/**
 * `findIndex` gets the index at which the first occurrence of value is found in array
 */
function findIndex<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean,
    fromIndex = 0,
): number {
    for (let i = fromIndex; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

/**
 * `findLastIndex` is like `findIndex` but it iterates over elements of collection from right to left.
 */
function findLastIndex<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean,
    fromIndex = array.length - 1,
): number {
    for (let i = fromIndex; i >= 0; i--) {
        if (predicate(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

/**
 * `first` gets the first element of array.
 */
function first<T>(array: T[]): T | undefined {
    return array[0];
}

/**
 * `flatten` flattens array a single level deep.
 */
function flatten<T>(array: T[][]): T[] {
    return array.flat();
}

/**
 * `flattenDeep` recursively flattens array.
 */
function flattenDeep<T>(array: unknown[]): T[] {
    return array.reduce(
        (acc: T[], val: unknown) =>
            Array.isArray(val)
                ? acc.concat(flattenDeep(val))
                : acc.concat(val as T),
        [],
    );
}

/**
 * `flattenDepth` recursively flatten array up to depth times.
 */
function flattenDepth(array: unknown[], depth = 1): unknown[] {
    if (depth < 1) return array.slice();
    return array.reduce(
        (acc: unknown[], val: unknown) =>
            Array.isArray(val)
                ? acc.concat(flattenDepth(val, depth - 1))
                : acc.concat(val),
        [],
    );
}

/**
 * `fromPairs` returns an object composed from key-value pairs.
 */
function fromPairs<T extends PropertyKey, U>(pairs: [T, U][]): { [K in T]: U } {
    return pairs.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {} as { [K in T]: U },
    );
}

/**
 * `head` gets the first element of array.
 */
function head<T>(array: T[]): T | undefined {
    return array[0];
}

/**
 * `indexOf` gets the index at which the first occurrence of value is found in array.
 */
function indexOf<T>(array: T[], value: T, fromIndex = 0): number {
    for (let i = fromIndex; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

/**
 * `initial` gets all but the last element of array.
 */
function initial<T>(array: T[]): T[] {
    return array.slice(0, array.length - 1);
}

/**
 * `intersection` creates an array of unique values that are included in all given arrays.
 */
function intersection<T>(...arrays: T[][]): T[] {
    return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
}

/**
 * `join` converts all elements in array into a string separated by separator.
 */
function join<T>(array: T[], separator = ","): string {
    return array.join(separator);
}

/**
 * `last` gets the last element of array.
 */
function last<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

/**
 * `lastIndexOf` gets the index at which the last occurrence of value is found in array.
 */
function lastIndexOf<T>(
    array: T[],
    value: T,
    fromIndex = array.length - 1,
): number {
    for (let i = fromIndex; i >= 0; i--) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

/**
 * `nth` gets the element at index n of array. If n is negative, the nth element from the end is returned.
 */
function nth<T>(array: T[], n = 0): T | undefined {
    return n >= 0 ? array[n] : array[array.length + n];
}

/**
 * `pull` removes all given values from array.
 */
function pull<T>(array: T[], ...values: T[]): T[] {
    return array.filter((value) => !values.includes(value));
}

/**
 * `remove` removes all elements from array that satisfy a condition and returns an array of the removed elements.
 */
function remove<T>(array: T[], predicate: (value: T) => boolean): T[] {
    const removed = array.filter(predicate);
    const remaining = array.filter((value) => !predicate(value));
    array.length = 0;
    array.push(...remaining);
    return removed;
}

/**
 * `reverse` reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
 */
function reverse<T>(array: T[]): T[] {
    return array.slice().reverse();
}

/**
 * `slice` creates a slice of array from start up to, but not including, end.
 */
function slice<T>(array: T[], start = 0, end = array.length): T[] {
    return array.slice(start, end);
}

/**
 * `tail` gets all but the first element of array.
 */
function tail<T>(array: T[]): T[] {
    return array.slice(1);
}

/**
 * `take` creates a slice of array with n elements taken from the beginning.
 */
function take<T>(array: T[], n = 1): T[] {
    return array.slice(0, n);
}

/**
 * `takeRight` creates a slice of array with n elements taken from the end.
 */
function takeRight<T>(array: T[], n = 1): T[] {
    return n === 0 ? [] : array.slice(-n);
}

/**
 * `union` creates an array of unique values, in order, from all given arrays
 */
function union<T>(...arrays: T[][]): T[] {
    return Array.from(new Set(arrays.flat()));
}

/**
 * `uniq` creates a duplicate-free version of an array
 */
function uniq<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

/**
 * `unzip` is the opposite of `zip`. It receives an array of grouped elements and creates an array regrouping them to their pre-zip configuration.
 */
function unzip<T>(array: T[][]): T[][] {
    return array[0].map((_, i) => array.map((row) => row[i]));
}

/**
 * `without` creates an array excluding all given values.
 */
function without<T>(array: T[], ...values: T[]): T[] {
    return array.filter((value) => !values.includes(value));
}

/**
 * `xor` creates an array of unique values that is the symmetric difference of the provided arrays.
 */
function xor<T>(...arrays: T[][]): T[] {
    const allValues = new Set(arrays.flat());
    const repeatedValues = new Set(
        arrays
            .flat()
            .filter(
                (value, i, arr) =>
                    arr.indexOf(value) !== arr.lastIndexOf(value),
            ),
    );
    return Array.from(allValues).filter((value) => !repeatedValues.has(value));
}

/**
 * `zip` creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 */
function zip<T>(...arrays: T[][]): T[][] {
    return arrays[0].map((_, i) => arrays.map((array) => array[i]));
}

/**
 * `zipObject` creates an object composed from arrays of keys and values.
 */
function zipObject<T extends PropertyKey, U>(
    keys: T[],
    values: U[],
): { [K in T]: U } {
    return keys.reduce(
        (acc, key, i) => ({ ...acc, [key]: values[i] }),
        {} as { [K in T]: U },
    );
}

/**
 * `differenceBy` is like `difference` except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which they're compared.
 */
function differenceBy<T>(
    array: T[],
    values: T[],
    iteratee: (value: T) => unknown,
): T[] {
    const set = new Set(values.map(iteratee));
    return array.filter((value) => !set.has(iteratee(value)));
}
/**
 * `pullAll` removes all matching values from array.
 */
function pullAll<T>(array: T[], values: T[]): T[] {
    return array.filter((value) => !values.includes(value));
}

/**
 * `pullAllBy` is like `pullAll` except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which uniqueness is computed.
 */
function pullAllBy<T>(
    array: T[],
    values: T[],
    iteratee: (value: T) => unknown,
): T[] {
    const set = new Set(values.map(iteratee));
    return array.filter((value) => !set.has(iteratee(value)));
}

/**
 * `pullAt` removes elements from array corresponding to indexes and returns an array of the removed elements.
 */
function pullAt<T>(array: T[], indexes: number[]): T[] {
    const pulled = indexes.map((index) => array[index]);
    const remaining = array.filter((_, i) => !indexes.includes(i));
    array.length = 0;
    array.push(...remaining);
    return pulled;
}

/**
 * `sortedIndex` uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order.
 */
function sortedIndex<T>(array: T[], value: T): number {
    let low = 0;
    let high = array.length;

    while (low < high) {
        const mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

/**
 * `unionBy` is like `union` except that it accepts iteratee which is invoked for each element of each arrays to generate the criterion by which uniqueness is computed.
 */
function unionBy<T>(iteratee: (value: T) => unknown, ...arrays: T[][]): T[] {
    const set = new Set();
    return arrays.flat().filter((value) => {
        const computed = iteratee(value);
        if (!set.has(computed)) {
            set.add(computed);
            return true;
        }
        return false;
    });
}

/**
 * `uniqBy` is like `uniq` except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed.
 */
function uniqBy<T>(array: T[], iteratee: (value: T) => unknown): T[] {
    const set = new Set();
    return array.filter((value) => {
        const computed = iteratee(value);
        if (!set.has(computed)) {
            set.add(computed);
            return true;
        }
        return false;
    });
}

/**
 * `zipObjectDeep` is like `zipObject` except that it supports property paths.
 */
function zipObjectDeep<U>(props: string[], values: U[]): unknown {
    const result: Record<string, unknown> = {};
    props.forEach((prop, i) => {
        const path = prop.split(".");
        path.reduce((obj: Record<string, unknown>, key, j) => {
            if (j === path.length - 1) obj[key] = values[i];
            else if (!obj[key]) obj[key] = {};
            return obj[key] as Record<string, unknown>;
        }, result);
    });
    return result;
}

/**
 * `sortedIndexOf` uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order. It accepts a third parameter that determines whether to return the leftmost or rightmost match of the value.
 */
function sortedIndexOf<T>(array: T[], value: T, isRightmost = false): number {
    let low = 0;
    let high = array.length;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (array[mid] < value || (isRightmost && array[mid] === value)) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

/**
 * `sortedLastIndex` is similar to `sortedIndex` except that it returns the highest index at which a value should be inserted into array in order to maintain its sort order.
 */
function sortedLastIndex<T>(array: T[], value: T): number {
    return sortedIndexOf(array, value, true);
}

/**
 * `sortedUniq` is similar to `uniq` except that it’s designed and optimized for sorted arrays.
 */
function sortedUniq<T>(array: T[]): T[] {
    return array.filter((value, index) => array.indexOf(value) === index);
}

/**
 * `takeRightWhile` creates a slice of array with elements taken from the end. Elements are taken until predicate returns falsey.
 */
function takeRightWhile<T>(array: T[], predicate: (value: T) => boolean): T[] {
    let i = array.length;
    while (i-- && predicate(array[i])) {
        /* empty */
    }
    return array.slice(i + 1);
}

/**
 * `takeWhile` creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns falsey.
 */
function takeWhile<T>(array: T[], predicate: (value: T) => boolean): T[] {
    let i = 0;
    while (i < array.length && predicate(array[i])) i++;
    return array.slice(0, i);
}

/**
 * `xorWith` is like `xor`, except that it accepts comparator which is invoked to compare elements of arrays.
 */
function xorWith<T>(arrays: T[][], comparator: (a: T, b: T) => boolean): T[] {
    const allValues = arrays.flat();
    return allValues.filter(
        (value, index) =>
            allValues.findIndex((otherValue) =>
                comparator(value, otherValue),
            ) === index,
    );
}

/**
 * `zipWith` is like `zip` except that it accepts iteratee to specify how grouped values should be combined.
 */
function zipWith<T, U>(arrays: T[][], iteratee: (...values: T[]) => U): U[] {
    return zip(...arrays).map((group) => iteratee(...group));
}
/**
 * `sortedIndexBy` is like `sortedIndex` except that it accepts iteratee which is invoked for each element in array to generate the sort ranking of the value.
 */
function sortedIndexBy<T, K>(
    array: T[],
    value: T,
    iteratee: (value: T) => K,
): number {
    let low = 0;
    let high = array.length;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < iteratee(value)) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

/**
 * `differenceWith` creates an array of values not included in the other arrays, using a custom comparator function.
 */
function differenceWith<T>(
    array: T[],
    comparator: (a: T, b: T) => boolean,
    ...arrays: T[][]
): T[] {
    const otherValues = new Set(arrays.flat());
    return array.filter(
        (value) =>
            !otherValues.has(value) ||
            arrays.some((arr) =>
                arr.some((otherValue) => comparator(value, otherValue)),
            ),
    );
}

/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 */
function dropRight<T>(array: T[], n = 1): T[] {
    if (n >= array.length) return [];
    return array.slice(0, array.length - n);
}

/**
 * Creates a slice of `array` excluding elements dropped from the end until the predicate returns falsy.
 */
function dropRightWhile<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean,
): T[] {
    let dropIndex = array.length;
    for (let i = array.length - 1; i >= 0; i--) {
        if (!predicate(array[i], i, array)) {
            dropIndex = i + 1;
            break;
        }
    }
    return array.slice(0, dropIndex);
}

/**
 * Creates a slice of `array` excluding elements dropped from the beginning until the predicate returns falsy.
 */
function dropWhile<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean,
): T[] {
    let dropIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (!predicate(array[i], i, array)) {
            dropIndex = i;
            break;
        }
    }
    return array.slice(dropIndex);
}
/**
 * Creates an array of unique values that are included in all given arrays, using a custom iteratee function.
 */
function intersectionBy<T>(
    arrays: T[][],
    iteratee: (value: T) => unknown,
): T[] {
    if (arrays.length === 0) return [];

    const firstArray = arrays[0];
    const intersectedValues: unknown[] = [];

    for (const value of firstArray) {
        const computed = iteratee(value);
        if (intersectedValues.includes(computed)) continue;

        const includesInAll = arrays
            .slice(1)
            .every((array) =>
                array.some((item) => iteratee(item) === computed),
            );
        if (includesInAll) {
            intersectedValues.push(computed);
        }
    }

    return intersectedValues.flatMap((computed) =>
        firstArray.filter((item) => iteratee(item) === computed),
    );
}

/**
 * Creates an array of unique values that are included in all given arrays, using a custom comparator function.
 */
function intersectionWith<T>(
    arrays: T[][],
    comparator: (a: T, b: T) => boolean,
): T[] {
    if (arrays.length === 0) return [];

    const firstArray = arrays[0];
    const intersectedValues: T[] = [];

    for (const value of firstArray) {
        if (intersectedValues.includes(value)) continue;

        const includesInAll = arrays
            .slice(1)
            .every((array) => array.some((item) => comparator(item, value)));
        if (includesInAll) {
            intersectedValues.push(value);
        }
    }

    return intersectedValues;
}

/**
 * Removes all elements from `array` that match the comparator function.
 */
function pullAllWith<T>(
    array: T[],
    values: T[],
    comparator: (a: T, b: T) => boolean,
): T[] {
    return array.filter(
        (item) => !values.some((value) => comparator(item, value)),
    );
}

/**
 * Uses binary search to find the index of the last occurrence of a value in a sorted array.
 * If the value is not found, it returns -1.
 */
function sortedLastIndexOf<T>(array: T[], value: T): number {
    let low = 0;
    let high = array.length - 1;
    let lastIndex = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midValue = array[mid];

        if (midValue === value) {
            lastIndex = mid;
            low = mid + 1;
        } else if (midValue < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return lastIndex;
}

/**
 * Creates a new array of unique values from the provided array,
 * using a custom iteratee function to generate the comparison values.
 * The input array must be sorted.
 */
function sortedUniqBy<T, K>(array: T[], iteratee: (value: T) => K): T[] {
    const result: T[] = [];
    let previousValue: K | undefined = undefined;

    for (const value of array) {
        const computed = iteratee(value);
        if (computed !== previousValue) {
            result.push(value);
            previousValue = computed;
        }
    }

    return result;
}

/**
 * Creates an array of unique values that is the union of all given arrays,
 * using a custom comparator function to determine equality.
 */
function unionWith<T>(arrays: T[][], comparator: (a: T, b: T) => boolean): T[] {
    const result: T[] = [];
    const merged = ([] as T[]).concat(...arrays);

    for (const item of merged) {
        if (!result.some((existingItem) => comparator(existingItem, item))) {
            result.push(item);
        }
    }

    return result;
}

/**
 * Creates a new array of unique values from the provided array,
 * using a custom comparator function to determine equality.
 */
function uniqWith<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
    const result: T[] = [];

    for (const item of array) {
        if (!result.some((existingItem) => comparator(existingItem, item))) {
            result.push(item);
        }
    }

    return result;
}

/**
 * This function is the reverse of `zipWith`.
 * It groups the elements of each array based on the provided iteratee function
 * and returns an array of grouped elements.
 */
function unzipWith<T, R>(arrays: T[][], iteratee: (...args: T[]) => R): R[] {
    const length = arrays[0].length;
    const result: R[] = [];

    for (let i = 0; i < length; i++) {
        result.push(iteratee(...arrays.map((array) => array[i])));
    }

    return result;
}

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays,
 * using a custom iteratee function to generate the comparison values.
 */
function xorBy<T>(arrays: T[][], iteratee: (value: T) => unknown): T[] {
    const result: T[] = [];
    const flattened = ([] as T[]).concat(...arrays);
    const seen = new Set<unknown>();

    for (const value of flattened) {
        const computed = iteratee(value);
        if (!seen.has(computed)) {
            seen.add(computed);
            result.push(value);
        }
    }

    return result;
}

/**
 * Creates an object composed of keys generated from the results of running each element of the array through the iteratee function.
 * The order of grouped values is determined by the order they occur in the array.
 */
function groupBy<T>(
    array: T[],
    iteratee: (value: T) => string,
): Record<string, T[]> {
    return array.reduce(
        (result, value) => {
            const key = iteratee(value);
            if (!(key in result)) {
                result[key] = [];
            }
            result[key].push(value);
            return result;
        },
        {} as Record<string, T[]>,
    );
}

/**
 * Checks if a given value is included in the array using strict equality for comparisons.
 */
function includes<T>(array: T[], value: T): boolean {
    return array.includes(value);
}

/**
 * Invokes the method at `path` of each element in the array.
 */
function invokeMap<T, R>(
    array: T[],
    path: (number | string | symbol)[],
): Array<R | undefined> {
    return array.map((item) => {
        const method = (item as Record<number | string | symbol, unknown>)[
            path.join("")
        ] as unknown as () => R;
        return typeof method === "function" ? method.call(item) : undefined;
    });
}

/**
 * Creates an object composed of keys generated from the results of running each element of the array through the iteratee function.
 */
function keyBy<T>(
    array: T[],
    iteratee: (value: T) => string,
): Record<string, T> {
    return array.reduce(
        (result, value) => {
            const key = iteratee(value);
            result[key] = value;
            return result;
        },
        {} as Record<string, T>,
    );
}

/**
 * Creates an array of values by running each element in the array through the iteratee function.
 */
function map<T, R>(array: T[], iteratee: (value: T) => R): R[] {
    return array.map(iteratee);
}

/**
 * Creates an array of elements from the original array, sorted in ascending order by the results of running each element through the iteratees.
 */
function orderBy<T>(
    array: T[],
    iteratees: ((value: T) => number | string)[],
    orders?: ("asc" | "desc")[],
): T[] {
    const mappedArray = array.map((item, index) => ({ index, value: item }));
    const comparison = (
        a: { index: number; value: T },
        b: { index: number; value: T },
    ): number => {
        for (let i = 0; i < iteratees.length; i++) {
            const iteratee = iteratees[i];
            const aValue = iteratee(a.value);
            const bValue = iteratee(b.value);
            const order = orders && orders[i] === "desc" ? -1 : 1;
            if (aValue < bValue) {
                return -1 * order;
            }
            if (aValue > bValue) {
                return 1 * order;
            }
        }
        return a.index - b.index;
    };
    return mappedArray.sort(comparison).map((item) => item.value);
}

/**
 * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, while the second contains elements predicate returns falsy for.
 */
function partition<T>(
    array: T[],
    predicate: (value: T) => boolean,
): [T[], T[]] {
    return array.reduce(
        ([truthy, falsy], value) => {
            if (predicate(value)) {
                truthy.push(value);
            } else {
                falsy.push(value);
            }
            return [truthy, falsy];
        },
        [[], []] as [T[], T[]],
    );
}

/**
 * Reduces the array to a single value by iterating over it from left to right.
 */
function reduce<T, R>(
    array: T[],
    iteratee: (accumulator: R, value: T) => R,
    initialValue: R,
): R {
    return array.reduce(iteratee, initialValue);
}

/**
 * Reduces the array to a single value by iterating over it from right to left.
 */
function reduceRight<T, R>(
    array: T[],
    iteratee: (accumulator: R, value: T) => R,
    initialValue: R,
): R {
    return array.reduceRight(iteratee, initialValue);
}

/**
 * Creates an array of values from the original array that do not satisfy the predicate.
 */
function reject<T>(array: T[], predicate: (value: T) => boolean): T[] {
    return array.filter((value) => !predicate(value));
}

/**
 * Gets a random element from the array.
 */
function sample<T>(array: T[]): T | undefined {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * Creates an array of random elements from the original array up to the size limit.
 */
function sampleSize<T>(array: T[], size: number): T[] {
    const shuffled = array.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(size, array.length));
}

/**
 * Creates a shuffled copy of the array.
 */
function shuffle<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
}

/**
 * Returns the number of elements in the array.
 */
function size<T>(array: T[]): number {
    return array.length;
}

/**
 * Checks if any element in the array satisfies the predicate.
 */
function some<T>(array: T[], predicate: (value: T) => boolean): boolean {
    return array.some(predicate);
}

/**
 * Creates a new array of sorted elements by the results of running each element of the original array through the iteratees.
 */
function sortBy<T>(
    array: T[],
    iteratees: ((value: T) => number | string)[],
): T[] {
    const mappedArray = array.map((item, index) => ({ index, value: item }));
    const comparison = (
        a: { index: number; value: T },
        b: { index: number; value: T },
    ): number => {
        for (let i = 0; i < iteratees.length; i++) {
            const iteratee = iteratees[i];
            const aValue = iteratee(a.value);
            const bValue = iteratee(b.value);
            if (aValue < bValue) {
                return -1;
            }
            if (aValue > bValue) {
                return 1;
            }
        }
        return a.index - b.index;
    };
    return mappedArray.sort(comparison).map((item) => item.value);
}

/**
 * Creates an object composed of keys generated from the results of running each element of the array through the iteratee function.
 * The corresponding value of each key is an array of the elements responsible for generating the key.
 */
function countBy<T>(
    array: T[],
    iteratee: (value: T) => number | string,
): Record<number | string, number> {
    return array.reduce(
        (result, value) => {
            const key = iteratee(value);
            if (!(key in result)) {
                result[key] = 0;
            }
            result[key]++;
            return result;
        },
        {} as Record<number | string, number>,
    );
}

/**
 * Checks if every element in the array satisfies the predicate.
 */
function every<T>(array: T[], predicate: (value: T) => boolean): boolean {
    return array.every(predicate);
}

/**
 * Creates a new array with all elements that pass the predicate test.
 */
function filter<T>(array: T[], predicate: (value: T) => boolean): T[] {
    return array.filter(predicate);
}

/**
 * Returns the first element in the array that satisfies the predicate.
 */
function find<T>(array: T[], predicate: (value: T) => boolean): T | undefined {
    return array.find(predicate);
}

/**
 * Returns the last element in the array that satisfies the predicate.
 */
function findLast<T>(
    array: T[],
    predicate: (value: T) => boolean,
): T | undefined {
    return array.slice().reverse().find(predicate);
}

/**
 * Creates a new array by running each element in the array through the iteratee function and flattening the mapped results.
 * The iteratee function should return an array or iterable.
 */
function flatMap<T, R>(
    array: T[],
    iteratee: (value: T) => R[] | readonly R[],
): R[] {
    return array.flatMap(iteratee);
}

/**
 * Recursively flattens the array up to the specified depth.
 */
function flatMapDeep<T>(array: T[], depth = 1): T[] {
    if (depth <= 0) {
        return array.slice();
    }
    return array.flatMap((value) =>
        Array.isArray(value) ? flatMapDeep(value, depth - 1) : value,
    );
}

/**
 * Recursively flattens the array until the predicate function returns false.
 */
function flatMapDepth<T>(
    array: T[],
    predicate: (value: T) => boolean,
    depth = 1,
): T[] {
    if (depth <= 0) {
        return array.slice();
    }
    return array.flatMap((value) =>
        predicate(value) ? flatMapDepth([value], predicate, depth - 1) : value,
    );
}

/**
 * Executes the provided callback function for each element in the array.
 */
function forEach<T>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => void,
): void {
    array.forEach(callback);
}

/**
 * Executes the provided callback function for each element in the array in reverse order.
 */
function forEachReverse<T>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => void,
): void {
    for (let i = array.length - 1; i >= 0; i--) {
        callback(array[i], i, array);
    }
}

/**
 * Executes the provided callback function for each element in the array from right to left.
 */
function forEachRight<T>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => void,
): void {
    array.slice().reverse().forEach(callback);
}

/**
 * Computes the Cartesian product of multiple sets.
 * The Cartesian product of sets A, B, C, ..., is the set of all ordered pairs (a, b, c, ...),
 * where a is in A, b is in B, c is in C, etc.
 *
 * This function takes an arbitrary number of arrays as input and
 * returns an array of arrays, each of which represents one possible
 * combination of one element from each input array.
 *
 * @param args An arbitrary number of arrays.
 * @returns The Cartesian product of the input arrays.
 */
function cartesian<T>(...args: T[][]) {
    const result: T[][] = [],
        max = args.length - 1;
    function makeCartesian(arr: T[], i: number) {
        for (let j = 0, l = args[i].length; j < l; j++) {
            const newArr = arr.slice(0);
            newArr.push(args[i][j]);
            if (i == max) result.push(newArr);
            else makeCartesian(newArr, i + 1);
        }
    }
    makeCartesian([], 0);
    return result;
}

/**
 * Returns the elements present in the first array but not in the second array.
 * @param firstArray - The first array.
 * @param secondArray - The second array.
 * @returns An array of elements unique to the first array.
 */
function getUniqueElementsInFirstArray(
    firstArray: string[],
    secondArray: string[],
): string[] {
    const difference = firstArray.filter(
        (element) => !secondArray.includes(element),
    );
    return difference;
}

/**
 * Returns the elements that are unique to either of the two input arrays.
 * @param firstArray - The first array.
 * @param secondArray - The second array.
 * @returns An array of elements unique to either the first or the second array.
 */
function getUniqueElementsInEitherArray(
    firstArray: string[],
    secondArray: string[],
): string[] {
    const difference = firstArray
        .filter((element) => !secondArray.includes(element))
        .concat(secondArray.filter((element) => !firstArray.includes(element)));
    return difference;
}

/**
 * Checks if all elements in the first array are also present in the second array.
 * @param firstArray - The first array.
 * @param secondArray - The second array.
 * @returns A boolean indicating whether the first array is a subset of the second.
 */
function isFirstArraySubsetOfSecond(
    firstArray: string[],
    secondArray: string[],
): boolean {
    const result = firstArray.every((element) => secondArray.includes(element));
    return result;
}

/**
 * Returns all common elements between the two arrays.
 * @param firstArray - The first array.
 * @param secondArray - The second array.
 * @returns An array of elements common to both arrays.
 */
function getCommonElements(
    firstArray: string[],
    secondArray: string[],
): string[] {
    const values = firstArray
        .filter((element) => secondArray.includes(element))
        .concat(secondArray.filter((element) => firstArray.includes(element)));

    const uniqueValues = [...new Set(values)];
    return uniqueValues;
}

/**
 * Flattens an array of items. This function can also handle items that have child items.
 * Child items are retrieved using the provided `getChildren` function.
 * The resulting array contains all items and their children in a flat structure.
 * @param inputItems - An array of items to be flattened.
 * @param getChildren - A function that, given an item, returns its children or undefined.
 * @returns A flat array containing all input items and their children.
 */
function flattenBy<T>(
    inputItems: T[],
    getChildren: ((item: T) => T[] | undefined) | undefined,
): T[] {
    const itemsToFlatten = new Array<T>(...inputItems);
    const result = [];
    while (itemsToFlatten.length > 0) {
        const item = itemsToFlatten.shift();
        if (!item) continue;
        result.push(item);
        const children = getChildren?.(item);
        if (children) {
            for (const child of children) {
                if (child) {
                    itemsToFlatten.push(child);
                }
            }
        }
    }
    return result;
}

/**
 * Plucks the specified property from each object in the array.
 *
 * @template T, K
 * @param {T[]} array - The array of objects.
 * @param {K} key - The property to pluck from each object.
 * @returns {Array<K>} An array of the specified property values.
 */
function pluck<T, K extends keyof T>(array: T[], key: K): Array<T[K]> {
    return array.map((item) => item[key]);
}

/**
 * Retrieves the element at the specified index from an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to retrieve the element.
 * @param {number} index - The index of the element to retrieve. If negative, it is relative to the end of the array.
 * @returns {T | undefined} The element at the specified index, or undefined if the index is out of range.
 */
function getElementAt<T>(array: T[], index: number): T | undefined {
    if (index < 0) {
        index = array.length + index;
    }
    return array[index];
}

function inArray<T>(element: T, array: T[]): number {
    return array.indexOf(element);
}

function grep<T>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => boolean,
): T[] {
    return array.filter(callback);
}

export {
    cartesian,
    chunk,
    compact,
    concat,
    countBy,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    every,
    fill,
    filter,
    find,
    findIndex,
    findLast,
    findLastIndex,
    first,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    flatten,
    flattenBy,
    flattenDeep,
    flattenDepth,
    forEach,
    forEachReverse,
    forEachRight,
    fromPairs,
    getCommonElements,
    getElementAt,
    getUniqueElementsInEitherArray,
    getUniqueElementsInFirstArray,
    grep,
    groupBy,
    head,
    inArray,
    includes,
    indexOf,
    initial,
    intersection,
    intersectionBy,
    intersectionWith,
    invokeMap,
    isFirstArraySubsetOfSecond,
    join,
    keyBy,
    last,
    lastIndexOf,
    map,
    nth,
    orderBy,
    partition,
    pluck,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    pullAt,
    reduce,
    reduceRight,
    reject,
    remove,
    reverse,
    sample,
    sampleSize,
    shuffle,
    size,
    slice,
    some,
    sortBy,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    union,
    unionBy,
    unionWith,
    uniq,
    uniqBy,
    uniqWith,
    unzip,
    unzipWith,
    without,
    xor,
    xorBy,
    xorWith,
    zip,
    zipObject,
    zipObjectDeep,
    zipWith,
};
