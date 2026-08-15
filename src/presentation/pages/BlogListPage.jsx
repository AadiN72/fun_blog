import { useEffect, useState } from "react";
import { PageLayout } from "../templates/PageLayout.jsx";
import { fetchBlogPosts } from "../../application/blogService.js";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        if (!isMounted) {
          return;
        }
        setPosts(data);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError("Unable to load blog posts right now.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout activePath="/blog" className="blog-shell">
      <main className="blog-page">
        <div className="blog-header-row">
          <h1>Blog</h1>
          <div className="blog-rss" aria-hidden="true">
            ◔
          </div>
        </div>

        {loading && <div className="blog-status">Loading posts…</div>}
        {error && <div className="blog-status error">{error}</div>}

        {!loading && !error && (
          <ol className="blog-list">
            {posts.map((post) => (
              <li key={post.slug || post.name} className="blog-card">
                <article>
                  <a href={post.url} className="blog-link">
                    <h2>{post.title}</h2>
                    {post.description && <p>{post.description}</p>}
                    {post.date && (
                      <time dateTime={new Date(post.date).toISOString()}>
                        {formatDate(post.date)}
                      </time>
                    )}
                  </a>
                </article>
              </li>
            ))}
          </ol>
        )}
      </main>
    </PageLayout>
  );
}
