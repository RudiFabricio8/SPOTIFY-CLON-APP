import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Library } from './library';

const routes: Routes = [{ path: '', component: Library }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
