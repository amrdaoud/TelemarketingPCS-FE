import { HttpService } from '../http.service';
import { MatPaginatorModule, PageEvent,MatPaginator } from '@angular/material/paginator';
import { Router, RouterOutlet } from '@angular/router';
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild, input} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { provideRouter, Route, RouterLink } from '@angular/router';
import {MatDialog,MatDialogRef,MatDialogActions,MatDialogClose,MatDialogTitle,MatDialogContent,} from '@angular/material/dialog';
import * as XLSX from 'xlsx';

//-----------------------Modules-----------------------------------
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { projectListDto } from '../project.const';
import { FilterModel } from '../../common/generic';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatPaginatorModule,CommonModule,RouterOutlet,MatTableModule,MatInputModule,MatFormFieldModule,
    MatSortModule,MatCardModule,MatButtonModule,MatIconModule,MatProgressBarModule,RouterLink,MatSnackBarModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {

  private sortingList = new BehaviorSubject<string>("asc");
  fileName= 'Projects.xlsx';
  totalItems:number=0;
  projectFilter:FilterModel={searchQuery:"",pageIndex:0,pageSize:5,sortActive:'id',sortDirection:'desc'};
  excelFilter:FilterModel={searchQuery:"",pageIndex:0,pageSize:1000000,sortActive:'id',sortDirection:'desc'};
  displayedColumns: string[] = ['id', 'name', 'dateFrom', 'dateTo','quota','createdBy','typeName','action'];
  dataSource= new MatTableDataSource<projectListDto>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  excelData:projectListDto[];
  convertExcelData:any[]=[];
  pageEvent: PageEvent;
  pageSize:number;
  pageIndex:number;
  previousPageIndex:number;

  constructor( protected projservice:HttpService,private router: Router,
    public dialog: MatDialog,private _snackBar: MatSnackBar,
     private changeDetectorRefs: ChangeDetectorRef){

  }


  ngOnInit() {
    this.getProjects(this.projectFilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get sortingList$(): Observable<string> {
    return this.sortingList.asObservable();
  }

  getProjects(filter:FilterModel){

       this.projservice.getProjects(filter)
      .subscribe((response: { data: projectListDto[]; dataSize: number }) => {
        this.dataSource.data=response.data;
        this.totalItems = response.dataSize;
        this.changeDetectorRefs.detectChanges();
      });
}

handlePageEvent(event: PageEvent){
  this.pageEvent = event;
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.projectFilter.pageIndex = event.pageIndex;
  this.projectFilter.pageSize=event.pageSize;
   this.getProjects(this.projectFilter)
}

applyFilter(event: Event) {

  const filterValue = (event.target as HTMLInputElement).value;
  //this.dataSource.filter = filterValue.trim().toLowerCase();
  this.projectFilter.searchQuery=filterValue.trim().toLowerCase();

  this.getProjects(this.projectFilter);
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}

openDialog(id:number,enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(DialogComponent, {data:id,
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
  })

}

exportexcel(): void
  {

    this.projservice.getExcelProjects(this.excelFilter).subscribe((res)=>{
      this.excelData=res.data
    })
    this.excelData.forEach((d)=>{
     let convertData= Object.keys(d).filter(objKey =>
        (objKey !== 'typeId'  && objKey !== 'isDeleted' && objKey !== 'typeId' && objKey !== 'projectDetails'))
        .reduce((newObj, key) =>
        {
            newObj[key] = d[key];

             return newObj;
         }, {}

    );
    this.convertExcelData.push(convertData)

    })
    /* pass here the table id */
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.convertExcelData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  sortByheader(keyName:string)
  {
    this.projectFilter.sortActive=keyName;
     if(this.sortingList.value==="asc")
     {
       this.projectFilter.sortDirection="desc";
     }
     else
     {
      this.projectFilter.sortDirection="asc";

     }
     this.sortingList.next(this.projectFilter.sortDirection);
     this.getProjects(this.projectFilter);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}



