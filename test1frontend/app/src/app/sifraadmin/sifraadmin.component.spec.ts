import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifraadminComponent } from './sifraadmin.component';

describe('SifraadminComponent', () => {
  let component: SifraadminComponent;
  let fixture: ComponentFixture<SifraadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifraadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifraadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
