/**
 * Converts an enum into a String
 * @param _enum Enum
 * @returns string type
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const enumToString = (_enum: object) =>
  Object.keys(_enum)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map((key) => _enum[key])
    .filter((value) => typeof value === 'string') as string[];
