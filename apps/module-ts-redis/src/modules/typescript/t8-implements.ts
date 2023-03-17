//----- Implements

abstract class Animal {
  abstract birth(): void;
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward';
type Key = 'up' | 'down' | 'left' | 'right';

interface AnimalMovements {
  availableDirections: Direction[];
  walk(key: Key): Direction | null;
}

interface AnimalNutrition {
  eat(): string | null;
}

class Dog extends Animal implements AnimalMovements, AnimalNutrition {
  availableDirections: Direction[] = ['forward'];

  walk(key: Key) {
    return key === 'up' ? 'forward' : null;
  }

  eat() {
    return null;
  }

  birth() {
    console.log('dog born');
  }
}

class Crab extends Animal implements AnimalMovements {
  availableDirections: Direction[] = ['left', 'right'];

  walk(key: Key) {
    return key !== 'up' && key !== 'down' ? key : null;
  }

  birth() {
    console.log('crab born');
  }
}
