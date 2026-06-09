const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (emojiRegex.test(line)) {
      console.log(`${f}:${index + 1}: ${line.trim()}`);
    }
  });
});
