import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../shared/models/track.model';
import { PlayerStateService } from '../../core/services/player-state.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: false
})
export class PlayerComponent {
	currentTrack$: Observable<Track | null>;
	isPlaying = false;
	flipped = false;
	currentTime = 0;
	duration = 0;

	@ViewChild('audioRef') audioRef?: ElementRef<HTMLAudioElement>;

	constructor(private playerState: PlayerStateService) {
		this.currentTrack$ = this.playerState.currentTrack$;
	}

	togglePlay(): void {
		const audio = this.audioRef?.nativeElement;
		if (!audio) {
			return;
		}
		if (this.isPlaying) {
			audio.pause();
			this.isPlaying = false;
		} else {
			audio.play();
			this.isPlaying = true;
		}
	}

	onTimeUpdate(): void {
		const audio = this.audioRef?.nativeElement;
		if (!audio) {
			return;
		}
		this.currentTime = audio.currentTime;
		this.duration = audio.duration || 0;
	}

	onSeek(event: Event): void {
		const audio = this.audioRef?.nativeElement;
		if (!audio) {
			return;
		}
		const input = event.target as HTMLInputElement;
		const value = Number(input.value);
		if (!isNaN(value)) {
			audio.currentTime = value;
		}
	}

	onEnded(): void {
		this.playerState.playNext();
		const audio = this.audioRef?.nativeElement;
		setTimeout(() => {
			if (audio) {
				audio.play();
				this.isPlaying = true;
			}
		});
	}

	playNext(): void {
		this.playerState.playNext();
		const audio = this.audioRef?.nativeElement;
		setTimeout(() => {
			if (audio) {
				audio.play();
				this.isPlaying = true;
			}
		});
	}

	playPrevious(): void {
		this.playerState.playPrevious();
		const audio = this.audioRef?.nativeElement;
		setTimeout(() => {
			if (audio) {
				audio.play();
				this.isPlaying = true;
			}
		});
	}

	toggleFlip(): void {
		this.flipped = !this.flipped;
	}

	formatTime(value: number): string {
		if (!value || isNaN(value)) {
			return '0:00';
		}
		const totalSeconds = Math.floor(value);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const padded = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${padded}`;
	}

	getArtistNames(artists: Array<{ name: string }> | undefined): string {
		return (artists || []).map(a => a.name).join(', ');
	}
}
