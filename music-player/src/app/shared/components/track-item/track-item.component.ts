import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss'],
  standalone: false
})
export class TrackItemComponent {
  @Input() track!: Track;
  @Input() active = false;
  @Output() select = new EventEmitter<void>();

  onClick(): void {
    this.select.emit();
  }

  getArtistNames(artists: Array<{ name: string }> | undefined): string {
    return (artists || []).map(a => a.name).join(', ');
  }
}
