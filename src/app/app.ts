import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header'; 


/**
 * Main application component.
 * 
 * Serves as the root component of the Angular app.
 * It includes the header, footer, and router outlet
 * to manage navigation and global layout.
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, // enables the use of <router-outlet>
    Header,       // enables the use of <app-header>
    Footer,       // enables the use of <app-footer>
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

  /**
   * The title of the application.
   * 
   * Managed as a reactive signal so that it can be used
   * dynamically in templates (for example, updating the title in real time).
   * 
   * @type {import('@angular/core').WritableSignal<string>}
   */
  protected readonly title = signal('portfolio');

}