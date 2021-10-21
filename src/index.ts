import { Game } from "./game/game";
import { Board } from "./game/board";
import { Input } from "./game/input";
import { either } from "fp-ts";

const initialGame = Game.newGame();

// should be fine because we're immutable
let game = initialGame;

const board = Board.newBoard(initialGame);
console.log(Board.renderBoard(board));

const playerId = "player-1";
const inputs = [
  {
    source: { x: 1, y: 1 },
    target: { x: 3, y: 1 },
  },
  {
    source: { x: 3, y: 1 },
    target: { x: 5, y: 1 },
  },
  {
    source: { x: 5, y: 1 },
    target: { x: 6, y: 1 },
  },
  // Start attacking
  {
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  {
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  {
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  {
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  // And stomp
  {
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
];

inputs.forEach((input) => {
  const result = Input.applyInput(game, playerId, input);
  either.fold(
    (e: string) => console.log(`Error was: ${e}`),
    (g: Game) => {
      const board2 = Board.newBoard(g);
      console.dir(g, { depth: null });
      console.log(Board.renderBoard(board2));
      game = g;
    }
  )(result);
});

const res = Input.applyManyInputs(initialGame, playerId, inputs);
either.fold(
  (e: string) => console.log(`MANY INPUTS - Error was: ${e}`),
  (g: Game) => {
    console.log("MANY RESULT:");
    const board2 = Board.newBoard(g);
    console.dir(g, { depth: null });
    console.log(Board.renderBoard(board2));
  }
)(res);
