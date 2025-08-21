/**
 * Raises an error with the given message.
 *
 * @param message - The message to raise the error with.
 */
export function raise(message: string | Error): never {
  throw message instanceof Error ? message : new Error(message);
}
