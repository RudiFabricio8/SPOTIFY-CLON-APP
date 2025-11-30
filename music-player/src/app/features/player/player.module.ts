import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerRoutingModule } from './player-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
declarations: [PlayerComponent],
imports: [CommonModule, PlayerRoutingModule, SharedModule],
exports: [PlayerComponent]
})
export class PlayerModule {}
