import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from '../../models/credit-card.model';
import { Transaction } from '../../models/transaction.model';
import { CreditCardService } from '../../services/credit-card.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent implements OnInit {
  creditCard = signal<CreditCard | null>(null);
  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  deleting = signal(false);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private creditCardService: CreditCardService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    const cardNumber = Number(this.route.snapshot.paramMap.get('cardNumber'));
    if (cardNumber) {
      this.loadCardDetails(cardNumber);
      this.loadTransactions(cardNumber);
    }
  }

  loadCardDetails(cardNumber: number) {
    this.loading.set(true);
    this.creditCardService.getCreditCard(cardNumber).subscribe({
      next: (card) => {
        this.creditCard.set(card);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load credit card details');
        this.loading.set(false);
        console.error('Error loading credit card:', error);
      }
    });
  }

  loadTransactions(cardNumber: number) {
    this.transactionService.getTransactions().subscribe({
      next: (allTransactions) => {
        const cardTransactions = allTransactions.filter(t => t.cardNumber === cardNumber);
        this.transactions.set(cardTransactions);
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  onDeleteCard() {
    const card = this.creditCard();
    if (!card) return;

    if (confirm(`Are you sure you want to delete credit card ending in ${card.cardNumber.toString().slice(-4)}?`)) {
      this.deleting.set(true);
      this.creditCardService.deleteCreditCard(card.cardNumber).subscribe({
        next: () => {
          alert('Credit card deleted successfully');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.deleting.set(false);
          alert('Failed to delete credit card');
          console.error('Error deleting card:', error);
        }
      });
    }
  }

  formatCardNumber(cardNumber: number): string {
    const cardStr = cardNumber.toString();
    return cardStr.replace(/(\d{4})(?=\d)/g, '$1 ');
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
