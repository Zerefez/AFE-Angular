import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCard } from '../../../../shared/models/credit-card.model';
import { ExpirationDatePipe } from '../../../../shared/pipes/expiration-date.pipe';
import { CreditCardService } from '../../services/credit-card.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ExpirationDatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly creditCardService = inject(CreditCardService);
  protected readonly router = inject(Router);

  creditCards = signal<CreditCard[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

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
