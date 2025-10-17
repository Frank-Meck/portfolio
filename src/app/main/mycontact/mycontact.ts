import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mycontact',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './mycontact.html',
  styleUrls: ['./mycontact.scss']
})
export class Mycontact {
  constructor(public langService: LanguageService) {}

  contact = {
    name: '',
    email: '',
    message: '',
    agb: false
  };

  submitClicked = false;
  sending = false;

  // Success state
  showSuccessModal = false;

  // Error state
  showErrorModal = false;
  errorMessage = ''; // e.g., 'Error sending message.' or detailed server text


  /**
   * Handles the submit button click.
   * Validates the form and sends email request if valid.
   */
  submit() {
    this.submitClicked = true;
    this.showSuccessModal = false;
    this.showErrorModal = false;
    this.errorMessage = '';

    if (this.isFormValid()) {
      this.sendEmailRequest();
    } else {
      console.warn('❌ Form invalid');
    }
  }


  /**
   * Validates the contact form.
   * @returns {boolean} True if all required fields are filled and checkbox is checked.
   */
  private isFormValid(): boolean {
    const { name, email, message, agb } = this.contact;
    return !!(name && email && message && agb);
  }


  /**
   * Sends the contact form data to the server.
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
   * Handles the server response after sending email.
   * @param {any} data Server response data.
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
   * Handles network errors during email sending.
   * @param {any} err Network error object.
   */
  private handleNetworkError(err: any): void {
    this.sending = false;
    this.showError('Network error or server issue. Please try again later.');
    console.error('Network error:', err);
  }


  /**
   * Sets error state and shows the error modal.
   * @param {string} msg Error message to display.
   */
  private showError(msg: string): void {
    this.errorMessage = msg;
    this.showErrorModal = true;
  }


  /**
   * Resets the contact form to initial state.
   */
  private resetForm(): void {
    this.contact = { name: '', email: '', message: '', agb: false };
    this.submitClicked = false;
  }


  /**
   * Closes the success modal.
   */
  closeSuccessModal() {
    this.showSuccessModal = false;
  }


  /**
   * Closes the error modal.
   */
  closeErrorModal() {
    this.showErrorModal = false;
  }
}
