export interface ICourse {
  title: string;
  location: string;
  // '10:30 PM' format
  session_time: string;
  is_recurring: boolean;
  start_date: Date;
  end_date: Date;
  description: string;
}
