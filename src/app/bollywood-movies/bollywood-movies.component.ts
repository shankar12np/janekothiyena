import { Component, OnInit } from '@angular/core';
import {TmdbServiceService, TmdbResponse } from "../service/tmdb-service.service";


@Component({
    selector: 'app-bollywood-movies',
    templateUrl: './bollywood-movies.component.html',
    styleUrls: ['./bollywood-movies.component.css'],
    standalone: false
})
export class BollywoodMoviesComponent implements OnInit {
  movies: any[] = [];
  tvShows: any[] = [];
  popularMovies: any[] = [];

  constructor(private tmdbService: TmdbServiceService) {}

  ngOnInit(): void {
    this.tmdbService.getBollywoodMovies().subscribe((data: TmdbResponse) => {
      this.movies = data.results;
      this.movies.forEach(movie => {
        this.tmdbService.getMovieCast(movie.id).subscribe(castData => {
          movie.cast = castData.cast.slice(0, 5); // Store top 5 cast members
        });
      });
    });

    this.tmdbService.getBollywoodTVShows().subscribe((data: TmdbResponse) => {
      this.tvShows = data.results;
    });

    this.tmdbService.getTopPopularBollywoodMovies().subscribe((data: TmdbResponse) => {
      this.popularMovies = data.results;

      this.popularMovies.forEach(movie => {
        this.tmdbService.getMovieCast(movie.id).subscribe(castData => {
          movie.cast = castData.cast.slice(0, 5); // Store top 5 cast members
        });
      });
    });


  }

  // getFormattedCast(cast: any[]): string {
  //   if (!cast) {
  //     return '';
  //   }
  //   return cast.map(actor => actor.name.toLowerCase()).join(', ');
  // }




  getMovieImageUrl(path: string): string {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }

  getTVShowImageUrl(path: string): string {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
