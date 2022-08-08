import { format } from "date-fns";
import { CourseEvent, courseList } from "../models";
import {
  createCourseEvents,
  formatDateWithSessionTime,
  generateIcs,
  UrlBuilder,
} from "../utils";

function Courses() {
  const events = createCourseEvents(courseList);

  const exportToOutlookWeb = (event: CourseEvent) => {
    const url = new UrlBuilder()
      .baseUrl("https://outlook.live.com")
      .path("calendar/0/deeplink/compose")
      .param("path", "/calendar/action/compose")
      .param("rru", "addevent")
      .param(
        "startdt",
        formatDateWithSessionTime(
          event.courseRef.start_time,
          event.date
        ).toISOString()
      )
      .param(
        "enddt",
        formatDateWithSessionTime(
          event.courseRef.end_time,
          event.date
        ).toISOString()
      )
      .param("subject", event.courseRef.title)
      .param("body", event.courseRef.description)
      .param("location", event.courseRef.location)
      .build();

    window.open(url.toString())?.focus();
  };

  const exportToOutlook = (event: CourseEvent) => {
    generateIcs(event.courseRef, event.date);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {events.map((event) => (
        <div
          className="p-4 bg-white rounded-md shadow-lg"
          key={event.courseRef.title}
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">{event.courseRef.title}</div>
            <div className="text-sm text-gray-400">
              {format(event.date, "dd/MM/yyyy")}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {event.courseRef.description}
          </div>
          <button
            className="px-2 py-1 mt-2 border rounded"
            onClick={() => exportToOutlookWeb(event)}
          >
            Export To Outlook Web
          </button>
          <button
            className="px-2 py-1 mt-2 border rounded"
            onClick={() => exportToOutlook(event)}
          >
            Export To Outlook
          </button>
        </div>
      ))}
    </div>
  );
}

export default Courses;
