/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CouriersListComponent } from './couriers-list.component';

describe('CouriersListComponent', () => {
  let component: CouriersListComponent;
  let fixture: ComponentFixture<CouriersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouriersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouriersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
