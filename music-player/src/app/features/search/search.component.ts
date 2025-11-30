import { Component } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';
import { PlayerStateService } from '../../core/services/player-state.service';
import { Track } from '../../shared/models/track.model';

@Component({
selector: 'app-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.scss']
})
export class SearchComponent {
query = '';
tracks: Track[] = [];
loading = false;

constructor(private spotify: SpotifyService, private player: PlayerStateService) {}

doSearch(): void {
if (!this.query.trim()) {
this.tracks = [];
return;
}
this.loading = true;
this.spotify.search(this.query).subscribe(res => {
this.tracks = res.tracks.items || [];
this.loading = false;
}, () => this.loading = false);
}

playTrack(index: number): void {
this.player.setQueue(this.tracks, index);
}
}
