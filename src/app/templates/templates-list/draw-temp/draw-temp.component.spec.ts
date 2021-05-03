import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawTempComponent } from './draw-temp.component';

describe('DrawTempComponent', () => {
  let component: DrawTempComponent;
  let fixture: ComponentFixture<DrawTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
