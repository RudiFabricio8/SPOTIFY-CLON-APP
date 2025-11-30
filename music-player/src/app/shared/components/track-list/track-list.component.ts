import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';
import { PlayerStateService } from '../../../core/services/player-state.service';

@Component({
selector: 'app-track-list',
templateUrl: './track-list.component.html',
styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
queue$: Observable<Track[]>;
currentIndex$: Observable<number>;

constructor(private playerState: PlayerStateService) {
this.queue$ = this.playerState.queue$;
this.currentIndex$ = this.playerState.currentIndex$;
}

playAt(index: number): void {
this.playerState.playTrackAt(index);
}
}
