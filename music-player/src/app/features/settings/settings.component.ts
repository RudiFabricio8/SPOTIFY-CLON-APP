import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	standalone: false
})
export class SettingsComponent {
	apiUrl = environment.spotifyApiUrl;
}
