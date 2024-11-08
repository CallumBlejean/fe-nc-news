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
  const [currentVote, setCurrentVote] = useState(null)

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [postError, setPostError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    const savedVote = localStorage.getItem(`articleVote_${article_id}`);
    if (savedVote) {
      setCurrentVote(savedVote);
    }



    setIsLoading(true);

    fetchArticle(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setArticleVotes(fetchedArticle.votes);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error.response?.status);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    fetchComments(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error.response?.status)
        setIsLoading(false);
      });
  }, [article_id])

  function handleVote(vote) {
    const increment = vote === 'up' ? 1 : -1;
    if (currentVote === vote){
      setArticleVotes((prevVotes) => prevVotes - increment);
      setCurrentVote(null);
      localStorage.removeItem(`articleVote_${article_id}`);
    }else {
      setArticleVotes((prevVotes) => prevVotes + increment);
      setCurrentVote(vote);
      localStorage.setItem(`articleVote_${article_id}`, vote);
    }


    updateVote(article_id, increment)
      .catch((error) => {
        setArticleVotes((prevVotes) => prevVotes - increment);
        setIsError(true);
      });
  }

  function handlePostComment(event) {
    event.preventDefault();
    setIsPosting(true);

    postComment(article_id, user.username, newComment)
      .then((postedComment) => {
        setComments((prevComments) => comments ? [postedComment, ...prevComments] : [postedComment]);
        setNewComment("");
        setIsPosting(false);
      
      })

      .catch((error) => {
        setPostError(error.response?.status);
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
        setDeletingCommentId(null);
        setIsError(error)
      });
  }
  
  
    if (isError === 404) {
  return <p id="error-block">404: Article Not Found!</p>
} else if (isError === 400) {
  return <p id="error-block">400: Invalid Article ID - Must be a Number!</p>;
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
          <button id="upvote" disabled={currentVote === 'down'} onClick={() => handleVote("up")}>
          {currentVote === 'up' ? 'Undo Upvote' : 'Upvote'}
          </button>
          <p>Votes: {articleVotes}</p>
          <button id="downvote" disabled={currentVote === 'up'} onClick={() => handleVote("down")}>
          {currentVote === 'down' ? 'Undo Downvote' : 'Downvote'}

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
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment-box">
              <p>
                <b>{comment.author}</b> - {comment.created_at}
              </p>
              <p>{comment.body}</p>
              <p>Votes: {comment.votes}</p>
              {comment.author === user.username && (
                <button
                  id="delete-comment"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={deletingCommentId === comment.comment_id}
                >
                  {deletingCommentId === comment.comment_id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Make the first comment!</p>
        )}
      </div>
    </>
  );
}

export default ArticleId;
