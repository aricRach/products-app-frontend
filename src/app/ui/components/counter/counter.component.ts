import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CounterAction} from './counter-action.model';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input() id: number;

  @Output() counterClicked = new EventEmitter();

  @Input() numberOfItems = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onCounterClicked(action: string): void {
    this.counterClicked.emit({
      id: this.id,
      actionType: action,
      numberOfItems: this.numberOfItems
    });
  }
}
