import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {UserService} from '../../user/user.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {ProductType} from '../../../types';
import {ConversionPipe} from '../../pipes/conversion.pipe';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  private ownerSubscription: Subscription;
  private currencySubscription: Subscription;
  private productId: number;
  private currentProduct: ProductType;

  form: FormGroup;
  owner: string;
  currencyCode: string;
  isInSale: boolean;
  isEditMode: boolean;

  get totalPrice(): number {
    const currentPrice = this.form.get('price').value;
    return this.isInSale ? (currentPrice - (currentPrice * this.form.get('discountPercent').value / 100)).toFixed(2) :
      currentPrice.toFixed(2);
  }

  constructor(private activeRoute: ActivatedRoute,
              private currencyService: CurrencyService,
              private userService: UserService, private productService: ProductService,
              private route: ActivatedRoute, private conversionPipe: ConversionPipe) {
    this.isEditMode = this.route.snapshot.data.isEditMode;
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.productId = +this.activeRoute.snapshot.paramMap.get('pid');
      this.currentProduct = this.productService.allProducts.filter((product: ProductType) => {
        return this.productId === product.productId;
      })[0];
      console.log(this.currentProduct);
      this.isInSale = this.currentProduct.discountPercent > 0;
    }

    this.currencySubscription = this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.currencyCode = newCode;
      this.form?.patchValue({
        price: this.conversionPipe.transform(this.currentProduct.productPrice, this.currencyCode)
      });
    });
    this.ownerSubscription = this.userService.userObservable.subscribe((user) => {
      this.owner = user.email;
    });
    this.initializeForm();

  }

  initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.isEditMode ? this.currentProduct.productName : '',
        [Validators.required, Validators.minLength(2)]),
      price: new FormControl(this.isEditMode ? this.conversionPipe.transform(this.currentProduct.productPrice, this.currencyCode) : '',
        [Validators.required, Validators.min(0)]),
      isInSale: new FormControl(this.isEditMode ? this.isInSale : false),
      discountPercent: new FormControl(this.isEditMode && this.isInSale ? this.currentProduct.discountPercent : '',
        [Validators.required, Validators.min(0), Validators.max(90)]),
      stock: new FormControl(this.isEditMode ? this.currentProduct.productStock : '',
        [Validators.required, Validators.min(0)]),
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
