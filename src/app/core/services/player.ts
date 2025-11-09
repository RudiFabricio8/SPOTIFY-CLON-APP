import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { Track } from '../models/track';
import { PlayerQueueService } from './player-queue';
import { takeWhile, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements OnDestroy {
  private audio = new Audio();
  private _currentTrack = new BehaviorSubject<Track | null>(null);
  currentTrack$: Observable<Track | null> = this._currentTrack.asObservable();

  private _isPlaying = new BehaviorSubject<boolean>(false);
  isPlaying$: Observable<boolean> = this._isPlaying.asObservable();

  private _progress = new BehaviorSubject<number>(0); // 0-1
  progress$: Observable<number> = this._progress.asObservable();

  private _currentTimeMs = new BehaviorSubject<number>(0);
  currentTimeMs$: Observable<number> = this._currentTimeMs.asObservable();

  private _volume = new BehaviorSubject<number>(1); // 0-1
  volume$: Observable<number> = this._volume.asObservable();

  private timerSubscription: Subscription | null = null;
  private isAlive = true;

  constructor(private playerQueueService: PlayerQueueService) {
    this.audio.volume = this._volume.getValue();

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration) {
        this._progress.next(this.audio.currentTime / this.audio.duration);
        this._currentTimeMs.next(this.audio.currentTime * 1000);
      }
    });

    this.audio.addEventListener('ended', () => {
      this._isPlaying.next(false);
      this._progress.next(0);
      this._currentTimeMs.next(0);
      this.playNextTrack();
    });

    this.audio.addEventListener('pause', () => {
      this._isPlaying.next(false);
    });

    this.audio.addEventListener('play', () => {
      this._isPlaying.next(true);
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
    this.audio.pause();
    this.audio.src = '';
    this.timerSubscription?.unsubscribe();
  }

  load(track: Track): void {
    this.pause();
    this._currentTrack.next(track);
    this._progress.next(0);
    this._currentTimeMs.next(0);

    if (track.previewUrl) {
      this.audio.src = track.previewUrl;
      this.audio.load();
    } else {
      this.audio.src = '';
      // Podrías emitir un estado para indicar que no hay preview disponible
    }
  }

  play(): void {
    const currentTrack = this._currentTrack.getValue();
    if (currentTrack && currentTrack.previewUrl) {
      this.audio.play();
      this._isPlaying.next(true);
    }
  }

  pause(): void {
    this.audio.pause();
    this._isPlaying.next(false);
  }

  togglePlayPause(): void {
    if (this._isPlaying.getValue()) {
      this.pause();
    } else {
      this.play();
    }
  }

  private playNextTrack(): void {
    const nextTrack = this.playerQueueService.dequeue();
    if (nextTrack) {
      this.load(nextTrack);
      this.play();
    } else {
      this._currentTrack.next(null);
    }
  }

  playNext(): void {
    this.playNextTrack();
  }

  setVolume(volume: number): void {
    this._volume.next(volume);
    this.audio.volume = volume;
  }

  seek(progress: number): void {
    if (this.audio.duration) {
      this.audio.currentTime = this.audio.duration * progress;
    }
  }
}