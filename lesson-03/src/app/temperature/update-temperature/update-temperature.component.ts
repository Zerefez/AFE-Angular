import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-update-temperature',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="temperature-control">
      <h3>Update Temperature</h3>
      <div class="input-group">
        <input type="number"
               [ngModel]="temperature"
               (ngModelChange)="updateTemperature($event)"
               placeholder="Enter temperature (0-100°C)"
               class="temperature-input">
        <span class="unit">°C</span>
      </div>
      <p class="hint">Valid range: 0-100°C</p>
    </div>
  `,
  styles: [`
    .temperature-control {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
    }
    .input-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 15px 0;
    }
    .temperature-input {
      padding: 8px;
      border: 2px solid #c60845;
      border-radius: 4px;
      font-size: 1.1em;
      width: 150px;
    }
    .unit {
      font-size: 1.1em;
      color: #666;
    }
    .hint {
      color: #666;
      font-size: 0.9em;
      margin: 5px 0 0;
    }
    h3 {
      margin: 0;
      color: #333;
    }
  `]
})
export class UpdateTemperatureComponent {
  temperature: number = 20;

  constructor(private messageService: MessageService) {}

  updateTemperature(value: number) {
    this.temperature = value;
    this.messageService.setTemperature(value);
  }
}
