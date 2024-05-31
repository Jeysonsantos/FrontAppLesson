import { TestBed } from '@angular/core/testing';

import { DadosServicesService } from './dados-services.service';

describe('DadosServicesService', () => {
  let service: DadosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
