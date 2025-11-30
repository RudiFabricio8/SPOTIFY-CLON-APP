import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
declarations: [MainLayoutComponent],
imports: [CommonModule, RouterModule, SharedModule],
exports: [MainLayoutComponent]
})
export class CoreModule {}
