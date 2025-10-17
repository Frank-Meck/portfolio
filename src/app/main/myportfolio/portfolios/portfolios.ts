import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LanguageService } from '../../../shared/services/language.service';


/**
 * @component
 * @description Standalone component to display individual portfolio projects.
 */
@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.html',
  styleUrls: ['./portfolios.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PortfoliosComponent implements OnInit {


  /**
   * @property
   * @description Input property for the current project object.
   */
  @Input() project: any;


  /**
   * @property
   * @description If true, reverses the layout of the project display.
   */
  @Input() reverseLayout = false;


  imageUrl: string = '';
  liveUrl: string = '';
  githubUrl: string = '';


  /**
   * @property
   * @description Static mapping for project images, live URLs, and GitHub URLs.
   */
  projectLinks: any = {
    'Join': {
      imageUrl: '../../../../assets/img/join.webp',
      liveUrl: '',
      githubUrl: ''
    },
    'El Pollo Loco': {
      imageUrl: '../../../../assets/img/elpolloloco.webp',
      liveUrl: 'http://elpolloloco.frank-meckel.de/index.html',
      githubUrl: 'https://github.com/Frank-Meck/El-Pollo-Loco.git'
    },
    'Simple CRM': {
      imageUrl: '../../../../assets/img/SimpleCRM.webp',
      liveUrl: '',
      githubUrl: ''
    },
    'Pokédex': {
      imageUrl: '../../../../assets/img/pokedex.webp',
      liveUrl: 'http://pokedex.frank-meckel.de/index.html',
      githubUrl: 'https://github.com/Frank-Meck/Pokedex.git'
    }
  };


  /**
   * @property
   * @description Static translations for "in progress" labels.
   */
  inProgressText = {
    live: { EN: 'In progress ', DE: 'In Arbeit ' },
    github: { EN: 'In progress ', DE: 'In Arbeit ' }
  };


  /**
   * @constructor
   * @description Injects LanguageService for translation access.
   * @param langService - The language service instance.
   */
  constructor(public langService: LanguageService) { }


  /**
   * @method
   * @description Lifecycle hook that initializes project image, live, and GitHub URLs.
   */
  ngOnInit() {
    const links = this.projectLinks[this.project.title];
    if (links) {
      this.imageUrl = links.imageUrl;
      this.liveUrl = links.liveUrl;
      this.githubUrl = links.githubUrl;
    } else {
      this.imageUrl = '';
      this.liveUrl = '';
      this.githubUrl = '';
    }
  }
}
