import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
		private playerState: PlayerStateService
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
		const tracks = this.album.tracks.items;
		const index = tracks.findIndex(t => t.id === track.id);
		this.playerState.setQueue(tracks, index < 0 ? 0 : index);
	}

	playAlbum(): void {
		if (!this.album || !this.album.tracks) {
			return;
		}
		this.playerState.setQueue(this.album.tracks.items, 0);
	}

	getArtistNames(artists: Array<{ name: string }> | undefined): string {
		return (artists || []).map(a => a.name).join(', ');
	}
}
