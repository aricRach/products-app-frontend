import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() productsLength: number;
  @Output() pageChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.pageChanged.emit(pageEvent);
  }
}
