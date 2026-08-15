import { useEffect, useState } from "react";
import { PageLayout } from "../templates/PageLayout.jsx";
import { db } from "../../application/firebaseConfig.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function sanitize(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function GuestbookPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newEntries = [];
        snapshot.forEach((doc) => {
          newEntries.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setEntries(newEntries);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading entries:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setFormSuccess(false);

    try {
      const formData = new FormData(e.target);
      const name = sanitize(formData.get("name")?.trim() || "");
      const link = sanitize(formData.get("link")?.trim() || "");
      const message = sanitize(formData.get("message")?.trim() || "");
      const anonymous = formData.get("anonymous") === "on";

      // Validation
      if (!name || name.length > 64) {
        setFormError("Name is required and must be 64 characters or less");
        setSubmitting(false);
        return;
      }

      if (link && !link.includes("://")) {
        setFormError(
          "Link must be a valid URL starting with http:// or https://",
        );
        setSubmitting(false);
        return;
      }

      if (link && link.length > 128) {
        setFormError("Link must be 128 characters or less");
        setSubmitting(false);
        return;
      }

      if (!message || message.length > 320) {
        setFormError("Message is required and must be 320 characters or less");
        setSubmitting(false);
        return;
      }

      // Submit to Firestore
      await addDoc(collection(db, "guestbook"), {
        name: anonymous ? "(anon)" : name,
        link: link,
        message: message,
        timestamp: Date.now(),
      });

      setFormSuccess(true);
      e.target.reset();
      setTimeout(() => setFormSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting entry:", error);
      setFormError("Failed to submit entry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout activePath="/guestbook" className="guestbook-shell">
      <main className="guestbook-page">
        <div className="guestbook-heading-wrap">
          <h1>Guestbook</h1>
        </div>

        <form onSubmit={handleSubmit} className="guestbook-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            maxLength="64"
            required
            disabled={submitting}
          />
          <input
            type="url"
            name="link"
            placeholder="Link to web/social media presence"
            maxLength="128"
            disabled={submitting}
          />
          <textarea
            name="message"
            placeholder="Message"
            maxLength="320"
            required
            disabled={submitting}
          />
          <div className="guestbook-anonymous">
            <label htmlFor="formAnonymous">Submit anonymously?</label>
            <input
              type="checkbox"
              id="formAnonymous"
              name="anonymous"
              disabled={submitting}
            />
          </div>

          {formError && <div className="guestbook-error">{formError}</div>}
          {formSuccess && (
            <div className="guestbook-success">
              Entry submitted successfully!
            </div>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <hr className="guestbook-divider" />

        {loading && <div className="guestbook-status">Loading entries...</div>}
        {!loading && entries.length === 0 && (
          <div className="guestbook-status">No entries yet. Be the first!</div>
        )}

        <div className="guestbook-entries">
          {entries.map((entry) => (
            <article key={entry.id} className="guestbook-entry">
              <div className="guestbook-entry-header">
                {entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer ugc"
                    className="guestbook-name-link"
                  >
                    <h3>{entry.name}</h3>
                  </a>
                ) : (
                  <h3>{entry.name}</h3>
                )}
                <span className="guestbook-date">
                  {formatDate(entry.timestamp)}
                </span>
              </div>
              <p className="guestbook-message">{entry.message}</p>
            </article>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
