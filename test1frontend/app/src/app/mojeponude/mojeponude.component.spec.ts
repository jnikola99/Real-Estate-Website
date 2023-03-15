import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeponudeComponent } from './mojeponude.component';

describe('MojeponudeComponent', () => {
  let component: MojeponudeComponent;
  let fixture: ComponentFixture<MojeponudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeponudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeponudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
