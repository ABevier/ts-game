import { Battle, Command, findActorBySlot } from "./lib";

const sides = [
  {
    active: [
      { id: "1" },
      { id: "2" },
    ],
    bench: [
      { id: "3" },
      { id: "4" },
    ]
  },
  {
    active: [
      { id: "5" },
      { id: "6" },
    ],
    bench: [
      { id: "7" },
      { id: "8" },
    ]
  },
]
  
const battle: Battle = { sides }

const cmd: Command = {
  source: { side: 0, position: 0},
  target: { side: 1, position: 0},
}

// run command
function runCommand() {
  const source = findActorBySlot(battle, cmd.source)
  if (!source) {
    console.log("did not find source")
    return
  }

  const target = findActorBySlot(battle, cmd.target)
  if (!target) {
    console.log("did not find source")
    return
  }

  console.log(`actor ${source.id} will attack ${target.id}`)
}

runCommand()
