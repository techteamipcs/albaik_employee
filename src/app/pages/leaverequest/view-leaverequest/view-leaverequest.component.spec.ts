import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaverequestComponent } from './view-leaverequest.component';

describe('ViewLeaverequestComponent', () => {
  let component: ViewLeaverequestComponent;
  let fixture: ComponentFixture<ViewLeaverequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaverequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
