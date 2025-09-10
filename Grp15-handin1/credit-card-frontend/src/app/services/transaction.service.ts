import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTransactionDto, Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly API_URL = 'https://assignment1.swafe.dk/api/Transaction';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL);
  }

  createTransaction(transaction: CreateTransactionDto): Observable<any> {
    return this.http.post(this.API_URL, transaction);
  }

  deleteTransaction(transactionUid: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/uid`, {
      params: { uid: transactionUid }
    });
  }
}
