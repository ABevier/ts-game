import { Position } from "./position";

export type Hero = {
  readonly id: string;
  readonly playerId: string;
  readonly hp: number;
  readonly position: Position;
};

const newHero = (id: string, playerId: string, position: Position): Hero => {
  return {
    id,
    playerId,
    hp: 800,
    position,
  };
};

const move = (hero: Hero, position: Position): Hero => {
  return { ...hero, position };
};

const applyDamage = (hero: Hero, amt: number): Hero => {
  //TODO: is there where armor and stuff should get taken into account??
  const hp = Math.max(0, hero.hp - amt);
  return { ...hero, hp };
};

const isDead = (hero: Hero): boolean => {
  return hero.hp === 0;
};

const isFriendly = (hero: Hero, playerId: string): boolean => {
  return hero.playerId === playerId;
};

const isEnemy = (hero: Hero, playerId: string): boolean => {
  return !isFriendly(hero, playerId);
};

export const Heroes = {
  newHero,
  move,
  applyDamage,
  isDead,
  isFriendly,
  isEnemy,
};
