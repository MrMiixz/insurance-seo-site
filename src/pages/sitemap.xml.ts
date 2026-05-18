import { getCollection } from "astro:content";
import { postSlug } from "../utils/posts";

const pages = ["/", "/blog/", "/tools/", "/interest/", "/contact/"];

export async function GET({ site }: { site: URL }) {
  const posts = (await getCollection("blog")).map((post) => `/blog/${postSlug(post)}/`);
  const urls = [...pages, ...posts]
    .map((path) => `<url><loc>${new URL(path, site).toString()}</loc></url>`)
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml" }
  });
}
