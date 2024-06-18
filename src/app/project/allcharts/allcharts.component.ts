import { Component, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, tap } from 'rxjs/operators';
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
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatBottomSheet,MatBottomSheetModule, MatBottomSheetRef,} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { DashboardFilterComponent } from '../dashboard-filter/dashboard-filter.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpService } from '../http.service';
import { StatisticsReportViewModel, categoryCounter, statusCard } from '../project.const';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxCaptureService } from 'ngx-capture';
import { NgxCaptureModule } from 'ngx-capture';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-allcharts',
  standalone: true,
  imports: [MatGridListModule,CommonModule,CardComponent,BarComponent,LineComponent,
    PieComponent,RadarComponent,DataTableComponent,NumberCounterComponent,
    MatTableModule,MatCardModule,MatBottomSheetModule,MatButtonModule,
     MatBottomSheetModule,MatIconModule,MatProgressBarModule,NgxCaptureModule],
  templateUrl: './allcharts.component.html',
  styleUrl: './allcharts.component.scss'
})
export class AllchartsComponent implements OnInit {
  imgBase64 = '';
  @ViewChild('screen', { static: true }) screen: any;

  constructor(private _bottomSheet: MatBottomSheet ,protected  projectService:HttpService,
    private captureService: NgxCaptureService, private localStorageService:LocalStorageService ) {}

  displayedColumns = ['category', 'count'];
  dataSource : categoryCounter[]=[{category: 'Hydrogen', count: 1,tota:0},
  {category: 'Helium', count: 4,tota:0},
  {category: 'Lithium', count: 6,tota:0},
  {category: 'Beryllium', count: 9,tota:0},
  {category: 'Boron', count: 10,tota:0},
  {category: 'Carbon', count: 12,tota:0},
  {category: 'Nitrogen', count: 14,tota:0},
  {category: 'Oxygen', count: 15,tota:0},
  {category: 'Fluorine', count: 18,tota:0},
  { category: 'Neon', count: 20,tota:0}];

  projectDetails:any;
  private cacheSubscription: Subscription;

  mainStatistics : categoryCounter[]=[{category: 'Actual Completion', count: 4,tota:200},

  {category: 'Actual Non-Completion', count: 6,tota:200},
  {category: 'Quota Progress', count: 9,tota:100},
  {category: 'Telemarketer Count', count: 10,tota:30}]

  ngOnInit(): void {
    this.getLocalStorageData();
  }

  private breakpointObserver = inject(BreakpointObserver);

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 4, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 2 },
        };
      }

     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 2 },
      };
    })
  );

  counters = [
    {
      id: "002",
      label: "Customers served ",
      number: "2000",
      duration: "0.4",
      cardTitle:"Project"

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

  openBottomSheet(): void {

   const bottom= this._bottomSheet.open(DashboardFilterComponent);
   bottom.afterDismissed().subscribe(result => {
    this.projectDetails = result != null ? result.card :this.projectDetails;
   })

  }

//-------------Page ScreenShoot-----------------

capture() {

    this.captureService.getImage(this.screen.nativeElement, true)
.pipe(
  tap(img => {

    this.captureService.downloadImage(img)
  })
).subscribe();
}

getLocalStorageData()
{
  this.projectDetails=JSON.parse(this.localStorageService.getItem('dashboardData')).card ;


}

}

