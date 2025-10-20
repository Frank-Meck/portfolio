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
   * @description Closes the navigation menu if it is currently open.
   */
  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }


  /**
   * @method setLanguage
   * @param {'DE' | 'EN'} lang - The language to set.
   * @description Updates the application's current language using the LanguageService.
   * If the hamburger menu is open, it closes it.
   */
  setLanguage(lang: 'DE' | 'EN') {
    this.langService.setLang(lang);

    if (this.menuOpen) {
      this.closeMenu();
    }
  }


  /**
   * @method goHome
   * @description Navigates to the home (main) page and scrolls to the top.
   * If already on the main page, only scrolls up smoothly without navigation.
   * Closes the hamburger menu if it's open.
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

    this.closeMenu();
  }
}
