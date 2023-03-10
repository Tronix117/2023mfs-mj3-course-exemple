const a = ['st', 12];

type StringOrNumber = string | number;

const b: StringOrNumber[] = [13, 'stdkhgjf'];
const c: string[] | number[] = [12, 43434];
const d: [string, number] = ['dsfgsdgs', 12];

const e = null;
const f = undefined;
const g: unknown = 'sldjfgsdklgjds';

if (typeof g === 'string') {
  console.log(g.replace('s', 'b'));
}

console.log(a, c, b, d, e, f, g, h, i, j, k, l, m);
