import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from '../../shared/components/modal/modal'; // ✅ Modal import

@Component({
  selector: 'app-mycontact',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, Modal],
  templateUrl: './mycontact.html',
  styleUrls: ['./mycontact.scss']
})
export class Mycontact {

  /** Contact form model */
  contact = {
    name: '',
    email: '',
    message: '',
    agb: false
  };


  /** Flag to track if submit was clicked */
  submitClicked = false;


  /** Flag indicating email is being sent */
  sending = false;


  /** Success modal visibility */
  showSuccessModal = false;


  /** Error modal visibility */
  showErrorModal = false;


  /** Error message for server/network errors */
  errorMessage = '';


  /** Validation modal visibility */
  showValidationModal = false;


  /** Validation message to display */
  validationMessage = '';


  /**
   * Constructor
   * @param langService Language service for translations
   */
  constructor(public langService: LanguageService) { }


  /**
   * Handles form submission
   * @param {NgForm} form The Angular form instance
   */
  submit(form: NgForm) {
    this.submitClicked = true;
    this.showSuccessModal = false;
    this.showErrorModal = false;
    this.showValidationModal = false;
    this.errorMessage = '';
    this.validationMessage = '';

    if (form.valid) {
      this.sendEmailRequest();
    } else {
      this.showValidation(this.langService.t('mycontact.validation_error') || 'Please fill in all required fields correctly.');
     // console.warn('❌ Form invalid');
    }
  }


  /**
   * Sends the contact form data to the server
   */
  private sendEmailRequest(): void {
    this.sending = true;

    fetch('https://www.frank-meckel.de/api/sendmail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.contact)
    })
      .then(res => res.json())
      .then(data => this.handleServerResponse(data))
      .catch(err => this.handleNetworkError(err));
  }


  /**
   * Handles server response after sending email
   * @param {any} data Server response data
   */
  private handleServerResponse(data: any): void {
    this.sending = false;

    if (data && data.status === 'success') {
      this.showSuccessModal = true;
      this.resetForm();
    } else {
      const serverMsg = data && data.message ? data.message : null;
      this.showError(`Error sending message${serverMsg ? ': ' + serverMsg : '.'}`);
      console.error('Server Response:', data);
    }
  }


  /**
   * Handles network errors during email sending
   * @param {any} err Network error object
   */
  private handleNetworkError(err: any): void {
    this.sending = false;
    this.showError('Network error or server issue. Please try again later.');
    console.error('Network error:', err);
  }


  /**
   * Shows error modal
   * @param {string} msg Error message to display
   */
  private showError(msg: string): void {
    this.errorMessage = msg;
    this.showErrorModal = true;
  }


  /**
   * Shows validation modal
   * @param {string} msg Validation message to display
   */
  private showValidation(msg: string): void {
    this.validationMessage = msg;
    this.showValidationModal = true;
  }


  /**
   * Resets the contact form to initial state
   */
  private resetForm(): void {
    this.contact = { name: '', email: '', message: '', agb: false };
    this.submitClicked = false;
  }


  /**
   * Closes the success modal
   */
  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }


  /**
   * Closes the error modal
   */
  closeErrorModal(): void {
    this.showErrorModal = false;
  }


  /**
   * Closes the validation modal
   */
  closeValidationModal(): void {
    this.showValidationModal = false;
  }

}
