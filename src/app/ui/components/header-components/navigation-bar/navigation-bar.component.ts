import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../models/navigation-item.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Input() navItems: NavigationItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
