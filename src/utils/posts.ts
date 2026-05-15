import type { CollectionEntry } from "astro:content";

export function postSlug(post: CollectionEntry<"blog">) {
  return post.id.replace(/\.mdx?$/, "");
}
