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

//TODO: move all this stuff to a commands module?
type Command = {
  match: (game: Game, hero: Hero, target: Position) => boolean;
  apply: (game: Game, hero: Hero, target: Position) => Game | string;
};

const processCommand = (game: Game, hero: Hero, target: Position): Game | string => {
  const commands: Command[] = [moveCommand, attackCommand];

  const maybeCommand = commands.find((cmd) => cmd.match(game, hero, target));
  if (maybeCommand) {
    return maybeCommand.apply(game, hero, target);
  }
  return "no command to execute";
};

const moveCommand = {
  match: (game: Game, hero: Hero, target: Position): boolean => {
    //TODO: use hero move stat
    return Position.inRange(hero.position, target, 2) && Game.isPositionEmpty(game, target);
  },
  apply: (game: Game, hero: Hero, target: Position): Game | string => {
    //todo: pipe/flow?
    const h = Hero.move(hero, target);
    return Game.updateHero(game, h);
  },
};

const attackCommand = {
  match: (game: Game, hero: Hero, target: Position): boolean => {
    return (
      Position.inRange(hero.position, target, 1) &&
      Game.isEnemyHeroAtPosition(game, target, hero.playerId)
    );
  },
  apply: (game: Game, hero: Hero, target: Position): Game | string => {
    const enemy = Game.findEnemyHeroAtPosition(game, target, hero.playerId);
    if (enemy) {
      const e = Hero.applyDamage(enemy, 250);
      return Game.updateHero(game, e);
    }
    return "attack failed, no enemy found";
  },
};

export const Input = {
  handleInput,
};
