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
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Bundel",
            data: ['200', '125', '536', '699', '110',
									 '17', '250', '530'],
            backgroundColor: '#F40B93'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }




}
