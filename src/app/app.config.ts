import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


/**
 * Global application configuration.
 * 
 * Provides the main dependency injection setup for the Angular app.
 * Here, the router is configured with the defined routes so that
 * navigation within the application works correctly.
 * 
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
