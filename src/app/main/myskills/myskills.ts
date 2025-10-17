import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';
import { Skills } from '../../main/myskills/skills/skills'; // Adjust the path as needed
import { NgClass } from '@angular/common'; // <-- important for [ngClass]
import { Router } from '@angular/router';


/**
 * @component
 * @description Component representing the "My Skills" section.
 * Displays skill highlights and handles navigation to the contact section.
 */
@Component({
  selector: 'app-myskills',
  imports: [Skills, NgClass], // standalone Skills component
  templateUrl: './myskills.html',
  styleUrls: ['./myskills.scss']
})
export class Myskills {

  /**
   * @constructor
   * @param langService - Service to manage language selection and translations.
   * @param router - Angular Router service for navigation.
   * @description Initializes the Myskills component with language and router services.
   */
  constructor(public langService: LanguageService, private router: Router) {}



  /**
   * @property
   * @description Text segments for highlighting skills in the UI.
   */
  highlightText = {
    EN: { pre: 'Looking for ', highlight: 'another skill', post: '?' },
    DE: { pre: 'Auf der Suche nach ', highlight: 'weiteren Fähigkeiten', post: '?' }
  };



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
