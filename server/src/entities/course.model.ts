export interface ICourse {
  title: string;
  description: string;
  location: string;
  weekday: WeekDay;
  start_time: string;
  end_time: string;
  start_date: Date;
  end_date: Date;
  is_recurring: boolean;
}

export enum WeekDay {
  "Sunday" = 0,
  "Monday" = 1,
  "Tuesday" = 2,
  "Wednesday" = 3,
  "Thursday" = 4,
  "Friday" = 5,
  "Saturday" = 6,
}
