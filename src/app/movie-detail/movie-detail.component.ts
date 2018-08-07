import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MovieDetails} from '../shared/MovieDetails.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  item: MovieDetails;
  constructor(private movieApi: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const symbol = this.route.snapshot.params['id'];
    this.movieApi.searchById(symbol).subscribe((res: MovieDetails) => {
      this.item = res;
    });
  }

}
