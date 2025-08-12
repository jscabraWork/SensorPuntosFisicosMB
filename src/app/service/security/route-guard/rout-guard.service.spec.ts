import { TestBed } from '@angular/core/testing';
import { RouteGuardService } from './rout-guard.service';


describe('RoutGuardService', () => {
  let service: RouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
