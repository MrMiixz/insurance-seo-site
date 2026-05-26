const path = require('path');
const sharp = require('sharp');

const sourceDir = 'E:/mrmiixz/Picture [Ai]';
const targetDir = path.resolve(__dirname, '..', 'public', 'images');

const imageMap = [
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_05_04 (1).png',
    target: 'heart-valve-regurgitation-preexisting-condition-buy-insurance-2569-cover.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_05_04 (2).png',
    target: 'heart-valve-regurgitation-preexisting-condition-buy-insurance-2569-health-details.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_05_09 (5).png',
    target: 'heart-valve-regurgitation-preexisting-condition-buy-insurance-2569-underwriting-results.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_05_09 (4).png',
    target: 'heart-valve-regurgitation-preexisting-condition-buy-insurance-2569-documents.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_05_08 (3).png',
    target: 'heart-valve-regurgitation-preexisting-condition-buy-insurance-2569-line-oa.jpg',
  },
];

async function main() {
  for (const item of imageMap) {
    const sourcePath = path.join(sourceDir, item.source);
    const targetPath = path.join(targetDir, item.target);
    await sharp(sourcePath).jpeg({ quality: 88, mozjpeg: true }).toFile(targetPath);
    const metadata = await sharp(targetPath).metadata();
    console.log(`${item.target}: ${metadata.width}x${metadata.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
