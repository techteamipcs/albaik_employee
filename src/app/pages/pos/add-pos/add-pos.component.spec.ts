import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosComponent } from './add-pos.component';

describe('AddPosComponent', () => {
  let component: AddPosComponent;
  let fixture: ComponentFixture<AddPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
