import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Components-CSS/ArticleId.css"

function ArticleId() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const articleURL = `https://be-nc-news-yg12.onrender.com/api/articles/${article_id}`;

  useEffect(() => {
    setIsLoading(true);
    axios.get(articleURL).then((response) => {
      setArticle(response.data.article);
      setIsError(false);
      setIsLoading(false);
    })
    .catch((error) => {
        setIsError(true)
        setIsLoading(false)

    })
  });
  return (
    <>
      <div className="article-by-id">
        <img id="articleIMG" src={article.article_img_url} alt="article image"/>
        <h1 id="title">{article.title}</h1>
        <p id="author">{article.author} - {article.topic}</p>
        <div id="body">{article.body}</div>
        <p>Votes: {article.votes}</p>

      </div>
    </>
  );
}

export default ArticleId;
