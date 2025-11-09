import { TestBed } from '@angular/core/testing';

import { PlayerQueue } from './player-queue';

describe('PlayerQueue', () => {
  let service: PlayerQueue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerQueue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
