// import axios from "axios";
// export const getAllArticles = () => {
//   axios.get("http://127.0.0.1:4010/articles")
// //   axios.get("https://api.realworld.io/api/articles")
//   .then(response => {
//     const articlesData = response.data;
//     // Process the articlesData as needed
//     console.log(articlesData);
//     return articlesData
//   })
//   .catch(error => {
//     console.error('Error fetching articles:', error);
//   });
// };

// export const createArticle = (articleData) => {
//     return axios.post("https://api.realworld.io/api/articles", {
//       article: articleData
//     })
//     .then(response => {
//       const createdArticle = response.data.article;
//       console.log('Article created successfully:', createdArticle);
//       return createdArticle;
//     })
//     .catch(error => {
//       console.error('Error creating article:', error);
//       throw error; // Rethrow the error for the calling code to handle
//     });
//   };