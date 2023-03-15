import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretnineadminComponent } from './nekretnineadmin.component';

describe('NekretnineadminComponent', () => {
  let component: NekretnineadminComponent;
  let fixture: ComponentFixture<NekretnineadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NekretnineadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretnineadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
