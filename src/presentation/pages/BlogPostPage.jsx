import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageLayout } from "../templates/PageLayout.jsx";
import { fetchBlogPostBySlug } from "../../application/blogService.js";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export function BlogPostPage({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      try {
        const article = await fetchBlogPostBySlug(slug);
        if (!isMounted) {
          return;
        }

        if (!article) {
          setError("Unable to load this blog post.");
          return;
        }

        setPost(article);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError("Unable to load this blog post.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <PageLayout activePath="/blog" className="blog-post-shell">
      <main className="blog-post-page">
        {loading && <div className="blog-status">Loading article…</div>}
        {error && <div className="blog-status error">{error}</div>}

        {!loading && !error && post && (
          <>
            <div className="blog-post-breadcrumb" aria-label="Breadcrumb">
              <span>Blog</span>
              <span className="breadcrumb-divider">/</span>
              <span>{post.title}</span>
            </div>

            <h1>{post.title}</h1>
            {post.date && (
              <div className="blog-post-date">{formatDate(post.date)}</div>
            )}

            <article className="blog-post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          </>
        )}
      </main>
    </PageLayout>
  );
}
