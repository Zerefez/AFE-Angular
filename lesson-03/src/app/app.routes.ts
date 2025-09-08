import { Routes } from '@angular/router';
import { EnergyPricesComponent } from './energy/components/energy-prices/energy-prices.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { ZoneComponent } from './zone/zone.component';

export const routes: Routes = [
  {path: 'zone', component: ZoneComponent},
  {path: 'temperature', component: TemperatureComponent},
  {path: 'rxjs', component: RxjsComponent},
  {path: 'energy', component: EnergyPricesComponent},
  {path: '', redirectTo: '/zone', pathMatch: 'full'}
];
