import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
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

interface NewsDataRawResponse {
  results: {
    title: string;
    description: string;
    content: string;
    link: string;
  }[];
}

interface CurrentsRawResponse {
  news: {
    title: string;
    description: string;
    url: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private gNewsApiKey = environment.gNewsApiKey;
  private gNewsSearchUrl = 'https://gnews.io/api/v4/search';
  private gNewsHeadlinesUrl = 'https://gnews.io/api/v4/top-headlines';

  private newsDataApiKey = environment.newsDataApiKey;
  private newsDataUrl = 'https://newsdata.io/api/1/news';

  private currentsApiKey = environment.currentsApiKey;
  private currentsSearchUrl = 'https://api.currentsapi.services/v1/search';


  private cacheTTL = 30 * 60 * 1000;
  private cache = new Map<string, { data: NewsApiResponse; timestamp: number }>();

  constructor(private http: HttpClient) { }

  private normalizeNewsData(res: NewsDataRawResponse): NewsApiResponse {
    return {
      articles: (res.results || []).map(item => ({
        title: item.title,
        description: item.description,
        content: item.content,
        url: item.link
      }))
    };
  }

  private normalizeCurrents(res: CurrentsRawResponse): NewsApiResponse {
    return {
      articles: (res.news || []).map(item => ({
        title: item.title,
        description: item.description,
        content: item.description,
        url: item.url
      }))
    };
  }

  private fetchWithFallback(
    cacheKey: string,
    gNewsUrl: string,
    newsDataUrl: string,
    currentsUrl: string
  ): Observable<NewsApiResponse> {
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.cacheTTL) {
      return of(cached.data);
    }

    return this.http.get<NewsApiResponse>(gNewsUrl).pipe(
      catchError(gNewsError => {
        console.warn(`GNews failed for "${cacheKey}", falling back to NewsData.io`, gNewsError);
        return this.http.get<NewsDataRawResponse>(newsDataUrl).pipe(
          map(res => this.normalizeNewsData(res)),
          catchError(newsDataError => {
            console.warn(`NewsData.io also failed for "${cacheKey}", falling back to Currents API`, newsDataError);
            return this.http.get<CurrentsRawResponse>(currentsUrl).pipe(
              map(res => this.normalizeCurrents(res))
            );
          })
        );
      }),
      tap(data => this.cache.set(cacheKey, { data, timestamp: now })),
      catchError(finalError => {
        if (cached) {
          console.warn(`All three news providers failed for "${cacheKey}", serving stale cache`, finalError);
          return of(cached.data);
        }
        throw finalError;
      })
    );
  }

  getNepaliNews(): Observable<NewsApiResponse> {
    const gNewsQuery = encodeURIComponent('Nepal politics OR Nepal government OR Nepal economy');
    const gNewsUrl = `${this.gNewsSearchUrl}?q=${gNewsQuery}&lang=en&max=10&sortby=publishedAt&token=${this.gNewsApiKey}`;

    const newsDataQuery = encodeURIComponent('Nepal');
    const newsDataUrl = `${this.newsDataUrl}?apikey=${this.newsDataApiKey}&q=${newsDataQuery}&language=en&country=np`;

    const currentsQuery = encodeURIComponent('Nepal');
    const currentsUrl = `${this.currentsSearchUrl}?apiKey=${this.currentsApiKey}&keywords=${currentsQuery}&language=en`;

    return this.fetchWithFallback('nepali-news', gNewsUrl, newsDataUrl, currentsUrl);
  }

  getWorldPoliticalWarNews(): Observable<NewsApiResponse> {
    const gNewsQuery = encodeURIComponent('politics OR war OR conflict');
    const gNewsUrl = `${this.gNewsSearchUrl}?q=${gNewsQuery}&lang=en&max=10&sortby=publishedAt&token=${this.gNewsApiKey}`;

    const newsDataQuery = encodeURIComponent('politics OR war OR conflict');
    const newsDataUrl = `${this.newsDataUrl}?apikey=${this.newsDataApiKey}&q=${newsDataQuery}&language=en`;

    const currentsQuery = encodeURIComponent('politics war conflict');
    const currentsUrl = `${this.currentsSearchUrl}?apiKey=${this.currentsApiKey}&keywords=${currentsQuery}&language=en&category=politics`;

    return this.fetchWithFallback('world-news', gNewsUrl, newsDataUrl, currentsUrl);
  }

  getTopWorldHeadlines(): Observable<NewsApiResponse> {
    const gNewsUrl = `${this.gNewsHeadlinesUrl}?category=general&lang=en&max=10&token=${this.gNewsApiKey}`;
    const newsDataUrl = `${this.newsDataUrl}?apikey=${this.newsDataApiKey}&language=en&category=top`;

    const currentsQuery = encodeURIComponent('world OR business OR technology');
    const currentsUrl = `${this.currentsSearchUrl}?apiKey=${this.currentsApiKey}&keywords=${currentsQuery}&language=en&category=world`;

    return this.fetchWithFallback('top-headlines', gNewsUrl, newsDataUrl, currentsUrl);
  }
}
