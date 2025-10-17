import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/services/language.service';


/**
 * @component
 * @description Component representing the main section of the portfolio. 
 * Handles introductory content and navigation actions.
 */
@Component({
  imports: [
    CommonModule    // necessary for ngStyle, ngClass, ngIf, ngFor
  ],
  selector: 'app-mymain',
  templateUrl: './mymain.html',
  styleUrls: ['./mymain.scss']
})
export class Mymain {

  
  /**
   * @constructor
   * @param langService - Service to manage language selection and translations.
   * @param router - Angular Router service for navigation.
   * @description Initializes the Mymain component with language and router services.
   */
  constructor(public langService: LanguageService, private router: Router) {}



  /**
   * @method
   * @description Scrolls smoothly to the "My Contact" section.
   * If the current route starts with '/main', scrolls directly.
   * Otherwise, navigates to '/main/mycontact' first, then scrolls.
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

}
