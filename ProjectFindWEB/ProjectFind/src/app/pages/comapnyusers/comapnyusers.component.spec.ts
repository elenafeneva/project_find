import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapnyusersComponent } from './comapnyusers.component';

describe('ComapnyusersComponent', () => {
  let component: ComapnyusersComponent;
  let fixture: ComponentFixture<ComapnyusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComapnyusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComapnyusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
