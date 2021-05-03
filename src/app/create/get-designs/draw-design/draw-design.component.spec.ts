import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawDesignComponent } from './draw-design.component';

describe('DrawDesignComponent', () => {
  let component: DrawDesignComponent;
  let fixture: ComponentFixture<DrawDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
