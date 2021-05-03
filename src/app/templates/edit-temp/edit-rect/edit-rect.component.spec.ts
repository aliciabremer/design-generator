import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRectComponent } from './edit-rect.component';

describe('EditRectComponent', () => {
  let component: EditRectComponent;
  let fixture: ComponentFixture<EditRectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
