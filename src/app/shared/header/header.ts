import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Header {
  menuOpen = false;

  /**
   * @constructor
   * @param {LanguageService} langService Service to get and set the current language.
   * @param {Router} router Angular Router for navigation and smooth scrolling.
   */
  constructor(public langService: LanguageService, private router: Router) { }


  /**
   * @method
   * @description Toggles the visibility of the menu.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  /**
   * @method
   * @description Closes the menu.
   */
  closeMenu() {
    this.menuOpen = false;
  }


  /**
   * @method
   * @param {'DE' | 'EN'} lang Language to set.
   * @description Updates the current language using the LanguageService.
   */
  setLanguage(lang: 'DE' | 'EN') {
    this.langService.setLang(lang);
  }


  /**
   * @private
   * @method
   * @param {string} elementId The HTML element ID to scroll to.
   * @param {number} [offset=100] Offset in pixels to consider fixed header height.
   * @param {string} [route='/main'] Route to navigate before scrolling.
   * @description Scrolls smoothly to the given element. Navigates to the route if not already on it.
   */
  private scrollToElementById(elementId: string, offset: number = 100, route: string = '/main') {
    const scroll = () => {
      const el = document.getElementById(elementId);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };

    if (this.router.url.startsWith(route)) {
      scroll();
    } else {
      this.router.navigate([route]).then(() => {
        setTimeout(() => scroll(), 50);
      });
    }

    this.closeMenu();
  }


  /**
   * @method
   * @description Scrolls to the "About Me" section.
   */
  scrollToAboutMe() {
    this.scrollToElementById('myaboutme-topic');
  }


  /**
   * @method
   * @description Scrolls to the "My Skills" section.
   */
  scrollToMySkills() {
    this.scrollToElementById('myskills-section');  
  }


  /**
   * @method
   * @description Scrolls to the "My Portfolio" section.
   */
  scrollToMyPortfolio() {
    this.scrollToElementById('myportfolio-section');
  }


  /**
   * @method
   * @description Scrolls to the "My Contact" section.
   */
  scrollToMyContact() {
    this.scrollToElementById('mycontact-section');
  }
}
