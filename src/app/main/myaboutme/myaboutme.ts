import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';


/**
 * @component
 * @description Component representing the "About Me" section of the portfolio.
 * Provides content related to personal introduction and background.
 */
@Component({
  selector: 'app-myaboutme',
  imports: [],
  templateUrl: './myaboutme.html',
  styleUrl: './myaboutme.scss'
})
export class Myaboutme {

  /**
   * @constructor
   * @param langService - Service to handle language selection and translations.
   * @description Initializes the Myaboutme component with the language service.
   */
  constructor(public langService: LanguageService) {}



  // Example for future methods:
  /**
   * @method
   * @description Placeholder method for future functionality in the "About Me" component.
   */
  exampleMethod() {
    console.log('This is an example method.');
  }

}
