const path = require("node:path");
const sharp = require("sharp");

const sourceDir = "E:/mrmiixz/Picture [Ai]";
const outputDir = path.join(__dirname, "..", "public", "images");

const jobs = [
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_12_42 (1).png",
    target: "thai-life-telemedicine-online-doctor-2569-cover.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_12_43 (5).png",
    target: "thai-life-telemedicine-online-doctor-2569-minor-symptoms.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_12_42 (2).png",
    target: "thai-life-telemedicine-online-doctor-2569-suitable-symptoms.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_12_42 (4).png",
    target: "thai-life-telemedicine-online-doctor-2569-how-to-use.jpg",
  },
  {
    source: "ChatGPT Image 21 พ.ค. 2569 00_12_42 (3).png",
    target: "thai-life-telemedicine-online-doctor-2569-line-oa-check.jpg",
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
