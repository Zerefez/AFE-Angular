import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-show-temperature',
  standalone: true,
  template: `
    <div class="temperature-display">
      <h3>Current Temperature</h3>
      <div class="temperature">
        {{ messageService.derivedTemperature() }}°C
      </div>
    </div>
  `,
  styles: [`
    .temperature-display {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
    }
    .temperature {
      font-size: 2em;
      color: #c60845;
      font-weight: bold;
      margin-top: 10px;
    }
    h3 {
      margin: 0;
      color: #333;
    }
  `]
})
export class ShowTemperatureComponent {
  constructor(public messageService: MessageService) {}
}
