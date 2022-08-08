export interface ICourse {
  title: string;
  description: string;
  location: string;

  /** Day on which class is held */
  weekday: WeekDay;

  /** Class session start time '10:30 PM' format */
  start_time: string;

  /** Class session end time, same format as start_time */
  end_time: string;

  /** Course start date */
  start_date: Date;

  /** Course end date */
  end_date: Date;

  /** Is the event recurring */
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

export interface CourseEvent {
  date: Date;
  courseRef: ICourse;
}
