import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {UserService} from '../../user/services/user.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Product, ProductBackEnd} from '../../../types';
import {ConversionPipe} from '../../pipes/conversion.pipe';
import {AddProductApiService} from '../add-product-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  private ownerSubscription: Subscription;
  private currencySubscription: Subscription;
  private id: number;
  private currentProduct: Product;

  form: FormGroup;
  owner: string;
  currencyCode: string;
  isInSale: boolean;
  isEditMode: boolean;

  get totalPrice(): number {
    const currentPrice = this.form.get('price').value;
    return this.isInSale ? (currentPrice - (currentPrice * this.form.get('discountPercent').value / 100)).toFixed(2) :
      currentPrice !== '' ? currentPrice?.toFixed(2) : '';
  }

  get isFormValid(): boolean {
    return this.form?.valid;
  }

  constructor(private activeRoute: ActivatedRoute,
              private currencyService: CurrencyService,
              private userService: UserService, private productService: ProductService,
              private route: ActivatedRoute, private conversionPipe: ConversionPipe,
              private router: Router, private addProductApiService: AddProductApiService) {
    this.isEditMode = this.route.snapshot.data.isEditMode;
  }

  ngOnInit(): void {
    this.productService.setAllProducts();
    this.setProductItem();
    this.currencySubscription = this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.setNewCurrencyCode(newCode);
    });
    this.ownerSubscription = this.userService.userObservable.subscribe((user) => {
      this.owner = user.email;
    });
    this.initializeForm();
  }

  private setProductItem(): void {
    if (this.isEditMode) {
      this.id = +this.activeRoute.snapshot.paramMap.get('pid');
      this.currentProduct = this.productService.allProducts.filter((product: Product) => {
        return this.id === product.id;
      })[0];
      this.isInSale = this.currentProduct.discountPercent > 0;
    }
  }

  private setNewCurrencyCode(newCode: string): void {
    this.currencyCode = newCode;
    if (this.isEditMode) {
      this.form?.patchValue({
        price: this.conversionPipe.transform(this.currentProduct.price, this.currencyCode)
      });
    }
  }

  initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.isEditMode ? this.currentProduct.name : '',
        [Validators.required, Validators.minLength(2)]),
      price: new FormControl(this.isEditMode ? this.conversionPipe.transform(this.currentProduct.price, this.currencyCode) : '',
        [Validators.required, Validators.min(0)]),
      isInSale: new FormControl(this.isEditMode ? this.isInSale : false),
      discountPercent: new FormControl(this.isEditMode && this.isInSale ? this.currentProduct.discountPercent : 0,
        [Validators.min(0), Validators.max(90)]),
      stock: new FormControl(this.isEditMode ? this.currentProduct.stock : '',
        [Validators.required, Validators.min(0)]),
    });
  }

  saveData(): any {
    if (this.form.valid) {
      const product = {
        name: this.form.get('name').value,
        price: this.conversionPipe.transform(this.form.get('price').value, this.currencyCode, true),
        discountPercent: this.form.get('isInSale').value ? this.form.get('discountPercent').value : 0,
        stock: this.form.get('stock').value,
        userOwner: {
          userName: this.userService.getUser().userName,
          email: this.userService.getUser().email
        }
      } as ProductBackEnd;
      if (this.isEditMode) {
        this.addProductApiService.updateProduct(this.id, product).subscribe(() => {
          this.doAfterSetProduct();
        });
      } else {
        this.addProductApiService.addProduct(product).subscribe(() => {
          this.doAfterSetProduct();
        });
      }
    } else {
      console.error('form not valid');
    }
  }

  toggleIsInSale(): void {
    this.isInSale = !this.isInSale;
  }

  private doAfterSetProduct(): void {
    this.form.reset();
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.currencySubscription?.unsubscribe();
    this.ownerSubscription?.unsubscribe();
  }
}
