import { Component, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedModule } from '../shared/shared.module';
import { Mymain } from './mymain/mymain';
import { Myaboutme } from './myaboutme/myaboutme';
import { Myskills } from './myskills/myskills';
import { Myportfolio } from './myportfolio/myportfolio';
import { Mycontact } from './mycontact/mycontact';
import { ScrollService } from '../shared/services/scroll';

/**
 * Main component that manages section visibility, scroll position,
 * and the up/down arrow logic.
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
export class Main implements AfterViewInit, OnDestroy {

  /** Ordered list of main section IDs */
  sections: string[] = ['mymain', 'myaboutme', 'myskills', 'myportfolio', 'mycontact'];

  /** Tracks the index of the currently active section */
  currentSectionIndex: number = 0;

  /** Indicates if the contact section is visible or has been triggered */
  isAtBottom: boolean = false;

  /** Subscription for section change events */
  private sectionSub!: Subscription;

  constructor(private scrollService: ScrollService) {}

  /**
   * After the view initializes, we check the current scroll position
   * and subscribe to global section scroll events.
   */
  ngAfterViewInit() {
    this.checkScrollPosition();

    // Subscribe to ScrollService section changes
    this.sectionSub = this.scrollService.sectionTarget$.subscribe(id => {
      const index = this.sections.findIndex(s => id.includes(s));
      if (index !== -1) {
        this.currentSectionIndex = index;
      }

      // Wenn irgendein Element von "mycontact" angesprungen wurde → ArrowUp anzeigen
      if (id.includes('mycontact')) {
        this.isAtBottom = true;
      } else {
        // Sonst dynamisch prüfen
        this.checkScrollPosition();
      }
    });
  }

  /**
   * Cleans up subscriptions to avoid memory leaks.
   */
  ngOnDestroy() {
    if (this.sectionSub) this.sectionSub.unsubscribe();
  }

  /**
   * Listens to global window scroll events
   * and checks whether the contact section is visible.
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  /**
   * Scrolls smoothly to a specific section using the shared ScrollService.
   * @param id - The section ID to scroll to.
   * @param offset - Optional offset in pixels (e.g. for header height).
   */
  scrollToSection(id: string, offset: number = 0) {
    this.scrollService.scrollToSection(id, offset);
  }

  /**
   * Scrolls smoothly back to the top using the shared ScrollService.
   */
  scrollToTop() {
    this.scrollService.scrollToTop();
  }

  /**
   * Determines whether the contact section is visible
   * and updates `isAtBottom` accordingly.
   */
  checkScrollPosition() {
    const contactSection = document.getElementById('mycontact');
    if (!contactSection) return;

    const rect = contactSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    const visibleRatio = visibleHeight / rect.height;

    // Mark as "bottom" if at least 50% of the contact section is visible
    this.isAtBottom = visibleRatio >= 0.5;
  }
}
