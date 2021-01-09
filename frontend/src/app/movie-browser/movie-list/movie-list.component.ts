import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[];
  genres: Genre[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getGenres()
      .subscribe(data => this.genres = data);
  }

  loadMore() {
    this.movieService.urlParams.pageNumber++;
    this.movieService.getMovies()
  }

}
