const fs = require('fs');
const path = require('path');

const source = path.resolve('..', 'WhatsApp Image 2024-10-01 at 14.09.45_9642c528.jpg');
const destDir = path.resolve('src', 'assets');
const dest = path.join(destDir, 'profile.jpg');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(source, dest);
console.log('Successfully copied profile image to assets directory.');
