import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCard } from '../../../../shared/models/credit-card.model';
import { CreateTransactionDto, Transaction } from '../../../../shared/models/transaction.model';
import { CreditCardService } from '../../services/credit-card.service';
import { TransactionService } from '../../services/transaction.service';

type SortField = 'date' | 'amount';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions = signal<Transaction[]>([]);
  creditCards = signal<CreditCard[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  showAddForm = signal(false);

  sortField = signal<SortField>('date');
  sortDirection = signal<SortDirection>('desc');
  cardNumberFilter = signal<string>('');

  filterForm: FormGroup;
  addTransactionForm: FormGroup;

  filteredTransactions = computed(() => {
    let transactions = this.transactions();

    const cardFilter = this.cardNumberFilter();
    if (cardFilter) {
      transactions = transactions.filter(t =>
        t.cardNumber.toString().includes(cardFilter)
      );
    }

    const field = this.sortField();
    const direction = this.sortDirection();

    return transactions.sort((a, b) => {
      let comparison = 0;

      if (field === 'date') {
        const dateA = new Date(a.transactionDate);
        const dateB = new Date(b.transactionDate);
        comparison = dateA.getTime() - dateB.getTime();
      } else if (field === 'amount') {
        comparison = a.amount - b.amount;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  });

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

  setupFilters() {
    this.filterForm.get('card_number')?.valueChanges.subscribe(cardNumber => {
      this.cardNumberFilter.set(cardNumber || '');
    });
  }

  loadData() {
    this.loading.set(true);

    Promise.all([
      this.transactionService.getTransactions().toPromise(),
      this.creditCardService.getCreditCards().toPromise()
    ]).then(([transactions, creditCards]) => {
      this.transactions.set(transactions || []);
      this.creditCards.set(creditCards || []);
      this.loading.set(false);
    }).catch(error => {
      this.error.set('Failed to load data');
      this.loading.set(false);
      console.error('Error loading data:', error);
    });
  }


  setSortField(field: SortField) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set(field === 'date' ? 'desc' : 'asc');
    }
  }

  getSortIcon(field: SortField): string {
    if (this.sortField() !== field) return ' ';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
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
