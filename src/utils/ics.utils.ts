import { CourseEvent } from "../models";
import { formatDateWithSessionTime } from "./events.utils";

export function generateIcs(events: CourseEvent[]) {
  const ics_lines = ["BEGIN:VCALENDAR"];
  ics_lines.push("PRODID:-//Pioneers Education//Pioneers Education v1.0//EN");
  ics_lines.push("VERSION:2.0");
  ics_lines.push("CALSCALE:GREGORIAN");

  events.forEach((event) => {
    const start = normalizeDate(
      formatDateWithSessionTime(event.courseRef.start_time, event.date)
    );
    const end = normalizeDate(
      formatDateWithSessionTime(event.courseRef.end_time, event.date)
    );

    ics_lines.push("BEGIN:VEVENT");
    ics_lines.push("UID:Pioneers Education");
    ics_lines.push(
      "DTSTAMP:" + start,
      "DTSTART:" + start,
      "DTEND:" + end,
      "SUMMARY:" + event.courseRef.title.replace(/.{65}/g, "$&\r\n ") // making sure it does not exceed 75 characters per line
    );
    if (
      event.courseRef.description !== null &&
      event.courseRef.description !== ""
    ) {
      ics_lines.push(
        "X-ALT-DESC;FMTTYPE=text/html:" + event.courseRef.description
      );
    }
    if (event.courseRef.location !== null && event.courseRef.location !== "") {
      ics_lines.push("LOCATION:" + event.courseRef.location);
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

  try {
    const save = document.createElement("a");
    save.href = dlurl;
    save.target = "_system";
    save.download = filename;
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

function normalizeDate(date: Date): string {
  return date
    .toISOString()
    .replace(/\.\d{3}/g, "")
    .replace(/[^a-z\d]/gi, "");
}
