import { TestBed } from '@angular/core/testing';

import { IngresosService } from './ingresos.service';

describe('GastosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngresosService = TestBed.get(IngresosService);
    expect(service).toBeTruthy();
  });
});