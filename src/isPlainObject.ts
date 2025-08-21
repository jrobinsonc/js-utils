/**
 * Checks if the given value is a plain object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object, `false` otherwise.
 */
export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}
