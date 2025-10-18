import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  imports: [RouterLink] // only RouterLink, no Router!
})
export class Footer {

  /**
   * @constructor
   * @param {LanguageService} langService The language service to get translations.
   * @param {Router} router Angular Router for navigation and scrolling.
   */
  constructor(public langService: LanguageService, private router: Router) { }


  /**
   * @method
   * @description Smoothly scrolls to the "mycontact-section". 
   * If the user is already on '/main', it scrolls directly. 
   * Otherwise, it navigates to '/main/mycontact' first and then scrolls.
   */
  scrollToMyContact() {
    if (this.router.url.startsWith('/main')) {
      const el = document.getElementById('mycontact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/main/mycontact']).then(() => {
        setTimeout(() => {
          const el = document.getElementById('mycontact-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    }
  }

 /**
   * @method
   * @description Navigates to the main page and scrolls smoothly to the top.
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