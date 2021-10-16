import { Records } from "../utils/record";
import { Hero, Heroes } from "./hero";
import { Position, Positions } from "./position";

export interface Game {
  readonly heroes: Readonly<Record<string, Hero>>;
}

const newGame = (): Game => {
  const heroList: Hero[] = [
    Heroes.newHero("1", "player-1", { x: 1, y: 1 }),
    Heroes.newHero("2", "player-1", { x: 2, y: 2 }),
    Heroes.newHero("3", "player-1", { x: 1, y: 3 }),
    Heroes.newHero("4", "player-2", { x: 7, y: 1 }),
    Heroes.newHero("5", "player-2", { x: 6, y: 2 }),
    Heroes.newHero("6", "player-2", { x: 7, y: 3 }),
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

const findHeroAtPosition = (game: Game, pos: Position): Hero | null => {
  return Records.findEntry(game.heroes, (_, hero) => Positions.equals(hero.position, pos));
};

const isPositionEmpty = (game: Game, pos: Position): boolean => {
  return findHeroAtPosition(game, pos) === null;
};

const findFriendlyHeroAtPosition = (game: Game, pos: Position, playerId: string): Hero | null => {
  //TODO: Need Option type BADLY
  const hero = findHeroAtPosition(game, pos);
  if (hero && Heroes.isFriendly(hero, playerId)) {
    return hero;
  }
  return null;
};

const findEnemyHeroAtPosition = (game: Game, pos: Position, playerId: string): Hero | null => {
  //TODO: Need Option type BADLY
  const hero = findHeroAtPosition(game, pos);
  if (hero && Heroes.isEnemy(hero, playerId)) {
    return hero;
  }
  return null;
};

export const Games = {
  newGame,
  updateHero,
  findHeroAtPosition,
  isPositionEmpty,
  findFriendlyHeroAtPosition,
  findEnemyHeroAtPosition,
};
