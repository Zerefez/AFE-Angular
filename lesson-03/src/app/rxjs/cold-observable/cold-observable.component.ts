import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { from } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-cold-observable',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="cold-observable">
      <h3>Cold Observable</h3>
      <p>First 3 uneven numbers multiplied by 25:</p>
      <div class="result">
        Result: {{ result$ | async }}
      </div>
    </div>
  `,
  styles: [`
    .cold-observable {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    .result {
      font-size: 1.2em;
      color: #c60845;
      margin-top: 10px;
      font-weight: bold;
    }
    h3 {
      margin: 0 0 15px;
      color: #333;
    }
  `]
})
export class ColdObservableComponent {
  // Create observable of numbers 1-10
  private numbers$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // Create result observable with transformation
  result$ = this.numbers$.pipe(
    filter(num => num % 2 !== 0), // Get uneven numbers
    map(num => num * 25), // Multiply by 25
    take(3), // Take first 3
    map(num => {
      console.log('Cold Observable value:', num);
      return num;
    })
  );
}
