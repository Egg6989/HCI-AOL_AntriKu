const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    // Check for emojis or non-ASCII by matching anything outside normal ASCII range
    // Ignore ©, —, etc which are common text symbols.
    const nonAsciiMatch = line.match(/[^\x00-\x7F]/g);
    if (nonAsciiMatch) {
      // filter out common text symbols like —, “, ”, ®, ©
      const unusual = nonAsciiMatch.filter(c => !'—“”’‘®© é'.includes(c));
      if (unusual.length > 0) {
        console.log(`${f}:${index + 1}: ${line.trim()}`);
      }
    }
  });
});
