import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFontsComponent } from './filter-fonts.component';

describe('FilterFontsComponent', () => {
  let component: FilterFontsComponent;
  let fixture: ComponentFixture<FilterFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterFontsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
