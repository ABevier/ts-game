import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
type MapFunc<V, T> = (k: string, v: V) => T;

const mapEntries = function <V, T>(record: Record<string, V>, func: MapFunc<V, T>): T[] {
  return Object.entries(record).map(([key, val]) => func(key, val));
};

type Reducer<V, T> = (acc: T, k: string, v: V) => T;

const reduceEntries = function <V, T>(record: Record<string, V>, func: Reducer<V, T>, accumulator: T): T {
  return Object.entries(record).reduce((acc, [key, val]) => func(acc, key, val), accumulator);
};

//TODO: don't need to look at keys
type Predicate<V> = (k: string, v: V) => boolean;
const findEntry = function <V>(record: Record<string, V>, func: Predicate<V>): option.Option<V> {
  return pipe(
    Object.entries(record).find(([key, val]) => func(key, val)),
    option.fromNullable,
    option.map(([_, val]) => val)
  );
};

type ValuePredicate<V> = (v: V) => boolean;
const filterEntries = function <V>(record: Record<string, V>, func: ValuePredicate<V>): V[] {
  return Object.entries(record)
    .filter(([_, val]) => func(val))
    .map(([_, v]) => v);
};

export const Record = { mapEntries, reduceEntries, findEntry, filterEntries };
