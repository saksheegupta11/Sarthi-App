const fs = require('fs');
const file = 'client/public/assets/images/sarthi-mobile-logo.png';
try {
  const buf = fs.readFileSync(file);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  fs.writeFileSync('dimensions_output.txt', `${width}x${height}`);
} catch (err) {
  fs.writeFileSync('dimensions_output.txt', `Error: ${err.message}`);
}
