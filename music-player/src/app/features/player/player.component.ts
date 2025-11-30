import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../shared/models/track.model';
import { PlayerStateService } from '../../core/services/player-state.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: false
})
export class PlayerComponent {
  currentTrack$: Observable<Track | null>;
  flipped = false;
  currentTime = 0;
  duration = 0;

  constructor(private playerState: PlayerStateService) {
    this.currentTrack$ = this.playerState.currentTrack$;
  }

  playNext(): void {
    this.playerState.playNext();
    this.resetFakeProgress();
  }

  playPrevious(): void {
    this.playerState.playPrevious();
    this.resetFakeProgress();
  }

  // Simula que el usuario mueve el progreso
  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (!isNaN(value)) {
      this.currentTime = value;
    }
  }

  toggleFlip(): void {
    this.flipped = !this.flipped;
  }

  formatTime(value: number): string {
    if (!value || isNaN(value)) {
      return '0:00';
    }
    const totalSeconds = Math.floor(value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const padded = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${padded}`;
  }

  getArtistNames(artists: Array<{ name: string }> | undefined): string {
    return (artists || []).map(a => a.name).join(', ');
  }

  private resetFakeProgress(): void {
    this.currentTime = 0;
  }
}
