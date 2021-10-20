import { either, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { AttackCommand } from "./command/attack";
import { Command } from "./command/command";
import { MoveCommand } from "./command/move";
import { StompCommand } from "./command/stomp";
import { Game } from "./game";
import { Hero } from "./hero";
import { Position } from "./position";

type Either<E, A> = either.Either<E, A>;

interface Input {
  source: Position;
  target: Position;
}

//TODO: what does fp-ts have for arrays?
const applyManyInputs = (game: Game, playerId: string, inputs: Input[]): Either<string, Game> => {
  return inputs.reduce(
    (accumulator: Either<string, Game>, input: Input) =>
      pipe(
        accumulator,
        either.chain((g: Game) => handleInput(g, playerId, input))
      ),
    either.right(game)
  );
};

//TODO: use either types here
const handleInput = (game: Game, playerId: string, { source, target }: Input): Either<string, Game> => {
  return pipe(
    Game.findFriendlyHeroAtPosition(game, source, playerId),
    option.fold(
      () => either.left(`no hero at: ${source.x + "," + source.y}`),
      (hero) => processCommand(game, hero, target)
    )
  );
};

const processCommand = (game: Game, hero: Hero, target: Position): Either<string, Game> => {
  const commands: Command[] = [MoveCommand, AttackCommand, StompCommand];
  const targetType = Game.findTargetType(game, target, hero.playerId);

  const maybeCommand = commands.find((cmd) => cmd.match(hero, targetType, target));
  if (maybeCommand) {
    return maybeCommand.apply(game, hero, target);
  }
  return either.left(`no command to execute on target: ${target.x}, ${target.y}`);
};

export const Input = {
  applyManyInputs,
  handleInput,
};
