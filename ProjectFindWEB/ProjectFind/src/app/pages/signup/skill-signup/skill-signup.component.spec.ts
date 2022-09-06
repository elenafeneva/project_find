import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSignupComponent } from './skill-signup.component';

describe('SkillSignupComponent', () => {
  let component: SkillSignupComponent;
  let fixture: ComponentFixture<SkillSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
