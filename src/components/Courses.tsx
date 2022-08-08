import { courseList, ICourse } from "../models";
import {
  formatDateWithSessionTime,
  generateIcs,
  getCourseStartDay,
  UrlBuilder,
} from "../utils";

function Courses() {
  const courses = courseList;

  const exportToOutlookWeb = (course: ICourse) => {
    const courseStartDay = getCourseStartDay(course);
    const url = new UrlBuilder()
      .baseUrl("https://outlook.live.com")
      .path("calendar/0/deeplink/compose")
      .param("path", "/calendar/action/compose")
      .param("rru", "addevent")
      .param(
        "startdt",
        formatDateWithSessionTime(
          course.start_time,
          courseStartDay
        ).toISOString()
      )
      .param(
        "enddt",
        formatDateWithSessionTime(course.end_time, courseStartDay).toISOString()
      )
      .param("subject", course.title)
      .param("body", course.description)
      .param("location", course.location)
      .build();

    window.open(url.toString())?.focus();
  };

  const exportToOutlook = (course: ICourse) => {
    generateIcs([course]);
  };

  const exportAll = () => {
    generateIcs(courses, true);
  };

  return (
    <div className="p-8">
      <button
        className="px-2 py-1 mt-2 mb-4 border rounded"
        onClick={exportAll}
      >
        Export All
      </button>

      <div className="grid grid-cols-4 gap-4">
        {courses.map((course) => (
          <div className="p-4 bg-white rounded-md shadow-lg" key={course.title}>
            <div className="text-lg font-medium">{course.title}</div>
            <div className="text-sm text-gray-500">{course.description}</div>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 mt-2 border rounded"
                onClick={() => exportToOutlookWeb(course)}
              >
                Outlook (Web)
              </button>
              <button
                className="px-2 py-1 mt-2 border rounded"
                onClick={() => exportToOutlook(course)}
              >
                Outlook (Desktop)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
