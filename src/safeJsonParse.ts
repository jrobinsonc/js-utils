/**
 * A JSON.parse() replacement that returns `null` if the string is not valid JSON.
 *
 * @param value - The JSON string to parse.
 * @param reviver - A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 * @returns The parsed JSON object or `null` if the string is not valid JSON.
 */
export function safeJsonParse(
  value: unknown,
  reviver?: (this: unknown, key: string, value: unknown) => unknown,
): unknown {
  try {
    if (typeof value !== 'string') {
      throw new Error('Value is not a string');
    }

    return JSON.parse(value, reviver);
  } catch {
    return null;
  }
}
