import { Component, OnInit } from '@angular/core';
import { NewsService } from '../service/news.service';
import { forkJoin } from 'rxjs';

// Define interfaces for response
interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  fullContent?: string;  // Optional property to hold the full content
}

interface NewsApiResponse {
  articles: NewsArticle[];
}

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    standalone: false
})
export class NewsComponent implements OnInit {
  nepaliNewsItems: NewsArticle[] = [];
  worldNewsItems: NewsArticle[] = [];
  mostPopularHeadlines: NewsArticle[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  // Combined method to fetch Nepali News, World Political/War News, and Most Popular Headlines
  fetchNews() {
    forkJoin([
      this.newsService.getNepaliNews(),
      this.newsService.getWorldPoliticalWarNews(),
      this.newsService.getMostPopularHeadlines()
    ]).subscribe(
      ([nepaliNewsData, worldNewsData, popularHeadlinesData]) => {
        // Processing Nepali News
        this.nepaliNewsItems = nepaliNewsData.articles.map((article: NewsArticle) => ({
          ...article,
          fullContent: article.content // Ensure 'content' contains full article text
        }));

        // Processing World Political/War News
        this.worldNewsItems = worldNewsData.articles.map((article: NewsArticle) => ({
          ...article,
          fullContent: article.content // Ensure 'content' contains full article text
        }));

        // Processing Most Popular Headlines
        this.mostPopularHeadlines = popularHeadlinesData.articles.map((article: NewsArticle) => ({
          ...article,
          fullContent: article.content // Ensure 'content' contains full article text
        }));
      },
      error => {
        console.error('Failed to fetch news', error);
      }
    );
  }
}
