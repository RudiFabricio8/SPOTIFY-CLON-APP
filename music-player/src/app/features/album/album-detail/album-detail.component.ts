import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../../core/services/spotify.service';
import { PlayerStateService } from '../../../core/services/player-state.service';
import { Album } from '../../../shared/models/album.model';

@Component({
selector: 'app-album-detail',
templateUrl: './album-detail.component.html',
styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
album: Album | null = null;
loading = false;

constructor(private route: ActivatedRoute, private spotify: SpotifyService, private player: PlayerStateService) {}

ngOnInit(): void {
const id = this.route.snapshot.queryParamMap.get('id');
if (id) {
this.loading = true;
this.spotify.getAlbum(id).subscribe(a => { this.album = a; this.loading = false; }, () => this.loading = false);
}
}

playAlbum(): void {
if (!this.album?.tracks?.items) { return; }
this.player.setQueue(this.album.tracks.items, 0);
}

playTrack(index: number): void {
if (!this.album?.tracks?.items) { return; }
this.player.setQueue(this.album.tracks.items, index);
}
}
