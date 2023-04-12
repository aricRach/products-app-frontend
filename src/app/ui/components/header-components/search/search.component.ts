import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private subscriber: Subscription;

  search = new FormControl();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.watchSearchValueChanges();
  }

  watchSearchValueChanges(): void {
    this.subscriber = this.search.valueChanges.subscribe((data: any) => {
      data ?
        this.router.navigate(['/products', 'all-products'], { queryParams: { search: data } }) :
        this.router.navigate(['/products', 'all-products']);
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
