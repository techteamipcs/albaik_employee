import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarentStatusComponent } from './restuarent-status.component';

describe('RestuarentStatusComponent', () => {
  let component: RestuarentStatusComponent;
  let fixture: ComponentFixture<RestuarentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestuarentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestuarentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
