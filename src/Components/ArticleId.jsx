import { useEffect, useState } from "react";
import defaultImg from "../assets/default-pic.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Components-CSS/ArticleId.css";

function ArticleId() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0)
  const articleURL = `https://be-nc-news-yg12.onrender.com/api/articles/${article_id}`;
  const commentsURL = `${articleURL}/comments`;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(articleURL)
      .then((response) => {
        setArticle(response.data.article);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
    axios
      .get(commentsURL)
      .then((response) => {
        setComments(response.data.comments);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [articleURL, commentsURL]);

function handleVote(increment) {
    
    setArticleVotes((prevVotes) => prevVotes + increment)

    axios
    .patch(articleURL, { inc_votes: increment})
    .then((response) => {
        setArticleVotes(response.data.article.votes)
    })
    .catch((error) => {
        setArticleVotes((prevVotes) => prevVotes - inc)
        setIsError(true);
        setIsLoading(false);
    })

}





  if (isError) {
    return <p>There was an error loading articles. Please try again later.</p>;
  }

  if (isLoading) {
    return <div className="loading-spinner">Loading articles...</div>;
  }




  return (
    <>
    <title>{article.title}e</title>
      <div className="article-by-id">
        <img
          className="article-card-img"
          src={article.article_img_url ? article.article_img_url : defaultImg}
          alt="article image"
        />
        
        <p id="author">
          {article.author} - {article.topic}
        </p>
        <div id="body">{article.body}</div>
        <div className="vote-section">
        <button onClick={() => handleVote(1)}>Upvote</button>
        <p>Votes: {articleVotes}</p>
        <button onClick={() => handleVote(-1)}>Downvote</button>
    </div>
    </div>


      <div className="comments-section">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.comment_id} className="comment-box">
            <p>
              <b>{comment.author}</b> - {comment.created_at}
            </p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ArticleId;
