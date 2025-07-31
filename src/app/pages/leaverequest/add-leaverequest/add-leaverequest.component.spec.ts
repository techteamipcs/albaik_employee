import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaverequestComponent } from './add-leaverequest.component';

describe('AddLeaverequestComponent', () => {
  let component: AddLeaverequestComponent;
  let fixture: ComponentFixture<AddLeaverequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaverequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
