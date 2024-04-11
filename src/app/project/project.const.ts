export interface projectListDto
{
  id:number;
  name:string;
  dateFrom:Date;
  dateTo:Date;
  quota:number;
  type:string;
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
   employeeID:number;
   employeeUserName:string;
   lineTypeId:string;
   callStatusId:string;
   generationId:string;
   regionId:string;
   cityId:string;
   segment:string;
   subSegment:string;
   bundle:string;
   contract:string;
   alternativeNumber:string;
   lineType:string;
   callStatus:string;
   generation:string;
   region:string;
   city:string;
}

export interface projectDetailsList extends projectListDto
{
  projectDetails:projectDetails[];
}
