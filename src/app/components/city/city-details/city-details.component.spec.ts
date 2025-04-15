/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CityDetailsComponent } from './city-details.component';

describe('CityDetailsComponent', () => {
  let component: CityDetailsComponent;
  let fixture: ComponentFixture<CityDetailsComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ CityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
