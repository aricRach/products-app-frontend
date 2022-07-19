import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, retry, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css'],
  providers: [SearchService]
})
export class GithubSearchComponent implements OnInit {

  search = new FormControl();
  dataset: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this
      .search
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((val: any) => this.searchService.getRepo(val)),
        retry(2)
        ).subscribe((value) => {
        this.getRepository(value);
    });
  }

  getRepository(query: string): void {
    this.searchService.getRepo(query).subscribe(
      (data) => {
      console.log(data);
      this.dataset = data.items;
      },
      (err) => {
        console.log(err);
      });
  }

}
