import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFormComponent } from './merchant.component';

describe('MerchantComponent', () => {
  let component: MerchantFormComponent;
  let fixture: ComponentFixture<MerchantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
