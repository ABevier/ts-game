import { Game, gameMod } from "./game";
import { Position } from "./position";

const handleInput = (game: Game, source: Position, dest: Position): Game | string => {
  const maybeHero = gameMod.findHeroAtPosition(game, source);
  if (maybeHero) {
    return game;
  } else {
    return `no hero at: ${source.x + "," + source.y}`;
  }
};

export const inputMod = {
  handleInput,
};
