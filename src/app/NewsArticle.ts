interface NewsArticle {
  title: string;
  description: string;
  content: string;
  // Add other properties that you expect from the article response
}

interface NewsApiResponse {
  articles: NewsArticle[];
}
