import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Billionaire, BillionaireService } from '../../billionaire-service.service';

@Component({
  selector: 'app-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private billionaireService = inject(BillionaireService);
  billionaires: Billionaire[] = this.billionaireService.billionaires;
}
