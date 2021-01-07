import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  genres$: Observable<Genre[]>;
  sortingExpanded: boolean = false;
  filterExpanded: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres();
  }

  toggleSortingOptions() {
    this.sortingExpanded = !this.sortingExpanded;
  }

  toggleFilterOptions() {
    this.filterExpanded = !this.filterExpanded;
  }

}