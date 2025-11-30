import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
	declarations: [SettingsComponent],
	imports: [CommonModule, FormsModule, SettingsRoutingModule]
})
export class SettingsModule {}
