import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { HourlyPrice } from '../models/hourly-price.model';

export const EnergyStore = signalStore(
  { providedIn: 'root' },
  withState<{ prices: HourlyPrice[] }>({ prices: [] }),
  withMethods((store) => ({
    addHourlyPrices(prices: HourlyPrice[]): void {
      patchState(store, { prices });
    }
  }))
);
