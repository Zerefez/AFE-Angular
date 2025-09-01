import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Billionaire, BillionaireService } from '../../billionaire-service.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private billionaireService = inject(BillionaireService);
  billionaire?: Billionaire;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.billionaire = this.billionaireService.getById(id);
    });
  }
}
