import { Component } from '@angular/core';
import { ColdObservableComponent } from './cold-observable/cold-observable.component';
import { HotObservableComponent } from './hot-observable/hot-observable.component';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [ColdObservableComponent, HotObservableComponent],
  template: `
    <div class="rxjs-container">
      <h2>RxJS Observables Demo</h2>
      <div class="observables-section">
        <app-cold-observable></app-cold-observable>
        <app-hot-observable></app-hot-observable>
      </div>
    </div>
  `,
  styles: [`
    .rxjs-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .observables-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class RxjsComponent {}
