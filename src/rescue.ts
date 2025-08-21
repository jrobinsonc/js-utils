function normalizeError(error: unknown, throwError?: boolean) {
  const normalizedError =
    error instanceof Error ? error : new Error(String(error), { cause: error });

  if (throwError === true) {
    throw normalizedError;
  }

  return normalizedError;
}

/**
 * Rescues an error from a function.
 *
 * @param fn - The function to execute.
 * @param throwError - Whether to throw any thrown error or return it. Defaults to `false`.
 * @returns The result of the function.
 *
 * @example
 * ```ts
 * const result = rescue(() => {
 *   return 1;
 * });
 *
 * console.log(result); // 1
 *
 * const result = rescue(() => {
 *   throw new Error('test');
 * });
 *
 * console.log(result); // Error
 * ```
 */
export function rescue<T>(fn: () => T, throwError?: boolean): T;
export function rescue<T>(
  fn: () => Promise<T>,
  throwError?: boolean,
): Promise<T | Error>;
export function rescue<T>(
  fn: () => T | Promise<T>,
  throwError?: boolean,
): T | Error | Promise<T | Error> {
  try {
    const result: T | Promise<T> = fn();

    if (result instanceof Promise) {
      return result.catch((error: unknown) =>
        normalizeError(error, throwError),
      );
    }

    return result;
  } catch (error: unknown) {
    return normalizeError(error, throwError);
  }
}
