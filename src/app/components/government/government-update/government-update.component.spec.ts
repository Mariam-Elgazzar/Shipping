import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentUpdateComponent } from './government-update.component';

describe('GovernmentUpdateComponent', () => {
  let component: GovernmentUpdateComponent;
  let fixture: ComponentFixture<GovernmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernmentUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
