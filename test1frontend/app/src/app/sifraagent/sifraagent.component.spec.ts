import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifraagentComponent } from './sifraagent.component';

describe('SifraagentComponent', () => {
  let component: SifraagentComponent;
  let fixture: ComponentFixture<SifraagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifraagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifraagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
