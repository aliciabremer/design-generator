import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePinComponent } from './delete-pin.component';

describe('DeletePinComponent', () => {
  let component: DeletePinComponent;
  let fixture: ComponentFixture<DeletePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
