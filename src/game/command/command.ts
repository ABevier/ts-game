import { either } from "fp-ts";
import { Game, TargetType } from "../game";
import { Hero } from "../hero";
import { Position } from "../position";

type Either<E, A> = either.Either<E, A>;

type MatchCommandFunction = (hero: Hero, targetType: TargetType, target: Position) => boolean;
type ApplyCommandFunction = (hero: Hero, target: Position) => (game: Game) => Either<string, Game>;

export interface Command {
  match: MatchCommandFunction;
  apply: ApplyCommandFunction;
}
