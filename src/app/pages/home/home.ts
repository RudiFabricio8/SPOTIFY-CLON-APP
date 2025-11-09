import { Component } from '@angular/core';
import { PlayerService } from '../../core/services/player';
import { PlayerQueueService } from '../../core/services/player-queue';
import { Observable } from 'rxjs';
import { Track } from '../../core/models/track';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: false
})
export class HomeComponent {
  currentTrack$: Observable<Track | null>;
  queue$: Observable<Track[]>;

  constructor(
    private playerService: PlayerService,
    private playerQueueService: PlayerQueueService
  ) {
    this.currentTrack$ = this.playerService.currentTrack$;
    this.queue$ = this.playerQueueService.queue$;
  }

  trackById(index: number, item: Track): string {
  return item.id;
  }

  onTrackSelected(track: Track): void {
    this.playerService.load(track);
    this.playerService.play();
  }

  removeTrackFromQueue(trackId: string): void {
    this.playerQueueService.remove(trackId);
  }
}