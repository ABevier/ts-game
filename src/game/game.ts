import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Tree";
import { Record } from "../utils/record";
import { Hero } from "./hero";
import { Position } from "./position";

type Option<V> = option.Option<V>;

export type Game = {
  readonly heroes: Readonly<Record<string, Hero>>;
};

// TODO: better name for this?
// TODO: how to handle self target type -i.e. unit targets itself?
export const enum TargetType {
  Empty,
  Friend,
  Enemy,
  DeadFriend,
  DeadEnemy,
}

const newGame = (): Game => {
  const heroList: Hero[] = [
    Hero.newHero("1", "player-1", { x: 1, y: 1 }),
    Hero.newHero("2", "player-1", { x: 2, y: 2 }),
    Hero.newHero("3", "player-1", { x: 1, y: 3 }),
    Hero.newHero("4", "player-2", { x: 7, y: 1 }),
    Hero.newHero("5", "player-2", { x: 6, y: 2 }),
    Hero.newHero("6", "player-2", { x: 7, y: 3 }),
  ];

  const heroes = heroList.reduce((acc, hero) => ({ ...acc, [hero.id]: hero }), {});

  return {
    heroes,
  };
};

const updateHero = (game: Game, hero: Hero): Game => {
  const heroes = { ...game.heroes, [hero.id]: hero };
  return { ...game, heroes };
};

const removeHero = (game: Game, hero: Hero): Game => {
  const { [hero.id]: _, ...heroes } = game.heroes;
  return { ...game, heroes };
};

const findHeroAtPosition = (game: Game, pos: Position): Option<Hero> => {
  return Record.findEntry(game.heroes, (_, hero) => Position.equals(hero.position, pos));
};

const isPositionEmpty = (game: Game, pos: Position): boolean => {
  return option.isNone(findHeroAtPosition(game, pos));
};

const findFriendlyHeroAtPosition = (game: Game, pos: Position, playerId: string): Option<Hero> => {
  return pipe(
    findHeroAtPosition(game, pos),
    //TODO: curry isFriendly maybe
    option.filter((hero) => Hero.isFriendly(hero, playerId))
  );
};

const findEnemyHeroAtPosition = (game: Game, pos: Position, playerId: string): Option<Hero> => {
  return pipe(
    findHeroAtPosition(game, pos),
    //TODO: curry?
    option.filter((hero) => Hero.isEnemy(hero, playerId))
  );
};

const isEnemyHeroAtPosition = (game: Game, pos: Position, playerId: string): boolean => {
  return option.isSome(findEnemyHeroAtPosition(game, pos, playerId));
};

// TODO: This might need to get moved to Input
const findTargetType = (game: Game, pos: Position, playerId: string): TargetType => {
  return pipe(
    findHeroAtPosition(game, pos),
    option.map(heroToTargetType(playerId)),
    option.fold(
      () => TargetType.Empty,
      (tt) => tt
    )
  );
};

//TODO: rename
const heroToTargetType =
  (playerId: string) =>
  (hero: Hero): TargetType => {
    if (Hero.isFriendly(hero, playerId)) {
      return Hero.isAlive(hero) ? TargetType.Friend : TargetType.DeadFriend;
    } else {
      return Hero.isAlive(hero) ? TargetType.Enemy : TargetType.DeadEnemy;
    }
  };

export const Game = {
  newGame,
  updateHero,
  removeHero,
  findHeroAtPosition,
  isPositionEmpty,
  findFriendlyHeroAtPosition,
  findEnemyHeroAtPosition,
  isEnemyHeroAtPosition,
  findTargetType,
};
