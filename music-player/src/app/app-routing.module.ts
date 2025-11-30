import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
path: '',
redirectTo: 'home',
pathMatch: 'full'
},
{
path: 'home',
loadChildren: () => import('./features/player/player.module').then(m => m.PlayerModule)
},
{
path: 'search',
loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule)
},
{
path: 'library',
loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule)
},
{
path: 'album',
loadChildren: () => import('./features/album/album.module').then(m => m.AlbumModule)
},
{
path: 'settings',
loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
},
{
path: '**',
redirectTo: 'home'
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
