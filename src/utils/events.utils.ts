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
import { ICourse, WeekDay } from "../models";

/** Generates and download an .ics file from given list of courses  */
export function generateIcs(courses: ICourse[], recurring = false) {
  const ics_lines = ["BEGIN:VCALENDAR"];
  ics_lines.push("PRODID:-//Pioneers Education//Pioneers Education v1.0//EN");
  ics_lines.push("VERSION:2.0");
  ics_lines.push("CALSCALE:GREGORIAN");

  courses.forEach((course) => {
    const courseStartDay = getCourseStartDay(course);
    const start = normalizeDate(
      formatDateWithSessionTime(course.start_time, courseStartDay)
    );
    const end = normalizeDate(
      formatDateWithSessionTime(course.end_time, courseStartDay)
    );

    ics_lines.push(
      "BEGIN:VEVENT",
      `UID:${course.title}`,
      "DTSTAMP:" + start,
      "DTSTART:" + start,
      "DTEND:" + end,
      "SUMMARY:" + course.title.replace(/.{65}/g, "$&\r\n ") // making sure it does not exceed 75 characters per line
    );
    if (course.description !== null && course.description !== "") {
      ics_lines.push(
        ("DESCRIPTION:" + course.description).replace(
          /.{65}/g,
          "$&\r\n "
        )
      );
    }
    if (course.location !== null && course.location !== "") {
      ics_lines.push("LOCATION:" + course.location);
    }
    if (recurring) {
      ics_lines.push(
        `RRULE:FREQ=WEEKLY;UNTIL=${normalizeDate(course.end_date)}`
      );
    }
    ics_lines.push(
      "STATUS:CONFIRMED",
      "LAST-MODIFIED:" + normalizeDate(new Date()),
      "SEQUENCE:0",
      "END:VEVENT"
    );
  });

  ics_lines.push("END:VCALENDAR");
  let dlurl =
    "data:text/calendar;charset=utf-8," +
    encodeURIComponent(ics_lines.join("\r\n"));
  const filename = "Event Calendar";

  saveFile(dlurl, filename);
}

/** Returns a formmated ISO date string without dashes and hyphens */
function normalizeDate(date: Date): string {
  return date
    .toISOString()
    .replace(/\.\d{3}/g, "")
    .replace(/[^a-z\d]/gi, "");
}

/** Downloads given file url */
function saveFile(url: string, fileName: string) {
  try {
    const save = document.createElement("a");
    save.href = url;
    save.target = "_system";
    save.download = fileName;
    const evt = new MouseEvent("click", {
      view: window,
      button: 0,
      bubbles: true,
      cancelable: false,
    });
    save.dispatchEvent(evt);
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
  } catch (e) {
    console.error(e);
  }
}

/** Returns the day when first session of course will be held */
export function getCourseStartDay(course: ICourse): Date {
  return isSameDay(course.weekday, course.start_date)
    ? course.start_date
    : getNextDayFn(course.weekday)(course.start_date);
}

/** Returns respective date-fns nextDay functions according to given weekday */
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

/** Check if given weekday and date are on same day */
function isSameDay(day: WeekDay, date: Date): boolean {
  return day === getDay(date);
}

/** Appends given session time to given date */
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
