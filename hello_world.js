const fs = require('fs');
const path = require('path');

const dir = __dirname;
const chunks = fs.readdirSync(dir)
  .filter(name => /^p\d+\.json$/.test(name))
  .sort();

let total = 0;

for (const file of chunks) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8').trim();

  // Chunks contain object entries without outer braces.
  const normalized = raw.replace(/,\s*$/, '');
  const data = JSON.parse(`{${normalized}}`);
  const count = Object.keys(data).length;

  total += count;
  console.log(`${file}: ${count}`);
}

console.log(`TOTAL: ${total}`);
