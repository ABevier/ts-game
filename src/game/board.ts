import { Game } from "./game";
import { Record } from "../utils/record";
import { range } from "../utils/utils";
import { Position } from "./position";

//TODO: consider ImmutableJS map for this?
type Board = ReadonlyMap<string, string>;

const newBoard = (game: Game): Board => {
  return Record.reduceEntries(
    game.heroes,
    (m, k, v) => m.set(Position.toKey(v.position), "X"),
    new Map<string, string>()
  );
};

const renderBoard = (board: Board): string => {
  return range(5).reduce((acc, y) => acc + renderRow(board, y) + "\n", "");
};

const renderRow = (board: Board, y: number): string => {
  return range(9).reduce((acc, x) => acc + renderPos(board, x, y), "");
};

const renderPos = (board: Board, x: number, y: number): string => {
  if (board.has(Position.toKey({ x, y }))) {
    return "X";
  }
  return ".";
};

export const Board = { newBoard, renderBoard };
