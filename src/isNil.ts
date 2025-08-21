/**
 * Checks if the given value is null or undefined.
 *
 * @param value - The value to check.
 * @returns `true` if the value is null or undefined; otherwise, returns `false`.
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
