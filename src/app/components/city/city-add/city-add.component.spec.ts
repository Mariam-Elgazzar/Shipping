import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAddComponent } from './city-add.component';

describe('CityAddComponent', () => {
  let component: CityAddComponent;
  let fixture: ComponentFixture<CityAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
