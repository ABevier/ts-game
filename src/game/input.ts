import { generatePrimeSync } from "crypto";
import { Game, Games } from "./game";
import { Hero } from "./hero";
import { Position, Positions } from "./position";

const handleInput = (game: Game, source: Position, dest: Position): Game | string => {
  const maybeHero = Games.findHeroAtPosition(game, source);
  if (maybeHero) {
    return processCommand(game, maybeHero, dest);
  } else {
    return `no hero at: ${source.x + "," + source.y}`;
  }
};

const processCommand = (game: Game, hero: Hero, target: Position): Game | string => {
  return "not implemented";
};

const moveCommand = {
  match: (game: Game, hero: Hero, target: Position) => {
    //TODO: use hero move value
    return Positions.inRange(hero.position, target, 2) && Games.isPositionEmpty(game, target);
  },
};
//TODO: move all this stuff to a commands module?

export const Inputs = {
  handleInput,
};
