import ArticleCard from "./ArticleCard"
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllArticles } from "../api"
import { useSearchParams } from "react-router-dom";
import "../Components-CSS/Articles.css"

function Articles() {
    const [articles, setArticles] = useState([])
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFilter, setIsFilter] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category")

    useEffect(() => {
        setIsLoading(true)
        fetchAllArticles()
            .then((allArticles) => {
                setArticles(allArticles)
                setIsError(false)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsError(true)
                setIsLoading(false);
            })
    }, [])


    useEffect(() => {
        if (category) {
          setIsFilter(category);
        }
      }, [category]);


    if (isError) {
        return <p>There was an error loading articles. Please try again later.</p>;
      }
    
      if (isLoading) {
        return <div className="loading-spinner">Loading articles...</div>;
      }
      function handleFilterChange(event) {
        setIsFilter(event.target.value);
        const newParams = new URLSearchParams(searchParams)
        newParams.set("category", event.target.value)
        setSearchParams(newParams)
      }
      
      function filteredArticles(array) {
        if (isFilter === ""){
            return array
        } 
        return array.filter((article) => {
          return article.topic === isFilter
        
        })
    }

return (
    <>
    <div className="title-container">
    <div className="title-dropdown">
  <h1 className="title">Articles</h1>
  <select className="filter" value={isFilter} onChange={handleFilterChange}>
    <option value="">Show All</option>
    <option value="coding">Coding</option>
    <option value="football">Football</option>
    <option value="cooking">Cooking</option>
  </select>
</div>
</div>
    
        <ArticleCard articles={filteredArticles(articles)}/>
    
    </>
);
}


export default Articles