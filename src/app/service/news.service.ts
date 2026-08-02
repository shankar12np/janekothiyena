import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
}

interface NewsApiResponse {
  articles: NewsArticle[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private gNewsApiKey = environment.gNewsApiKey;
  private gNewsBaseUrl = 'https://gnews.io/api/v4/search';

  private newsApiKey = environment.newsApiKey;
  private newsApiBaseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  getNepaliNews(): Observable<NewsApiResponse> {
    const query = encodeURIComponent('Nepal politics OR Nepal government OR Nepal economy');
    const url = `${this.gNewsBaseUrl}?q=${query}&lang=en&max=10&sortby=publishedAt&token=${this.gNewsApiKey}`;
    return this.http.get<NewsApiResponse>(url);
  }

  getWorldPoliticalWarNews(): Observable<NewsApiResponse> {
    const query = encodeURIComponent('politics OR war OR conflict');
    const url = `${this.gNewsBaseUrl}?q=${query}&lang=en&max=10&sortby=publishedAt&token=${this.gNewsApiKey}`;
    return this.http.get<NewsApiResponse>(url);
  }

  getMostPopularHeadlines(): Observable<NewsApiResponse> {
    const url = `${this.newsApiBaseUrl}/top-headlines?country=us&category=business&apiKey=${this.newsApiKey}`;
    return this.http.get<NewsApiResponse>(url);
  }
}
