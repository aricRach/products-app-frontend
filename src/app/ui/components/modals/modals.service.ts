import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CartModalComponent} from './cart-modal/cart-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private dialog: MatDialog) { }

  openCartModal(): MatDialogRef<CartModalComponent> {
    return this.dialog.open(CartModalComponent, {
      width: '500px',
      height: '540px',
      panelClass: 'cart-dialog-container',
      autoFocus: false
    });
  }
}
