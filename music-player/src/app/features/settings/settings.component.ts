import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
selector: 'app-settings',
templateUrl: './settings.component.html',
styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
env = environment;
}
