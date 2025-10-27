import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../shared/services/scroll';

// Sections importieren
import { Mymain } from './mymain/mymain';
import { Myaboutme } from './myaboutme/myaboutme';
import { Myskills } from './myskills/myskills';
import { Myportfolio } from './myportfolio/myportfolio';
import { Mycontact } from './mycontact/mycontact';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, Mymain, Myaboutme, Myskills, Myportfolio, Mycontact],
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Main implements AfterViewInit {

  /** DOM-Container IDs der Sections */
  sections: string[] = ['mymain', 'myaboutme', 'myskills', 'myportfolio', 'mycontact_topic'];

  /** Ziel-IDs für Scroll (kann von Container-IDs abweichen) */
  scrollTargets: string[] = ['mymain', 'myaboutme-topic', 'myskills-section', 'myportfolio-section', 'mycontact_topic'];

  /** Index der aktuell sichtbaren Section */
  currentSectionIndex: number = 0;

  /** Steuerung der Pfeile */
  showArrowUp: boolean = false;   
  showArrowDown: boolean = true;  

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit() {
    // Initial die aktuelle Section bestimmen
    setTimeout(() => this.updateCurrentSection(), 50);
  }

  /** Prüft, welche Section aktuell am nächsten am oberen Viewport-Rand ist */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateCurrentSection();
  }

  private updateCurrentSection() {
    let closestIndex = 0;
    let minDistance = Infinity;

    this.sections.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const distance = Math.abs(rect.top); 

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    this.currentSectionIndex = closestIndex;
    this.updateArrows();


  }

  /** Scrollt zur nächsten Section */
  scrollToNextSection() {
    if (this.currentSectionIndex < this.scrollTargets.length - 1) {
      const nextId = this.scrollTargets[this.currentSectionIndex + 1];
      this.scrollService.scrollToSection(nextId, 50);
    } else {
     }
  }

  /** Scrollt nach oben zur ersten Section */
  scrollToPreviousSection() {
    this.scrollService.scrollToTop();
  }

  /** Aktualisiert die Sichtbarkeit der Pfeile */
  private updateArrows() {
    // Arrow Up nur sichtbar, wenn die letzte Section (mycontact_topic) sichtbar ist
    this.showArrowUp = this.sections[this.currentSectionIndex] === 'mycontact_topic';

    // Arrow Down nur sichtbar, wenn nicht letzte Section und auf Desktop
    const isMobile = window.innerWidth <= 768;
    this.showArrowDown = !this.showArrowUp && !isMobile;
  }
}
