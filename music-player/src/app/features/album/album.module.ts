import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
declarations: [AlbumDetailComponent],
imports: [CommonModule, AlbumRoutingModule, SharedModule]
})
export class AlbumModule {}
