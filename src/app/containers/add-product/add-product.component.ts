import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {UserService} from '../../user/user.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  private ownerSubscription: Subscription;
  private currencySubscription: Subscription;
  owner: string;
  currencyCode: string;
  isInSale: boolean;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    discountPercent: new FormControl('', [Validators.required, Validators.min(0), Validators.max(90)]),
  });

  constructor(private activeRoute: ActivatedRoute, private currencyService: CurrencyService, private userService: UserService) {}

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.currencyCode = newCode;
    });
    this.ownerSubscription = this.userService.userObservable.subscribe((user) => {
      this.owner = user.email;
    });
  }

  saveData(): void{}

  toggleIsInSale(): void {
    this.isInSale = !this.isInSale;
  }

  ngOnDestroy(): void {
    this.currencySubscription.unsubscribe();
    this.ownerSubscription.unsubscribe();
  }
}
