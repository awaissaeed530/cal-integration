import { ICourse } from "../models";

export function generateIcs(course: ICourse) {
  const ics_lines = ["BEGIN:VCALENDAR"];
  ics_lines.push("PRODID:-//Pioneers Education//Pioneers Education v1.0//EN");
  ics_lines.push("VERSION:2.0");
  ics_lines.push("CALSCALE:GREGORIAN");
  ics_lines.push("BEGIN:VEVENT");
  ics_lines.push("UID:Pioneers Education");
  ics_lines.push(
    "DTSTAMP:" + normalizeDate(course.start_date),
    "DTSTART:" + normalizeDate(course.start_date),
    "DTEND:" + normalizeDate(course.end_date),
    "SUMMARY:" + course.title.replace(/.{65}/g, "$&\r\n ") // making sure it does not exceed 75 characters per line
  );
  if (course.description !== null && course.description !== "") {
    ics_lines.push("X-ALT-DESC;FMTTYPE=text/html:" + course.description);
  }
  if (course.location !== null && course.location !== "") {
    ics_lines.push("LOCATION:" + course.location);
  }
  ics_lines.push(
    "STATUS:CONFIRMED",
    "LAST-MODIFIED:" + normalizeDate(new Date()),
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  );
  let dlurl =
    "data:text/calendar;charset=utf-8," +
    encodeURIComponent(ics_lines.join("\r\n"));
  const filename = course.title;

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
