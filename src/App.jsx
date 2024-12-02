import "./App.css";
import Header from "./Components/Header";
import Articles from "./Components/Articles";
import Home from "./Components/Home";
import ArticleId from "./Components/ArticleId"
import PostArticle from "./Components/PostArticle"
import { Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Articles/:article_id" element={<ArticleId />} />
        <Route path="/post-article" element={<PostArticle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
