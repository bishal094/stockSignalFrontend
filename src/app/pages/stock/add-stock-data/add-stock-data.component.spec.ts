import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockDataComponent } from './add-stock-data.component';

describe('AddStockDataComponent', () => {
  let component: AddStockDataComponent;
  let fixture: ComponentFixture<AddStockDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStockDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
