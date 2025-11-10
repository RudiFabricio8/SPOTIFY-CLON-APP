import { TestBed } from '@angular/core/testing';
import { PlayerQueueService } from './player-queue';

describe('PlayerQueueService', () => {
  let service: PlayerQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});