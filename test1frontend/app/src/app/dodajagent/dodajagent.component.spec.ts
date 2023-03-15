import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajagentComponent } from './dodajagent.component';

describe('DodajagentComponent', () => {
  let component: DodajagentComponent;
  let fixture: ComponentFixture<DodajagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
