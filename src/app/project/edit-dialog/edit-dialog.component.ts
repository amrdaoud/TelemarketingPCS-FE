import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatSelectModule
  ],
   templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,protected projectService:HttpService
  )
  {

  }


  onNoClick(): void {
    this.data.details.userName=this.data.employeelis.filter(x=>x.id===this.data.details.employeeID)[0].userName;
    this.data.details.callStatus=this.data.status.filter(x=>x.id===this.data.details.callStatus)[0].id;
    this.data.details.callStatusName=this.data.status.filter(x=>x.id===this.data.details.callStatus)[0].name;

    this.dialogRef.close(this.data);
  }
}
