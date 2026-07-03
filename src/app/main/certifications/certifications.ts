import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [],
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.scss']
})
export class Certifications {

  constructor(
    public langService: LanguageService
  ) {}

}