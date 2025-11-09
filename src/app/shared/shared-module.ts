import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar';
import { PlayerControlsComponent } from './components/player-controls/player-controls-component';
import { SongCardComponent } from './components/song-card/song-card.component';
import { RouterModule } from '@angular/router';
import { MsToMmssPipe } from './pipes/ms-to-mmss.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    PlayerControlsComponent,
    SongCardComponent,
    MsToMmssPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    PlayerControlsComponent,
    SongCardComponent,
    MsToMmssPipe
  ]
})
export class SharedModule { }