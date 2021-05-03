import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPinComponent } from './edit-pin.component';

describe('EditPinComponent', () => {
  let component: EditPinComponent;
  let fixture: ComponentFixture<EditPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
