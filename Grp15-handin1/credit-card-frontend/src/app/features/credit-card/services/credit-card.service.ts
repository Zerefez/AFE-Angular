import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../../../shared/models/credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private readonly API_URL = 'https://assignment1.swafe.dk/api/CreditCard';

  constructor(private http: HttpClient) {}

  getCreditCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.API_URL);
  }

  getCreditCard(cardNumber: number): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.API_URL}/cardnumber`, {
      params: { cardnumber: cardNumber.toString() }
    });
  }

  createCreditCard(card: CreditCard): Observable<any> {
    return this.http.post(this.API_URL, card);
  }

  deleteCreditCard(cardNumber: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/cardnumber`, {
      params: { cardnumber: cardNumber.toString() }
    });
  }
}
