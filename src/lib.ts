export interface Battle {
  sides: Side[]
}

export interface Side {
  active: Actor[]
  bench: Actor[]
}

export interface Actor {
  id: string
}

// A slot is a position of an active actor in a battle
export interface Slot {
  side: number
  position: number
}

export interface Command {
  source: Slot
  // move: any
  target: Slot
}

//Battles
export function findActorById(battle: Battle, id: string) {
  return battle.sides.flatMap(getAllActors).find(a => a.id === id)
}

export function findActorBySlot(battle: Battle, slot: Slot): Actor | undefined {
  return battle.sides[slot.side]?.active[slot.position]
}

//Sides
function getAllActors(side: Side) {
  return [...side.active, ...side.bench]
}
