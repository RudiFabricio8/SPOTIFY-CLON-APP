import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
declarations: [SearchComponent],
imports: [CommonModule, SearchRoutingModule, FormsModule, SharedModule]
})
export class SearchModule {}
