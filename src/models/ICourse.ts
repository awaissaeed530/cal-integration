export interface ICourse {
  title: string;
  location: string;

  /** Day on which class is held */
  weekday: WeekDay;

  /** Class session time '10:30 PM' format */
  session_time: string;

  /** Is the event recurring */
  is_recurring: boolean;

  /** Course start date */
  start_date: Date;
  /** Course end date */
  end_date: Date;
  description: string;
}

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
