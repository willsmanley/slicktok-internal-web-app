/**
 * This replicates the npm package classnames which takes an object
 * and outputs a className string depending on which keys of the object
 * had truthy values.
 */

interface ClassNameMap {
  [x: string]: unknown;
}

type ClassNameArray = (string | null | undefined)[];

type ClassNameArgument = ClassNameMap | ClassNameArray;

const classNames = (classNamesArgument: ClassNameArgument): string => {
  // Arrays can just be joined with spaces
  if (Array.isArray(classNamesArgument)) {
    return classNamesArgument.join(' ');
  }

  // Object properties should be evaluated for truthiness
  return Object.entries(classNamesArgument)
    .filter((entries) => entries[1])
    .map(([key]) => key)
    .join(' ');
};

export default classNames;
