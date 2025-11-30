import { Component } from '@angular/core';

@Component({
selector: 'app-library',
templateUrl: './library.component.html',
styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
albums = [
{ id: '1', name: 'Favorites' },
{ id: '2', name: 'Chill' },
{ id: '3', name: 'Workout' }
];
}
