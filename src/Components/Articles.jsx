import ArticleCard from "./ArticleCard"
import { useEffect, useState } from "react";



function Articles() {
    const [articles, setArticles] = useState([])
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const articleURL = "https://be-nc-news-yg12.onrender.com/api/articles"

    useEffect(() => {
        setIsLoading(true)
        fetch(articleURL)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject({ status: 404, msg: "404 Not Found"})
                }
                return response.json()
            })
            .then((articleData) => {
                setArticles(articleData.articles)
                setIsError(false)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsError(true)
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