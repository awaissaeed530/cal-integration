import {
  getDay,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
} from "date-fns";
import { FullCalendarEvent, ICourse, WeekDay } from "../models";

export function createCourseEvents(courses: ICourse[]): FullCalendarEvent[] {
  const events: FullCalendarEvent[] = [];
  courses.forEach((course) => {
    if (!course.is_recurring) {
      const eventDay = isSameDay(course.weekday, course.start_date)
        ? course.start_date
        : getNextDayFn(course.weekday)(course.start_date);
      events.push({
        title: course.title,
        date: eventDay,
        start: formatDateWithSessionTime(course.start_time, eventDay),
        end: formatDateWithSessionTime(course.end_time, eventDay),
      });
    }
  });
  return events;
}

function getNextDayFn(day: WeekDay): (date: number | Date) => Date {
  switch (day) {
    case WeekDay.Monday:
      return nextMonday;
    case WeekDay.Tuesday:
      return nextTuesday;
    case WeekDay.Wednesday:
      return nextWednesday;
    case WeekDay.Thursday:
      return nextThursday;
    case WeekDay.Friday:
      return nextFriday;
    case WeekDay.Saturday:
      return nextSaturday;
    case WeekDay.Sunday:
      return nextSunday;
  }
}

function isSameDay(day: WeekDay, date: Date): boolean {
  return day === getDay(date);
}

function formatDateWithSessionTime(sessionTime: string, date: Date): Date {
  // 10:30 PM
  const sessionSplit = sessionTime.split(" ");
  if (!["AM", "PM"].includes(sessionSplit[1])) {
    throw new Error("Invalid session time format");
  }

  const isAm = sessionSplit[1] === "AM";
  const timeSplit = sessionSplit[0].split(":");
  const hours = timeSplit[0];
  const minutes = timeSplit[1];

  const formattedDate = new Date(date);
  formattedDate.setHours(isAm ? parseInt(hours) : parseInt(hours) + 12);
  formattedDate.setMinutes(parseInt(minutes));
  return formattedDate;
}
