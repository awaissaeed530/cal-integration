import { ICourse, WeekDay } from "./ICourse";

export const courseList: ICourse[] = [
  {
    title: "DevOps Engineer",
    description:
      "Companies are looking for talented DevOps engineers to remain competitive in this agile world. Enroll now to operationalize infrastructure at scale and deliver applications and services at high velocity, an essential skill for advancing your career.",
    is_recurring: true,
    location: "Lahore",
    weekday: WeekDay.Tuesday,
    start_time: "10:30 AM",
    end_time: "12:30 AM",
    start_date: new Date(2022, 7, 5),
    end_date: new Date(2022, 8, 10),
  },
  {
    title: "Cloud Developer",
    description:
      "Cloud development is the foundation for the new world of software development. Enroll now to build and deploy production-ready full stack apps at scale on AWS, an essential skill for advancing your web development career.",
    is_recurring: false,
    location: "Karachi",
    weekday: WeekDay.Friday,
    start_time: "12:00 AM",
    end_time: "01:00 PM",
    start_date: new Date(2022, 7, 10),
    end_date: new Date(2022, 8, 10),
  },
];
