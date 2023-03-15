import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudeadminComponent } from './ponudeadmin.component';

describe('PonudeadminComponent', () => {
  let component: PonudeadminComponent;
  let fixture: ComponentFixture<PonudeadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudeadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudeadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
