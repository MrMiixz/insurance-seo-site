const path = require('path');
const sharp = require('sharp');

const sourceDir = 'E:/mrmiixz/Picture [Ai]';
const targetDir = path.resolve(__dirname, '..', 'public', 'images');

const imageMap = [
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_06_32 (1).png',
    target: 'cancer-fighting-guide-new-life-after-diagnosis-2569-cover.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_06_33 (4).png',
    target: 'cancer-fighting-guide-new-life-after-diagnosis-2569-start-after-diagnosis.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_06_32 (3).png',
    target: 'cancer-fighting-guide-new-life-after-diagnosis-2569-treatment-plan.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_06_33 (5).png',
    target: 'cancer-fighting-guide-new-life-after-diagnosis-2569-life-and-money-plan.jpg',
  },
  {
    source: 'ChatGPT Image 21 พ.ค. 2569 00_06_32 (2).png',
    target: 'cancer-fighting-guide-new-life-after-diagnosis-2569-line-oa-rights.jpg',
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
