# ts-game

### Code

trying to do as much FP as possible, but Phaser will change that
Trying to organize code something like you would in Elixir
One interface/type per "module".  
Module name is Capitalized plural of the type. i.e. Type: Game -> Module: Games

FP Libraries to look at:
fp-ts
immutableJS
??

Input flow:
Input -> Command -> new game state

### Design notes

the destination position "infers" the move you want to make there.
Click on empty square to move there, enemy to attack them, etc

Types of "inputs" and sample commands they mean:

- empty square -> move
- enemy square -> attack
- friendly square -> heal
- dead enemy square -> stomp (bury)
- dead friend square -> rez
- self square -> Not sure about this

Addtionally can take range into effect:

- enemy square next to me -> melee attack
- enemy square far away -> ranged attack

### TODO:

- Get prototype of just the library
- Add jest tests
- create cli client
- ???
