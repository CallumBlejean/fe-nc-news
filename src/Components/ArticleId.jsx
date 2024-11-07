import { useEffect, useState } from "react";
import defaultImg from "../assets/default-pic.jpg";
import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import "../Components-CSS/ArticleId.css";
import {
  fetchArticle,
  fetchComments,
  updateVote,
  postComment,
  deleteComment,
} from "../api";

function ArticleId() {
  const user = useUser();
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [postError, setPostError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchArticle(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setArticleVotes(fetchedArticle.votes);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
    fetchComments(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  function handleVote(increment) {
    setArticleVotes((prevVotes) => prevVotes + increment);

    updateVote(article_id, increment)
      .then((newVotes) => {
        setArticleVotes(newVotes);
      })
      .catch((error) => {
        setArticleVotes((prevVotes) => prevVotes - increment);
        setIsError(true);
        setIsLoading(false);
      });
  }

  function handlePostComment(event) {
    event.preventDefault();
    setIsPosting(true);

    postComment(article_id, user.username, newComment)
      .then((postedComment) => {
        setComments((prevComments) => {
          return [postedComment, ...prevComments];
        });
        setNewComment("");
        setIsPosting(false);
      })

      .catch((error) => {
        setPostError(true);
        setIsPosting(false);
      });
  }

  function handleDeleteComment(comment_id) {
    setDeletingCommentId(comment_id);

    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeletingCommentId(null);
      })
      .catch((error) => {
        setDeletingCommentId(null)
        console.log(error);
      });
  }
  1;
  if (isError) {
    return <p>There was an error loading articles. Please try again later.</p>;
  }

  if (isLoading) {
    return <div className="loading-spinner">Loading articles...</div>;
  }

  return (
    <>
      <title>{article.title}</title>
      <div className="article-by-id">
        <img
          className="article-card-img"
          src={article.article_img_url ? article.article_img_url : defaultImg}
          alt="article image"
        />

        <p id="author">
          {article.author} - {article.topic} - {article.created_at}
        </p>
        <div id="body">{article.body}</div>
        <div className="vote-section">
          <button id="upvote" onClick={() => handleVote(1)}>
            Upvote
          </button>
          <p>Votes: {articleVotes}</p>
          <button id="downvote" onClick={() => handleVote(-1)}>
            Downvote
          </button>
        </div>
      </div>

      <div className="comments-section">
        <form onSubmit={handlePostComment}>
          <textarea
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Add a comment..."
            disabled={isPosting}
            required
          />
          <button type="submit" disabled={isPosting}>
            {isPosting ? "Posting..." : "Post Comment"}
          </button>
          {postError && <p>Error posting comment. Please try again.</p>}
        </form>

        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.comment_id} className="comment-box">
            <p>
              <b>{comment.author}</b> - {comment.created_at}
            </p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            {comment.author === user.username && (
              <button id="delete-comment"
                onClick={() => handleDeleteComment(comment.comment_id)}
                disabled={deletingCommentId === comment.comment_id}
              >
                {deletingCommentId === comment.comment_id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ArticleId;
