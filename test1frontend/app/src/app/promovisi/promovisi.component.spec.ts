import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromovisiComponent } from './promovisi.component';

describe('PromovisiComponent', () => {
  let component: PromovisiComponent;
  let fixture: ComponentFixture<PromovisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromovisiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromovisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
