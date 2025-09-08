import { Injectable, inject } from '@angular/core';
import { HourlyPrice } from '../models/hourly-price.model';
import { EnergyStore } from '../store/energy.store';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {
  private energyStore = inject(EnergyStore);
  private mockData = `[
    {"HourUTC":"2025-09-09T21:00:00","HourDK":"2025-09-09T23:00:00","PriceArea":"DE","SpotPriceDKK":815.902662,"SpotPriceEUR":109.300003},
    {"HourUTC":"2025-09-09T21:00:00","HourDK":"2025-09-09T23:00:00","PriceArea":"DK1","SpotPriceDKK":791.268800,"SpotPriceEUR":106.000000},
    {"HourUTC":"2025-09-09T21:00:00","HourDK":"2025-09-09T23:00:00","PriceArea":"DK2","SpotPriceDKK":790.447665,"SpotPriceEUR":105.889999},
    {"HourUTC":"2025-09-09T21:00:00","HourDK":"2025-09-09T23:00:00","PriceArea":"NO2","SpotPriceDKK":511.637399,"SpotPriceEUR":68.540001},
    {"HourUTC":"2025-09-09T21:00:00","HourDK":"2025-09-09T23:00:00","PriceArea":"SE3","SpotPriceDKK":344.276569,"SpotPriceEUR":46.119999},
    {"HourUTC":"2025-09-09T21:00:00","HourDK":"2025-09-09T23:00:00","PriceArea":"SE4","SpotPriceDKK":548.737463,"SpotPriceEUR":73.510002},
    {"HourUTC":"2025-09-09T20:00:00","HourDK":"2025-09-09T22:00:00","PriceArea":"DE","SpotPriceDKK":864.349199,"SpotPriceEUR":115.790001},
    {"HourUTC":"2025-09-09T20:00:00","HourDK":"2025-09-09T22:00:00","PriceArea":"DK1","SpotPriceDKK":848.822401,"SpotPriceEUR":113.709999},
    {"HourUTC":"2025-09-09T20:00:00","HourDK":"2025-09-09T22:00:00","PriceArea":"DK2","SpotPriceDKK":847.926602,"SpotPriceEUR":113.589996},
    {"HourUTC":"2025-09-09T20:00:00","HourDK":"2025-09-09T22:00:00","PriceArea":"NO2","SpotPriceDKK":555.231802,"SpotPriceEUR":74.379997}
  ]`;

  loadMockData() {
    const data = JSON.parse(this.mockData) as HourlyPrice[];
    console.log('Loading data:', data);
    this.energyStore.addHourlyPrices(data);
    console.log('Data loaded into store');
  }
}
