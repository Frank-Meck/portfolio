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

  showEmailModal = false;

  /**
   * Constructor for Footer component
   * @param langService Service to handle language changes
   * @param router Angular Router for navigation
   */
  constructor(
    public langService: LanguageService,
    private router: Router
  ) {}


  /**
   * Opens the email modal
   */
  openEmailModal(): void {
    this.showEmailModal = true;
  }


  /**
   * Closes the email modal
   */
  closeEmailModal(): void {
    this.showEmailModal = false;
  }


  /**
   * Opens the email modal and scrolls to the contact section
   */
  openEmailModalAndScroll(): void {
    this.showEmailModal = true;

    setTimeout(() => {
      this.scrollToMyContact();
    }, 50);
  }


  /**
   * Scrolls smoothly to the contact section with offset for header
   */
  scrollToMyContact(): void {
    if (this.router.url.startsWith('/main')) {
      const el = document.getElementById('mycontact_topic'); 
      if (el) {
        const headerHeight = document.querySelector('header')?.clientHeight || 0;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10; 
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/main']).then(() => {
        setTimeout(() => {
          const el = document.getElementById('mycontact_topic');
          if (el) {
            const headerHeight = document.querySelector('header')?.clientHeight || 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      });
    }
  }


  /**
   * Scrolls smoothly to the top of the page, or navigates to /main first if not already there
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
