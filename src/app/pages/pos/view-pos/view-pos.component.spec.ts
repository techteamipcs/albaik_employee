import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPosComponent } from './view-pos.component';

describe('ViewPosComponent', () => {
  let component: ViewPosComponent;
  let fixture: ComponentFixture<ViewPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
