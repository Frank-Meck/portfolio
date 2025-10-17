import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../shared/services/language.service';
import { PortfoliosComponent } from './portfolios/portfolios';
import { TeamFeedbackComponent } from './team-feedback/team-feedback';


/**
 * @component
 * @description Standalone component displaying portfolio projects and team feedbacks with navigation.
 */
@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.html',
  styleUrls: ['./myportfolio.scss'],
  standalone: true,
  imports: [CommonModule, PortfoliosComponent, TeamFeedbackComponent]
})
export class Myportfolio {


  /**
   * @property
   * @description Array of portfolio projects.
   */
  projects: any[] = [];


  /**
   * @property
   * @description Array of team feedbacks.
   */
  teamFeedbacks: any[] = [];


  /**
   * @property
   * @description Index of the currently displayed team member.
   */
  currentIndex = 0;


  /**
   * @constructor
   * @description Initializes the component and loads projects and team feedbacks from the LanguageService.
   * @param langService - Injected language service for translations.
   */
  constructor(public langService: LanguageService) {
    this.projects = this.langService.t('myportfolio.Projects') as any[];
    this.teamFeedbacks = this.langService.t('myportfolio.TeamFeedBacks') as any[];
  }


  /**
   * @getter
   * @description Returns the currently displayed team member based on currentIndex.
   */
  get currentMember() {
    return this.teamFeedbacks[this.currentIndex];
  }


  /**
   * @method
   * @description Advances to the next team member in the array.
   */
  nextMember() {
    this.currentIndex = (this.currentIndex + 1) % this.teamFeedbacks.length;
  }


  /**
   * @method
   * @description Moves to the previous team member in the array.
   */
  prevMember() {
    this.currentIndex = (this.currentIndex - 1 + this.teamFeedbacks.length) % this.teamFeedbacks.length;
  }
}
