import { getTag } from './_getTag';
import { isPlainObject } from './isPlainObject';

/**
 * Checks if the given value is empty.
 *
 * ## What is considered empty:
 * - `null` and `undefined`
 * - Empty strings (`""`) and whitespace-only strings (`"   "`)
 * - `NaN` (Not a Number)
 * - Empty arrays (`[]`)
 * - Empty Map and Set objects
 * - Objects with no enumerable properties (`{}`)
 *
 * ## Design Philosophy: Empty vs Falsy
 *
 * This function is specifically designed to check for **emptiness**, not **falsiness**.
 * While JavaScript's falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`, `0n`)
 * all evaluate to `false` in boolean contexts, they serve different semantic purposes:
 *
 * - **Falsy values** represent "false-like" states in boolean logic
 * - **Empty values** represent "absence of content" or "no data"
 *
 * ### Why the distinction matters:
 *
 * 1. **`false`** is a valid boolean state, not empty data
 * 2. **`0`** is a valid number representing zero, not absence of a number
 * 3. **`0n`** is a valid BigInt representing zero, not absence of a BigInt
 * 4. **`""`** represents no textual content - this IS empty
 * 5. **`null`/`undefined`** represent absence of value - these ARE empty
 * 6. **`NaN`** represents an invalid/failed computation - this IS empty
 *
 * ### Use cases:
 * - **Form validation**: `isEmpty("")` → true, `isEmpty(false)` → false
 * - **Data processing**: `isEmpty([])` → true, `isEmpty(0)` → false
 * - **API responses**: `isEmpty({})` → true, `isEmpty({count: 0})` → false
 *
 * ## What is NOT considered empty (valid data, even if falsy):
 * - The boolean `false`
 * - The number zero `0`, `-0`, `Infinity`, `-Infinity`
 * - The BigInt zero `BigInt(0)` or `0n`
 * - Symbols (all symbols are considered valid data)
 *
 * ## Special considerations:
 * - Objects are considered empty if they have no enumerable properties
 * - Objects with only symbol-keyed or non-enumerable properties are considered empty
 * - WeakMap and WeakSet are not supported because there is no way to check if they are empty and this is a limitation created by design of these objects
 *
 * @param value - The value to check.
 * @returns `true` if the value is empty, `false` otherwise.
 */
export function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'boolean' || value instanceof Boolean) {
    return false;
  }

  if (typeof value === 'string' || value instanceof String) {
    return value.trim() === '';
  }

  if (typeof value === 'number' || value instanceof Number) {
    // Only NaN is treated as empty; all other numbers,
    // including 0, -0, ±Infinity are not empty.
    return Number.isNaN(value.valueOf());
  }

  if (typeof value === 'bigint' || value instanceof BigInt) {
    return false;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  const tag = getTag(value);

  if (/^\[object (?:[A-Z]\w*Array)\]$/.test(tag)) {
    return (value as ArrayLike<unknown>).length === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'symbol' || value instanceof Symbol) {
    return false;
  }

  if (typeof value === 'function') {
    return false;
  }

  throw new TypeError(`The given argument is not supported: ${tag}`);
}
