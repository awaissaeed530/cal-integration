import {
  getDay, nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday
} from "date-fns";
import { ICourse, WeekDay } from "../models";

export function getCourseStartDay(course: ICourse): Date {
  return isSameDay(course.weekday, course.start_date)
    ? course.start_date
    : getNextDayFn(course.weekday)(course.start_date);
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

export function formatDateWithSessionTime(
  sessionTime: string,
  date: Date
): Date {
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
