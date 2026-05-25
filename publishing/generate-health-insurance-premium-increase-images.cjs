const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const slug = "health-insurance-premium-increase-by-age-2569";
const outDir = path.join(__dirname, "..", "public", "images");

const palette = {
  navy: "#0B2A4A",
  deep: "#061B32",
  teal: "#2F8F8A",
  softTeal: "#DDEFEA",
  cream: "#F7F1E6",
  warm: "#FFF9EF",
  gold: "#D9A441",
  softGold: "#F1D58A",
  coral: "#E86A4A",
  blue: "#EAF6FA",
  green: "#7C9B8E",
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lines(text, x, y, size, color, weight = 700, gap = 1.22, anchor = "start") {
  return text.split("\n").map((line, index) => {
    const yy = y + index * size * gap;
    return `<text x="${x}" y="${yy}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(line)}</text>`;
  }).join("");
}

function card(x, y, w, h, title, detail, icon, accent = palette.teal) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="#FFFFFF" opacity="0.96"/>
    <circle cx="${x + 54}" cy="${y + 58}" r="28" fill="${accent}" opacity="0.18"/>
    <text x="${x + 54}" y="${y + 70}" text-anchor="middle" font-size="34">${icon}</text>
    <text x="${x + 98}" y="${y + 52}" fill="${palette.navy}" font-size="30" font-weight="800">${esc(title)}</text>
    <text x="${x + 98}" y="${y + 93}" fill="${palette.deep}" font-size="23" font-weight="500">${esc(detail)}</text>
  `;
}

function personScene(x, y, scale = 1) {
  return `
    <ellipse cx="${x + 170 * scale}" cy="${y + 445 * scale}" rx="${170 * scale}" ry="${34 * scale}" fill="${palette.deep}" opacity="0.12"/>
    <rect x="${x + 40 * scale}" y="${y + 165 * scale}" width="${290 * scale}" height="${250 * scale}" rx="${46 * scale}" fill="#FFFFFF" opacity="0.9"/>
    <rect x="${x + 78 * scale}" y="${y + 205 * scale}" width="${214 * scale}" height="${28 * scale}" rx="${14 * scale}" fill="${palette.softTeal}"/>
    <rect x="${x + 78 * scale}" y="${y + 250 * scale}" width="${176 * scale}" height="${22 * scale}" rx="${11 * scale}" fill="${palette.softGold}"/>
    <rect x="${x + 78 * scale}" y="${y + 292 * scale}" width="${196 * scale}" height="${22 * scale}" rx="${11 * scale}" fill="${palette.blue}"/>
    <circle cx="${x + 190 * scale}" cy="${y + 94 * scale}" r="${70 * scale}" fill="#F1C29B"/>
    <path d="M ${x + 116 * scale} ${y + 93 * scale} C ${x + 135 * scale} ${y + 18 * scale}, ${x + 250 * scale} ${y + 20 * scale}, ${x + 264 * scale} ${y + 96 * scale} C ${x + 230 * scale} ${y + 60 * scale}, ${x + 166 * scale} ${y + 65 * scale}, ${x + 116 * scale} ${y + 93 * scale} Z" fill="${palette.deep}"/>
    <path d="M ${x + 105 * scale} ${y + 165 * scale} C ${x + 150 * scale} ${y + 130 * scale}, ${x + 230 * scale} ${y + 130 * scale}, ${x + 275 * scale} ${y + 165 * scale} L ${x + 315 * scale} ${y + 445 * scale} L ${x + 65 * scale} ${y + 445 * scale} Z" fill="${palette.teal}"/>
    <path d="M ${x + 122 * scale} ${y + 216 * scale} C ${x + 170 * scale} ${y + 248 * scale}, ${x + 218 * scale} ${y + 248 * scale}, ${x + 266 * scale} ${y + 216 * scale}" fill="none" stroke="${palette.warm}" stroke-width="${9 * scale}" stroke-linecap="round"/>
    <circle cx="${x + 164 * scale}" cy="${y + 100 * scale}" r="${8 * scale}" fill="${palette.deep}"/>
    <circle cx="${x + 216 * scale}" cy="${y + 100 * scale}" r="${8 * scale}" fill="${palette.deep}"/>
    <path d="M ${x + 164 * scale} ${y + 128 * scale} C ${x + 178 * scale} ${y + 140 * scale}, ${x + 204 * scale} ${y + 140 * scale}, ${x + 218 * scale} ${y + 128 * scale}" fill="none" stroke="${palette.deep}" stroke-width="${6 * scale}" stroke-linecap="round"/>
  `;
}

function bg(w, h) {
  return `
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <circle cx="${w * 0.86}" cy="${h * 0.18}" r="${w * 0.18}" fill="${palette.softTeal}" opacity="0.65"/>
    <circle cx="${w * 0.1}" cy="${h * 0.84}" r="${w * 0.14}" fill="${palette.softGold}" opacity="0.35"/>
    <path d="M 0 ${h * 0.78} C ${w * 0.28} ${h * 0.66}, ${w * 0.54} ${h * 0.96}, ${w} ${h * 0.73} L ${w} ${h} L 0 ${h} Z" fill="#FFFFFF" opacity="0.42"/>
  `;
}

function svg(w, h, body) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${palette.warm}"/>
        <stop offset="45%" stop-color="${palette.cream}"/>
        <stop offset="100%" stop-color="${palette.blue}"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="${palette.deep}" flood-opacity="0.16"/>
      </filter>
    </defs>
    <style>
      text { font-family: "Noto Sans Thai", "Tahoma", sans-serif; dominant-baseline: alphabetic; }
    </style>
    ${bg(w, h)}
    ${body}
  </svg>`;
}

async function render(name, markup, quality = 84) {
  const file = path.join(outDir, name);
  await sharp(Buffer.from(markup)).webp({ quality }).toFile(file);
  return file;
}

async function renderJpgFromSvg(name, markup) {
  await sharp(Buffer.from(markup)).resize(1200, 630).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, name));
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const cover = svg(1920, 1080, `
    <g filter="url(#shadow)">
      <rect x="110" y="118" width="1000" height="790" rx="54" fill="#FFFFFF" opacity="0.82"/>
    </g>
    ${lines("เบี้ยประกันสุขภาพ\nเพิ่มตามอายุ", 170, 275, 92, palette.navy, 900)}
    ${lines("วางแผนยังไง\nไม่ให้จ่ายไม่ไหว", 174, 500, 54, palette.teal, 800)}
    ${card(170, 660, 410, 128, "ดูงบระยะยาว", "ไม่ใช่แค่เบี้ยปีแรก", "฿", palette.gold)}
    ${card(610, 660, 410, 128, "เช็กโรงพยาบาล", "ค่าห้องและวงเงินต้องพอ", "🏥", palette.teal)}
    <rect x="170" y="820" width="520" height="58" rx="29" fill="${palette.navy}"/>
    <text x="430" y="859" fill="#FFFFFF" font-size="26" font-weight="800" text-anchor="middle">Created by Mr.Miixz</text>
    ${personScene(1230, 270, 1.25)}
  `);

  const problem = svg(1080, 1350, `
    ${lines("ปีแรกจ่ายไหว\nปีต่อไปเริ่มหนัก?", 92, 185, 68, palette.navy, 900)}
    ${lines("ปัญหาไม่ใช่แค่เบี้ยแพง\nแต่คือความคุ้มครองอาจสะดุด", 96, 365, 34, palette.deep, 650)}
    ${personScene(360, 455, 1.05)}
    <g filter="url(#shadow)">
      ${card(88, 930, 904, 116, "อายุเพิ่ม", "เบี้ยบางแบบอาจปรับตามช่วงอายุ", "⏳", palette.coral)}
      ${card(88, 1070, 904, 116, "ค่ารักษาสูงขึ้น", "ค่ายา ค่าห้อง และค่าตรวจเปลี่ยนได้", "📈", palette.gold)}
      ${card(88, 1210, 904, 116, "ยกเลิกง่ายเกินไป", "สมัครใหม่อาจต้องดูสุขภาพใหม่", "🛡️", palette.teal)}
    </g>
    <text x="88" y="1298" fill="${palette.navy}" font-size="24" font-weight="800">Created by Mr.Miixz</text>
  `);

  const explain = svg(1080, 1350, `
    ${lines("เบี้ยสุขภาพ\nเปลี่ยนเพราะอะไร?", 88, 155, 66, palette.navy, 900)}
    <g filter="url(#shadow)">
      <rect x="86" y="315" width="908" height="700" rx="42" fill="#FFFFFF" opacity="0.94"/>
      ${card(132, 370, 810, 108, "อายุและช่วงวัย", "ยิ่งอายุสูง ความเสี่ยงสุขภาพมักมากขึ้น", "🎂", palette.teal)}
      ${card(132, 505, 810, 108, "วงเงินและค่าห้อง", "แผนใหญ่ขึ้น เบี้ยก็มักสูงขึ้น", "🏥", palette.gold)}
      ${card(132, 640, 810, 108, "สุขภาพและประวัติเคลม", "มีผลต่อการพิจารณาบางกรณี", "📋", palette.green)}
      ${card(132, 775, 810, 108, "ต้นทุนค่ารักษา", "ค่ารักษาและเทคโนโลยีแพทย์เปลี่ยนได้", "💊", palette.coral)}
      ${card(132, 910, 810, 108, "เงื่อนไขกรมธรรม์", "รวมถึง deductible หรือ copayment", "✅", palette.navy)}
    </g>
    <rect x="120" y="1105" width="840" height="112" rx="34" fill="${palette.softTeal}"/>
    ${lines("อ่านใบเสนอขายและเงื่อนไขก่อนตัดสินใจ", 540, 1174, 32, palette.navy, 800, 1.2, "middle")}
    <text x="88" y="1298" fill="${palette.navy}" font-size="24" font-weight="800">Created by Mr.Miixz</text>
  `);

  const solution = svg(1080, 1350, `
    ${lines("วางแผนยังไง\nให้จ่ายต่อไหว", 88, 155, 66, palette.navy, 900)}
    ${lines("คิดแบบระยะยาว ก่อนถึงวันต่ออายุ", 92, 330, 34, palette.teal, 800)}
    <g filter="url(#shadow)">
      ${card(88, 430, 904, 112, "1. เลือกโรงพยาบาลที่ใช้จริง", "เริ่มจากค่าห้องและค่ารักษาที่เจอได้", "🏥", palette.teal)}
      ${card(88, 570, 904, 112, "2. ตั้งงบเบี้ยต่อปี", "ต้องไม่เบียดเงินสำรองฉุกเฉิน", "฿", palette.gold)}
      ${card(88, 710, 904, 112, "3. เผื่อเบี้ยปรับตามอายุ", "มอง 3-5 ปี ไม่ใช่แค่ปีแรก", "📆", palette.green)}
      ${card(88, 850, 904, 112, "4. เช็กทางเลือกก่อนลดแผน", "ดูผลกระทบต่อวงเงินและเงื่อนไข", "🔎", palette.coral)}
      ${card(88, 990, 904, 112, "5. คุยก่อนใกล้หมดเขต", "มีเวลาตัดสินใจมากกว่า", "💬", palette.navy)}
    </g>
    ${personScene(405, 1090, 0.55)}
    <text x="88" y="1298" fill="${palette.navy}" font-size="24" font-weight="800">Created by Mr.Miixz</text>
  `);

  const cta = svg(1080, 1350, `
    ${lines("ยังไม่แน่ใจว่า\nเบี้ยที่จ่ายอยู่เหมาะไหม?", 88, 170, 58, palette.navy, 900)}
    ${lines("ให้มิกช่วยดูให้แบบเข้าใจง่าย\nไม่ฮาร์ดเซลล์ เช็กตามชีวิตจริง", 92, 340, 34, palette.deep, 650)}
    <g filter="url(#shadow)">
      <rect x="120" y="475" width="840" height="430" rx="54" fill="#FFFFFF" opacity="0.96"/>
      ${personScene(390, 515, 0.72)}
      <rect x="210" y="780" width="660" height="76" rx="38" fill="${palette.teal}"/>
      <text x="540" y="831" text-anchor="middle" fill="#FFFFFF" font-size="34" font-weight="900">ปรึกษาฟรี</text>
    </g>
    <rect x="108" y="970" width="864" height="210" rx="42" fill="${palette.navy}"/>
    ${lines("โทร 082-9424666\nLINE OA: @iax8890w", 540, 1055, 42, "#FFFFFF", 900, 1.45, "middle")}
    <rect x="236" y="1210" width="608" height="64" rx="32" fill="${palette.gold}"/>
    <text x="540" y="1253" text-anchor="middle" fill="${palette.deep}" font-size="28" font-weight="900">Created by Mr.Miixz</text>
  `);

  await render(`${slug}-cover.webp`, cover, 82);
  await render(`${slug}-problem.webp`, problem, 84);
  await render(`${slug}-explain.webp`, explain, 84);
  await render(`${slug}-solution.webp`, solution, 84);
  await render(`${slug}-cta.webp`, cta, 84);
  await renderJpgFromSvg(`${slug}-og.jpg`, cover);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
