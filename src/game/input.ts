import { Game } from "./game";
import { Hero } from "./hero";
import { Position } from "./position";

type Input = {
  playerId: string;
  source: Position;
  target: Position;
};

const handleInput = (game: Game, { playerId, source, target }: Input): Game | string => {
  const maybeHero = Game.findFriendlyHeroAtPosition(game, source, playerId);
  if (maybeHero) {
    return processCommand(game, maybeHero, target);
  } else {
    return `no hero at: ${source.x + "," + source.y}`;
  }
};

const processCommand = (game: Game, hero: Hero, target: Position): Game | string => {
  return "not implemented";
};

const moveCommand = {
  match: (game: Game, hero: Hero, target: Position) => {
    //TODO: use hero move stat
    return Position.inRange(hero.position, target, 2) && Game.isPositionEmpty(game, target);
  },
};
//TODO: move all this stuff to a commands module?

export const Inputs = {
  handleInput,
};
