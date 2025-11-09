import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from '../../../core/services/player';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../../../core/models/track';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.html',
  styleUrls: ['./player-controls.scss'],
  standalone: false
})
export class PlayerControlsComponent implements OnDestroy {
  currentTrack$: Observable<Track | null>;
  isPlaying$: Observable<boolean>;
  progress$: Observable<number>;
  currentTimeMs$: Observable<number>;
  totalTimeMs$: Observable<number | null>;
  volume$: Observable<number>;

  private volumeSubscription: Subscription;
  private isSeeking: boolean = false;

  constructor(private playerService: PlayerService) {
    this.currentTrack$ = this.playerService.currentTrack$;
    this.isPlaying$ = this.playerService.isPlaying$;
    this.progress$ = this.playerService.progress$;
    this.currentTimeMs$ = this.playerService.currentTimeMs$;
    this.volume$ = this.playerService.volume$;

    this.totalTimeMs$ = this.currentTrack$.pipe(
      map(track => track ? track.durationMs : null)
    );

    this.volumeSubscription = this.volume$.subscribe(volume => {
    });
  }

  ngOnDestroy(): void {
    this.volumeSubscription.unsubscribe();
  }

  togglePlayPause(): void {
    this.playerService.togglePlayPause();
  }

  playNext(): void {
    this.playerService.playNext();
  }

  onProgressChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const progress = parseFloat(target.value);
    this.playerService.seek(progress);
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const volume = parseFloat(target.value);
    this.playerService.setVolume(volume);
  }

  onSeekStart(): void {
    this.isSeeking = true;
  }

  onSeekEnd(event: Event): void {
    this.isSeeking = false;
    this.onProgressChange(event);
  }

  isPrevDisabled(): boolean {
    return true;
  }
}