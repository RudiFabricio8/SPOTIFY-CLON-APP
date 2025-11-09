import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpotifyApiService } from '../../core/services/spotify-api';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Track } from '../../core/models/track';
import { PlayerService } from '../../core/services/player';
import { PlayerQueueService } from '../../core/services/player-queue';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl<string>('');
  searchResults$: Observable<Track[]>;
  currentPreviewAudio = new Audio();
  currentPreviewTrackId: string | null = null;
  private previewPlaySubscription: Subscription | null = null;
  private currentPlayingPreviewTrack: Track | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private playerQueueService: PlayerQueueService
  ) {
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.spotifyApi.searchTracks(query || '')),
    );

    this.currentPreviewAudio.addEventListener('ended', () => {
      this.currentPreviewTrackId = null;
      this.currentPreviewAudio.src = '';
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.currentPreviewAudio.pause();
    this.currentPreviewAudio.src = '';
    this.previewPlaySubscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  playTrack(track: Track): void {
    if (this.currentPlayingPreviewTrack) {
      this.currentPreviewAudio.pause();
      this.currentPreviewAudio.src = '';
      this.currentPreviewTrackId = null;
      this.currentPlayingPreviewTrack = null;
    }
    this.playerService.load(track);
    this.playerService.play();
    this.playerQueueService.enqueue(track);
  }

  playPreview(track: Track): void {
    if (!track.previewUrl) {
      return;
    }

    if (this.currentPreviewTrackId === track.id) {
      this.currentPreviewAudio.pause();
      this.currentPreviewTrackId = null;
      this.currentPlayingPreviewTrack = null;
    } else {
      this.currentPreviewAudio.pause();
      this.currentPreviewAudio.src = track.previewUrl;
      this.currentPreviewAudio.load();
      this.currentPreviewAudio.play();
      this.currentPreviewTrackId = track.id;
      this.currentPlayingPreviewTrack = track;
    }
  }

  getSearchTerm(): string {
    return this.searchControl.value || '';
  }

  trackById(index: number, item: Track): string {
    return item.id;
  }
}