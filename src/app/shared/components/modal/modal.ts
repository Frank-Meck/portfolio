import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- needed for *ngIf

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  imports: [CommonModule] // <-- include CommonModule for structural directives
})
export class Modal {
  /** Flag indicating if the modal is an error modal */
  @Input() isError = false;

  /** Determines if the modal is visible */
  @Input() show = false;


  /** Title text to display in the modal */
  @Input() title = '';


  /** Message text to display in the modal */
  @Input() message = '';


  /** Event emitted when the modal is closed */
  @Output() close = new EventEmitter<void>();


  /**
   * Closes the modal.
   * Emits the `close` event to inform parent components.
   */
  closeModal(): void {
    this.close.emit();
  }

}
