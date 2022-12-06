import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search = new FormControl();

  constructor(private router: Router, ) { }

  ngOnInit(): void {
    this.watchSearchValueChanges();
  }

  watchSearchValueChanges(): void {
    this.search.valueChanges.subscribe((data: any) => {
      data ?
        this.router.navigate(['/products'], { queryParams: { search: data } }) :
        this.router.navigate(['/products']);
    });
  }


}
