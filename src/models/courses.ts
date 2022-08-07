import { ICourse } from "./ICourse";

export const courseList: ICourse[] = [
  {
    title: "Cloud DevOps Engineer",
    description:
      "Companies are looking for talented DevOps engineers to remain competitive in this agile world. Enroll now to operationalize infrastructure at scale and deliver applications and services at high velocity, an essential skill for advancing your career.",
    is_recurring: true,
    location: "Lahore",
    weekday: "Tuesday",
    session_time: "10:30 AM",
    start_date: new Date(2022, 7, 15),
    end_date: new Date(2022, 8, 10),
  },
  {
    title: "Cloud Developer",
    description:
      "Cloud development is the foundation for the new world of software development. Enroll now to build and deploy production-ready full stack apps at scale on AWS, an essential skill for advancing your web development career.",
    is_recurring: false,
    location: "Karachi",
    weekday: "Friday",
    session_time: "12:00 AM",
    start_date: new Date(2022, 7, 10, 12, 0, 0),
    end_date: new Date(2022, 7, 10, 13, 0, 0),
  },
];
