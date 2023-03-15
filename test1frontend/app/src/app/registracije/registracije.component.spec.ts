import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijeComponent } from './registracije.component';

describe('RegistracijeComponent', () => {
  let component: RegistracijeComponent;
  let fixture: ComponentFixture<RegistracijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
