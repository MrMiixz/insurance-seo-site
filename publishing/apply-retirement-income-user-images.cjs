const path = require("node:path");
const sharp = require("sharp");

const sourceDir = "E:/mrmiixz/Picture [Ai]";
const outputDir = path.join(__dirname, "..", "public", "images");

const jobs = [
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_18_20 (1).png",
    target: "retirement-income-longevity-risk-planning-2569-cover.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_18_21 (2).png",
    target: "retirement-income-longevity-risk-planning-2569-longevity-risk.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_18_21 (3).png",
    target: "retirement-income-longevity-risk-planning-2569-retirement-formula.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_18_21 (4).png",
    target: "retirement-income-longevity-risk-planning-2569-five-layers.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_18_21 (5).png",
    target: "retirement-income-longevity-risk-planning-2569-line-oa-check.jpg",
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
