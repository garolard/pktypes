export enum Types {
  STEEL,
  WATER,
  BUG,
  DRAGON,
  ELECTRIC,
  GHOST,
  FIRE,
  FAIRY,
  ICE,
  FIGHTING,
  NORMAL,
  GRASS,
  PSYCHIC,
  ROCK,
  DARK,
  GROUND,
  POISON,
  FLY
}

const typesMatrix = [
	[.5,.5,1,1,.5,1,.5,2,2,1,1,1,1,2,1,1,1,1],
	[1,.5,1,.5,1,1,2,1,1,1,1,.5,1,2,1,2,1,1],
	[.5,1,1,1,1,.5,.5,.5,1,.5,1,2,2,1,2,1,.5,.5],
	[.5,1,1,2,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
	[1,2,1,.5,.5,1,1,1,1,1,1,.5,1,1,1,0,1,2],
	[1,1,1,1,1,2,1,1,1,1,0,1,2,1,.5,1,1,1],
	[2,.5,2,.5,1,1,.5,1,2,1,1,2,1,.5,1,1,1,1],
	[.5,1,1,2,1,1,.5,1,1,2,1,1,1,1,2,1,.5,1],
	[.5,.5,1,2,1,1,.5,1,.5,1,1,2,1,1,1,2,1,2],
	[2,1,.5,1,1,0,1,.5,2,1,2,1,.5,2,2,1,.5,.5],
	[.5,1,1,1,1,0,1,1,1,1,1,1,1,.5,1,1,1,1],
	[.5,2,.5,.5,1,1,.5,1,1,1,1,.5,1,2,1,2,.5,.5],
	[.5,1,1,1,1,1,1,1,1,2,1,1,.5,1,0,1,2,1],
	[.5,1,2,1,1,1,2,1,2,.5,1,1,1,1,1,.5,1,2],
	[1,1,1,1,1,2,1,.5,1,.5,1,1,2,1,.5,1,1,1],
	[2,1,.5,1,2,1,2,1,1,1,1,.5,1,2,1,1,2,0],
	[0,1,1,1,1,.5,1,2,1,1,1,2,1,.5,1,.5,.5,1],
	[.5,1,2,1,.5,1,1,1,1,2,1,2,1,.5,1,1,1,1],
];

export type ForAttackResult = {
  x2: number[];
  x1: number[];
  x05: number[];
  x0: number[];
}

export type ForDefenseResult = {
  x4: number[];
  x2: number[];
  x1: number[];
  x05: number[];
  x025: number[];
  x0: number[];
}

export function getForAttack(type: Types): ForAttackResult {
  if (type < 0)
    return {
      x2: [],
      x1: [],
      x05: [],
      x0: []
    };

  const x2: number[] = [];
  const x1: number[] = [];
  const x05: number[] = [];
  const x0: number[] = [];

  for (let x = 0; x < 18; x++) {
    switch (typesMatrix[type][x]) {
      case 0:
        x0.push(x);
        break;
      case .5:
        x05.push(x);
        break;
      case 1:
        x1.push(x);
        break;
      case 2:
        x2.push(x);
        break;
      default:
        break;
    }
  }

  return {
    x2,
    x1,
    x05,
    x0
  };
}

export function getForDefense(primaryType: Types, secondaryType: Types): ForDefenseResult {
  if (primaryType < 0)
    return {
      x4: [],
      x2: [],
      x1: [],
      x05: [],
      x025: [],
      x0: []
    };
  
  const x4: number[] = [];
  const x2: number[] = [];
  const x1: number[] = [];
  const x05: number[] = [];
  const x025: number[] = [];
  const x0: number[] = [];

  for (let x = 0; x < 18; x++) {
    const primaryFactor = typesMatrix[x][primaryType];
    const secondaryFactor = secondaryType < 0 ? 1 : typesMatrix[x][secondaryType];

    switch (primaryFactor * secondaryFactor) {
      case 0:
        x0.push(x);
        break;
      case .25:
        x025.push(x);
        break;
      case .5:
        x05.push(x);
        break;
      case 1:
        x1.push(x);
        break;
      case 2:
        x2.push(x);
        break;
      case 4:
        x4.push(x);
        break;
    }
  }

  return {
    x4,
    x2,
    x1,
    x05,
    x025,
    x0
  };
}