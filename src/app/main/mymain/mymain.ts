import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/language.service';


/**
 * @component
 * @description Component representing the main section of the portfolio. 
 * Handles introductory content and navigation actions.
 */
@Component({
  imports: [
    CommonModule    // necessary for ngStyle, ngClass, ngIf, ngFor
  ],
  selector: 'app-mymain',
  templateUrl: './mymain.html',
  styleUrls: ['./mymain.scss']
})
export class Mymain {

  
  /**
   * @constructor
   * @param langService - Service to manage language selection and translations.
   * @param router - Angular Router service for navigation.
   * @description Initializes the Mymain component with language and router services.
   */
  constructor(public langService: LanguageService, private router: Router) {}



 /**
   * @method scrollToSection
   * @param {string} elementId - The ID of the target section.
   * @param {number} offset - The offset to account for sticky header.
   * @description Smoothly scrolls to a section while considering the sticky header height.
   */
  scrollToSection(elementId: string, offset: number = 100) {
    const scroll = () => {
      const el = document.getElementById(elementId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (this.router.url.startsWith('/main')) {
      scroll();
    } else {
      this.router.navigate(['/main']).then(() => setTimeout(() => scroll(), 50));
    }

   
  }
}
