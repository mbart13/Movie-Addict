import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  @Input()
  sortCategory: string;
  genres$: Observable<Genre[]>;
  sortExpanded: boolean = false;
  filterExpanded: boolean = false;
  selected: boolean = true;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres();
  }

  toggleSort() {
    this.sortExpanded = !this.sortExpanded;
  }

  toggleFilters() {
    this.filterExpanded = !this.filterExpanded;
  }

  applyFilters() {
    this.movieService.urlParams.sortCategory = this.sortCategory;
    this.movieService.getMovies()
    
  }
}
