import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import readline from "readline";
import { Board } from "./game/board";
import { Game } from "./game/game";
import { Input } from "./game/input";
import { Position } from "./game/position";

type Either<E, A> = either.Either<E, A>;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

const re = /^(\d):(\d),(\d):(\d)$/;

//TODO: this is gross - use a reducer??
const handleInput = (input: string, state: Game): Either<string, Game> => {
  const match = input.match(re);
  if (match) {
    const source: Position = { x: parseInt(match[1]), y: parseInt(match[2]) };
    const target: Position = { x: parseInt(match[3]), y: parseInt(match[4]) };
    return Input.applyInput(state, "player-1", { source, target });
  } else if (input === "q") {
    rl.close();
    return either.left("");
  } else {
    return either.left("I don't understand that");
  }
};

const render = (text: string, game: Game) => {
  console.clear();
  console.log(text);
  console.log(Board.renderGame(game));
};

const prompt = (data: Either<string, Game>, oldState: Game) => {
  const [text, state] = pipe(
    data,
    either.fold(
      (e) => [e, oldState],
      (g) => ["", g]
    )
  );

  render(text, state);
  rl.question("Enter Command:", (input: string) => {
    const result = handleInput(input, state);
    prompt(result, state);
  });
};

const initialState = Game.newGame();
prompt(either.right(initialState), initialState);
