const path = require("node:path");
const sharp = require("sharp");

const sourceDir = "E:/mrmiixz/Picture [Ai]";
const outputDir = path.join(__dirname, "..", "public", "images");

const jobs = [
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_24_53 (1).png",
    target: "tax-deduction-planning-working-age-5-steps-2569-cover.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_24_54 (5).png",
    target: "tax-deduction-planning-working-age-5-steps-2569-tax-withheld-monthly.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_24_54 (2).png",
    target: "tax-deduction-planning-working-age-5-steps-2569-five-step-formula.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_24_54 (4).png",
    target: "tax-deduction-planning-working-age-5-steps-2569-choose-deduction-tools.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_24_54 (3).png",
    target: "tax-deduction-planning-working-age-5-steps-2569-line-oa-tax-consult.jpg",
  },
];

(async () => {
  for (const job of jobs) {
    const input = path.join(sourceDir, job.source);
    const output = path.join(outputDir, job.target);
    await sharp(input)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(output);
    console.log(`${job.source} -> ${job.target}`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
