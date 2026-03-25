const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputSvg = path.join(__dirname, '../assets/icons/ikigai-icon.svg');
const assetDir = path.join(__dirname, '../assets');

async function generateSplash() {
  const svgBuffer = fs.readFileSync(inputSvg);
  
  // Splash Icon (1242x2436 is a common standard, Expo recommends 2436x2436)
  // Let's create an image that fits nicely with a black background
  // The icon should be placed in the center. We'll make the overall image 2048x2048
  // with the icon inside, maintaining the black background so it blends smoothly.
  
  await sharp(svgBuffer)
    .resize({
      width: 512, // Leave room for padding
      height: 512,
      fit: 'contain',
    })
    .extend({
      top: 768,
      bottom: 768,
      left: 768,
      right: 768,
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    })
    .flatten({ background: '#000000' })
    .png()
    .toFile(path.join(assetDir, 'splash-icon.png'));

  console.log('Splash icon regenerated successfully.');
}

generateSplash().catch(console.error);
