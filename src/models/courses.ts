import { ICourse } from "./ICourse";

export const courseList: ICourse[] = [
  {
    title: "Computer Science",
    description: "Computer Science 101",
    is_recurring: false,
    location: "Lahore",
    session_time: "10:30 PM",
    start_date: new Date(2022, 7, 7, 10, 30, 0),
    end_date: new Date(2022, 7, 7, 11, 0, 0),
  },
];
