import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTempComponent } from './filter-temp.component';

describe('FilterTempComponent', () => {
  let component: FilterTempComponent;
  let fixture: ComponentFixture<FilterTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
