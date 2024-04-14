import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import {CardComponent} from '../charts/card/card.component';
import{BarComponent} from '../charts/bar/bar.component';
import { LineComponent } from '../charts/line/line.component';
import { PieComponent } from '../charts/pie/pie.component';
import { RadarComponent } from '../charts/radar/radar.component';
import { DataTableComponent } from '../charts/data-table/data-table.component';
//----------------------------------------------
import {MatGridListModule} from '@angular/material/grid-list';
import {NumberCounterComponent} from './../charts/number-counter/number-counter.component';

@Component({
  selector: 'app-allcharts',
  standalone: true,
  imports: [MatGridListModule,CommonModule,CardComponent,BarComponent,LineComponent,
    PieComponent,RadarComponent,DataTableComponent,NumberCounterComponent],
  templateUrl: './allcharts.component.html',
  styleUrl: './allcharts.component.scss'
})
export class AllchartsComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {

  }

  private breakpointObserver = inject(BreakpointObserver);

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  counters = [
    {
      id: "002",
      label: "Customers served ",
      number: "2000",
      duration: "0.4",
      cardTitle:"Served"

    },
    {
      id: "003",
      label: "Current customers",
      number: "1400",
      duration: "0.4",
      cardTitle:"Customers"
    },
    {
      id: "004",
      label: "customer Complaints",
      number: "250",
      duration: "0.4",
      cardTitle:"Complaints"
    },
    {
      id: "004",
      label: "Syriatel telemarketers",
      number: "250",
      duration: "0.4",
      cardTitle:"Telemarketers"

    }
  ];
}
