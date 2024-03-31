export interface projectListDto
{
  id:number;
  name:string;
  dateFrom:Date;
  dateTo:Date;
  quota:number;
  createdBy:string;
  typeName:string;
  typeId:number;
}

export interface typeList
{
  id:number;
  name:string;
}

export interface employeeList
{
  id:number;
  userName:string;
}

export interface projectDetails
{
   id:number;
   gsm:string;
   note:string;
   projectId:number;
   projectName:string;
   employeeID:number;
   employeeUserName:string;
   lineTypeID:number;
   lineType:string;
   callStatusID:number;
   callStatusType:string;
}

export interface projectDetailsList extends projectListDto
{
  projectDetails:projectDetails[];
}
