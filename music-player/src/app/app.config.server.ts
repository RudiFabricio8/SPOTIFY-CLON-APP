import { mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

// For development server-side rendering route extraction can cause runtime
// errors in some dev-environments. Export a merged config without server
// rendering providers to avoid SSR route extraction during `ng serve`.
export const config = mergeApplicationConfig(appConfig);
