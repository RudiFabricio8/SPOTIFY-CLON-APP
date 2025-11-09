import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { PlayerControls } from './components/player-controls/player-controls';
import { SongCard } from './components/song-card/song-card';
import { MsToMmssPipe } from './pipes/ms-to-mmss-pipe';



@NgModule({
  declarations: [
    Sidebar,
    PlayerControls,
    SongCard,
    MsToMmssPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Sidebar,
    PlayerControls,
    SongCard,
    MsToMmssPipe
  ]
})
export class SharedModule { }
