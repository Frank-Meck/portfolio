import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * @class LanguageService
 * @description
 * Service for managing application language (English or German).
 * Provides observables and methods to retrieve translations safely for HTML or plain text.
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  /**
   * @private
   * @property {BehaviorSubject<'EN' | 'DE'>} langSubject
   * BehaviorSubject holding the current language. Defaults to 'EN'.
   */
  private langSubject = new BehaviorSubject<'EN' | 'DE'>('EN');

  /**
   * @property {Observable<'EN' | 'DE'>} lang$
   * Observable that components can subscribe to in order to react to language changes.
   */
  lang$ = this.langSubject.asObservable();


  // Übersetzungen
  private translations: any = {

    //footer//  
    footer: {
      legalNotice: { EN: 'Legal Notice', DE: 'Impressum' },
      privacy: { EN: 'Privacy Policy', DE: 'Datenschutz' },
      contactmail_topic: { EN: 'Email Notice', DE: 'E-Mail-Benachrichtigung' },
      contactmail_text: {
        EN: 'For email, please use the contact form available on this page.',
        DE: 'Für E-Mails verwenden Sie bitte das Kontaktformular auf dieser Seite.'
      }

    },

    //header//  
    header: {
      about: { EN: 'About Me', DE: 'Über mich' },
      skills: { EN: 'Skills', DE: 'Fähigkeiten' },
      portfolio: { EN: 'Portfolio', DE: 'Portfolio' },
      contact: { EN: 'Contact', DE: 'Kontakt' }
    },

    //mymain//
    mymain: {
      Iam: { EN: 'I am', DE: 'Ich bin' },
      job: { EN: 'FRONTEND DEVELOPER', DE: 'FRONTEND ENTWICKLER' },
      button: { EN: "Let's talk", DE: 'Lass uns reden' }
    },

    //myaboutme//
    myaboutme: {
      aboutme: { EN: 'About me', DE: 'Über mich' },
      aboutmeText: {
        EN: `I’m really into IT and love coding because it lets me build things and solve problems. 
             I enjoy learning new languages and tools, and I get inspired by online tutorials, open-source projects, 
             and working with other developers.`,
        DE: `Ich interessiere mich sehr für IT und liebe das Programmieren, weil ich damit Dinge bauen und Probleme lösen kann. 
             Ich lerne gerne neue Sprachen und Tools und lasse mich von Online-Tutorials, Open-Source-Projekten und der Zusammenarbeit 
             mit anderen Entwicklern inspirieren.`
      },
      locationText: {
        EN: `I am currently based in 58540 Meinerzhagen, Germany. I am flexible with different ways of working, including remote work.`,
        DE: `Ich befinde mich derzeit in 58540 Meinerzhagen, Deutschland. Ich bin flexibel, was verschiedene Arbeitsweisen angeht, einschließlich Remote-Arbeit.`
      },
      openMindedText: {
        EN: `I am open-minded and always eager to learn new technologies. I enjoy exploring different tools and frameworks and am committed to 
             continually improving my skills to stay up-to-date in the fast-changing IT world.`,
        DE: `Ich bin aufgeschlossen und immer daran interessiert, neue Technologien zu lernen. Ich erkunde gerne verschiedene Tools und Frameworks und arbeite 
             kontinuierlich daran, meine Fähigkeiten zu verbessern, um in der sich schnell verändernden IT-Welt auf dem neuesten Stand zu bleiben.`
      },
      problemSolvingText: {
        EN: `My problem-solving approach is solution-oriented, shaped by my experience in quality management. I use analytical thinking, creativity, 
             and persistence, learning from every challenge to find the most efficient solutions. Collaboration helps me improve results even further.`,
        DE: `Mein problemlösender Ansatz ist lösungsorientiert, geprägt durch meine Erfahrung im Qualitätsmanagement. Ich nutze analytisches Denken, 
             Kreativität und Ausdauer und lerne aus jeder Herausforderung, um die effizientesten Lösungen zu finden. Zusammenarbeit hilft mir, 
             die Ergebnisse zusätzlich zu verbessern.`
      }
    },

    //myskills//
    myskills: {
      Myskills: { EN: 'My skills', DE: 'Meine Fähigkeiten' },
      MySkillsRow2: {
        EN: `In my portfolio projects, I have applied a wide range of front-end skills—including HTML, CSS,
             JavaScript, TypeScript, Angular, Firebase, Git, REST APIs, Scrum, Material Design, and a commitment
             to continually learning—both independently and in team settings to create responsive and interactive web applications.`,
        DE: `In meinen Portfolio-Projekten habe ich eine Vielzahl von Front-End-Fähigkeiten angewendet, darunter HTML, CSS,
             JavaScript, TypeScript, Angular, Firebase, Git, REST APIs, Scrum, Material Design und das Engagement,
             kontinuierlich zu lernen – sowohl eigenständig als auch im Team, um responsive und interaktive Webanwendungen zu erstellen.`
      },
      MySkillsRow4: {
        EN: `I am passionate about continuously learning new technologies and frameworks. That’s why I attended a training program at the Developer 
             Academy to implement modern, efficient solutions effectively.`,
        DE: `Meine Leidenschaft liegt darin, kontinuierlich neue Technologien und Frameworks zu lernen. 
             Deshalb habe ich an einer Weiterbildung bei der Developer Akademie teilgenommen, um moderne, effiziente Lösungen gezielt umzusetzen.`
      }
    },

    //myportfolio//  
    myportfolio: {
      Portfolio: { EN: 'Portfolio', DE: 'Portfolio' },
      Portfolio_explanation: {
        EN: 'Explore a seletion of my work here . Interact with projects to see my skills in action.',
        DE: 'Entdecken Sie hier eine Auswahl meiner Arbeiten. Interagieren Sie mit Projekten, um meine Fähigkeiten in Aktion zu sehen.'
      },

      Projects: [
        {
          title: 'Join',
          skills: {
            EN: 'Angular | TypeScript | HTML | CSS | Firebase ',
            DE: 'Angular | TypeScript | HTML | CSS | Firebase .'
          },
          description: {
            EN: 'Task manager inspired by the Kanban system. Create and organize tasks using drag and drop functions, assign users and categories.',
            DE: 'Task-Manager inspiriert vom Kanban-System. Erstellen und Organisieren von Aufgaben mit Drag-and-Drop-Funktionen, Zuweisen von Benutzern und Kategorien.'
          },
        },
        {
          title: 'El Pollo Loco',
          skills: { EN: 'JavaScript | HTML | CSS', DE: 'JavaScript | HTML | CSS' },
          description: {
            EN: 'An exciting action game where a Mexican hero collects coins and bottles, avoids obstacles, and fights the final boss to defeat him.',
            DE: 'Ein spannendes Action-Spiel, in dem ein mexikanischer Held Münzen und Flaschen sammelt, Hindernissen ausweicht und am Ende gegen den Endboss kämpft, um ihn zu besiegen.'
          },
        },
        {
          title: 'Simple CRM',
          skills: { EN: 'Angular | Firebase', DE: 'Angular | Firebase' },
          description: {
            EN: 'A very Simple Customer Relationship Management system working with CRUD functionality',
            DE: 'Ein sehr einfaches Customer Relationship Management-System mit CRUD-Funktionalität.'
          },
        },
        {
          title: 'Pokédex',
          skills: { EN: 'JavaScript | HTML | CSS | Api', DE: 'JavaScript | HTML | CSS | Api' },
          description: {
            EN: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
            DE: 'Basierend auf der PokéAPI eine einfache Bibliothek, die Informationen über Pokémon bereitstellt und katalogisiert.'
          },

        }
      ],
      // Teamfeedback separat als eigene Variable
      TeamFeedBacks: [
        {
          title: { EN: 'Team partners', DE: 'Team Partner' },
          team_member: 'Michael Beispiel',
          team_gender: { male: true },
          team_comment: {
            EN: 'This is a sample text; the team feedback can only be added after the group work. Michael really kept the team together with his great organization and clear communication. Everything went smoothly.',
            DE: 'Dies ist ein Beispieltext; das Teamfeedback kann erst nach der Gruppenarbeit eingefügt werden. Michael hat das Team wirklich zusammengehalten mit seiner großartigen Organisation und klaren Kommunikation. Alles lief reibungslos.'
          },
          team_picture: 'assets/img/myIMG-2.webp'
        },
        {
          title: { EN: 'Team partners', DE: 'Team Partner' },
          team_member: 'Frau Musterfrau',
          team_gender: { male: false },
          team_comment: {
            EN: 'This is a placeholder for the team feedback from Ms. Musterfrau. Feedback can only be added after the group work. She helped the team stay organized and contributed to clear communication among all members.',
            DE: 'Hier ist ein Platzhalter für das Teamfeedback von Frau Musterfrau. Feedback kann erst nach der Gruppenarbeit eingefügt werden. Sie hat das Team organisiert unterstützt und für klare Kommunikation unter allen Mitgliedern gesorgt.'
          },
          team_picture: ''
        },
        {
          title: { EN: 'Team partners', DE: 'Team Partner' },
          team_member: 'Mister Mustermann',
          team_gender: { male: true },
          team_comment: {
            EN: 'This is a placeholder for the team feedback from Mr. Mustermann. Feedback can only be added after the group work. He ensured that the team stayed focused and maintained effective collaboration throughout the project.',
            DE: 'Hier ist ein Platzhalter für das Teamfeedback von Herrn Mustermann. Feedback kann erst nach der Gruppenarbeit eingefügt werden. Er sorgte dafür, dass das Team fokussiert blieb und die Zusammenarbeit während des Projekts effektiv verlief.'
          },
          team_picture: ''
        }
      ],
    },

    //mycontact//
    mycontact: {
      header: {
        EN: 'Contact',
        DE: 'Kontakt'
      },
      headline: {
        EN: 'Got a problem to solve?',
        DE: 'Müssen Sie ein Problem lösen?'
      },
      subtext: {
        EN: 'I’d love to hear from you! Whether you’re looking for a dedicated team player or a creative mind for your next project, I’m excited to contribute. Tell me about your ideas or the role you have in mind — I’m confident I can bring value and help turn your vision into reality. Let’s build something great together!',
        DE: 'Ich freue mich darauf, von Ihnen zu hören! Ob Sie einen engagierten Teamplayer oder einen kreativen Kopf für Ihr nächstes Projekt suchen – ich bin bereit, einen wertvollen Beitrag zu leisten. Erzählen Sie mir von Ihren Ideen oder der Rolle, die Sie im Blick haben. Gemeinsam können wir etwas Großartiges schaffen!'
      },
      subtext_prespan: {
        EN: 'Need a frontend developer?',
        DE: 'Benötigen Sie einen Frontend-Entwickler?'
      },
      subtext_span: {
        EN: 'Contact me!',
        DE: 'Kontaktieren Sie mich!'
      },
      placeholder_name: {
        EN: 'Your name',
        DE: 'Ihr Name'
      },
      placeholder_name_error: {
        EN: 'Your name is required',
        DE: 'Ihr Name ist erforderlich'
      },
      placeholder_email: {
        EN: 'Your email',
        DE: 'Ihre E-Mail'
      },
      placeholder_email_error: {
        EN: 'Your email is required',
        DE: 'Ihre E-Mail-Adresse ist erforderlich'
      },
      placeholder_message: {
        EN: 'Your message',
        DE: 'Ihre Nachricht'
      },
      placeholder_message_error: {
        EN: 'Your message is empty',
        DE: 'Ihre Nachricht ist leer'
      },
      check_text: {
        EN: ' I`ve read the',
        DE: 'Ich stimme der '
      },
      check_textspan: {
        EN: 'privacy policy',
        DE: 'Datenschutzerklärung'
      },
      check_text_afterspan: {
        EN: 'and agree to the processing of my data as outlined.',
        DE: 'zu.'
      },
      check_textspan_error: {
        EN: 'Please accept the privacy policy',
        DE: 'Bitte akzeptieren Sie die Datenschutzbestimmungen'
      },
      button: {
        EN: "Send message :)",
        DE: 'Nachricht senden :)'
      },
      button_success_title: {
        EN: "Sent successfully!",
        DE: 'Erfolgreich gesendet!'
      },
      button_success: {
        EN: "Your message has been successfully sent.",
        DE: 'Ihre Nachricht wurde erfolgreich verschickt.'
      },
      message_validation_topic: {
        EN: "Validation Error",
        DE: 'Validierungsfehler'
      },
      message_validation_text: {
        EN: "Please fill in all required fields correctly.",
        DE: 'Bitte füllen Sie alle Pflichtfelder korrekt aus.'
      },

    },

    // Impressum //
    impressum: {
      Title: { EN: 'Legal Notice', DE: 'Rechtlicher Hinweis' },
      ImprintTitle: { EN: 'Imprint', DE: 'Impressum' },
      StudentNames: { EN: 'Frank Meckel', DE: 'Frank Meckel' },
      Address: { EN: 'Im Brannten 42', DE: 'Im Brannten 42' },
      PostcodeCity: { EN: '58540 Meinerzhagen', DE: '58540 Meinerzhagen' },

      ExploringBoardTitle: { EN: `Exploring the Board`, DE: `Erkundung des Board` },
      ExploringBoard: { EN: `Email: [kontakt@frank-meckel.de]`, DE: `Email: [kontakt@frank-meckel.de]` },

      AcceptanceOfTermsTitle: { EN: 'Acceptance of terms', DE: 'Annahme der Bedingungen' },
      AcceptanceOfTerms: {
        EN: `By accessing and using <span class="highlighted_text">Portfolio</span> (Product), you acknowledge and agree to the following terms and conditions, 
         and any policies, guidelines, or amendments thereto that may be presented to you from time to time. 
         We, the listed students, may update or change the terms and conditions from time to time without notice.`,
        DE: `Durch den Zugriff und die Nutzung von <span class="highlighted_text">Portfolio</span> (Produkt) erkennen Sie die folgenden Bedingungen und Richtlinien an. 
         Wir, die aufgeführten Studenten, können die Bedingungen jederzeit ohne Vorankündigung ändern.`
      },

      ScopeAndOwnershipTitle: { EN: 'Scope and ownership of the product', DE: 'Umfang und Eigentum des Produkts' },
      ScopeAndOwnership: {
        EN: `<span class="highlighted_text">Portfolio</span> has been developed as part of a student group project in a web development bootcamp at the
     <span class="highlighted_text">Developer</span>
     <span class="highlighted_text">Academy</span>
     <span class="highlighted_text">Ltd.</span>.
     It has an educational purpose and is not intended for extensive personal & business usage.
     As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product.
     The design of <span class="highlighted_text">Portfolio</span> is owned by
     <span class="highlighted_text">Developer</span>
     <span class="highlighted_text">Academy</span>
     <span class="highlighted_text">Ltd.</span>. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.`,
        DE: `<span class="highlighted_text">Portfolio</span> wurde im Rahmen eines Studentenprojekts im Webentwicklungs-Bootcamp der
     <span class="highlighted_text">Developer</span>
     <span class="highlighted_text">Akademie</span>
     <span class="highlighted_text">GmbH</span> entwickelt.
     Es hat einen Bildungszweck und ist nicht für umfangreiche persönliche oder geschäftliche Nutzung gedacht.
     Daher können wir keine durchgängige Verfügbarkeit, Zuverlässigkeit, Genauigkeit oder sonstige Qualitätsaspekte garantieren.
     Das Design von <span class="highlighted_text">Portfolio</span> gehört der
     <span class="highlighted_text">Developer</span>
     <span class="highlighted_text">Akademie</span>
     <span class="highlighted_text">GmbH</span>. Unbefugte Nutzung, Vervielfältigung, Veränderung oder Verbreitung ist strengstens verboten.`
      },


      ProprietaryRightsTitle: { EN: 'Proprietary rights', DE: 'Eigentumsrechte' },
      ProprietaryRights: {
        EN: `Aside from the design owned by
     <span class="highlighted_text">Developer</span>
     <span class="highlighted_text">Academy</span>
     <span class="highlighted_text">Ltd.</span>, we, the listed students, retain all proprietary rights in <span class="highlighted_text">Portfolio</span>,
     including any associated copyrighted material, trademarks, and other proprietary information.`,
        DE: `Abgesehen vom Design der
     <span class="highlighted_text">Developer</span>
     <span class="highlighted_text">Akademie</span>
     <span class="highlighted_text">GmbH</span> behalten wir, die aufgeführten Studenten, alle Rechte an <span class="highlighted_text">Portfolio</span>,
     einschließlich urheberrechtlich geschützter Materialien, Marken und weiterer proprietärer Informationen.`
      },

      UseOfProductTitle: { EN: 'Use of the product', DE: 'Nutzung des Produkts' },
      UseOfProduct: {
        EN: `By accessing and using <span class="highlighted_text">Portfolio</span> (Product), you acknowledge and agree to the following terms and conditions, 
         and any policies, guidelines, or amendments thereto that may be presented to you from time to time. 
         We, the listed students, may update or change the terms and conditions from time to time without notice.`,
        DE: `Durch den Zugriff und die Nutzung von <span class="highlighted_text">Portfolio</span> (Produkt) erkennen Sie die folgenden Bedingungen und Richtlinien an. 
         Wir, die aufgeführten Studenten, können die Bedingungen jederzeit ohne Vorankündigung ändern.`
      },

      DisclaimerTitle: { EN: 'Disclaimer of warranties and limitation of liability', DE: 'Haftungsausschluss und Beschränkung der Haftung' },
      Disclaimer: {
        EN: `<span class="highlighted_text">Portfolio</span> is provided "as is" without warranty of any kind, whether express or implied, including but not limited to, 
         the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. 
         In no event will we, the listed students, or the 
         <span class="highlighted_text">Developer</span> 
         <span class="highlighted_text">Academy</span>, be liable for any direct, indirect, incidental, special, consequential or exemplary damages.`,
        DE: `<span class="highlighted_text">Portfolio</span> wird "wie besehen" bereitgestellt, ohne jegliche ausdrückliche oder stillschweigende Gewährleistung, 
         einschließlich, aber nicht beschränkt auf Gewährleistungen der Marktgängigkeit, Eignung für einen bestimmten Zweck und Nichtverletzung. 
         Wir, die aufgeführten Studenten, oder die 
         <span class="highlighted_text">Developer</span> 
         <span class="highlighted_text">Akademie</span> haften in keinem Fall für direkte, indirekte, zufällige, besondere, Folgeschäden oder Musterbeispiele von Schäden.`
      },

      IndemnityTitle: { EN: 'Indemnity', DE: 'Entschädigung' },
      Indemnity: {
        EN: `You agree to indemnify, defend and hold harmless us, the listed students, the 
         <span class="highlighted_text">Developer</span> 
         <span class="highlighted_text">Academy</span>, and our affiliates, 
         partners, officers, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability.`,
        DE: `Sie erklären sich damit einverstanden, uns, die aufgeführten Studenten, die 
         <span class="highlighted_text">Developer</span> 
         <span class="highlighted_text">Akademie</span> und unsere Partner, Führungskräfte, Mitarbeiter und Agenten 
         frei von jeglichen Ansprüchen, Forderungen, Verlusten, Schäden, Kosten oder Haftungen zu halten.`
      },

      Contact: {
        EN: `For any questions or notices, please contact us at [kontakt@frank-meckel.de].`,
        DE: `Bei Fragen oder Mitteilungen kontaktieren Sie uns bitte unter [kontakt@frank-meckel.de].`
      },
      Date: { EN: `Date: July 26, 2025`, DE: `Datum: 26. Juli 2025` },
      footer: { EN: `Back to home page`, DE: `Zurück zur Startseite` }
    }
  };

  /**
   * @class LanguageService
   * @description
   * Service to manage the current language and provide translations
   * for both plain text and HTML content.
   */

  /**
   * @constructor
   * @param {DomSanitizer} sanitizer Angular's DomSanitizer to safely render HTML translations.
   */
  constructor(private sanitizer: DomSanitizer) { }

  /**
   * @getter
   * @returns {'EN' | 'DE'} The currently selected language.
   */
  get currentLang(): 'EN' | 'DE' {
    return this.langSubject.value;
  }

  /**
   * @method
   * @param {'EN' | 'DE'} lang The language to set as the current language.
   * @description Updates the current language and notifies all subscribers.
   */
  setLang(lang: 'EN' | 'DE') {
    this.langSubject.next(lang);
  }

  /**
   * @method
   * @param {string} path Dot-separated path to the translation key (e.g., "footer.privacy").
   * @returns {any} The translation for the current language, or null if not found.
   * @description Retrieves a plain text translation from the translations object.
   */
  t(path: string): any {
    const value = path.split('.').reduce((o, i) => o?.[i], this.translations);
    if (!value) return null;
    return value[this.currentLang] ?? value;
  }

  /**
   * @method
   * @param {string} path Dot-separated path to the translation key.
   * @returns {SafeHtml} The translation as sanitized HTML, safe for binding in templates.
   * @description Retrieves translations that include HTML elements like <span> or <br> and sanitizes them.
   */
  tHtml(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.t(path));
  }
}
