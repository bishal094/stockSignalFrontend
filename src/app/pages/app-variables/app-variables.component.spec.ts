import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVariablesComponent } from './app-variables.component';

describe('AppVariablesComponent', () => {
  let component: AppVariablesComponent;
  let fixture: ComponentFixture<AppVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
