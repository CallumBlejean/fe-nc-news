import "../Components-CSS/ArticleCard.css";
import defaultImg from "../assets/default-pic.jpg"

function ArticleCard({ articles }) {
    
  return (
    <>
      <ul className="article-list">
        {articles.map((article) => (
            <li key={article.article_id}>
                <img className="article-card-img" src={article.article_img_url ? article.article_img_url : defaultImg} />
                <h3>{article.title}</h3>
                <p>{article.author}</p>
            </li>
        ))}


      </ul>
    </>
  );
}
export default ArticleCard;
