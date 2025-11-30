import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';
import { Album } from '../../shared/models/album.model';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	standalone: false
})
export class LibraryComponent implements OnInit {
	albums: Album[] = [];
	loading = false;

	private albumIds = [
		'4aawyAB9vmqN3uQ7FjRGTy',
		'0sNOF9WDwhWunNAHPD3Baj',
		'382ObEPsp2rxGrnsizN5TX'
	];

	constructor(private spotify: SpotifyService, private router: Router) {}

	ngOnInit(): void {
		this.loading = true;
		let remaining = this.albumIds.length;
		this.albumIds.forEach(id => {
			this.spotify.getAlbum(id).subscribe(album => {
				this.albums.push(album);
				remaining -= 1;
				if (remaining === 0) {
					this.loading = false;
				}
			});
		});
	}

	openAlbum(album: Album): void {
		this.router.navigate(['/album', album.id]);
	}

	getArtistNames(artists: Array<{ name: string }> | undefined): string {
		return (artists || []).map(a => a.name).join(', ');
	}
}
