import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './main/main';
import { Impressum } from './impressum/impressum';
import { Datenschutz } from './datenschutz/datenschutz';


/**
 * Defines all application routes.
 * 
 * Each route maps a URL path to a specific component.
 * The wildcard route redirects unknown paths to the home page.
 * 
 * @type {Routes}
 */
export const routes: Routes = [
  { path: '', component: Main },                 // Home page
  { path: 'main', component: Main },             // Alternate path for the home page
  { path: 'impressum', component: Impressum },   // Legal notice page
  { path: 'datenschutz', component: Datenschutz }, // Privacy policy page
  { path: '**', redirectTo: '' }                 // Fallback for unknown routes
];



/**
 * Application routing module.
 * 
 * Configures and provides the Angular Router for the app.
 * It enables navigation, fragment scrolling, and adjusts the scroll offset
 * to account for a fixed header.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled', // enables scrolling to anchor fragments
      scrollOffset: [0, 100]      // accounts for the fixed header height
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
