import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillionaireService {
  billionaires: Billionaire[] = [{
    name: 'Bill Gates',
    net_worth: 111000000000,
    nationality: 'US',
  },
  {
    name: 'Jeff Bezos',
    net_worth: 155300000000,
    nationality: 'US',
  },
  {
    name: 'Elon Musk',
    net_worth: 257300000000,
    nationality: 'US',
  },
  {
    name: 'Mark Zuckerberg',
    net_worth: 58200000000,
    nationality: 'US',
  },
  {
    name: 'Russ Hanneman',
    net_worth: 986000000,
    nationality: 'US'
  },
  {
    name: 'Jack Ma',
    net_worth: 24000000000,
    nationality: 'CN'
  }]

  getById(id: number): Billionaire {
    return this.billionaires[id];
  }
}

export interface Billionaire {
  name: string;
  net_worth: number;
  nationality: string;
}
