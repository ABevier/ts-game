import { HeroKind, HeroSpec } from "./heroSpec";
import { Position } from "./position";

export type Hero = {
  readonly id: string;
  readonly playerId: string;
  readonly hp: number;
  readonly position: Position;
  readonly kind: string;
};

const newHero = (id: string, playerId: string, position: Position, kind: HeroKind): Hero => {
  const { maxHP } = HeroSpec.specForKind(kind);

  return {
    id,
    playerId,
    hp: maxHP,
    position,
    kind,
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

const isAlive = (hero: Hero): boolean => {
  return hero.hp > 0;
};

const isFriendly = (hero: Hero, playerId: string): boolean => {
  return hero.playerId === playerId;
};

const isEnemy = (hero: Hero, playerId: string): boolean => {
  return !isFriendly(hero, playerId);
};

export const Hero = {
  newHero,
  move,
  applyDamage,
  isDead,
  isAlive,
  isFriendly,
  isEnemy,
};
