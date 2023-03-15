import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojenekretnineComponent } from './mojenekretnine.component';

describe('MojenekretnineComponent', () => {
  let component: MojenekretnineComponent;
  let fixture: ComponentFixture<MojenekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojenekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojenekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
