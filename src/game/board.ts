import { Game } from "./game";
import { Record } from "../utils/record";
import { range } from "../utils/utils";
import { Position } from "./position";
import { pipe } from "fp-ts/lib/function";
import { string } from "fp-ts";

//TODO: consider ImmutableJS map for this?
type Board = ReadonlyMap<string, string>;

const newBoard = (game: Game): Board => {
  return Record.reduceEntries(game.heroes, (m, k, v) => m.set(Position.toKey(v.position), "X"), new Map<string, string>());
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

const renderGame = (game: Game): string => pipe(game, newBoard, renderBoard);

//TODO: Make a Text Rendering module that is different than board
const renderHUD = (game: Game): string => {
  const lines = [
    //
    renderStatusLine(game),
    renderHeroesForPlayer(game, "player-1"),
    renderHeroesForPlayer(game, "player-2"),
  ];
  return lines.reduce((acc, line) => `${acc}\n${line}`);
};

const renderStatusLine = (game: Game): string => {
  return `active player: ${game.activePlayer}  action points: ${game.actionPoints}`;
};

const renderHeroesForPlayer = (game: Game, playerId: string): string => {
  return Game.findAllHeroesForPlayer(game, playerId)
    .map((hero) => `${hero.id}: ${hero.hp}`)
    .reduce((acc, text) => `${acc} ${text}`);
};

export const Board = { newBoard, renderBoard, renderGame, renderHUD };
