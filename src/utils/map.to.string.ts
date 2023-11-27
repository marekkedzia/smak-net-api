// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapValuesToString = (enumObject: any): string[] =>
  Object.values(enumObject).map(c => String(c));