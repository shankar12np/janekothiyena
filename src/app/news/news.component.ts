import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NewsService } from '../service/news.service';

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  fullContent?: string;
}

interface NewsApiResponse {
  articles: NewsArticle[];
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class NewsComponent implements OnInit {
  nepaliNewsItems: NewsArticle[] = [];
  worldNewsItems: NewsArticle[] = [];
  mostPopularHeadlines: NewsArticle[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    // Each section fetched independently — a failure in one feed no longer
    // blanks out the other two, unlike the previous forkJoin-based approach.
    this.fetchNepaliNews();
    this.fetchWorldNews();
    this.fetchTopHeadlines();
  }

  private fetchNepaliNews() {
    this.newsService.getNepaliNews().subscribe({
      next: (data: NewsApiResponse) => {
        this.nepaliNewsItems = data.articles.map(article => ({
          ...article,
          fullContent: article.content
        }));
      },
      error: (error) => console.error('Failed to fetch Nepali news', error)
    });
  }

  private fetchWorldNews() {
    this.newsService.getWorldPoliticalWarNews().subscribe({
      next: (data: NewsApiResponse) => {
        this.worldNewsItems = data.articles.map(article => ({
          ...article,
          fullContent: article.content
        }));
      },
      error: (error) => console.error('Failed to fetch world news', error)
    });
  }

  private fetchTopHeadlines() {
    this.newsService.getTopWorldHeadlines().subscribe({
      next: (data: NewsApiResponse) => {
        this.mostPopularHeadlines = data.articles.map(article => ({
          ...article,
          fullContent: article.content
        }));
      },
      error: (error) => console.error('Failed to fetch top headlines', error)
    });
  }
}
