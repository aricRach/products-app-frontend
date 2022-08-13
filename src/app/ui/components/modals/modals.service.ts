import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CartModalComponent} from './cart-modal/cart-modal.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private dialog: MatDialog) { }

  openCartModal(): MatDialogRef<CartModalComponent> {
    return this.dialog.open(CartModalComponent, {
      width: '500px',
      height: '540px',
      autoFocus: false,
    });
  }

  openConfirmModal(): MatDialogRef<ConfirmModalComponent> {
    return this.dialog.open(ConfirmModalComponent, {
      width: '340px',
      height: '200px',
      autoFocus: false,
    });
  }
}
