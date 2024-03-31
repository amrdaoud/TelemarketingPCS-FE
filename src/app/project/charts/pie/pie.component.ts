import { BaseChartDirective } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent implements OnInit{
  public chart: any;

  constructor() {
  }
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){

    this.chart = new Chart("PieChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }


}
