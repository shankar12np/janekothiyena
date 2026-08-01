import {Component, OnInit} from '@angular/core';

import { TmdbServiceService, TmdbResponse } from "../service/tmdb-service.service";

@Component({
    selector: 'app-bollywood-tv-shows',
    templateUrl: './bollywood-tv-shows.component.html',
    styleUrls: ['./bollywood-tv-shows.component.css'],
    standalone: false
})
export class BollywoodTvShowsComponent implements OnInit{
  tvShows: any[] = [];
  popularTvShows: any[] = [];

  constructor(private tmdbService: TmdbServiceService) {}

  ngOnInit(): void {
    this.tmdbService.getBollywoodTVShows().subscribe((data: TmdbResponse) => {
      this.tvShows = data.results;
      this.tvShows.forEach(tvShow => {
        this.tmdbService.getTVShowCast(tvShow.id).subscribe(castData => {
          tvShow.cast = castData.cast.slice(0, 5); // Store top 5 cast members
        });
      });
    });
    this.tmdbService.getPopularBollywoodTVShows().subscribe((data: TmdbResponse) => {
      this.popularTvShows = data.results;

      this.popularTvShows.forEach(tvShow => {
        this.tmdbService.getTVShowCast(tvShow.id).subscribe(castData => {
          tvShow.cast = this.getFormattedCastForTVShow(castData.cast.slice(0, 5)); // Fetch and format top 5 cast members
        });
      });
    });
  }

 // getTVShowCast
  getFormattedCastForTVShow(cast: any[]): string {
    if (!cast) {
      return '';
    }
    return cast.map(actor =>
      actor.name.split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    ).join(', ');
  }

  getTVShowImageUrl(path: string): string {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
