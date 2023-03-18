import { Actor } from "./lib"

// There should be a handler for each type and maybe some way to validate that the 
// event is the correct type - use zod for schema enforcement? https://github.com/colinhacks/zod
export type EventHandler = (eventType: string, source: Actor, target: Actor) => void

export interface EventHub {
  // this should be like a trie of matching criteria and have a priority queue
  subscriptions:  Record<string, EventHandler[]>
}

export function subscribe(eventHub: EventHub, eventType: string, handler: EventHandler) {
  let sub = eventHub.subscriptions[eventType]
  if (!sub) {
    sub = []
    eventHub.subscriptions[eventType] = sub
  }
}

export function unsubscribe() {

}
