import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Game, TargetType } from "../game";
import { Hero } from "../hero";
import { Position } from "../position";

type Either<E, A> = either.Either<E, A>;

const match = (hero: Hero, targetType: TargetType, target: Position): boolean => {
  //TODO: use hero move stat
  return targetType == TargetType.Empty && Position.inRange(hero.position, target, 2);
};

const apply = (game: Game, hero: Hero, target: Position): Either<string, Game> => {
  return pipe(
    Hero.move(hero, target),
    //TODO: curry
    (h: Hero) => Game.updateHero(game, h),
    either.right
  );
};

export const MoveCommand = {
  match,
  apply,
};
