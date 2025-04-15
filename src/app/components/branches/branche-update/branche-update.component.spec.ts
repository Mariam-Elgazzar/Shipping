import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheUpdateComponent } from './branche-update.component';

describe('BrancheUpdateComponent', () => {
  let component: BrancheUpdateComponent;
  let fixture: ComponentFixture<BrancheUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrancheUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrancheUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
