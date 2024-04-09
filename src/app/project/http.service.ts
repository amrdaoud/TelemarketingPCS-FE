import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataWithSize, FilterModel } from '../common/generic';
import { BehaviorSubject, Observable, catchError, finalize, throwError } from 'rxjs';
import { employeeList, projectDetails, projectDetailsList, projectListDto, typeList } from './project.const';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://telemarketing.somee.com/api/Projects/';

  constructor(private httpClient: HttpClient) { }

    //Loaders
    private loadingList = new BehaviorSubject<boolean>(false);
    get loadingList$(): Observable<boolean> {
      return this.loadingList.asObservable();
    }

    private loadingDetails = new BehaviorSubject<boolean>(false);
    get loadingDetails$(): Observable<boolean> {
      return this.loadingDetails.asObservable();
    }

    private loadingCreate = new BehaviorSubject<boolean>(false);
    get loadingCreate$(): Observable<boolean> {
      return this.loadingCreate.asObservable();
    }

    private loadingEdit = new BehaviorSubject<boolean>(false);
    get loadingEdit$(): Observable<boolean> {
      return this.loadingEdit.asObservable();
    }

    getProjects(filterM:FilterModel):Observable<{ data: projectListDto[]; dataSize: number }>
  {
    this.loadingList.next(true);
    return this.httpClient.post<{ data: projectListDto[]; dataSize: number }>(this.url+"getByFilter",
     filterM ).pipe(finalize(() => this.loadingList.next(false)));
  }

  getExcelProjects(filterM:FilterModel):Observable<{ data: projectListDto[]; dataSize: number }>
  {
    return this.httpClient.post<{ data: projectListDto[]; dataSize: number }>(this.url+"getByFilter",
     filterM );
  }
  createProject(project:FormData):Observable<any>
  {
    this.loadingCreate.next(true);

    return this.httpClient.post<any>(this.url+"Create",project).pipe(finalize(() => this.loadingCreate.next(false)));
  }

  getEmployees():Observable<employeeList[]>
  {
     return this.httpClient.get<employeeList[]>(this.url+"getEmployees");
  }



   getById(id:number):Observable<projectDetailsList>
   {
    this.loadingDetails.next(true);

     return this.httpClient.get<projectDetailsList>(this.url+"getById?id="+id).pipe(finalize(() => this.loadingDetails.next(false)));
   }

   update(input:projectDetailsList):Observable<any>
   {
    this.loadingEdit.next(true);

      return this.httpClient.put<any>(this.url+"update",input).pipe(finalize(() => this.loadingEdit.next(false)));
   }

  delete(id:number):Observable<number>
  {
    return this.httpClient.delete<number>(this.url+"delete?id="+id);
  }

  getTypes():Observable<typeList[]>
  {
    return this.httpClient.get<typeList[]>(this.url+"getProjectTypes")
  }

  getStatus():Observable<typeList[]>
  {
    return this.httpClient.get<typeList[]>(this.url+"getCallStatuses")
  }

  getLineType():Observable<typeList[]>
  {
    return this.httpClient.get<typeList[]>(this.url+"getLineTypes")
  }

  getRegion():Observable<typeList[]>
  {
    return this.httpClient.get<typeList[]>(this.url+"getRegions")
  }

  getCities():Observable<typeList[]>
  {
    return this.httpClient.get<typeList[]>(this.url+"getCities")
  }

  getGeneration():Observable<typeList[]>
  {
    return this.httpClient.get<typeList[]>(this.url+"getLineGenerations")
  }

}
