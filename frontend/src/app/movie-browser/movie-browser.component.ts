import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import {Dates} from '../models/dates';
import {UrlConst} from '../models/url.constants';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent implements OnInit {

  selectedGenres: string[] = [];
  selectedButton = 'popular';
  movies$: Observable<Movie[]>;
  nowPlayingDates: Dates;
  upcomingDates: Dates;

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies$();
    this.movieService.getNowPlayingDates$()
      .subscribe(data => this.nowPlayingDates = data);
    this.movieService.getUpcomingDates$()
      .subscribe(data => this.upcomingDates = data);
    this.movieService.getMovies(UrlConst.DISCOVER);
  }

  onButtonClicked(category: string): void {
    if (this.selectedButton !== category) {
      this.movieService.resetUrlParams();
    }
    if (category === 'popular' && this.selectedButton !== category) {
      this.movieService.getMovies(UrlConst.DISCOVER);
    } else if (category === 'top rated' && this.selectedButton !== category) {
      this.getTopRatedMovies();
    } else if (category === 'now playing' && this.selectedButton !== category) {
      this.getNowPlayingMovies();
    } else if (category === 'upcoming' && this.selectedButton !== category) {
      this.getUpcomingMovies();
    }
    this.selectedButton = category;
    this.selectedGenres = [];
  }

  getTopRatedMovies(): void  {
    this.movieService.urlParams.sortCategory = UrlConst.VOTE_AVG_DESC;
    this.movieService.urlParams.voteCountGte = UrlConst.MINIMUM_VOTE_COUNT;
    this.movieService.getMovies(UrlConst.DISCOVER);
  }

  getNowPlayingMovies(): void  {
    this.movieService.urlParams.releaseDateGte = this.nowPlayingDates.minimum;
    this.movieService.urlParams.releaseDateLte = this.nowPlayingDates.maximum;
    this.movieService.urlParams.withReleaseType = UrlConst.THEATRICAL_RELEASE;
    this.movieService.getMovies(UrlConst.DISCOVER);
  }

  getUpcomingMovies(): void {
    this.movieService.urlParams.releaseDateGte = this.upcomingDates.minimum;
    this.movieService.urlParams.releaseDateLte = this.upcomingDates.maximum;
    this.movieService.urlParams.withReleaseType = UrlConst.THEATRICAL_RELEASE;
    this.movieService.getMovies(UrlConst.DISCOVER);
  }
}
