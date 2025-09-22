import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCard } from '../../../../shared/models/credit-card.model';
import { CreateTransactionDto, Transaction } from '../../../../shared/models/transaction.model';
import { CreditCardService } from '../../services/credit-card.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions = signal<Transaction[]>([]);
  filteredTransactions = signal<Transaction[]>([]);
  creditCards = signal<CreditCard[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  showAddForm = signal(false);

  filterForm: FormGroup;
  addTransactionForm: FormGroup;

  currencies = ['USD', 'EUR', 'GBP', 'DKK', 'SEK', 'NOK'];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private creditCardService: CreditCardService
  ) {
    this.filterForm = this.fb.group({
      card_number: ['']
    });

    this.addTransactionForm = this.fb.group({
      credit_card: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      currency: ['USD', [Validators.required, Validators.minLength(1)]],
      comment: [''],
      date: [new Date().toISOString().split('T')[0], [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadData();
    this.setupFilters();
  }

  loadData() {
    this.loading.set(true);

    Promise.all([
      this.transactionService.getTransactions().toPromise(),
      this.creditCardService.getCreditCards().toPromise()
    ]).then(([transactions, creditCards]) => {
      this.transactions.set(transactions || []);
      this.filteredTransactions.set(transactions || []);
      this.creditCards.set(creditCards || []);
      this.loading.set(false);
    }).catch(error => {
      this.error.set('Failed to load data');
      this.loading.set(false);
      console.error('Error loading data:', error);
    });
  }

  setupFilters() {
    this.filterForm.get('card_number')?.valueChanges.subscribe(cardNumber => {
      this.applyFilter(cardNumber);
    });
  }

  applyFilter(cardNumber: string) {
    const allTransactions = this.transactions();
    if (!cardNumber) {
      this.filteredTransactions.set(allTransactions);
    } else {
      const filtered = allTransactions.filter(t =>
        t.cardNumber.toString().includes(cardNumber)
      );
      this.filteredTransactions.set(filtered);
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.addTransactionForm.get(fieldName);
    if (field && field.touched && field.errors) {
      const displayName = fieldName.replace(/([A-Z])/g, ' $1').toLowerCase();
      if (field.errors['required']) return `${displayName} is required`;
      if (field.errors['min']) {
        if (fieldName === 'amount') return 'Amount must be greater than 0';
      }
      if (field.errors['minlength']) return `${displayName} is too short`;
    }
    return null;
  }

  onAddTransaction() {
    if (this.addTransactionForm.valid) {
      const formData = this.addTransactionForm.value;
      const selectedCard = this.creditCards().find(c => c.cardNumber === Number(formData.credit_card));

      if (!selectedCard) {
        alert('Please select a valid credit card');
        return;
      }

      const transaction: CreateTransactionDto = {
        cardNumber: selectedCard.cardNumber,
        amount: Number(formData.amount),
        currencyCode: formData.currency,
        comment: formData.comment,
        transactionDate: new Date(formData.date).toISOString()
      };

      this.transactionService.createTransaction(transaction).subscribe({
        next: () => {
          alert('Transaction added successfully!');
          this.showAddForm.set(false);
          this.addTransactionForm.reset({
            credit_card: '',
            amount: '',
            currency: 'USD',
            comment: '',
            date: new Date().toISOString().split('T')[0]
          });
          this.loadData();
        },
        error: (error) => {
          alert('Failed to add transaction');
          console.error('Error adding transaction:', error);
        }
      });
    }
  }

  onDeleteTransaction(transactionUid: string | undefined) {
    if (!transactionUid) return;

    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transactionUid).subscribe({
        next: () => {
          alert('Transaction deleted successfully!');
          this.loadData();
        },
        error: (error) => {
          alert('Failed to delete transaction');
          console.error('Error deleting transaction:', error);
        }
      });
    }
  }

  formatCardNumber(cardNumber: number): string {
    const cardStr = cardNumber.toString();
    return '**** **** **** ' + cardStr.slice(-4);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
}
