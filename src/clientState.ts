import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { Game } from "./game/game";

type Either<E, A> = either.Either<E, A>;

export interface ClientState {
  prompt: string;
  game: Game;
  baseGame: Game;
}

//TODO: client state module
const newClientState = (game: Game): ClientState => {
  return { prompt: "", game, baseGame: game };
};

const updatePrompt = (state: ClientState, prompt: string): ClientState => {
  return { ...state, prompt };
};

const updateGame = (state: ClientState, game: Game): ClientState => {
  //TODO: pull the prompt from the game?
  return { ...state, prompt: "", game };
};

const applyResult = (state: ClientState) => (result: Either<string, Game>) => {
  return pipe(
    result,
    either.fold(
      (err) => updatePrompt(state, err),
      (game) => updateGame(state, game)
    )
  );
};

const reset = (state: ClientState): ClientState => {
  return { ...state, prompt: "Reset", game: state.baseGame };
};

export const ClientState = {
  newClientState,
  updatePrompt,
  updateGame,
  applyResult,
  reset,
};
