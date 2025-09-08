import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map } from 'rxjs';

interface Coordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-hot-observable',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <div class="hot-observable" #container>
      <h3>Hot Observable - Mouse Coordinates</h3>
      <p>Move your mouse in this area to see coordinates update:</p>
      <div class="coordinates-display">
        {{ coordinates$ | async | json }}
      </div>
    </div>
  `,
  styles: [`
    .hot-observable {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    .coordinates-display {
      font-family: monospace;
      font-size: 1.2em;
      color: #c60845;
      margin: 15px 0;
      font-weight: bold;
    }
    h3 {
      margin: 0 0 15px;
      color: #333;
    }
  `]
})
export class HotObservableComponent implements OnInit, OnDestroy {
  coordinates$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    map(event => {
      const coords: Coordinates = {
        x: event.clientX,
        y: event.clientY
      };
      console.log('Mouse coordinates:', coords);
      return coords;
    })
  );

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
