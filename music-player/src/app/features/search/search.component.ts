import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from '../../core/services/spotify.service';
import { PlayerStateService } from '../../core/services/player-state.service';
import { Track } from '../../shared/models/track.model';
import { Album } from '../../shared/models/album.model';
import { Router } from '@angular/router';

interface SearchResult {
  tracks: Track[];
  albums: Album[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false
})
export class SearchComponent {
  query = '';
  loading = false;
  results$?: Observable<SearchResult | null>;

  constructor(
    private spotify: SpotifyService,
    private playerState: PlayerStateService,
    private router: Router
  ) {}

  onSearch(): void {
    const trimmed = this.query.trim();
    if (!trimmed) {
      this.results$ = undefined;
      return;
    }
    this.loading = true;
    this.results$ = this.spotify.search(trimmed).pipe(
      map(res => {
        this.loading = false;
        return {
          tracks: res.tracks.items,
          albums: res.albums.items
        };
      })
    );
  }

  playTrack(track: Track): void {
    const albumId = track.album.id;
    this.spotify.getAlbum(albumId).subscribe(album => {
      const allTracks = album.tracks?.items || [];
      const tracks = allTracks.filter(t => !!t.preview_url);
      if (!tracks.length) {
        return;
      }
      const index = tracks.findIndex(t => t.id === track.id);
      this.playerState.setQueue(tracks, index < 0 ? 0 : index);
      this.router.navigate(['/home']);
    });
  }

  openAlbum(album: Album): void {
    this.router.navigate(['/album', album.id]);
  }

  getArtistNames(artists: Array<{ name: string }> | undefined): string {
    return (artists || []).map(a => a.name).join(', ');
  }
}
