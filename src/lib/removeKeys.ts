/**
 * Takes an object and an array of keys (or a single key).
 * Removes all of the keys from the object if they exist or not.
 */
const removeKeys = (
  object: {[x: string]: unknown},
  keys: string | string[],
): {[x: string]: unknown} => {
  const keysArray = typeof keys === 'string' ? [keys] : keys;
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keysArray.includes(key)),
  );
};

export default removeKeys;
