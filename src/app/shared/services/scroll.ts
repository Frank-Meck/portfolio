import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * ScrollService
 *
 * Handles smooth scrolling between sections and shares scroll state globally
 * across components (Header, Main, MyMain, MySkills, etc.).
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  /** Emits the ID of the last section that was scrolled to */
  private sectionTargetSource = new BehaviorSubject<string>('mymain');
  sectionTarget$ = this.sectionTargetSource.asObservable();

  constructor() {}

  /**
   * Smoothly scrolls to a given section ID.
   * @param id - The ID of the target section.
   * @param offset - Optional pixel offset (for header height, spacing, etc.).
   */
  scrollToSection(id: string, offset: number = 0) {
    const element = document.getElementById(id);
    if (!element) return;

    // Scroll position calculation
    const y = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    // Notify all listeners which section was scrolled to
    this.sectionTargetSource.next(id);
  }

  /**
   * Smoothly scrolls to the top of the page.
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.sectionTargetSource.next('mymain');
  }

  /**
   * Scrolls to the next section in the provided sections array
   * @param sections - Array of section IDs in order
   * @param currentIndex - Current section index
   * @param offset - Optional offset in px
   */
  scrollToNextSection(sections: string[], currentIndex: number, offset: number = 0) {
    if (currentIndex < sections.length - 1) {
      const nextId = sections[currentIndex + 1];
      this.scrollToSection(nextId, offset);
    }
  }
}
