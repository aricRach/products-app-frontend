import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {UserService} from '../../user/user.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {ProductType} from '../../../types';
import {ConversionPipe} from '../../pipes/conversion.pipe';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  private ownerSubscription: Subscription;
  private currencySubscription: Subscription;
  private id: number;
  private currentProduct: ProductType;

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
              private router: Router, private http: HttpClient) {
    this.isEditMode = this.route.snapshot.data.isEditMode;
  }

  ngOnInit(): void {
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
      this.currentProduct = this.productService.allProducts.filter((product: ProductType) => {
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
        price: this.form.get('price').value,
        discountPercent: this.form.get('isInSale').value ? this.form.get('discountPercent').value : 0,
        stock: this.form.get('stock').value,
        userOwner: {
          name: 'aric',
          userName: 'aricRach',
          email: 'aricrachmany@gmail.com'
        }
      };
      if (this.isEditMode) {
        this.http.put(`http://localhost:8082/api/v1/product/update-product/${this.id}`, product).subscribe(() => {
          console.log('update');
          this.form.reset();
          this.router.navigate(['/products']);
        });
      } else {
        this.http.post('http://localhost:8082/api/v1/product', product).subscribe(() => {
          console.log('create');
          this.form.reset();
          this.router.navigate(['/products']);
        });
      }
    } else {
      console.error('form not valid');
    }
  }

  toggleIsInSale(): void {
    this.isInSale = !this.isInSale;
  }

  ngOnDestroy(): void {
    this.currencySubscription.unsubscribe();
    this.ownerSubscription.unsubscribe();
  }
}
