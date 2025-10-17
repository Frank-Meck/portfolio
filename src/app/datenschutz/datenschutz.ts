import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Datenschutz (Privacy Policy) component.
 *
 * This standalone component displays the privacy policy page.
 * It imports the Angular RouterModule so that router links within the template
 * (e.g., `<a routerLink="/">Home</a>`) work correctly.
 *
 * Additionally, it ensures that the page scrolls to the top when the component is loaded.
 */
@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [RouterModule],   // RouterModule must be imported for routerLink support
  templateUrl: './datenschutz.html',
  styleUrls: ['./datenschutz.scss']
})
export class Datenschutz implements AfterViewInit {

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Scrolls the window to the top to ensure the user starts at the beginning of the page.
   */
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
}
