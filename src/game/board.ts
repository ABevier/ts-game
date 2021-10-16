import { Game } from "./game";
import { Records } from "../utils/record";
import { range } from "../utils/utils";
import { Positions } from "./position";

//TODO: consider ImmutableJS map for this?
type Board = ReadonlyMap<string, string>;

const newBoard = (game: Game): Board => {
  return Records.reduceEntries(
    game.heroes,
    (m, k, v) => m.set(Positions.toKey(v.position), "X"),
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
  if (board.has(Positions.toKey({ x, y }))) {
    return "X";
  }
  return ".";
};

export const Boards = { newBoard, renderBoard };
