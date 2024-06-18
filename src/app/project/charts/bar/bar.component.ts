import { BaseChartDirective } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent implements OnInit {

  public chart: any;
  constructor() {
  }
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){

    this.chart = new Chart("BarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Hydrogen','Helium', 'Lithium', 'Beryllium','Boron',
								 'Carbon', 'Nitrogen', 'Oxygen','Fluorine', 'Neon'],
	       datasets: [
          {
            label: '', data: [1,4,6,9,10,12,14,15,18,20],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          },


        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }




}
