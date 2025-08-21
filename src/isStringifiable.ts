/**
 * Checks if the given value is stringifiable.
 *
 * @param value - The value to check.
 * @returns `true` if the value is stringifiable; otherwise, returns `false`.
 */
export function isStringifiable(
  value: unknown,
): value is
  | string
  | number
  | boolean
  | null
  | undefined
  | bigint
  | symbol
  | { toString(): string } {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint' ||
    typeof value === 'symbol' ||
    (typeof value === 'object' && typeof value.toString === 'function')
  );
}
