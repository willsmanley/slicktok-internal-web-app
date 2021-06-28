/**
 * Use this to re-use the filter unique object logic.
 *
 * For example:
 * const array = [{id: 1}, {id: 2}, {id: 1}, {id: 4}];
 * array.filter(filterUnique((value) => value.id)));
 *
 * This will eliminate records with duplicate ID and is a little cleaner/faster.
 */
type ComputeProperty = (x: unknown) => unknown;
export const filterUnique = (computeProperty: ComputeProperty) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (object: unknown, index: number, array: unknown[]) => {
    return (
      index ===
      array.findIndex(
        (subordinatedObject) =>
          computeProperty(object) === computeProperty(subordinatedObject),
      )
    );
  };
};

/**
 * This is another way to do the same thing, except a bit shorter and less confusing since it doesn't use chaining.
 */
export const uniqFilter = (
  array: unknown[],
  computeProperty: ComputeProperty,
): typeof array => {
  return array.filter(filterUnique(computeProperty));
};
