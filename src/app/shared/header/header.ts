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
   * @param {LanguageService} langService - Service for managing language translations.
   * @param {Router} router - Angular Router used for navigation and smooth scrolling.
   */
  constructor(public langService: LanguageService, private router: Router) {}


  /**
   * @method toggleMenu
   * @description Toggles the visibility of the navigation menu.
   * Opens it if closed, closes it if open.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  
  /**
   * @method closeMenu
   * @description Closes the navigation menu if it is open.
   */
  closeMenu() {
    this.menuOpen = false;
  }


  
  /**
   * @method setLanguage
   * @param {'DE' | 'EN'} lang - The language to set.
   * @description Updates the application's current language using the LanguageService.
   */
  setLanguage(lang: 'DE' | 'EN') {
    this.langService.setLang(lang);
  }


  
  /**
   * @private
   * @method scrollToElementById
   * @param {string} elementId - The HTML element ID to scroll to.
   * @param {number} [offset=100] - The vertical offset in pixels to account for a fixed header.
   * @param {string} [route='/main'] - The route to navigate to before performing the scroll.
   * @description Smoothly scrolls to a specific element on the page. 
   * Navigates to the provided route first if the current route differs.
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
   * @method scrollToAboutMe
   * @description Smoothly scrolls to the "About Me" section.
   */
  scrollToAboutMe() {
    this.scrollToElementById('myaboutme-topic');
  }


  
  /**
   * @method scrollToMySkills
   * @description Smoothly scrolls to the "My Skills" section.
   */
  scrollToMySkills() {
    this.scrollToElementById('myskills-section');
  }


  
  /**
   * @method scrollToMyPortfolio
   * @description Smoothly scrolls to the "My Portfolio" section.
   */
  scrollToMyPortfolio() {
    this.scrollToElementById('myportfolio-section');
  }


  
  /**
   * @method scrollToMyContact
   * @description Smoothly scrolls to the "My Contact" section.
   */
  scrollToMyContact() {
    this.scrollToElementById('mycontact-section');
  }

  
  /**
   * @method goHome
   * @description Navigates to the home (main) page and scrolls to the top.
   * If already on the main page, only scrolls up smoothly without navigation.
   */
  goHome() {
    if (this.router.url.startsWith('/main')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/main']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    this.closeMenu();
  }
}
