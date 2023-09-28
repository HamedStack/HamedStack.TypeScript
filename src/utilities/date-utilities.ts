import { isDate } from "./type-utilities";

function now(): number {
    return Date.now();
}

function getISO8601Now(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month =
        now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
    const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    const minute =
        now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const second =
        now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
    const millisecond = now.getMilliseconds();
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
}

function getFormattedDate(date: Date | string, separator = ".") {
    if (!date) {
        throw new Error("'date' is null or undefined.");
    }
    let d: Date;
    if (typeof date === "string" || date instanceof String) d = new Date(date);
    else if (isDate(date)) {
        d = date as Date;
    } else {
        throw new Error("'date' is invalid.");
    }
    separator = separator || ".";
    const isoDateTime = new Date(
        d.getTime() - d.getTimezoneOffset() * 60000,
    ).toISOString();
    const result = isoDateTime
        .substring(0, 10)
        .split("-")
        .reverse()
        .join(separator);
    return result;
}

/**
 * Formats a date to a string using the specified format.
 * @param date - The date object to format.
 * @param format - The format string (e.g., 'yyyy-MM-dd HH:mm:ss').
 * @returns The locals string or string[].
 */
function formatDate(date: Date, locals: string | string[]): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        hour: "numeric",
        hour12: false,
        minute: "numeric",
        month: "short",
        second: "numeric",
        year: "numeric",
    };

    return new Intl.DateTimeFormat(locals, options).format(date);
}

/**
 * Gets the current date and time.
 * @returns The current date object.
 */
function getCurrentDate(): Date {
    return new Date();
}

/**
 * Calculates the difference in days between two dates.
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns The difference in days.
 */
function getDateDiffInDays(date1: Date, date2: Date): number {
    const millisecondsPerDay: number = 24 * 60 * 60 * 1000;
    const timeDiff: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(timeDiff / millisecondsPerDay);
}

/**
 * Adds or subtracts a specified number of days to/from a date.
 * @param date - The date to modify.
 * @param days - The number of days to add or subtract (negative for subtraction).
 * @returns The modified date object.
 */
function addDays(date: Date, days: number): Date {
    const newDate: Date = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

/**
 * Checks if a year is a leap year.
 * @param year - The year to check.
 * @returns `true` if the year is a leap year, otherwise `false`.
 */
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the first day of a specified month.
 * @param year - The year of the month.
 * @param month - The month (0-based index).
 * @returns The first day of the month.
 */
function getFirstDayOfMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
}

/**
 * Checks if two dates are equal.
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns `true` if the dates are equal, otherwise `false`.
 */
function areDatesEqual(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
}

/**
 * Gets the last day of a specified month.
 * @param year - The year of the month.
 * @param month - The month (0-based index).
 * @returns The last day of the month.
 */
function getLastDayOfMonth(year: number, month: number): Date {
    return new Date(year, month + 1, 0);
}

/**
 * Checks if a date is in the future.
 * @param date - The date to check.
 * @returns `true` if the date is in the future, otherwise `false`.
 */
function isDateInFuture(date: Date): boolean {
    const today: Date = new Date();
    return date > today;
}

/**
 * Checks if a date is within a specified range.
 * @param date - The date to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns `true` if the date is within the range, otherwise `false`.
 */
function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
}

/**
 * Calculates the age based on the provided birth date.
 * @param birthDate - The birth date.
 * @returns The age in years.
 */
function calculateAge(birthDate: Date): number {
    const today: Date = new Date();
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const monthDiff: number = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

/**
 * Checks if a given year is a future year.
 * @param year - The year to check.
 * @returns `true` if the year is in the future, otherwise `false`.
 */
function isFutureYear(year: number): boolean {
    const currentYear: number = new Date().getFullYear();
    return year > currentYear;
}

/**
 * Checks if a date is a weekend day (Saturday or Sunday).
 * @param date - The date to check.
 * @returns `true` if the date is a weekend day, otherwise `false`.
 */
function isWeekend(date: Date): boolean {
    const day: number = date.getDay();
    return day === 0 || day === 6;
}

/**
 * Converts a date string in ISO 8601 format to a Date object.
 * @param dateString - The date string in ISO 8601 format.
 * @returns The parsed Date object, or `null` if the date string is invalid.
 */
function parseISODate(dateString: string): Date | null {
    const date: Date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
}

export {
    addDays,
    areDatesEqual,
    calculateAge,
    formatDate,
    getCurrentDate,
    getDateDiffInDays,
    getFirstDayOfMonth,
    getFormattedDate,
    getISO8601Now,
    getLastDayOfMonth,
    isDateInFuture,
    isDateInRange,
    isFutureYear,
    isLeapYear,
    isWeekend,
    now,
    parseISODate,
};
