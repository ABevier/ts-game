import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Game } from "./game";
import { Hero } from "./hero";
import { Position } from "./position";

type Input = {
  playerId: string;
  source: Position;
  target: Position;
};

//TODO: use either types here
const handleInput = (game: Game, { playerId, source, target }: Input): Game | string => {
  return pipe(
    Game.findFriendlyHeroAtPosition(game, source, playerId),
    option.foldW(
      () => `no hero at: ${source.x + "," + source.y}`,
      (hero) => processCommand(game, hero, target)
    )
  );
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
  apply: (game: Game, hero: Hero, target: Position): string | Game => {
    return pipe(
      Game.findEnemyHeroAtPosition(game, target, hero.playerId),
      option.foldW(
        () => "attack failed, no enemy found",
        (enemy) =>
          pipe(
            Hero.applyDamage(enemy, 250),
            // TODO: Curry
            (e) => Game.updateHero(game, e)
          )
      )
    );
  },
};

export const Input = {
  handleInput,
};
