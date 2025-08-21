/**
 * Checks if the given value is a primitive.
 *
 * Primitive values in JavaScript are:
 * - null
 * - undefined
 * - string
 * - number
 * - boolean
 * - bigint
 * - symbol
 *
 * @param value - The value to check.
 * @returns `true` if the value is a primitive; otherwise, returns `false`.
 */
export function isPrimitive(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint' ||
    typeof value === 'symbol'
  );
}
