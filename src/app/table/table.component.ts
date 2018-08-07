import { Component, OnInit, ViewChild } from '@angular/core';

import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ApiService} from '../shared/api.service';
import {Movie} from '../shared/movie.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  options: Array <Movie>;
  searchCtrl = new FormControl();
  list: Array <Movie>;
  selectedOption: Movie;

  constructor(private movieApi: ApiService) {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(() => {
      this.movieApi.searchMovie(this.searchCtrl.value)
        .subscribe((res) => {
          console.log(res['Search']);
        this.options = res['Search'];
      });
    });

  }
  ngOnInit() {

    // Если в хранилище есть данные - вытаскиваем их и вставляем в таблицу, синхронизируем с сервисом
    if (localStorage.getItem('list')) {
      this.movieApi.list = JSON.parse(localStorage.getItem('list'));
      this.list = this.movieApi.list;
    }
  }
  // Когда нажали на подсказку, заносим объект в переменную чтобы потом передать кнопке "добавить"
  onSelect(option) {
    this.selectedOption = option;
  }

  // Нажали на "Добавить" - синхронизируем с сервисом и отправляем в локал
  addOptionToList(option) {
    this.movieApi.list.push(option);
    this.selectedOption = null;
    this.list = this.movieApi.list;
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  // Удаляем - синхронизируем с сервисом и отправляем в локал
  onDelete(item) {
    this.movieApi.list = this.list.filter(obj => obj !== item );
    this.list = this.movieApi.list;
    localStorage.setItem('list', JSON.stringify(this.list));
  }
}
