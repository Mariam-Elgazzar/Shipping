import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheAddComponent } from './branche-add.component';

describe('BrancheAddComponent', () => {
  let component: BrancheAddComponent;
  let fixture: ComponentFixture<BrancheAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrancheAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrancheAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
