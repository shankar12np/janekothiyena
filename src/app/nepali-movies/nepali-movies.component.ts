import {Component, OnInit} from '@angular/core';
import {TmdbResponse, TmdbServiceService} from "../service/tmdb-service.service";


@Component({
    selector: 'app-nepali-movies',
    templateUrl: './nepali-movies.component.html',
    styleUrls: ['./nepali-movies.component.css'],
    standalone: false
})
export class NepaliMoviesComponent implements OnInit{
  nepaliMovies: any[] = []; // This will store the Nepali movies
  topMovies: any[] = []; // This will store the top movies


  constructor(private tmdbService: TmdbServiceService) { } // Inject your service

  ngOnInit() {
    // Fetch top movies and their cast information when the component initializes
    this.tmdbService.getTopMovies().subscribe((data: TmdbResponse) => {
      this.topMovies = data.results;

      // Fetch cast information for each top movie
      this.topMovies.forEach((movie) => {
        this.tmdbService.getMovieCast(movie.id).subscribe((castData) => {
          movie.cast = castData.cast.slice(0, 5); // Store top 5 cast members
        });
      });
    });

    this.fetchNepaliMovies();
  }

  fetchNepaliMovies() {
    // Call the getNepaliMovies method without cast IDs and start date
    this.tmdbService.getNepaliMovies().subscribe({
      next: (response) => {
        this.nepaliMovies = response.results; // Store the movies
        this.nepaliMovies.forEach(movie => {
          this.tmdbService.getMovieCast(movie.id).subscribe(castData => {
            movie.cast = castData.cast.slice(0, 5); // Store top 5 cast members for each Nepali movie
          });
        });
      },
      error: (error) => {
        console.error('Error fetching top Nepali movies:', error);
      }
    });

  }
}



