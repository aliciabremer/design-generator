import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTempComponent } from './delete-temp.component';

describe('DeleteTempComponent', () => {
  let component: DeleteTempComponent;
  let fixture: ComponentFixture<DeleteTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
