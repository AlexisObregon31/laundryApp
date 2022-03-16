import { TestBed } from '@angular/core/testing';

import { ModelUsuarioService } from './model_usuario';

describe('ModelUsuarioService', () => {
  let service: ModelUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
