import { TestBed, inject } from '@angular/core/testing';

import { ItemCrudService } from './item-crud.service';

describe('ItemCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemCrudService]
    });
  });

  it('should be created', inject([ItemCrudService], (service: ItemCrudService) => {
    expect(service).toBeTruthy();
  }));
});
