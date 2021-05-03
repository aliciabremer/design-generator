import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTempComponent } from './create-temp.component';

describe('CreateTempComponent', () => {
  let component: CreateTempComponent;
  let fixture: ComponentFixture<CreateTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
