import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjenekretnineComponent } from './dodavanjenekretnine.component';

describe('DodavanjenekretnineComponent', () => {
  let component: DodavanjenekretnineComponent;
  let fixture: ComponentFixture<DodavanjenekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodavanjenekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodavanjenekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
