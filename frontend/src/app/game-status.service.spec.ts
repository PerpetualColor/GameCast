import { TestBed } from '@angular/core/testing';

import { GameStatusService } from './game-status.service';

describe('GameStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameStatusService = TestBed.get(GameStatusService);
    expect(service).toBeTruthy();
  });
});
