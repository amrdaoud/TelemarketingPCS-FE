import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { NotificationDto } from './project.const';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { ToasterService } from './Toaster/ToasterService';

@Injectable({
  providedIn: 'root'
})
export class NotificationService  {

  constructor(private toaster: ToasterService){}
  private hubConnection: signalR.HubConnection;
  notList:NotificationDto[]=[];

  private pushedNotification = new  BehaviorSubject<NotificationDto[]>([]);
   get pushedNotification$(): Observable<NotificationDto[]> {
    return this.pushedNotification.asObservable();
  }



  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44343/Notify',{ skipNegotiation: true,
                            transport: signalR.HttpTransportType.WebSockets})
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }


  public addProjectListner = () => {
    this.hubConnection.on('SendMessage', (notification: NotificationDto) => {
      this.notList=this.pushedNotification.value;
      this.notList.push(notification)
      this.pushedNotification.next(this.notList);
      this.showSuccessToaster(notification.projectName)
    });


  }

  get getLocalNotification(): NotificationDto[] | null {
    const notificationString = localStorage.getItem('Notification');
    if(!notificationString) {
      return null;
    }
    const noti = JSON.parse(notificationString) as NotificationDto[];
    return noti;
  }


  showSuccessToaster(msg:string) {
    this.toaster.show('success', 'New Project', msg);
  }
  showErrorToaster() {
    this.toaster.show('error', 'Check it out!', 'This is a error alert');
  }
  showWarningToaster() {
    this.toaster.show('warning', 'Check it out!', 'This is a warning alert', 3000);
  }




}
