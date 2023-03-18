import { Actor } from "./lib"

// There should be a handler for each type and maybe some way to validate that the 
// event is the correct type - use zod for schema enforcement? https://github.com/colinhacks/zod
export type EventHandler = (event: string, source: Actor, target: Actor) => void

export interface EventHub {
  // this should be like a trie of matching criteria 
  subscriptions:  Record<string, EventHandler[]>
}
