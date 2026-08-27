const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    if (!d.name.endsWith('.vue') && !d.name.endsWith('.js')) return;
    const c = fs.readFileSync(p, 'utf8');
    const lines = c.split('\n');
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];
      for (let i = 0; i < line.length; i++) {
        const code = line.charCodeAt(i);
        if (code >= 0x0E00 && code <= 0x0E7F) {
          const context = line.substring(Math.max(0, i - 5), i + 6);
          console.log(`THAI in ${d.name}:${lineNum + 1} pos ${i} code=U+${code.toString(16).toUpperCase()} context="${context}"`);
        }
      }
    }
  });
}

walk('D:/1.me/profit-first/src');
console.log('DONE');
