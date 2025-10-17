import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * @interface
 * @description Represents a skill with a name and an associated image.
 */
interface Skill {
  name: string;
  img: string;
}


/**
 * @component
 * @description Standalone component displaying a list of skills with corresponding icons.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills {

  /**
   * @property
   * @description Array of skills to display, each with a name and icon path.
   */
  skills: Skill[] = [
    { name: 'HTML', img: 'assets/icons/skills/html.png' },
    { name: 'CSS', img: 'assets/icons/skills/css.png' },
    { name: 'JavaScript', img: 'assets/icons/skills/javascript.png' },
    { name: 'TypeScript', img: 'assets/icons/skills/typescript.png' },
    { name: 'Angular', img: 'assets/icons/skills/angular.png' },
    { name: 'Firebase', img: 'assets/icons/skills/firebase.png' },
    { name: 'Git', img: 'assets/icons/skills/git.png' },
    { name: 'REST-API', img: 'assets/icons/skills/rest-api.png' },
    { name: 'Scrum', img: 'assets/icons/skills/scrum.png' },
    { name: 'Material Design', img: 'assets/icons/skills/materialdesign.png' },
    { name: 'Continually Learning', img: 'assets/icons/skills/continually-learning.svg' }
  ];


  /**
   * @property
   * @description Calculated maximum width for skill display based on the longest word.
   */
  maxWidth: string;


  /**
   * @constructor
   * @description Initializes the Skills component and calculates the maxWidth based on the longest skill word.
   */
  constructor() {
    // Längstes einzelnes Wort in allen Skills finden
    const longestWord = this.skills
      .map(skill => skill.name.split(' ')) // split into words
      .flat()
      .reduce((max, word) => 
        word.length > max.length ? word : max, '');

    this.maxWidth = `${longestWord.length * 10 + 20}px`;
  }


  /**
   * @method
   * @description Formats the skill name by replacing spaces with line breaks.
   * @param name - The skill name to format.
   * @returns Formatted skill name with <br> tags.
   */
  formatName(name: string): string {
    return name.replace(/ /g, '<br>'); // replace spaces with line breaks
  }

}
