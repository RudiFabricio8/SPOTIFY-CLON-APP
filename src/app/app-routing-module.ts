import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./pages/home/home-module').then(m => m.HomeModule) }, { path: 'search', loadChildren: () => import('./pages/search/search-module').then(m => m.SearchModule) }, { path: 'library', loadChildren: () => import('./pages/library/library-module').then(m => m.LibraryModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
