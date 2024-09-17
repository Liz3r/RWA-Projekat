import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { credentialsResolver } from './credentials.resolver';

describe('credentialsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => credentialsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
