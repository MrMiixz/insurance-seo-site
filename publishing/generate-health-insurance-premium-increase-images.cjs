const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:/Users/User/.codex/generated_images/019e6073-fcf5-7223-b344-0d7b074dacf3';
const outDir = path.resolve(__dirname, '..', 'public', 'images');
const slug = 'health-insurance-premium-increase-by-age-2569';

const files = {
  cover: 'ig_0224c256223531bd016a149da269b4819185708d4eb7b3689a.png',
  problem: 'ig_0224c256223531bd016a149ddca61c81918e9d1ccd5a4ff59a.png',
  explain: 'ig_0224c256223531bd016a149e1f83a08191893009806bc78474.png',
  solution: 'ig_0224c256223531bd016a149ec4884c81918e9710881ed89e55.png',
  cta: 'ig_0224c256223531bd016a149f4c475c81918b5cf2896e3d3fb7.png',
};

function requireSource(name) {
  const source = path.join(srcDir, name);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing generated source image: ${source}`);
  }
  return source;
}

function svg(width, height, body) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>
        text {
          font-family: "Noto Sans Thai", "Tahoma", sans-serif;
          font-weight: 900;
          letter-spacing: 0;
        }
      </style>
      ${body}
    </svg>
  `);
}

function card(x, y, w, h, text, size = 35) {
  const lines = text.split('\n');
  const lineEls = lines
    .map((line, index) => {
      const lineY = y + 44 + index * 38;
      return `<text x="${x + w / 2}" y="${lineY}" text-anchor="middle" fill="#0B2A4A" font-size="${size}">${line}</text>`;
    })
    .join('');

  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="#fff" opacity="0.97"/>
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" rx="21" fill="none" stroke="#d8e4ef" stroke-width="2"/>
    ${lineEls}
  `;
}

async function writeCover() {
  const source = requireSource(files.cover);
  await sharp(source)
    .webp({ quality: 88 })
    .toFile(path.join(outDir, `${slug}-cover.webp`));

  await sharp(source)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outDir, `${slug}-og.jpg`));
}

async function writeSolution() {
  const source = requireSource(files.solution);
  const overlay = svg(
    876,
    585,
    `
      <rect x="0" y="0" width="876" height="585" rx="36" fill="#f7f9fb" opacity="0.985"/>
      ${card(35, 45, 806, 78, '1  เลือกโรงพยาบาลที่ใช้จริง', 34)}
      ${card(35, 145, 806, 78, '2  ตั้งงบเบี้ยต่อปี', 34)}
      ${card(35, 245, 806, 78, '3  เผื่อเบี้ยตามอายุ', 34)}
      ${card(35, 345, 806, 78, '4  เช็กทางเลือกก่อนลดแผน', 34)}
      ${card(35, 445, 806, 78, '5  คุยก่อนใกล้หมดเขต', 34)}
    `
  );

  await sharp(source)
    .composite([{ input: overlay, left: 35, top: 884 }])
    .webp({ quality: 88 })
    .toFile(path.join(outDir, `${slug}-solution.webp`));
}

async function writeSimple(sourceName, targetName) {
  await sharp(requireSource(sourceName))
    .webp({ quality: 88 })
    .toFile(path.join(outDir, targetName));
}

async function main() {
  await fs.promises.mkdir(outDir, { recursive: true });
  await writeCover();
  await writeSimple(files.problem, `${slug}-problem.webp`);
  await writeSimple(files.explain, `${slug}-explain.webp`);
  await writeSolution();
  await writeSimple(files.cta, `${slug}-cta.webp`);
  console.log(`Updated ${slug} image set in ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
