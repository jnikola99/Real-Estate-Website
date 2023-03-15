import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminizmeniComponent } from './adminizmeni.component';

describe('AdminizmeniComponent', () => {
  let component: AdminizmeniComponent;
  let fixture: ComponentFixture<AdminizmeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminizmeniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminizmeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
