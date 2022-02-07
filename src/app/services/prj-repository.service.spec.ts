import { TestBed } from '@angular/core/testing';

import { PrjRepositoryService } from './prj-repository.service';

describe('PrjRepositoryService', () => {
  let service: PrjRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrjRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
