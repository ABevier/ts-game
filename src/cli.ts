import { pipe } from "fp-ts/lib/function";
import readline from "readline";
import { Board } from "./game/board";
import { Game } from "./game/game";
import { Input } from "./game/input";
import { Position } from "./game/position";
import { ClientState } from "./clientState";

const re = /^(\d):(\d),(\d):(\d)$/;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

//TODO: this function is a big gross mess
const handleInput = (input: string, state: ClientState): ClientState => {
  const match = input.match(re);
  if (match) {
    // Make a move
    const { game } = state;
    const source: Position = { x: parseInt(match[1]), y: parseInt(match[2]) };
    const target: Position = { x: parseInt(match[3]), y: parseInt(match[4]) };
    return pipe(
      //
      Input.applyInput(game, game.activePlayer, { source, target }),
      ClientState.applyResult(state)
    );
  } else if (input === "r") {
    // Reset
    return ClientState.reset(state);
  } else if (input === "q") {
    // Quit
    rl.close();
    return ClientState.updatePrompt(state, "quitting...");
  } else if (input === "s") {
    // Submit
    // TODO: this is a shortcut / hack, it should submit a list of actions
    return ClientState.newClientState(Game.nextTurn(state.game));
  } else {
    return ClientState.updatePrompt(state, "I don't understand that");
  }
};

const render = ({ prompt, game }: ClientState) => {
  console.clear();
  console.log(prompt);
  console.log(Board.renderGame(game));
  console.log(Board.renderHUD(game));
};

const prompt = (state: ClientState) => {
  render(state);
  rl.question("Enter Command:", (input: string) => {
    const result = handleInput(input, state);
    prompt(result);
  });
};

prompt(ClientState.newClientState(Game.newGame()));
