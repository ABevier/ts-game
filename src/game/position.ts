export interface Position {
  readonly x: number;
  readonly y: number;
}

const toKey = ({ x, y }: Position): string => {
  return x + ":" + y;
};

const equals = ({ x: x1, y: y1 }: Position, { x: x2, y: y2 }: Position) => {
  return x1 === x2 && y1 === y2;
};

const distanceTo = ({ x: x1, y: y1 }: Position, { x: x2, y: y2 }: Position): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const inRange = (start: Position, end: Position, range: number): boolean => {
  return distanceTo(start, end) <= range;
};

export const Positions = {
  equals,
  toKey,
  distanceTo,
  inRange,
};
