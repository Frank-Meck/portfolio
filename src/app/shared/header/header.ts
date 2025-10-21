import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll';

/**
 * Header component that manages navigation, language switching,
 * and smooth scrolling to different sections using ScrollService.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Header {

  /** Controls whether the mobile navigation menu is open */
  menuOpen = false;

  /**
   * @constructor
   * @param {LanguageService} langService - Service for managing translations.
   * @param {Router} router - Angular Router for navigation.
   * @param {ScrollService} scrollService - Shared service for smooth scrolling.
   */
  constructor(
    public langService: LanguageService,
    private router: Router,
    private scrollService: ScrollService
  ) {}



  /**
   * Toggles the mobile navigation menu open/closed.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  /**
   * Closes the mobile navigation menu if open.
   */
  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }


  /**
   * Sets the active application language and closes the menu (if open).
   * @param {'DE' | 'EN'} lang - The language code to activate.
   */
  setLanguage(lang: 'DE' | 'EN') {
    this.langService.setLang(lang);
    this.closeMenu();
  }


  /**
   * Navigates to the main section and scrolls to the top.
   * If already on `/main`, performs only a smooth scroll.
   */
  goHome() {
    const scrollTop = () => this.scrollService.scrollToTop();

    if (this.router.url.startsWith('/main')) {
      scrollTop();
    } else {
      this.router.navigate(['/main']).then(() => setTimeout(() => scrollTop(), 50));
    }

    this.closeMenu();
  }


  /**
   * Smoothly scrolls to a specific section using the shared ScrollService.
   * Works both when already on /main and when navigating from another route.
   * @param {string} elementId - The ID of the target section.
   * @param {number} offset - Optional offset (for sticky headers, etc.)
   */
  scrollToSection(elementId: string, offset: number = 100) {
    const performScroll = () => this.scrollService.scrollToSection(elementId, offset);

    if (this.router.url.startsWith('/main')) {
      performScroll();
    } else {
      this.router.navigate(['/main']).then(() => setTimeout(() => performScroll(), 50));
    }

    this.closeMenu();
  }
}
