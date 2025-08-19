import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGanttComponent } from './schedule-gantt.component';

describe('ScheduleGanttComponent', () => {
  let component: ScheduleGanttComponent;
  let fixture: ComponentFixture<ScheduleGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleGanttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
