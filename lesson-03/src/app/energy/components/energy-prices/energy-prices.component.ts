import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnergyService } from '../../services/energy.service';
import { EnergyStore } from '../../store/energy.store';
@Component({
  selector: 'app-energy-prices',
  standalone: true,
  imports: [FormsModule, DatePipe, DecimalPipe],
  template: `
    <div class="energy-prices">
      <h2>Energy Spot Prices</h2>

      <div class="price-area-selector">
        <label for="priceArea">Select Price Area:</label>
        <select id="priceArea"
                [ngModel]="selectedPriceArea()"
                (ngModelChange)="onPriceAreaChange($event)">
          <option value="DE">Germany (DE)</option>
          <option value="DK1">Denmark West (DK1)</option>
          <option value="DK2">Denmark East (DK2)</option>
          <option value="NO2">Norway (NO2)</option>
          <option value="SE3">Sweden Central (SE3)</option>
          <option value="SE4">Sweden South (SE4)</option>
        </select>
      </div>

      <div class="prices-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Hour (DK)</th>
              <th>DKK/MWh</th>
              <th>EUR/MWh</th>
            </tr>
          </thead>
          <tbody>
            @for (price of getEntities(); track price.HourUTC) {
              <tr>
                <td>{{ price.HourDK | date:'dd MMM yyyy' }}</td>
                <td>{{ price.HourDK | date:'HH:mm' }}</td>
                <td [class.negative]="price.SpotPriceDKK < 0">{{ price.SpotPriceDKK | number:'1.2-2' }}</td>
                <td [class.negative]="price.SpotPriceEUR < 0">{{ price.SpotPriceEUR | number:'1.2-2' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .energy-prices {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 30px;
    }
    .price-area-selector {
      margin: 20px 0;
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
    }
    label {
      font-weight: 500;
      color: #2c3e50;
    }
    select {
      margin-left: 10px;
      padding: 8px 12px;
      font-size: 1em;
      border: 2px solid #ddd;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;
    }
    select:focus {
      border-color: #c60845;
      outline: none;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 12px 15px;
      text-align: right;
    }
    th:first-child, td:first-child {
      text-align: left;
    }
    th {
      background-color: #c60845;
      color: white;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 0.9em;
      letter-spacing: 0.5px;
    }
    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    tr:hover {
      background-color: #f1f3f5;
    }
    .negative {
      color: #dc3545;
    }
  `]
})
export class EnergyPricesComponent implements OnInit {
  selectedPriceArea = signal('DK1');

  private energyService = inject(EnergyService);
  protected energyStore = inject(EnergyStore) as any;

  ngOnInit() {
    this.energyService.loadMockData();
  }

  onPriceAreaChange(area: string) {
    this.selectedPriceArea.set(area);
  }

  getEntities(): any[] {
    const allPrices = this.energyStore.prices() || [];
    console.log('All prices:', allPrices);
    console.log('Selected area:', this.selectedPriceArea());
    const filtered = allPrices.filter((price: any) => price.PriceArea === this.selectedPriceArea());
    console.log('Filtered prices:', filtered);
    return filtered;
  }
}
