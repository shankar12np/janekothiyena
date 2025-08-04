import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interfaces for the response structure
interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  // Add other properties that you expect from the article response
}

interface NewsApiResponse {
  articles: NewsArticle[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apikey = '75f5d6cae6a4709827ecd671317f4ce2'; // Use your actual API key
  baseUrl = 'https://gnews.io/api/v4/search';

  private newsApiKey = '4ce8b2ab034a4e8a8f6f5e5d4bf8b2b3';
  private newsApiBaseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  getNepaliNews(): Observable<NewsApiResponse> {
    const url = `${this.baseUrl}?q=Nepal&lang=en&max=10&token=${this.apikey}`;
    return this.http.get<NewsApiResponse>(url); // Return the typed response
  }

  getWorldPoliticalWarNews(): Observable<NewsApiResponse> {
    const query = 'politics OR war';
    const url = `${this.baseUrl}?q=${query}&lang=en&max=10&token=${this.apikey}`; // Change 'apikey' to 'token'
    return this.http.get<NewsApiResponse>(url);
  }

  getMostPopularHeadlines(): Observable<NewsApiResponse> {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.newsApiKey}`;
    return this.http.get<NewsApiResponse>(url); // Return the typed response
  }
}
