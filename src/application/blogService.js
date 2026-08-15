import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN || undefined,
});
const REPO_OWNER = "AadiN72";
const REPO_NAME = "fun_blog_cdn";
const BLOG_CONTENTS_PATH = "files";

const parseFrontMatter = (markdown, fallbackName) => {
  const match = markdown.match(/^---\s*([\s\S]*?)\s*---\s*/);

  const fallbackSlug = fallbackName.replace(/\.md$/i, "");
  const output = {
    title: fallbackSlug.replace(/[-_]+/g, " "),
    slug: fallbackSlug,
    description: "",
    date: null,
  };

  if (!match) {
    return output;
  }

  const frontMatter = match[1];
  const entries = {};

  for (const line of frontMatter.split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) {
      continue;
    }

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();

    if (key) {
      entries[key] = value;
    }
  }

  if (entries.title) {
    output.title = entries.title;
  }

  if (entries.slug) {
    output.slug = entries.slug;
  }

  if (entries.date) {
    const parsedDate = new Date(entries.date);
    if (!Number.isNaN(parsedDate.getTime())) {
      output.date = parsedDate;
    }
  }

  const body = markdown.replace(match[0], "").trim();
  const summary = body
    .replace(/[#>*_`\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  output.description = summary.slice(0, 180);

  return output;
};

export const fetchBlogPosts = async () => {
  const { data } = await octokit.rest.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: BLOG_CONTENTS_PATH,
  });

  if (!Array.isArray(data)) {
    return [];
  }

  const markdownFiles = data.filter(
    (entry) =>
      entry.type === "file" && entry.name.toLowerCase().endsWith(".md"),
  );

  const posts = await Promise.all(
    markdownFiles.map(async (entry) => {
      const fileResponse = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: entry.path,
      });

      const fileData = Array.isArray(fileResponse.data)
        ? null
        : fileResponse.data;
      if (!fileData || !fileData.content) {
        return null;
      }

      const normalizedContent = fileData.content.replace(/\s/g, "");
      const binary = atob(normalizedContent);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const markdown = new TextDecoder().decode(bytes);
      const parsed = parseFrontMatter(markdown, entry.name);

      return {
        ...parsed,
        name: entry.name,
        path: entry.path,
        url: `/blog/${parsed.slug}`,
      };
    }),
  );

  return posts.filter(Boolean).sort((a, b) => {
    const left = a.date ? new Date(a.date).getTime() : 0;
    const right = b.date ? new Date(b.date).getTime() : 0;
    return right - left;
  });
};

export const fetchBlogPostBySlug = async (slug) => {
  const normalizedSlug = slug.replace(/\.md$/i, "");
  const response = await fetch(
    `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${BLOG_CONTENTS_PATH}/${normalizedSlug}.md`,
  );

  if (!response.ok) {
    return null;
  }

  const markdown = await response.text();
  const parsed = parseFrontMatter(markdown, `${normalizedSlug}.md`);
  const body = markdown.replace(/^---\s*[\s\S]*?\s*---\s*/, "").trim();

  return {
    ...parsed,
    content: body,
    path: `${BLOG_CONTENTS_PATH}/${normalizedSlug}.md`,
    url: `/blog/${parsed.slug}`,
  };
};
