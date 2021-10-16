type MapFunc<V, T> = (k: string, v: V) => T;

const mapEntries = function <V, T>(record: Record<string, V>, func: MapFunc<V, T>): T[] {
  return Object.entries(record).map(([key, val]) => func(key, val));
};

type Reducer<V, T> = (acc: T, k: string, v: V) => T;

const reduceEntries = function <V, T>(
  record: Record<string, V>,
  func: Reducer<V, T>,
  accumulator: T
): T {
  return Object.entries(record).reduce((acc, [key, val]) => func(acc, key, val), accumulator);
};

type Predicate<V> = (k: string, v: V) => boolean;
const findEntry = function <V>(record: Record<string, V>, func: Predicate<V>): V | null {
  const result = Object.entries(record).find(([key, val]) => func(key, val));
  if (result) {
    return result[1];
  } else {
    return null;
  }
};

export const Records = { mapEntries, reduceEntries, findEntry };
