import { Component } from '@angular/core';
import { ShowTemperatureComponent } from './show-temperature/show-temperature.component';
import { UpdateTemperatureComponent } from './update-temperature/update-temperature.component';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [ShowTemperatureComponent, UpdateTemperatureComponent],
  template: `
    <div class="temperature-container">
      <h2>Temperature Management</h2>
      <app-show-temperature></app-show-temperature>
      <app-update-temperature></app-update-temperature>
    </div>
  `,
  styles: [`
    .temperature-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class TemperatureComponent {}
