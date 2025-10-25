import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Header {

  /** Steuert, ob das mobile Menu geöffnet ist */
  menuOpen = false;

  constructor(
    public langService: LanguageService,
    private router: Router,
    private scrollService: ScrollService
  ) {}

  /** Öffnet oder schließt das mobile Menu */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /** Schließt das mobile Menu */
  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }

  /** Setzt die aktuelle Sprache und schließt das Menu */
  setLanguage(lang: 'DE' | 'EN') {
    this.langService.setLang(lang);
    this.closeMenu();
  }

  /** Navigiert nach oben zur Startseite bzw. mymain */
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
   * Scrollt zu einer Section über den ScrollService
   * @param elementId ID der Ziel-Section
   * @param offset Offset für z.B. Header-Höhe
   */
  scrollToSection(elementId: string, offset: number = 100) {
  const performScroll = () => this.scrollService.scrollToSection(elementId, offset);

  // Wenn wir schon auf der Startseite sind, nur scrollen
  if (this.router.url === '/' || this.router.url.startsWith('/?')) {
    performScroll();
  } else {
    // Wenn wir auf einer anderen Seite sind, erst zurück zur Startseite navigieren
    this.router.navigate(['/']).then(() => {
      setTimeout(() => performScroll(), 50);
    });
  }

  this.closeMenu();
}

}
