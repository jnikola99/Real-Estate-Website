import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnekretninaComponent } from './editnekretnina.component';

describe('EditnekretninaComponent', () => {
  let component: EditnekretninaComponent;
  let fixture: ComponentFixture<EditnekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
