import ArticleCard from "./ArticleCard"
import { useEffect, useState } from "react";
import axios from "axios";


function Articles() {
    const [articles, setArticles] = useState([])
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const articleURL = "https://be-nc-news-yg12.onrender.com/api/articles"

    useEffect(() => {
        setIsLoading(true)
        axios.get(articleURL)
            .then((response) => {
                setArticles(response.data.articles)
                setIsError(false)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsError(true)
                setIsLoading(false);
            })
    }, [])

    if (isError) {
        return <p>Error!!</p>;
      }
    
      if (isLoading) {
        return <p>Loading...</p>;
      }

return (
    <>
    <header>
        <h1 id="title">Articles</h1>
    </header>
    <div>
        <ArticleCard articles={articles}/>
    </div>
    </>
);
}


export default Articles