import { courseList, ICourse } from "../models";
import { createCourseEvents, generateIcs, UrlBuilder } from "../utils";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

function Courses() {
  const events = createCourseEvents(courseList);

  const exportToOutlookWeb = (course: ICourse) => {
    const url = new UrlBuilder()
      .baseUrl("https://outlook.live.com")
      .path("calendar/0/deeplink/compose")
      .param("path", "/calendar/action/compose")
      .param("rru", "addevent")
      .param("startdt", course.start_date.toISOString())
      .param("enddt", course.end_date.toISOString())
      .param("subject", course.title)
      .param("body", course.description)
      .param("location", course.location)
      .build();

    window.open(url.toString())?.focus();
  };

  const exportToOutlook = (course: ICourse) => {
    generateIcs(course);
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      height="100vh"
      events={events}
    />
  );
}

export default Courses;
