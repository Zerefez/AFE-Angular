import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationDate',
  standalone: true
})
export class ExpirationDatePipe implements PipeTransform {
  transform(month: number, year: number): string {
    if (!month || !year) {
      return 'Invalid Date';
    }

    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const isExpired = year < currentYear || (year === currentYear && month < currentMonth);

    if (isExpired) {
      return `${monthStr}/${yearStr} (Expired)`;
    }

    return `${monthStr}/${yearStr}`;
  }
}
