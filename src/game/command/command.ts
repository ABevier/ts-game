import { either } from "fp-ts";
import { Game, TargetType } from "../game";
import { Hero } from "../hero";
import { Position } from "../position";

type MatchCommandFunction = (hero: Hero, targetType: TargetType, target: Position) => boolean;
type ApplyCommandFunction = (game: Game, hero: Hero, target: Position) => either.Either<string, Game>;

export type Command = {
  match: MatchCommandFunction;
  apply: ApplyCommandFunction;
};
