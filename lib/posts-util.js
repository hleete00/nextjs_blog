import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getPostsFiles() {
  return fs.readdir(postsDirectory);
}

export async function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export async function getAllPosts() {
  const postFiles = await getPostsFiles();

  const allPosts = [];

  for (const postFile of postFiles) {
    const postData = await getPostData(postFile);
    allPosts.push(postData);
  }

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
