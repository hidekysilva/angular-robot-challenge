import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotFormComponent } from './robot-form.component';

describe('RobotFormComponent', () => {
  let component: RobotFormComponent;
  let fixture: ComponentFixture<RobotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
