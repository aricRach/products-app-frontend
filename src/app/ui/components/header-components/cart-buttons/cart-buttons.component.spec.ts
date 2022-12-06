import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonsComponent } from './cart-buttons.component';

describe('CartButtonsComponent', () => {
  let component: CartButtonsComponent;
  let fixture: ComponentFixture<CartButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
