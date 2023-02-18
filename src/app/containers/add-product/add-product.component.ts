import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {UserService} from '../../user/services/user.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Product, ProductBackEnd} from '../../../types';
import {ConversionPipe} from '../../pipes/conversion.pipe';
import {AddProductApiService} from '../services/add-product-api.service';
import {FileUploadService} from '../../upload/file-upload.service';
import {FileUpload} from '../../upload/file-upload';

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
  fileToUpload: File;
  imageProcessPercent: number;

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
              private router: Router, private addProductApiService: AddProductApiService,
              private fileUploadService: FileUploadService) {
    this.setProductItem();
  }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.setNewCurrencyCode(newCode);
    });
    this.ownerSubscription = this.userService.userObservable.subscribe((user) => {
      this.owner = user.email;
    });
    this.initializeForm();
  }

  private setProductItem(): void {
    this.isEditMode = this.route.snapshot.data.isEditMode;
    if (this.isEditMode) {
      this.id = +this.activeRoute.snapshot.paramMap.get('pid');
      this.currentProduct = this.route.snapshot.data.product;
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
      image: new FormControl(this.isEditMode ? this.currentProduct.image : '', [Validators.required])
    });
  }

  private pushImageToFirebase(productId: number): void {
    const currentFileUpload = new FileUpload(this.fileToUpload);
    this.fileUploadService.pushFileToStorage(currentFileUpload, productId).subscribe((Percent: number) => {
        this.imageProcessPercent = Percent;
      },
      error => {
        console.log(error);
      }
    );
  }

  saveProduct(): void {
    if (this.form.valid) {
      this.form.disable();
      const product = {
        name: this.form.get('name').value,
        price: this.conversionPipe.transform(this.form.get('price').value, this.currencyCode, true),
        discountPercent: this.form.get('isInSale').value ? this.form.get('discountPercent').value : 0,
        stock: this.form.get('stock').value,
        image: this.form.get('image').value,
        userOwner: {
          userName: this.userService.getUser().userName,
          email: this.userService.getUser().email
        }
      } as ProductBackEnd;
      if (this.isEditMode) {
        this.addProductApiService.updateProduct(this.id, product).subscribe(() => {
          this.pushImageToFirebase(this.id);
        });
    } else {
      this.addProductApiService.addProduct(product).subscribe((res: Product) => {
        this.pushImageToFirebase(res.id);
      });
    }
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

  // @ts-ignore
  updateImgUrl({downloadURL, productId}): void {
      this.addProductApiService.addImageUrl(downloadURL, productId).subscribe(() => {
        this.doAfterSetProduct();
      }, () => {
        console.error('cant update image');
        this.doAfterSetProduct();
      });
  }

  markImgController(file: File): void {
    this.fileToUpload = file;
    this.form.get('image').setValue('selected');
  }
}
