import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postArticle, fetchTopics } from "../api";
import "../Components-CSS/PostArticle.css"

function PostArticle() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [topics, setTopics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics()
      .then((topics) => setTopics(topics))
      .catch((err) => setError("Failed to load topics"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    postArticle(formData)
      .then((newArticle) => {
        setIsSubmitting(false);
        navigate(`/articles/${newArticle.article_id}`);
      })
      .catch((err) => {
        setError("Failed to post the article. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="post-article">
      <h2>Post a New Article</h2>
      <p style={{ color: "red", fontWeight: "bold" }}>
        Posting new articles is temporarily disabled. We apologize for the inconvenience.
      </p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Body:
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Topic:
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          >
            <option value="">Select a topic</option>
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>
        </label>
        <label>
          Image URL (Optional):
          <input
            type="url"
            name="article_img_url"
            value={formData.article_img_url}
            onChange={handleChange}
          />
        </label>
        <button  disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Article"}
        </button>
      </form>
    </div>
  );
}

export default PostArticle;
