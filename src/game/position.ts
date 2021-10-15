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

export const positionMod = {
  equals,
  toKey,
};
