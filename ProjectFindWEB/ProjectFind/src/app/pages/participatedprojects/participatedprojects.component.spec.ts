import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedprojectsComponent } from './participatedprojects.component';

describe('ParticipatedprojectsComponent', () => {
  let component: ParticipatedprojectsComponent;
  let fixture: ComponentFixture<ParticipatedprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatedprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
