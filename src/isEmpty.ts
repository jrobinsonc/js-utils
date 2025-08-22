/**
 * Checks if the given value is empty.
 *
 * 🚨 The values listed below are not considered empty (they are falsy, not empty):
 * - The boolean `false`
 * - The number zero `0`
 *
 * @param value - The value to check.
 * @returns `true` if the value is empty, `false` otherwise.
 */
export function isEmpty(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return false;
  }

  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (typeof value === 'number') {
    // `isNaN` checks whether the value is not a number or cannot be converted
    // into a number. `Number.isNaN` only checks if the value is equal to NaN.
    return Number.isNaN(value);
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'bigint') {
    // BigInt values are never considered empty.
    // Even BigInt(0) represents a value, a falsy value, not an empty value.
    return false;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  throw new Error(
    `The given argument could not be parsed: ${JSON.stringify(value)}`,
  );
}
