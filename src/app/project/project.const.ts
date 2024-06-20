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

export class NotificationDto
{
  projectId: number;
  projectName: string;
  message: string;
}

export interface NotificationListViewModel
{
  id:number;
  projectId:number;
  projectName:string;
  title:string;
  message:string;
  type:string;
  createdDate:Date;
  isRead:boolean;
  duration:string;
  img:string;
}

export interface DashboardFilter
{
  projectId:number;
  dateFrom:Date;
  dateTo:Date;
}

export interface StatisticsReportViewModel
{
  projectName:string;
  createdBy : string;
  totalGSMCount : number;
  quota : number;
  dateFrom : Date;
  dateTo : Date;
  gsmStatusStatistics : statusCard[];
}

export class statusCard
{
  status : string
  gsmCount : number;
}

export class categoryCounter
{
  category:string;
  count:number;
  tota:number;
}

export interface targetViewModel
{
  status:string;
  totalHour:number;
  hourPercentage:number;
  rate:number;
}

export interface  targetReport
{
  target:number;
  avgCall:number;
  data:targetViewModel[];
}

export interface mistakeViewModel
{
  surveyName:string; //projectName
  surveyId:number;
  telemarketerName:string;
  telemarketerId:number;
  mistakeType:string;
  mistakeTypeId:string;
  gsm:string;
  serial:string;
  questionNumber:string;
  segment:string;
  description:string;
  wieght:string;
  controller:string;  //project type
  controllerId:number;
  adminRemark:string;
}
