import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class PlayerQueueService {
  private _queue = new BehaviorSubject<Track[]>([]);
  queue$: Observable<Track[]> = this._queue.asObservable();

  constructor() { }

  private updateQueue(newQueue: Track[]): void {
    this._queue.next(newQueue);
  }

  enqueue(track: Track): void {
    const currentQueue = this._queue.getValue();
    this.updateQueue([...currentQueue, track]);
  }

  enqueueMany(tracks: Track[]): void {
    const currentQueue = this._queue.getValue();
    this.updateQueue([...currentQueue, ...tracks]);
  }

  dequeue(): Track | undefined {
    const currentQueue = this._queue.getValue();
    if (currentQueue.length > 0) {
      const [nextTrack, ...rest] = currentQueue;
      this.updateQueue(rest);
      return nextTrack;
    }
    return undefined;
  }

  remove(id: string): void {
    const currentQueue = this._queue.getValue();
    this.updateQueue(currentQueue.filter(track => track.id !== id));
  }

  clear(): void {
    this.updateQueue([]);
  }
}