/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GovernmentListComponent } from './government-list.component';

describe('GovernmentListComponent', () => {
  let component: GovernmentListComponent;
  let fixture: ComponentFixture<GovernmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
