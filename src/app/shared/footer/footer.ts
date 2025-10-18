import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink] // <-- wichtig für *ngIf
})
export class Footer {

  /** Indicates whether the email hint modal is visible */
  showEmailModal = false;


  /**
   * @constructor
   * @param {LanguageService} langService The language service for translations
   * @param {Router} router Angular router for navigation and scrolling
   */
  constructor(public langService: LanguageService, private router: Router) { }


  /**
   * Opens the email hint modal
   */
  openEmailModal() {
    this.showEmailModal = true;
  }


  /**
   * Closes the email hint modal
   */
  closeEmailModal() {
    this.showEmailModal = false;
  }


  /**
   * Smoothly scrolls to the "mycontact-section"
   */
  scrollToMyContact() {
    if (this.router.url.startsWith('/main')) {
      const el = document.getElementById('mycontact-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this.router.navigate(['/main/mycontact']).then(() => {
        setTimeout(() => {
          const el = document.getElementById('mycontact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      });
    }
  }


  /**
   * Navigates to the main page and scrolls to the top
   */
  goHome() {
    if (this.router.url.startsWith('/main') || this.router.url === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/main']).then(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      });
    }
  }
}