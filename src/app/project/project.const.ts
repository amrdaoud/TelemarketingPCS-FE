export interface projectListDto
{
  id:number;
  name:string;
  dateFrom:Date;
  dateTo:Date;
  quota:number;
  type:string;
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
   userName:string;
   lineType:string;
   callStatus:string;
   generation:string;
   region:string;
   city:string;
   segment:string;
   subSegment:string;
   bundle:string;
   contract:string;
   alternativeNumber:string;
   lineTypeName:string;
   callStatusName:string;
   generationName:string;
   regionName:string;
   cityName:string;
}

export interface projectDetailsList extends projectListDto
{
  projectDetails:projectDetails[];
}
