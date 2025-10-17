import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../shared/services/language.service';


/**
 * @component
 * @description Standalone component that displays feedback for a team member.
 */
@Component({
  selector: 'app-team-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-feedback.html',
  styleUrls: ['./team-feedback.scss'],
  encapsulation: ViewEncapsulation.None // <-- here added
})
export class TeamFeedbackComponent {

  /**
   * @property
   * @description Input property representing the current team member object.
   */
  @Input() member: any;


  /**
   * @constructor
   * @description Injects the LanguageService for accessing translations.
   * @param langService - The language service.
   */
  constructor(public langService: LanguageService) { }


  /**
   * @method
   * @description Returns the appropriate picture URL for a team member.
   * @param member - The team member object.
   * @returns A string with the URL of the member's picture.
   */
  getMemberPicture(member: any): string {

    if (member.team_picture) return member.team_picture;

    return member.team_gender?.male
      ? 'assets/img/men.jpg'
      : 'assets/img/women.jpg';
  }
}
