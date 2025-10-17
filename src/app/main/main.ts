import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Mymain } from './mymain/mymain';
import { Myaboutme } from './myaboutme/myaboutme'; 
import { Myskills } from './myskills/myskills';
import { Myportfolio } from './myportfolio/myportfolio';
import { Mycontact } from './mycontact/mycontact';


/**
 * @component
 * @description The main container component for the portfolio application.
 * It includes sections like Mymain, Myaboutme, Myskills, Myportfolio, and Mycontact.
 */
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    Mymain,
    Myaboutme,
    Myskills,
    Myportfolio,
    Mycontact
  ],
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Main {


  /**
   * @constructor
   * @description Initializes the Main component.
   */
  constructor() {}


  // Example for future methods:
  /**
   * @method
   * @description Example placeholder method. Replace or remove when adding actual functionality.
   */
  exampleMethod() {
    console.log('This is an example method.');
  }
}
