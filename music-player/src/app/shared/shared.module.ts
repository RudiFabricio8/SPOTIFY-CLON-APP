import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';

@NgModule({
declarations: [
SidebarComponent,
TrackListComponent,
TrackItemComponent,
LoaderComponent
],
imports: [CommonModule, RouterModule],
exports: [
SidebarComponent,
TrackListComponent,
TrackItemComponent,
LoaderComponent
]
})
export class SharedModule {}
