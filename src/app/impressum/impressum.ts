import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../shared/services/language.service';

/**
 * Impressum (Legal Notice) component.
 *
 * This component displays the legal notice page of the website.
 * It supports router links for navigation and uses the LanguageService
 * to handle multilingual text or language switching.
 *
 * Additionally, it ensures that the page scrolls to the top when the component is loaded.
 */
@Component({
  selector: 'app-impressum',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './impressum.html',
  styleUrls: ['./impressum.scss']
})
export class Impressum implements AfterViewInit {

  /**
   * Creates an instance of the Impressum component.
   *
   * @param {LanguageService} langService - Service used to manage language selection and translations.
   */
  constructor(public langService: LanguageService) {}

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Scrolls the window to the top to ensure the user starts at the beginning of the page.
   */
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
}
