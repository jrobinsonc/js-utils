# JS Utils

A collection of type-safe generic utilities.

## Installation

```bash
npm install @jrobinsonc/js-utils
# or
pnpm add @jrobinsonc/js-utils
```

## Available Utilities

- `isDefined<TValue>(value: TValue | undefined | null): value is TValue` - Checks if a value is defined (not undefined or null)
- `isEmpty(value: unknown): boolean` - Checks if a value is empty (null, undefined, empty string, empty array, empty object, empty Map/Set, or NaN for numbers). Note: boolean `false` and number `0` are not considered empty.
- `isNil(value: unknown): value is null | undefined` - Checks if a value is null or undefined
- `isPlainObject(value: unknown): value is Record<string, unknown>` - Checks if a value is a plain object
- `isPrimitive(value: unknown): boolean` - Checks if a value is a primitive (null, undefined, string, number, boolean, bigint, symbol)
- `isStringifiable(value: unknown): value is string | number | boolean | null | undefined | bigint | symbol | { toString(): string }` - Checks if a value can be converted to a string
- `raise(message: string | Error): never` - Raises an error with the given message or Error object
- `rescue<T>(fn: () => T, throwError?: boolean): T | Error` - Executes a function and returns the result, or an Error if it throws. Supports both synchronous and asynchronous functions.
- `safeJsonParse(value: unknown, reviver?: (this: unknown, key: string, value: unknown) => unknown): unknown` - Safely parses a JSON string and returns the parsed object or null if invalid

## Usage

```typescript
import { isDefined, isPrimitive } from '@jrobinsonc/js-utils';

// Type checking
const value = 'someValue';

if (isDefined(value)) {
  // value is now typed as non-null and non-undefined
}

// Primitive checking
if (isPrimitive(value)) {
  // value is a primitive (string, number, boolean, null, undefined, bigint, symbol)
}
```

## License

This project is licensed under the ISC License.

## Repository

[GitHub Repository](https://github.com/jrobinsonc/js-utils)
