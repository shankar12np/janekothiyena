import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {forkJoin, Observable, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";

export class TmdbResponse {
  results!: any[];
}

@Injectable({
  providedIn: 'root'
})
export class TmdbServiceService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;
  hindiShows!: TmdbResponse;
  malayalamShows!: TmdbResponse;
  private languageCode = 'ne'; // Set the default language code (e.g., 'hi' for Hindi)

  constructor(private http: HttpClient) { }

  getTopMovies(): Observable<TmdbResponse> {
    // Calculate the start and end dates for the current month
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Format the date strings in the "YYYY-MM-DD" format
    const startOfMonthStr = startOfMonth.toISOString().split('T')[0];
    const endOfMonthStr = endOfMonth.toISOString().split('T')[0];

    // Fetch top 3 Indian Bollywood movies released this month in Hindi language
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&region=IN&with_original_language=hi&primary_release_date.gte=${startOfMonthStr}&primary_release_date.lte=${endOfMonthStr}&sort_by=popularity.desc&page=1&per_page=3`;

    return this.http.get<TmdbResponse>(url);
  }

  getTopTVShows(): Observable<TmdbResponse> {
    // Calculate the start and end dates for the current month
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Format the date strings in the "YYYY-MM-DD" format
    const startOfMonthStr = startOfMonth.toISOString().split('T')[0];
    const endOfMonthStr = endOfMonth.toISOString().split('T')[0];

    // Fetch top 3 Indian Bollywood TV shows released this month in Hindi language
    const url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&region=IN&with_original_language=hi&first_air_date.gte=${startOfMonthStr}&first_air_date.lte=${endOfMonthStr}&sort_by=popularity.desc&page=1&per_page=3`; // Add per_page=3
    return this.http.get<TmdbResponse>(url);
  }


  getBollywoodMovies(): Observable<TmdbResponse> {
    // Calculate a future date for upcoming movies
    const today = new Date();
    const upcomingDate = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate()); // Set a date two months ahead
    const upcomingDateStr = upcomingDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

// Modify the query URL to include the upcoming movie filter
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_original_language=hi&sort_by=popularity.desc&release_date.gte=${today.toISOString().split('T')[0]}&release_date.lte=${upcomingDateStr}`;

    return this.http.get<TmdbResponse>(url);
    // Calculate the start and end dates for the current month

  }

  getTopPopularBollywoodMovies(): Observable<TmdbResponse> {
    const startDate = new Date(2018, 0, 1).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const hindiMoviesUrl = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_original_language=hi&sort_by=popularity.desc&primary_release_date.gte=${startDate}&primary_release_date.lte=${today}&page=1`;
    const malayalamMoviesUrl = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_original_language=ml&sort_by=popularity.desc&primary_release_date.gte=${startDate}&primary_release_date.lte=${today}&page=1`;

    return forkJoin({
      hindiMovies: this.http.get<TmdbResponse>(hindiMoviesUrl),
      malayalamMovies: this.http.get<TmdbResponse>(malayalamMoviesUrl)
    }).pipe(
      map(responses => {
        const combinedResults = [...responses.hindiMovies.results, ...responses.malayalamMovies.results];
        return { results: combinedResults }; // Return in the same structure as TmdbResponse
      })
    );
  }



  getBollywoodTVShows(): Observable<TmdbResponse> {
    // Set the start date to today's date
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Set an end date far in the future to capture upcoming shows
    const futureDate = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()); // Five years ahead
    const futureDateStr = futureDate.toISOString().split('T')[0];


    // Modify the query URL to include upcoming TV shows, starting from today
    const url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_original_language=hi&sort_by=first_air_date.asc&first_air_date.gte=${todayStr}&first_air_date.lte=${futureDateStr}`;

    return this.http.get<TmdbResponse>(url);
  }

  getMovieCast(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getTVShowCast(tvShowId: number): Observable<any> {
    const url = `${this.baseUrl}/tv/${tvShowId}/credits?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getPopularBollywoodTVShows(): Observable<TmdbResponse> {
    const startDate = new Date(2018, 0, 1).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_original_language=hi&sort_by=popularity.desc&first_air_date.gte=${startDate}&first_air_date.lte=${today}&page=1`;

    return this.http.get<TmdbResponse>(url);
  }

  getTopNepaliMovies(): Observable<TmdbResponse> {
    const startOfYear = new Date(2020, 0, 1).toISOString().split('T')[0]; // January 1st, 2020

    // URL to search for top Nepali movies released from 2020 to now
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_original_language=ne&primary_release_date.gte=${startOfYear}&sort_by=popularity.desc`;

    return this.http.get<TmdbResponse>(url);
  }

  // getNepaliMoviesByCast(castIds: number[], startDate?: string): Observable<TmdbResponse> {
  //   const startOfYear = new Date(2020, 0, 1).toISOString().split('T')[0]; // January 1st, 2020
  //   // Construct the base URL for movies with specific cast members
  //   const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_original_language=ne&sort_by=popularity.desc`;
  //
  //   // Add the cast IDs to the query
  //   if (castIds && castIds.length > 0) {
  //     const castIdParam = castIds.join('|'); // Join cast IDs with '|'
  //     return this.http.get<TmdbResponse>(`${url}&with_cast=${castIdParam}`);
  //   } else {
  //     // If no cast IDs provided, return an empty response
  //     return of({ results: [] });
  //   }
  // }




  getNepaliMovies():Observable<TmdbResponse> {
    const startOfYear = new Date(2022, 0, 1).toISOString().split('T')[0]; // January 1st, 2020

    // Construct the base URL for movies released from 2020 onwards
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_original_language=ne&primary_release_date.gte=${startOfYear}&sort_by=popularity.desc`;

    return this.http.get<TmdbResponse>(url);
  }
  getCastForNepaliMovies(): Observable<TmdbResponse[]> {
    // Fetch top Nepali movies
    return this.getTopNepaliMovies().pipe(
      switchMap(nepaliMovies => {
        // Extract movie IDs from the results
        const movieIds = nepaliMovies.results.map(movie => movie.id);
        // Fetch cast information for each movie
        const castRequests = movieIds.map(movieId => this.getMovieCast(movieId));
        return forkJoin(castRequests);
      })
    );
  }
}
