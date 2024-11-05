import "../Components-CSS/ArticleCard.css";
import defaultImg from "../assets/default-pic.jpg"
import { Link } from "react-router-dom";

function ArticleCard({ articles }) {
    
  return (
    <>
      <ul className="article-list">
        {articles.map((article) => (
            <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`} >
                <img className="article-card-img" src={article.article_img_url ? article.article_img_url : defaultImg} alt="article image"/>
                <h3>{article.title}</h3>
                </Link>
                <p><b>{article.author}</b></p>
                <section id="info-section">
                <p id="card-vote-count">Votes: {article.votes}</p>
                <p id="card-comment-count">{article.comment_count} Comments</p>
                </section>
            </li>
        ))}


      </ul>
    </>
  );
}
export default ArticleCard;
