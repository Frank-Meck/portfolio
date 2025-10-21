import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Mymain } from './mymain/mymain';
import { Myaboutme } from './myaboutme/myaboutme';
import { Myskills } from './myskills/myskills';
import { Myportfolio } from './myportfolio/myportfolio';
import { Mycontact } from './mycontact/mycontact';

/**
 * Main component that handles scrolling and navigation between sections.
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
export class Main implements AfterViewInit {

  /** Array of section IDs in order */
  sections: string[] = ['mymain', 'myaboutme', 'myskills', 'myportfolio', 'mycontact'];

  /** Index of the currently active section */
  currentSectionIndex: number = 0;

  /** Whether the bottom section (mycontact) is at least partially visible */
  isAtBottom: boolean = false;

  constructor() {}


  /**
   * Lifecycle hook called after view initialization.
   * Checks if the bottom section is visible on load.
   */
  ngAfterViewInit() {
    this.checkScrollPosition();
  }


  /**
   * Scrolls to a specific section and updates the currentSectionIndex.
   * @param id The ID of the section to scroll to.
   * @param offset Optional vertical offset.
   */
  scrollToSection(id: string, offset: number = 0) {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Update the currentSectionIndex based on the ID
      const index = this.sections.findIndex(s => id.includes(s));
      if (index !== -1) {
        this.currentSectionIndex = index;
      }
    }
  }


  /**
   * Scrolls to the top of the page.
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentSectionIndex = 0;
  }


  /**
   * Checks the scroll position to determine if the bottom section is visible.
   */
checkScrollPosition() {
  const contactSection = document.getElementById('mycontact');
  if (!contactSection) return;

  const rect = contactSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const scrollCorrection = 500; // stop 300px vorher
  this.isAtBottom = rect.top < windowHeight - scrollCorrection;
}
}
