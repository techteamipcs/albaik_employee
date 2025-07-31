import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCertificationComponent } from './view-certification.component';

describe('ViewCertificationComponent', () => {
  let component: ViewCertificationComponent;
  let fixture: ComponentFixture<ViewCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
