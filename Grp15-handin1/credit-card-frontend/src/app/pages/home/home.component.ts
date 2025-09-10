import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreditCardService } from '../../services/credit-card.service';
import { CreditCard } from '../../models/credit-card.model';
import { ExpirationDatePipe } from '../../pipes/expiration-date.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ExpirationDatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  creditCards = signal<CreditCard[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private creditCardService: CreditCardService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadCreditCards();
  }

  loadCreditCards() {
    this.loading.set(true);
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        this.creditCards.set(cards);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load credit cards');
        this.loading.set(false);
        console.error('Error loading credit cards:', error);
      }
    });
  }

  onCardClick(cardNumber: number) {
    this.router.navigate(['/card-details', cardNumber]);
  }
}
