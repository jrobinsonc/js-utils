/**
 * Checks if the given value is defined.
 *
 * @param value - The value to check.
 * @returns `true` if the value is defined; otherwise, returns `false`.
 */
export function isDefined<TValue>(
  value: TValue | undefined | null,
): value is TValue {
  return value !== undefined && value !== null;
}
