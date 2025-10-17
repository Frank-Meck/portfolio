import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from './header/header';
import { Footer } from './footer/footer';


/**
 * Shared module.
 * 
 * This module bundles reusable components such as the Header and Footer.
 * It imports the CommonModule (for common Angular directives)
 * and exports the shared components so they can be used throughout the app.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Header,
    Footer
  ],
  exports: [
    Header,
    Footer
  ]
})
export class SharedModule {}
