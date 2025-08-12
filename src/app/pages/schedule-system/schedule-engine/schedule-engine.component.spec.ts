import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEngineComponent } from './schedule-engine.component';

describe('ScheduleEngineComponent', () => {
  let component: ScheduleEngineComponent;
  let fixture: ComponentFixture<ScheduleEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
