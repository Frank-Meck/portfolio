import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';
import { Skills } from '../../main/myskills/skills/skills'; // standalone component
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll';

/**
 * @component
 * @description Component representing the "My Skills" section.
 * Displays skill highlights and handles navigation to the contact section.
 * Uses ScrollService to centralize scroll behavior.
 */
@Component({
  selector: 'app-myskills',
  imports: [Skills, NgClass],
  templateUrl: './myskills.html',
  styleUrls: ['./myskills.scss']
})
export class Myskills {

  /**
   * @constructor
   * @param langService - Service to manage language selection and translations.
   * @param router - Angular Router service for navigation.
   * @param scrollService - Service to handle scrolling and notify Main component.
   */
  constructor(
    public langService: LanguageService,
    private router: Router,
    private scrollService: ScrollService
  ) {}



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
   * @description Scrolls smoothly to the "My Contact" section using ScrollService.
   * Works from any route: navigates to /main if needed, then scrolls.
   */
  scrollToMyContact() {
    const scrollAction = () => this.scrollService.scrollToSection('mycontact_topic', -100);

    if (this.router.url.startsWith('/main')) {
      scrollAction();
    } else {
      this.router.navigate(['/main']).then(() => setTimeout(() => scrollAction(), 50));
    }
  }
}
