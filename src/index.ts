import { gameMod } from "./game/game";
import { boardMod } from "./game/board";
import { inputMod } from "./game/input";

const game = gameMod.create();
//console.dir(g, { depth: null });

const board = boardMod.newBoard(game);
console.log(board);
console.log(boardMod.renderBoard(board));

const g2 = gameMod.updateHero(game, { id: "1", position: { x: 2, y: 1 } });
//console.dir(g2, { depth: null });

const board2 = boardMod.newBoard(g2);
console.log(board2);
console.log(boardMod.renderBoard(board2));

const result1 = inputMod.handleInput(g2, { x: 1, y: 1 }, { x: 2, y: 2 });
console.log("result 1", result1);

const result2 = inputMod.handleInput(g2, { x: 2, y: 1 }, { x: 2, y: 2 });
console.dir(g2, { depth: null });
