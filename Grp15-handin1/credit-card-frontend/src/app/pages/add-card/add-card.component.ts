import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardService } from '../../services/credit-card.service';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss'
})
export class AddCardComponent {
  cardForm: FormGroup;
  submitting = signal(false);
  error = signal<string | null>(null);
  currentYear = new Date().getFullYear();

  issuers = [
    'Visa',
    'Mastercard',
    'Amex',
    'Discover',
    'JCB',
    'China Union Pay',
    'ELO',
    'Hipercard',
    'Argencard',
    'Cabal',
    'Cencosud',
    'Naranja',
    'Nativa',
    'Tarjeta Shopping'
  ];

  constructor(
    private fb: FormBuilder,
    private creditCardService: CreditCardService,
    private router: Router
  ) {
    this.cardForm = this.fb.group({
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{7,16}$/),
        Validators.minLength(7),
        Validators.maxLength(16)
      ]],
      cardHolderName: ['', [Validators.required, Validators.minLength(1)]],
      cscCode: ['', [
        Validators.required,
        Validators.pattern(/^\d{3}$/),
        Validators.minLength(3),
        Validators.maxLength(3)
      ]],
      expirationMonth: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(12)
      ]],
      expirationYear: ['', [
        Validators.required,
        Validators.min(new Date().getFullYear())
      ]],
      issuer: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.submitting.set(true);
      this.error.set(null);

      const formData = {
        ...this.cardForm.value,
        cardNumber: Number(this.cardForm.value.cardNumber),
        cscCode: Number(this.cardForm.value.cscCode),
        expirationMonth: Number(this.cardForm.value.expirationMonth),
        expirationYear: Number(this.cardForm.value.expirationYear)
      };

      this.creditCardService.createCreditCard(formData).subscribe({
        next: () => {
          alert('Credit card added successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.submitting.set(false);
          this.error.set('Failed to add credit card. Please try again.');
          console.error('Error creating card:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.cardForm.controls).forEach(key => {
      const control = this.cardForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.cardForm.get(fieldName);
    if (field && field.touched && field.errors) {
      const displayName = fieldName.replace(/([A-Z])/g, ' $1').toLowerCase();
      if (field.errors['required']) return `${displayName} is required`;
      if (field.errors['pattern']) {
        if (fieldName === 'cardNumber') return 'Card number must contain only digits (7-16 digits)';
        if (fieldName === 'cscCode') return 'CSC code must be exactly 3 digits';
      }
      if (field.errors['minlength']) return `${displayName} is too short`;
      if (field.errors['maxlength']) return `${displayName} is too long`;
      if (field.errors['min']) return `${displayName} value is too low`;
      if (field.errors['max']) return `${displayName} value is too high`;
    }
    return null;
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length > 19) {
      formattedValue = formattedValue.substring(0, 19);
      value = value.substring(0, 16);
    }
    event.target.value = formattedValue;
    // Update the form control with the unformatted value (digits only)
    this.cardForm.get('cardNumber')?.setValue(value, { emitEvent: false });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
