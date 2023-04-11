import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCapsuleComponent } from './view-capsule.component';

describe('ViewCapsuleComponent', () => {
  let component: ViewCapsuleComponent;
  let fixture: ComponentFixture<ViewCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
