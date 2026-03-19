const fs = require('fs');
const path = require('path');

const dir = 'client/public/assets/images/';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.png')) {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);
    if (buffer.length > 24) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      console.log(`${file}: ${width}x${height}`);
    }
  }
});
