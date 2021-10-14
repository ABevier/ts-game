import * as game from "./game/game";
import * as board from "./game/board";

const g = game.create();
//console.dir(g, { depth: null });

const b1 = board.toArray(g);
console.log(board.renderArray(b1));

const g2 = game.updateHero(g, { id: "1", position: { x: 2, y: 1 } });
//console.dir(g2, { depth: null });

const b = board.toArray(g2);
console.log(board.renderArray(b));
