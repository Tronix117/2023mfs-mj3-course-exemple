//----- Implements
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace t9 {
  abstract class Animal {
    abstract birth(): void;
  }

  // Un simple enum est converti en objet au runtime, Direction.Up => Direction.Up
  // cela permet notamment de faire Object.keys(Direction) => Up, Down, Left, Right, ...
  enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
    Forward = 'Forward',
    Backward = 'Backward',
  }

  // Un const enum n'existera plus au runtime, tous les KeyboardKey.Up auront été remplacé par "Up"
  enum KeyboardKey {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
  }

  interface AnimalMovements {
    availableDirections: Direction[];
    walk(key: KeyboardKey): Direction | null;
  }

  interface AnimalNutrition {
    eat(): string | null;
  }

  class Dog extends Animal implements AnimalMovements, AnimalNutrition {
    availableDirections: Direction[] = [Direction.Forward];

    walk(key: KeyboardKey) {
      return key === KeyboardKey.Up ? Direction.Forward : null;
    }

    eat() {
      return null;
    }

    birth() {
      console.log('dog born');
    }
  }

  class Crab extends Animal implements AnimalMovements {
    availableDirections: Direction[] = [Direction.Left, Direction.Right];

    walk(key: KeyboardKey) {
      if (key === KeyboardKey.Up || key === KeyboardKey.Down) return null;

      return Direction[KeyboardKey[key]];
      // return key === KeyboardKey.Left ? Direction.Left : Direction.Right;
    }

    birth() {
      console.log('crab born');
    }
  }
}
