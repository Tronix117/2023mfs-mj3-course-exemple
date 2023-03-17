import redis from './modules/redis/index.js';

function main() {
  redis();
}

try {
  main();
} catch (err) {
  console.error(err);
}
