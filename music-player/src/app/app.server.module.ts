import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppServerModule {}
