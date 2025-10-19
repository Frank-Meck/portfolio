import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { Modal } from '../components/modal/modal'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  imports: [
    CommonModule,
    RouterLink,
    Modal
  ]
})
export class Footer {

  /** Indicates whether the email modal is currently visible. */
  showEmailModal = false;


  /**
   * Creates an instance of the Footer component.
   * @param langService - The language service for translations.
   * @param router - Angular router used for navigation.
   */
  constructor(
    public langService: LanguageService,
    private router: Router
  ) {}


  /**
   * Opens the email hint modal.
   * Called when the user clicks the mail icon in the footer.
   */
  openEmailModal(): void {
    this.showEmailModal = true;
  }


  /**
   * Closes the email hint modal.
   * Triggered when the user clicks the "OK" button in the modal.
   */
  closeEmailModal(): void {
    this.showEmailModal = false;
  }


  /**
   * Smoothly scrolls to the "mycontact-section" element.
   * Navigates to the main page first if not already on it.
   */
  scrollToMyContact(): void {
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
   * Navigates to the main page and scrolls to the top smoothly.
   * If already on the main page, it only scrolls without navigation.
   */
  goHome(): void {
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
