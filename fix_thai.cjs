const fs = require('fs');

const file = 'D:/1.me/profit-first/src/views/BookNotesView.vue';
let content = fs.readFileSync(file, 'utf8');

// Replace Thai ធ (U+0E1A) with Khmer ធ (U+1790)
content = content.replace(/\u0E1A/g, '\u1790');
// Replace Thai ่ (U+0E48) with Khmer coeng (U+17D2)
content = content.replace(/\u0E48/g, '\u17D2');
// Replace Thai อ (U+0E2D) with Khmer វ (U+179C)
content = content.replace(/\u0E2D/g, '\u179C');
// Replace Thai ย (U+0E22) with Khmer ើ (U+17BE)
content = content.replace(/\u0E22/g, '\u17BE');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Thai chars in BookNotesView.vue');

// Verify
const verify = fs.readFileSync(file, 'utf8');
let thaiCount = 0;
for (let i = 0; i < verify.length; i++) {
  const code = verify.charCodeAt(i);
  if (code >= 0x0E00 && code <= 0x0E7F) {
    thaiCount++;
    const line = verify.substring(0, i).split('\n').length;
    console.log(`REMAINING Thai at line ${line}: U+${code.toString(16).toUpperCase()}`);
  }
}
console.log('Thai chars remaining:', thaiCount);
