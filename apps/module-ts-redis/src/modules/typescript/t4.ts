const aa: {
  pseudo: string;
  age: number;
} = { pseudo: 'sfgddsgf', age: 453 };

const ab: {
  pseudo: string;
  age: number;
  [key: string]: unknown;
} = { pseudo: 'sfgddsgf', age: 453, 'nimporte quoi': 91293 };

const ac: { [key: string]: unknown } = {};
const ad: Record<string, unknown> = {};

// ac et ad sont de même type

if (typeof ac['sdfdsfd'] === 'string') {
  console.log(ac['sdfdsfd']);
}

console.log(aa, ab, ac, ad);
