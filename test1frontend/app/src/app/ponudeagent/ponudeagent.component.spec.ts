import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudeagentComponent } from './ponudeagent.component';

describe('PonudeagentComponent', () => {
  let component: PonudeagentComponent;
  let fixture: ComponentFixture<PonudeagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudeagentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudeagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
