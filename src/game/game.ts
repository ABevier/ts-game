import { either, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Record } from "../utils/record";
import { Hero } from "./hero";
import { HeroKind } from "./heroSpec";
import { Position } from "./position";

//TODO: break this module up.  It has useless functions and things that don't belong anymore

type Either<E, A> = either.Either<E, A>;
type Option<V> = option.Option<V>;

export interface Game {
  readonly activePlayer: string;
  readonly actionPoints: number;
  readonly heroes: Readonly<Record<string, Hero>>;
}

export const INITIAL_ACTION_POINTS = 5;

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
    Hero.newHero("1", "player-1", { x: 1, y: 1 }, HeroKind.a),
    Hero.newHero("2", "player-1", { x: 2, y: 2 }, HeroKind.b),
    Hero.newHero("3", "player-1", { x: 1, y: 3 }, HeroKind.a),
    Hero.newHero("4", "player-2", { x: 7, y: 1 }, HeroKind.a),
    Hero.newHero("5", "player-2", { x: 6, y: 2 }, HeroKind.b),
    Hero.newHero("6", "player-2", { x: 7, y: 3 }, HeroKind.a),
  ];

  const heroes = heroList.reduce((acc, hero) => ({ ...acc, [hero.id]: hero }), {});

  return {
    activePlayer: "player-1",
    actionPoints: INITIAL_ACTION_POINTS,
    heroes,
  };
};

const payForAction = (game: Game, amt: number): Either<string, Game> => {
  if (canTakeAction(game, amt)) {
    return either.right(setActionPoints(game, game.actionPoints - amt));
  }
  return either.left("Not enough Action Points");
};

const canTakeAction = (game: Game, amt: number) => {
  return game.actionPoints >= amt;
};

const setActionPoints = (game: Game, actionPoints: number) => {
  return { ...game, actionPoints };
};

const nextTurn = (game: Game): Game => {
  //TODO: clean this up
  const activePlayer = game.activePlayer === "player-1" ? "player-2" : "player-1";
  return { ...game, actionPoints: INITIAL_ACTION_POINTS, activePlayer };
};

const updateHero = (game: Game, hero: Hero): Game => {
  const heroes = { ...game.heroes, [hero.id]: hero };
  return { ...game, heroes };
};

// TODO: bury -> graveyard????
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

const findAllHeroesForPlayer = (game: Game, playerId: string): Hero[] => {
  return Record.filterEntries(game.heroes, (hero) => hero.playerId === playerId);
};

export const Game = {
  newGame,
  payForAction,
  nextTurn,
  updateHero,
  removeHero,
  findHeroAtPosition,
  isPositionEmpty,
  findFriendlyHeroAtPosition,
  findEnemyHeroAtPosition,
  isEnemyHeroAtPosition,
  findTargetType,
  findAllHeroesForPlayer,
};
