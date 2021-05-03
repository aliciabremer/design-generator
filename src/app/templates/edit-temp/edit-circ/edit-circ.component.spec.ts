import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCircComponent } from './edit-circ.component';

describe('EditCircComponent', () => {
  let component: EditCircComponent;
  let fixture: ComponentFixture<EditCircComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCircComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCircComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
