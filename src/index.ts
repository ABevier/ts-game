import { Game } from "./game/game";
import { Board } from "./game/board";
import { Input } from "./game/input";

let game = Game.newGame();

const board = Board.newBoard(game);
console.log(Board.renderBoard(board));

const playerId = "player-1";
const inputs = [
  {
    playerId,
    source: { x: 1, y: 1 },
    target: { x: 3, y: 1 },
  },
  {
    playerId,
    source: { x: 3, y: 1 },
    target: { x: 5, y: 1 },
  },
  {
    playerId,
    source: { x: 5, y: 1 },
    target: { x: 6, y: 1 },
  },
  // Start attacking
  {
    playerId,
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  {
    playerId,
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  {
    playerId,
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
  {
    playerId,
    source: { x: 6, y: 1 },
    target: { x: 7, y: 1 },
  },
];

const result = Input.handleInput(game, {
  playerId: "player-1",
  source: { x: 1, y: 1 },
  target: { x: 3, y: 1 },
});

inputs.forEach((input) => {
  const result = Input.handleInput(game, input);
  if (typeof result === "string") {
    console.log(`Error was: ${result}`);
  } else {
    const board2 = Board.newBoard(result);
    console.dir(result, { depth: null });
    console.log(Board.renderBoard(board2));
    game = result;
  }
});
