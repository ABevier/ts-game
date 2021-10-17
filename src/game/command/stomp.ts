import { either, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Game, TargetType } from "../game";
import { Hero } from "../hero";
import { Position } from "../position";

type Either<E, A> = either.Either<E, A>;

const match = (hero: Hero, targetType: TargetType, target: Position): boolean => {
  //TODO: use hero move stat
  return targetType == TargetType.DeadEnemy && Position.inRange(hero.position, target, 2);
};

const apply = (game: Game, hero: Hero, target: Position): Either<string, Game> => {
  return pipe(
    Game.findEnemyHeroAtPosition(game, target, hero.playerId),
    option.fold(
      () => either.left(`nothing to stomp at ${Position.toKey(target)}`),
      (enemy) => stompEnemy(game, hero, enemy)
    )
  );
};

//TODO: after a stomp should you go to a graveyard?
const stompEnemy = (game: Game, hero: Hero, enemy: Hero) => {
  return pipe(
    Game.removeHero(game, enemy),
    //TODO: curry
    (g) => Game.updateHero(g, Hero.move(hero, enemy.position)),
    either.right
  );
};

export const StompCommand = {
  match,
  apply,
};
