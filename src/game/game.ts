import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Record } from "../utils/record";
import { Hero } from "./hero";
import { Position } from "./position";

type Option<V> = option.Option<V>;

export type Game = {
  readonly heroes: Readonly<Record<string, Hero>>;
};

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

export const Game = {
  newGame,
  updateHero,
  findHeroAtPosition,
  isPositionEmpty,
  findFriendlyHeroAtPosition,
  findEnemyHeroAtPosition,
  isEnemyHeroAtPosition,
};
