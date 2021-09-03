import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLegalInfoComponent } from './edit-legal-info.component';

describe('EditLegalInfoComponent', () => {
  let component: EditLegalInfoComponent;
  let fixture: ComponentFixture<EditLegalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLegalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLegalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
