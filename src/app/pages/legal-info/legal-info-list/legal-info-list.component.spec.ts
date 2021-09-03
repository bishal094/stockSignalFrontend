import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalInfoListComponent } from './legal-info-list.component';

describe('LegalInfoListComponent', () => {
  let component: LegalInfoListComponent;
  let fixture: ComponentFixture<LegalInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
