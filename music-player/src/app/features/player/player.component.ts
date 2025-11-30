import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerStateService } from '../../core/services/player-state.service';
import { Track } from '../../shared/models/track.model';

@Component({
selector: 'app-player',
templateUrl: './player.component.html',
styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
currentTrack: Track | null = null;
currentIndex = -1;
subs: Subscription[] = [];
@ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
progress = 0;

constructor(private player: PlayerStateService) {}

ngOnInit(): void {
this.subs.push(this.player.currentTrack$.subscribe(t => {
this.currentTrack = t;
if (this.audioRef && this.audioRef.nativeElement) {
setTimeout(() => {
this.audioRef.nativeElement.load();
if (t && t.preview_url) {
this.audioRef.nativeElement.play().catch(() => {});
}
}, 0);
}
}));
this.subs.push(this.player.currentIndex$.subscribe(i => this.currentIndex = i));
}

ngOnDestroy(): void {
this.subs.forEach(s => s.unsubscribe());
}

playNext(): void { this.player.playNext(); }
playPrevious(): void { this.player.playPrevious(); }

onTimeUpdate(e: Event): void {
const el = e.target as HTMLAudioElement;
if (el.duration) {
this.progress = (el.currentTime / el.duration) * 100;
}
}

seek(percent: number): void {
const el = this.audioRef.nativeElement;
if (el.duration) {
el.currentTime = (percent / 100) * el.duration;
}
}
}
