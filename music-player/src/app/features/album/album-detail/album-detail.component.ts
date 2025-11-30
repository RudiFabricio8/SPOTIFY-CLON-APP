import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../../core/services/spotify.service';
import { PlayerStateService } from '../../../core/services/player-state.service';
import { Album } from '../../../shared/models/album.model';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  standalone: false
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private playerState: PlayerStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.loading = true;
    this.spotify.getAlbum(id).subscribe(album => {
      this.album = album;
      this.loading = false;
    });
  }

  playTrack(track: Track): void {
    if (!this.album || !this.album.tracks) {
      return;
    }
    const allTracks = this.album.tracks.items;
    const tracks = allTracks.filter(t => !!t.preview_url);
    if (!tracks.length) {
      return;
    }
    const index = tracks.findIndex(t => t.id === track.id);
    this.playerState.setQueue(tracks, index < 0 ? 0 : index);
    this.router.navigate(['/home']);
  }

  playAlbum(): void {
    if (!this.album || !this.album.tracks) {
      return;
    }
    const tracks = this.album.tracks.items.filter(t => !!t.preview_url);
    if (!tracks.length) {
      return;
    }
    this.playerState.setQueue(tracks, 0);
    this.router.navigate(['/home']);
  }

  getArtistNames(artists: Array<{ name: string }> | undefined): string {
    return (artists || []).map(a => a.name).join(', ');
  }
}
