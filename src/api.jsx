import axios from "axios"


const baseURL = "https://be-nc-news-yg12.onrender.com/api"

function fetchAllArticles(topic, sort_by, order) {
    const params = {};
    if (topic) params.topic = topic;
    if (sort_by) params.sort_by = sort_by;
    if (order) params.order = order;
    return axios
    .get(`${baseURL}/articles/`, { params })
    .then((response) => {
        return response.data.articles
    })
    .catch((error) => {
        console.log("Error fetching articles:", error)
    })
}


function fetchArticle(article_id) {
    return axios
    .get(`${baseURL}/articles/${article_id}`)
    .then((response) => {
        return response.data.article
    })
    .catch((error) => {
        console.log(error)
    })
}

function fetchComments(article_id) {
    return axios
    .get(`${baseURL}/articles/${article_id}/comments`)
    .then((response) => {
        return response.data.comments.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    })
    .catch((error) => {
        console.log(error)
    })
}

function updateVote(article_id, increment) {
    return axios
    .patch(`${baseURL}/articles/${article_id}`, {
        inc_votes: increment
    })
    .then((response) => {
        return response.data.article.votes
    })
    .catch((error) => {
        console.log(error)
    })
}

function postComment(article_id, username, body){
    return axios
    .post(`${baseURL}/articles/${article_id}/comments`, {
        username,
        body
    })
    .then((response) => {
        return response.data.comment
    })
    .catch((error) => {
        console.log(error)
    })
}
function deleteComment(comment_id){
    return axios
    .delete(`${baseURL}/comments/${comment_id}`)
    .catch((error) => {
        console.log(error)
    })
}


function postArticle(author, title, body, topic, article_img_url){
    return axios
    .post(`${baseURL}/articles/`, {
        author,
        title,
        body,
        topic,
        article_img_url,
    })
    .then((response) => {
        return response.data.article
    })
    .catch((error) => {
        console.log(error)
    })
}

export {
    fetchArticle,
    fetchComments,
    updateVote,
    postArticle,
    postComment,
    deleteComment,
    fetchAllArticles

}