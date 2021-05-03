import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesEditComponent } from './preferences-edit.component';

describe('PreferencesEditComponent', () => {
  let component: PreferencesEditComponent;
  let fixture: ComponentFixture<PreferencesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
