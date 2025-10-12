
export enum DayStart {
   '12am' = 0,
   '1am',
   '2am',
   '3am',
   '4am',
   '5am'
}

export class UserData {
   userId : string =''
   email : string = ''
   timezone : string = 'UTC'
   dayStart : DayStart = DayStart['12am']
   valid : boolean = false
   errorMsg : string = ''
}
