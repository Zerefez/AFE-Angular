import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private temperature = signal<number>(20); // Default temperature of 20 degrees

  // Readonly derived signal for public access
  readonly derivedTemperature = this.temperature.asReadonly();

  setTemperature(temp: number) {
    // Only allow temperatures between 0 and 100 degrees
    if (temp >= 0 && temp <= 100) {
      this.temperature.set(temp);
    }
  }
}
