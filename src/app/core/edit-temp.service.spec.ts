import { TestBed } from '@angular/core/testing';

import { EditTempService } from './edit-temp.service';

describe('EditTempService', () => {
  let service: EditTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
