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

  constructor(
    public langService: LanguageService,
    private router: Router
  ) {}

  openEmailModal(): void {
    this.showEmailModal = true;
  }

  closeEmailModal(): void {
    this.showEmailModal = false;
  }

  /** 🔹 Neues: Modal öffnen und danach scrollen */
  openEmailModalAndScroll(): void {
    this.showEmailModal = true;

    // Kurzes Delay, damit Modal gerendert wird, dann scrollen
    setTimeout(() => {
      this.scrollToMyContact();
    }, 50);
  }

  scrollToMyContact(): void {
    if (this.router.url.startsWith('/main')) {
      const el = document.getElementById('mycontact_topic'); // id aus main.html
      if (el) {
        const headerHeight = document.querySelector('header')?.clientHeight || 0;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10; // kleiner Puffer
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
