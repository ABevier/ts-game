import { either, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Game, TargetType } from "../game";
import { Hero } from "../hero";
import { Position } from "../position";

type Either<E, A> = either.Either<E, A>;

const match = (hero: Hero, targetType: TargetType, target: Position): boolean => {
  return targetType == TargetType.Enemy && Position.inRange(hero.position, target, 1);
};

const apply =
  (hero: Hero, target: Position) =>
  (game: Game): Either<string, Game> => {
    return pipe(
      Game.findEnemyHeroAtPosition(game, target, hero.playerId),
      option.fold(
        () => either.left("attack failed, no enemy found"),
        (enemy) =>
          pipe(
            Hero.applyDamage(enemy, 250),
            //TODO: Curry
            (e) => Game.updateHero(game, e),
            either.right
          )
      )
    );
  };

export const AttackCommand = {
  match,
  apply,
};
