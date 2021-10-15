import { recordMod } from "../utils/record";
import { Hero } from "./hero";
import { Position, positionMod } from "./position";

export interface Game {
  readonly heroes: Readonly<Record<string, Hero>>;
}

const create = (): Game => {
  const heroList = [
    { id: "1", position: { x: 1, y: 1 } },
    { id: "2", position: { x: 2, y: 2 } },
    { id: "3", position: { x: 1, y: 3 } },
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
  return recordMod.findEntry(game.heroes, (_, hero) => positionMod.equals(hero.position, pos));
};

export const gameMod = { create, updateHero, findHeroAtPosition };
