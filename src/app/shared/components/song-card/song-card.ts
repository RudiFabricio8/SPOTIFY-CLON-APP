import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../../../core/models/track';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.html',
  styleUrls: ['./song-card.scss']
})
export class SongCardComponent {
  @Input() track: Track | null = null;
  @Input() showPreviewButton: boolean = false;
  @Output() flip = new EventEmitter<void>();
  @Output() select = new EventEmitter<Track>();
  @Output() preview = new EventEmitter<Track>();

  isFlipped: boolean = false;

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
    this.flip.emit();
  }

  selectTrack(): void {
    if (this.track) {
      this.select.emit(this.track);
    }
  }

  playPreview(): void {
    if (this.track) {
      this.preview.emit(this.track);
    }
  }
}