const path = require('path');
const sharp = require('sharp');

const sourceDir = 'E:/mrmiixz/Picture [Ai]';
const targetDir = path.resolve(__dirname, '..', 'public', 'images');

const imageMap = [
  {
    source: 'ChatGPT Image 20 พ.ค. 2569 12_38_48 (1).png',
    target: 'insurance-contract-validity-before-paying-premium-2569-cover.jpg',
  },
  {
    source: 'ChatGPT Image 20 พ.ค. 2569 12_38_48 (4).png',
    target: 'insurance-contract-validity-before-paying-premium-2569-paid-not-complete.jpg',
  },
  {
    source: 'ChatGPT Image 20 พ.ค. 2569 12_38_48 (3).png',
    target: 'insurance-contract-validity-before-paying-premium-2569-seven-factors.jpg',
  },
  {
    source: 'ChatGPT Image 20 พ.ค. 2569 12_38_48 (2).png',
    target: 'insurance-contract-validity-before-paying-premium-2569-before-payment-checklist.jpg',
  },
  {
    source: 'ChatGPT Image 20 พ.ค. 2569 12_38_48 (5).png',
    target: 'insurance-contract-validity-before-paying-premium-2569-line-oa-check.jpg',
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
