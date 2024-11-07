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
  // const category = searchParams.get("category");
  // const sort = searchParams.get("sort");

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

  // useEffect(() => {
  //   if (category) {
  //     setIsFilter(category);
  //   }
  //   if (sort) {
  //     setIsSort(sort);
  //   }
  // }, [category, sort]);

  // useEffect(() => {
  //   if (!category){
  //     setIsFilter("")
  //   }
  //   if (!sort){
  //     setIsSort("")
  //   }
  // }, [category, sort])

  if (isError) {
    return <p>There was an error loading articles. Please try again later.</p>;
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

  // function filteredArticles(array) {
  //   if (isFilter === "" || isFilter === "all") {
  //     return array;
  //   }
  //   return array.filter((article) => {
  //     return article.topic === isFilter;
  //   });
  // }
  // function sortedArticles(array) {
  //   const sorted = [...array]
  //   if (isSort === "date" && isOrder === "desc"){
  //     sorted.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
  //   } else if (isSort === "date" && isOrder === "asc"){
  //     sorted.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
  //   } else if (isSort === 'comment-count' && isOrder === "desc") {
  //     sorted.sort((a, b) => b.comment_count - a.comment_count);
  //   } else if (isSort === 'comment-count' && isOrder === "asc") {
  //     sorted.sort((a, b) => a.comment_count - b.comment_count);
  //   } else if (isSort === 'votes' && isOrder === "desc") {
  //     sorted.sort((a, b) => b.votes - a.votes);
  //   } else if (isSort === 'votes' && isOrder === "asc") {
  //     sorted.sort((a, b) => a.votes - b.votes);
  //   }
  //   return sorted;
  // };
  // const filteredAndSortedArticles = filteredArticles(sortedArticles(articles));
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
         {/*Sort by */}
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
            <option value="all">Show All</option>
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
