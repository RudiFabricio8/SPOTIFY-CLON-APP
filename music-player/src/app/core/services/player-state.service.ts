import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../../shared/models/track.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {
  private currentTrackSubject = new BehaviorSubject<Track | null>(null);
  currentTrack$ = this.currentTrackSubject.asObservable();

  private queueSubject = new BehaviorSubject<Track[]>([]);
  queue$ = this.queueSubject.asObservable();

  private currentIndexSubject = new BehaviorSubject<number>(-1);
  currentIndex$ = this.currentIndexSubject.asObservable();

  setQueue(tracks: Track[], startIndex: number = 0): void {
  console.log('setQueue', tracks.length, 'tracks, index', startIndex, tracks[startIndex]);
  this.queueSubject.next(tracks);
  this.currentIndexSubject.next(startIndex);
  this.currentTrackSubject.next(tracks[startIndex] || null);
}

  playTrackAt(index: number): void {
    const queue = this.queueSubject.value;
    if (index >= 0 && index < queue.length) {
      this.currentIndexSubject.next(index);
      this.currentTrackSubject.next(queue[index]);
    }
  }

  playNext(): void {
    const queue = this.queueSubject.value;
    const currentIndex = this.currentIndexSubject.value;
    if (!queue.length) {
      return;
    }
    const nextIndex = (currentIndex + 1) % queue.length;
    this.currentIndexSubject.next(nextIndex);
    this.currentTrackSubject.next(queue[nextIndex]);
  }

  playPrevious(): void {
    const queue = this.queueSubject.value;
    const currentIndex = this.currentIndexSubject.value;
    if (!queue.length) {
      return;
    }
    const previousIndex = (currentIndex - 1 + queue.length) % queue.length;
    this.currentIndexSubject.next(previousIndex);
    this.currentTrackSubject.next(queue[previousIndex]);
  }
}
