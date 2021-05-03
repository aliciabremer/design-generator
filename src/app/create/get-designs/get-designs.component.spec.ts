import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDesignsComponent } from './get-designs.component';

describe('GetDesignsComponent', () => {
  let component: GetDesignsComponent;
  let fixture: ComponentFixture<GetDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDesignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
