import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchAllArticles } from "../api";
import { useSearchParams } from "react-router-dom";
import "../Components-CSS/Articles.css";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState("");
  const [isSort, setIsSort] = useState("created_at");
  const [isOrder, setIsOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const topic = searchParams.get("topic");
    const sort = searchParams.get("sort");
    const order = searchParams.get("order") || "desc";
    fetchAllArticles(topic, sort, order)
      .then((allArticles) => {
        setArticles(allArticles);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isError) {
    return <p>This topic doesnt exist!</p>;
  }

  if (isLoading) {
    return <div className="loading-spinner">Loading articles...</div>;
  }
  function handleFilterChange(event) {
    setIsFilter(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", event.target.value);
    setSearchParams(newParams);
  }
  function handleSortChange(event) {
    setIsSort(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", event.target.value);
    setSearchParams(newParams);
  }
  function handleOrderChange(event) {
    setIsOrder(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", event.target.value);
    setSearchParams(newParams);
  }

  return (
    <>
    {/*Sort by */}
      <div className="title-container">
      <h1 className="title">Articles</h1>
        <div className="sort-dropdown">
          Sort by:
          <select
            className="sort"
            value={isSort}
            onChange={handleSortChange}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </div>
         {/*Order by */}
        <div className="order-dropdown">
          <select
            className="order"
            value={isOrder}
            onChange={handleOrderChange}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      


    {/* /*filter by */}
      
        <div className="title-dropdown">
          
          <select
            className="filter"
            value={isFilter}
            onChange={handleFilterChange}
          >
            <option value="" disabled hidden>Filter by: </option>
            <option value="">Show All</option>
            <option value="coding">Coding</option>
            <option value="football">Football</option>
            <option value="cooking">Cooking</option>
          </select>
        </div>
      </div>

      <ArticleCard articles={articles} />
    </>
  );
}

export default Articles;
