import { Game } from "./game";

const toArray = (game: Game): string[][] => {
  //TODO: rewrite
  const arr = new Array(5);
  for (let i = 0; i < 5; i++) {
    arr[i] = new Array(9).fill(".");
  }

  Object.entries(game.heroes).forEach(([_, hero]) => {
    const { position } = hero;
    arr[position.y][position.x] = "X";
  });

  return arr;
};

const renderArray = (board: string[][]) => {
  return board.reduce((acc, row) => acc + row.join(" ") + "\n", "");
};

export { toArray, renderArray };
