import { Game } from "./game/game";
import { Boards } from "./game/board";
import { Inputs } from "./game/input";
import { Hero } from "./game/hero";

const game = Game.newGame();
//console.dir(g, { depth: null });

const board = Boards.newBoard(game);
//console.log(board);
console.log(Boards.renderBoard(board));

const hero = game.heroes["1"];
const g2 = Game.updateHero(game, Hero.move(hero, { x: 2, y: 1 }));
//console.dir(g2, { depth: null });

const board2 = Boards.newBoard(g2);
//console.log(board2);
console.log(Boards.renderBoard(board2));

const result1 = Inputs.handleInput(g2, {
  playerId: "player1",
  source: { x: 1, y: 1 },
  target: { x: 2, y: 2 },
});
//console.log("result 1", result1);

const result2 = Inputs.handleInput(g2, {
  playerId: "player1",
  source: { x: 2, y: 1 },
  target: { x: 2, y: 2 },
});
//console.dir(g2, { depth: null });
