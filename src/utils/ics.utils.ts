import { ICourse } from "../models";
import { formatDateWithSessionTime, getCourseStartDay } from "./events.utils";

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
        ("X-ALT-DESC;FMTTYPE=text/html:" + course.description).replace(
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

function normalizeDate(date: Date): string {
  return date
    .toISOString()
    .replace(/\.\d{3}/g, "")
    .replace(/[^a-z\d]/gi, "");
}

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
